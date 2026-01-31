export default {
    icon: 'icon-chat',
    name: 'ai-chat',
    label: 'AI Chat',
    component: 'AiChat',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'input', field: 'name', label: 'Assistant name', props: { clearable: true } },
        { type: 'input', field: 'avatar', label: 'Avatar URL', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'showHeader', label: 'Show header', props: { clearable: true } },
        { type: 'switch', field: 'online', label: 'Online status', props: { clearable: true } },
        { type: 'inputNumber', field: 'typingDuration', label: 'Typing duration', props: { min: 500, max: 5000, clearable: true } }
    ],
    event: [
        { label: 'Send', value: 'send' },
        { label: 'Clear', value: 'clear' },
        { label: 'Settings', value: 'settings' }
    ]
};
