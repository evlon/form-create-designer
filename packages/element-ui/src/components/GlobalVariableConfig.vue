<template>
    <div class="fc-global-config">
        <div class="config-header" v-if="title">
            <div class="config-title">{{ title }}</div>
            <div class="config-actions">
                <el-button size="small" type="primary" @click="addVariable" v-if="!disabled">
                    <el-icon><Plus /></el-icon>
                    {{ t('com.globalVariableConfig.add') }}
                </el-button>
            </div>
        </div>
        
        <div class="config-content">
            <el-table :data="variables" border stripe size="small">
                <el-table-column :label="t('com.globalVariableConfig.name')" width="150">
                    <template #default="{ row }">
                        <el-input
                            v-model="row.name"
                            :disabled="disabled || row.system"
                            size="small"
                            :placeholder="t('com.globalVariableConfig.namePlaceholder')"
                            @change="onChange"
                        />
                    </template>
                </el-table-column>
                
                <el-table-column :label="t('com.globalVariableConfig.value')">
                    <template #default="{ row }">
                        <el-input
                            v-model="row.value"
                            :disabled="disabled"
                            size="small"
                            :placeholder="t('com.globalVariableConfig.valuePlaceholder')"
                            @change="onChange"
                        />
                    </template>
                </el-table-column>
                
                <el-table-column :label="t('com.globalVariableConfig.description')" width="200">
                    <template #default="{ row }">
                        <el-input
                            v-model="row.description"
                            :disabled="disabled"
                            size="small"
                            :placeholder="t('com.globalVariableConfig.descriptionPlaceholder')"
                            @change="onChange"
                        />
                    </template>
                </el-table-column>
                
                <el-table-column :label="t('com.globalVariableConfig.scope')" width="120">
                    <template #default="{ row }">
                        <el-select
                            v-model="row.scope"
                            :disabled="disabled || row.system"
                            size="small"
                            style="width: 100%"
                        >
                            <el-option label="Global" value="global" />
                            <el-option label="Page" value="page" />
                            <el-option label="Form" value="form" />
                        </el-select>
                    </template>
                </el-table-column>
                
                <el-table-column :label="t('com.globalVariableConfig.actions')" width="80" v-if="!disabled">
                    <template #default="{ row, $index }">
                        <el-button
                            size="small"
                            type="danger"
                            text
                            :disabled="row.system"
                            @click="removeVariable($index)"
                        >
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="config-tips" v-if="showTips">
            <el-alert :title="t('com.globalVariableConfig.tips')" type="info" show-icon :closable="false" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'GlobalVariableConfig',
    components: { Plus, Delete },
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showTips: {
            type: Boolean,
            default: true
        },
        systemVariables: {
            type: Array,
            default: () => [
                { name: 'formId', value: '', description: 'Form ID', scope: 'global', system: true },
                { name: 'userId', value: '', description: 'Current user ID', scope: 'global', system: true },
                { name: 'timestamp', value: '', description: 'Current timestamp', scope: 'global', system: true }
            ]
        }
    },
    setup(props, { emit, expose }) {
        const variables = ref([...props.systemVariables, ...props.modelValue]);
        
        const addVariable = () => {
            variables.value.push({
                name: '',
                value: '',
                description: '',
                scope: 'global',
                system: false
            });
            onChange();
        };
        
        const removeVariable = (index) => {
            variables.value.splice(index, 1);
            onChange();
        };
        
        const onChange = () => {
            const customVars = variables.value.filter(v => !v.system);
            emit('update:modelValue', customVars);
            emit('change', customVars);
        };
        
        const getVariables = () => {
            return variables.value.reduce((acc, v) => {
                if (v.name) acc[v.name] = v.value;
                return acc;
            }, {});
        };
        
        const reset = () => {
            variables.value = [...props.systemVariables, ...props.modelValue];
        };
        
        expose({ getVariables, reset, addVariable, removeVariable });
        
        watch(() => props.modelValue, (val) => {
            const customVars = variables.value.filter(v => !v.system);
            if (JSON.stringify(customVars) !== JSON.stringify(val)) {
                variables.value = [...props.systemVariables, ...val];
            }
        }, { deep: true });
        
        return { t, variables, addVariable, removeVariable, onChange };
    }
});
</script>

<style>
.fc-global-config {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.config-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.config-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.config-content {
    padding: 16px;
}

.config-tips {
    padding: 0 16px 16px;
}
</style>
