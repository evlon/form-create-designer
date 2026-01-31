<template>
    <div class="_fc-qrcode-box">
        <div class="qrcode-preview" :style="{ width: size + 'px', height: size + 'px' }">
            <canvas ref="canvasRef"></canvas>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';

const QRCode = require('qrcode');

export default defineComponent({
    name: 'QrCodeBox',
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'mounted'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        size: {
            type: Number,
            default: 150
        },
        colorDark: {
            type: String,
            default: '#000000'
        },
        colorLight: {
            type: String,
            default: '#ffffff'
        },
        correctLevel: {
            type: Number,
            default: 2
        },
        backgroundColor: {
            type: String,
            default: '#ffffff'
        }
    },
    setup(props, { emit, expose }) {
        const canvasRef = ref(null);

        const generateQRCode = async () => {
            if (!canvasRef.value || !props.modelValue) return;

            const options = {
                width: props.size,
                height: props.size,
                type: 'image/png',
                quality: 0.92,
                margin: 1,
                color: {
                    dark: props.colorDark,
                    light: props.colorLight
                },
                errorCorrectionLevel: props.correctLevel
            };

            try {
                await QRCode.toCanvas(canvasRef.value, props.modelValue, options);
                emit('mounted', { canvas: canvasRef.value });
            } catch (error) {
                console.error('[QrCodeBox] Generate error:', error);
            }
        };

        watch(() => props.modelValue, () => {
            nextTick(generateQRCode);
        });

        watch([() => props.size, () => props.colorDark, () => props.colorLight, () => props.correctLevel], () => {
            nextTick(generateQRCode);
        });

        onMounted(() => {
            nextTick(generateQRCode);
        });

        expose({
            refresh: generateQRCode,
            getCanvas: () => canvasRef.value
        });

        return {
            canvasRef
        };
    }
});
</script>

<style>
._fc-qrcode-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
}

._fc-qrcode-box .qrcode-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
}

._fc-qrcode-box canvas {
    max-width: 100%;
    max-height: 100%;
}
</style>
