<template>
  <div class="nested-table-form-view" :style="containerStyle">
    <div class="view-header">
      <span class="view-title">{{ t('com.NestedTableFormView.title') }}</span>
      <div class="view-actions">
        <el-button size="small" @click="expandAll">
          <el-icon><ArrowDown /></el-icon>
          {{ t('com.nestedTableFormView.expandAll') }}
        </el-button>
        <el-button size="small" @click="collapseAll">
          <el-icon><ArrowUp /></el-icon>
          {{ t('com.nestedTableFormView.collapseAll') }}
        </el-button>
        <el-button size="small" type="primary" @click="addRootRow">
          <el-icon><Plus /></el-icon>
          {{ t('com.nestedTableFormView.addRoot') }}
        </el-button>
      </div>
    </div>

    <el-table
      :data="localData"
      :row-key="config.rowKey || 'id'"
      :expand-row-keys="expandedRows"
      stripe
      border
      @expand-change="handleExpandChange"
    >
      <el-table-column v-if="config.showIndex" type="index" :label="t('com.nestedTableFormView.index')" width="60" />

      <el-table-column
        v-for="col in visibleColumns"
        :key="col.field"
        :prop="col.field"
        :label="col.label || col.field"
        :width="col.width"
        :min-width="col.minWidth || 100"
      >
        <template #default="{ row }">
          <el-input
            v-if="col.editable"
            v-model="row[col.field]"
            size="small"
            @change="handleCellChange($event, col.field, row)"
          />
          <span v-else>{{ row[col.field] }}</span>
        </template>
      </el-table-column>

      <el-table-column :label="t('com.nestedTableFormView.actions')" width="150" fixed="right">
        <template #default="{ row, $index }">
          <el-button type="primary" link size="small" @click="addChildRow(row)">
            <el-icon><Plus /></el-icon>
          </el-button>
          <el-button type="success" link size="small" @click="editRow(row)">
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button type="danger" link size="small" @click="deleteRow(row)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </template>
      </el-table-column>

      <el-table-column type="expand" width="40">
        <template #default="{ row }">
          <div class="nested-children">
            <div class="children-header">
              <span>{{ childrenTitle(row) }}</span>
              <el-button size="small" type="primary" link @click="addChildRow(row)">
                <el-icon><Plus /></el-icon>
                {{ t('com.nestedTableFormView.addChild') }}
              </el-button>
            </div>
            <el-table
              v-if="row.children && row.children.length"
              :data="row.children"
              :row-key="config.rowKey || 'id'"
              size="small"
              border
            >
              <el-table-column
                v-for="col in visibleColumns"
                :key="col.field"
                :prop="col.field"
                :label="col.label || col.field"
                :width="col.width"
              >
                <template #default="{ row: childRow }">
                  <el-input
                    v-if="col.editable"
                    v-model="childRow[col.field]"
                    size="small"
                    @change="handleCellChange($event, col.field, childRow)"
                  />
                  <span v-else>{{ childRow[col.field] }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="t('com.nestedTableFormView.actions')" width="100">
                <template #default="{ row: childRow, $index: childIndex }">
                  <el-button type="success" link size="small" @click="editRow(childRow)">
                    <el-icon><Edit /></el-icon>
                  </el-button>
                  <el-button type="danger" link size="small" @click="deleteChild(row, childIndex)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-empty v-else :description="t('com.nestedTableFormView.noChildren')" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="view-footer">
      <span class="data-count">{{ dataCountText }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, inject } from 'vue'
import { Plus, Edit, Delete, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
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
      rowKey: 'id',
      displayField: 'name',
      showIndex: true,
      defaultExpandAll: false
    })
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'add', 'edit', 'delete'])

const designer = inject('designer')

const expandedRows = ref([])
const localData = reactive([...props.modelValue])

const containerStyle = computed(() => {
  const style = {}
  if (props.config.width) {
    style.width = props.config.width
  }
  return style
})

const visibleColumns = computed(() => {
  return (props.config.columns || []).filter(col => col.visible !== false)
})

const dataCountText = computed(() => {
  return t('com.nestedTableFormView.dataCount').replace('{total}', localData.length)
})

function childrenTitle(row) {
  const name = row[props.config.displayField || 'name'] || ''
  return t('com.nestedTableFormView.children').replace('{name}', name)
}

watch(() => props.modelValue, (val) => {
  localData.splice(0, localData.length, ...val)
}, { deep: true })

watch(localData, (val) => {
  emit('update:modelValue', [...val])
  emit('change', val)
}, { deep: true })

function handleExpandChange(row, expanded) {
  const key = row[props.config.rowKey || 'id']
  if (expanded) {
    if (!expandedRows.value.includes(key)) {
      expandedRows.value.push(key)
    }
  } else {
    expandedRows.value = expandedRows.value.filter(k => k !== key)
  }
}

function handleCellChange(value, field, row) {
  emit('change', { data: localData, row, field })
}

function expandAll() {
  localData.forEach(row => {
    const key = row[props.config.rowKey || 'id']
    if (!expandedRows.value.includes(key)) {
      expandedRows.value.push(key)
    }
    if (row.children) {
      row.children.forEach(child => {
        const childKey = child[props.config.rowKey || 'id']
        if (!expandedRows.value.includes(childKey)) {
          expandedRows.value.push(childKey)
        }
      })
    }
  })
}

function collapseAll() {
  expandedRows.value = []
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
}

function createDefaultRow() {
  const row = { id: generateId(), children: [] }
  props.config.columns?.forEach(col => {
    row[col.field] = col.defaultValue || null
  })
  return row
}

function addRootRow() {
  const newRow = createDefaultRow()
  localData.unshift(newRow)
  emit('add', { row: newRow, parent: null, index: 0 })
  designer?.notify?.('success', t('com.nestedTableFormView.rowAdded'))
}

function addChildRow(parent) {
  if (!parent.children) {
    parent.children = []
  }
  const newChild = createDefaultRow()
  parent.children.push(newChild)
  const key = parent[props.config.rowKey || 'id']
  if (!expandedRows.value.includes(key)) {
    expandedRows.value.push(key)
  }
  emit('add', { row: newChild, parent, index: parent.children.length - 1 })
  designer?.notify?.('success', t('com.nestedTableFormView.childAdded'))
}

function editRow(row) {
  emit('edit', { row })
}

function deleteRow(row) {
  const index = localData.findIndex(r => r.id === row.id)
  if (index > -1) {
    localData.splice(index, 1)
    emit('delete', { row, index, parent: null })
    designer?.notify?.('success', t('com.nestedTableFormView.rowDeleted'))
  }
}

function deleteChild(parent, childIndex) {
  parent.children.splice(childIndex, 1)
  emit('delete', { index: childIndex, parent })
  designer?.notify?.('success', t('com.nestedTableFormView.childDeleted'))
}
</script>

<style scoped>
.nested-table-form-view {
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

.nested-children {
  padding: 16px 32px;
}

.children-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #606266;
}

.view-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.data-count {
  font-size: 13px;
  color: #909399;
}
</style>
