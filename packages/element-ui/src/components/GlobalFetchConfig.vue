<template>
    <div class="fc-global-fetch-config">
        <div class="config-header" v-if="title">
            <div class="config-title">{{ title }}</div>
            <div class="config-actions">
                <el-button size="small" type="primary" @click="addFetch" v-if="!disabled">
                    <el-icon><Plus /></el-icon>
                    {{ t('com.globalFetchConfig.add') }}
                </el-button>
            </div>
        </div>
        
        <div class="config-content">
            <div v-for="(fetch, idx) in fetches" :key="idx" class="fetch-item">
                <div class="fetch-header">
                    <el-input
                        v-model="fetch.name"
                        :disabled="disabled"
                        size="small"
                        :placeholder="t('com.globalFetchConfig.namePlaceholder')"
                        style="width: 150px"
                        @change="onChange"
                    />
                    <div class="fetch-actions">
                        <el-button size="small" text type="primary" @click="testFetch(fetch, idx)" :loading="fetch.testing">
                            <el-icon><VideoPlay /></el-icon>
                            {{ t('com.globalFetchConfig.test') }}
                        </el-button>
                        <el-button size="small" text type="danger" :disabled="disabled" @click="removeFetch(idx)">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                    </div>
                </div>
                
                <el-form size="small" label-width="80px">
                    <el-form-item :label="t('com.globalFetchConfig.url')">
                        <el-input v-model="fetch.url" :disabled="disabled" :placeholder="t('com.globalFetchConfig.urlPlaceholder')" @change="onChange" />
                    </el-form-item>
                    <el-form-item :label="t('com.globalFetchConfig.method')">
                        <el-select v-model="fetch.method" :disabled="disabled" style="width: 120px" @change="onChange">
                            <el-option label="GET" value="GET" />
                            <el-option label="POST" value="POST" />
                            <el-option label="PUT" value="PUT" />
                            <el-option label="DELETE" value="DELETE" />
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="t('com.globalFetchConfig.headers')">
                        <el-input v-model="fetch.headers" type="textarea" :rows="2" :disabled="disabled" :placeholder="t('com.globalFetchConfig.headersPlaceholder')" @change="onChange" />
                    </el-form-item>
                </el-form>
                
                <div class="fetch-result" v-if="fetch.result">
                    <div class="result-label">{{ t('com.globalFetchConfig.result') }}:</div>
                    <el-input type="textarea" :rows="3" :model-value="JSON.stringify(fetch.result, null, 2)" readonly size="small" />
                </div>
            </div>
            
            <el-empty v-if="!fetches.length" :description="t('com.globalFetchConfig.empty')" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { Plus, Delete, VideoPlay } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'GlobalFetchConfig',
    components: { Plus, Delete, VideoPlay },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'test'],
    props: {
        modelValue: { type: Array, default: () => [] },
        title: { type: String, default: '' },
        disabled: { type: Boolean, default: false }
    },
    setup(props, { emit, expose }) {
        const fetches = ref([...props.modelValue]);
        
        const addFetch = () => {
            fetches.value.push({ name: '', url: '', method: 'GET', headers: '', result: null, testing: false });
            onChange();
        };
        
        const removeFetch = (idx) => {
            fetches.value.splice(idx, 1);
            onChange();
        };
        
        const testFetch = async (fetch, idx) => {
            if (!fetch.url) return;
            fetches.value[idx].testing = true;
            try {
                const headers = fetch.headers ? JSON.parse(fetch.headers) : {};
                const response = await fetch(fetch.url, { method: fetch.method, headers });
                const result = await response.json();
                fetches.value[idx].result = result;
                emit('test', { fetch, result });
            } catch (e) {
                fetches.value[idx].result = { error: e.message };
            } finally {
                fetches.value[idx].testing = false;
            }
        };
        
        const onChange = () => {
            emit('update:modelValue', fetches.value);
            emit('change', fetches.value);
        };
        
        expose({ addFetch, removeFetch, testFetch });
        watch(() => props.modelValue, (val) => {
            if (JSON.stringify(fetches.value) !== JSON.stringify(val)) {
                fetches.value = [...val];
            }
        }, { deep: true });
        
        return { t, fetches, addFetch, removeFetch, testFetch, onChange };
    }
});
</script>

<style>
.fc-global-fetch-config {
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
    max-height: 500px;
    overflow-y: auto;
}

.fetch-item {
    background: #fafafa;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    margin-bottom: 12px;
    padding: 12px;
}

.fetch-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.fetch-actions {
    display: flex;
    gap: 8px;
}

.fetch-result {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed #e4e7ed;
}

.result-label {
    font-size: 12px;
    color: #909399;
    margin-bottom: 8px;
}
</style>
