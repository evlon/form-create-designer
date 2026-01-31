<template>
    <div class="_fc-barcode-box">
        <svg ref="svgRef" :width="width" :height="height"></svg>
    </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, nextTick, computed } from 'vue';

const JsBarcode = require('jsbarcode');

export default defineComponent({
    name: 'BarCodeBox',
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'mounted'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        format: {
            type: String,
            default: 'CODE128'
        },
        lineColor: {
            type: String,
            default: '#000000'
        },
        backgroundColor: {
            type: String,
            default: '#ffffff'
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 80
        },
        displayValue: {
            type: Boolean,
            default: true
        },
        fontOptions: {
            type: String,
            default: ''
        },
        textAlign: {
            type: String,
            default: 'center'
        },
        textPosition: {
            type: String,
            default: 'bottom'
        },
        textMargin: {
            type: Number,
            default: 2
        },
        fontSize: {
            type: Number,
            default: 20
        },
        margin: {
            type: Number,
            default: 10
        },
        marginTop: {
            type: Number,
            default: 10
        },
        marginBottom: {
            type: Number,
            default: 10
        },
        marginLeft: {
            type: Number,
            default: 10
        },
        marginRight: {
            type: Number,
            default: 10
        }
    },
    setup(props, { emit, expose }) {
        const svgRef = ref(null);

        const generateBarCode = async () => {
            if (!svgRef.value || !props.modelValue) return;

            try {
                JsBarcode(svgRef.value, props.modelValue, {
                    format: props.format,
                    lineColor: props.lineColor,
                    background: props.backgroundColor,
                    width: props.width / 100,
                    height: props.height,
                    displayValue: props.displayValue,
                    fontOptions: props.fontOptions,
                    textAlign: props.textAlign,
                    textPosition: props.textPosition,
                    textMargin: props.textMargin,
                    fontSize: props.fontSize,
                    margin: props.margin,
                    marginTop: props.marginTop,
                    marginBottom: props.marginBottom,
                    marginLeft: props.marginLeft,
                    marginRight: props.marginRight
                });
                emit('mounted', { svg: svgRef.value });
            } catch (error) {
                console.error('[BarCodeBox] Generate error:', error);
            }
        };

        const computedWidth = computed(() => {
            return props.width + props.marginLeft + props.marginRight;
        });

        watch(() => props.modelValue, () => {
            nextTick(generateBarCode);
        });

        watch(() => [props.format, props.lineColor, props.width, props.height, props.displayValue], () => {
            nextTick(generateBarCode);
        });

        onMounted(() => {
            nextTick(generateBarCode);
        });

        expose({
            refresh: generateBarCode,
            getSvg: () => svgRef.value
        });

        return {
            svgRef,
            width: computedWidth
        };
    }
});
</script>

<style>
._fc-barcode-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
}

._fc-barcode-box svg {
    max-width: 100%;
}
</style>
