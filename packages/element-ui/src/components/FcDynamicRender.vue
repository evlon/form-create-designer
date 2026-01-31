<template>
    <component
        :is="dynamicComponent"
        ref="componentRef"
        v-bind="computedProps"
        v-on="computedListeners"
    >
        <template v-for="(slotFn, name) in $slots" #[name]>
            <slot :name="name" :slotFn="slotFn"></slot>
        </template>
    </component>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick, h, onMounted, onUnmounted } from 'vue';

let styleIdCounter = 0;

function parseSFC(content) {
    if (!content || typeof content !== 'string') {
        return { template: null, script: null, style: null, isScriptSetup: false };
    }

    const template = content.match(/<template[^>]*>([\s\S]*?)<\/template>/)?.[1]?.trim();
    const script = content.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1]?.trim();
    const style = content.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1]?.trim();
    const isScriptSetup = script?.includes('setup');

    return { template, script, style, isScriptSetup };
}

function parseOptionsScript(scriptContent) {
    if (!scriptContent) return {};

    try {
        const exportMatch = scriptContent.match(/export\s+default\s*({[\s\S]*})/);
        if (exportMatch) {
            const code = exportMatch[1];
            return new Function(`return ${code}`)();
        }
    } catch (error) {
        console.error('[FcDynamicRender] Parse options script error:', error);
    }

    return {};
}

function parseSetupScript(scriptContent, Vue) {
    if (!scriptContent) return () => ({});

    try {
        let code = scriptContent.replace(/\/\*[\s\S]*?\*\//g, '').trim();
        if (!code) return () => ({});

        code = code.replace(/import\s*\{([^}]+)\}\s*from\s*['"]vue['"]/gi, '');

        return function setup(props, { emit, expose, slots, attrs }) {
            const ctx = {
                props,
                emit,
                expose,
                slots,
                attrs,
                ...Vue
            };

            try {
                const fn = new Function('with(this) { ' + code + ' }');
                const result = fn.call(ctx);

                if (result && typeof result === 'function') {
                    return result;
                }

                return () => result;
            } catch (error) {
                console.error('[FcDynamicRender] Script setup execution error:', error);
                return () => ({});
            }
        };
    } catch (error) {
        console.error('[FcDynamicRender] Parse setup script error:', error);
        return () => ({});
    }
}

function createDynamicComponent(sfc, Vue) {
    if (!sfc.template) {
        return defineComponent({
            name: 'DynamicComponent',
            render() {
                return h('div', { class: '_fc-dynamic-empty' }, 'No template');
            }
        });
    }

    let componentOptions = {
        name: 'DynamicComponent',
        template: sfc.template
    };

    if (sfc.script) {
        if (sfc.isScriptSetup) {
            componentOptions.setup = parseSetupScript(sfc.script, Vue);
        } else {
            Object.assign(componentOptions, parseOptionsScript(sfc.script));
        }
    }

    return defineComponent(componentOptions);
}

export default defineComponent({
    name: 'FcDynamicRender',

    props: {
        vueContent: {
            type: String,
            required: true,
            default: ''
        },
        formCreateInject: {
            type: Object,
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({})
        }
    },

    emits: ['mounted', 'error', 'update:modelValue'],

    inject: ['designer', 'formItem'],

    setup(props, { emit, expose, attrs, slots }) {
        const componentRef = ref(null);
        const dynamicComponent = ref(null);
        const currentStyleId = ref(null);

        const computedProps = computed(() => {
            return {
                ...attrs,
                ...props.formCreateInject,
                modelValue: props.formCreateInject?.value
            };
        });

        const computedListeners = computed(() => {
            const listeners = {};
            if (attrs.onUpdateModelValue) {
                listeners['update:modelValue'] = attrs.onUpdateModelValue;
            }
            if (attrs.onChange) {
                listeners.change = attrs.onChange;
            }
            return listeners;
        });

        function injectStyle(styleContent) {
            if (!styleContent) return;

            const styleId = `_fc_dynamic_style_${++styleIdCounter}`;
            let styleEl = document.getElementById(styleId);

            if (!styleEl) {
                styleEl = document.createElement('style');
                styleEl.id = styleId;
                styleEl.setAttribute('type', 'text/css');
                document.head.appendChild(styleEl);
            }

            styleEl.textContent = styleContent;
            currentStyleId.value = styleId;
        }

        function removeStyle() {
            if (currentStyleId.value) {
                const styleEl = document.getElementById(currentStyleId.value);
                if (styleEl) {
                    styleEl.remove();
                }
                currentStyleId.value = null;
            }
        }

        async function updateComponent() {
            removeStyle();

            if (!props.vueContent) {
                dynamicComponent.value = null;
                return;
            }

            try {
                const sfc = parseSFC(props.vueContent);

                if (sfc.style) {
                    injectStyle(sfc.style);
                }

                const Vue = await import('vue');
                dynamicComponent.value = createDynamicComponent(sfc, Vue);

                await nextTick();
                emit('mounted', { ref: componentRef.value });

                if (componentRef.value && typeof componentRef.value?.expose === 'function') {
                    expose({ $el: componentRef.value.$el });
                }
            } catch (error) {
                console.error('[FcDynamicRender] Create component error:', error);
                emit('error', error);
            }
        }

        watch(() => props.vueContent, () => {
            updateComponent();
        }, { immediate: true });

        expose({
            componentRef,
            refresh: updateComponent
        });

        onUnmounted(() => {
            removeStyle();
        });

        return {
            componentRef,
            dynamicComponent,
            computedProps,
            computedListeners
        };
    },

    mounted() {
        if (this.$refs.componentRef) {
            this.$emit('mounted', { ref: this.$refs.componentRef });
        }
    }
});
</script>

<style>
._fc-dynamic-empty {
    padding: 20px;
    text-align: center;
    color: #909399;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
}
</style>
