import {localeProps} from '../../utils';

export default {
    menu: 'aide',
    icon: 'icon-barcode',
    name: 'BarCodeBox',
    label: '条形码',
    props(_, {t}) {
        return localeProps(t, 'BarCodeBox.props', [
            { type: 'textarea', field: 'value', label: '值' },
            { type: 'select', field: 'format', label: '格式', options: [
                { label: 'CODE128', value: 'CODE128' },
                { label: 'CODE39', value: 'CODE39' },
                { label: 'EAN-13', value: 'EAN13' },
                { label: 'EAN-8', value: 'EAN8' },
                { label: 'ITF-14', value: 'ITF14' },
                { label: 'MSI', value: 'MSI' },
                { label: 'pharmacode', value: 'pharmacode' },
                { label: 'codabar', value: 'codabar' }
            ]},
            { type: 'color', field: 'lineColor', label: '线条颜色' },
            { type: 'inputNumber', field: 'width', label: '宽度', props: { min: 50, max: 500 } },
            { type: 'inputNumber', field: 'height', label: '高度', props: { min: 30, max: 300 } },
            { type: 'switch', field: 'displayValue', label: '显示值' },
            { type: 'select', field: 'textAlign', label: '文本对齐', options: [
                { label: '左', value: 'left' },
                { label: '中', value: 'center' },
                { label: '右', value: 'right' }
            ]},
        ]);
    },
    rule({t}) {
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
