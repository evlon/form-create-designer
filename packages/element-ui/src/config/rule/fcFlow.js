export default {
    icon: 'icon-flow',
    name: 'fc-flow',
    label: 'Flowchart',
    component: 'FcFlow',
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
            field: 'loading',
            label: 'Loading',
            props: {
                clearable: true
            }
        },
        {
            type: 'select',
            field: 'diagramType',
            label: 'Diagram type',
            options: [
                { label: 'Flowchart', value: 'flowchart' },
                { label: 'Sequence', value: 'sequence' },
                { label: 'Class Diagram', value: 'class' },
                { label: 'State Diagram', value: 'state' },
                { label: 'ER Diagram', value: 'er' },
                { label: 'Pie Chart', value: 'pie' },
                { label: 'Gantt', value: 'gantt' }
            ]
        },
        {
            type: 'select',
            field: 'direction',
            label: 'Direction',
            options: [
                { label: 'Top to Bottom', value: 'TB' },
                { label: 'Bottom to Top', value: 'BT' },
                { label: 'Left to Right', value: 'LR' },
                { label: 'Right to Left', value: 'RL' }
            ]
        },
        {
            type: 'select',
            field: 'theme',
            label: 'Theme',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Forest', value: 'forest' },
                { label: 'Dark', value: 'dark' },
                { label: 'Neutral', value: 'neutral' }
            ]
        },
        {
            type: 'inputNumber',
            field: 'height',
            label: 'Height',
            props: {
                min: 100,
                clearable: true
            }
        },
        {
            type: 'textarea',
            field: 'modelValue',
            label: 'Diagram code',
            props: {
                rows: 6,
                placeholder: 'Enter Mermaid diagram code'
            }
        }
    ],
    event: [
        { label: 'Click', value: 'click' },
        { label: 'Rendered', value: 'rendered' }
    ]
};
