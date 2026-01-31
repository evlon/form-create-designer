export default {
    icon: 'icon-music',
    name: 'audio-box',
    label: 'Audio',
    component: 'AudioBox',
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
            label: 'Audio URL',
            props: { clearable: true, placeholder: 'Audio source URL' }
        },
        {
            type: 'input',
            field: 'trackName',
            label: 'Track name',
            props: { clearable: true }
        },
        {
            type: 'input',
            field: 'artist',
            label: 'Artist',
            props: { clearable: true }
        },
        {
            type: 'input',
            field: 'artwork',
            label: 'Artwork URL',
            props: { clearable: true, placeholder: 'Album art URL' }
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
            field: 'showHeader',
            label: 'Show header',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showAlbumArt',
            label: 'Show album art',
            props: { clearable: true }
        },
        {
            type: 'switch',
            field: 'showRateControl',
            label: 'Show rate control',
            props: { clearable: true }
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
