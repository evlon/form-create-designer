import { makeOptionsRule, makeRequiredRule, getInjectArg } from '../../utils';

export default {
    icon: 'icon-iframe',
    name: 'IframeBox',
    title: '内嵌页面',
    columns: [
        makeOptionsRule('props'),
    ],
    rules: [
        makeRequiredRule('IframeBox'),
    ],
    getOptions(field, { t }) {
        return [
            { label: t('com.IframeBox.props.src'), value: 'src', type: 'text' },
            { label: t('com.IframeBox.props.width'), value: 'width', type: 'text' },
            { label: t('com.IframeBox.props.height'), value: 'height', type: 'number' },
            { label: t('com.IframeBox.props.loading'), value: 'loading', type: 'switch' },
            { label: t('com.IframeBox.props.showLoading'), value: 'showLoading', type: 'switch' },
            { label: t('com.IframeBox.props.allowFullscreen'), value: 'allowFullscreen', type: 'switch' },
        ];
    },
    rule({ t }) {
        return {
            type: 'IframeBox',
            field: 'iframe_' + Date.now(),
            title: t('com.IframeBox.name'),
            info: t('com.IframeBox.info'),
            $required: false,
            readOnly: true,
            props: {
                src: '',
                width: '100%',
                height: 400,
                frameBorder: 0,
                loading: true,
                showLoading: true,
                allowFullscreen: false
            },
            validate: [],
            on: {
                load: [],
                error: [],
                mounted: []
            }
        };
    }
};
