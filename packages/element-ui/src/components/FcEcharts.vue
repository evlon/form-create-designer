<template>
    <div class="_fc-echarts" ref="containerRef" :style="containerStyle">
        <div ref="chartRef" class="echarts-chart" :style="chartStyle"></div>
        <div v-if="loading" class="echarts-loading">
            <el-icon class="loading-icon"><Loading /></el-icon>
            <span>加载中...</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, onUnmounted, nextTick, computed } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import * as echarts from 'echarts';

export default defineComponent({
    name: 'FcEcharts',
    components: { Loading },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'mounted', 'click', 'legendselectchanged', 'datazoom', 'showTip', 'finished'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        options: {
            type: Object,
            default: () => ({})
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: 400
        },
        theme: {
            type: String,
            default: 'default'
        },
        loading: {
            type: Boolean,
            default: false
        },
        loadingType: {
            type: String,
            default: 'spin'
        },
        loadingText: {
            type: String,
            default: '加载中...'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        notMerge: {
            type: Boolean,
            default: false
        },
        lazyUpdate: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const chartRef = ref(null);
        let chartInstance = null;

        const containerStyle = computed(() => ({
            width: typeof props.width === 'number' ? `${props.width}px` : props.width,
            height: typeof props.height === 'number' ? `${props.height}px` : props.height,
            position: 'relative'
        }));

        const chartStyle = computed(() => ({
            width: '100%',
            height: '100%'
        }));

        const initChart = () => {
            if (chartRef.value && !chartInstance) {
                chartInstance = echarts.init(chartRef.value, props.theme);
                bindEvents();
                updateChart();
            }
        };

        const updateChart = () => {
            if (chartInstance) {
                const mergedOptions = {
                    ...props.options,
                    ...props.modelValue
                };
                chartInstance.setOption(mergedOptions, {
                    notMerge: props.notMerge,
                    lazyUpdate: props.lazyUpdate
                });
            }
        };

        const bindEvents = () => {
            if (!chartInstance) return;

            chartInstance.on('click', (params) => {
                emit('click', params);
            });

            chartInstance.on('legendselectchanged', (params) => {
                emit('legendselectchanged', params);
            });

            chartInstance.on('datazoom', (params) => {
                emit('datazoom', params);
            });

            chartInstance.on('showTip', (params) => {
                emit('showTip', params);
            });

            chartInstance.on('finished', () => {
                emit('finished');
            });
        };

        const resizeChart = () => {
            if (chartInstance) {
                chartInstance.resize();
            }
        };

        const getChartInstance = () => chartInstance;

        const showLoading = () => {
            if (chartInstance) {
                chartInstance.showLoading(props.loadingType, {
                    text: props.loadingText,
                    color: '#409EFF',
                    textColor: '#000',
                    maskColor: 'rgba(255, 255, 255, 0.9)'
                });
            }
        };

        const hideLoading = () => {
            if (chartInstance) {
                chartInstance.hideLoading();
            }
        };

        const getDataURL = (options = {}) => {
            if (chartInstance) {
                return chartInstance.getDataURL(options);
            }
            return '';
        };

        watch(() => props.options, () => {
            nextTick(updateChart);
        }, { deep: true });

        watch(() => props.modelValue, () => {
            nextTick(updateChart);
        }, { deep: true });

        watch(() => props.loading, (val) => {
            if (val) {
                showLoading();
            } else {
                hideLoading();
            }
        });

        watch([() => props.width, () => props.height], () => {
            nextTick(() => {
                if (props.autoResize) {
                    resizeChart();
                }
            });
        });

        onMounted(() => {
            nextTick(() => {
                initChart();
                emit('mounted', { chart: chartInstance });
                if (props.loading) {
                    showLoading();
                }
            });
            
            if (props.autoResize) {
                window.addEventListener('resize', resizeChart);
            }
        });

        onUnmounted(() => {
            if (chartInstance) {
                chartInstance.dispose();
                chartInstance = null;
            }
            window.removeEventListener('resize', resizeChart);
        });

        expose({
            getChartInstance,
            resizeChart,
            showLoading,
            hideLoading,
            getDataURL,
            updateChart
        });

        return {
            containerRef,
            chartRef,
            containerStyle,
            chartStyle,
            loading: computed(() => props.loading)
        };
    }
});
</script>

<style>
._fc-echarts {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
}

._fc-echarts .echarts-chart {
    width: 100%;
    height: 100%;
}

._fc-echarts .echarts-loading {
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

._fc-echarts .loading-icon {
    font-size: 24px;
    margin-bottom: 8px;
    animation: rotating 2s linear infinite;
}

@keyframes rotating {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>
