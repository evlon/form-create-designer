<template>
  <div class="m-step-form" :style="containerStyle">
    <el-steps :active="currentStep" finish-status="success" simple>
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.label"
        :icon="step.icon"
        @click="handleStepClick(index)"
      />
    </el-steps>

    <div class="step-content">
      <div
        v-for="(step, index) in steps"
        v-show="currentStep === index"
        :key="index"
        class="step-pane"
      >
        <fc-render
          v-if="step.fields && step.fields.length"
          :rule="step.fields"
          :option="option"
          @update:model-value="handleFieldChange($event, step)"
        />
        <el-empty v-else :description="t('com.mStepForm.emptyStep')" />
      </div>
    </div>

    <div class="step-actions">
      <el-button v-if="currentStep > 0" @click="prevStep">
        {{ t('com.mStepForm.prev') }}
      </el-button>
      <el-button v-if="currentStep < steps.length - 1" type="primary" @click="nextStep">
        {{ t('com.mStepForm.next') }}
      </el-button>
      <el-button v-if="currentStep === steps.length - 1" type="primary" @click="submitForm">
        {{ t('com.mStepForm.submit') }}
      </el-button>
    </div>

    <div class="step-progress">
      <span>{{ stepProgressText }}</span>
      <el-progress :percentage="progressPercent" :stroke-width="4" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, inject } from 'vue'
import { ElMessage } from 'element-plus'
import { t } from '../utils/locale'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  steps: {
    type: Array,
    default: () => []
  },
  option: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'step-change', 'submit'])

const designer = inject('designer')

const currentStep = ref(0)
const formData = reactive({ ...props.modelValue })

const containerStyle = computed(() => {
  const style = {}
  if (designer?.layout?.width) {
    style.width = designer.layout.width
  }
  if (designer?.layout?.height) {
    style.minHeight = designer.layout.height
  }
  return style
})

const stepProgressText = computed(() => {
  return t('com.mStepForm.stepProgress').replace('{current}', currentStep.value + 1).replace('{total}', props.steps.length)
})

const progressPercent = computed(() => {
  if (props.steps.length === 0) return 0
  return Math.round(((currentStep.value + 1) / props.steps.length) * 100)
})

watch(() => props.modelValue, (val) => {
  Object.assign(formData, val)
}, { deep: true })

watch(formData, (val) => {
  emit('update:modelValue', { ...val })
  emit('change', val)
}, { deep: true })

function handleStepClick(index) {
  if (index <= currentStep.value) {
    currentStep.value = index
    emit('step-change', { step: index, direction: 'back' })
  }
}

function nextStep() {
  if (validateCurrentStep()) {
    currentStep.value++
    emit('step-change', { step: currentStep.value, direction: 'forward' })
    designer?.nextStep?.()
  }
}

function prevStep() {
  currentStep.value--
  emit('step-change', { step: currentStep.value, direction: 'back' })
  designer?.prevStep?.()
}

function submitForm() {
  if (validateCurrentStep()) {
    emit('submit', { formData, steps: props.steps })
    designer?.notify?.('success', t('com.mStepForm.submitSuccess'))
  }
}

function validateCurrentStep() {
  const currentStepData = props.steps[currentStep.value]
  if (!currentStepData?.fields) return true

  for (const field of currentStepData.fields) {
    const fieldValue = formData[field.field]
    if (field.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
      ElMessage.warning(t('com.mStepForm.fieldRequired').replace('{field}', field.label || field.field))
      return false
    }
  }
  return true
}

function handleFieldChange(value, step) {
  Object.assign(formData, value)
  emit('change', { formData, step })
}
</script>

<style scoped>
.m-step-form {
  padding: 16px;
  background: #fff;
  border-radius: 4px;
}

.step-content {
  margin: 24px 0;
  min-height: 200px;
}

.step-pane {
  padding: 16px 0;
}

.step-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #ebeef5;
}

.step-progress {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

.step-progress span {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  color: #909399;
  text-align: center;
}

.step-progress .el-progress {
  max-width: 300px;
  margin: 0 auto;
}
</style>
