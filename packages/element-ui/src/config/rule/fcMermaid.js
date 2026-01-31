import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'aide',
    icon: 'Share',
    name: 'fc-mermaid',
    label: 'Mermaid 图表',
    component: 'FcMermaid',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'fc-mermaid.props', [
            { type: 'input', field: 'title', label: '标题' },
            { type: 'switch', field: 'disabled', label: '禁用' },
            { type: 'switch', field: 'showHeader', label: '显示头部' },
            { type: 'select', field: 'diagramType', label: '图表类型', options: [
                { label: 'Flowchart', value: 'flowchart' },
                { label: 'Sequence', value: 'sequence' },
                { label: 'Class', value: 'class' },
                { label: 'State', value: 'state' },
                { label: 'ER', value: 'er' },
                { label: 'Pie', value: 'pie' },
                { label: 'Gantt', value: 'gantt' },
                { label: 'Git', value: 'git' }
            ]},
            { type: 'select', field: 'direction', label: '方向', options: [
                { label: 'Top to Bottom', value: 'TB' },
                { label: 'Bottom to Top', value: 'BT' },
                { label: 'Left to Right', value: 'LR' },
                { label: 'Right to Left', value: 'RL' }
            ]},
            { type: 'select', field: 'theme', label: '主题', options: [
                { label: 'Default', value: 'default' },
                { label: 'Forest', value: 'forest' },
                { label: 'Dark', value: 'dark' },
                { label: 'Neutral', value: 'neutral' }
            ]},
            { type: 'inputNumber', field: 'height', label: '高度', props: { min: 100 } },
            { type: 'textarea', field: 'modelValue', label: '图表代码' },
        ]);
    },
    rule({t}) {
        return {
            type: 'fc-mermaid',
            field: 'mermaid_' + Date.now(),
            title: t('com.fc-mermaid.name'),
            info: t('com.fc-mermaid.info'),
            $required: false,
            props: {
                modelValue: '',
                title: '',
                disabled: false,
                showHeader: true,
                diagramType: 'flowchart',
                direction: 'TB',
                theme: 'default',
                height: 400
            },
            on: {
                change: [],
                rendered: [],
                error: [],
                edit: [],
                'update:modelValue': []
            }
        };
    }
};
