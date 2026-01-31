export default {
    icon: 'icon-picture',
    name: 'image-box',
    label: 'Image',
    component: 'ImageBox',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'disabled', label: 'Disabled', props: { clearable: true } },
        { type: 'input', field: 'src', label: 'Image URL', props: { clearable: true } },
        { type: 'input', field: 'alt', label: 'Alt text', props: { clearable: true } },
        { type: 'select', field: 'fit', label: 'Fit mode', options: [
            { label: 'Cover', value: 'cover' },
            { label: 'Contain', value: 'contain' },
            { label: 'Fill', value: 'fill' }
        ]},
        { type: 'switch', field: 'lazy', label: 'Lazy load', props: { clearable: true } },
        { type: 'switch', field: 'editable', label: 'Editable', props: { clearable: true } },
        { type: 'switch', field: 'deletable', label: 'Deletable', props: { clearable: true } },
        { type: 'inputNumber', field: 'height', label: 'Height', props: { min: 50, max: 800, clearable: true } }
    ],
    event: [
        { label: 'Load', value: 'load' },
        { label: 'Error', value: 'error' },
        { label: 'Click', value: 'click' },
        { label: 'Change', value: 'change' }
    ]
};
