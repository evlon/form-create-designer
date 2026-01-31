import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'aide',
    icon: 'Edit',
    name: 'signature',
    label: '签名',
    component: 'Signature',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'signature.props', [
            { type: 'input', field: 'title', label: '标题' },
            { type: 'switch', field: 'disabled', label: '禁用' },
            { type: 'switch', field: 'showHeader', label: '显示头部' },
            { type: 'switch', field: 'showPreview', label: '显示预览' },
            { type: 'switch', field: 'showTips', label: '显示提示' },
            { type: 'inputNumber', field: 'width', label: '宽度', props: { min: 100 } },
            { type: 'inputNumber', field: 'height', label: '高度', props: { min: 50 } },
            { type: 'inputNumber', field: 'lineWidth', label: '线宽', props: { min: 1, max: 10 } },
            { type: 'color', field: 'strokeColor', label: '笔触颜色' },
            { type: 'color', field: 'backgroundColor', label: '背景颜色' },
        ]);
    },
    rule({t}) {
        return {
            type: 'signature',
            field: 'signature_' + Date.now(),
            title: t('com.signature.name'),
            info: t('com.signature.info'),
            $required: false,
            props: {
                modelValue: '',
                title: '',
                disabled: false,
                showHeader: true,
                showPreview: true,
                showTips: true,
                width: 500,
                height: 200,
                lineWidth: 2,
                strokeColor: '#000000',
                backgroundColor: '#ffffff'
            },
            on: {
                change: [],
                clear: [],
                save: [],
                'update:modelValue': []
            }
        };
    }
};
