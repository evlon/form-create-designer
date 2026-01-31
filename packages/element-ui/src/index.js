import FcDesigner from './components/FcDesigner.vue';
import DragTool from './components/DragTool.vue';
import Struct from './components/Struct.vue';
import Row from './components/Row.vue';
import HtmlEditor from './components/HtmlEditor.vue';
import FnEditor from './components/FnEditor.vue';
import FnInput from './components/FnInput.vue';
import FetchConfig from './components/FetchConfig.vue';
import ConfigItem from './components/style/ConfigItem.vue';
import FieldInput from './components/FieldInput.vue';
import EventConfig from './components/EventConfig.vue';
import FnConfig from './components/FnConfig.vue';
import TableView from './components/table/TableView.vue';
import Table from './components/table/Table.vue';
import Validate from './components/Validate.vue';
import DragBox from './components/DragBox.vue';
import Required from './components/Required.vue';
import TableOptions from './components/TableOptions.vue';
import TreeOptions from './components/TreeOptions.vue';
import TableFormView from './components/tableForm/TableFormView.vue';
import TableForm from './components/tableForm/TableForm.vue';
import SignaturePad from './components/SignaturePad.vue';
import FcTitle from './components/FcTitle.vue';
import TableFormColumnView from './components/tableForm/TableFormColumnView.vue';
import SizeInput from './components/style/SizeInput.vue';
import ColorInput from './components/style/ColorInput.vue';
import StyleConfig from './components/style/StyleConfig.vue';
import LanguageInput from './components/language/LanguageInput.vue';
import ValueInput from './components/ValueInput.vue';
import FcDynamicRender from './components/FcDynamicRender.vue';
import BackgroundInput from './components/style/BackgroundInput.vue';
import MarginInput from './components/style/MarginInput.vue';
import PaddingInput from './components/style/PaddingInput.vue';
import QrCodeBox from './components/QrCodeBox.vue';
import BarCodeBox from './components/BarCodeBox.vue';
import StepForm from './components/StepForm.vue';
import IframeBox from './components/IframeBox.vue';
import StyleEditor from './components/StyleEditor.vue';
import ConfigPanel from './components/ConfigPanel.vue';
import ControlConfig from './components/ControlConfig.vue';
import FcEcharts from './components/FcEcharts.vue';
import ApiKeyInput from './components/ApiKeyInput.vue';
import NestedForm from './components/NestedForm.vue';
import PrintForm from './components/PrintForm.vue';
import FcFlow from './components/FcFlow.vue';
import FcMarkdown from './components/FcMarkdown.vue';
import InfiniteForm from './components/InfiniteForm.vue';
import DataTable from './components/DataTable.vue';
import VideoBox from './components/VideoBox.vue';
import AudioBox from './components/AudioBox.vue';
import FcCity from './components/FcCity.vue';
import FcAiPanel from './components/FcAiPanel.vue';
import ImageBox from './components/ImageBox.vue';
import DynamicComponent from './components/DynamicComponent.vue';
import ToolsBar from './components/ToolsBar.vue';
import GlobalVariableConfig from './components/GlobalVariableConfig.vue';
import GlobalClassConfig from './components/GlobalClassConfig.vue';
import GlobalFetchConfig from './components/GlobalFetchConfig.vue';
import DataView from './components/DataView.vue';
import InfiniteTableForm from './components/InfiniteTableForm.vue';
import NestedTableForm from './components/NestedTableForm.vue';
import AiChat from './components/AiChat.vue';
import Dataset from './components/Dataset.vue';
import AiTool from './components/AiTool.vue';
import GlobalEventConfig from './components/GlobalEventConfig.vue';
import MStepForm from './components/MStepForm.vue';
import InfiniteTableFormView from './components/InfiniteTableFormView.vue';
import NestedTableFormView from './components/NestedTableFormView.vue';
import FcMermaid from './components/FcMermaid.vue';
import FcTdtMapPicker from './components/FcTdtMapPicker.vue';
import StepFormItem from './components/StepFormItem.vue';
import Signature from './components/Signature.vue';
import formCreate, {designerForm} from './utils/form';
import FcEditor from '@form-create/component-wangeditor';
import draggable from 'vuedraggable/src/vuedraggable';
import {
    compareVersion,
    copyTextToClipboard,
    getInjectArg,
    localeOptions,
    localeProps,
    makeOptionsRule,
    makeRequiredRule,
    makeTreeOptions,
    makeTreeOptionsRule,
    toJSON
} from './utils/index';
import globalUseLocale, {t} from './utils/locale';
import './style/index.css';
import './style/icon.css';
import './utils/highlight/style.css';
import menus from './config/menu';
import dragRuleList from './config/index';

const addComponent = (id, component, previewComponent) => {
    designerForm.component(id, previewComponent || component);
    formCreate.component(id, component);
}

designerForm.component('draggable', draggable);
designerForm.component('DragTool', DragTool);
designerForm.component('DragBox', DragBox);
designerForm.component('Validate', Validate);
designerForm.component('Struct', Struct);
designerForm.component('HtmlEditor', HtmlEditor);
designerForm.component('FetchConfig', FetchConfig);
designerForm.component('FnEditor', FnEditor);
designerForm.component('FnInput', FnInput);
designerForm.component('Required', Required);
designerForm.component('TableOptions', TableOptions);
designerForm.component('TreeOptions', TreeOptions);
designerForm.component('TableFormColumn', TableFormColumnView);
designerForm.component('EventConfig', EventConfig);
designerForm.component('ColorInput', ColorInput);
designerForm.component('SizeInput', SizeInput);
designerForm.component('StyleConfig', StyleConfig);
designerForm.component('LanguageInput', LanguageInput);
designerForm.component('ConfigItem', ConfigItem);
designerForm.component('FieldInput', FieldInput);
designerForm.component('FnConfig', FnConfig);
designerForm.component('FcRow', Row);
designerForm.component('ValueInput', ValueInput);
designerForm.component('FcDynamicRender', FcDynamicRender);
designerForm.component('BackgroundInput', BackgroundInput);
designerForm.component('MarginInput', MarginInput);
designerForm.component('PaddingInput', PaddingInput);
designerForm.component('QrCodeBox', QrCodeBox);
designerForm.component('BarCodeBox', BarCodeBox);
designerForm.component('StepForm', StepForm);
designerForm.component('IframeBox', IframeBox);
designerForm.component('StyleEditor', StyleEditor);
designerForm.component('ConfigPanel', ConfigPanel);
designerForm.component('ControlConfig', ControlConfig);
designerForm.component('FcEcharts', FcEcharts);
designerForm.component('ApiKeyInput', ApiKeyInput);
designerForm.component('NestedForm', NestedForm);
designerForm.component('PrintForm', PrintForm);
designerForm.component('FcFlow', FcFlow);
designerForm.component('FcMarkdown', FcMarkdown);
designerForm.component('InfiniteForm', InfiniteForm);
designerForm.component('DataTable', DataTable);
designerForm.component('VideoBox', VideoBox);
designerForm.component('AudioBox', AudioBox);
designerForm.component('FcCity', FcCity);
designerForm.component('FcAiPanel', FcAiPanel);
designerForm.component('ImageBox', ImageBox);
designerForm.component('DynamicComponent', DynamicComponent);
designerForm.component('ToolsBar', ToolsBar);
designerForm.component('GlobalVariableConfig', GlobalVariableConfig);
designerForm.component('GlobalClassConfig', GlobalClassConfig);
designerForm.component('GlobalFetchConfig', GlobalFetchConfig);
designerForm.component('DataView', DataView);
designerForm.component('InfiniteTableForm', InfiniteTableForm);
designerForm.component('NestedTableForm', NestedTableForm);
designerForm.component('AiChat', AiChat);
designerForm.component('Dataset', Dataset);
designerForm.component('AiTool', AiTool);
designerForm.component('GlobalEventConfig', GlobalEventConfig);
designerForm.component('MStepForm', MStepForm);
designerForm.component('InfiniteTableFormView', InfiniteTableFormView);
designerForm.component('NestedTableFormView', NestedTableFormView);
designerForm.component('FcMermaid', FcMermaid);
designerForm.component('FcTdtMapPicker', FcTdtMapPicker);
designerForm.component('StepFormItem', StepFormItem);
designerForm.component('Signature', Signature);
addComponent('FcEditor', FcEditor);
addComponent('FcTitle', FcTitle);
addComponent('SignaturePad', SignaturePad);
addComponent('TableForm', TableForm, TableFormView);
addComponent('FcTable', Table, TableView);

const install = function (Vue) {
    Vue.component('FcDesigner', FcDesigner);
};

const addMenu = function (menu, before) {
    if (!Array.isArray(menu)) {
        menu = [menu];
    }
    if (before) {
        menus.unshift(...menu);
    } else {
        menus.push(...menu);
    }
}

const addDragRule = function (dragRule, before) {
    if (!Array.isArray(dragRule)) {
        dragRule = [dragRule];
    }
    if (before) {
        dragRuleList.unshift(...dragRule);
    } else {
        dragRuleList.push(...dragRule);
    }
}

FcDesigner.install = install;
FcDesigner.makeOptionsRule = makeOptionsRule;
FcDesigner.copyTextToClipboard = copyTextToClipboard;
FcDesigner.getInjectArg = getInjectArg;
FcDesigner.localeOptions = localeOptions;
FcDesigner.localeProps = localeProps;
FcDesigner.makeRequiredRule = makeRequiredRule;
FcDesigner.makeTreeOptions = makeTreeOptions;
FcDesigner.makeTreeOptionsRule = makeTreeOptionsRule;
FcDesigner.toJSON = toJSON;
FcDesigner.formCreate = formCreate;
FcDesigner.designerForm = designerForm;
FcDesigner.component = addComponent;
FcDesigner.useLocale = globalUseLocale;
FcDesigner.addMenu = addMenu;
FcDesigner.addDragRule = addDragRule;
FcDesigner.t = t;

FcDesigner.utils = {
    copyTextToClipboard,
    getInjectArg,
    localeOptions,
    localeProps,
    makeOptionsRule,
    makeRequiredRule,
    makeTreeOptions,
    makeTreeOptionsRule,
    toJSON
}

const minVersion = '3.2.24';

if (compareVersion(minVersion, formCreate.version) === 1) {
    console.warn('Please use FormCreate version ' + minVersion + ' or greater, see https://github.com/xaboy/form-create.');
}

FcDesigner.version = '3.4.0';

if (typeof window !== 'undefined') {
    window.FcDesigner = FcDesigner;
}

export default FcDesigner;

export {
    formCreate,
    designerForm,
    install,
    copyTextToClipboard,
    getInjectArg,
    localeOptions,
    localeProps,
    makeOptionsRule,
    makeRequiredRule,
    makeTreeOptions,
    makeTreeOptionsRule,
    addDragRule,
    addMenu,
    toJSON
};
