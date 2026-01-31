<template>
  <div class="ai-tool" :style="containerStyle">
    <div class="ai-tool-header" @click="toggleCollapse">
      <el-icon class="collapse-icon" :class="{ collapsed: isCollapsed }">
        <ArrowUp />
      </el-icon>
      <span class="ai-tool-title">{{ t('com.AiTool.name') }}</span>
      <el-tag v-if="apiKeyStatus" :type="apiKeyStatus === 'valid' ? 'success' : 'warning'" size="small">
        {{ apiKeyStatus === 'valid' ? t('com.aiTool.statusValid') : t('com.aiTool.statusInvalid') }}
      </el-tag>
    </div>

    <div v-show="!isCollapsed" class="ai-tool-content">
      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.apiKey') }}</span>
        </div>
        <el-input
          v-model="localConfig.apiKey"
          type="password"
          show-password
          :placeholder="t('com.aiTool.apiKeyPlaceholder')"
          @change="handleApiKeyChange"
        />
        <div class="api-key-actions">
          <el-button type="primary" link @click="testApiKey">
            {{ t('com.aiTool.testKey') }}
          </el-button>
        </div>
      </div>

      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.model') }}</span>
        </div>
        <el-select v-model="localConfig.model" @change="handleConfigChange">
          <el-option label="GPT-4" value="gpt-4" />
          <el-option label="GPT-4 Turbo" value="gpt-4-turbo" />
          <el-option label="GPT-3.5 Turbo" value="gpt-3.5-turbo" />
          <el-option label="Claude 3 Opus" value="claude-3-opus" />
          <el-option label="Claude 3 Sonnet" value="claude-3-sonnet" />
          <el-option label="Claude 3 Haiku" value="claude-3-haiku" />
        </el-select>
      </div>

      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.temperature') }}</span>
          <span class="value-label">{{ localConfig.temperature }}</span>
        </div>
        <el-slider
          v-model="localConfig.temperature"
          :min="0"
          :max="2"
          :step="0.1"
          @change="handleConfigChange"
        />
      </div>

      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.maxTokens') }}</span>
        </div>
        <el-input-number
          v-model="localConfig.maxTokens"
          :min="100"
          :max="4096"
          :step="100"
          @change="handleConfigChange"
        />
      </div>

      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.systemPrompt') }}</span>
        </div>
        <el-input
          v-model="localConfig.systemPrompt"
          type="textarea"
          :rows="3"
          :placeholder="t('com.aiTool.systemPromptPlaceholder')"
          @change="handleConfigChange"
        />
      </div>

      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.quickActions') }}</span>
        </div>
        <div class="quick-actions-grid">
          <el-button
            v-for="action in quickActions"
            :key="action.key"
            size="small"
            @click="executeQuickAction(action)"
          >
            <el-icon><component :is="action.icon" /></el-icon>
            {{ action.label }}
          </el-button>
        </div>
      </div>

      <div class="tool-section">
        <div class="section-header">
          <span>{{ t('com.aiTool.tools') }}</span>
        </div>
        <el-checkbox-group v-model="localConfig.enabledTools" @change="handleConfigChange">
          <el-checkbox label="generate-form">{{ t('com.aiTool.toolGenerateForm') }}</el-checkbox>
          <el-checkbox label="generate-rule">{{ t('com.aiTool.toolGenerateRule') }}</el-checkbox>
          <el-checkbox label="optimize-prompt">{{ t('com.aiTool.toolOptimizePrompt') }}</el-checkbox>
          <el-checkbox label="translate">{{ t('com.aiTool.toolTranslate') }}</el-checkbox>
          <el-checkbox label="explain-field">{{ t('com.aiTool.toolExplainField') }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <div class="ai-tool-footer">
        <el-button type="primary" @click="saveConfiguration">
          {{ t('com.aiTool.saveConfig') }}
        </el-button>
        <el-button @click="resetConfiguration">
          {{ t('com.aiTool.resetConfig') }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, inject } from 'vue'
import { ArrowUp } from '@element-plus/icons-vue'
import { t } from '../utils/locale'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'execute', 'save', 'test'])

const designer = inject('designer')

const isCollapsed = ref(false)
const apiKeyStatus = ref('')

const defaultConfig = {
  apiKey: '',
  model: 'gpt-4',
  temperature: 0.7,
  maxTokens: 2048,
  systemPrompt: '',
  enabledTools: ['generate-form', 'generate-rule', 'optimize-prompt']
}

const localConfig = reactive({
  ...defaultConfig,
  ...props.modelValue
})

watch(() => props.modelValue, (val) => {
  Object.assign(localConfig, defaultConfig, val)
}, { deep: true })

watch(localConfig, (val) => {
  emit('update:modelValue', { ...val })
}, { deep: true })

const containerStyle = computed(() => {
  const style = {}
  if (designer?.layout?.width) {
    style.width = designer.layout.width
  }
  return style
})

const quickActions = [
  { key: 'generate-form', label: t('com.aiTool.actionGenerateForm'), icon: 'Document' },
  { key: 'optimize-prompt', label: t('com.aiTool.actionOptimize'), icon: 'MagicStick' },
  { key: 'translate', label: t('com.aiTool.actionTranslate'), icon: 'Translate' },
  { key: 'explain-field', label: t('com.aiTool.actionExplain'), icon: 'InfoFilled' }
]

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
}

function handleApiKeyChange() {
  if (localConfig.apiKey && localConfig.apiKey.length > 10) {
    apiKeyStatus.value = 'valid'
  } else {
    apiKeyStatus.value = 'invalid'
  }
  emit('test', { type: 'apiKey', config: localConfig })
}

function testApiKey() {
  apiKeyStatus.value = 'testing'
  emit('test', { type: 'full', config: localConfig })
}

function handleConfigChange() {
  emit('save', { config: localConfig })
}

function executeQuickAction(action) {
  emit('execute', { action: action.key, config: localConfig })
}

function saveConfiguration() {
  emit('save', { config: localConfig })
  designer?.notify?.('success', t('com.aiTool.configSaved'))
}

function resetConfiguration() {
  Object.assign(localConfig, defaultConfig)
  emit('update:modelValue', { ...defaultConfig })
  emit('save', { config: defaultConfig })
}
</script>

<style scoped>
.ai-tool {
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
}

.ai-tool-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f5f7fa;
  cursor: pointer;
  user-select: none;
}

.ai-tool-header:hover {
  background: #ecf5ff;
}

.collapse-icon {
  transition: transform 0.3s;
}

.collapse-icon.collapsed {
  transform: rotate(180deg);
}

.ai-tool-title {
  flex: 1;
  font-weight: 500;
  font-size: 14px;
  color: #303133;
}

.ai-tool-content {
  padding: 16px;
}

.tool-section {
  margin-bottom: 16px;
}

.tool-section:last-of-type {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  color: #606266;
  font-weight: 500;
}

.value-label {
  color: #409eff;
  font-weight: normal;
}

.api-key-actions {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.quick-actions-grid .el-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.ai-tool-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}
</style>
