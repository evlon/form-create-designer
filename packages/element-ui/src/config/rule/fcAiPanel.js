export default {
    icon: 'icon-chat',
    name: 'fc-ai-panel',
    label: 'AI Assistant',
    component: 'FcAiPanel',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'showHeader', label: 'Show header', props: { clearable: true } },
        { type: 'input', field: 'apiKey', label: 'API Key', props: { clearable: true, showPassword: true } },
        { type: 'input', field: 'apiUrl', label: 'API URL', props: { clearable: true, placeholder: 'OpenAI API URL' } },
        { type: 'input', field: 'model', label: 'Model', props: { clearable: true, placeholder: 'gpt-3.5-turbo' } },
        { type: 'inputNumber', field: 'maxLength', label: 'Max length', props: { min: 100, max: 10000, clearable: true } }
    ],
    event: [
        { label: 'Send', value: 'send' },
        { label: 'Clear', value: 'clear' },
        { label: 'Generate form', value: 'generate-form' }
    ]
};
