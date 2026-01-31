export default {
    icon: 'icon-tool',
    name: 'tools-bar',
    label: 'Tools Bar',
    component: 'ToolsBar',
    props: [
        { type: 'input', field: 'field', label: 'Field ID', props: { clearable: true } },
        { type: 'input', field: 'title', label: 'Title', props: { clearable: true } },
        { type: 'switch', field: 'showMore', label: 'Show more menu', props: { clearable: true } },
        { type: 'inputNumber', field: 'moreThreshold', label: 'More threshold', props: { min: 3, max: 10, clearable: true } }
    ],
    event: [
        { label: 'Click', value: 'click' },
        { label: 'Command', value: 'command' },
        { label: 'Search', value: 'search' },
        { label: 'Input', value: 'input' }
    ]
};
