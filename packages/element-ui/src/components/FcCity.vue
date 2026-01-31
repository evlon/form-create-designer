<template>
    <div class="fc-city-picker">
        <el-cascader
            :model-value="modelValue"
            @update:modelValue="updateValue"
            :options="cityOptions"
            :props="cascaderProps"
            :size="size"
            :placeholder="placeholder"
            :disabled="disabled"
            :clearable="clearable"
            :filterable="filterable"
            :show-all-levels="showAllLevels"
            :separator="separator"
            :collapse-tags="collapseTags"
            :collapse-tags-tooltip="collapseTagsTooltip"
            :max-collapse-tags="maxCollapseTags"
            @change="onChange"
            @expand-change="onExpandChange"
            @blur="onBlur"
            @focus="onFocus"
            @visible-change="onVisibleChange"
        />
    </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { t } from '../utils/locale';

export default defineComponent({
    name: 'FcCity',
    inject: ['designer'],
    emits: ['update:modelValue', 'change', 'expand-change', 'blur', 'focus', 'visible-change'],
    props: {
        modelValue: {
            type: [Array, String],
            default: () => []
        },
        areaCode: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'default'
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: true
        },
        filterable: {
            type: Boolean,
            default: true
        },
        showAllLevels: {
            type: Boolean,
            default: true
        },
        separator: {
            type: String,
            default: '/'
        },
        collapseTags: {
            type: Boolean,
            default: false
        },
        collapseTagsTooltip: {
            type: Boolean,
            default: false
        },
        maxCollapseTags: {
            type: Number,
            default: 2
        },
        level: {
            type: Number,
            default: 3,
            validator: (val) => [1, 2, 3].includes(val)
        },
        dataType: {
            type: String,
            default: 'name',
            validator: (val) => ['name', 'code', 'all'].includes(val)
        }
    },
    setup(props, { emit, expose }) {
        const cityOptions = ref([]);
        
        const cascaderProps = computed(() => ({
            expandTrigger: 'hover',
            multiple: false,
            emitPath: props.showAllLevels,
            checkStrictly: false,
            value: props.dataType === 'code' || props.areaCode ? 'code' : 'name',
            label: 'name',
            children: 'children'
        }));
        
        const loadCityData = async () => {
            try {
                const response = await fetch('https://cdn.jsdelivr.net/npm/china-area-data@latest/data.json');
                const data = await response.json();
                
                const parseData = (items, depth = 1) => {
                    return Object.entries(items).map(([code, name]) => {
                        const node = {
                            code,
                            name,
                            value: props.dataType === 'code' || props.areaCode ? code : name
                        };
                        
                        if (depth < props.level) {
                            const childrenData = data[code];
                            if (childrenData && Object.keys(childrenData).length > 0) {
                                node.children = parseData(childrenData, depth + 1);
                            }
                        }
                        
                        return node;
                    });
                };
                
                cityOptions.value = parseData(data);
            } catch (e) {
                console.error('[FcCity] Failed to load city data:', e);
                cityOptions.value = getDefaultCityData();
            }
        };
        
        const getDefaultCityData = () => {
            return [
                {
                    code: '110000',
                    name: '北京市',
                    value: props.dataType === 'code' || props.areaCode ? '110000' : '北京市',
                    children: [
                        { code: '110100', name: '北京市', value: '110100' },
                        { code: '110101', name: '东城区', value: '110101' },
                        { code: '110102', name: '西城区', value: '110102' }
                    ]
                },
                {
                    code: '310000',
                    name: '上海市',
                    value: props.dataType === 'code' || props.areaCode ? '310000' : '上海市',
                    children: [
                        { code: '310100', name: '上海市', value: '310100' },
                        { code: '310101', name: '黄浦区', value: '310101' }
                    ]
                }
            ];
        };
        
        const updateValue = (value) => {
            emit('update:modelValue', value);
        };
        
        const onChange = (value) => {
            emit('change', { value, areaCode: props.areaCode ? value : value?.[value.length - 1] });
        };
        
        const onExpandChange = (value) => {
            emit('expand-change', { value });
        };
        
        const onBlur = (event) => {
            emit('blur', { event });
        };
        
        const onFocus = (event) => {
            emit('focus', { event });
        };
        
        const onVisibleChange = (visible) => {
            emit('visible-change', { visible });
        };
        
        const getCityCode = () => {
            if (!props.modelValue || !props.modelValue.length) return '';
            return props.areaCode 
                ? props.modelValue[props.modelValue.length - 1] 
                : props.modelValue[props.modelValue.length - 1];
        };
        
        const getCityName = () => {
            if (!props.modelValue || !props.modelValue.length) return '';
            return props.showAllLevels ? props.modelValue : props.modelValue[props.modelValue.length - 1];
        };
        
        expose({
            getCityCode,
            getCityName,
            refresh: loadCityData
        });
        
        watch(() => props.modelValue, (val) => {
            if (val && val.length > 0) {
                return;
            }
        });
        
        loadCityData();
        
        return {
            t,
            cityOptions,
            cascaderProps,
            updateValue,
            onChange,
            onExpandChange,
            onBlur,
            onFocus,
            onVisibleChange
        };
    }
});
</script>

<style>
.fc-city-picker {
    width: 100%;
}
</style>
