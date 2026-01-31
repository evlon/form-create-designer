import { makeOptionsRule, makeRequiredRule, getInjectArg } from '../../utils';

export default {
    icon: 'icon-qrcode',
    name: 'QrCodeBox',
    title: '二维码',
    columns: [
        makeOptionsRule('props'),
    ],
    rules: [
        makeRequiredRule('QrCodeBox'),
    ],
    getOptions(field, { t }) {
        return [
            { label: t('com.QrCodeBox.props.value'), value: 'text', type: 'textarea' },
            { label: t('com.QrCodeBox.props.size'), value: 'size', type: 'number' },
            { label: t('com.QrCodeBox.props.colorDark'), value: 'colorDark', type: 'color' },
            { label: t('com.QrCodeBox.props.colorLight'), value: 'colorLight', type: 'color' },
            { label: t('com.QrCodeBox.props.correctLevel'), value: 'correctLevel', type: 'select', options: [
                { label: 'L (7%)', value: 1 },
                { label: 'M (15%)', value: 0 },
                { label: 'Q (25%)', value: 3 },
                { label: 'H (30%)', value: 2 }
            ]},
        ];
    },
    rule({ t }) {
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
