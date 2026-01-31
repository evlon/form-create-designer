export default {
    icon: 'icon-css',
    name: 'global-class-config',
    label: 'Global CSS Classes',
    component: 'GlobalClassConfig',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'showPreview', label: 'Show preview', props: { clearable: true } }
    ],
    event: [{ label: 'Change', value: 'change' }]
};
