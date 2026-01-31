<template>
    <div class="_fd-background-input">
        <el-row :gutter="8">
            <el-col :span="8">
                <el-color-picker
                    :model-value="color"
                    show-alpha
                    color-format="hex"
                    @update:modelValue="updateColor"
                    size="small"
                />
            </el-col>
            <el-col :span="16">
                <el-select :model-value="imageType" @update:modelValue="updateImageType" size="small">
                    <el-option label="无图片" value="none" />
                    <el-option label="URL" value="url" />
                    <el-option label="渐变" value="gradient" />
                </el-select>
            </el-col>
        </el-row>
        <el-input
            v-if="imageType === 'url'"
            :model-value="imageUrl"
            @update:modelValue="updateImageUrl"
            placeholder="背景图片URL"
            size="small"
            style="margin-top: 8px;"
        />
        <div v-if="imageType === 'gradient'" style="margin-top: 8px;">
            <el-row :gutter="4">
                <el-col :span="12">
                    <el-color-picker
                        :model-value="gradientStart"
                        show-alpha
                        color-format="hex"
                        @update:modelValue="updateGradientStart"
                        size="small"
                    />
                </el-col>
                <el-col :span="12">
                    <el-color-picker
                        :model-value="gradientEnd"
                        show-alpha
                        color-format="hex"
                        @update:modelValue="updateGradientEnd"
                        size="small"
                    />
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="8" style="margin-top: 8px;">
            <el-col :span="8">
                <el-select :model-value="repeat" @update:modelValue="updateRepeat" size="small">
                    <el-option label="重复" value="repeat" />
                    <el-option label="不重复" value="no-repeat" />
                    <el-option label="水平" value="repeat-x" />
                    <el-option label="垂直" value="repeat-y" />
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-select :model-value="position" @update:modelValue="updatePosition" size="small">
                    <el-option label="居中" value="center" />
                    <el-option label="左上" value="left top" />
                    <el-option label="右上" value="right top" />
                    <el-option label="左下" value="left bottom" />
                    <el-option label="右下" value="right bottom" />
                </el-select>
            </el-col>
            <el-col :span="8">
                <el-select :model-value="size" @update:modelValue="updateSize" size="small">
                    <el-option label="自动" value="auto" />
                    <el-option label="-cover" value="cover" />
                    <el-option label="contain" value="contain" />
                </el-select>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';

export default defineComponent({
    name: 'BackgroundInput',
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit }) {
        const parseValue = (value) => {
            const result = {
                color: 'transparent',
                imageType: 'none',
                imageUrl: '',
                gradientStart: '#ffffff',
                gradientEnd: '#000000',
                repeat: 'repeat',
                position: 'center',
                size: 'auto'
            };

            if (!value) return result;

            const colorMatch = value.match(/rgba?\([^)]+\)/g) || [];
            if (colorMatch.length > 0) {
                result.color = colorMatch[0];
            }

            if (value.includes('linear-gradient')) {
                result.imageType = 'gradient';
                const colors = value.match(/rgba?\([^)]+\)/g) || [];
                if (colors.length >= 2) {
                    result.gradientStart = colors[0];
                    result.gradientEnd = colors[1];
                }
            } else if (value.includes('url(')) {
                result.imageType = 'url';
                const urlMatch = value.match(/url\(['"]?([^'")]+)['"]?\)/);
                if (urlMatch) {
                    result.imageUrl = urlMatch[1];
                }
            }

            if (value.includes('repeat-x')) result.repeat = 'repeat-x';
            else if (value.includes('repeat-y')) result.repeat = 'repeat-y';
            else if (value.includes('no-repeat')) result.repeat = 'no-repeat';

            if (value.includes('left top')) result.position = 'left top';
            else if (value.includes('right top')) result.position = 'right top';
            else if (value.includes('left bottom')) result.position = 'left bottom';
            else if (value.includes('right bottom')) result.position = 'right bottom';

            if (value.includes('cover')) result.size = 'cover';
            else if (value.includes('contain')) result.size = 'contain';

            return result;
        };

        const buildValue = (state) => {
            let bg = state.color;

            if (state.imageType === 'url' && state.imageUrl) {
                bg = `${state.color} url(${state.imageUrl}) ${state.position}/${state.size} ${state.repeat}`;
            } else if (state.imageType === 'gradient') {
                bg = `linear-gradient(${state.gradientStart}, ${state.gradientEnd}) ${state.position}/${state.size} ${state.repeat}`;
            }

            return bg;
        };

        const state = ref(parseValue(props.modelValue));
        const color = computed(() => state.value.color);
        const imageType = computed(() => state.value.imageType);
        const imageUrl = computed(() => state.value.imageUrl);
        const gradientStart = computed(() => state.value.gradientStart);
        const gradientEnd = computed(() => state.value.gradientEnd);
        const repeat = computed(() => state.value.repeat);
        const position = computed(() => state.value.position);
        const size = computed(() => state.value.size);

        const emitValue = () => {
            const value = buildValue(state.value);
            emit('update:modelValue', value);
            emit('change', value);
        };

        const updateColor = (val) => {
            state.value.color = val || 'transparent';
            emitValue();
        };

        const updateImageType = (val) => {
            state.value.imageType = val;
            emitValue();
        };

        const updateImageUrl = (val) => {
            state.value.imageUrl = val;
            emitValue();
        };

        const updateGradientStart = (val) => {
            state.value.gradientStart = val || '#ffffff';
            emitValue();
        };

        const updateGradientEnd = (val) => {
            state.value.gradientEnd = val || '#000000';
            emitValue();
        };

        const updateRepeat = (val) => {
            state.value.repeat = val;
            emitValue();
        };

        const updatePosition = (val) => {
            state.value.position = val;
            emitValue();
        };

        const updateSize = (val) => {
            state.value.size = val;
            emitValue();
        };

        watch(() => props.modelValue, (val) => {
            state.value = parseValue(val);
        });

        return {
            color,
            imageType,
            imageUrl,
            gradientStart,
            gradientEnd,
            repeat,
            position,
            size,
            updateColor,
            updateImageType,
            updateImageUrl,
            updateGradientStart,
            updateGradientEnd,
            updateRepeat,
            updatePosition,
            updateSize
        };
    }
});
</script>

<style>
._fd-background-input {
    width: 100%;
}

._fd-background-input .el-select {
    width: 100%;
}
</style>
