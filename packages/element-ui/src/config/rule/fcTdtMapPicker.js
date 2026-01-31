import { makeRequiredRule } from '../../utils'

export default {
  icon: 'Location',
  name: 'fc-tdt-map-picker',
  label: '地图选点',
  component: 'FcTdtMapPicker',
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
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
    showAddress: {
      type: Boolean,
      default: true
    },
    showCoordinate: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 400
    },
    ak: {
      type: String,
      default: ''
    },
    center: {
      type: Array,
      default: () => [116.404, 39.915]
    },
    zoom: {
      type: Number,
      default: 12
    },
    markerDraggable: {
      type: Boolean,
      default: true
    }
  },
  event: ['change', 'locate', 'error', 'update:modelValue']
}
