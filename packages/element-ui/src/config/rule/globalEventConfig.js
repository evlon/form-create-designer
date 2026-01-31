import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'aide',
    icon: 'Bell',
    name: 'global-event-config',
    label: '全局事件',
    component: 'GlobalEventConfig',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'global-event-config.props', [
            { type: 'input', field: 'title', label: '标题' },
        ]);
    },
    rule({t}) {
        return {
            type: 'global-event-config',
            field: 'event_' + Date.now(),
            title: t('com.global-event-config.name'),
            info: t('com.global-event-config.info'),
            $required: false,
            props: {
                modelValue: []
            },
            on: {
                change: [],
                'update:modelValue': []
            }
        };
    }
};
