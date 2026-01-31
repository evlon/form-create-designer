<template>
    <div class="fc-tools-bar" ref="containerRef">
        <div class="tools-left">
            <template v-for="group in leftGroups" :key="group.key">
                <el-dropdown
                    v-if="group.type === 'dropdown'"
                    trigger="click"
                    @command="onCommand"
                >
                    <el-button size="small" :type="group.type || 'default'">
                        <el-icon v-if="group.icon"><component :is="group.icon" /></el-icon>
                        {{ group.label }}
                        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="item in group.items"
                                :key="item.key"
                                :command="item.command || item.key"
                                :disabled="item.disabled"
                                :divided="item.divided"
                            >
                                <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
                                {{ item.label }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <el-button
                    v-else-if="group.type === 'button'"
                    size="small"
                    :type="group.btnType || 'default'"
                    :disabled="group.disabled"
                    @click="onClick(group)"
                >
                    <el-icon v-if="group.icon"><component :is="group.icon" /></el-icon>
                    {{ group.label }}
                </el-button>
                <el-divider v-else-if="group.type === 'divider'" direction="vertical" />
            </template>
        </div>
        
        <div class="tools-center">
            <slot name="center">
                <template v-for="item in centerItems" :key="item.key">
                    <el-input
                        v-if="item.type === 'input'"
                        v-model="item.value"
                        :placeholder="item.placeholder"
                        :prefix-icon="item.icon"
                        size="small"
                        style="width: 200px"
                        @input="onInput(item)"
                        @keydown.enter="onSearch(item)"
                    />
                    <el-button
                        v-else-if="item.type === 'search'"
                        size="small"
                        type="primary"
                        @click="onSearch(item)"
                    >
                        <el-icon><Search /></el-icon>
                    </el-button>
                </template>
            </slot>
        </div>
        
        <div class="tools-right">
            <template v-for="item in rightItems" :key="item.key">
                <el-tooltip :content="item.tooltip" placement="top" v-if="item.type === 'icon'">
                    <el-button size="small" text @click="onClick(item)">
                        <el-icon :size="item.size || 18"><component :is="item.icon" /></el-icon>
                    </el-button>
                </el-tooltip>
                <el-button
                    v-else-if="item.type === 'button'"
                    size="small"
                    :type="item.btnType || 'default'"
                    :disabled="item.disabled"
                    @click="onClick(item)"
                >
                    <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
                    {{ item.label }}
                </el-button>
            </template>
            
            <el-dropdown trigger="click" @command="onCommand">
                <el-button size="small" text>
                    <el-icon><MoreFilled /></el-icon>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item
                            v-for="item in moreItems"
                            :key="item.key"
                            :command="item.command || item.key"
                        >
                            <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
                            {{ item.label }}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { ArrowDown, Search, MoreFilled } from '@element-plus/icons-vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'ToolsBar',
    components: {
        ArrowDown,
        Search,
        MoreFilled
    },
    inject: ['designer'],
    emits: ['update:items', 'click', 'command', 'search', 'input'],
    props: {
        items: {
            type: Array,
            default: () => []
        },
        showMore: {
            type: Boolean,
            default: true
        },
        moreThreshold: {
            type: Number,
            default: 5
        }
    },
    setup(props, { emit, expose }) {
        const containerRef = ref(null);
        const localItems = ref([...props.items]);
        
        const leftGroups = computed(() => localItems.value.filter(i => i.position === 'left' || !i.position));
        const centerItems = computed(() => localItems.value.filter(i => i.position === 'center'));
        const rightItems = computed(() => localItems.value.filter(i => i.position === 'right' && props.showMore && localItems.value.indexOf(i) < props.moreThreshold));
        const moreItems = computed(() => {
            const rightAll = localItems.value.filter(i => i.position === 'right');
            if (!props.showMore) return [];
            return rightAll.slice(props.moreThreshold);
        });
        
        const onClick = (item) => {
            emit('click', item);
            if (item.command) {
                emit('command', item.command, item);
            }
        };
        
        const onCommand = (command) => {
            const item = localItems.value.find(i => (i.command || i.key) === command);
            emit('command', command, item);
        };
        
        const onSearch = (item) => {
            emit('search', { item, value: item.value });
        };
        
        const onInput = (item) => {
            emit('input', { item, value: item.value });
        };
        
        const updateItems = (newItems) => {
            localItems.value = [...newItems];
            emit('update:items', localItems.value);
        };
        
        expose({
            updateItems,
            getItems: () => localItems.value
        });
        
        return {
            t,
            containerRef,
            leftGroups,
            centerItems,
            rightItems,
            moreItems,
            onClick,
            onCommand,
            onSearch,
            onInput
        };
    }
});
</script>

<style>
.fc-tools-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 16px;
    background: #f5f7fa;
    border-bottom: 1px solid #e4e7ed;
}

.tools-left,
.tools-center,
.tools-right {
    display: flex;
    align-items: center;
    gap: 8px;
}

.tools-center {
    flex: 1;
    justify-content: center;
}

.tools-left {
    flex: 1;
}

.tools-right {
    flex: 1;
    justify-content: flex-end;
}

.tools-left .el-dropdown,
.tools-right .el-dropdown {
    vertical-align: middle;
}
</style>
