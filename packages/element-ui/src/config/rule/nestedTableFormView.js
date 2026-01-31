import { makeRequiredRule } from '../../utils'

export default {
  icon: 'Connection',
  name: 'nested-table-form-view',
  label: '嵌套表格表单(预览)',
  component: 'NestedTableFormView',
  props: {
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
  },
  event: ['change', 'add', 'edit', 'delete', 'update:modelValue']
}
