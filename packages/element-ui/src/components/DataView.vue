<template>
    <div class="fc-data-view" ref="containerRef">
        <div class="data-view-header" v-if="showHeader && title">
            <div class="data-view-title">{{ title }}</div>
            <div class="data-view-actions" v-if="!disabled && refreshable">
                <el-button size="small" text @click="refreshData">
                    <el-icon><Refresh /></el-icon>
                </el-button>
            </div>
        </div>
        
        <div class="data-view-content" :class="viewMode">
            <template v-if="loading">
                <div class="data-view-loading">
                    <el-icon class="is-loading"><Loading /></el-icon>
                    <span>{{ t('com.dataView.loading') }}</span>
                </div>
            </template>
            
            <template v-else-if="error">
                <div class="data-view-error">
                    <el-alert :title="error" type="error" show-icon />
                </div>
            </template>
            
            <template v-else>
                <div v-if="viewMode === 'card'" class="data-cards">
                    <el-row :gutter="cardGutter">
                        <el-col v-for="(item, idx) in displayData" :key="getItemKey(item, idx)" :span="cardSpan">
                            <div class="data-card" @click="handleCardClick(item, idx)">
                                <div class="card-header" v-if="cardTitleField && item[cardTitleField]">
                                    <span class="card-title">{{ item[cardTitleField] }}</span>
                                </div>
                                <div class="card-body">
                                    <div v-for="field in cardFields" :key="field.key" class="card-field">
                                        <span class="field-label">{{ field.label }}:</span>
                                        <span class="field-value">{{ formatValue(item[field.key], field.format) }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                
                <div v-else-if="viewMode === 'list'" class="data-list">
                    <div v-for="(item, idx) in displayData" :key="getItemKey(item, idx)" class="data-list-item" @click="handleItemClick(item, idx)">
                        <div class="list-content">
                            <div class="list-title">{{ item[listTitleField] || item.title || item.name || 'Item ' + (idx + 1) }}</div>
                            <div class="list-description" v-if="listDescField && item[listDescField]">{{ item[listDescField] }}</div>
                        </div>
                    </div>
                </div>
                
                <div v-else-if="viewMode === 'stats'" class="data-stats">
                    <el-row :gutter="16">
                        <el-col v-for="stat in statsConfig" :key="stat.key" :span="Math.floor(24 / (statsConfig.length || 1))">
                            <div class="stat-card">
                                <div class="stat-value">{{ getStatValue(stat) }}</div>
                                <div class="stat-label">{{ stat.label }}</div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </template>
        </div>
        
        <div class="data-view-footer" v-if="showPagination && total > pageSize">
            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :total="total" layout="prev, pager, next" @current-change="onPageChange" />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Refresh, Loading } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'DataView',
    components: { Refresh, Loading },
    inject: ['designer'],
    emits: ['update:data', 'refresh', 'click', 'change', 'error'],
    props: {
        data: { type: Array, default: () => [] },
        title: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        showHeader: { type: Boolean, default: true },
        showPagination: { type: Boolean, default: false },
        refreshable: { type: Boolean, default: true },
        viewMode: { type: String, default: 'list', validator: (v) => ['list', 'card', 'stats'].includes(v) },
        pageSize: { type: Number, default: 10 },
        remoteData: { type: Boolean, default: false },
        remoteUrl: { type: String, default: '' },
        itemKey: { type: String, default: 'id' },
        cardConfig: { type: Object, default: () => ({}) },
        listConfig: { type: Object, default: () => ({}) },
        statsConfig: { type: Array, default: () => [] }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const currentPage = ref(1);
        const loading = ref(false);
        const error = ref('');
        const viewData = ref([...props.data]);
        
        const total = computed(() => viewData.value.length);
        const displayData = computed(() => {
            if (!props.showPagination) return viewData.value;
            const start = (currentPage.value - 1) * props.pageSize;
            return viewData.value.slice(start, start + props.pageSize);
        });
        
        const cardGutter = computed(() => props.cardConfig.gutter || 16);
        const cardSpan = computed(() => props.cardConfig.span || 8);
        const cardTitleField = computed(() => props.cardConfig.titleField || 'title');
        const cardFields = computed(() => props.cardConfig.fields || []);
        
        const listTitleField = computed(() => props.listConfig.titleField || 'title');
        const listDescField = computed(() => props.listConfig.descField || 'description');
        
        const getItemKey = (item, idx) => item[props.itemKey] || item.id || idx;
        
        const formatValue = (value, format) => {
            if (value === null || value === undefined) return '-';
            if (!format) return value;
            if (format === 'currency') return '¥' + Number(value).toFixed(2);
            if (format === 'percent') return (Number(value) * 100).toFixed(1) + '%';
            if (format === 'date') return new Date(value).toLocaleDateString();
            return value;
        };
        
        const getStatValue = (stat) => {
            if (stat.type === 'sum') return viewData.value.reduce((sum, item) => sum + (Number(item[stat.key]) || 0), 0);
            if (stat.type === 'avg') return (viewData.value.reduce((sum, item) => sum + (Number(item[stat.key]) || 0), 0) / viewData.value.length).toFixed(2);
            if (stat.type === 'count') return viewData.value.length;
            if (stat.type === 'max') return Math.max(...viewData.value.map(item => Number(item[stat.key]) || 0));
            if (stat.type === 'min') return Math.min(...viewData.value.map(item => Number(item[stat.key]) || 0));
            return stat.value || 0;
        };
        
        const refreshData = async () => {
            if (props.remoteData && props.remoteUrl) {
                loading.value = true;
                error.value = '';
                try {
                    const response = await fetch(props.remoteUrl);
                    const result = await response.json();
                    viewData.value = Array.isArray(result) ? result : (result.data || result.list || []);
                    emit('refresh', viewData.value);
                } catch (e) {
                    error.value = t('com.dataView.loadError');
                    emit('error', { error: error.value });
                } finally {
                    loading.value = false;
                }
            } else {
                emit('refresh', viewData.value);
            }
        };
        
        const handleCardClick = (item, idx) => emit('click', { item, idx, viewMode: 'card' });
        const handleItemClick = (item, idx) => emit('click', { item, idx, viewMode: props.viewMode });
        const onPageChange = (page) => { currentPage.value = page; emit('change', { page }); };
        
        expose({ refresh: refreshData, reset: () => { viewData.value = [...props.data]; currentPage.value = 1; } });
        
        watch(() => props.data, (newData) => { viewData.value = Array.isArray(newData) ? [...newData] : []; }, { deep: true });
        
        return {
            t, containerRef, currentPage, loading, error, displayData, total,
            cardGutter, cardSpan, cardTitleField, cardFields,
            listTitleField, listDescField,
            getItemKey, formatValue, getStatValue,
            refreshData, handleCardClick, handleItemClick, onPageChange
        };
    }
});
</script>

<style>
.fc-data-view { width: 100%; border: 1px solid #e4e7ed; border-radius: 4px; overflow: hidden; }
.data-view-header { display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; background: #f5f7fa; border-bottom: 1px solid #e4e7ed; }
.data-view-title { font-weight: 500; color: #303133; font-size: 14px; }
.data-view-content { padding: 16px; min-height: 200px; }
.data-view-loading, .data-view-error { display: flex; justify-content: center; align-items: center; height: 200px; color: #909399; gap: 8px; }
.data-card { background: #fff; border: 1px solid #e4e7ed; border-radius: 8px; padding: 16px; transition: all 0.2s; cursor: pointer; height: 100%; }
.data-card:hover { border-color: #409EFF; box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); }
.card-header { margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #ebeef5; }
.card-title { font-weight: 600; color: #303133; font-size: 15px; }
.card-field { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; }
.field-label { color: #909399; }
.field-value { color: #606266; font-weight: 500; }
.data-list-item { display: flex; align-items: center; padding: 12px 16px; border-bottom: 1px solid #ebeef5; cursor: pointer; transition: background 0.2s; }
.data-list-item:hover { background: #f5f7fa; }
.data-list-item:last-child { border-bottom: none; }
.list-content { flex: 1; }
.list-title { font-weight: 500; color: #303133; }
.list-description { font-size: 12px; color: #909399; margin-top: 4px; }
.stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; padding: 20px; color: #fff; text-align: center; }
.stat-value { font-size: 28px; font-weight: 600; }
.stat-label { font-size: 13px; opacity: 0.9; margin-top: 4px; }
.data-view-footer { display: flex; justify-content: center; padding: 12px; border-top: 1px solid #ebeef5; }
</style>
