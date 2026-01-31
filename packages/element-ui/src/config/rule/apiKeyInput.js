export default {
    icon: 'icon-input',
    name: 'api-key-input',
    label: 'API Key',
    component: 'ApiKeyInput',
    props: [
        {
            type: 'input',
            field: 'field',
            label: '字段ID',
            props: {
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'title',
            label: '字段名称',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'disabled',
            label: '禁用',
            props: {
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'placeholder',
            label: '占位符',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'clearable',
            label: '可清除',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showPassword',
            label: '显示密码',
            props: {
                clearable: true
            }
        },
        {
            type: 'switch',
            field: 'showValidation',
            label: '显示验证',
            props: {
                clearable: true
            }
        },
        {
            type: 'input',
            field: 'validationUrl',
            label: '验证接口',
            props: {
                clearable: true,
                placeholder: 'API Key 验证接口地址'
            }
        },
        {
            type: 'input',
            field: 'validateField',
            label: '验证字段',
            props: {
                clearable: true,
                placeholder: '接口参数字段名，默认 api_key'
            }
        },
        {
            type: 'input',
            field: 'errorMsg',
            label: '错误提示',
            props: {
                clearable: true
            }
        }
    ]
};
