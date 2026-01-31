import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'subform',
    icon: 'icon-group',
    name: 'nested-form',
    label: 'Nested Form',
    component: 'NestedForm',
    rules: [
        makeRequiredRule()
    ],
    props(_, {t}) {
        return localeProps(t, 'nested-form.props', [
            { type: 'input', field: 'field', label: 'Field ID' },
            { type: 'input', field: 'title', label: '标题' },
            { type: 'switch', field: 'disabled', label: '禁用' },
            { type: 'switch', field: 'required', label: '必填' },
            { type: 'inputNumber', field: 'min', label: '最小数量', props: { min: 0 } },
            { type: 'inputNumber', field: 'max', label: '最大数量', props: { min: 0 } },
            { type: 'switch', field: 'showAdd', label: '显示添加按钮' },
            { type: 'switch', field: 'showDelete', label: '显示删除按钮' },
            { type: 'switch', field: 'sortable', label: '可排序' },
            { type: 'switch', field: 'expandable', label: '可展开' },
            { type: 'switch', field: 'showPagination', label: '显示分页' },
            { type: 'inputNumber', field: 'pageSize', label: '每页数量', props: { min: 1, max: 100 } },
            { type: 'input', field: 'addBtnText', label: '添加按钮文本' },
        ]);
    }
};
