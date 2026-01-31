<template>
    <div class="fc-global-class-config">
        <div class="config-header" v-if="title">
            <div class="config-title">{{ title }}</div>
            <div class="config-actions">
                <el-button size="small" type="primary" @click="addClass" v-if="!disabled">
                    <el-icon><Plus /></el-icon>
                    {{ t('com.globalClassConfig.add') }}
                </el-button>
            </div>
        </div>
        
        <div class="config-content">
            <div v-for="(cls, idx) in classes" :key="idx" class="class-item">
                <div class="class-header">
                    <el-input
                        v-model="cls.name"
                        :disabled="disabled"
                        size="small"
                        :placeholder="t('com.globalClassConfig.namePlaceholder')"
                        style="width: 150px"
                        @change="onChange"
                    />
                    <el-button
                        size="small"
                        type="danger"
                        text
                        :disabled="disabled"
                        @click="removeClass(idx)"
                    >
                        <el-icon><Delete /></el-icon>
                    </el-button>
                </div>
                <div class="class-body">
                    <el-input
                        v-model="cls.content"
                        type="textarea"
                        :rows="3"
                        :disabled="disabled"
                        :placeholder="t('com.globalClassConfig.contentPlaceholder')"
                        @change="onChange"
                    />
                </div>
                <div class="class-preview" v-if="cls.content && showPreview">
                    <div class="preview-label">{{ t('com.globalClassConfig.preview') }}:</div>
                    <div :class="cls.name" class="preview-box">
                        {{ t('com.globalClassConfig.previewText') }}
                    </div>
                </div>
            </div>
            
            <el-empty v-if="!classes.length" :description="t('com.globalClassConfig.empty')" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'GlobalClassConfig',
    components: { Plus, Delete },
    inject: ['designer'],
    emits: ['update:modelValue', 'change'],
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showPreview: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit, expose }) {
        const classes = ref([...props.modelValue]);
        
        const addClass = () => {
            classes.value.push({ name: '', content: '' });
            onChange();
        };
        
        const removeClass = (idx) => {
            classes.value.splice(idx, 1);
            onChange();
        };
        
        const onChange = () => {
            emit('update:modelValue', classes.value);
            emit('change', classes.value);
        };
        
        const getClasses = () => {
            return classes.value.filter(c => c.name && c.content).map(c => ({
                name: c.name,
                content: c.content
            }));
        };
        
        expose({ getClasses, addClass, removeClass });
        
        watch(() => props.modelValue, (val) => {
            if (JSON.stringify(classes.value) !== JSON.stringify(val)) {
                classes.value = [...val];
            }
        }, { deep: true });
        
        return { t, classes, addClass, removeClass, onChange };
    }
});
</script>

<style>
.fc-global-class-config {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.config-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.config-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.config-content {
    padding: 16px;
    max-height: 400px;
    overflow-y: auto;
}

.class-item {
    background: #fafafa;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    margin-bottom: 12px;
    padding: 12px;
}

.class-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.class-body {
    margin-bottom: 8px;
}

.class-preview {
    padding-top: 8px;
    border-top: 1px dashed #e4e7ed;
}

.preview-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 8px;
}

.preview-box {
    padding: 12px;
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    font-size: 14px;
}
</style>
