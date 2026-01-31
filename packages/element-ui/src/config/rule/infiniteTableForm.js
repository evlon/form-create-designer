export default {
    icon: 'icon-table-form',
    name: 'infinite-table-form',
    label: 'Infinite Table Form',
    component: 'InfiniteTableForm',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'addable', label: 'Addable', props: { clearable: true } },
        { type: 'switch', field: 'editable', label: 'Editable', props: { clearable: true } },
        { type: 'switch', field: 'deletable', label: 'Deletable', props: { clearable: true } },
        { type: 'switch', field: 'showSelection', label: 'Show selection', props: { clearable: true } },
        { type: 'switch', field: 'showIndex', label: 'Show index', props: { clearable: true } },
        { type: 'switch', field: 'showPagination', label: 'Show pagination', props: { clearable: true } },
        { type: 'switch', field: 'stripe', label: 'Stripe', props: { clearable: true } },
        { type: 'switch', field: 'border', label: 'Border', props: { clearable: true } },
        { type: 'inputNumber', field: 'height', label: 'Height', props: { min: 100, max: 800, clearable: true } },
        { type: 'switch', field: 'remoteData', label: 'Remote data', props: { clearable: true } },
        { type: 'input', field: 'remoteUrl', label: 'Remote URL', props: { clearable: true } },
        { type: 'inputNumber', field: 'pageSize', label: 'Page size', props: { min: 10, max: 100, clearable: true } }
    ],
    event: [
        { label: 'Add', value: 'add' },
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete' },
        { label: 'Selection change', value: 'selection-change' },
        { label: 'Cell change', value: 'cell-change' }
    ]
};
