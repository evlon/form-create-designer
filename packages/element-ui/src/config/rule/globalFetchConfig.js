export default {
    icon: 'icon-fetch',
    name: 'global-fetch-config',
    label: 'Global API Fetch',
    component: 'GlobalFetchConfig',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } }
    ],
    event: [{ label: 'Change', value: 'change' }, { label: 'Test', value: 'test' }]
};
