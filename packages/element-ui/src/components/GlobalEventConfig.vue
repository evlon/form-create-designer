<template>
  <div class="global-event-config">
    <div class="config-header">
      <span class="config-title">{{ t('com.GlobalEventConfig.title') }}</span>
      <el-button type="primary" size="small" @click="addEvent">
        <el-icon><Plus /></el-icon>
        {{ t('com.globalEventConfig.addEvent') }}
      </el-button>
    </div>

    <div class="event-list">
      <div v-for="(event, index) in localEvents" :key="index" class="event-item">
        <div class="event-header">
          <el-tag type="info" size="small">{{ t('com.globalEventConfig.event') }} #{{ index + 1 }}</el-tag>
          <el-button type="danger" link size="small" @click="removeEvent(index)">
            <el-icon><Delete /></el-icon>
          </el-button>
        </div>

        <div class="event-body">
          <div class="form-row">
            <label>{{ t('com.globalEventConfig.eventName') }}</label>
            <el-input
              v-model="event.name"
              :placeholder="t('com.globalEventConfig.eventNamePlaceholder')"
              size="small"
            />
          </div>

          <div class="form-row">
            <label>{{ t('com.globalEventConfig.triggerType') }}</label>
            <el-select v-model="event.trigger" size="small">
              <el-option label="onMounted" value="mounted" />
              <el-option label="onUnmounted" value="unmounted" />
              <el-option label="onVisible" value="visible" />
              <el-option label="onHidden" value="hidden" />
              <el-option label="onInterval" value="interval" />
              <el-option label="onClick" value="click" />
              <el-option label="onChange" value="change" />
            </el-select>
          </div>

          <div v-if="event.trigger === 'interval'" class="form-row">
            <label>{{ t('com.globalEventConfig.intervalMs') }}</label>
            <el-input-number
              v-model="event.interval"
              :min="1000"
              :max="3600000"
              :step="1000"
              size="small"
            />
          </div>

          <div class="form-row">
            <label>{{ t('com.globalEventConfig.targetFields') }}</label>
            <el-select
              v-model="event.targets"
              multiple
              filterable
              size="small"
              :placeholder="t('com.globalEventConfig.targetsPlaceholder')"
            >
              <el-option
                v-for="field in availableFields"
                :key="field.field"
                :label="field.label || field.field"
                :value="field.field"
              />
            </el-select>
          </div>

          <div class="form-row">
            <label>{{ t('com.globalEventConfig.condition') }}</label>
            <el-input
              v-model="event.condition"
              type="textarea"
              :rows="2"
              :placeholder="t('com.globalEventConfig.conditionPlaceholder')"
              size="small"
            />
          </div>

          <div class="form-row">
            <label>{{ t('com.globalEventConfig.actions') }}</label>
            <div class="actions-editor">
              <div v-for="(action, aIndex) in event.actions" :key="aIndex" class="action-item">
                <el-select v-model="action.type" size="small" class="action-type">
                  <el-option label="Set Value" value="setValue" />
                  <el-option label="Show Message" value="message" />
                  <el-option label="Call API" value="fetch" />
                  <el-option label="Validate" value="validate" />
                  <el-option label="Clear" value="clear" />
                  <el-option label="Focus" value="focus" />
                  <el-option label="Disable" value="disable" />
                  <el-option label="Enable" value="enable" />
                </el-select>
                <el-input
                  v-model="action.value"
                  :placeholder="t('com.globalEventConfig.actionValuePlaceholder')"
                  size="small"
                  class="action-value"
                />
                <el-button type="danger" link size="small" @click="removeAction(event, aIndex)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </div>
              <el-button size="small" @click="addAction(event)">
                <el-icon><Plus /></el-icon>
                {{ t('com.globalEventConfig.addAction') }}
              </el-button>
            </div>
          </div>
        </div>
      </div>

      <el-empty v-if="localEvents.length === 0" :description="t('com.globalEventConfig.noEvents')" />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, inject } from 'vue'
import { Plus, Delete } from '@element-plus/icons-vue'
import { t } from '../utils/locale'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const designer = inject('designer')

const localEvents = reactive([...props.modelValue])

const availableFields = computed(() => {
  return designer?.fields || []
})

watch(() => props.modelValue, (val) => {
  localEvents.splice(0, localEvents.length, ...val)
}, { deep: true })

watch(localEvents, (val) => {
  emit('update:modelValue', [...val])
  emit('change', val)
}, { deep: true })

function addEvent() {
  localEvents.push({
    name: '',
    trigger: 'mounted',
    targets: [],
    condition: '',
    actions: [],
    interval: 5000
  })
}

function removeEvent(index) {
  localEvents.splice(index, 1)
}

function addAction(event) {
  if (!event.actions) {
    event.actions = []
  }
  event.actions.push({
    type: 'setValue',
    value: ''
  })
}

function removeAction(event, index) {
  event.actions.splice(index, 1)
}
</script>

<style scoped>
.global-event-config {
  padding: 16px;
}

.config-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.config-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.event-item {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.event-body {
  padding: 12px;
}

.form-row {
  margin-bottom: 12px;
}

.form-row:last-child {
  margin-bottom: 0;
}

.form-row label {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  color: #606266;
}

.form-row .el-select,
.form-row .el-input,
.form-row .el-input-number {
  width: 100%;
}

.actions-editor {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-type {
  width: 140px;
}

.action-value {
  flex: 1;
}
</style>
