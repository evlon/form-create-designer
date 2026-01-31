export default {
    icon: 'icon-database',
    name: 'dataset',
    label: 'Dataset',
    component: 'Dataset',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'switch', field: 'addable', label: 'Addable', props: { clearable: true } },
        { type: 'switch', field: 'editable', label: 'Editable', props: { clearable: true } },
        { type: 'switch', field: 'deletable', label: 'Deletable', props: { clearable: true } },
        { type: 'switch', field: 'importable', label: 'Importable', props: { clearable: true } },
        { type: 'switch', field: 'exportable', label: 'Exportable', props: { clearable: true } },
        { type: 'switch', field: 'showSelection', label: 'Show selection', props: { clearable: true } },
        { type: 'switch', field: 'showIndex', label: 'Show index', props: { clearable: true } },
        { type: 'switch', field: 'showSummary', label: 'Show summary', props: { clearable: true } },
        { type: 'switch', field: 'stripe', label: 'Stripe', props: { clearable: true } },
        { type: 'switch', field: 'border', label: 'Border', props: { clearable: true } },
        { type: 'inputNumber', field: 'height', label: 'Height', props: { min: 100, max: 800, clearable: true } }
    ],
    event: [
        { label: 'Change', value: 'change' },
        { label: 'Selection change', value: 'selection-change' },
        { label: 'Row action', value: 'row-action' },
        { label: 'Import', value: 'import' },
        { label: 'Export', value: 'export' }
    ]
};
