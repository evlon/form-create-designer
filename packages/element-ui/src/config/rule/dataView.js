export default {
    icon: 'icon-view',
    name: 'data-view',
    label: 'Data View',
    component: 'DataView',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'showHeader', label: 'Show header', props: { clearable: true } },
        { type: 'switch', field: 'showPagination', label: 'Show pagination', props: { clearable: true } },
        { type: 'switch', field: 'refreshable', label: 'Refreshable', props: { clearable: true } },
        { type: 'switch', field: 'remoteData', label: 'Remote data', props: { clearable: true } },
        { type: 'input', field: 'remoteUrl', label: 'Remote URL', props: { clearable: true } },
        { type: 'select', field: 'viewMode', label: 'View mode', options: [
            { label: 'List', value: 'list' },
            { label: 'Card', value: 'card' },
            { label: 'Stats', value: 'stats' }
        ]},
        { type: 'inputNumber', field: 'pageSize', label: 'Page size', props: { min: 5, max: 100, clearable: true } }
    ],
    event: [
        { label: 'Click', value: 'click' },
        { label: 'Refresh', value: 'refresh' },
        { label: 'Change', value: 'change' },
        { label: 'Error', value: 'error' }
    ]
};
