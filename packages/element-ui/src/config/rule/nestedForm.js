export default {
    icon: 'icon-group',
    name: 'nested-form',
    label: 'Nested Form',
    component: 'NestedForm',
    rules: [
        makeRequiredRule()
    ],
    props: [
        {
            type: 'input',
            field: 'field',
            label: 'Field ID',
            props: {
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'title',
            label: 'Title',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'disabled',
            label: 'Disabled',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'required',
            label: 'Required',
            props: {
                clearable: true
            }
        },
        {
            type: 'inputNumber',
            field: 'min',
            label: 'Min items',
            props: {
                min: 0,
                clearable: true
            }
        },
        {
            type: 'inputNumber',
            field: 'max',
            label: 'Max items',
            props: {
                min: 0,
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showAdd',
            label: 'Show add button',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showDelete',
            label: 'Show delete button',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'sortable',
            label: 'Sortable',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'expandable',
            label: 'Expandable',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showPagination',
            label: 'Show pagination',
            props: {
                clearable: true
            }
        },
        {
            type: 'inputNumber',
            field: 'pageSize',
            label: 'Page size',
            props: {
                min: 1,
                max: 100,
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'addBtnText',
            label: 'Add button text',
            props: {
                clearable: true,
                placeholder: 'Custom add button text'
            }
        }
    ]
};
