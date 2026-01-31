import {localeProps} from '../../utils';

export default {
    menu: 'aide',
    icon: 'icon-chart',
    name: 'FcEcharts',
    label: '图表',
    props(_, {t}) {
        return localeProps(t, 'FcEcharts.props', [
            { type: 'input', field: 'width', label: '宽度' },
            { type: 'inputNumber', field: 'height', label: '高度', props: { min: 100 } },
            { type: 'select', field: 'theme', label: '主题', options: [
                { label: '默认', value: 'default' },
                { label: '暗黑', value: 'dark' }
            ]},
            { type: 'switch', field: 'loading', label: '加载中' },
            { type: 'switch', field: 'autoResize', label: '自动调整' },
        ]);
    },
    rule({t}) {
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
