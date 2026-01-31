import { makeRequiredRule } from '../../utils'

export default {
  icon: 'List',
  name: 'm-step-form',
  label: '多步表单',
  component: 'MStepForm',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    },
    steps: {
      type: Array,
      default: () => [
        { label: 'Step 1', fields: [], icon: 'Edit' },
        { label: 'Step 2', fields: [], icon: 'Edit' },
        { label: 'Step 3', fields: [], icon: 'Edit' }
      ]
    },
    option: {
      type: Object,
      default: () => ({})
    }
  },
  event: ['change', 'step-change', 'submit', 'update:modelValue']
}
