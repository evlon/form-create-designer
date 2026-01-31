<template>
    <div class="_fc-api-key-input">
        <el-input
            :model-value="modelValue"
            @update:modelValue="updateValue"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="placeholder"
            :disabled="disabled"
            :size="size"
            :clearable="clearable"
            @blur="onBlur"
            @focus="onFocus"
        >
            <template #prefix>
                <el-icon class="input-icon"><Key /></el-icon>
            </template>
            <template #suffix>
                <el-icon 
                    class="toggle-icon" 
                    @click="showPassword = !showPassword"
                >
                    <View v-if="!showPassword" />
                    <Close v-else />
                </el-icon>
            </template>
        </el-input>
        
        <div class="validation-result" v-if="showValidation && validated !== null">
            <el-tag :type="validated ? 'success' : 'danger'" size="small">
                <el-icon><component :is="validated ? 'CircleCheck' : 'CircleClose'" /></el-icon>
                {{ validated ? 'API Key 有效' : 'API Key 无效' }}
            </el-tag>
        </div>
        
        <div class="validation-tips" v-if="showTips && !validated && errorMsg">
            <el-alert
                :title="errorMsg"
                type="warning"
                :closable="false"
                show-icon
                size="small"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue';
import { Key, View, Close, CircleCheck, CircleClose } from '@element-plus/icons-vue';

export default defineComponent({
    name: 'ApiKeyInput',
    components: {
        Key,
        View,
        Close,
        CircleCheck,
        CircleClose
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'blur', 'focus', 'validate', 'validation-success', 'validation-fail'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: '请输入 API Key'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default'
        },
        clearable: {
            type: Boolean,
            default: true
        },
        showPassword: {
            type: Boolean,
            default: false
        },
        showValidation: {
            type: Boolean,
            default: false
        },
        showTips: {
            type: Boolean,
            default: true
        },
        validateOnChange: {
            type: Boolean,
            default: true
        },
        validationUrl: {
            type: String,
            default: ''
        },
        validateField: {
            type: String,
            default: ''
        },
        errorMsg: {
            type: String,
            default: '请输入有效的 API Key'
        }
    },
    setup(props, { emit }) {
        const showPassword = ref(props.showPassword);
        const validated = ref(null);
        const validating = ref(false);

        const updateValue = (value) => {
            emit('update:modelValue', value);
            emit('change', value);
            
            if (props.validateOnChange && value && props.showValidation) {
                validateKey(value);
            } else {
                validated.value = null;
            }
        };

        const validateKey = async (key) => {
            if (!key || validating.value) return;
            
            validating.value = true;
            validated.value = null;
            
            try {
                emit('validate', key);
                
                if (props.validationUrl) {
                    const response = await fetch(props.validationUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            [props.validateField || 'api_key']: key
                        })
                    });
                    
                    const result = await response.json();
                    validated.value = result.success !== false;
                } else {
                    validated.value = key.length >= 20;
                }
                
                if (validated.value) {
                    emit('validation-success', key);
                } else {
                    emit('validation-fail', key);
                }
            } catch (error) {
                console.error('[ApiKeyInput] Validation error:', error);
                validated.value = key.length >= 20;
            } finally {
                validating.value = false;
            }
        };

        const onBlur = (event) => {
            emit('blur', event);
            if (props.modelValue && props.showValidation) {
                validateKey(props.modelValue);
            }
        };

        const onFocus = (event) => {
            emit('focus', event);
        };

        watch(() => props.showValidation, (val) => {
            if (val && props.modelValue) {
                validateKey(props.modelValue);
            }
        });

        return {
            showPassword,
            validated,
            updateValue,
            onBlur,
            onFocus
        };
    }
});
</script>

<style>
._fc-api-key-input {
    width: 100%;
}

._fc-api-key-input .input-icon {
    color: #909399;
}

._fc-api-key-input .toggle-icon {
    cursor: pointer;
    color: #909399;
}

._fc-api-key-input .toggle-icon:hover {
    color: #409EFF;
}

._fc-api-key-input .validation-result {
    margin-top: 8px;
}

._fc-api-key-input .validation-tips {
    margin-top: 8px;
}
</style>
