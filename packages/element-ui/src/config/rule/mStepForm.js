import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'subform',
    icon: 'List',
    name: 'm-step-form',
    label: '多步表单',
    component: 'MStepForm',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'm-step-form.props', [
            { type: 'input', field: 'title', label: '标题' },
        ]);
    },
    rule({t}) {
        return {
            type: 'm-step-form',
            field: 'mstep_' + Date.now(),
            title: t('com.m-step-form.name'),
            info: t('com.m-step-form.info'),
            $required: false,
            props: {
                modelValue: {},
                steps: [
                    { label: 'Step 1', fields: [], icon: 'Edit' },
                    { label: 'Step 2', fields: [], icon: 'Edit' },
                    { label: 'Step 3', fields: [], icon: 'Edit' }
                ],
                option: {}
            },
            on: {
                change: [],
                'step-change': [],
                submit: [],
                'update:modelValue': []
            }
        };
    }
};
