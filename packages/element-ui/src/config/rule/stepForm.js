import {localeProps} from '../../utils';

export default {
    menu: 'subform',
    icon: 'icon-step-form',
    name: 'StepForm',
    label: '分步表单',
    props(_, {t}) {
        return localeProps(t, 'StepForm.props', [
            { type: 'inputNumber', field: 'activeStep', label: '当前步骤' },
            { type: 'switch', field: 'showSteps', label: '显示步骤' },
            { type: 'switch', field: 'simple', label: '简洁模式' },
            { type: 'input', field: 'finishBtnText', label: '完成按钮文本' },
            { type: 'switch', field: 'validateOnChange', label: '变化时校验' },
        ]);
    },
    rule({t}) {
        return {
            type: 'StepForm',
            field: 'stepForm_' + Date.now(),
            title: t('com.StepForm.name'),
            info: t('com.StepForm.info'),
            $required: false,
            props: {
                activeStep: 0,
                showSteps: true,
                simple: true,
                finishBtnText: '提交',
                validateOnChange: true,
                steps: [
                    { title: '步骤1', rules: [] },
                    { title: '步骤2', rules: [] },
                    { title: '步骤3', rules: [] }
                ]
            },
            validate: [],
            on: {
                'step-change': [],
                finish: []
            }
        };
    }
};
