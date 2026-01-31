<template>
    <div class="_fd-padding-input">
        <el-row :gutter="4">
            <el-col :span="6">
                <el-input-number
                    :model-value="top"
                    :min="0"
                    :max="10000"
                    size="small"
                    controls-position="right"
                    @update:modelValue="updateTop"
                    placeholder="上"
                />
                <div class="label">上</div>
            </el-col>
            <el-col :span="6">
                <el-input-number
                    :model-value="right"
                    :min="0"
                    :max="10000"
                    size="small"
                    controls-position="right"
                    @update:modelValue="updateRight"
                    placeholder="右"
                />
                <div class="label">右</div>
            </el-col>
            <el-col :span="6">
                <el-input-number
                    :model-value="bottom"
                    :min="0"
                    :max="10000"
                    size="small"
                    controls-position="right"
                    @update:modelValue="updateBottom"
                    placeholder="下"
                />
                <div class="label">下</div>
            </el-col>
            <el-col :span="6">
                <el-input-number
                    :model-value="left"
                    :min="0"
                    :max="10000"
                    size="small"
                    controls-position="right"
                    @update:modelValue="updateLeft"
                    placeholder="左"
                />
                <div class="label">左</div>
            </el-col>
        </el-row>
        <div class="link-row">
            <el-checkbox :model-value="linked" @update:modelValue="updateLinked">统一设置</el-checkbox>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
    name: 'PaddingInput',
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
            if (!value) {
                return { top: 0, right: 0, bottom: 0, left: 0, linked: true };
            }

            const match = value.match(/padding:\s*([^;]+)/);
            if (match) {
                const parts = match[1].trim().split(/\s+/);
                if (parts.length === 1) {
                    const val = parseInt(parts[0]) || 0;
                    return { top: val, right: val, bottom: val, left: val, linked: true };
                } else if (parts.length === 2) {
                    const top = parseInt(parts[0]) || 0;
                    const right = parseInt(parts[1]) || 0;
                    return { top, right, bottom: top, left: right, linked: false };
                } else if (parts.length === 4) {
                    return {
                        top: parseInt(parts[0]) || 0,
                        right: parseInt(parts[1]) || 0,
                        bottom: parseInt(parts[2]) || 0,
                        left: parseInt(parts[3]) || 0,
                        linked: false
                    };
                }
            }

            return { top: 0, right: 0, bottom: 0, left: 0, linked: true };
        };

        const buildValue = (state) => {
            if (state.linked) {
                const val = state.top || 0;
                return `padding: ${val}px`;
            } else if (state.top === state.bottom && state.right === state.left) {
                return `padding: ${state.top}px ${state.right}px`;
            } else {
                return `padding: ${state.top}px ${state.right}px ${state.bottom}px ${state.left}px`;
            }
        };

        const state = ref(parseValue(props.modelValue));
        const top = computed(() => state.value.top);
        const right = computed(() => state.value.right);
        const bottom = computed(() => state.value.bottom);
        const left = computed(() => state.value.left);
        const linked = computed(() => state.value.linked);

        const emitValue = () => {
            const value = buildValue(state.value);
            emit('update:modelValue', value);
            emit('change', value);
        };

        const updateTop = (val) => {
            state.value.top = val || 0;
            if (state.value.linked) {
                state.value.right = state.value.bottom = state.value.left = state.value.top;
            }
            emitValue();
        };

        const updateRight = (val) => {
            state.value.right = val || 0;
            emitValue();
        };

        const updateBottom = (val) => {
            state.value.bottom = val || 0;
            emitValue();
        };

        const updateLeft = (val) => {
            state.value.left = val || 0;
            emitValue();
        };

        const updateLinked = (val) => {
            state.value.linked = val;
            if (val) {
                state.value.right = state.value.bottom = state.value.left = state.value.top;
            }
            emitValue();
        };

        watch(() => props.modelValue, (val) => {
            state.value = parseValue(val);
        });

        return {
            top,
            right,
            bottom,
            left,
            linked,
            updateTop,
            updateRight,
            updateBottom,
            updateLeft,
            updateLinked
        };
    }
});
</script>

<style>
._fd-padding-input {
    width: 100%;
}

._fd-padding-input .el-input-number {
    width: 100%;
}

._fd-padding-input .label {
    text-align: center;
    font-size: 12px;
    color: #909399;
    margin-top: 2px;
}

._fd-padding-input .link-row {
    margin-top: 8px;
    text-align: center;
}
</style>
