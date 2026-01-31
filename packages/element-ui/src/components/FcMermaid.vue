<template>
  <div class="fc-mermaid" :style="containerStyle">
    <div v-if="showHeader" class="mermaid-header">
      <span class="mermaid-title">{{ title }}</span>
      <div class="mermaid-actions">
        <el-button size="small" @click="editDiagram">
          <el-icon><Edit /></el-icon>
        </el-button>
        <el-button size="small" @click="refreshDiagram">
          <el-icon><Refresh /></el-icon>
        </el-button>
        <el-button size="small" type="primary" @click="exportImage">
          <el-icon><Download /></el-icon>
        </el-button>
      </div>
    </div>

    <div v-loading="loading" class="mermaid-content" ref="contentRef">
      <div v-if="error" class="mermaid-error">
        <el-icon><WarningFilled /></el-icon>
        <span>{{ error }}</span>
      </div>
      <div v-else ref="svgRef" class="mermaid-svg" v-html="svgContent" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick, inject } from 'vue'
import { Edit, Refresh, Download, WarningFilled } from '@element-plus/icons-vue'
import mermaid from 'mermaid'
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
    default: 'default',
    validator: (v) => ['default', 'dark', 'neutral'].includes(v)
  },
  height: {
    type: Number,
    default: 400
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'rendered', 'error', 'edit'])

const designer = inject('designer')

const loading = ref(false)
const error = ref('')
const svgContent = ref('')
const contentRef = ref(null)
const svgRef = ref(null)

const containerStyle = computed(() => {
  const style = {}
  if (designer?.layout?.width) {
    style.width = designer.layout.width
  }
  return style
})

mermaid.initialize({
  startOnLoad: false,
  theme: props.theme,
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: 'basis'
  },
  sequence: {
    useMaxWidth: true,
    mirrorActors: false
  },
  gantt: {
    useMaxWidth: true
  }
})

async function renderDiagram() {
  if (!props.modelValue) {
    svgContent.value = ''
    return
  }

  loading.value = true
  error.value = ''

  try {
    const id = `mermaid-${Date.now()}`
    const { svg } = await mermaid.render(id, props.modelValue)
    svgContent.value = svg

    await nextTick()

    const svgElement = contentRef.value?.querySelector('svg')
    if (svgElement) {
      svgElement.style.maxWidth = '100%'
      svgElement.style.height = 'auto'
    }

    emit('rendered', { svg: svgContent.value, diagram: props.modelValue })
    designer?.notify?.('success', t('com.fcFlow.renderSuccess'))
  } catch (err) {
    error.value = t('com.fcFlow.renderError')
    emit('error', { error: err.message })
  } finally {
    loading.value = false
  }
}

function editDiagram() {
  emit('edit', { diagram: props.modelValue })
}

function refreshDiagram() {
  renderDiagram()
}

function exportImage() {
  if (!svgContent.value) return

  const svgElement = contentRef.value?.querySelector('svg')
  if (!svgElement) return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const svgData = new XMLSerializer().serializeToString(svgElement)
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(svgBlob)

  const img = new Image()
  img.onload = () => {
    canvas.width = svgElement.clientWidth || 800
    canvas.height = svgElement.clientHeight || 600
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0)

    const pngUrl = canvas.toDataURL('image/png')
    const downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = `diagram-${Date.now()}.png`
    downloadLink.click()

    URL.revokeObjectURL(url)
    designer?.notify?.('success', t('com.fcFlow.exportSuccess'))
  }
  img.src = url
}

onMounted(() => {
  if (props.modelValue) {
    renderDiagram()
  }
})

watch(() => props.modelValue, () => {
  renderDiagram()
})

watch(() => props.theme, () => {
  mermaid.initialize({
    theme: props.theme
  })
  if (props.modelValue) {
    renderDiagram()
  }
})
</script>

<style scoped>
.fc-mermaid {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
}

.mermaid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f5f7fa;
  border-bottom: 1px solid #e4e7ed;
}

.mermaid-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
}

.mermaid-actions {
  display: flex;
  gap: 8px;
}

.mermaid-content {
  padding: 16px;
  min-height: 200px;
  overflow: auto;
}

.mermaid-svg {
  display: flex;
  justify-content: center;
  align-items: center;
}

.mermaid-svg :deep(svg) {
  max-width: 100%;
  height: auto;
}

.mermaid-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px;
  color: #f56c6c;
  font-size: 14px;
}
</style>
