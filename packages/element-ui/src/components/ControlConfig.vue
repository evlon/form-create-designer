<template>
    <div class="_fc-control-config">
        <div class="control-item" v-for="(item, index) in controls" :key="index">
            <el-row :gutter="8" align="middle">
                <el-col :span="8">
                    <el-select 
                        v-model="item.field" 
                        placeholder="选择字段"
                        clearable
                        size="small"
                    >
                        <el-option 
                            v-for="field in fieldList" 
                            :key="field" 
                            :label="field" 
                            :value="field" 
                        />
                    </el-select>
                </el-col>
                <el-col :span="5">
                    <el-select v-model="item.operator" size="small">
                        <el-option label="==" value="==" />
                        <el-option label="!=" value="!=" />
                        <el-option label=">" value=">" />
                        <el-option label=">=" value=">=" />
                        <el-option label="<" value="<" />
                        <el-option label="<=" value="<=" />
                        <el-option label="包含" value="includes" />
                        <el-option label="不包含" value="excludes" />
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-input v-model="item.value" placeholder="值" size="small" />
                </el-col>
                <el-col :span="4">
                    <el-button 
                        type="danger" 
                        size="small" 
                        @click="removeControl(index)"
                    >
                        删除
                    </el-button>
                </el-col>
            </el-row>
        </div>
        
        <div class="control-actions">
            <el-button type="primary" size="small" @click="addControl">
                添加条件
            </el-button>
            <el-button size="small" @click="addGroup">
                添加条件组
            </el-button>
        </div>
        
        <div class="logic-mode">
            <el-radio-group v-model="logic" @change="updateLogic">
                <el-radio label="AND">并且</el-radio>
                <el-radio label="OR">或者</el-radio>
            </el-radio-group>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';

export default defineComponent({
    name: 'ControlConfig',
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        }
    },
    setup(props, { emit }) {
        const controls = ref([]);
        const logic = ref('AND');

        const fieldList = computed(() => {
            return props.modelValue?.fieldList || [];
        });

        const initValue = () => {
            if (props.modelValue) {
                if (props.modelValue.conditions) {
                    controls.value = props.modelValue.conditions;
                }
                if (props.modelValue.logic) {
                    logic.value = props.modelValue.logic;
                }
            }
        };

        const addControl = () => {
            controls.value.push({
                field: '',
                operator: '==',
                value: ''
            });
            updateValue();
        };

        const addGroup = () => {
            controls.value.push({
                type: 'group',
                children: [],
                logic: 'AND'
            });
            updateValue();
        };

        const removeControl = (index) => {
            controls.value.splice(index, 1);
            updateValue();
        };

        const updateValue = () => {
            emit('update:modelValue', {
                conditions: controls.value,
                logic: logic.value
            });
            emit('change', {
                conditions: controls.value,
                logic: logic.value
            });
        };

        const updateLogic = () => {
            updateValue();
        };

        watch(() => props.modelValue, (newVal) => {
            initValue();
        }, { deep: true, immediate: true });

        return {
            controls,
            logic,
            fieldList,
            addControl,
            addGroup,
            removeControl,
            updateLogic
        };
    }
});
</script>

<style>
._fc-control-config {
    width: 100%;
}

._fc-control-config .control-item {
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ebeef5;
    border-radius: 4px;
}

._fc-control-config .control-actions {
    display: flex;
    gap: 8px;
    margin-top: 12px;
}

._fc-control-config .logic-mode {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ebeef5;
}
</style>
