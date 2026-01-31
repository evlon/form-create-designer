export default {
    icon: 'icon-location',
    name: 'fc-city',
    label: 'City Picker',
    component: 'FcCity',
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
            field: 'clearable',
            label: 'Clearable',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'filterable',
            label: 'Filterable',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showAllLevels',
            label: 'Show all levels',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'areaCode',
            label: 'Return area code',
            props: { clearable: true }
        },
        {
            type: 'select',
            field: 'level',
            label: 'Level',
            options: [
                { label: 'Province', value: 1 },
                { label: 'Province + City', value: 2 },
                { label: 'Province + City + District', value: 3 }
            ]
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
            type: 'select',
            field: 'dataType',
            label: 'Data type',
            options: [
                { label: 'Name', value: 'name' },
                { label: 'Code', value: 'code' },
                { label: 'All', value: 'all' }
            ]
        }
    ],
    event: [
        { label: 'Change', value: 'change' },
        { label: 'Expand change', value: 'expand-change' },
        { label: 'Blur', value: 'blur' },
        { label: 'Focus', value: 'focus' },
        { label: 'Visible change', value: 'visible-change' }
    ]
};
