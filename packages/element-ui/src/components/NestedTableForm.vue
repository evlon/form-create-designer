<template>
    <div class="fc-nested-table-form">
        <div class="form-header" v-if="title">
            <div class="form-title">{{ title }}</div>
            <div class="form-actions">
                <el-button size="small" type="primary" @click="expandAll" v-if="expandable">
                    <el-icon><Rank /></el-icon>
                    {{ t('com.nestedTableForm.expandAll') }}
                </el-button>
                <el-button size="small" type="primary" @click="collapseAll" v-if="expandable">
                    <el-icon><Fold /></el-icon>
                    {{ t('com.nestedTableForm.collapseAll') }}
                </el-button>
                <el-button size="small" type="primary" @click="addRow" v-if="!disabled && addable">
                    <el-icon><Plus /></el-icon>
                    {{ t('com.nestedTableForm.add') }}
                </el-button>
            </div>
        </div>
        
        <div class="form-content" ref="contentRef">
            <el-table
                :data="tableData"
                :height="height"
                :stripe="stripe"
                :border="border"
                :size="size"
                :fit="fit"
                :default-expand-all="defaultExpandAll"
                :expand-row-keys="expandedRows"
                row-key="__unique_id__"
                @expand-change="onExpandChange"
                @selection-change="onSelectionChange"
                ref="tableRef"
            >
                <el-table-column v-if="showSelection" type="selection" width="55" />
                <el-table-column v-if="showIndex" type="index" :label="indexLabel" width="60" />
                
                <template v-for="col in columns" :key="col.prop">
                    <el-table-column
                        :prop="col.prop"
                        :label="col.label"
                        :width="col.width"
                        :min-width="col.minWidth"
                        :sortable="col.sortable"
                        :align="col.align || 'left'"
                    >
                        <template #default="{ row }">
                            <el-input
                                v-if="!col.type || col.type === 'input'"
                                v-model="row[col.prop]"
                                :disabled="disabled || col.disabled"
                                size="small"
                                @change="val => onCellChange(row, col, val)"
                            />
                            <el-select v-else-if="col.type === 'select'" v-model="row[col.prop]" :disabled="disabled || col.disabled" size="small" style="width: 100%">
                                <el-option v-for="opt in col.options" :key="opt.value" :label="opt.label" :value="opt.value" />
                            </el-select>
                            <el-input-number v-else-if="col.type === 'number'" v-model="row[col.prop]" :disabled="disabled || col.disabled" size="small" />
                            <el-switch v-else-if="col.type === 'switch'" v-model="row[col.prop]" :disabled="disabled || col.disabled" />
                        </template>
                    </el-table-column>
                </template>
                
                <el-table-column v-if="!disabled && (editable || deletable || childrenConfig)" :label="t('com.nestedTableForm.actions')" :width="actionsWidth" align="center">
                    <template #default="{ row, $index }">
                        <el-button v-if="childrenConfig" size="small" text type="primary" @click="addChild(row, $index)">
                            <el-icon><Plus /></el-icon>
                        </el-button>
                        <el-button v-if="editable" size="small" text type="primary" @click="editRow(row, $index)">
                            <el-icon><Edit /></el-icon>
                        </el-button>
                        <el-button v-if="deletable" size="small" text type="danger" @click="deleteRow(row, $index)">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
                
                <el-table-column v-if="childrenConfig" type="expand">
                    <template #default="{ row }">
                        <div class="child-table-wrapper">
                            <el-table :data="row.__children__ || []" size="small" border>
                                <el-table-column v-for="childCol in childrenConfig.columns" :key="childCol.prop" :prop="childCol.prop" :label="childCol.label" />
                                <el-table-column v-if="!disabled" label="Actions" width="100" align="center">
                                    <template #default="{ row: childRow, $index: childIdx }">
                                        <el-button size="small" text type="danger" @click="deleteChild(row, childIdx)">
                                            <el-icon><Delete /></el-icon>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Plus, Edit, Delete, Rank, Fold } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'NestedTableForm',
    components: { Plus, Edit, Delete, Rank, Fold },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'add', 'edit', 'delete', 'add-child', 'delete-child', 'expand-change', 'selection-change'],
    props: {
        modelValue: { type: Array, default: () => [] },
        columns: { type: Array, default: () => [] },
        childrenConfig: { type: Object, default: null },
        title: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        addable: { type: Boolean, default: true },
        editable: { type: Boolean, default: true },
        deletable: { type: Boolean, default: true },
        expandable: { type: Boolean, default: true },
        defaultExpandAll: { type: Boolean, default: false },
        showSelection: { type: Boolean, default: false },
        showIndex: { type: Boolean, default: true },
        stripe: { type: Boolean, default: false },
        border: { type: Boolean, default: false },
        size: { type: String, default: 'small' },
        fit: { type: Boolean, default: true },
        height: { type: [Number, String], default: null },
        indexLabel: { type: String, default: '#' },
        actionsWidth: { type: Number, default: 150 }
    },
    setup(props, { emit, expose }) {
        const tableRef = ref(null);
        const contentRef = ref(null);
        const expandedRows = ref([]);
        const uniqueId = ref(0);
        const tableData = ref([]);
        
        const generateUniqueId = () => 'nested_' + Date.now() + '_' + (++uniqueId.value);
        
        const initData = (data, level = 0) => {
            return data.map((item, idx) => ({
                ...item,
                __unique_id__: item.__unique_id__ || generateUniqueId(),
                __level__: level,
                __children__: item.__children__ ? initData(item.__children__, level + 1) : []
            }));
        };
        
        const onCellChange = (row, col, value) => {
            emit('change', { row, column: col, value });
        };
        
        const onExpandChange = (row, expanded) => {
            const idx = expandedRows.value.indexOf(row.__unique_id__);
            if (expanded && idx === -1) {
                expandedRows.value.push(row.__unique_id__);
            } else if (!expanded && idx > -1) {
                expandedRows.value.splice(idx, 1);
            }
            emit('expand-change', { row, expanded });
        };
        
        const onSelectionChange = (selection) => emit('selection-change', { selection });
        
        const addRow = () => {
            const newRow = {
                __unique_id__: generateUniqueId(),
                __level__: 0,
                __children__: [],
                ...props.columns.reduce((acc, col) => ({ ...acc, [col.prop]: col.defaultValue || null }), {})
            };
            tableData.value.push(newRow);
            emit('add', newRow, tableData.value.length - 1);
            emit('update:modelValue', tableData.value);
        };
        
        const addChild = (parentRow, parentIdx) => {
            if (!parentRow.__children__) parentRow.__children__ = [];
            const newChild = {
                __unique_id__: generateUniqueId(),
                ...props.childrenConfig.columns.reduce((acc, col) => ({ ...acc, [col.prop]: col.defaultValue || null }), {})
            };
            parentRow.__children__.push(newChild);
            emit('add-child', { parent: parentRow, child: newChild, index: parentRow.__children__.length - 1 });
            emit('update:modelValue', tableData.value);
        };
        
        const editRow = (row, index) => emit('edit', { row, index });
        const deleteRow = (row, index) => {
            tableData.value.splice(index, 1);
            emit('delete', { row, index });
            emit('update:modelValue', tableData.value);
        };
        
        const deleteChild = (parentRow, childIdx) => {
            const deleted = parentRow.__children__.splice(childIdx, 1);
            emit('delete-child', { parent: parentRow, child: deleted[0], index: childIdx });
            emit('update:modelValue', tableData.value);
        };
        
        const expandAll = () => {
            expandedRows.value = tableData.value.map(row => row.__unique_id__);
        };
        
        const collapseAll = () => {
            expandedRows.value = [];
        };
        
        const getTableData = () => tableData.value;
        const validate = () => Promise.resolve(true);
        
        expose({ getTableData, validate, addRow, addChild, editRow, deleteRow, deleteChild, expandAll, collapseAll });
        
        watch(() => props.modelValue, (val) => {
            tableData.value = initData(Array.isArray(val) ? val : []);
        }, { immediate: true, deep: true });
        
        return {
            t, tableRef, contentRef, tableData, expandedRows,
            onCellChange, onExpandChange, onSelectionChange,
            addRow, addChild, editRow, deleteRow, deleteChild,
            expandAll, collapseAll
        };
    }
});
</script>

<style>
.fc-nested-table-form { width: 100%; border: 1px solid #e4e7ed; border-radius: 4px; overflow: hidden; }
.form-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f5f7fa; border-bottom: 1px solid #e4e7ed; }
.form-title { font-weight: 500; color: #303133; font-size: 14px; }
.form-actions { display: flex; gap: 8px; }
.form-content { padding: 0; }
.child-table-wrapper { padding: 16px; background: #fafafa; margin: 8px; border-radius: 4px; }
</style>
