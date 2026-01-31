<template>
    <div class="fc-markdown" ref="containerRef">
        <div class="markdown-header" v-if="showHeader && title">
            <div class="markdown-title">{{ title }}</div>
            <div class="markdown-actions" v-if="!disabled && editable">
                <el-button size="small" @click="toggleEditMode">
                    <el-icon><Edit v-if="viewMode" /><View v-else /></el-icon>
                </el-button>
                <el-button size="small" @click="copyContent">
                    <el-icon><CopyDocument /></el-icon>
                </el-button>
            </div>
        </div>
        
        <div class="markdown-content" :class="{ 'markdown-edit-mode': editMode }">
            <div v-if="editMode" class="markdown-editor">
                <el-input
                    v-model="editContent"
                    type="textarea"
                    :rows="editorRows"
                    :placeholder="placeholder"
                    @input="onContentChange"
                />
                <div class="markdown-toolbar" v-if="showToolbar">
                    <el-button-group>
                        <el-button size="small" @click="insertSyntax('bold')" title="Bold">
                            <el-icon><Edit /></el-icon>B
                        </el-button>
                        <el-button size="small" @click="insertSyntax('italic')" title="Italic">
                            <el-icon><Edit /></el-icon>I
                        </el-button>
                        <el-button size="small" @click="insertSyntax('heading')" title="Heading">
                            H
                        </el-button>
                        <el-button size="small" @click="insertSyntax('link')" title="Link">
                            <el-icon><Link /></el-icon>
                        </el-button>
                        <el-button size="small" @click="insertSyntax('code')" title="Code">
                            <el-icon><Document /></el-icon>
                        </el-button>
                        <el-button size="small" @click="insertSyntax('list')" title="List">
                            <el-icon><List /></el-icon>
                        </el-button>
                        <el-button size="small" @click="insertSyntax('quote')" title="Quote">
                            <el-icon><ChatLineRound /></el-icon>
                        </el-button>
                    </el-button-group>
                </div>
            </div>
            
            <div v-else class="markdown-view" v-html="renderedHtml"></div>
        </div>
        
        <div class="markdown-footer" v-if="showFooter">
            <span class="word-count">{{ t('com.fcMarkdown.words') }}: {{ wordCount }}</span>
            <span class="read-time">{{ t('com.fcMarkdown.readTime') }}: {{ readTime }} {{ t('com.fcMarkdown.minutes') }}</span>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue';
import { Edit, View, CopyDocument, Link, List, ChatLineRound, Document } from '@element-plus/icons-vue';

export default defineComponent({
    name: 'FcMarkdown',
    components: {
        Edit,
        View,
        CopyDocument,
        Link,
        List,
        ChatLineRound,
        Document
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'rendered', 'copy'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: 'Enter markdown content...'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        editable: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        showFooter: {
            type: Boolean,
            default: true
        },
        showToolbar: {
            type: Boolean,
            default: true
        },
        editorRows: {
            type: Number,
            default: 10
        },
        lineNumbers: {
            type: Boolean,
            default: false
        },
        markdownOptions: {
            type: Object,
            default: () => ({
                breaks: true,
                gfm: true,
                highlight: false
            })
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const editMode = ref(false);
        const editContent = ref('');
        const renderedHtml = ref('');
        const copied = ref(false);
        
        const wordCount = computed(() => {
            const text = props.modelValue || '';
            return text.trim() ? text.trim().split(/\s+/).length : 0;
        });
        
        const readTime = computed(() => {
            const wordsPerMinute = 200;
            return Math.ceil(wordCount.value / wordsPerMinute) || 1;
        });
        
        const initMarked = () => {
            marked.setOptions({
                ...props.markdownOptions,
                gfm: true,
                breaks: true,
                highlight: (code, lang) => {
                    if (props.markdownOptions.highlight && lang) {
                        return `<pre><code class="language-${lang}">${code}</code></pre>`;
                    }
                    return code;
                }
            });
        };
        
        const renderMarkdown = () => {
            try {
                const content = props.modelValue || '';
                renderedHtml.value = marked.parse(content) || '';
                emit('rendered', { html: renderedHtml.value, markdown: content });
            } catch (e) {
                console.error('[FcMarkdown] Render error:', e);
                renderedHtml.value = `<div class="markdown-error">${e.message}</div>`;
            }
        };
        
        const onContentChange = (value) => {
            emit('update:modelValue', value);
            renderMarkdown();
            emit('change', value);
        };
        
        const toggleEditMode = () => {
            editMode.value = !editMode.value;
            if (editMode.value) {
                editContent.value = props.modelValue;
            }
        };
        
        const copyContent = async () => {
            try {
                await navigator.clipboard.writeText(props.modelValue);
                copied.value = true;
                setTimeout(() => { copied.value = false; }, 2000);
                emit('copy', { content: props.modelValue });
            } catch (e) {
                console.error('[FcMarkdown] Copy failed:', e);
            }
        };
        
        const insertSyntax = (type) => {
            const syntaxMap = {
                bold: { prefix: '**', suffix: '**', placeholder: 'bold text' },
                italic: { prefix: '*', suffix: '*', placeholder: 'italic text' },
                heading: { prefix: '### ', suffix: '', placeholder: 'Heading' },
                link: { prefix: '[', suffix: '](url)', placeholder: 'link text' },
                code: { prefix: '`', suffix: '`', placeholder: 'code' },
                list: { prefix: '- ', suffix: '', placeholder: 'list item' },
                quote: { prefix: '> ', suffix: '', placeholder: 'quote' }
            };
            
            const syntax = syntaxMap[type];
            if (!syntax) return;
            
            const textarea = containerRef.value?.querySelector('textarea');
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const selected = editContent.value.substring(start, end);
                const replacement = `${syntax.prefix}${selected || syntax.placeholder}${syntax.suffix}`;
                editContent.value = editContent.value.substring(0, start) + replacement + editContent.value.substring(end);
                
                nextTick(() => {
                    textarea.focus();
                    const newPos = start + syntax.prefix.length;
                    textarea.setSelectionRange(selected ? newPos + selected.length : newPos, newPos + (selected?.length || syntax.placeholder.length));
                    textarea.scrollTop = textarea.scrollHeight;
                });
                
                onContentChange(editContent.value);
            }
        };
        
        expose({
            toggleEditMode,
            copyContent,
            insertSyntax,
            refresh: renderMarkdown
        });
        
        watch(() => props.modelValue, renderMarkdown);
        watch(() => props.markdownOptions, initMarked, { deep: true });
        
        onMounted(() => {
            initMarked();
            renderMarkdown();
        });
        
        return {
            t,
            containerRef,
            editMode,
            editContent,
            renderedHtml,
            wordCount,
            readTime,
            onContentChange,
            toggleEditMode,
            copyContent,
            insertSyntax
        };
    }
});
</script>

<style>
.fc-markdown {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.markdown-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.markdown-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.markdown-actions {
    display: flex;
    gap: 8px;
}

.markdown-content {
    padding: 16px;
    min-height: 100px;
}

.markdown-edit-mode {
    padding: 12px;
}

.markdown-editor .el-textarea__inner {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 13px;
    line-height: 1.6;
}

.markdown-toolbar {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #ebeef5;
}

.markdown-view {
    line-height: 1.8;
    color: #606266;
}

.markdown-view h1,
.markdown-view h2,
.markdown-view h3,
.markdown-view h4,
.markdown-view h5,
.markdown-view h6 {
    margin: 16px 0 8px;
    font-weight: 600;
    color: #303133;
}

.markdown-view h1 { font-size: 2em; }
.markdown-view h2 { font-size: 1.5em; }
.markdown-view h3 { font-size: 1.25em; }

.markdown-view p {
    margin: 8px 0;
}

.markdown-view ul,
.markdown-view ol {
    padding-left: 24px;
    margin: 8px 0;
}

.markdown-view code {
    background: #f5f7fa;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Monaco', 'Menlo', monospace;
    font-size: 0.9em;
}

.markdown-view pre {
    background: #f5f7fa;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    margin: 16px 0;
}

.markdown-view pre code {
    background: none;
    padding: 0;
}

.markdown-view blockquote {
    border-left: 4px solid #409EFF;
    margin: 16px 0;
    padding: 8px 16px;
    background: #ecf5ff;
    color: #606266;
}

.markdown-view table {
    border-collapse: collapse;
    width: 100%;
    margin: 16px 0;
}

.markdown-view th,
.markdown-view td {
    border: 1px solid #dcdfe6;
    padding: 8px 12px;
    text-align: left;
}

.markdown-view th {
    background: #f5f7fa;
    font-weight: 600;
}

.markdown-view img {
    max-width: 100%;
    height: auto;
}

.markdown-view a {
    color: #409EFF;
    text-decoration: none;
}

.markdown-view a:hover {
    text-decoration: underline;
}

.markdown-footer {
    display: flex;
    justify-content: space-between;
    padding: 8px 16px;
    background: #fafafa;
    border-top: 1px solid #ebeef5;
    font-size: 12px;
    color: #909399;
}

.markdown-error {
    color: #f56c6c;
    padding: 16px;
    background: #fef0f0;
    border-radius: 4px;
}
</style>
