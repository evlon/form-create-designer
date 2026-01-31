export default {
    icon: 'icon-infinite',
    name: 'infinite-form',
    label: 'Infinite Form',
    component: 'InfiniteForm',
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
            field: 'multiple',
            label: 'Multiple select',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showHeader',
            label: 'Show header',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showFooter',
            label: 'Show footer',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showActions',
            label: 'Show actions',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showInfo',
            label: 'Show info',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'remoteLoad',
            label: 'Remote load',
            props: {
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'loadUrl',
            label: 'Load URL',
            props: {
                clearable: true,
                placeholder: 'Remote data loading URL'
            }
        },
        {
            type: 'inputNumber',
            field: 'pageSize',
            label: 'Page size',
            props: {
                min: 10,
                max: 200,
                clearable: true
            }
        },
        {
            type: 'inputNumber',
            field: 'itemHeight',
            label: 'Item height',
            props: {
                min: 30,
                max: 100,
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'itemKey',
            label: 'Item key field',
            props: {
                clearable: true,
                placeholder: 'Field name for item key'
            }
        },
        {
            type: 'input',
            field: 'itemTitle',
            label: 'Item title field',
            props: {
                clearable: true,
                placeholder: 'Field name for display'
            }
        }
    ],
    event: [
        { label: 'Change', value: 'change' },
        { label: 'Load', value: 'load' },
        { label: 'Select', value: 'select' },
        { label: 'Confirm', value: 'confirm' },
        { label: 'Scroll', value: 'scroll' }
    ]
};
