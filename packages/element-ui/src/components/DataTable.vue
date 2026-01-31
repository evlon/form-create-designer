<template>
    <div class="fc-data-table" ref="containerRef">
        <div class="table-header" v-if="showHeader">
            <div class="table-title">{{ title }}</div>
            <div class="table-actions" v-if="!disabled && showActions">
                <el-button size="small" @click="refreshData">
                    <el-icon><Refresh /></el-icon>
                </el-button>
                <el-button size="small" @click="showColumnConfig = true">
                    <el-icon><Setting /></el-icon>
                </el-button>
                <el-button size="small" type="primary" @click="exportData" v-if="showExport">
                    <el-icon><Download /></el-icon>
                </el-button>
            </div>
        </div>
        
        <el-table
            :data="tableData"
            :height="tableHeight"
            :max-height="maxHeight"
            :stripe="stripe"
            :border="border"
            :size="size"
            :fit="fit"
            :show-header="showHeader"
            :highlight-current-row="highlightCurrentRow"
            :row-class-name="rowClassName"
            :cell-class-name="cellClassName"
            @select="onSelect"
            @select-all="onSelectAll"
            @selection-change="onSelectionChange"
            @cell-click="onCellClick"
            @cell-dblclick="onCellDblClick"
            @row-click="onRowClick"
            @row-dblclick="onRowDblClick"
            @header-click="onHeaderClick"
            @sort-change="onSortChange"
            @filter-change="onFilterChange"
            ref="tableRef"
        >
            <el-table-column
                v-if="showSelection"
                type="selection"
                :width="selectionWidth"
                :fixed="selectionFixed"
            />
            
            <el-table-column
                v-if="showIndex"
                type="index"
                :label="indexLabel"
                :width="indexWidth"
                :fixed="indexFixed"
                :index="indexMethod"
            />
            
            <template v-for="col in visibleColumns" :key="col.prop">
                <el-table-column
                    :prop="col.prop"
                    :label="col.label"
                    :width="col.width"
                    :min-width="col.minWidth"
                    :fixed="col.fixed"
                    :sortable="col.sortable"
                    :sort-by="col.sortBy"
                    :filters="col.filters"
                    :filter-method="col.filterMethod"
                    :filtered-value="col.filteredValue"
                    :align="col.align || 'left'"
                    :header-align="col.headerAlign"
                    :class-name="col.className"
                    :label-class-name="col.labelClassName"
                    :show-overflow-tooltip="col.showOverflowTooltip"
                >
                    <template #default="scope" v-if="col.slot">
                        <slot :name="col.prop" :row="scope.row" :column="scope.column" :$index="scope.$index">
                            {{ scope.row[col.prop] }}
                        </slot>
                    </template>
                </el-table-column>
            </template>
            
            <el-table-column
                v-if="showActions && !disabled"
                :label="t('com.dataTable.operations')"
                :width="actionsWidth"
                :fixed="actionsFixed"
                align="center"
            >
                <template #default="scope">
                    <slot name="actions" :row="scope.row" :$index="scope.$index">
                        <el-button size="small" type="primary" link @click="editRow(scope.row, scope.$index)">
                            <el-icon><Edit /></el-icon>
                        </el-button>
                        <el-button size="small" type="danger" link @click="deleteRow(scope.row, scope.$index)">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        
        <div class="table-footer" v-if="showPagination">
            <el-pagination
                v-model:current-page="currentPage"
                :page-size="pageSize"
                :page-sizes="pageSizes"
                :total="total"
                :layout="paginationLayout"
                :background="paginationBackground"
                @size-change="onSizeChange"
                @current-change="onPageChange"
            />
        </div>
        
        <el-drawer
            v-model="showColumnConfig"
            :title="t('com.dataTable.columnConfig')"
            direction="rtl"
            size="300px"
        >
            <div class="column-config-list">
                <div
                    v-for="col in allColumns"
                    :key="col.prop"
                    class="column-config-item"
                >
                    <el-checkbox v-model="col.visible" :disabled="col.required">
                        {{ col.label }}
                    </el-checkbox>
                    <el-button
                        v-if="!col.required"
                        size="small"
                        type="text"
                        @click="moveColumn(col, -1)"
                        :disabled="col.visible && isFirstVisible(col)"
                    >
                        <el-icon><Top /></el-icon>
                    </el-button>
                    <el-button
                        v-if="!col.required"
                        size="small"
                        type="text"
                        @click="moveColumn(col, 1)"
                        :disabled="col.visible && isLastVisible(col)"
                    >
                        <el-icon><Bottom /></el-icon>
                    </el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { Refresh, Setting, Download, Edit, Delete, Top, Bottom } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'DataTable',
    components: {
        Refresh,
        Setting,
        Download,
        Edit,
        Delete,
        Top,
        Bottom
    },
    inject: ['designer'],
    emits: [
        'update:data', 'update:columns',
        'select', 'select-all', 'selection-change',
        'cell-click', 'cell-dblclick',
        'row-click', 'row-dblclick',
        'header-click', 'sort-change', 'filter-change',
        'edit', 'delete', 'refresh', 'export'
    ],
    props: {
        data: {
            type: Array,
            default: () => []
        },
        columns: {
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
        showHeader: {
            type: Boolean,
            default: true
        },
        showActions: {
            type: Boolean,
            default: true
        },
        showSelection: {
            type: Boolean,
            default: false
        },
        showIndex: {
            type: Boolean,
            default: false
        },
        showExport: {
            type: Boolean,
            default: true
        },
        showPagination: {
            type: Boolean,
            default: true
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default'
        },
        fit: {
            type: Boolean,
            default: true
        },
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        tableHeight: {
            type: [Number, String],
            default: null
        },
        maxHeight: {
            type: [Number, String],
            default: null
        },
        indexLabel: {
            type: String,
            default: '#'
        },
        selectionWidth: {
            type: Number,
            default: 55
        },
        indexWidth: {
            type: Number,
            default: 55
        },
        actionsWidth: {
            type: Number,
            default: 120
        },
        selectionFixed: {
            type: [Boolean, String],
            default: false
        },
        indexFixed: {
            type: [Boolean, String],
            default: false
        },
        actionsFixed: {
            type: [Boolean, String],
            default: 'right'
        },
        paginationLayout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
        },
        paginationBackground: {
            type: Boolean,
            default: true
        },
        pageSize: {
            type: Number,
            default: 10
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 50, 100]
        },
        total: {
            type: Number,
            default: 0
        },
        remoteData: {
            type: Boolean,
            default: false
        },
        remoteUrl: {
            type: String,
            default: ''
        },
        rowClassName: [Function, String],
        cellClassName: [Function, String]
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const tableRef = ref(null);
        const currentPage = ref(1);
        const showColumnConfig = ref(false);
        const allColumns = ref([]);
        const tableData = ref([...props.data]);
        
        const visibleColumns = computed(() => {
            return allColumns.value.filter(col => col.visible !== false);
        });
        
        const initColumns = () => {
            allColumns.value = props.columns.map(col => ({
                visible: col.visible !== false,
                required: col.required || false,
                ...col
            }));
        };
        
        const indexMethod = (index) => {
            return (currentPage.value - 1) * props.pageSize + index + 1;
        };
        
        const isFirstVisible = (col) => {
            const visible = allColumns.value.filter(c => c.visible !== false);
            return visible.indexOf(col) === 0;
        };
        
        const isLastVisible = (col) => {
            const visible = allColumns.value.filter(c => c.visible !== false);
            return visible.indexOf(col) === visible.length - 1;
        };
        
        const moveColumn = (col, direction) => {
            const visible = allColumns.value.filter(c => c.visible !== false);
            const idx = visible.indexOf(col);
            const newIdx = idx + direction;
            if (newIdx >= 0 && newIdx < visible.length) {
                visible.splice(idx, 1);
                visible.splice(newIdx, 0, col);
                allColumns.value = [...visible];
            }
        };
        
        const refreshData = async () => {
            if (props.remoteData && props.remoteUrl) {
                try {
                    const response = await fetch(`${props.remoteUrl}?page=${currentPage.value}&size=${props.pageSize}`);
                    const result = await response.json();
                    tableData.value = result.data || result;
                    emit('refresh', tableData.value);
                } catch (e) {
                    console.error('[DataTable] Refresh error:', e);
                }
            } else {
                emit('refresh', tableData.value);
            }
        };
        
        const exportData = () => {
            const exportData = tableData.value.map((row, index) => {
                const newRow = { ...row };
                newRow._index = index + 1;
                return newRow;
            });
            
            const headers = visibleColumns.value.map(col => col.label);
            const fields = visibleColumns.value.map(col => col.prop);
            
            const csvContent = [
                headers.join(','),
                ...exportData.map(row =>
                    fields.map(field => {
                        const val = row[field];
                        if (typeof val === 'string' && val.includes(',')) {
                            return `"${val}"`;
                        }
                        return val ?? '';
                    }).join(',')
                )
            ].join('\n');
            
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${props.title || 'export'}.csv`;
            link.click();
            
            emit('export', exportData);
        };
        
        const editRow = (row, index) => {
            emit('edit', { row, index });
        };
        
        const deleteRow = (row, index) => {
            emit('delete', { row, index });
        };
        
        const onSelect = (selection, row) => {
            emit('select', { selection, row });
        };
        
        const onSelectAll = (selection) => {
            emit('select-all', { selection });
        };
        
        const onSelectionChange = (selection) => {
            emit('selection-change', { selection });
        };
        
        const onCellClick = (row, column, cell, event) => {
            emit('cell-click', { row, column, cell, event });
        };
        
        const onCellDblClick = (row, column, cell, event) => {
            emit('cell-dblclick', { row, column, cell, event });
        };
        
        const onRowClick = (row, column, event) => {
            emit('row-click', { row, column, event });
        };
        
        const onRowDblClick = (row, column, event) => {
            emit('row-dblclick', { row, column, event });
        };
        
        const onHeaderClick = (column, event) => {
            emit('header-click', { column, event });
        };
        
        const onSortChange = ({ prop, order }) => {
            emit('sort-change', { prop, order });
        };
        
        const onFilterChange = (filters) => {
            emit('filter-change', { filters });
        };
        
        const onSizeChange = (size) => {
            emit('update:data', { size, page: currentPage.value });
        };
        
        const onPageChange = (page) => {
            currentPage.value = page;
            emit('update:data', { size: props.pageSize, page });
        };
        
        const getSelectionRows = () => {
            return tableRef.value?.getSelectionRows() || [];
        };
        
        const toggleRowSelection = (row, selected) => {
            tableRef.value?.toggleRowSelection(row, selected);
        };
        
        const clearSelection = () => {
            tableRef.value?.clearSelection();
        };
        
        const doLayout = () => {
            tableRef.value?.doLayout();
        };
        
        expose({
            refresh: refreshData,
            export: exportData,
            getSelectionRows,
            toggleRowSelection,
            clearSelection,
            doLayout
        });
        
        watch(() => props.data, (newData) => {
            tableData.value = [...newData];
        }, { deep: true });
        
        watch(() => props.columns, initColumns, { immediate: true, deep: true });
        
        return {
            t,
            containerRef,
            tableRef,
            currentPage,
            showColumnConfig,
            allColumns,
            tableData,
            visibleColumns,
            indexMethod,
            isFirstVisible,
            isLastVisible,
            moveColumn,
            refreshData,
            exportData,
            editRow,
            deleteRow,
            onSelect,
            onSelectAll,
            onSelectionChange,
            onCellClick,
            onCellDblClick,
            onRowClick,
            onRowDblClick,
            onHeaderClick,
            onSortChange,
            onFilterChange,
            onSizeChange,
            onPageChange
        };
    }
});
</script>

<style>
.fc-data-table {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.table-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.table-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.table-actions {
    display: flex;
    gap: 8px;
}

.table-footer {
    display: flex;
    justify-content: flex-end;
    padding: 12px 16px;
    border-top: 1px solid #ebeef5;
}

.column-config-list {
    padding: 16px;
}

.column-config-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    border-bottom: 1px solid #ebeef5;
}

.column-config-item:last-child {
    border-bottom: none;
}
</style>
