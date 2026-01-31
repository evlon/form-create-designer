import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'aide',
    icon: 'ChatDotRound',
    name: 'ai-tool',
    label: 'AI工具',
    component: 'AiTool',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'ai-tool.props', [
            { type: 'input', field: 'apiKey', label: 'API Key' },
            { type: 'select', field: 'model', label: '模型', options: [
                { label: 'gpt-4', value: 'gpt-4' },
                { label: 'gpt-4-turbo', value: 'gpt-4-turbo' },
                { label: 'gpt-3.5-turbo', value: 'gpt-3.5-turbo' }
            ]},
            { type: 'inputNumber', field: 'temperature', label: 'Temperature', props: { min: 0, max: 2, step: 0.1 } },
            { type: 'inputNumber', field: 'maxTokens', label: '最大Token', props: { min: 100, max: 8192 } },
            { type: 'textarea', field: 'systemPrompt', label: '系统提示' },
        ]);
    },
    rule({t}) {
        return {
            type: 'ai-tool',
            field: 'ai_tool_' + Date.now(),
            title: t('com.ai-tool.name'),
            info: t('com.ai-tool.info'),
            $required: false,
            props: {
                modelValue: {
                    apiKey: '',
                    model: 'gpt-4',
                    temperature: 0.7,
                    maxTokens: 2048,
                    systemPrompt: '',
                    enabledTools: ['generate-form', 'generate-rule', 'optimize-prompt']
                }
            },
            on: {
                execute: [],
                save: [],
                test: [],
                'update:modelValue': []
            }
        };
    }
};
