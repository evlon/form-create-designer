import { makeOptionsRule, makeRequiredRule, getInjectArg } from '../../utils';

export default {
    icon: 'icon-editor',
    name: 'fcDynamicRender',
    title: 'Vue组件',
    columns: [
        makeOptionsRule('props'),
    ],
    rules: [
        makeRequiredRule('fcDynamicRender'),
    ],
    getOptions(field, { t }) {
        return [
            { label: t('com.fcDynamicRender.props.vueContent'), value: 'vueContent', type: 'textarea' },
            { label: t('com.fcDynamicRender.props.formCreateInject'), value: 'formCreateInject', type: 'object' },
        ];
    },
    rule({ t }) {
        return {
            type: 'fcDynamicRender',
            field: 'vueComponent_' + Date.now(),
            title: t('com.fcDynamicRender.name'),
            info: t('com.fcDynamicRender.info'),
            $required: false,
            readOnly: false,
            props: {
                vueContent: '',
                formCreateInject: getInjectArg()
            },
            validate: [],
            on: {
                mounted: [],
                error: []
            }
        };
    }
};
