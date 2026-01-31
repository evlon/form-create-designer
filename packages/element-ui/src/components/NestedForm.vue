<template>
    <div class="fc-nested-form" :disabled="disabled">
        <div class="nested-form-header" v-if="title">
            <span class="nested-form-title">{{ title }}</span>
            <span class="nested-form-required" v-if="required">*</span>
        </div>
        
        <div class="nested-form-content">
            <draggable
                :model-value="children"
                @update:modelValue="updateChildren"
                :group="{ name: 'form', pull: false, put: false }"
                :disabled="disabled || draggableDisabled"
                item-key="__unique_id"
                class="nested-form-draggable"
                ghost-class="nested-form-ghost"
                handle=".nested-form-item-drag"
            >
                <template #item="{ element, index }">
                    <div class="nested-form-item" :class="{ 'is-disabled': disabled }">
                        <div class="nested-form-item-header">
                            <el-icon class="nested-form-item-drag" v-if="!disabled && sortable">
                                <Rank />
                            </el-icon>
                            <span class="nested-form-item-title">{{ getItemTitle(element) }}</span>
                            <div class="nested-form-item-actions">
                                <el-button 
                                    v-if="expandable && !element.__expanded__" 
                                    text 
                                    size="small"
                                    @click="toggleExpand(index)"
                                >
                                    <el-icon><Plus /></el-icon>
                                </el-button>
                                <el-button 
                                    v-if="expandable && element.__expanded__" 
                                    text 
                                    size="small"
                                    @click="toggleExpand(index)"
                                >
                                    <el-icon><Minus /></el-icon>
                                </el-button>
                                <el-button 
                                    v-if="!disabled && showDelete" 
                                    text 
                                    type="danger" 
                                    size="small"
                                    @click="removeItem(index)"
                                >
                                    <el-icon><Delete /></el-icon>
                                </el-button>
                            </div>
                        </div>
                        <div class="nested-form-item-content" v-show="!expandable || element.__expanded__">
                            <fc-designer 
                                :rule="element.__children__ || []" 
                                :option="designerOption"
                                :disabled="disabled"
                                @update:rule="updateChildRule(index, $event)"
                                ref="childDesigners"
                            />
                        </div>
                    </div>
                </template>
            </draggable>
            
            <div class="nested-form-add" v-if="!disabled && showAdd">
                <el-button type="primary" plain size="small" @click="addItem">
                    <el-icon><Plus /></el-icon>
                    {{ addBtnText || t('com.group.add') }}
                </el-button>
            </div>
        </div>
        
        <div class="nested-form-footer" v-if="showPagination && total > pageSize">
            <el-pagination
                v-model:current-page="currentPage"
                :page-size="pageSize"
                :total="total"
                layout="prev, pager, next"
                @current-change="onPageChange"
            />
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, provide, nextTick } from 'vue';
import { Rank, Plus, Minus, Delete } from '@element-plus/icons-vue';
import draggable from 'vuedraggable/src/vuedraggable';
import { makeRequiredRule } from '../utils/index';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'NestedForm',
    components: {
        Rank,
        Plus,
        Minus,
        Delete,
        draggable
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:children', 'change', 'add', 'remove', 'expand', 'page-change'],
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        children: {
            type: Array,
            default: () => []
        },
        title: {
            type: String,
            default: ''
        },
        field: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 0
        },
        showAdd: {
            type: Boolean,
            default: true
        },
        showDelete: {
            type: Boolean,
            default: true
        },
        sortable: {
            type: Boolean,
            default: true
        },
        expandable: {
            type: Boolean,
            default: false
        },
        addBtnText: {
            type: String,
            default: ''
        },
        showPagination: {
            type: Boolean,
            default: false
        },
        pageSize: {
            type: Number,
            default: 10
        },
        defaultRule: {
            type: Array,
            default: () => []
        }
    },
    setup(props, { emit }) {
        const currentPage = ref(1);
        const childDesigners = ref([]);
        const uniqueId = ref(0);
        
        const draggableDisabled = computed(() => {
            return props.disabled || (props.max > 0 && props.children.length >= props.max);
        });
        
        const total = computed(() => props.children.length);
        
        const designerOption = computed(() => ({
            ...props.designer?.option,
            resetBtn: false,
            submitBtn: false,
            onMounted: null,
            onReload: null
        }));
        
        const updateChildren = (newChildren) => {
            emit('update:children', newChildren);
            emit('change', newChildren);
        };
        
        const getItemTitle = (item) => {
            return item.__title__ || props.title + ' ' + (props.children.indexOf(item) + 1);
        };
        
        const generateUniqueId = () => {
            return 'nested_' + Date.now() + '_' + (++uniqueId.value);
        };
        
        const addItem = () => {
            if (props.max > 0 && props.children.length >= props.max) {
                return;
            }
            
            const newItem = {
                __unique_id__: generateUniqueId(),
                __title__: `${props.title} ${props.children.length + 1}`,
                __children__: JSON.parse(JSON.stringify(props.defaultRule || [])),
                __expanded__: true
            };
            
            const newChildren = [...props.children, newItem];
            updateChildren(newChildren);
            emit('add', newItem, props.children.length);
            
            nextTick(() => {
                if (childDesigners.value && childDesigners.value[props.children.length - 1]) {
                    childDesigners.value[props.children.length.length - 1]?.refresh();
                }
            });
        };
        
        const removeItem = (index) => {
            if (props.min > 0 && props.children.length <= props.min) {
                return;
            }
            
            const removedItem = props.children[index];
            const newChildren = props.children.filter((_, i) => i !== index);
            updateChildren(newChildren);
            emit('remove', removedItem, index);
        };
        
        const toggleExpand = (index) => {
            const newChildren = [...props.children];
            newChildren[index] = {
                ...newChildren[index],
                __expanded__: !newChildren[index].__expanded__
            };
            updateChildren(newChildren);
            emit('expand', newChildren[index], index);
        };
        
        const updateChildRule = (index, rule) => {
            const newChildren = [...props.children];
            if (newChildren[index]) {
                newChildren[index] = {
                    ...newChildren[index],
                    __children__: rule
                };
                updateChildren(newChildren);
            }
        };
        
        const onPageChange = (page) => {
            currentPage.value = page;
            emit('page-change', page);
        };
        
        const validate = async () => {
            if (!props.required) return true;
            if (props.children.length < props.min) return false;
            
            for (const child of childDesigners.value) {
                if (child && typeof child.validate === 'function') {
                    const valid = await child.validate();
                    if (!valid) return false;
                }
            }
            return true;
        };
        
        const clearValidate = () => {
            childDesigners.value.forEach(child => {
                child?.clearValidate?.();
            });
        };
        
        const refresh = () => {
            childDesigners.value.forEach(child => {
                child?.refresh?.();
            });
        };
        
        provide('nestedForm', {
            validate,
            clearValidate,
            refresh,
            parentDisabled: computed(() => props.disabled)
        });
        
        return {
            t,
            currentPage,
            total,
            pageSize: props.pageSize,
            draggableDisabled,
            designerOption,
            childDesigners,
            updateChildren,
            getItemTitle,
            addItem,
            removeItem,
            toggleExpand,
            updateChildRule,
            onPageChange
        };
    }
});
</script>

<style>
.fc-nested-form {
    width: 100%;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    padding: 12px;
    background: #fafafa;
}

.fc-nested-form[disabled="true"] {
    opacity: 0.7;
}

.nested-form-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ebeef5;
}

.nested-form-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.nested-form-required {
    color: #f56c6c;
    margin-left: 4px;
}

.nested-form-content {
    min-height: 100px;
}

.nested-form-draggable {
    min-height: 50px;
}

.nested-form-item {
    background: #fff;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    margin-bottom: 8px;
    transition: all 0.2s;
}

.nested-form-item:hover {
    border-color: #409EFF;
}

.nested-form-item.is-disabled {
    opacity: 0.8;
}

.nested-form-item-header {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
    cursor: move;
}

.nested-form-item-drag {
    color: #909399;
    margin-right: 8px;
    cursor: grab;
}

.nested-form-item-drag:active {
    cursor: grabbing;
}

.nested-form-item-title {
    flex: 1;
    font-size: 13px;
    color: #606266;
}

.nested-form-item-actions {
    display: flex;
    gap: 4px;
}

.nested-form-item-content {
    padding: 12px;
}

.nested-form-ghost {
    opacity: 0.5;
    background: #c6e2ff;
    border: 1px dashed #409EFF;
}

.nested-form-add {
    display: flex;
    justify-content: center;
    padding: 12px;
    margin-top: 8px;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s;
}

.nested-form-add:hover {
    border-color: #409EFF;
    background: #ecf5ff;
}

.nested-form-footer {
    display: flex;
    justify-content: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #ebeef5;
}
</style>
