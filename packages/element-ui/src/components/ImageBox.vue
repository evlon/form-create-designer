<template>
    <div class="fc-image-box" :style="containerStyle">
        <div class="image-header" v-if="title && showHeader">
            <div class="image-title">{{ title }}</div>
        </div>
        
        <div class="image-content" :class="{ 'image-placeholder': !src }">
            <el-image
                v-if="src"
                :src="src"
                :fit="fit"
                :lazy="lazy"
                :alt="alt"
                :scroll-container="scrollContainer"
                :preview-src-list="previewSrcList"
                :initial-index="initialIndex"
                :close-on-press-escape="closeOnPressEscape"
                @load="onLoad"
                @error="onError"
                @click="handleClick"
                ref="imageRef"
            >
                <template #placeholder>
                    <div class="image-slot">
                        <el-icon><Loading /></el-icon>
                    </div>
                </template>
            </el-image>
            
            <div v-else class="image-empty">
                <el-empty :description="t('com.imageBox.noImage')">
                    <template v-if="!disabled && uploadable">
                        <el-button type="primary" @click="selectImage">
                            <el-icon><Upload /></el-icon>
                            {{ t('com.imageBox.selectImage') }}
                        </el-button>
                    </template>
                </el-empty>
            </div>
        </div>
        
        <div class="image-footer" v-if="showFooter && caption">
            <div class="image-caption">{{ caption }}</div>
        </div>
        
        <div class="image-actions" v-if="!disabled && (deletable || editable)">
            <el-button-group>
                <el-button v-if="editable" size="small" @click="selectImage">
                    <el-icon><Edit /></el-icon>
                </el-button>
                <el-button v-if="deletable" size="small" type="danger" @click="removeImage">
                    <el-icon><Delete /></el-icon>
                </el-button>
            </el-button-group>
        </div>
        
        <input
            type="file"
            ref="fileInputRef"
            accept="image/*"
            style="display: none"
            @change="onFileChange"
        />
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { Loading, Picture, Upload, Edit, Delete } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'ImageBox',
    components: {
        Loading,
        Picture,
        Upload,
        Edit,
        Delete
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'update:src', 'change', 'load', 'error', 'click', 'preview'],
    props: {
        modelValue: {
            type: [String, Object],
            default: ''
        },
        src: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        alt: {
            type: String,
            default: ''
        },
        caption: {
            type: String,
            default: ''
        },
        fit: {
            type: String,
            default: 'cover'
        },
        width: {
            type: [Number, String],
            default: '100%'
        },
        height: {
            type: [Number, String],
            default: 200
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lazy: {
            type: Boolean,
            default: false
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        deletable: {
            type: Boolean,
            default: true
        },
        uploadable: {
            type: Boolean,
            default: true
        },
        uploadUrl: {
            type: String,
            default: ''
        },
        maxSize: {
            type: Number,
            default: 5
        },
        acceptTypes: {
            type: Array,
            default: () => ['jpg', 'jpeg', 'png', 'gif', 'webp']
        },
        previewSrcList: {
            type: Array,
            default: () => []
        },
        initialIndex: {
            type: Number,
            default: 0
        },
        closeOnPressEscape: {
            type: Boolean,
            default: true
        }
    },
    setup(props, { emit, expose }) {
        const imageRef = ref(null);
        const fileInputRef = ref(null);
        
        const containerStyle = computed(() => {
            const style = {};
            if (typeof props.width === 'number') {
                style.width = props.width + 'px';
            } else {
                style.width = props.width;
            }
            if (typeof props.height === 'number') {
                style.height = props.height + 'px';
            } else {
                style.height = props.height;
            }
            return style;
        });
        
        const selectImage = () => {
            fileInputRef.value?.click();
        };
        
        const onFileChange = async (event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            
            if (!props.acceptTypes.some(type => file.name.toLowerCase().endsWith('.' + type))) {
                throw new Error('Invalid file type');
            }
            
            if (file.size > props.maxSize * 1024 * 1024) {
                throw new Error('File too large');
            }
            
            let url = '';
            if (props.uploadUrl) {
                const formData = new FormData();
                formData.append('file', file);
                const response = await fetch(props.uploadUrl, {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                url = result.url || result.data?.url || result.path;
            } else {
                url = URL.createObjectURL(file);
            }
            
            emit('update:modelValue', { url, file, name: file.name });
            emit('update:src', url);
            emit('change', { url, file, name: file.name });
        };
        
        const removeImage = () => {
            emit('update:modelValue', null);
            emit('update:src', '');
            emit('change', null);
        };
        
        const handleClick = () => {
            emit('click', { src: props.src });
            if (props.previewSrcList.length > 0 || props.src) {
                imageRef.value?.clickHandler?.();
                emit('preview', { src: props.src, index: props.initialIndex });
            }
        };
        
        const onLoad = () => {
            emit('load', { src: props.src });
        };
        
        const onError = (e) => {
            emit('error', { e, src: props.src });
        };
        
        const reset = () => {
            removeImage();
        };
        
        expose({ reset, selectImage, removeImage, imageRef });
        
        watch(() => props.src, (newSrc) => {
            if (!newSrc && imageRef.value) {
                imageRef.value.src = '';
            }
        });
        
        return {
            t,
            imageRef,
            fileInputRef,
            containerStyle,
            selectImage,
            onFileChange,
            removeImage,
            handleClick,
            onLoad,
            onError
        };
    }
});
</script>

<style>
.fc-image-box {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.image-header {
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.image-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.image-content {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f7fa;
    min-height: 100px;
}

.image-content .el-image {
    width: 100%;
    height: 100%;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
}

.image-error {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: #909399;
    font-size: 32px;
}

.image-empty {
    width: 100%;
    padding: 24px;
}

.image-footer {
    padding: 8px 16px;
    background: #fafafa;
    border-top: 1px solid #ebeef5;
}

.image-caption {
    font-size: 13px;
    color: #606266;
    text-align: center;
}

.image-actions {
    display: flex;
    justify-content: center;
    padding: 8px;
    border-top: 1px solid #ebeef5;
}
</style>
