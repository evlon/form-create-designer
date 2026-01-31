<template>
    <div class="_fc-step-form">
        <el-steps :active="activeStep" finish-status="success" simple>
            <el-step
                v-for="(step, index) in steps"
                :key="index"
                :title="step.title || ('步骤 ' + (index + 1))"
                @click="setActiveStep(index)"
            />
        </el-steps>
        
        <div class="step-content" v-if="currentStepData">
            <form-create
                :rule="currentStepData.rules || []"
                :option="formOptions"
                :value="formValue"
                @update:value="updateFormValue"
                ref="stepFormRef"
            />
        </div>
        
        <div class="step-actions">
            <el-button 
                v-if="activeStep > 0" 
                @click="prevStep"
                size="small"
            >
                上一步
            </el-button>
            <el-button 
                v-if="activeStep < steps.length - 1" 
                type="primary" 
                @click="nextStep"
                size="small"
            >
                下一步
            </el-button>
            <el-button 
                v-if="activeStep === steps.length - 1" 
                type="primary" 
                @click="submitForm"
                size="small"
            >
                提交
            </el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, provide, nextTick } from 'vue';
import formCreate from '@form-create/element-ui';

export default defineComponent({
    name: 'StepForm',
    components: { formCreate },
    inject: ['designer', 'formItem'],
    emits: ['update:modelValue', 'change', 'step-change', 'finish', 'mounted'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        steps: {
            type: Array,
            default: () => [
                { title: '步骤1', rules: [] },
                { title: '步骤2', rules: [] },
                { title: '步骤3', rules: [] }
            ]
        },
        activeStep: {
            type: Number,
            default: 0
        },
        showSteps: {
            type: Boolean,
            default: true
        },
        simple: {
            type: Boolean,
            default: false
        },
        finishBtnText: {
            type: String,
            default: '提交'
        },
        validateOnChange: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit, expose }) {
        const stepFormRef = ref(null);
        const currentActiveStep = ref(props.activeStep);
        const formValue = ref({ ...props.modelValue });

        const steps = computed(() => props.steps);
        const currentStepData = computed(() => steps.value[currentActiveStep.value]);
        
        const formOptions = computed(() => ({
            submitBtn: false,
            resetBtn: false,
            inline: false,
            labelWidth: '100px'
        }));

        const setActiveStep = (index) => {
            currentActiveStep.value = index;
            emit('update:modelValue', { ...formValue.value, _activeStep: index });
            emit('step-change', index);
        };

        const nextStep = async () => {
            if (currentActiveStep.value < steps.value.length - 1) {
                currentActiveStep.value++;
                emit('update:modelValue', { ...formValue.value, _activeStep: currentActiveStep.value });
                emit('step-change', currentActiveStep.value);
            }
        };

        const prevStep = () => {
            if (currentActiveStep.value > 0) {
                currentActiveStep.value--;
                emit('update:modelValue', { ...formValue.value, _activeStep: currentActiveStep.value });
                emit('step-change', currentActiveStep.value);
            }
        };

        const updateFormValue = (value) => {
            formValue.value = { ...value, _activeStep: currentActiveStep.value };
            emit('update:modelValue', formValue.value);
            emit('change', formValue.value);
        };

        const submitForm = () => {
            emit('finish', formValue.value);
        };

        const validateStep = async () => {
            if (stepFormRef.value?.$refs?.fc) {
                return await stepFormRef.value.$refs.fc.validate();
            }
            return true;
        };

        watch(() => props.modelValue, (val) => {
            if (val && val._activeStep !== undefined) {
                currentActiveStep.value = val._activeStep;
            }
            formValue.value = { ...val };
        }, { deep: true });

        watch(() => props.activeStep, (val) => {
            currentActiveStep.value = val;
        });

        expose({
            nextStep,
            prevStep,
            setActiveStep,
            validateStep,
            getFormRef: () => stepFormRef.value?.$refs?.fc,
            getCurrentValue: () => formValue.value
        });

        provide('stepForm', {
            steps,
            currentStep: currentActiveStep,
            isLastStep: computed(() => currentActiveStep.value >= steps.value.length - 1)
        });

        return {
            steps,
            currentStepData,
            activeStep: currentActiveStep,
            stepFormRef,
            formOptions,
            formValue,
            setActiveStep,
            nextStep,
            prevStep,
            updateFormValue,
            submitForm
        };
    }
});
</script>

<style>
._fc-step-form {
    width: 100%;
    padding: 10px;
}

._fc-step-form .el-steps {
    margin-bottom: 20px;
}

._fc-step-form .step-content {
    min-height: 200px;
    padding: 10px 0;
}

._fc-step-form .step-actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;
}

._fc-step-form .el-step:hover {
    cursor: pointer;
}

._fc-step-form .el-step__title:hover {
    color: #409EFF;
}
</style>
