import { makeRequiredRule } from '../../utils'

export default {
  icon: 'Bell',
  name: 'global-event-config',
  label: '全局事件',
  component: 'GlobalEventConfig',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  event: ['change', 'update:modelValue']
}
