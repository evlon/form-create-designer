import { makeRequiredRule } from '../../utils'

export default {
  icon: 'List',
  name: 'step-form-item',
  label: '步骤项',
  component: 'StepFormItem',
  props: {
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
  },
  event: ['change', 'prev', 'next', 'submit', 'expand', 'collapse', 'update:modelValue']
}
