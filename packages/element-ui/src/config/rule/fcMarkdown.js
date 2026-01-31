export default {
    icon: 'icon-document',
    name: 'fc-markdown',
    label: 'Markdown',
    component: 'FcMarkdown',
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
            field: 'editable',
            label: 'Editable',
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
            field: 'showToolbar',
            label: 'Show toolbar',
            props: {
                clearable: true
            }
        },
        {
            type: 'inputNumber',
            field: 'editorRows',
            label: 'Editor rows',
            props: {
                min: 3,
                max: 30,
                clearable: true
            }
        },
        {
            type: 'textarea',
            field: 'modelValue',
            label: 'Content',
            props: {
                rows: 6,
                placeholder: 'Enter markdown content'
            }
        }
    ],
    event: [
        { label: 'Change', value: 'change' },
        { label: 'Rendered', value: 'rendered' },
        { label: 'Copy', value: 'copy' }
    ]
};
