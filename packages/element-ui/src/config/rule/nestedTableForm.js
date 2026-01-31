export default {
    icon: 'icon-nested-table',
    name: 'nested-table-form',
    label: 'Nested Table Form',
    component: 'NestedTableForm',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'addable', label: 'Addable', props: { clearable: true } },
        { type: 'switch', field: 'editable', label: 'Editable', props: { clearable: true } },
        { type: 'switch', field: 'deletable', label: 'Deletable', props: { clearable: true } },
        { type: 'switch', field: 'expandable', label: 'Expandable', props: { clearable: true } },
        { type: 'switch', field: 'defaultExpandAll', label: 'Expand all by default', props: { clearable: true } },
        { type: 'switch', field: 'showSelection', label: 'Show selection', props: { clearable: true } },
        { type: 'switch', field: 'showIndex', label: 'Show index', props: { clearable: true } },
        { type: 'switch', field: 'stripe', label: 'Stripe', props: { clearable: true } },
        { type: 'switch', field: 'border', label: 'Border', props: { clearable: true } },
        { type: 'inputNumber', field: 'height', label: 'Height', props: { min: 100, max: 800, clearable: true } }
    ],
    event: [
        { label: 'Add', value: 'add' },
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete' },
        { label: 'Add child', value: 'add-child' },
        { label: 'Delete child', value: 'delete-child' },
        { label: 'Expand change', value: 'expand-change' },
        { label: 'Selection change', value: 'selection-change' }
    ]
};
