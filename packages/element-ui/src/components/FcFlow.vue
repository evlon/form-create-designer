<template>
    <div class="fc-flow" ref="containerRef">
        <div class="flow-header" v-if="showHeader">
            <div class="flow-title">{{ title }}</div>
            <div class="flow-actions" v-if="!disabled && editable">
                <el-button size="small" @click="editDiagram">
                    <el-icon><Edit /></el-icon>
                </el-button>
                <el-button size="small" @click="fitView">
                    <el-icon><FullScreen /></el-icon>
                </el-button>
            </div>
        </div>
        
        <div class="flow-content" ref="contentRef">
            <div v-if="loading" class="flow-loading">
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>{{ t('com.fcFlow.loading') }}</span>
            </div>
            
            <div v-else-if="error" class="flow-error">
                <el-alert :title="error" type="error" show-icon />
            </div>
            
            <div v-else class="flow-diagram" ref="diagramRef"></div>
        </div>
        
        <el-dialog
            v-model="editVisible"
            :title="t('com.fcFlow.editDiagram')"
            width="70%"
            append-to-body
            destroy-on-close
        >
            <el-input
                v-model="editContent"
                type="textarea"
                :rows="15"
                placeholder="Enter Mermaid diagram code"
                class="flow-editor"
            />
            <template #footer>
                <el-button @click="previewDiagram">{{ t('com.fcFlow.preview') }}</el-button>
                <el-button type="primary" @click="saveDiagram">{{ t('props.ok') }}</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';
import { Edit, FullScreen, Loading } from '@element-plus/icons-vue';
import { t } from '../utils/locale';
import mermaid from 'mermaid';

export default defineComponent({
    name: 'FcFlow',
    components: {
        Edit,
        FullScreen,
        Loading
    },
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'click', 'rendered'],
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        diagramType: {
            type: String,
            default: 'flowchart'
        },
        direction: {
            type: String,
            default: 'TB'
        },
        theme: {
            type: String,
            default: 'default'
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
        loading: {
            type: Boolean,
            default: false
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        height: {
            type: [String, Number],
            default: 400
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const contentRef = ref(null);
        const diagramRef = ref(null);
        const editVisible = ref(false);
        const editContent = ref('');
        const error = ref('');
        
        const initMermaid = () => {
            mermaid.initialize({
                startOnLoad: false,
                theme: props.theme,
                securityLevel: 'loose',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis'
                },
                sequenceDiagram: {
                    useMaxWidth: true
                }
            });
        };
        
        const generateDiagramCode = () => {
            if (props.modelValue) {
                return props.modelValue;
            }
            
            const types = {
                'flowchart': 'flowchart',
                'sequence': 'sequenceDiagram',
                'class': 'classDiagram',
                'state': 'stateDiagram',
                'er': 'erDiagram',
                'pie': 'pie',
                'gantt': 'gantt'
            };
            
            const type = types[props.diagramType] || 'flowchart';
            
            return `${type} ${props.direction}
    A[Start] --> B[Process]
    B --> C[End]`;
        };
        
        const renderDiagram = async () => {
            if (!props.modelValue) {
                if (diagramRef.value) {
                    diagramRef.value.innerHTML = '';
                }
                return;
            }
            
            error.value = '';
            
            try {
                const id = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                const { svg } = await mermaid.render(id, props.modelValue);
                
                if (diagramRef.value) {
                    diagramRef.value.innerHTML = svg;
                    setupClickHandlers();
                }
                
                emit('rendered', { svg });
            } catch (e) {
                error.value = e.message || t('com.fcFlow.renderError');
                console.error('[FcFlow] Render error:', e);
            }
        };
        
        const setupClickHandlers = () => {
            if (!diagramRef.value) return;
            
            const svg = diagramRef.value.querySelector('svg');
            if (!svg) return;
            
            svg.querySelectorAll(':scope > g').forEach(g => {
                const nodeName = g.querySelector('text')?.textContent?.trim();
                if (nodeName) {
                    g.style.cursor = 'pointer';
                    g.addEventListener('click', (e) => {
                        emit('click', { node: nodeName, element: g, originalEvent: e });
                    });
                }
            });
        };
        
        const editDiagram = () => {
            editContent.value = generateDiagramCode();
            editVisible.value = true;
        };
        
        const previewDiagram = async () => {
            emit('update:modelValue', editContent.value);
            await renderDiagram();
        };
        
        const saveDiagram = () => {
            emit('update:modelValue', editContent.value);
            emit('change', editContent.value);
            editVisible.value = false;
            renderDiagram();
        };
        
        const fitView = () => {
            if (!diagramRef.value) return;
            const svg = diagramRef.value.querySelector('svg');
            if (svg) {
                svg.style.maxWidth = '100%';
                svg.style.height = '100%';
            }
        };
        
        expose({
            refresh: renderDiagram,
            fitView,
            editDiagram: () => editVisible.value = true
        });
        
        watch(() => props.modelValue, renderDiagram);
        watch(() => props.theme, () => {
            initMermaid();
            renderDiagram();
        });
        
        onMounted(() => {
            initMermaid();
            renderDiagram();
        });
        
        return {
            t,
            containerRef,
            contentRef,
            diagramRef,
            editVisible,
            editContent,
            error,
            editDiagram,
            previewDiagram,
            saveDiagram,
            fitView
        };
    }
});
</script>

<style>
.fc-flow {
    width: 100%;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
}

.flow-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.flow-title {
    font-weight: 500;
    color: #303133;
    font-size: 14px;
}

.flow-actions {
    display: flex;
    gap: 8px;
}

.flow-content {
    padding: 16px;
    min-height: 200px;
    overflow: auto;
}

.flow-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    color: #909399;
    height: 200px;
}

.flow-error {
    padding: 16px;
}

.flow-diagram {
    width: 100%;
    overflow-x: auto;
}

.flow-diagram :deep(svg) {
    max-width: 100%;
    height: auto;
}

.flow-editor {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.flow-diagram :deep(.node:hover) {
    opacity: 0.8;
}

.flow-diagram :deep(.node rect),
.flow-diagram :deep(.node circle),
.flow-diagram :deep(.node polygon) {
    fill: #f0f9eb;
    stroke: #67c23a;
    stroke-width: 1;
}

.flow-diagram :deep(.node:hover rect),
.flow-diagram :deep(.node:hover circle),
.flow-diagram :deep(.node:hover polygon) {
    fill: #e1f3d8;
    stroke: #67c23a;
}

.flow-diagram :deep(.edgeLabel) {
    background: #fff;
    padding: 2px 4px;
    border-radius: 3px;
}
</style>
