export default {
    icon: 'icon-printer',
    name: 'print-form',
    label: 'Print Form',
    component: 'PrintForm',
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
            type: 'input',
            field: 'subtitle',
            label: 'Subtitle',
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
            field: 'showPrintTime',
            label: 'Show print time',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showPage',
            label: 'Show page info',
            props: {
                clearable: true
            }
        },
        {
            type: 'select',
            field: 'paperSize',
            label: 'Paper size',
            options: [
                { label: 'A3', value: 'A3' },
                { label: 'A4', value: 'A4' },
                { label: 'A5', value: 'A5' },
                { label: 'Letter', value: 'Letter' },
                { label: 'Legal', value: 'Legal' }
            ]
        },
        {
            type: 'select',
            field: 'orientation',
            label: 'Orientation',
            options: [
                { label: 'Portrait', value: 'portrait' },
                { label: 'Landscape', value: 'landscape' }
            ]
        },
        {
            type: 'input',
            field: 'margin',
            label: 'Margin',
            props: {
                clearable: true,
                placeholder: 'e.g., 20mm'
            }
        },
        {
            type: 'input',
            field: 'printUrl',
            label: 'Print URL',
            props: {
                clearable: true,
                placeholder: 'Print service URL'
            }
        }
    ]
};
