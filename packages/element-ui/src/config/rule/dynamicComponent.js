export default {
    icon: 'icon-component',
    name: 'dynamic-component',
    label: 'Dynamic Component',
    component: 'DynamicComponent',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'input', field: 'componentName', label: 'Component name', props: { clearable: true, placeholder: 'fc-button, el-input, MyComponent' } },
        { type: 'switch', field: 'lazy', label: 'Lazy load', props: { clearable: true } }
    ],
    event: [
        { label: 'Ready', value: 'ready' },
        { label: 'Error', value: 'error' }
    ]
};
