<template>
    <div class="_fc-config-panel">
        <el-collapse v-model="activeCollapse" accordion>
            <el-collapse-item title="基础配置" name="basic">
                <div class="config-section">
                    <el-form size="small" label-width="80px">
                        <el-form-item label="标题">
                            <el-input v-model="config.title" placeholder="请输入标题" />
                        </el-form-item>
                        <el-form-item label="字段名">
                            <el-input v-model="config.field" placeholder="请输入字段名" />
                        </el-form-item>
                        <el-form-item label="默认值">
                            <el-input v-model="config.defaultValue" placeholder="请输入默认值" />
                        </el-form-item>
                        <el-form-item label="占位符">
                            <el-input v-model="config.placeholder" placeholder="请输入占位符" />
                        </el-form-item>
                        <el-form-item label="禁用">
                            <el-switch v-model="config.disabled" />
                        </el-form-item>
                        <el-form-item label="只读">
                            <el-switch v-model="config.readOnly" />
                        </el-form-item>
                        <el-form-item label="清除">
                            <el-switch v-model="config.clearable" />
                        </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item title="校验配置" name="validate">
                <div class="config-section">
                    <el-form size="small" label-width="80px">
                        <el-form-item label="必填">
                            <el-switch v-model="config.required" />
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="config.validateType" placeholder="选择类型" clearable>
                                <el-option label="字符串" value="string" />
                                <el-option label="数字" value="number" />
                                <el-option label="整数" value="integer" />
                                <el-option label="浮点数" value="float" />
                                <el-option label="数组" value="array" />
                                <el-option label="日期" value="date" />
                                <el-option label="邮箱" value="email" />
                                <el-option label="URL" value="url" />
                                <el-option label="手机号" value="phone" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="正则">
                            <el-input v-model="config.pattern" placeholder="请输入正则表达式" />
                        </el-form-item>
                        <el-form-item label="最小值">
                            <el-input-number v-model="config.min" :min="0" />
                        </el-form-item>
                        <el-form-item label="最大值">
                            <el-input-number v-model="config.max" :min="0" />
                        </el-form-item>
                        <el-form-item label="最小长度">
                            <el-input-number v-model="config.minLength" :min="0" />
                        </el-form-item>
                        <el-form-item label="最大长度">
                            <el-input-number v-model="config.maxLength" :min="0" />
                        </el-form-item>
                    </el-form>
                </div>
            </el-collapse-item>

            <el-collapse-item title="样式配置" name="style">
                <div class="config-section">
                    <StyleEditor v-model="config.style" :show-preview="true" />
                </div>
            </el-collapse-item>

            <el-collapse-item title="事件配置" name="events">
                <div class="config-section">
                    <EventConfig v-model="config.events" :component-name="componentName" />
                </div>
            </el-collapse-item>

            <el-collapse-item title="远程数据" name="remote">
                <div class="config-section">
                    <FetchConfig v-model="config.fetchConfig" />
                </div>
            </el-collapse-item>

            <el-collapse-item title="表单联动" name="control">
                <div class="config-section">
                    <ControlConfig v-model="config.control" />
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import StyleEditor from './StyleEditor.vue';
import EventConfig from './EventConfig.vue';
import FetchConfig from './FetchConfig.vue';

export default defineComponent({
    name: 'ConfigPanel',
    components: {
        StyleEditor,
        EventConfig,
        FetchConfig
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        componentName: {
            type: String,
            default: ''
        },
        showSections: {
            type: Array,
            default: () => ['basic', 'validate', 'style', 'events', 'remote', 'control']
        }
    },
    setup(props, { emit }) {
        const activeCollapse = ref('basic');
        const config = ref({
            title: '',
            field: '',
            defaultValue: '',
            placeholder: '',
            disabled: false,
            readOnly: false,
            clearable: false,
            required: false,
            validateType: '',
            pattern: '',
            min: null,
            max: null,
            minLength: null,
            maxLength: null,
            style: {},
            events: {},
            fetchConfig: {},
            control: {},
            ...props.modelValue
        });

        watch(config, (newVal) => {
            emit('update:modelValue', newVal);
            emit('change', newVal);
        }, { deep: true });

        watch(() => props.modelValue, (newVal) => {
            if (newVal) {
                config.value = { ...config.value, ...newVal };
            }
        }, { deep: true });

        return {
            activeCollapse,
            config,
            componentName: computed(() => props.componentName)
        };
    }
});
</script>

<style>
._fc-config-panel {
    width: 100%;
    padding: 10px;
}

._fc-config-panel .el-collapse-item__header {
    font-weight: 500;
    padding-left: 15px;
}

._fc-config-panel .config-section {
    padding: 10px;
}

._fc-config-panel .el-form-item {
    margin-bottom: 12px;
}

._fc-config-panel .el-form-item__label {
    font-size: 12px;
}
</style>
