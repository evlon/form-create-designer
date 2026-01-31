import {localeProps} from '../../utils';

export default {
    menu: 'aide',
    icon: 'icon-iframe',
    name: 'IframeBox',
    label: '内嵌页面',
    props(_, {t}) {
        return localeProps(t, 'IframeBox.props', [
            { type: 'input', field: 'src', label: '地址' },
            { type: 'input', field: 'width', label: '宽度' },
            { type: 'inputNumber', field: 'height', label: '高度', props: { min: 100 } },
            { type: 'switch', field: 'loading', label: '加载中' },
            { type: 'switch', field: 'showLoading', label: '显示加载' },
            { type: 'switch', field: 'allowFullscreen', label: '全屏显示' },
        ]);
    },
    rule({t}) {
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
