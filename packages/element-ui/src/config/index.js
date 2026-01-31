import radio from './rule/radio';
import checkbox from './rule/checkbox';
import input from './rule/input';
import textarea from './rule/textarea';
import password from './rule/password';
import number from './rule/number';
import select from './rule/select';
import _switch from './rule/switch';
import slider from './rule/slider';
import time from './rule/time';
import timeRange from './rule/timeRange';
import date from './rule/date';
import dateRange from './rule/dateRange';
import rate from './rule/rate';
import color from './rule/color';
import row from './rule/row';
import col from './rule/col';
import tabPane from './rule/tabPane';
import divider from './rule/divider';
import cascader from './rule/cascader';
import upload from './rule/upload';
import transfer from './rule/transfer';
import tree from './rule/tree';
import alert from './rule/alert';
import text from './rule/text';
import space from './rule/space';
import tabs from './rule/tabs';
import button from './rule/button';
import editor from './rule/editor';
import group from './rule/group';
import subForm from './rule/subForm';
import card from './rule/card';
import collapse from './rule/collapse';
import collapseItem from './rule/collapseItem';
import treeSelect from './rule/treeSelect';
import tag from './rule/tag';
import html from './rule/html';
import table from './rule/table';
import tableForm from './rule/tableForm';
import tableFormColumn from './rule/tableFormColumn';
import image from './rule/image';
import signaturePad from './rule/signaturePad';
import title from './rule/title';
import fcDynamicRender from './rule/fcDynamicRender';
import qrCodeBox from './rule/qrCodeBox';
import barCodeBox from './rule/barCodeBox';
import stepForm from './rule/stepForm';
import iframeBox from './rule/iframeBox';
import fcEcharts from './rule/fcEcharts';
import apiKeyInput from './rule/apiKeyInput';
import nestedForm from './rule/nestedForm';
import printForm from './rule/printForm';
import fcFlow from './rule/fcFlow';
import fcMarkdown from './rule/fcMarkdown';
import infiniteForm from './rule/infiniteForm';
import dataTable from './rule/dataTable';
import videoBox from './rule/videoBox';
import audioBox from './rule/audioBox';
import fcCity from './rule/fcCity';
import fcAiPanel from './rule/fcAiPanel';
import imageBox from './rule/imageBox';
import dynamicComponent from './rule/dynamicComponent';
import toolsBar from './rule/toolsBar';
import globalVariableConfig from './rule/globalVariableConfig';
import globalClassConfig from './rule/globalClassConfig';
import globalFetchConfig from './rule/globalFetchConfig';
import dataView from './rule/dataView';
import infiniteTableForm from './rule/infiniteTableForm';
import nestedTableForm from './rule/nestedTableForm';
import aiChat from './rule/aiChat';
import dataset from './rule/dataset';
import aiTool from './rule/aiTool';
import globalEventConfig from './rule/globalEventConfig';
import mStepForm from './rule/mStepForm';
import infiniteTableFormView from './rule/infiniteTableFormView';
import nestedTableFormView from './rule/nestedTableFormView';
import fcMermaid from './rule/fcMermaid';
import fcTdtMapPicker from './rule/fcTdtMapPicker';
import stepFormItem from './rule/stepFormItem';
import signature from './rule/signature';


const ruleList = [
    input, textarea, password, number, radio, checkbox, select, _switch, rate, time, timeRange, slider, date, dateRange, color, cascader, upload, transfer, tree, treeSelect, editor, signaturePad,
    group, subForm, tableForm, tableFormColumn,
    alert, button, text, title, html, divider, tag, image,
    row, table, tabs, space, card, collapse,
    col, tabPane, collapseItem,
    fcDynamicRender,
    qrCodeBox,
    barCodeBox,
    stepForm,
    iframeBox,
    fcEcharts,
    apiKeyInput,
    nestedForm,
    printForm,
    fcFlow,
    fcMarkdown,
    infiniteForm,
    dataTable,
    videoBox,
    audioBox,
    fcCity,
    fcAiPanel,
    imageBox,
    dynamicComponent,
    toolsBar,
    globalVariableConfig,
    globalClassConfig,
    globalFetchConfig,
    dataView,
    infiniteTableForm,
    nestedTableForm,
    aiChat,
    dataset,
    aiTool,
    globalEventConfig,
    mStepForm,
    infiniteTableFormView,
    nestedTableFormView,
    fcMermaid,
    fcTdtMapPicker,
    stepFormItem,
    signature,
];

export default ruleList;

export function defaultDrag(rule) {
    return {
        icon: rule.field ? 'icon-input' : 'icon-cell',
        label: rule.field || rule.type,
        name: '_',
        mask: true,
        handleBtn: ['delete'],
        rule() {
            return rule;
        },
        props() {
            return [];
        }
    }
}
