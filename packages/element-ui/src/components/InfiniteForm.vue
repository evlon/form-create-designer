<template>
    <div class="fc-infinite-form" ref="containerRef">
        <div class="infinite-header" v-if="showHeader">
            <div class="infinite-title">{{ title }}</div>
            <div class="infinite-info" v-if="showInfo">
                {{ t('com.infiniteForm.total') }}: {{ totalCount }} | 
                {{ t('com.infiniteForm.loaded') }}: {{ loadedCount }}
            </div>
        </div>
        
        <div 
            class="infinite-content" 
            ref="contentRef"
            @scroll="onScroll"
        >
            <div class="virtual-list" :style="{ height: listHeight + 'px' }">
                <div 
                    class="virtual-items"
                    :style="{ transform: `translateY(${offsetY}px)` }"
                >
                    <div
                        v-for="item in visibleItems"
                        :key="getItemKey(item)"
                        class="infinite-item"
                        :class="{ 'is-selected': isSelected(item) }"
                        :style="{ height: itemHeight + 'px' }"
                        @click="selectItem(item)"
                    >
                        <slot name="item" :item="item" :index="item.__index__">
                            <div class="item-content">
                                <span class="item-index">{{ item.__index__ + 1 }}.</span>
                                <span class="item-title">{{ getItemTitle(item) }}</span>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
            
            <div class="infinite-loading" v-if="loading">
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>{{ t('com.infiniteForm.loading') }}</span>
            </div>
            
            <div class="infinite-finished" v-if="finished && showFinished">
                <span>{{ t('com.infiniteForm.finished') }}</span>
            </div>
        </div>
        
        <div class="infinite-footer" v-if="showFooter">
            <el-button size="small" @click="loadMore" :loading="loading" :disabled="finished">
                {{ t('com.infiniteForm.loadMore') }}
            </el-button>
        </div>
        
        <div class="infinite-actions" v-if="!disabled && showActions">
            <slot name="actions" :selected="selectedItems">
                <el-button size="small" type="primary" @click="confirmSelection" v-if="multiple">
                    {{ t('props.ok') }} ({{ selectedItems.length }})
                </el-button>
            </slot>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue';
import { Loading } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'InfiniteForm',
    components: {
        Loading
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:items', 'change', 'load', 'select', 'confirm', 'scroll'],
    props: {
        modelValue: {
            type: [Array, Object],
            default: () => []
        },
        items: {
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
        multiple: {
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
        showInfo: {
            type: Boolean,
            default: true
        },
        showFinished: {
            type: Boolean,
            default: true
        },
        itemHeight: {
            type: Number,
            default: 50
        },
        bufferSize: {
            type: Number,
            default: 5
        },
        pageSize: {
            type: Number,
            default: 50
        },
        loadMoreTrigger: {
            type: String,
            default: 'scroll'
        },
        remoteLoad: {
            type: Boolean,
            default: false
        },
        loadUrl: {
            type: String,
            default: ''
        },
        totalField: {
            type: String,
            default: 'total'
        },
        dataField: {
            type: String,
            default: 'data'
        },
        itemKey: {
            type: String,
            default: 'id'
        },
        itemTitle: {
            type: String,
            default: 'title'
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const contentRef = ref(null);
        const loadedItems = ref([...props.items]);
        const loadedCount = ref(props.items.length);
        const totalCount = ref(props.remoteLoad ? 0 : props.items.length);
        const loading = ref(false);
        const finished = ref(false);
        const offsetY = ref(0);
        const scrollTop = ref(0);
        const selectedItems = ref([]);
        const page = ref(1);
        
        const listHeight = computed(() => loadedItems.value.length * props.itemHeight);
        
        const visibleRange = computed(() => {
            if (!contentRef.value) return { start: 0, end: 0 };
            
            const containerHeight = contentRef.value.clientHeight;
            const start = Math.floor(scrollTop.value / props.itemHeight);
            const end = Math.min(
                Math.ceil((scrollTop.value + containerHeight) / props.itemHeight),
                loadedItems.value.length
            );
            
            return {
                start: Math.max(0, start - props.bufferSize),
                end: Math.min(loadedItems.value.length, end + props.bufferSize)
            };
        });
        
        const visibleItems = computed(() => {
            const items = [];
            for (let i = visibleRange.value.start; i < visibleRange.value.end; i++) {
                if (loadedItems.value[i]) {
                    items.push({
                        ...loadedItems.value[i],
                        __index__: i
                    });
                }
            }
            return items;
        });
        
        const getItemKey = (item) => {
            return item[props.itemKey] || item.__index__;
        };
        
        const getItemTitle = (item) => {
            return item[props.itemTitle] || JSON.stringify(item);
        };
        
        const isSelected = (item) => {
            const key = getItemKey(item);
            if (props.multiple) {
                return selectedItems.value.some(s => getItemKey(s) === key);
            }
            const selected = props.multiple ? selectedItems.value[0] : props.modelValue;
            return selected && getItemKey(selected) === key;
        };
        
        const onScroll = (e) => {
            scrollTop.value = e.target.scrollTop;
            offsetY.value = visibleRange.value.start * props.itemHeight;
            emit('scroll', { scrollTop: scrollTop.value, e });
            
            const { scrollHeight, clientHeight } = e.target;
            if (props.loadMoreTrigger === 'scroll' && !loading.value && !finished.value) {
                if (scrollHeight - scrollTop - clientHeight < 100) {
                    loadMore();
                }
            }
        };
        
        const loadMore = async () => {
            if (loading.value || finished.value) return;
            
            loading.value = true;
            page.value++;
            
            try {
                if (props.remoteLoad && props.loadUrl) {
                    const response = await fetch(`${props.loadUrl}?page=${page.value}&size=${props.pageSize}`);
                    const result = await response.json();
                    
                    const newItems = result[props.dataField] || result;
                    const total = result[props.totalField] || 0;
                    
                    loadedItems.value = [...loadedItems.value, ...newItems];
                    totalCount.value = total;
                    loadedCount.value = loadedItems.value.length;
                    
                    if (loadedItems.value.length >= total) {
                        finished.value = true;
                    }
                } else {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    loadedCount.value = Math.min(loadedCount.value + props.pageSize, totalCount.value);
                    finished.value = loadedCount.value >= totalCount.value;
                }
                
                emit('load', { page: page.value, items: loadedItems.value });
            } catch (e) {
                console.error('[InfiniteForm] Load error:', e);
                page.value--;
            } finally {
                loading.value = false;
            }
        };
        
        const selectItem = (item) => {
            if (props.disabled) return;
            
            const key = getItemKey(item);
            
            if (props.multiple) {
                const index = selectedItems.value.findIndex(s => getItemKey(s) === key);
                if (index > -1) {
                    selectedItems.value.splice(index, 1);
                } else {
                    selectedItems.value.push(item);
                }
            } else {
                selectedItems.value = [item];
            }
            
            const value = props.multiple ? selectedItems.value : selectedItems.value[0];
            emit('update:modelValue', value);
            emit('select', { item, selected: isSelected(item) });
            emit('change', value);
        };
        
        const confirmSelection = () => {
            emit('confirm', selectedItems.value);
        };
        
        const reset = () => {
            loadedItems.value = [];
            loadedCount.value = 0;
            totalCount.value = 0;
            selectedItems.value = [];
            page.value = 1;
            finished.value = false;
            scrollTop.value = 0;
            offsetY.value = 0;
        };
        
        const scrollTo = (index) => {
            if (contentRef.value) {
                contentRef.value.scrollTop = index * props.itemHeight;
            }
        };
        
        expose({
            loadMore,
            selectItem,
            confirmSelection,
            reset,
            scrollTo,
            refresh: () => {
                reset();
                loadMore();
            }
        });
        
        watch(() => props.items, (newItems) => {
            loadedItems.value = [...newItems];
            loadedCount.value = newItems.length;
        }, { deep: true });
        
        watch(() => props.modelValue, (value) => {
            if (props.multiple) {
                selectedItems.value = Array.isArray(value) ? [...value] : [];
            } else if (value) {
                selectedItems.value = [value];
            } else {
                selectedItems.value = [];
            }
        }, { immediate: true });
        
        onMounted(() => {
            if (props.remoteLoad) {
                loadMore();
            }
        });
        
        return {
            t,
            containerRef,
            contentRef,
            loadedItems,
            loadedCount,
            totalCount,
            loading,
            finished,
            listHeight,
            offsetY,
            visibleItems,
            itemHeight,
            getItemKey,
            getItemTitle,
            isSelected,
            onScroll,
            loadMore,
            selectItem,
            confirmSelection
        };
    }
});
</script>

<style>
.fc-infinite-form {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.infinite-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.infinite-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.infinite-info {
    font-size: 12px;
    color: #909399;
}

.infinite-content {
    height: 300px;
    overflow-y: auto;
    position: relative;
}

.virtual-list {
    position: relative;
    overflow: hidden;
}

.virtual-items {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.infinite-item {
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-bottom: 1px solid #ebeef5;
    cursor: pointer;
    transition: all 0.2s;
    box-sizing: border-box;
}

.infinite-item:hover {
    background: #f5f7fa;
}

.infinite-item.is-selected {
    background: #ecf5ff;
    border-left: 3px solid #409EFF;
}

.item-content {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}

.item-index {
    color: #909399;
    font-size: 12px;
    min-width: 24px;
}

.item-title {
    flex: 1;
    color: #606266;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.infinite-loading,
.infinite-finished {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 16px;
    color: #909399;
    font-size: 13px;
}

.infinite-footer {
    display: flex;
    justify-content: center;
    padding: 12px;
    border-top: 1px solid #ebeef5;
    background: #fafafa;
}

.infinite-actions {
    display: flex;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border-top: 1px solid #ebeef5;
    background: #fafafa;
}
</style>
