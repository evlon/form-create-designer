export default {
    icon: 'icon-table',
    name: 'data-table',
    label: 'Data Table',
    component: 'DataTable',
    props: [
        {
            type: 'input',
            field: 'field',
            label: 'Field ID',
            props: { clearable: true }
        },
        {
            type: 'input',
            field: 'title',
            label: 'Title',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'disabled',
            label: 'Disabled',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showActions',
            label: 'Show actions',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showSelection',
            label: 'Show selection',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showIndex',
            label: 'Show index',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showExport',
            label: 'Show export',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showPagination',
            label: 'Show pagination',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'stripe',
            label: 'Stripe',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'border',
            label: 'Border',
            props: { clearable: true }
        },
        {
            type: 'select',
            field: 'size',
            label: 'Size',
            options: [
                { label: 'Large', value: 'large' },
                { label: 'Default', value: 'default' },
                { label: 'Small', value: 'small' }
            ]
        },
        {
            type: 'switch',
            field: 'remoteData',
            label: 'Remote data',
            props: { clearable: true }
        },
        {
            type: 'input',
            field: 'remoteUrl',
            label: 'Remote URL',
            props: { clearable: true, placeholder: 'Data loading URL' }
        },
        {
            type: 'inputNumber',
            field: 'pageSize',
            label: 'Page size',
            props: { min: 5, max: 500, clearable: true }
        }
    ],
    event: [
        { label: 'Selection change', value: 'selection-change' },
        { label: 'Row click', value: 'row-click' },
        { label: 'Cell click', value: 'cell-click' },
        { label: 'Sort change', value: 'sort-change' },
        { label: 'Filter change', value: 'filter-change' },
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete' },
        { label: 'Refresh', value: 'refresh' },
        { label: 'Export', value: 'export' }
    ]
};
