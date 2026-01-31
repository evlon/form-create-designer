import {localeProps} from '../../utils';

export default {
    menu: 'aide',
    icon: 'icon-qrcode',
    name: 'QrCodeBox',
    label: '二维码',
    props(_, {t}) {
        return localeProps(t, 'QrCodeBox.props', [
            { type: 'textarea', field: 'value', label: '值' },
            { type: 'inputNumber', field: 'size', label: '大小', props: { min: 50, max: 500 } },
            { type: 'color', field: 'colorDark', label: '深色' },
            { type: 'color', field: 'colorLight', label: '浅色' },
            { type: 'select', field: 'correctLevel', label: '容错级别', options: [
                { label: 'L (7%)', value: 1 },
                { label: 'M (15%)', value: 0 },
                { label: 'Q (25%)', value: 3 },
                { label: 'H (30%)', value: 2 }
            ]},
        ]);
    },
    rule({t}) {
        return {
            type: 'QrCodeBox',
            field: 'qrcode_' + Date.now(),
            title: t('com.QrCodeBox.name'),
            info: t('com.QrCodeBox.info'),
            $required: false,
            readOnly: true,
            props: {
                size: 150,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: 2,
                backgroundColor: '#ffffff'
            },
            validate: [],
            on: {
                mounted: []
            }
        };
    }
};
