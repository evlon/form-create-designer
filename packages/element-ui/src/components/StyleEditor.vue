<template>
    <div class="_fc-style-editor">
        <el-tabs v-model="activeTab" class="style-tabs">
            <el-tab-pane label="基础" name="basic">
                <div class="style-section">
                    <SizeInput v-model="styles.width" label="宽度" />
                    <SizeInput v-model="styles.height" label="高度" />
                    <ColorInput v-model="styles.color" label="字体颜色" />
                    <ColorInput v-model="styles.backgroundColor" label="背景颜色" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="边框" name="border">
                <div class="style-section">
                    <BorderInput v-model="borderStyle" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="圆角" name="radius">
                <div class="style-section">
                    <SizeInput v-model="styles.borderRadius" label="圆角" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="阴影" name="shadow">
                <div class="style-section">
                    <ShadowInput v-model="styles.boxShadow" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="外边距" name="margin">
                <div class="style-section">
                    <MarginInput v-model="styles.margin" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="内边距" name="padding">
                <div class="style-section">
                    <PaddingInput v-model="styles.padding" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="字体" name="font">
                <div class="style-section">
                    <FontInput v-model="fontStyle" />
                </div>
            </el-tab-pane>
            
            <el-tab-pane label="定位" name="position">
                <div class="style-section">
                    <PositionInput v-model="positionStyle" />
                </div>
            </el-tab-pane>
        </el-tabs>
        
        <div class="style-preview" v-if="showPreview">
            <div class="preview-box" :style="previewStyle">
                样式预览
            </div>
        </div>
        
        <div class="style-output">
            <el-input
                type="textarea"
                :model-value="styleOutput"
                @update:modelValue="parseStyle"
                placeholder="自定义CSS样式"
                :rows="3"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import SizeInput from './style/SizeInput.vue';
import ColorInput from './style/ColorInput.vue';
import BorderInput from './style/BorderInput.vue';
import ShadowInput from './style/ShadowInput.vue';
import MarginInput from './style/MarginInput.vue';
import PaddingInput from './style/PaddingInput.vue';
import FontInput from './style/FontInput.vue';
import PositionInput from './style/PositionInput.vue';
import { toLine } from '@form-create/utils';

export default defineComponent({
    name: 'StyleEditor',
    components: {
        SizeInput,
        ColorInput,
        BorderInput,
        ShadowInput,
        MarginInput,
        PaddingInput,
        FontInput,
        PositionInput
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        showPreview: {
            type: Boolean,
            default: true
        },
        showTabs: {
            type: Array,
            default: () => ['basic', 'border', 'radius', 'shadow', 'margin', 'padding', 'font', 'position']
        }
    },
    setup(props, { emit }) {
        const activeTab = ref('basic');
        const styles = ref({
            width: '',
            height: '',
            color: '',
            backgroundColor: '',
            borderRadius: '',
            boxShadow: '',
            margin: '',
            padding: '',
            ...props.modelValue
        });

        const borderStyle = ref({});
        const fontStyle = ref({});
        const positionStyle = ref({});

        const parseStyle = (value) => {
            try {
                const parsed = JSON.parse(value);
                styles.value = { ...styles.value, ...parsed };
                emit('update:modelValue', styles.value);
                emit('change', styles.value);
            } catch (e) {
                console.warn('[StyleEditor] Parse style error:', e);
            }
        };

        const styleOutput = computed(() => {
            return JSON.stringify(styles.value, null, 2);
        });

        const previewStyle = computed(() => {
            const style = { ...styles.value };
            if (borderStyle.value?.border) {
                style.border = borderStyle.value.border;
            }
            if (fontStyle.value?.font) {
                style.font = fontStyle.value.font;
            }
            if (fontStyle.value?.color) {
                style.color = fontStyle.value.color;
            }
            if (fontStyle.value?.fontSize) {
                style.fontSize = fontStyle.value.fontSize;
            }
            if (fontStyle.value?.fontWeight) {
                style.fontWeight = fontStyle.value.fontWeight;
            }
            if (fontStyle.value?.lineHeight) {
                style.lineHeight = fontStyle.value.lineHeight;
            }
            if (fontStyle.value?.textAlign) {
                style.textAlign = fontStyle.value.textAlign;
            }
            if (positionStyle.value?.position) {
                style.position = positionStyle.value.position;
            }
            if (positionStyle.value?.top) {
                style.top = positionStyle.value.top;
            }
            if (positionStyle.value?.left) {
                style.left = positionStyle.value.left;
            }
            if (positionStyle.value?.zIndex) {
                style.zIndex = positionStyle.value.zIndex;
            }
            return style;
        });

        watch(styles, (newVal) => {
            emit('update:modelValue', newVal);
            emit('change', newVal);
        }, { deep: true });

        watch(() => props.modelValue, (newVal) => {
            if (newVal) {
                styles.value = { ...styles.value, ...newVal };
            }
        }, { deep: true });

        return {
            activeTab,
            styles,
            borderStyle,
            fontStyle,
            positionStyle,
            styleOutput,
            previewStyle,
            parseStyle
        };
    }
});
</script>

<style>
._fc-style-editor {
    width: 100%;
}

._fc-style-editor .style-tabs {
    width: 100%;
}

._fc-style-editor .el-tabs__content {
    padding: 10px;
}

._fc-style-editor .style-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

._fc-style-editor .style-preview {
    margin-top: 16px;
    padding: 16px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
}

._fc-style-editor .preview-box {
    padding: 20px;
    background-color: #f5f7fa;
    border-radius: 4px;
    text-align: center;
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

._fc-style-editor .style-output {
    margin-top: 16px;
}

._fc-style-editor .style-output .el-textarea__inner {
    font-family: monospace;
    font-size: 12px;
}
</style>
