import { makeRequiredRule } from '../../utils'

export default {
  icon: 'Share',
  name: 'fc-mermaid',
  label: 'Mermaid 图表',
  component: 'FcMermaid',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    diagramType: {
      type: String,
      default: 'flowchart',
      validator: (v) => ['flowchart', 'sequence', 'class', 'state', 'er', 'pie', 'gantt', 'git'].includes(v)
    },
    direction: {
      type: String,
      default: 'TB',
      validator: (v) => ['TB', 'BT', 'LR', 'RL'].includes(v)
    },
    theme: {
      type: String,
      default: 'default'
    },
    height: {
      type: Number,
      default: 400
    }
  },
  event: ['change', 'rendered', 'error', 'edit', 'update:modelValue']
}
