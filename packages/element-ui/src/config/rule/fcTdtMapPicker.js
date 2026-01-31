import {localeProps, makeRequiredRule} from '../../utils';

export default {
    menu: 'aide',
    icon: 'Location',
    name: 'fc-tdt-map-picker',
    label: '地图选点',
    component: 'FcTdtMapPicker',
    rules: [makeRequiredRule()],
    props(_, {t}) {
        return localeProps(t, 'fc-tdt-map-picker.props', [
            { type: 'input', field: 'title', label: '标题' },
            { type: 'switch', field: 'disabled', label: '禁用' },
            { type: 'switch', field: 'showHeader', label: '显示头部' },
            { type: 'switch', field: 'showAddress', label: '显示地址' },
            { type: 'switch', field: 'showCoordinate', label: '显示坐标' },
            { type: 'inputNumber', field: 'height', label: '高度', props: { min: 100 } },
            { type: 'input', field: 'ak', label: '百度地图AK' },
            { type: 'input', field: 'center', label: '中心点经纬度' },
            { type: 'inputNumber', field: 'zoom', label: '缩放级别', props: { min: 3, max: 18 } },
            { type: 'switch', field: 'markerDraggable', label: '标记可拖拽' },
        ]);
    },
    rule({t}) {
        return {
            type: 'fc-tdt-map-picker',
            field: 'map_' + Date.now(),
            title: t('com.fc-tdt-map-picker.name'),
            info: t('com.fc-tdt-map-picker.info'),
            $required: false,
            props: {
                modelValue: {},
                title: '',
                disabled: false,
                showHeader: true,
                showAddress: true,
                showCoordinate: true,
                height: 400,
                ak: '',
                center: [116.404, 39.915],
                zoom: 12,
                markerDraggable: true
            },
            on: {
                change: [],
                locate: [],
                error: [],
                'update:modelValue': []
            }
        };
    }
};
