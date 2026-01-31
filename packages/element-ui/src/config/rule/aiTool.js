import { makeRequiredRule } from '../../utils'

export default {
  icon: 'ChatDotRound',
  name: 'ai-tool',
  label: 'AI工具',
  component: 'AiTool',
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        apiKey: '',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2048,
        systemPrompt: '',
        enabledTools: ['generate-form', 'generate-rule', 'optimize-prompt']
      })
    }
  },
  event: ['execute', 'save', 'test', 'update:modelValue']
}
