<template>
    <div class="fc-ai-panel" ref="containerRef">
        <div class="ai-panel-header" v-if="showHeader">
            <div class="ai-title">
                <el-icon><ChatDotRound /></el-icon>
                <span>{{ title || t('ai.name') }}</span>
            </div>
            <div class="ai-actions">
                <el-button size="small" text @click="clearHistory">
                    <el-icon><Delete /></el-icon>
                </el-button>
                <el-button size="small" text @click="toggleExpanded">
                    <el-icon><FullScreen v-if="!isExpanded" /><Close v-else /></el-icon>
                </el-button>
            </div>
        </div>
        
        <div class="ai-messages" ref="messagesRef" @scroll="onScroll">
            <div v-if="messages.length === 0" class="ai-welcome">
                <el-empty :description="t('ai.welcome')">
                    <template #image>
                        <el-icon size="64" color="#909399"><ChatDotRound /></el-icon>
                    </template>
                    <p class="ai-info">{{ t('ai.info') }}</p>
                    <div class="quick-prompts">
                        <el-button
                            v-for="(prompt, idx) in quickPrompts"
                            :key="idx"
                            size="small"
                            type="primary"
                            plain
                            @click="sendQuickPrompt(prompt)"
                        >
                            {{ prompt }}
                        </el-button>
                    </div>
                </el-empty>
            </div>
            
            <template v-else>
                <div
                    v-for="(msg, idx) in messages"
                    :key="idx"
                    class="ai-message"
                    :class="{ 'ai-message-user': msg.role === 'user', 'ai-message-assistant': msg.role === 'assistant' }"
                >
                    <div class="message-avatar">
                        <el-avatar :size="32" :icon="msg.role === 'user' ? 'User' : 'ChatDotRound'" />
                    </div>
                    <div class="message-content">
                        <div class="message-text" v-html="formatMessage(msg.content)"></div>
                        <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
                    </div>
                </div>
            </template>
            
            <div v-if="loading" class="ai-loading">
                <el-icon class="is-loading"><Loading /></el-icon>
                <span>{{ t('ai.thinking') }}</span>
            </div>
        </div>
        
        <div class="ai-input-area">
            <el-input
                v-model="inputMessage"
                type="textarea"
                :rows="2"
                :placeholder="t('ai.placeholder')"
                :disabled="disabled || loading"
                @keydown.enter.exact="sendMessage"
                resize="none"
            />
            <div class="ai-input-actions">
                <span class="char-count" :class="{ 'char-count-warning': inputMessage.length > maxLength }">
                    {{ inputMessage.length }}/{{ maxLength }}
                </span>
                <el-button type="primary" :disabled="!canSend" @click="sendMessage">
                    <el-icon><Promotion /></el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick, onMounted } from 'vue';
import { ChatDotRound, Delete, FullScreen, Close, Loading, Promotion, User } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'FcAiPanel',
    components: {
        ChatDotRound,
        Delete,
        FullScreen,
        Close,
        Loading,
        Promotion,
        User
    },
    inject: ['designer'],
    emits: ['update:messages', 'send', 'clear', 'generate-form'],
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
        showHeader: {
            type: Boolean,
            default: true
        },
        apiKey: {
            type: String,
            default: ''
        },
        apiUrl: {
            type: String,
            default: ''
        },
        model: {
            type: String,
            default: 'gpt-3.5-turbo'
        },
        maxLength: {
            type: Number,
            default: 2000
        },
        maxMessages: {
            type: Number,
            default: 50
        },
        quickPrompts: {
            type: Array,
            default: () => [
                '生成一个用户注册表单',
                '创建一个订单表单',
                '设计一个联系信息表单',
                '制作一个调查问卷'
            ]
        },
        autoExpand: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const messagesRef = ref(null);
        const inputMessage = ref('');
        const loading = ref(false);
        const isExpanded = ref(false);
        const messages = ref([...props.modelValue]);
        
        const canSend = computed(() => {
            return inputMessage.value.trim().length > 0 &&
                   inputMessage.value.length <= props.maxLength &&
                   !props.disabled &&
                   !loading.value;
        });
        
        const formatTime = (timestamp) => {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        };
        
        const formatMessage = (content) => {
            if (!content) return '';
            return content
                .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>');
        };
        
        const scrollToBottom = () => {
            nextTick(() => {
                if (messagesRef.value) {
                    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
                }
            });
        };
        
        const addMessage = (role, content) => {
            const newMessage = {
                role,
                content,
                timestamp: Date.now()
            };
            messages.value.push(newMessage);
            
            if (messages.value.length > props.maxMessages) {
                messages.value = messages.value.slice(-props.maxMessages);
            }
            
            emit('update:messages', messages.value);
            scrollToBottom();
            return newMessage;
        };
        
        const sendQuickPrompt = (prompt) => {
            inputMessage.value = prompt;
            sendMessage();
        };
        
        const sendMessage = async () => {
            if (!canSend.value) return;
            
            const userMessage = inputMessage.value.trim();
            inputMessage.value = '';
            
            addMessage('user', userMessage);
            emit('send', { message: userMessage, messages: messages.value });
            
            if (props.apiKey) {
                await callAI(userMessage);
            } else {
                const response = generateMockResponse(userMessage);
                addMessage('assistant', response);
            }
        };
        
        const callAI = async (userMessage) => {
            loading.value = true;
            
            try {
                const response = await fetch(props.apiUrl || 'https://api.openai.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${props.apiKey}`
                    },
                    body: JSON.stringify({
                        model: props.model,
                        messages: messages.value.map(m => ({
                            role: m.role,
                            content: m.content
                        })),
                        max_tokens: 2000,
                        temperature: 0.7
                    })
                });
                
                const result = await response.json();
                if (result.choices?.[0]?.message?.content) {
                    const content = result.choices[0].message.content;
                    addMessage('assistant', content);
                    
                    if (content.includes('formCreate') || content.includes('form:create')) {
                        emit('generate-form', { content, message: userMessage });
                    }
                }
            } catch (e) {
                console.error('[FcAiPanel] API error:', e);
                addMessage('assistant', t('ai.error'));
            } finally {
                loading.value = false;
            }
        };
        
        const generateMockResponse = (userMessage) => {
            const lowerMsg = userMessage.toLowerCase();
            
            if (lowerMsg.includes('注册') || lowerMsg.includes('register')) {
                return `好的，我来为您生成一个用户注册表单：

\`\`\`json
[
  {"type": "input", "field": "username", "title": "用户名", "props": {"placeholder": "请输入用户名", "clearable": true}},
  {"type": "password", "field": "password", "title": "密码", "props": {"placeholder": "请输入密码"}},
  {"type": "input", "field": "email", "title": "邮箱", "props": {"placeholder": "请输入邮箱", "type": "email"}},
  {"type": "input", "field": "phone", "title": "手机号", "props": {"placeholder": "请输入手机号"}},
  {"type": "checkbox", "field": "agreement", "title": "我已阅读并同意", "options": [{"label": "用户协议", "value": "agree"}]}
]
\`\`\`

这是一个基础的注册表单，包含用户名、密码、邮箱、手机号和协议确认。您可以根据需要进行调整。`;
            }
            
            if (lowerMsg.includes('订单') || lowerMsg.includes('order')) {
                return `为您生成一个订单表单：

\`\`\`json
[
  {"type": "input", "field": "orderNo", "title": "订单号", "props": {"disabled": true}},
  {"type": "input", "field": "customerName", "title": "客户姓名"},
  {"type": "input", "field": "customerPhone", "title": "联系电话"},
  {"type": "select", "field": "product", "title": "产品", "options": [{"label": "产品A", "value": "A"}, {"label": "产品B", "value": "B"}]},
  {"type": "inputNumber", "field": "quantity", "title": "数量", "props": {"min": 1, "max": 100}},
  {"type": "date", "field": "orderDate", "title": "订单日期"},
  {"type": "textarea", "field": "remark", "title": "备注"}
]
\`\`\``;
            }
            
            return `收到！我理解您想要创建表单。您可以：

1. **描述表单需求** - 告诉我您想要什么类型的表单
2. **指定字段** - 列出需要包含的字段
3. **说明样式** - 描述表单的样式要求

例如："创建一个包含姓名、手机号、地址的收货信息表单"`

};
        
        const clearHistory = () => {
            messages.value = [];
            emit('update:messages', []);
            emit('clear');
        };
        
        const toggleExpanded = () => {
            isExpanded.value = !isExpanded.value;
        };
        
        const onScroll = (e) => {
        };
        
        const reset = () => {
            messages.value = [];
            inputMessage.value = '';
        };
        
        expose({
            sendMessage,
            clearHistory,
            reset,
            scrollToBottom,
            messages
        });
        
        watch(() => props.modelValue, (val) => {
            if (Array.isArray(val)) {
                messages.value = [...val];
            }
        }, { deep: true });
        
        return {
            t,
            containerRef,
            messagesRef,
            inputMessage,
            loading,
            isExpanded,
            messages,
            canSend,
            formatTime,
            formatMessage,
            sendQuickPrompt,
            sendMessage,
            clearHistory,
            toggleExpanded,
            onScroll
        };
    }
});
</script>

<style>
.fc-ai-panel {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
}

.fc-ai-panel.is-expanded {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    border-radius: 0;
}

.ai-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
}

.ai-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    font-size: 14px;
}

.ai-actions {
    display: flex;
    gap: 4px;
}

.ai-actions .el-button {
    color: #fff;
}

.ai-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background: #f5f7fa;
}

.ai-welcome {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.ai-info {
    color: #909399;
    font-size: 13px;
    margin-top: 8px;
    max-width: 300px;
}

.quick-prompts {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 16px;
}

.ai-message {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

.ai-message-user {
    flex-direction: row-reverse;
}

.ai-message-user .message-content {
    align-items: flex-end;
}

.ai-message-user .message-text {
    background: #409EFF;
    color: #fff;
}

.ai-message-assistant .message-text {
    background: #fff;
}

.message-avatar {
    flex-shrink: 0;
}

.message-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 80%;
}

.message-text {
    padding: 10px 14px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.6;
    word-break: break-word;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-text :deep(pre) {
    background: #1e1e1e;
    color: #d4d4d4;
    padding: 12px;
    border-radius: 6px;
    overflow-x: auto;
    margin: 8px 0;
}

.message-text :deep(code) {
    background: rgba(0, 0, 0, 0.06);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Monaco', monospace;
    font-size: 0.9em;
}

.message-text :deep(pre code) {
    background: none;
    padding: 0;
}

.message-time {
    font-size: 11px;
    color: #c0c4cc;
}

.ai-loading {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    color: #909399;
    font-size: 13px;
}

.ai-input-area {
    padding: 12px 16px;
    background: #fff;
    border-top: 1px solid #ebeef5;
}

.ai-input-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
}

.char-count {
    font-size: 12px;
    color: #909399;
}

.char-count-warning {
    color: #f56c6c;
}

.ai-input-area .el-button {
    padding: 8px 16px;
}
</style>
