<template>
    <div class="fc-infinite-table-form">
        <div class="form-header" v-if="title">
            <div class="form-title">{{ title }}</div>
            <div class="form-actions">
                <el-button size="small" type="primary" @click="addRow" v-if="!disabled && addable">
                    <el-icon><Plus /></el-icon>
                    {{ t('com.infiniteTableForm.add') }}
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
                @select="onSelect"
                @selection-change="onSelectionChange"
                @cell-click="onCellClick"
                @row-click="onRowClick"
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
                        :show-overflow-tooltip="col.showOverflowTooltip"
                    >
                        <template #default="{ row, $index }">
                            <component
                                :is="getCellComponent(col.type)"
                                v-if="col.type && col.type !== 'input'"
                                v-model="row[col.prop]"
                                :disabled="disabled || col.disabled"
                                :props="col.props"
                                :options="col.options"
                                @change="val => onCellChange(row, col, val, $index)"
                            />
                            <el-input
                                v-else
                                v-model="row[col.prop]"
                                :disabled="disabled || col.disabled"
                                :placeholder="col.placeholder"
                                size="small"
                                @change="val => onCellChange(row, col, val, $index)"
                            />
                        </template>
                    </el-table-column>
                </template>
                
                <el-table-column v-if="!disabled && (editable || deletable)" :label="t('com.infiniteTableForm.actions')" :width="actionsWidth" align="center">
                    <template #default="{ row, $index }">
                        <el-button v-if="editable" size="small" text type="primary" @click="editRow(row, $index)">
                            <el-icon><Edit /></el-icon>
                        </el-button>
                        <el-button v-if="deletable" size="small" text type="danger" @click="deleteRow(row, $index)">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        
        <div class="form-footer" v-if="showPagination && total > pageSize">
            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="total" layout="total, prev, pager, next" @current-change="onPageChange" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Plus, Edit, Delete } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'InfiniteTableForm',
    components: { Plus, Edit, Delete },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:data', 'change', 'add', 'edit', 'delete', 'select', 'selection-change', 'cell-change'],
    props: {
        modelValue: { type: Array, default: () => [] },
        data: { type: Array, default: () => [] },
        columns: { type: Array, default: () => [] },
        title: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        addable: { type: Boolean, default: true },
        editable: { type: Boolean, default: true },
        deletable: { type: Boolean, default: true },
        showSelection: { type: Boolean, default: false },
        showIndex: { type: Boolean, default: true },
        showPagination: { type: Boolean, default: false },
        stripe: { type: Boolean, default: false },
        border: { type: Boolean, default: false },
        size: { type: String, default: 'default' },
        fit: { type: Boolean, default: true },
        height: { type: [Number, String], default: 300 },
        indexLabel: { type: String, default: '#' },
        actionsWidth: { type: Number, default: 100 },
        pageSize: { type: Number, default: 20 },
        remoteData: { type: Boolean, default: false },
        remoteUrl: { type: String, default: '' }
    },
    setup(props, { emit, expose }) {
        const tableRef = ref(null);
        const contentRef = ref(null);
        const currentPage = ref(1);
        const tableData = ref([...props.data, ...props.modelValue]);
        
        const total = computed(() => tableData.value.length);
        
        const getCellComponent = (type) => {
            const map = {
                'select': 'el-select',
                'number': 'el-input-number',
                'date': 'el-date-picker',
                'switch': 'el-switch',
                'checkbox': 'el-checkbox'
            };
            return map[type] || 'input';
        };
        
        const onCellChange = (row, col, value, index) => {
            emit('cell-change', { row, column: col, value, index });
        };
        
        const onSelect = (selection, row) => emit('select', { selection, row });
        const onSelectionChange = (selection) => emit('selection-change', { selection });
        const onCellClick = (row, column, cell, event) => emit('cell-click', { row, column, cell, event });
        const onRowClick = (row, column, event) => emit('row-click', { row, column, event });
        
        const addRow = () => {
            const newRow = props.columns.reduce((acc, col) => {
                acc[col.prop] = col.defaultValue || null;
                return acc;
            }, { _id: Date.now() });
            tableData.value.push(newRow);
            emit('add', newRow, tableData.value.length - 1);
            emit('update:modelValue', tableData.value);
        };
        
        const editRow = (row, index) => emit('edit', { row, index });
        const deleteRow = (row, index) => {
            tableData.value.splice(index, 1);
            emit('delete', { row, index });
            emit('update:modelValue', tableData.value);
        };
        
        const onPageChange = (page) => { currentPage.value = page; };
        
        const getTableData = () => tableData.value;
        const validate = () => Promise.resolve(true);
        
        expose({ getTableData, validate, addRow, editRow, deleteRow, refresh: () => tableData.value });
        
        watch(() => props.data, (val) => { tableData.value = [...val, ...props.modelValue]; }, { deep: true });
        watch(() => props.modelValue, (val) => { tableData.value = [...props.data, ...val]; }, { deep: true });
        
        return {
            t, tableRef, contentRef, currentPage, tableData, total,
            getCellComponent, onCellChange, onSelect, onSelectionChange, onCellClick, onRowClick,
            addRow, editRow, deleteRow, onPageChange
        };
    }
});
</script>

<style>
.fc-infinite-table-form { width: 100%; border: 1px solid #e4e7ed; border-radius: 4px; overflow: hidden; }
.form-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f5f7fa; border-bottom: 1px solid #e4e7ed; }
.form-title { font-weight: 500; color: #303133; font-size: 14px; }
.form-content { padding: 0; }
.form-footer { display: flex; justify-content: flex-end; padding: 12px; border-top: 1px solid #ebeef5; }
</style>
