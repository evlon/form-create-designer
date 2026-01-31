<template>
  <div class="signature-component" :style="containerStyle">
    <div v-if="showHeader" class="signature-header">
      <span class="signature-title">{{ title }}</span>
      <div class="signature-actions">
        <el-button size="small" @click="clear" :disabled="disabled || !hasSignature">
          <el-icon><Delete /></el-icon>
          {{ t('com.Signature.clear') }}
        </el-button>
        <el-button size="small" type="primary" @click="save" :disabled="disabled || !hasSignature">
          <el-icon><Check /></el-icon>
          {{ t('com.Signature.save') }}
        </el-button>
      </div>
    </div>

    <div class="signature-canvas-wrapper" :style="{ height: `${height}px` }">
      <canvas
        ref="canvasRef"
        :width="width"
        :height="height"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        @touchstart.prevent="startDrawingTouch"
        @touchmove.prevent="drawTouch"
        @touchend="stopDrawing"
      />
      <div v-if="!hasSignature && !disabled" class="signature-placeholder">
        <el-icon><Edit /></el-icon>
        <span>{{ t('com.Signature.placeholder') }}</span>
      </div>
    </div>

    <div v-if="showPreview && signatureData" class="signature-preview">
      <span class="preview-label">{{ t('com.Signature.preview') }}</span>
      <img :src="signatureData" alt="Signature" />
    </div>

    <div v-if="showTips" class="signature-tips">
      <el-icon><InfoFilled /></el-icon>
      <span>{{ t('com.Signature.tips') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, inject } from 'vue'
import { Edit, Delete, Check, InfoFilled } from '@element-plus/icons-vue'
import { t } from '../utils/locale'

const props = defineProps({
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
})

const emit = defineEmits(['update:modelValue', 'change', 'clear', 'save'])

const designer = inject('designer')

const canvasRef = ref(null)
const isDrawing = ref(false)
const signatureData = ref(props.modelValue)
const lastX = ref(0)
const lastY = ref(0)

let ctx = null

const containerStyle = computed(() => {
  const style = {}
  if (designer?.layout?.width) {
    style.width = designer.layout.width
  }
  return style
})

const hasSignature = computed(() => {
  return signatureData.value && signatureData.value.length > 0
})

function initCanvas() {
  if (!canvasRef.value) return

  ctx = canvasRef.value.getContext('2d')
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, props.width, props.height)
  ctx.lineWidth = props.lineWidth
  ctx.lineCap = 'round'
  ctx.strokeStyle = props.strokeColor

  if (props.modelValue) {
    loadSignature(props.modelValue)
  }
}

function loadSignature(dataUrl) {
  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
  }
  img.src = dataUrl
}

function getCoordinates(e) {
  const rect = canvasRef.value.getBoundingClientRect()
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    }
  }
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

function startDrawing(e) {
  if (props.disabled) return
  isDrawing.value = true
  const { x, y } = getCoordinates(e)
  lastX.value = x
  lastY.value = y
}

function draw(e) {
  if (!isDrawing.value || props.disabled) return
  const { x, y } = getCoordinates(e)

  ctx.beginPath()
  ctx.moveTo(lastX.value, lastY.value)
  ctx.lineTo(x, y)
  ctx.stroke()

  lastX.value = x
  lastY.value = y
}

function stopDrawing() {
  isDrawing.value = false
}

function startDrawingTouch(e) {
  startDrawing(e)
}

function drawTouch(e) {
  draw(e)
}

function save() {
  if (!canvasRef.value) return
  signatureData.value = canvasRef.value.toDataURL('image/png')
  emit('update:modelValue', signatureData.value)
  emit('change', signatureData.value)
  designer?.notify?.('success', t('com.Signature.saveSuccess'))
}

function clear() {
  if (!ctx) return
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, props.width, props.height)
  signatureData.value = ''
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  designer?.notify?.('success', t('com.Signature.clearSuccess'))
}

onMounted(() => {
  initCanvas()
})

watch(() => props.modelValue, (val) => {
  if (val && val !== signatureData.value) {
    signatureData.value = val
    loadSignature(val)
  }
})
</script>

<style scoped>
.signature-component {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.signature-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.signature-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.signature-actions {
  display: flex;
  gap: 8px;
}

.signature-canvas-wrapper {
  position: relative;
  margin: 16px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
}

.signature-canvas-wrapper canvas {
  display: block;
  cursor: crosshair;
}

.signature-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #c0c4cc;
  pointer-events: none;
}

.signature-preview {
  margin: 0 16px 16px;
  padding: 12px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
}

.preview-label {
  display: block;
  margin-bottom: 8px;
  font-size: 12px;
  color: #909399;
}

.signature-preview img {
  max-width: 200px;
  max-height: 80px;
}

.signature-tips {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 16px 16px;
  padding: 8px 12px;
  background: #ecf5ff;
  border-radius: 4px;
  font-size: 12px;
  color: #409eff;
}
</style>
