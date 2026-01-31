import {localeProps, getInjectArg} from '../../utils';

export default {
    menu: 'layout',
    icon: 'icon-editor',
    name: 'fcDynamicRender',
    label: 'Vue组件',
    props(_, {t}) {
        return localeProps(t, 'fcDynamicRender.props', [
            { type: 'textarea', field: 'vueContent', label: '组件代码' },
            { type: 'object', field: 'formCreateInject', label: '注入数据' },
        ]);
    },
    rule({t}) {
        return {
            type: 'fcDynamicRender',
            field: 'vueComponent_' + Date.now(),
            title: t('com.fcDynamicRender.name'),
            info: t('com.fcDynamicRender.info'),
            $required: false,
            readOnly: false,
            props: {
                vueContent: '',
                formCreateInject: getInjectArg(t)
            },
            validate: [],
            on: {
                mounted: [],
                error: []
            }
        };
    }
};
