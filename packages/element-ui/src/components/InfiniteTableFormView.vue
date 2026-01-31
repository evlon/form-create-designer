<template>
  <div class="infinite-table-form-view" :style="containerStyle">
    <div class="view-header">
      <span class="view-title">{{ t('com.InfiniteTableFormView.title') }}</span>
      <div class="view-actions">
        <el-button size="small" @click="refresh">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <el-button size="small" type="primary" @click="addRow">
          <el-icon><Plus /></el-icon>
          {{ t('com.infiniteTableFormView.addRow') }}
        </el-button>
      </div>
    </div>

    <el-table
      v-loading="loading"
      :data="displayData"
      :height="tableHeight"
      :row-height="rowHeight"
      stripe
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="config.showIndex" type="index" :label="t('com.infiniteTableFormView.index')" width="60" />
      <el-table-column v-if="config.showSelection" type="selection" width="50" />

      <el-table-column
        v-for="col in visibleColumns"
        :key="col.field"
        :prop="col.field"
        :label="col.label || col.field"
        :width="col.width"
        :min-width="col.minWidth || 100"
      >
        <template #default="{ row, $index }">
          <el-input
            v-if="col.editable"
            v-model="row[col.field]"
            :readonly="!col.editable"
            size="small"
            @change="handleCellChange($event, col.field, row, $index)"
          />
          <span v-else>{{ row[col.field] }}</span>
        </template>
      </el-table-column>

      <el-table-column v-if="config.showActions" :label="t('com.infiniteTableFormView.actions')" width="120" fixed="right">
        <template #default="{ row, $index }">
          <el-button type="primary" link size="small" @click="editRow(row, $index)">
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button type="danger" link size="small" @click="deleteRow($index)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="view-footer">
      <span class="data-count">{{ dataCountText }}</span>
      <el-pagination
        v-if="config.showPagination"
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, inject } from 'vue'
import { Plus, Edit, Delete, Refresh } from '@element-plus/icons-vue'
import { t } from '../utils/locale'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  config: {
    type: Object,
    default: () => ({
      columns: [],
      showIndex: true,
      showSelection: true,
      showActions: true,
      showPagination: true,
      pageSize: 20,
      rowHeight: 60,
      height: 400
    })
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'add', 'edit', 'delete', 'refresh'])

const designer = inject('designer')

const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(props.config.pageSize || 20)
const selectedRows = ref([])
const localData = reactive([...props.modelValue])

const containerStyle = computed(() => {
  const style = {}
  if (props.config.width) {
    style.width = props.config.width
  }
  return style
})

const tableHeight = computed(() => {
  return props.config.height || 400
})

const rowHeight = computed(() => {
  return props.config.rowHeight || 60
})

const total = computed(() => localData.length)

const dataCountText = computed(() => {
  return t('com.infiniteTableFormView.dataCount').replace('{total}', total.value).replace('{visible}', displayData.value.length)
})

const visibleColumns = computed(() => {
  return (props.config.columns || []).filter(col => col.visible !== false)
})

const displayData = computed(() => {
  if (!props.config.showPagination) {
    return localData.slice(0, pageSize.value)
  }
  const start = (currentPage.value - 1) * pageSize.value
  return localData.slice(start, start + pageSize.value)
})

watch(() => props.modelValue, (val) => {
  localData.splice(0, localData.length, ...val)
}, { deep: true })

watch(localData, (val) => {
  emit('update:modelValue', [...val])
  emit('change', val)
}, { deep: true })

function handleSelectionChange(selection) {
  selectedRows.value = selection
}

function handleCellChange(value, field, row, index) {
  const realIndex = (currentPage.value - 1) * pageSize.value + index
  localData[realIndex][field] = value
  emit('change', { data: localData, row, field, index: realIndex })
}

function handlePageChange(page) {
  currentPage.value = page
}

function addRow() {
  const newRow = {}
  props.config.columns?.forEach(col => {
    newRow[col.field] = col.defaultValue || null
  })
  localData.unshift(newRow)
  emit('add', { row: newRow, index: 0 })
  designer?.notify?.('success', t('com.infiniteTableFormView.rowAdded'))
}

function editRow(row, index) {
  const realIndex = (currentPage.value - 1) * pageSize.value + index
  emit('edit', { row, index: realIndex })
}

function deleteRow(index) {
  const realIndex = (currentPage.value - 1) * pageSize.value + index
  localData.splice(realIndex, 1)
  emit('delete', { index: realIndex })
  designer?.notify?.('success', t('com.infiniteTableFormView.rowDeleted'))
}

function refresh() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    emit('refresh', { data: localData })
  }, 500)
}
</script>

<style scoped>
.infinite-table-form-view {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.view-actions {
  display: flex;
  gap: 8px;
}

.view-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.data-count {
  font-size: 13px;
  color: #909399;
}
</style>
