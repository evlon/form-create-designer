import { makeOptionsRule, makeRequiredRule, getInjectArg } from '../../utils';

export default {
    icon: 'icon-chart',
    name: 'FcEcharts',
    title: '图表',
    columns: [
        makeOptionsRule('props'),
    ],
    rules: [
        makeRequiredRule('FcEcharts'),
    ],
    getOptions(field, { t }) {
        return [
            { label: t('com.FcEcharts.props.width'), value: 'width', type: 'text' },
            { label: t('com.FcEcharts.props.height'), value: 'height', type: 'number' },
            { label: t('com.FcEcharts.props.theme'), value: 'theme', type: 'select', options: [
                { label: '默认', value: 'default' },
                { label: '暗黑', value: 'dark' }
            ]},
            { label: t('com.FcEcharts.props.loading'), value: 'loading', type: 'switch' },
            { label: t('com.FcEcharts.props.autoResize'), value: 'autoResize', type: 'switch' },
        ];
    },
    rule({ t }) {
        return {
            type: 'FcEcharts',
            field: 'echarts_' + Date.now(),
            title: t('com.FcEcharts.name'),
            info: t('com.FcEcharts.info'),
            $required: false,
            readOnly: true,
            props: {
                width: '100%',
                height: 400,
                theme: 'default',
                loading: false,
                autoResize: true,
                options: {
                    title: {
                        text: '图表标题',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['数据系列'],
                        bottom: 10
                    },
                    xAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        name: '数据系列',
                        type: 'line',
                        data: [120, 200, 150, 80, 70, 110, 130],
                        smooth: true
                    }]
                }
            },
            validate: [],
            on: {
                click: [],
                legendselectchanged: [],
                datazoom: [],
                finished: [],
                mounted: []
            }
        };
    }
};
