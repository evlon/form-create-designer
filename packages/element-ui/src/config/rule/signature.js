import { makeRequiredRule } from '../../utils'

export default {
  icon: 'Edit',
  name: 'signature',
  label: '签名',
  component: 'Signature',
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
    showPreview: {
      type: Boolean,
      default: true
    },
    showTips: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 200
    },
    lineWidth: {
      type: Number,
      default: 2
    },
    strokeColor: {
      type: String,
      default: '#000000'
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    }
  },
  event: ['change', 'clear', 'save', 'update:modelValue']
}
