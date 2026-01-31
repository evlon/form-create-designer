<template>
    <div class="fc-print-form" :style="containerStyle">
        <div class="print-header" v-if="showHeader">
            <div class="print-title">{{ title }}</div>
            <div class="print-subtitle" v-if="subtitle">{{ subtitle }}</div>
        </div>
        
        <div class="print-content" ref="printContentRef">
            <form-create 
                :rule="rule" 
                :option="formOption"
                :model-value="modelValue"
                @update:modelValue="updateValue"
                ref="fcForm"
            />
        </div>
        
        <div class="print-footer" v-if="showFooter">
            <div class="print-time" v-if="showPrintTime">
                {{ t('com.printForm.printTime') }}: {{ printTime }}
            </div>
            <div class="print-page" v-if="showPage">
                {{ t('com.printForm.page') }}: {{ currentPage }} / {{ totalPages }}
            </div>
        </div>
        
        <div class="print-actions" v-if="!disabled && showActions">
            <el-button type="primary" @click="handlePrint">
                <el-icon><Printer /></el-icon>
                {{ t('com.printForm.print') }}
            </el-button>
            <el-button @click="handlePreview">
                <el-icon><View /></el-icon>
                {{ t('com.printForm.preview') }}
            </el-button>
        </div>
        
        <el-dialog 
            v-model="previewVisible" 
            :title="t('com.printForm.preview')" 
            width="80%"
            append-to-body
            destroy-on-close
        >
            <div class="print-preview-content" :style="previewStyle">
                <form-create 
                    :rule="rule" 
                    :option="previewFormOption"
                    :model-value="modelValue"
                    @update:modelValue="updateValue"
                />
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue';
import { Printer, View } from '@element-plus/icons-vue';
import formCreate from '../utils/form';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'PrintForm',
    components: {
        Printer,
        View
    },
    emits: ['update:modelValue', 'change', 'print', 'preview'],
    props: {
        modelValue: {
            type: Object,
            default: () => ({})
        },
        rule: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        subtitle: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        showActions: {
            type: Boolean,
            default: true
        },
        showPrintTime: {
            type: Boolean,
            default: true
        },
        showPage: {
            type: Boolean,
            default: false
        },
        paperSize: {
            type: String,
            default: 'A4'
        },
        orientation: {
            type: String,
            default: 'portrait'
        },
        margin: {
            type: String,
            default: '20mm'
        },
        printUrl: {
            type: String,
            default: ''
        }
    },
    setup(props, { emit, expose }) {
        const printContentRef = ref(null);
        const fcForm = ref(null);
        const previewVisible = ref(false);
        const currentPage = ref(1);
        const totalPages = ref(1);
        const printTime = ref('');
        
        const containerStyle = computed(() => {
            const styles = {};
            if (props.paperSize) {
                if (props.orientation === 'portrait') {
                    styles.width = getPaperWidth(props.paperSize);
                } else {
                    styles.width = getPaperWidth(props.paperSize, 'landscape');
                }
            }
            return styles;
        });
        
        const previewStyle = computed(() => ({
            width: '100%',
            minHeight: '500px',
            padding: props.margin,
            border: '1px solid #dcdfe6'
        }));
        
        const formOption = computed(() => ({
            ...props.option,
            resetBtn: false,
            submitBtn: false,
            form: {
                ...props.option?.form,
                labelWidth: props.option?.form?.labelWidth || '120px'
            },
            mounted: (...args) => {
                props.option?.mounted?.(...args);
                calcTotalPages();
            },
            onChange: (field, value, rule) => {
                props.option?.onChange?.(field, value, rule);
                emit('change', { field, value });
            }
        }));
        
        const previewFormOption = computed(() => ({
            ...formOption.value,
            mounted: null
        }));
        
        const getPaperWidth = (size, orientation = 'portrait') => {
            const sizes = {
                'A3': '297mm',
                'A4': '210mm',
                'A5': '148mm',
                'Letter': '215.9mm',
                'Legal': '215.9mm'
            };
            return sizes[size] || sizes['A4'];
        };
        
        const updateValue = (value) => {
            emit('update:modelValue', value);
        };
        
        const getPrintTime = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };
        
        const calcTotalPages = () => {
            nextTick(() => {
                if (printContentRef.value) {
                    const height = printContentRef.value.offsetHeight;
                    const pageHeight = 1123;
                    totalPages.value = Math.ceil(height / pageHeight) || 1;
                }
            });
        };
        
        const handlePrint = () => {
            printTime.value = getPrintTime();
            
            if (props.printUrl) {
                fetch(props.printUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        rule: props.rule,
                        modelValue: props.modelValue,
                        title: props.title
                    })
                }).then(() => {
                    window.print();
                }).catch(() => {
                    window.print();
                });
            } else {
                window.print();
            }
            
            emit('print', { time: printTime.value, modelValue: props.modelValue });
        };
        
        const handlePreview = () => {
            previewVisible.value = true;
            emit('preview');
        };
        
        const validate = async () => {
            if (fcForm.value && typeof fcForm.value.validate === 'function') {
                return await fcForm.value.validate();
            }
            return true;
        };
        
        const clearValidate = () => {
            fcForm.value?.clearValidate?.();
        };
        
        const getFormData = () => {
            if (fcForm.value && typeof fcForm.value.getFormData === 'function') {
                return fcForm.value.getFormData();
            }
            return props.modelValue;
        };
        
        expose({
            validate,
            clearValidate,
            getFormData,
            refresh: () => {
                fcForm.value?.refresh?.();
                calcTotalPages();
            }
        });
        
        watch(() => props.rule, () => {
            nextTick(() => calcTotalPages());
        }, { deep: true });
        
        onMounted(() => {
            calcTotalPages();
        });
        
        return {
            t,
            printContentRef,
            fcForm,
            previewVisible,
            currentPage,
            totalPages,
            printTime,
            containerStyle,
            previewStyle,
            formOption,
            previewFormOption,
            updateValue,
            handlePrint,
            handlePreview
        };
    }
});
</script>

<style>
@media print {
    .fc-print-form .print-actions,
    .fc-print-form .el-dialog {
        display: none !important;
    }
    
    .fc-print-form {
        width: 100% !important;
        border: none !important;
        padding: 0 !important;
    }
    
    .print-content {
        page-break-inside: avoid;
    }
}

.fc-print-form {
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 20px;
    position: relative;
}

.print-header {
    text-align: center;
    margin-bottom: 20px;
    padding-bottom: 16px;
    border-bottom: 2px solid #409EFF;
}

.print-title {
    font-size: 20px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 8px;
}

.print-subtitle {
    font-size: 14px;
    color: #909399;
}

.print-content {
    min-height: 200px;
}

.print-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #ebeef5;
    font-size: 12px;
    color: #909399;
}

.print-actions {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid #ebeef5;
}

.print-preview-content {
    background: #fff;
}
</style>
