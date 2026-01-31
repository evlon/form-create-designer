export default {
  icon: 'View',
  name: 'infinite-table-form-view',
  label: '无限表格表单(预览)',
  component: 'InfiniteTableFormView',
  props: {
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
  },
  event: ['change', 'add', 'edit', 'delete', 'refresh', 'update:modelValue']
}
