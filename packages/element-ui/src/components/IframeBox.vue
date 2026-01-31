<template>
    <div class="_fc-iframe-box" :style="containerStyle">
        <iframe
            ref="iframeRef"
            :src="src"
            :width="width"
            :height="height"
            :frameborder="frameBorder"
            :loading="loading"
            @load="onLoad"
            @error="onError"
        ></iframe>
        <div v-if="loading && showLoading" class="loading-mask">
            <el-icon class="loading-icon"><Loading /></el-icon>
            <span>加载中...</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onUnmounted } from 'vue';
import { Loading } from '@element-plus/icons-vue';

export default defineComponent({
    name: 'IframeBox',
    components: { Loading },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'load', 'error', 'mounted'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: 400
        },
        frameBorder: {
            type: [String, Number],
            default: 0
        },
        loading: {
            type: Boolean,
            default: true
        },
        showLoading: {
            type: Boolean,
            default: true
        },
        allowFullscreen: {
            type: Boolean,
            default: false
        },
        referrerPolicy: {
            type: String,
            default: ''
        },
        sandbox: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit, expose }) {
        const iframeRef = ref(null);
        const isLoaded = ref(false);
        const hasError = ref(false);

        const containerStyle = computed(() => ({
            width: typeof props.width === 'number' ? `${props.width}px` : props.width,
            height: typeof props.height === 'number' ? `${props.height}px` : props.height,
            position: 'relative'
        }));

        const onLoad = (event) => {
            isLoaded.value = true;
            hasError.value = false;
            emit('load', event);
            emit('mounted', { iframe: iframeRef.value });
        };

        const onError = (event) => {
            hasError.value = true;
            emit('error', event);
        };

        const refresh = () => {
            if (iframeRef.value) {
                isLoaded.value = false;
                hasError.value = false;
                iframeRef.value.src = props.src;
            }
        };

        watch(() => props.src, (newSrc, oldSrc) => {
            if (newSrc !== oldSrc) {
                refresh();
            }
        });

        expose({
            refresh,
            getIframe: () => iframeRef.value,
            isLoaded: () => isLoaded.value,
            hasError: () => hasError.value
        });

        return {
            iframeRef,
            containerStyle,
            onLoad,
            onError,
            refresh
        };
    }
});
</script>

<style>
._fc-iframe-box {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
}

._fc-iframe-box iframe {
    display: block;
    border: none;
}

._fc-iframe-box .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.9);
    color: #409EFF;
    font-size: 14px;
}

._fc-iframe-box .loading-icon {
    font-size: 24px;
    margin-bottom: 8px;
    animation: rotating 2s linear infinite;
}

@keyframes rotating {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>
