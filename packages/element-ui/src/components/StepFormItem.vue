<template>
  <div class="step-form-item" :style="containerStyle">
    <div class="step-header">
      <div class="step-indicator" :class="{ active: isActive, completed: isCompleted }">
        <span v-if="isCompleted" class="step-icon"><el-icon><Check /></el-icon></span>
        <span v-else class="step-number">{{ stepNumber }}</span>
      </div>
      <div class="step-info">
        <span class="step-label">{{ label }}</span>
        <span v-if="description" class="step-description">{{ description }}</span>
      </div>
      <div v-if="showExpand" class="step-expand">
        <el-button v-if="!isExpanded" text type="primary" @click="expand">
          {{ t('com.StepFormItem.expand') }}
        </el-button>
        <el-button v-else text type="primary" @click="collapse">
          {{ t('com.StepFormItem.collapse') }}
        </el-button>
      </div>
    </div>

    <el-collapse-transition>
      <div v-show="isExpanded" class="step-content">
        <div class="step-fields">
          <fc-render
            v-if="fields && fields.length"
            :rule="fields"
            :option="option"
            @update:model-value="handleFieldChange"
          />
          <el-empty v-else :description="t('com.StepFormItem.noFields')" />
        </div>

        <div v-if="showActions" class="step-actions">
          <el-button v-if="showPrev" @click="handlePrev">
            {{ t('com.StepFormItem.prev') }}
          </el-button>
          <el-button v-if="showNext" type="primary" @click="handleNext">
            {{ t('com.StepFormItem.next') }}
          </el-button>
          <el-button v-if="showSubmit" type="primary" @click="handleSubmit">
            {{ t('com.StepFormItem.submit') }}
          </el-button>
        </div>
      </div>
    </el-collapse-transition>

    <div v-if="!isExpanded && showExpand" class="step-preview">
      <span class="preview-label">{{ t('com.StepFormItem.fieldsCount').replace('{count}', fields?.length || 0) }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, inject } from 'vue'
import { Check } from '@element-plus/icons-vue'
import { t } from '../utils/locale'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  stepNumber: {
    type: Number,
    default: 1
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  fields: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object,
    default: () => ({})
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  showExpand: {
    type: Boolean,
    default: true
  },
  showActions: {
    type: Boolean,
    default: true
  },
  showPrev: {
    type: Boolean,
    default: true
  },
  showNext: {
    type: Boolean,
    default: true
  },
  showSubmit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'prev', 'next', 'submit', 'expand', 'collapse'])

const designer = inject('designer')

const isExpanded = ref(props.isActive)
const localData = ref({ ...props.modelValue })

const containerStyle = computed(() => {
  const style = {}
  if (designer?.layout?.width) {
    style.width = designer.layout.width
  }
  return style
})

watch(() => props.modelValue, (val) => {
  localData.value = { ...val }
}, { deep: true })

watch(() => props.isActive, (val) => {
  if (val) {
    isExpanded.value = true
  }
})

function handleFieldChange(value) {
  localData.value = { ...localData.value, ...value }
  emit('update:modelValue', localData.value)
  emit('change', localData.value)
}

function handlePrev() {
  emit('prev', { step: props.stepNumber, data: localData.value })
}

function handleNext() {
  emit('next', { step: props.stepNumber, data: localData.value })
}

function handleSubmit() {
  emit('submit', { step: props.stepNumber, data: localData.value })
  designer?.notify?.('success', t('com.StepFormItem.submitSuccess'))
}

function expand() {
  isExpanded.value = true
  emit('expand', { step: props.stepNumber })
}

function collapse() {
  isExpanded.value = false
  emit('collapse', { step: props.stepNumber })
}
</script>

<style scoped>
.step-form-item {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: #f5f7fa;
}

.step-indicator {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  background: #e4e7ed;
  color: #909399;
  flex-shrink: 0;
}

.step-indicator.active {
  background: #409eff;
  color: #fff;
}

.step-indicator.completed {
  background: #67c23a;
  color: #fff;
}

.step-icon {
  font-size: 16px;
}

.step-info {
  flex: 1;
}

.step-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.step-description {
  display: block;
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.step-expand {
  flex-shrink: 0;
}

.step-content {
  padding: 16px;
  border-top: 1px solid #e4e7ed;
}

.step-fields {
  min-height: 100px;
}

.step-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.step-preview {
  padding: 12px 16px;
  background: #fafafa;
  border-top: 1px solid #ebeef5;
}

.preview-label {
  font-size: 12px;
  color: #909399;
}
</style>
