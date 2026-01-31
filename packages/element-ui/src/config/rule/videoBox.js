export default {
    icon: 'icon-video',
    name: 'video-box',
    label: 'Video',
    component: 'VideoBox',
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
            type: 'input',
            field: 'src',
            label: 'Video URL',
            props: { clearable: true, placeholder: 'Video source URL' }
        },
        {
            type: 'input',
            field: 'poster',
            label: 'Poster URL',
            props: { clearable: true, placeholder: 'Video cover image URL' }
        },
        {
            type: 'switch',
            field: 'controls',
            label: 'Show controls',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'autoplay',
            label: 'Autoplay',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'loop',
            label: 'Loop',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'muted',
            label: 'Muted',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showHeader',
            label: 'Show header',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showCustomControls',
            label: 'Custom controls',
            props: { clearable: true }
        },
        {
            type: 'inputNumber',
            field: 'height',
            label: 'Height',
            props: { min: 100, max: 800, clearable: true }
        }
    ],
    event: [
        { label: 'Play', value: 'play' },
        { label: 'Pause', value: 'pause' },
        { label: 'Ended', value: 'ended' },
        { label: 'Time update', value: 'timeupdate' },
        { label: 'Error', value: 'error' }
    ]
};
