import { makeOptionsRule, makeRequiredRule, getInjectArg } from '../../utils';

export default {
    icon: 'icon-step-form',
    name: 'StepForm',
    title: '分步表单',
    columns: [
        makeOptionsRule('props'),
    ],
    rules: [
        makeRequiredRule('StepForm'),
    ],
    getOptions(field, { t }) {
        return [
            { label: t('com.StepForm.props.activeStep'), value: 'activeStep', type: 'number' },
            { label: t('com.StepForm.props.showSteps'), value: 'showSteps', type: 'switch' },
            { label: t('com.StepForm.props.simple'), value: 'simple', type: 'switch' },
            { label: t('com.StepForm.props.finishBtnText'), value: 'finishBtnText', type: 'text' },
            { label: t('com.StepForm.props.validateOnChange'), value: 'validateOnChange', type: 'switch' },
        ];
    },
    rule({ t }) {
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
