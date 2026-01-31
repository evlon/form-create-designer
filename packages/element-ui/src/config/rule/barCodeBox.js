import { makeOptionsRule, makeRequiredRule, getInjectArg } from '../../utils';

export default {
    icon: 'icon-barcode',
    name: 'BarCodeBox',
    title: '条形码',
    columns: [
        makeOptionsRule('props'),
    ],
    rules: [
        makeRequiredRule('BarCodeBox'),
    ],
    getOptions(field, { t }) {
        return [
            { label: t('com.BarCodeBox.props.value'), value: 'text', type: 'textarea' },
            { label: t('com.BarCodeBox.props.format'), value: 'format', type: 'select', options: [
                { label: 'CODE128', value: 'CODE128' },
                { label: 'CODE39', value: 'CODE39' },
                { label: 'EAN-13', value: 'EAN13' },
                { label: 'EAN-8', value: 'EAN8' },
                { label: 'ITF-14', value: 'ITF14' },
                { label: 'MSI', value: 'MSI' },
                { label: 'pharmacode', value: 'pharmacode' },
                { label: 'codabar', value: 'codabar' }
            ]},
            { label: t('com.BarCodeBox.props.lineColor'), value: 'lineColor', type: 'color' },
            { label: t('com.BarCodeBox.props.width'), value: 'width', type: 'number' },
            { label: t('com.BarCodeBox.props.height'), value: 'height', type: 'number' },
            { label: t('com.BarCodeBox.props.displayValue'), value: 'displayValue', type: 'switch' },
            { label: t('com.BarCodeBox.props.textAlign'), value: 'textAlign', type: 'select', options: [
                { label: '左', value: 'left' },
                { label: '中', value: 'center' },
                { label: '右', value: 'right' }
            ]},
        ];
    },
    rule({ t }) {
        return {
            type: 'BarCodeBox',
            field: 'barcode_' + Date.now(),
            title: t('com.BarCodeBox.name'),
            info: t('com.BarCodeBox.info'),
            $required: false,
            readOnly: true,
            props: {
                format: 'CODE128',
                lineColor: '#000000',
                backgroundColor: '#ffffff',
                width: 200,
                height: 80,
                displayValue: true,
                textAlign: 'center',
                textPosition: 'bottom',
                fontSize: 20,
                margin: 10
            },
            validate: [],
            on: {
                mounted: []
            }
        };
    }
};
