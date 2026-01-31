<template>
    <div class="fc-ai-chat" ref="containerRef">
        <div class="ai-chat-header" v-if="showHeader">
            <div class="ai-avatar">
                <el-avatar :size="36" :src="avatar" icon="ChatDotRound" />
            </div>
            <div class="ai-info">
                <div class="ai-name">{{ name || t('ai.name') }}</div>
                <div class="ai-status">
                    <span class="status-dot" :class="{ online: online }"></span>
                    {{ online ? t('ai.online') : t('ai.offline') }}
                </div>
            </div>
            <div class="ai-actions">
                <el-dropdown trigger="click" @command="onCommand">
                    <el-button size="small" text circle>
                        <el-icon><MoreFilled /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="clear">{{ t('ai.clearHistory') }}</el-dropdown-item>
                            <el-dropdown-item command="export">{{ t('ai.exportChat') }}</el-dropdown-item>
                            <el-dropdown-item command="settings">{{ t('ai.settings') }}</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        
        <div class="ai-chat-messages" ref="messagesRef">
            <template v-if="messages.length">
                <div v-for="(msg, idx) in messages" :key="idx" class="message-item" :class="'message-' + msg.role">
                    <div class="message-avatar">
                        <el-avatar :size="32" :icon="msg.role === 'user' ? 'User' : 'ChatDotRound'" />
                    </div>
                    <div class="message-bubble">
                        <div class="message-content" v-html="formatContent(msg.content)" />
                        <div class="message-time">{{ formatTime(msg.timestamp) }}</div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="ai-welcome">
                    <el-empty :description="t('ai.welcome')">
                        <template #image>
                            <el-icon size="64" color="#909399"><ChatDotRound /></el-icon>
                        </template>
                        <div class="quick-questions">
                            <el-button v-for="(q, i) in quickQuestions" :key="i" size="small" type="primary" plain @click="sendQuestion(q)">
                                {{ q }}
                            </el-button>
                        </div>
                    </el-empty>
                </div>
            </template>
            
            <div v-if="typing" class="message-item message-assistant">
                <div class="message-avatar">
                    <el-avatar :size="32" icon="ChatDotRound" />
                </div>
                <div class="message-bubble">
                    <div class="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="ai-chat-input">
            <el-input
                v-model="inputText"
                type="textarea"
                :rows="2"
                :placeholder="t('ai.placeholder')"
                :disabled="sending || disabled"
                @keydown.enter.exact.prevent="sendMessage"
                resize="none"
            />
            <div class="input-actions">
                <el-button size="small" :disabled="!inputText.trim() || sending" type="primary" @click="sendMessage">
                    <el-icon><Promotion /></el-icon>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch, nextTick, onMounted } from 'vue';
import { ChatDotRound, MoreFilled, Promotion, User } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'AiChat',
    components: { ChatDotRound, MoreFilled, Promotion, User },
    inject: ['designer'],
    emits: ['update:messages', 'send', 'clear', 'settings'],
    props: {
        modelValue: { type: Array, default: () => [] },
        name: { type: String, default: '' },
        avatar: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
        showHeader: { type: Boolean, default: true },
        online: { type: Boolean, default: true },
        quickQuestions: { type: Array, default: () => [] },
        typingDuration: { type: Number, default: 1500 }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const messagesRef = ref(null);
        const inputText = ref('');
        const messages = ref([...props.modelValue]);
        const sending = ref(false);
        const typing = ref(false);
        
        const formatTime = (ts) => {
            if (!ts) return '';
            const d = new Date(ts);
            return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        };
        
        const formatContent = (content) => {
            if (!content) return '';
            return content
                .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                .replace(/`([^`]+)`/g, '<code>$1</code>')
                .replace(/\n/g, '<br>')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        };
        
        const scrollToBottom = () => {
            nextTick(() => {
                if (messagesRef.value) {
                    messagesRef.value.scrollTop = messagesRef.value.scrollHeight;
                }
            });
        };
        
        const addMessage = (role, content) => {
            const msg = { role, content, timestamp: Date.now() };
            messages.value.push(msg);
            emit('update:messages', messages.value);
            scrollToBottom();
            return msg;
        };
        
        const sendQuestion = (question) => {
            inputText.value = question;
            sendMessage();
        };
        
        const sendMessage = async () => {
            const text = inputText.value.trim();
            if (!text || sending.value || props.disabled) return;
            
            inputText.value = '';
            addMessage('user', text);
            emit('send', { message: text, messages: messages.value });
            
            sending.value = true;
            typing.value = true;
            scrollToBottom();
            
            setTimeout(() => {
                const response = generateResponse(text);
                typing.value = false;
                addMessage('assistant', response);
                sending.value = false;
            }, props.typingDuration);
        };
        
        const generateResponse = (question) => {
            const q = question.toLowerCase();
            if (q.includes('你好') || q.includes('hi') || q.includes('hello')) {
                return '你好！我是 AI 助手，很高兴为您服务。请问有什么可以帮助您的？';
            }
            if (q.includes('帮助') || q.includes('help')) {
                return '我可以帮助您：\n1. 解答问题\n2. 生成表单\n3. 提供建议\n4. 聊天交流\n\n请告诉我您的需求！';
            }
            if (q.includes('表单') || q.includes('form')) {
                return '我可以帮助您设计表单！请告诉我您需要什么类型的表单，例如：\n- 用户注册表单\n- 订单表单\n- 联系表单\n- 调查问卷';
            }
            return '收到！我理解您的意思是"' + question + '"。请问还有什么我可以帮助您的吗？';
        };
        
        const onCommand = (cmd) => {
            if (cmd === 'clear') {
                messages.value = [];
                emit('update:messages', []);
                emit('clear');
            } else if (cmd === 'export') {
                const data = JSON.stringify(messages.value, null, 2);
                const blob = new Blob([data], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'chat-history.json';
                a.click();
            } else if (cmd === 'settings') {
                emit('settings');
            }
        };
        
        const reset = () => {
            messages.value = [];
            inputText.value = '';
        };
        
        expose({ reset, sendQuestion });
        
        watch(() => props.modelValue, (val) => {
            if (JSON.stringify(messages.value) !== JSON.stringify(val)) {
                messages.value = [...val];
            }
        }, { deep: true });
        
        return {
            t, containerRef, messagesRef, inputText, messages, sending, typing,
            formatTime, formatContent, sendQuestion, sendMessage, onCommand, reset
        };
    }
});
</script>

<style>
.fc-ai-chat { width: 100%; height: 100%; display: flex; flex-direction: column; border: 1px solid #e4e7ed; border-radius: 4px; background: #fff; }
.ai-chat-header { display: flex; align-items: center; padding: 12px 16px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; }
.ai-avatar { margin-right: 12px; }
.ai-info { flex: 1; }
.ai-name { font-weight: 600; font-size: 15px; }
.ai-status { display: flex; align-items: center; gap: 6px; font-size: 12px; opacity: 0.9; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #909399; }
.status-dot.online { background: #67c23a; }
.ai-chat-messages { flex: 1; overflow-y: auto; padding: 16px; background: #f5f7fa; }
.message-item { display: flex; gap: 12px; margin-bottom: 16px; animation: fadeIn 0.3s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.message-user { flex-direction: row-reverse; }
.message-user .message-bubble { background: #409EFF; color: #fff; }
.message-assistant .message-bubble { background: #fff; }
.message-bubble { max-width: 80%; padding: 12px 16px; border-radius: 12px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); }
.message-content { line-height: 1.6; font-size: 14px; }
.message-content :deep(pre) { background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; overflow-x: auto; margin: 8px 0; }
.message-content :deep(code) { background: rgba(0, 0, 0, 0.06); padding: 2px 6px; border-radius: 3px; font-family: monospace; }
.message-time { font-size: 11px; color: #c0c4cc; margin-top: 6px; }
.message-user .message-time { text-align: right; }
.typing-indicator { display: flex; gap: 4px; padding: 4px 0; }
.typing-indicator span { width: 8px; height: 8px; background: #909399; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out; }
.typing-indicator span:nth-child(1) { animation-delay: 0s; }
.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
@keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }
.ai-welcome { height: 100%; display: flex; align-items: center; justify-content: center; }
.quick-questions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-top: 16px; }
.ai-chat-input { padding: 12px 16px; border-top: 1px solid #ebeef5; background: #fff; }
.input-actions { display: flex; justify-content: flex-end; margin-top: 8px; }
</style>
