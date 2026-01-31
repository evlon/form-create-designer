export default {
    icon: 'icon-variable',
    name: 'global-variable-config',
    label: 'Global Variables',
    component: 'GlobalVariableConfig',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'showTips', label: 'Show tips', props: { clearable: true } }
    ],
    event: [
        { label: 'Change', value: 'change' }
    ]
};
