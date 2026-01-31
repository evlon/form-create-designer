import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'subform',
    icon: 'List',
    name: 'step-form-item',
    label: '步骤项',
    component: 'StepFormItem',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'step-form-item.props', [
            { type: 'input', field: 'label', label: '标签' },
            { type: 'input', field: 'description', label: '描述' },
            { type: 'inputNumber', field: 'stepNumber', label: '步骤号' },
            { type: 'switch', field: 'isActive', label: '是否激活' },
            { type: 'switch', field: 'isCompleted', label: '是否完成' },
            { type: 'switch', field: 'showExpand', label: '显示展开' },
            { type: 'switch', field: 'showActions', label: '显示操作' },
            { type: 'switch', field: 'showPrev', label: '显示上一步' },
            { type: 'switch', field: 'showNext', label: '显示下一步' },
            { type: 'switch', field: 'showSubmit', label: '显示提交' },
        ]);
    },
    rule({t}) {
        return {
            type: 'step-form-item',
            field: 'stepitem_' + Date.now(),
            title: t('com.step-form-item.name'),
            info: t('com.step-form-item.info'),
            $required: false,
            props: {
                modelValue: {},
                stepNumber: 1,
                label: '',
                description: '',
                fields: [],
                option: {},
                isActive: false,
                isCompleted: false,
                showExpand: true,
                showActions: true,
                showPrev: true,
                showNext: true,
                showSubmit: false
            },
            on: {
                change: [],
                prev: [],
                next: [],
                submit: [],
                expand: [],
                collapse: [],
                'update:modelValue': []
            }
        };
    }
};
