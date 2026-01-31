<template>
    <div class="fc-dynamic-component" ref="containerRef">
        <div class="component-content" ref="contentRef">
            <component
                :is="dynamicComponent"
                v-if="componentInstance"
                v-bind="componentProps"
                v-on="componentListeners"
                ref="componentRef"
            />
            <div v-else-if="error" class="component-error">
                <el-alert :title="error" type="error" show-icon />
            </div>
            <div v-else class="component-placeholder">
                <el-empty :description="t('com.dynamicComponent.placeholder')" />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, nextTick, h } from 'vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'DynamicComponent',
    inject: ['designer'],
    emits: ['update:component', 'mounted', 'error', 'ready'],
    props: {
        componentName: {
            type: String,
            default: ''
        },
        componentProps: {
            type: Object,
            default: () => ({})
        },
        componentEvents: {
            type: Object,
            default: () => ({})
        },
        lazy: {
            type: Boolean,
            default: false
        },
        scopeData: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const contentRef = ref(null);
        const componentRef = ref(null);
        const componentInstance = ref(null);
        const error = ref('');
        const loading = ref(false);
        const loadedComponents = new Map();
        
        const componentListeners = computed(() => {
            const listeners = {};
            Object.keys(props.componentEvents).forEach(key => {
                listeners[key] = (...args) => {
                    const handler = props.componentEvents[key];
                    if (typeof handler === 'function') {
                        handler(...args);
                    }
                    emit(key, ...args);
                };
            });
            return listeners;
        });
        
        const loadComponent = async (name) => {
            if (!name) {
                componentInstance.value = null;
                return null;
            }
            
            if (loadedComponents.has(name)) {
                return loadedComponents.get(name);
            }
            
            loading.value = true;
            error.value = '';
            
            try {
                let component = null;
                
                if (name.startsWith('fc-')) {
                    const baseName = name.replace('fc-', '').replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                    const path = `./components/${baseName}.vue`;
                    try {
                        const mod = await import(path);
                        component = mod.default || mod;
                    } catch (e) {
                        const altPath = `./components/${name.charAt(0).toUpperCase() + name.slice(1)}.vue`;
                        const altMod = await import(altPath);
                        component = altMod.default || altMod;
                    }
                } else if (name.startsWith('el-') || name.startsWith('El')) {
                    const globalComponents = ['ElButton', 'ElInput', 'ElSelect', 'ElOption', 'ElDatePicker', 'ElCheckbox', 'ElRadio', 'ElSwitch', 'ElSlider', 'ElInputNumber', 'ElCascader', 'ElUpload', 'ElDialog', 'ElDrawer', 'ElMessage', 'ElMessageBox'];
                    if (globalComponents.some(c => name === c || name.toLowerCase() === c.toLowerCase())) {
                        const global = await import('element-plus');
                        const componentName = name.replace('El', '').replace(/^el-/, '');
                        const kebabName = componentName.replace(/([A-Z])/g, '-$1').toLowerCase();
                        component = global[kebabName] || global[componentName] || global[name];
                    }
                } else {
                    const path = `./components/${name}.vue`;
                    const mod = await import(path);
                    component = mod.default || mod;
                }
                
                if (component) {
                    loadedComponents.set(name, component);
                    componentInstance.value = component;
                    emit('ready', { component, name });
                    return component;
                }
                
                throw new Error(`Component ${name} not found`);
            } catch (e) {
                console.error('[DynamicComponent] Load error:', e);
                error.value = t('com.dynamicComponent.loadError', { name });
                emit('error', { error: error.value, name });
                return null;
            } finally {
                loading.value = false;
            }
        };
        
        const dynamicComponent = computed(() => {
            return componentInstance.value || 'div';
        });
        
        const renderFallback = () => {
            return h('div', { class: 'component-fallback' }, [
                h('span', {}, `Component: ${props.componentName}`)
            ]);
        };
        
        const refresh = async () => {
            if (props.componentName) {
                await loadComponent(props.componentName);
            }
        };
        
        expose({
            refresh,
            getComponent: () => componentRef.value,
            getComponentName: () => props.componentName
        });
        
        watch(() => props.componentName, async (newName) => {
            if (!props.lazy || newName) {
                await loadComponent(newName);
            }
        }, { immediate: !props.lazy });
        
        return {
            t,
            containerRef,
            contentRef,
            componentRef,
            componentInstance,
            error,
            dynamicComponent,
            componentListeners,
            refresh
        };
    }
});
</script>

<style>
.fc-dynamic-component {
    width: 100%;
    min-height: 50px;
}

.component-content {
    width: 100%;
    height: 100%;
}

.component-error {
    padding: 16px;
}

.component-placeholder {
    padding: 32px;
    text-align: center;
}

.component-fallback {
    padding: 16px;
    background: #f5f7fa;
    border-radius: 4px;
    color: #909399;
    font-size: 13px;
}
</style>
