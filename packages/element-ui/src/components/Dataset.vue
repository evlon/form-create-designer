<template>
    <div class="fc-dataset" ref="containerRef">
        <div class="dataset-header" v-if="title">
            <div class="dataset-title">{{ title }}</div>
            <div class="dataset-actions" v-if="!disabled">
                <el-button size="small" type="primary" @click="importData" v-if="importable">
                    <el-icon><Upload /></el-icon>
                    {{ t('com.dataset.import') }}
                </el-button>
                <el-button size="small" @click="exportData" v-if="exportable">
                    <el-icon><Download /></el-icon>
                    {{ t('com.dataset.export') }}
                </el-button>
                <el-button size="small" type="primary" @click="addItem" v-if="addable">
                    <el-icon><Plus /></el-icon>
                    {{ t('com.dataset.add') }}
                </el-button>
            </div>
        </div>
        
        <div class="dataset-content">
            <el-table :data="dataset" :height="height" :stripe="stripe" :border="border" size="small" @selection-change="onSelectionChange" ref="tableRef">
                <el-table-column v-if="showSelection" type="selection" width="55" />
                <el-table-column v-if="showIndex" type="index" :label="indexLabel" width="60" />
                
                <template v-for="col in columns" :key="col.key">
                    <el-table-column :prop="col.key" :label="col.label" :width="col.width" :sortable="col.sortable" :align="col.align || 'left'">
                        <template #default="{ row, $index }">
                            <el-input v-if="editableColumns.includes(col.key)" v-model="row[col.key]" size="small" @change="onDataChange(row, $index)" />
                            <span v-else>{{ row[col.key] }}</span>
                        </template>
                    </el-table-column>
                </template>
                
                <el-table-column v-if="!disabled && rowActions.length" :label="t('com.dataset.actions')" :width="actionsWidth" align="center">
                    <template #default="{ row, $index }">
                        <el-button v-for="action in rowActions" :key="action.key" size="small" :type="action.type || 'primary'" text @click="onRowAction(action, row, $index)">
                            <el-icon><component :is="action.icon || 'Edit'" /></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="dataset-footer" v-if="showSummary">
            <div class="summary-stats">
                <span>{{ t('com.dataset.total') }}: {{ dataset.length }}</span>
                <span v-if="selectedRows.length">{{ t('com.dataset.selected') }}: {{ selectedRows.length }}</span>
            </div>
        </div>
        
        <el-dialog v-model="importDialogVisible" :title="t('com.dataset.importData')" width="500px">
            <el-input v-model="importText" type="textarea" :rows="10" placeholder="JSON array format" />
            <template #footer>
                <el-button @click="importDialogVisible = false">{{ t('props.cancel') }}</el-button>
                <el-button type="primary" @click="confirmImport">{{ t('props.ok') }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Upload, Download, Plus, Edit, Delete } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'Dataset',
    components: { Upload, Download, Plus, Edit, Delete },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:data', 'change', 'selection-change', 'row-action', 'import', 'export'],
    props: {
        modelValue: { type: Array, default: () => [] },
        title: { type: String, default: '' },
        columns: { type: Array, default: () => [] },
        disabled: { type: Boolean, default: false },
        addable: { type: Boolean, default: true },
        editable: { type: Boolean, default: true },
        deletable: { type: Boolean, default: true },
        importable: { type: Boolean, default: true },
        exportable: { type: Boolean, default: true },
        showSelection: { type: Boolean, default: true },
        showIndex: { type: Boolean, default: true },
        showSummary: { type: Boolean, default: true },
        stripe: { type: Boolean, default: false },
        border: { type: Boolean, default: false },
        height: { type: [Number, String], default: null },
        indexLabel: { type: String, default: '#' },
        actionsWidth: { type: Number, default: 100 },
        editableColumns: { type: Array, default: () => [] },
        rowActions: { type: Array, default: () => [] }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const tableRef = ref(null);
        const dataset = ref([...props.modelValue]);
        const selectedRows = ref([]);
        const importDialogVisible = ref(false);
        const importText = ref('');
        
        const onSelectionChange = (selection) => {
            selectedRows.value = selection;
            emit('selection-change', { selection });
        };
        
        const onDataChange = (row, index) => {
            emit('change', { row, index, data: dataset.value });
        };
        
        const onRowAction = (action, row, index) => {
            if (action.key === 'delete' && props.deletable) {
                dataset.value.splice(index, 1);
            }
            emit('row-action', { action, row, index });
            emit('update:modelValue', dataset.value);
        };
        
        const addItem = () => {
            const newItem = props.columns.reduce((acc, col) => ({ ...acc, [col.key]: '' }), {});
            dataset.value.push(newItem);
            emit('update:modelValue', dataset.value);
        };
        
        const importData = () => { importDialogVisible.value = true; importText.value = ''; };
        
        const confirmImport = () => {
            try {
                const data = JSON.parse(importText.value);
                if (Array.isArray(data)) {
                    dataset.value = [...dataset.value, ...data];
                    emit('update:modelValue', dataset.value);
                    emit('import', data);
                }
            } catch (e) {
                console.error('Import error:', e);
            }
            importDialogVisible.value = false;
        };
        
        const exportData = () => {
            const data = JSON.stringify(dataset.value, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'dataset.json';
            a.click();
            emit('export', dataset.value);
        };
        
        const getData = () => dataset.value;
        const getSelected = () => selectedRows.value;
        
        expose({ getData, getSelected, addItem, importData, exportData });
        
        watch(() => props.modelValue, (val) => {
            if (JSON.stringify(dataset.value) !== JSON.stringify(val)) {
                dataset.value = [...val];
            }
        }, { deep: true });
        
        return {
            t, containerRef, tableRef, dataset, selectedRows, importDialogVisible, importText,
            onSelectionChange, onDataChange, onRowAction, addItem, importData, confirmImport, exportData
        };
    }
});
</script>

<style>
.fc-dataset { width: 100%; border: 1px solid #e4e7ed; border-radius: 4px; overflow: hidden; }
.dataset-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f5f7fa; border-bottom: 1px solid #e4e7ed; }
.dataset-title { font-weight: 500; color: #303133; font-size: 14px; }
.dataset-actions { display: flex; gap: 8px; }
.dataset-content { padding: 0; }
.dataset-footer { padding: 8px 16px; background: #fafafa; border-top: 1px solid #ebeef5; }
.summary-stats { display: flex; gap: 16px; font-size: 12px; color: #909399; }
</style>
