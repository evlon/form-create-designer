const En = {
    name: 'en',
    form: {
        field: 'Field',
        title: 'Title',
        info: 'Info',
        control: 'Control',
        labelPosition: 'Label position',
        labelStyle: 'Label style',
        labelSuffix: 'Label suffix',
        size: 'Form size',
        event: 'Form event',
        labelWidth: 'Label width',
        hideRequiredAsterisk: 'Hide the red asterisk next to the label of a required field',
        showMessage: 'Display verification error message',
        inlineMessage: 'Display validation information inline',
        submitBtn: 'Whether to display the form submit button',
        resetBtn: 'Whether to display the form reset button',
        appendChild: 'Insert child',
        formMode: 'Form mode',
        formName: 'Form name',
        componentMode: 'Component',
        htmlMode: 'HTML',
        document: 'Document',
        controlDocument: 'Need more detailed configuration methods? Please view {doc}',
        onSubmit: 'Triggered when form is submitted',
        onReset: 'Triggered after form is reset',
        onCreated: 'Triggered after the form component is initialized',
        onMounted: 'Triggered after the form component is mounted',
        onReload: 'Triggered after the form rendering rule is reloaded',
        onChange: 'Triggered when the component value changes',
        beforeSubmit: 'Triggered when form validation passed',
        beforeFetch: 'Triggered before remote data request is sent',
    },
    ai: {
        name: 'Smart Assistant',
        welcome: 'Welcome to the AI Assistant',
        info: 'I can help you quickly generate and modify forms, making form design easy and efficient.',
        try: 'Try asking me',
        change: 'Change',
        placeholder: 'Please describe your requirements...',
        error: 'AI service is temporarily unavailable, please try again later',
    },
    warning: {
        name: 'Unique identifier for the component, used to access and modify its configuration rules.',
        field: 'Field name for binding data to the component. Must start with a letter for proper recognition.',
        fetch: 'Loads remote data through requests, updating the component based on the returned result.',
        fetchQuery: 'Defines GET parameters for requests, passed via the URL.',
        fetchData: 'Defines POST parameters for requests, passed in the request body.',
        fetchDataType: 'Selects the data type for the request body to ensure correct format.',
        beforeFetch: 'Before the request is sent, you can modify the parameters via a handler. Return false or a rejected Promise to cancel the request.',
        fetchParse: 'Processes the response data after the request and converts it into the required structure.',
        language: 'Manages multilingual data, allowing easy language switching for content display.',
    },
    computed: {
        fieldUsed: '[{label}] Is used in the calculation formula, please modify the corresponding formula first',
        fieldExist: '[{label}] Field already exists',
        fieldEmpty: 'Field is required',
        fieldChar: 'Field must begin with a letter',
    },
    validate: {
        type: 'Type',
        typePlaceholder: 'Please select',
        trigger: 'Trigger',
        mode: 'Verification method',
        modes: {
            required: 'required',
            pattern: 'pattern',
            validator: 'validator',
            min: 'min',
            max: 'max',
            len: 'length',
            maxLen: 'max length',
            minLen: 'min length',
            uppercase: 'uppercase',
            lowercase: 'lowercase',
            email: 'email format',
            url: 'URL format',
            ip: 'IP address',
            phone: 'phone number',
            positive: 'positive number',
            negative: 'negative number',
            integer: 'integer',
            number: 'number',
        },
        types: {
            string: 'String',
            boolean: 'Boolean',
            array: 'Multiple',
            number: 'Number',
            integer: 'Integer',
            float: 'Float',
            object: 'Collection',
            date: 'Date',
            url: 'Url',
            email: 'Email',
        },
        message: 'Error',
        auto: 'Automatic',
        autoRequired: 'Please enter {title}',
        autoMode: 'Please enter the correct {title}',
        requiredPlaceholder: 'Please enter',
        required: 'Is it required',
        rule: 'Validation',
    },
    tableOptions: {
        handle: 'Operation',
        add: 'Add',
        empty1: 'Click the lower right corner',
        empty2: 'Button to add a column',
        rmCol: 'Delete current column',
        rmRow: 'Delete current row',
        batchRmCol: 'Delete columns',
        batchRmRow: 'Delete rows',
        batchSplit: 'Split cells',
        batchMerge: 'Merge cells',
        splitRow: 'Split into rows',
        splitCol: 'Split into columns',
        mergeBottom: 'Merge downward',
        mergeRight: 'Merge right',
        addTop: 'Add top column',
        addBottom: 'Add the following',
        addLeft: 'Add left column',
        addRight: 'Add right column',
        keyValue: 'key-value',
    },
    struct: {
        title: 'Edit',
        only: '[{label}] Only one allowed to be added',
        errorMsg: 'The input content is syntactically incorrect',
        configured: 'Configured',
    },
    event: {
        title: 'Edit',
        create: 'Create',
        list: 'List',
        placeholder: 'Please enter the name of the event',
        saveMsg: 'Please save the event currently being edited',
        type: 'Type',
        info: 'Info',
        label: 'Field',
        inject: {
            api: 'API of current form',
            rule: 'Generate rules for the current form',
            self: 'Component generation rule',
            option: 'Form configuration',
            args: 'Original parameters of event',
        }
    },
    eventInfo: {
        blur: 'Triggered when focus is lost',
        focus: 'Triggered when focus is obtained',
        change: 'Triggered when the binding value changes',
        input: 'Trigger when value changes',
        clear: 'Triggered when the clear button is clicked',
        close: 'Triggered when the component is closed',
        click: 'Fires when the component is clicked',
        add: 'Trigger when added',
        delete: 'Triggered when deleted',
        visibleChange: 'Triggered when the drop-down box appears/hides',
        calendarChange: 'Triggered when the selected date in the calendar changes',
        panelChange: 'Fires when the date panel changes',
        open: 'Triggered when opening',
        opened: 'Triggered when opening animation ends',
        closed: 'Triggered when closing animation ends',
        openAutoFocus: 'Triggered when entering focus on content',
        closeAutoFocus: 'Triggered when entering focus from content',
        submit: 'Triggered when submitting table',
        confirm: 'Triggered when clicking confirm',
        validateFail: 'Triggered when table verification fails',
        hook_load: 'Triggered after component rules are loaded',
        hook_mounted: 'Triggered after component is mounted',
        hook_deleted: 'Triggered after component rules are removed',
        hook_watch: 'Triggered after component rules change',
        hook_value: 'Triggered after component value changes',
        hook_hidden: 'Triggered after component display status changes',
        hook_titleClick: 'Triggered when the component label is clicked',
    },
    fetch: {
        title: 'Set data',
        create: 'Create data',
        config: 'Request',
        action: 'Action',
        actionRequired: 'Please enter the correct link',
        placeholder: 'Please enter the name of the data source',
        method: 'Method',
        data: 'Attached',
        dataType: 'DataType',
        headers: 'Headers',
        query: 'Query',
        parse: 'Processing',
        response: 'Data returned by the interface',
        onError: 'onError',
        beforeFetch: 'Before',
        remote: 'Remote',
        static: 'Static',
        optionsType: {
            fetch: 'Fetch',
            struct: 'Static',
        },
        preview: 'Preview Response Data',
        test: 'Test Request',
        previewEmpty: 'Click "Test Request" button to preview response data',
        requestFailed: 'Request Failed'
    },
    style: {
        width: 'Width',
        height: 'Height',
        color: 'Color',
        backgroundColor: 'Background color',
        margin: 'Margin',
        padding: 'Padding',
        borderRadius: 'Border radius',
        border: 'Border',
        solid: 'Solid',
        dashed: 'Dashed',
        dotted: 'Dotted',
        double: 'Double',
        opacity: 'Opacity',
        scale: 'Scale',
        minWidth: 'Min Width',
        minHeight: 'Min Height',
        maxWidth: 'Max Width',
        maxHeight: 'Max Height',
        overflow: {
            name: 'Overflow',
            visible: 'Visible',
            hidden: 'Hidden',
            scroll: 'Scroll',
            auto: 'Auto scroll after overflow',
        },
        shadow: {
            name: 'Shadow',
            x: 'x-axis offset',
            y: 'y-axis offset',
            vague: 'blurred radius',
            extend: 'diffusion radius',
            inset: 'inward',
            external: 'outward',
            mode: 'Mode',
            classic: 'Classic',
            flat: 'Flat',
            solid: 'Stereoscopic',
        },
        background: {
            name: 'Background',
            image: 'Background image',
            url: 'Image URL',
            gradient: 'Gradient',
            gradientStart: 'Start color',
            gradientEnd: 'End color',
            repeat: 'Repeat',
            position: 'Position',
            size: 'Size',
            repeatAll: 'Repeat',
            repeatX: 'Repeat X',
            repeatY: 'Repeat Y',
            noRepeat: 'No repeat',
            cover: 'Cover',
            contain: 'Contain',
            auto: 'Auto',
        },
        font: {
            name: 'Font',
            size: 'Size',
            family: 'Family',
            align: 'Align',
            height: 'line-height',
            spacing: 'letter-spacing',
            preview: 'Preview',
        },
        family: {
            'Microsoft YaHei': 'Microsoft YaHei',
            SimSun: 'SimSun',
            SimHei: 'SimHei',
            KaiTi: 'KaiTi',
            FangSong: 'FangSong',
            LiSu: 'LiSu',
        },
        position: {
            name: 'Position',
            static: 'static',
            relative: 'relative',
            absolute: 'absolute',
            fixed: 'fixed',
            sticky: 'sticky',
        },
        decoration: {
            name: 'Decoration',
            underline: 'underline',
            'line-through': 'line-through',
            overline: 'overline',
        },
        weight: {
            name: 'font-weight',
            300: 'Fine',
            400: 'Default',
            500: 'Medium',
            700: 'Bold',
        }
    },
    designer: {
        component: 'Component',
        id: 'Unique id',
        name: 'Serial number',
        type: 'Type',
        form: 'Form',
        json: 'Rule',
        style: 'Style',
        rule: 'Basis',
        advanced: 'Advanced',
        props: 'Props',
        customProps: 'Custom props',
        validate: 'Validate',
        event: 'Event',
        clearWarn: 'It cannot be restored after clearing it. Are you sure you want to clear it? ',
        childEmpty: 'Click the \\e789  button in the lower right corner to add a column',
        dragEmpty: 'Drag the components from the list on the left here',
        unload: 'Are you sure you want to leave the current page?',
        comList: 'Component',
    },
    language: {
        name: 'Language',
        add: 'Add',
        batchRemove: 'Batch Deletion',
        select: 'Select language',
    },
    menu: {
        main: 'Basic',
        aide: 'Auxiliary',
        layout: 'Layout',
        component: 'Component',
        subform: 'Subform',
        tree: 'Structure'
    },
    props: {
        success: 'Success',
        error: 'Error',
        disabled: 'disabled',
        time: 'time',
        size: 'Size',
        email: 'email',
        number: 'number',
        globalData: 'Global data',
        mobile: 'Mobile',
        pc: 'Pc',
        reactive: 'Reactive',
        title: 'Title',
        content: 'Content',
        collection: 'Collection',
        group: 'Group',
        custom: 'Custom',
        change: 'Change',
        blur: 'Blur',
        preview: 'Preview',
        clear: 'Clear',
        cancel: 'Cancel',
        close: 'Close',
        ok: 'Ok',
        save: 'Save',
        refresh: 'Refresh',
        submit: 'Submit',
        reset: 'Reset',
        copy: 'Copy',
        import: 'Import',
        delete: 'Delete',
        hide: 'Hidden',
        show: 'Show',
        position: 'Position',
        render: 'Render',
        large: 'large',
        default: 'default',
        small: 'small',
        always: 'always',
        never: 'never',
        hover: 'hover',
        click: 'click',
        button: 'button',
        year: 'year',
        month: 'month',
        date: 'date',
        dates: 'dates',
        week: 'week',
        datetime: 'datetime',
        'datetime-local': 'datetime',
        datetimerange: 'datetimerange',
        daterange: 'daterange',
        monthrange: 'monthrange',
        left: 'left',
        right: 'right',
        top: 'top',
        text: 'text',
        picture: 'picture',
        'picture-card': 'picture-card',
        center: 'center',
        vertical: 'vertical',
        horizontal: 'horizontal',
        manage: 'Manage',
        key: 'key',
        name: 'Name',
        value: 'value',
        inputData: 'Default value',
        append: 'Append',
        options: 'Options',
        option: 'Option',
        callback: 'Callback',
        style: 'Style',
        card: 'Card',
        _self: 'Current Window',
        _blank: 'New Window',
        _parent: 'Parent Window',
        _top: 'Top Window',
    },
    com: {
        cascader: {
            name: 'Cascader',
            event: {
                expandChange: 'Triggered when the expanded node changes',
                removeTag: 'In multi-select mode, triggered when Tag is removed'
            },
            props: {
                props: 'Options',
                placeholder: 'Placeholder',
                disabled: 'Disabled',
                clearable: 'Whether clearing options are supported',
                showAllLevels: 'Whether the full path of the selected value is displayed in the input box',
                collapseTags: 'Whether to collapse Tags in multi-select mode',
                collapseTagsTooltip: 'Whether to display all selected tags when the mouse hovers over the text of a collapsed tag',
                separator: 'Separator',
                filterable: 'Whether this option can be searched',
                tagType: 'Type',
            },
            propsOpt: {
                multiple: 'Whether there are multiple selections',
                expandTrigger: 'How to expand the secondary menu',
                checkStrictly: 'Whether it is strictly observed that parent and child nodes are not related to each other',
                emitPath: 'When the selected node changes, whether to return an array consisting of the values of the menus at each level where the node is located',
                value: 'The value of the specified option is an attribute value of the option object',
                label: 'Specify the option label as a certain attribute value of the option object',
                children: 'The child option of the specified option is a certain attribute value of the option object',
                disabled: 'The specified option is disabled as a certain attribute value of the option object',
                leaf: 'The flag bit of the leaf node of the specified option is an attribute value of the option object',
            }
        },
        checkbox: {
            name: 'Checkbox',
            props: {
                input: 'Whether to fill in',
                type: 'Type',
                disabled: 'Disabled',
                min: 'Minimum number that can be checked',
                max: 'The maximum number that can be checked',
                textColor: 'Font color when the button is active',
                fill: 'Border and background color when the button is active'
            }
        },
        col: {
            name: 'Col',
            props: {
                span: 'Number of columns occupied by grid',
                offset: 'Number of spaces on the left side of the grid',
                push: 'Move the grid to the right by the number of cells',
                pull: 'Move the grid to the left by the number of cells'
            }
        },
        colorPicker: {
            name: 'ColorPicker',
            event: {
                activeChange: 'Triggered when the color currently displayed in the panel changes'
            },
            props: {
                disabled: 'Disabled',
                showAlpha: 'Whether transparency selection is supported',
                colorFormat: 'Color format',
                predefine: 'Predefined color',
            }
        },
        datePicker: {
            name: 'Date',
            props: {
                pickerOptions: 'Options specific to the current time and date picker',
                readonly: 'Readonly',
                disabled: 'Disabled',
                type: 'Type',
                editable: 'Text box can be input',
                clearable: 'Whether to display the clear button',
                placeholder: 'Placeholder content for non-range selection',
                startPlaceholder: 'Placeholder content for the start date when selecting the range',
                endPlaceholder: 'Placeholder content for the end date when selecting a range',
                format: 'Format displayed in the input box',
                align: 'Alignment',
                rangeSeparator: 'Separator when selecting range',
                unlinkPanels: 'Unlink the two date panels in the range selector',
            }
        },
        dateRange: {
            name: 'DateRange',
        },
        timeRange: {
            name: 'TimeRange',
        },
        elAlert: {
            name: 'Alert',
            description: 'Description',
            props: {
                title: 'Title',
                type: 'Type',
                description: 'Supporting text',
                closable: 'Whether it can be closed',
                center: 'Whether the text is centered',
                closeText: 'Close button custom text',
                showIcon: 'Whether to display the icon',
                effect: 'Select a provided theme'
            }
        },
        elButton: {
            name: 'Button',
            props: {
                formCreateChild: 'Content',
                size: 'Size',
                type: 'Type',
                plain: 'Whether the button is plain',
                round: 'Whether the button has rounded corners',
                circle: 'Whether the button is round',
                loading: 'Whether it is loading status',
                disabled: 'Disabled',
            }
        },
        elCard: {
            name: 'Card',
            props: {
                header: 'Title',
                shadow: 'Shadow display timing',
            }
        },
        elCollapse: {
            name: 'Collapse',
            event: {
                change: 'Switch the currently active panel, its type is string in accordion mode and array in other modes',
            },
            props: {
                accordion: 'Whether it is in accordion mode'
            }
        },
        elCollapseItem: {
            name: 'CollapseItem',
            props: {
                title: 'Panel title',
                name: 'Identifier',
                disabled: 'Disabled',
            }
        },
        elDivider: {
            name: 'Divider',
            props: {
                formCreateChild: 'Set Content',
                contentPosition: 'Set content position'
            }
        },
        elTabPane: {
            name: 'TabPane',
            props: {
                label: 'Title',
                disabled: 'Disabled',
                name: 'Identifier of the tab',
                lazy: 'Whether the label is delayed in rendering'
            }
        },
        elTabs: {
            name: 'Tabs',
            event: {
                tabClick: 'Triggered when tab is selected',
                tabChange: 'Triggered when activeName changes',
                tabRemove: 'Triggered when the tab remove button is clicked',
                tabAdd: 'Triggered when a new tab button is clicked',
                edit: 'Triggered after clicking the add or remove button of the tab',
            },
            props: {
                type: 'Type',
                closable: 'Whether the label can be closed',
                tabPosition: 'Tab position',
                stretch: 'Whether the width of the label is self-stretching'
            }
        },
        elTag: {
            name: 'Tag',
            props: {
                formCreateNative: 'Whether to display title',
                formCreateTitle: 'Title',
                formCreateChild: 'Content',
                type: 'Type',
                size: 'Label size',
                effect: 'Label theme',
                closable: 'Whether it can be closed',
                disableTransitions: 'Whether to disable gradient animation',
                hit: 'Whether there is a border stroke',
                round: 'Whether it is round',
                color: 'Background color'
            }
        },
        elTransfer: {
            name: 'Transfer',
            event: {
                leftCheckChange: 'Triggered when the left list element is selected/unselected by the user',
                rightCheckChange: 'Triggered when the right list element is selected/unselected by the user'
            },
            props: {
                filterable: 'Is it searchable',
                filterPlaceholder: 'Search box placeholder',
                targetOrder: 'Sort strategy of list elements on the right',
                targetOrderInfo: 'If it is original, keep the same order as the data; if it is push, the newly added elements will be ranked last; if it is unshift, the newly added elements will be ranked first',
                titles: 'Title',
                buttonTexts: 'Set button content',
                props: 'Field alias of data source'
            }
        },
        elTreeSelect: {
            name: 'TreeSelect',
            event: {
                removeTag: 'Triggered when tag is removed in multi-select mode'
            },
            props: {
                multiple: 'Whether there are multiple selections',
                disabled: 'Disabled',
                clearable: 'Whether the option can be cleared',
                collapseTags: 'Whether to display the selected value as text during multi-selection',
                multipleLimit: 'The maximum number of items that the user can select during multiple selection, if it is 0, there is no limit',
                placeholder: 'Placeholder',
                props: 'Options',
                renderAfterExpand: 'Whether to render its child nodes after expanding a tree node for the first time',
                defaultExpandAll: 'Whether to expand all nodes by default',
                expandOnClickNode: 'Whether to expand or shrink nodes when clicking on them',
                checkOnClickNode: 'Whether to select the node when clicking the node',
                nodeKey: 'Each tree node is used as an attribute for unique identification, and the entire tree should be unique'
            }
        },
        elImage: {
            name: 'Image',
            props: {
                src: 'Image path'
            }
        },
        fcTitle: {
            name: 'Title',
            props: {
                title: 'Title',
                size: 'Size',
                align: 'Align'
            }
        },
        fcEditor: {
            name: 'Editor',
            props: {
                disabled: 'Disabled'
            }
        },
        fcRow: {
            name: 'Row',
            props: {
                gutter: 'Grid interval',
                type: 'Flex layout mode',
                justify: 'Horizontal arrangement under flex layout',
                align: 'Vertical arrangement under flex layout'
            }
        },
        fcTable: {
            name: 'Table',
            props: {
                border: 'Whether to display border',
                borderColor: 'Border color',
                borderWidth: 'Border width'
            }
        },
        fcTableGrid: {
            name: 'Grid',
        },
        signaturePad: {
            name: 'Signature',
            info: 'Callback function before removing signature, return false to prevent removal',
            props: {
                penColor: 'Line color',
                disabled: 'Disabled',
                beforeRemove: 'Before remove callback',
            }
        },
        group: {
            name: 'Subform',
            info: 'Callback function before removing subform item, return false to prevent removal',
            props: {
                type: 'Type',
                title: 'Title',
                disabled: 'Disabled',
                expand: 'Set the default expansion items',
                button: 'Whether to display the operation button',
                sortBtn: 'Whether to display the sort button',
                min: 'Set the minimum number of items to add',
                max: 'Set the maximum number of items to add',
                onBeforeRemove: 'Before remove callback',
            },
        },
        html: {
            name: 'HTML',
            props: {
                formCreateNative: 'Whether to display title',
                formCreateTitle: 'Title',
                formCreateChild: 'Content',
            }
        },
        input: {
            name: 'Input',
            event: {
                change: 'Triggered when the value changes, when the component loses focus or the user presses Enter',
            },
            props: {
                type: 'Type',
                maxlength: 'Maximum input length',
                minlength: 'Minimum input length',
                placeholder: 'Placeholder',
                clearable: 'Whether to display the clear button',
                disabled: 'Disabled',
                readonly: 'Readonly',
            }
        },
        inputNumber: {
            name: 'InputNumber',
            props: {
                precision: 'Precision of input value',
                min: 'Set the minimum value allowed for the counter',
                max: 'Set the maximum allowed value of the counter',
                step: 'Step',
                stepStrictly: 'Whether only multiples of step can be entered',
                disabled: 'Disabled',
                controls: 'Whether to use control buttons',
                controlsPosition: 'Control button position',
                placeholder: 'Placeholder'
            }
        },
        password: {
            name: 'Password',
            event: {
                change: 'Triggered when the value changes, when the component loses focus or the user presses Enter',
            },
            props: {
                disabled: 'Disabled',
                readonly: 'Readonly',
                maxlength: 'Maximum input length',
                minlength: 'Minimum input length',
                placeholder: 'Placeholder',
                clearable: 'Whether to display the clear button'
            }
        },
        radio: {
            name: 'Radio',
            props: {
                input: 'Whether to fill in',
                disabled: 'Disabled',
                type: 'Type',
                textColor: 'Text color when button form is activated',
                fill: 'Fill color and border color when the button form is activated'
            }
        },
        rate: {
            name: 'Rate',
            props: {
                max: 'Maximum score',
                disabled: 'Disabled',
                allowHalf: 'Whether to allow half selection',
                voidColor: 'Color of the icon when not selected',
                disabledVoidColor: 'The color of the icon when it is not selected when read-only',
                voidIconClass: 'Class name of the icon when not selected',
                disabledVoidIconClass: 'The class name of the icon when it is not selected when read-only',
                showScore: 'Whether to display the current score',
                textColor: 'Color of auxiliary text',
                scoreTemplate: 'Score display template'
            }
        },
        select: {
            name: 'Select',
            event: {
                removeTag: 'Triggered when tag is removed in multi-select mode'
            },
            props: {
                multiple: 'Whether there are multiple selections',
                disabled: 'Disabled',
                clearable: 'Whether the option can be cleared',
                collapseTags: 'Whether to display the selected value as text during multi-selection',
                multipleLimit: 'The maximum number of items that the user can select when multiple-selecting, if it is 0, there is no limit',
                placeholder: 'Placeholder',
                filterable: 'Is it searchable',
                allowCreate: 'Whether users are allowed to create new entries',
                noMatchText: 'Text displayed when no search conditions match',
                noDataText: 'Text displayed when option is empty',
                reserveKeyword: 'When multiple selections are searchable, whether to retain the current search keyword after selecting an option',
                defaultFirstOption: 'Press Enter in the input box and select the first matching item',
                remote: 'Whether the options are loaded remotely from the server',
                remoteMethod: 'Custom remote search methods',
            }
        },
        slider: {
            name: 'Slider',
            props: {
                min: 'Minimum value',
                max: 'Maximum value',
                disabled: 'Disabled',
                step: 'Step',
                showInput: 'Whether to display the input box, it is only valid during non-range selection',
                showInputControls: 'Whether to display the control buttons of the input box when the input box is displayed',
                showStops: 'Whether to display discontinuities',
                range: 'Whether it is a range selection',
                vertical: 'Whether portrait mode',
                height: 'Slider height, required in portrait mode'
            }
        },
        space: {
            name: 'Space',
            props: {
                height: 'Height',
            }
        },
        subForm: {
            name: 'Group',
            props: {
                disabled: 'Disabled',
                syncDisabled: 'Whether to force synchronization of the disabled state with the subform'
            }
        },
        switch: {
            name: 'Switch',
            props: {
                disabled: 'Disabled',
                width: 'Width (px)',
                activeText: 'Text description when opening',
                inactiveText: 'Text description when closing',
                activeValue: 'Value when opening',
                inactiveValue: 'Value when closed',
                activeColor: 'Background color when opening',
                inactiveColor: 'Background color when closed'
            }
        },
        tableForm: {
            name: 'TableForm',
            props: {
                disabled: 'Disabled',
                filterEmptyColumn: 'Whether to filter empty rows',
                max: 'Maximum number of rows to add, if 0, there is no limit',
                min: 'Minimum number of rows to add',
                addable: 'Allow to add',
                deletable: 'Allow delete',
            }
        },
        tableFormColumn: {
            name: 'TableFormColumn',
            label: 'TableFormColumn',
            props: {
                align: 'Align',
                label: 'Title',
                width: 'Width',
                color: 'Color',
                required: 'Whether to display required asterisks',
            }
        },
        text: {
            name: 'Text',
            props: {
                formCreateNative: 'Whether to display title',
                formCreateTitle: 'Title',
                formCreateChild: 'Content'
            }
        },
        textarea: {
            name: 'Textarea',
            event: {
                change: 'Triggered when the value changes, when the component loses focus or the user presses Enter',
            },
            props: {
                disabled: 'Disabled',
                readonly: 'Readonly',
                maxlength: 'Maximum input length',
                minlength: 'Minimum input length',
                showWordLimit: 'Whether to display word count statistics',
                placeholder: 'Placeholder',
                rows: 'Number of input box rows',
                autosize: 'Whether the height is adaptive'
            }
        },
        timePicker: {
            name: 'Time',
            props: {
                pickerOptions: 'Options specific to the current time and date picker',
                readonly: 'Readonly',
                disabled: 'Disabled',
                editable: 'Text box can be input',
                clearable: 'Whether to display the clear button',
                placeholder: 'Placeholder content for non-range selection',
                startPlaceholder: 'Placeholder content for the start date when selecting the range',
                endPlaceholder: 'Placeholder content for the start date when selecting the range',
                isRange: 'Whether to select a time range',
                arrowControl: 'Whether to use arrows for time selection',
                align: 'Align'
            }
        },
        tree: {
            name: 'Tree',
            event: {
                nodeClick: 'Triggered when the node is clicked',
                nodeContextmenu: 'This event will be triggered when a node is right-clicked',
                checkChange: 'Triggered when the check box is clicked',
                check: 'Triggered after clicking the node checkbox',
                currentChange: 'Event triggered when the currently selected node changes',
                nodeExpand: 'Event triggered when a node is expanded',
                nodeCollapse: 'Event triggered when a node is closed',
                nodeDragStart: 'Event triggered when a node starts dragging',
                nodeDragEnter: 'Event triggered when dragging into other nodes',
                nodeDragLeave: 'Event triggered when dragging leaves a node',
                nodeDragOver: 'Event triggered when dragging a node',
                nodeDragEnd: 'Event triggered when drag ends',
                nodeDrop: 'Event triggered when drag and drop is successfully completed'
            },
            props: {
                emptyText: 'Text displayed when the content is empty',
                props: 'Options',
                renderAfterExpand: 'Whether to render its child nodes after expanding a tree node for the first time',
                defaultExpandAll: 'Whether to expand all nodes by default',
                expandOnClickNode: 'Whether to expand or contract the node when clicking the node, if it is false, the node will only be expanded or contracted when the arrow icon is clicked. ',
                checkOnClickNode: 'Whether to select the node when clicking the node',
                autoExpandParent: 'Whether to automatically expand the parent node when expanding the child node',
                checkStrictly: 'When the check box is displayed, whether the parent and child are strictly not related to each other should be strictly followed',
                accordion: 'Whether to open only one sibling tree node for expansion at a time',
                indent: 'Horizontal indent (px) between adjacent level nodes',
                nodeKey: 'Each tree node is used as an attribute for unique identification, and the entire tree should be unique'
            }
        },
        upload: {
            name: 'Upload',
            info: 'After a successful upload, assign the returned URL to file.url or the result to file.value for use in subsequent form submissions.',
            event: {
                remove: 'Triggered when a file is removed from the file list',
                preview: 'Triggered when clicking an uploaded file in the file list',
                error: 'Triggered when file upload fails',
                progress: 'Triggered when file is uploaded',
                exceed: 'Triggered when the limit is exceeded'
            },
            props: {
                listType: 'Upload type',
                multiple: 'Whether multiple selection of files is supported',
                action: 'Upload address (required)',
                beforeUpload: 'Triggered before uploading a file',
                onSuccess: 'Triggered when the upload is successful',
                beforeRemove: 'Triggered before deleting a file',
                headers: 'Set upload request headers',
                data: 'Extra parameters attached when uploading',
                name: 'Uploaded file field name',
                withCredentials: 'Support sending cookie credential information',
                accept: 'Accept uploaded file types',
                autoUpload: 'Whether to upload the file immediately after selecting it',
                disabled: 'Disabled',
                limit: 'Maximum number of uploads allowed'
            }
        },
        fcDynamicRender: {
            name: 'Vue Component',
            info: 'Supports Vue single-file component format, including template, script, and style',
            props: {
                vueContent: 'Complete Vue SFC code content',
                formCreateInject: 'form-create injected data'
            },
            event: {
                mounted: 'Triggered after component mount',
                error: 'Triggered on render error'
            }
        },
        QrCodeBox: {
            name: 'QR Code',
            info: 'Generate QR code image for information encoding',
            props: {
                value: 'QR code content',
                size: 'QR code size (px)',
                colorDark: 'Dark color',
                colorLight: 'Light color',
                correctLevel: 'Error correction level'
            },
            event: {
                mounted: 'Triggered after component mount'
            }
        },
        BarCodeBox: {
            name: 'Barcode',
            info: 'Generate barcode for product encoding',
            props: {
                value: 'Barcode content',
                format: 'Barcode format',
                lineColor: 'Line color',
                width: 'Width',
                height: 'Height',
                displayValue: 'Display value',
                textAlign: 'Text alignment'
            },
            event: {
                mounted: 'Triggered after component mount'
            }
        },
        StepForm: {
            name: 'Step Form',
            info: 'Display form content in steps, guide user to fill in step by step',
            props: {
                activeStep: 'Current step',
                showSteps: 'Show step bar',
                simple: 'Simple mode',
                finishBtnText: 'Finish button text',
                validateOnChange: 'Validate on change'
            },
            event: {
                'step-change': 'Triggered when step changes',
                finish: 'Triggered when form is finished'
            }
        },
        IframeBox: {
            name: 'Iframe',
            info: 'Embed external web page content in the form',
            props: {
                src: 'Page URL',
                width: 'Width',
                height: 'Height',
                loading: 'Show loading state',
                showLoading: 'Show loading animation',
                allowFullscreen: 'Allow fullscreen'
            },
            event: {
                load: 'Triggered when page loads successfully',
                error: 'Triggered when page fails to load',
                mounted: 'Triggered after component mount'
            }
        },
        StyleEditor: {
            name: 'Style Editor',
            info: 'Visual style editor',
            props: {
                width: 'Width',
                height: 'Height',
                color: 'Text color',
                backgroundColor: 'Background color',
                borderRadius: 'Border radius',
                boxShadow: 'Shadow',
                margin: 'Margin',
                padding: 'Padding'
            }
        },
        ConfigPanel: {
            name: 'Config Panel',
            info: 'Comprehensive configuration panel',
            props: {
                title: 'Title',
                field: 'Field name',
                defaultValue: 'Default value',
                placeholder: 'Placeholder',
                disabled: 'Disabled',
                readOnly: 'Read only',
                clearable: 'Clearable',
                required: 'Required',
                validateType: 'Validate type',
                pattern: 'Regular expression',
                min: 'Minimum',
                max: 'Maximum',
                minLength: 'Minimum length',
                maxLength: 'Maximum length'
            }
        },
        ControlConfig: {
            name: 'Linkage Config',
            info: 'Configure form linkage conditions',
            props: {
                field: 'Field',
                operator: 'Operator',
                value: 'Value',
                logic: 'Logic relation'
            }
        },
        FcEcharts: {
            name: 'Chart',
            info: 'Display data visualization charts using ECharts',
            props: {
                width: 'Width',
                height: 'Height',
                theme: 'Theme',
                loading: 'Loading state',
                autoResize: 'Auto resize',
                options: 'Chart options'
            },
            event: {
                click: 'Triggered when clicking on data point',
                legendselectchanged: 'Triggered when legend selection changes',
                datazoom: 'Triggered when zoom area changes',
                finished: 'Triggered when rendering completes',
                mounted: 'Triggered after component mount'
            }
        },
        ApiKeyInput: {
            name: 'API Key',
            info: 'Input component for API keys with validation support',
            props: {
                placeholder: 'Placeholder',
                disabled: 'Disabled',
                clearable: 'Clearable',
                showPassword: 'Show password',
                showValidation: 'Show validation',
                validationUrl: 'Validation URL',
                validateField: 'Validation field',
                errorMsg: 'Error message'
            },
            event: {
                validate: 'Triggered when validating API key',
                'validation-success': 'Triggered when validation succeeds',
                'validation-fail': 'Triggered when validation fails'
            }
        },
        NestedForm: {
            name: 'Nested Form',
            info: 'Nested form container that supports multiple levels of subforms',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                required: 'Required',
                min: 'Minimum items',
                max: 'Maximum items',
                showAdd: 'Show add button',
                showDelete: 'Show delete button',
                sortable: 'Sortable',
                expandable: 'Expandable items',
                addBtnText: 'Add button text',
                showPagination: 'Show pagination',
                pageSize: 'Page size'
            },
            event: {
                add: 'Triggered when item is added',
                remove: 'Triggered when item is removed',
                expand: 'Triggered when item is expanded/collapsed',
                'page-change': 'Triggered when page changes'
            }
        },
        PrintForm: {
            name: 'Print Form',
            info: 'Print-friendly form renderer with print and preview functionality',
            props: {
                title: 'Title',
                subtitle: 'Subtitle',
                disabled: 'Disabled',
                showHeader: 'Show header',
                showFooter: 'Show footer',
                showActions: 'Show actions',
                showPrintTime: 'Show print time',
                showPage: 'Show page info',
                paperSize: 'Paper size',
                orientation: 'Orientation',
                margin: 'Margin',
                printUrl: 'Print service URL'
            },
            event: {
                print: 'Triggered when printing',
                preview: 'Triggered when preview is opened'
            }
        },
        FcFlow: {
            name: 'Flowchart',
            info: 'Display flowcharts and diagrams using Mermaid',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                editable: 'Editable',
                showHeader: 'Show header',
                loading: 'Loading',
                diagramType: 'Diagram type',
                direction: 'Direction',
                theme: 'Theme',
                height: 'Height'
            },
            event: {
                click: 'Triggered when clicking on a node',
                rendered: 'Triggered when diagram is rendered'
            }
        },
        fcFlow: {
            loading: 'Loading diagram...',
            renderError: 'Failed to render diagram',
            editDiagram: 'Edit Diagram',
            preview: 'Preview'
        },
        FcMarkdown: {
            name: 'Markdown',
            info: 'Display and edit markdown content',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                editable: 'Editable',
                showHeader: 'Show header',
                showFooter: 'Show footer',
                showToolbar: 'Show toolbar',
                editorRows: 'Editor rows'
            },
            event: {
                change: 'Triggered when content changes',
                rendered: 'Triggered when markdown is rendered',
                copy: 'Triggered when content is copied'
            }
        },
        fcMarkdown: {
            words: 'Words',
            readTime: 'Read time',
            minutes: 'min'
        },
        InfiniteForm: {
            name: 'Infinite Form',
            info: 'Virtual scrolling form for large datasets',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                multiple: 'Multiple select',
                showHeader: 'Show header',
                showFooter: 'Show footer',
                showActions: 'Show actions',
                showInfo: 'Show info',
                remoteLoad: 'Remote load',
                loadUrl: 'Load URL',
                pageSize: 'Page size',
                itemHeight: 'Item height',
                itemKey: 'Item key field',
                itemTitle: 'Item title field'
            },
            event: {
                change: 'Triggered when selection changes',
                load: 'Triggered when data is loaded',
                select: 'Triggered when item is selected',
                confirm: 'Triggered when confirm button is clicked',
                scroll: 'Triggered when scrolling'
            }
        },
        infiniteForm: {
            total: 'Total',
            loaded: 'Loaded',
            loading: 'Loading...',
            finished: 'No more data',
            loadMore: 'Load more'
        },
        DataTable: {
            name: 'Data Table',
            info: 'Advanced data table with sorting, filtering, and pagination',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showActions: 'Show actions',
                showSelection: 'Show selection',
                showIndex: 'Show index',
                showExport: 'Show export',
                showPagination: 'Show pagination',
                stripe: 'Stripe',
                border: 'Border',
                size: 'Size',
                remoteData: 'Remote data',
                remoteUrl: 'Remote URL',
                pageSize: 'Page size'
            },
            event: {
                'selection-change': 'Triggered when selection changes',
                'row-click': 'Triggered when row is clicked',
                'cell-click': 'Triggered when cell is clicked',
                'sort-change': 'Triggered when sort changes',
                'filter-change': 'Triggered when filter changes',
                edit: 'Triggered when edit button is clicked',
                delete: 'Triggered when delete button is clicked',
                refresh: 'Triggered when refresh is clicked',
                export: 'Triggered when export is clicked'
            }
        },
        dataTable: {
            operations: 'Operations',
            columnConfig: 'Column Config'
        },
        VideoBox: {
            name: 'Video',
            info: 'Video player component',
            props: {
                title: 'Title',
                src: 'Video URL',
                poster: 'Poster URL',
                disabled: 'Disabled',
                controls: 'Show controls',
                autoplay: 'Autoplay',
                loop: 'Loop',
                muted: 'Muted',
                showHeader: 'Show header',
                showCustomControls: 'Custom controls',
                height: 'Height'
            },
            event: {
                play: 'Triggered when video plays',
                pause: 'Triggered when video pauses',
                ended: 'Triggered when video ends',
                timeupdate: 'Triggered when time updates',
                error: 'Triggered when error occurs'
            }
        },
        videoBox: {
            notSupported: 'Your browser does not support the video tag',
            noVideo: 'No video',
            selectVideo: 'Select Video'
        },
        AudioBox: {
            name: 'Audio',
            info: 'Audio player component',
            props: {
                title: 'Title',
                src: 'Audio URL',
                trackName: 'Track name',
                artist: 'Artist',
                artwork: 'Artwork URL',
                disabled: 'Disabled',
                autoplay: 'Autoplay',
                loop: 'Loop',
                showHeader: 'Show header',
                showAlbumArt: 'Show album art',
                showRateControl: 'Show rate control'
            },
            event: {
                play: 'Triggered when audio plays',
                pause: 'Triggered when audio pauses',
                ended: 'Triggered when audio ends',
                timeupdate: 'Triggered when time updates',
                error: 'Triggered when error occurs'
            }
        },
        audioBox: {
            notSupported: 'Your browser does not support the audio tag',
            noAudio: 'No audio',
            selectAudio: 'Select Audio',
            unknownTrack: 'Unknown Track'
        },
        FcCity: {
            name: 'City Picker',
            info: 'China city/region picker with cascading selection',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                clearable: 'Clearable',
                filterable: 'Filterable',
                showAllLevels: 'Show all levels',
                areaCode: 'Return area code',
                level: 'Level',
                size: 'Size',
                dataType: 'Data type'
            },
            event: {
                change: 'Triggered when selection changes',
                'expand-change': 'Triggered when panel expands',
                blur: 'Triggered when blur',
                focus: 'Triggered when focus',
                'visible-change': 'Triggered when visibility changes'
            }
        },
        FcAiPanel: {
            name: 'AI Assistant',
            info: 'AI-powered chat assistant for form generation',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showHeader: 'Show header',
                apiKey: 'API Key',
                apiUrl: 'API URL',
                model: 'Model',
                maxLength: 'Max length'
            },
            event: {
                send: 'Triggered when message is sent',
                clear: 'Triggered when history is cleared',
                'generate-form': 'Triggered when form is generated'
            }
        },
        imageBox: {
            noImage: 'No image',
            selectImage: 'Select Image',
            loading: 'Loading...',
            error: 'Failed to load image'
        },
        ImageBox: {
            name: 'Image',
            info: 'Image display and upload component',
            props: {
                title: 'Title',
                src: 'Image URL',
                alt: 'Alt text',
                caption: 'Caption',
                fit: 'Fit mode',
                disabled: 'Disabled',
                lazy: 'Lazy load',
                showHeader: 'Show header',
                editable: 'Editable',
                deletable: 'Deletable',
                uploadable: 'Uploadable',
                height: 'Height'
            },
            event: {
                load: 'Triggered when image loads',
                error: 'Triggered when error occurs',
                click: 'Triggered when clicked',
                preview: 'Triggered when preview is opened',
                change: 'Triggered when image changes'
            }
        },
        DynamicComponent: {
            name: 'Dynamic Component',
            info: 'Dynamically load and render Vue components',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                componentName: 'Component name',
                lazy: 'Lazy load'
            },
            event: {
                ready: 'Triggered when component is loaded',
                error: 'Triggered when load error occurs',
                mounted: 'Triggered when component is mounted'
            }
        },
        ToolsBar: {
            name: 'Tools Bar',
            info: 'Toolbar with buttons, dropdowns, and search',
            props: {
                title: 'Title',
                showMore: 'Show more menu',
                moreThreshold: 'More threshold'
            },
            event: {
                click: 'Triggered when button is clicked',
                command: 'Triggered when dropdown item is selected',
                search: 'Triggered when search is executed',
                input: 'Triggered when input changes'
            }
        },
        globalVariableConfig: {
            add: 'Add Variable',
            name: 'Name',
            value: 'Value',
            description: 'Description',
            scope: 'Scope',
            actions: 'Actions',
            namePlaceholder: 'Variable name',
            valuePlaceholder: 'Variable value',
            descriptionPlaceholder: 'Description (optional)',
            tips: 'Global variables can be referenced in form rules using ${variableName}',
            system: 'System'
        },
        GlobalVariableConfig: {
            name: 'Global Variables',
            info: 'Configure global variables for form rules'
        },
        globalClassConfig: {
            add: 'Add Class',
            namePlaceholder: 'Class name',
            contentPlaceholder: 'CSS rules',
            preview: 'Preview',
            previewText: 'Preview text',
            empty: 'No custom CSS classes defined'
        },
        GlobalClassConfig: {
            name: 'Global CSS Classes',
            info: 'Define custom CSS classes for form components'
        },
        globalFetchConfig: {
            add: 'Add API',
            namePlaceholder: 'API name',
            url: 'URL',
            method: 'Method',
            headers: 'Headers',
            urlPlaceholder: 'API endpoint URL',
            headersPlaceholder: 'JSON format headers',
            test: 'Test',
            result: 'Result',
            empty: 'No global APIs configured'
        },
        GlobalFetchConfig: {
            name: 'Global API Fetch',
            info: 'Configure global API endpoints for data fetching'
        },
        DataView: {
            name: 'Data View',
            info: 'Display data in multiple view modes (list, card, stats)',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showHeader: 'Show header',
                showPagination: 'Show pagination',
                refreshable: 'Refreshable',
                viewMode: 'View mode',
                remoteData: 'Remote data',
                remoteUrl: 'Remote URL',
                pageSize: 'Page size'
            },
            event: {
                click: 'Triggered when item is clicked',
                refresh: 'Triggered when refresh is clicked',
                change: 'Triggered when page changes',
                error: 'Triggered when error occurs'
            }
        },
        dataView: {
            loading: 'Loading...',
            loadError: 'Failed to load data'
        },
        InfiniteTableForm: {
            name: 'Infinite Table Form',
            info: 'Table with virtual scrolling and inline editing',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                addable: 'Addable',
                editable: 'Editable',
                deletable: 'Deletable',
                showSelection: 'Show selection',
                showIndex: 'Show index',
                showPagination: 'Show pagination',
                stripe: 'Stripe',
                border: 'Border',
                height: 'Height',
                remoteData: 'Remote data',
                remoteUrl: 'Remote URL',
                pageSize: 'Page size'
            },
            event: {
                add: 'Triggered when row is added',
                edit: 'Triggered when edit button is clicked',
                delete: 'Triggered when row is deleted',
                'selection-change': 'Triggered when selection changes',
                'cell-change': 'Triggered when cell value changes'
            }
        },
        infiniteTableForm: {
            add: 'Add Row',
            actions: 'Actions'
        },
        NestedTableForm: {
            name: 'Nested Table Form',
            info: 'Table with expandable child rows',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                addable: 'Addable',
                editable: 'Editable',
                deletable: 'Deletable',
                expandable: 'Expandable',
                defaultExpandAll: 'Expand all by default',
                showSelection: 'Show selection',
                showIndex: 'Show index',
                stripe: 'Stripe',
                border: 'Border',
                height: 'Height'
            },
            event: {
                add: 'Triggered when row is added',
                edit: 'Triggered when edit button is clicked',
                delete: 'Triggered when row is deleted',
                'add-child': 'Triggered when child row is added',
                'delete-child': 'Triggered when child row is deleted',
                'expand-change': 'Triggered when expand state changes',
                'selection-change': 'Triggered when selection changes'
            }
        },
        nestedTableForm: {
            add: 'Add',
            addChild: 'Add Child',
            actions: 'Actions',
            expandAll: 'Expand All',
            collapseAll: 'Collapse All'
        },
        AiChat: {
            name: 'AI Chat',
            info: 'AI chat interface for interacting with AI assistants',
            props: {
                title: 'Title',
                apiKey: 'API Key',
                model: 'Model',
                placeholder: 'Placeholder',
                disabled: 'Disabled',
                showHistory: 'Show history',
                showClear: 'Show clear button',
                maxMessages: 'Max messages',
                temperature: 'Temperature'
            },
            event: {
                send: 'Triggered when message is sent',
                error: 'Triggered on error'
            }
        },
        aiChat: {
            placeholder: 'Ask AI...',
            send: 'Send',
            clear: 'Clear chat',
            thinking: 'AI is thinking...',
            error: 'Failed to get response',
            noApiKey: 'Please configure API key first'
        },
        Dataset: {
            name: 'Dataset',
            info: 'Dataset management component with import/export capabilities',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showImport: 'Show import',
                showExport: 'Show export',
                showRefresh: 'Show refresh',
                showClear: 'Show clear',
                showPagination: 'Show pagination',
                importUrl: 'Import URL',
                exportUrl: 'Export URL',
                pageSize: 'Page size'
            },
            event: {
                import: 'Triggered when import is complete',
                export: 'Triggered when export is requested',
                refresh: 'Triggered when refresh is clicked',
                clear: 'Triggered when clear is clicked'
            }
        },
        dataset: {
            import: 'Import',
            export: 'Export',
            refresh: 'Refresh',
            clear: 'Clear',
            importSuccess: 'Import completed successfully',
            importError: 'Import failed',
            exportSuccess: 'Export completed',
            clearConfirm: 'Are you sure you want to clear all data?',
            noData: 'No data available'
        },
        AiTool: {
            name: 'AI Tool',
            info: 'AI configuration and quick action tool',
            props: {
                apiKey: 'API Key',
                model: 'Model',
                temperature: 'Temperature',
                maxTokens: 'Max tokens',
                systemPrompt: 'System prompt',
                enabledTools: 'Enabled tools'
            },
            event: {
                execute: 'Triggered when quick action is executed',
                save: 'Triggered when configuration is saved',
                test: 'Triggered when API key is tested'
            }
        },
        aiTool: {
            statusValid: 'Valid',
            statusInvalid: 'Invalid',
            apiKey: 'API Key',
            apiKeyPlaceholder: 'Enter your API key',
            testKey: 'Test Key',
            model: 'Model',
            temperature: 'Temperature',
            maxTokens: 'Max Tokens',
            systemPrompt: 'System Prompt',
            systemPromptPlaceholder: 'Enter system prompt for AI',
            quickActions: 'Quick Actions',
            tools: 'Tools',
            toolGenerateForm: 'Generate Form',
            toolGenerateRule: 'Generate Rule',
            toolOptimizePrompt: 'Optimize Prompt',
            toolTranslate: 'Translate',
            toolExplainField: 'Explain Field',
            actionGenerateForm: 'Generate Form',
            actionOptimize: 'Optimize',
            actionTranslate: 'Translate',
            actionExplain: 'Explain',
            saveConfig: 'Save',
            resetConfig: 'Reset',
            configSaved: 'Configuration saved'
        },
        GlobalEventConfig: {
            name: 'Global Event Config',
            info: 'Configure global events and actions',
            props: {
                events: 'Events'
            },
            event: {
                change: 'Triggered when configuration changes'
            }
        },
        globalEventConfig: {
            title: 'Global Event Configuration',
            addEvent: 'Add Event',
            event: 'Event',
            eventName: 'Event Name',
            eventNamePlaceholder: 'Enter event name',
            triggerType: 'Trigger Type',
            intervalMs: 'Interval (ms)',
            targetFields: 'Target Fields',
            targetsPlaceholder: 'Select target fields',
            condition: 'Condition',
            conditionPlaceholder: 'Enter condition expression',
            actions: 'Actions',
            actionValuePlaceholder: 'Enter action value',
            addAction: 'Add Action',
            noEvents: 'No events configured'
        },
        MStepForm: {
            name: 'Multi-Step Form',
            info: 'Multi-step form with progress tracking',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showActions: 'Show actions',
                showProgress: 'Show progress'
            },
            event: {
                'step-change': 'Triggered when step changes',
                submit: 'Triggered when form is submitted',
                change: 'Triggered when field values change'
            }
        },
        mStepForm: {
            prev: 'Previous',
            next: 'Next',
            submit: 'Submit',
            emptyStep: 'This step has no fields',
            stepProgress: 'Step {current} of {total}',
            submitSuccess: 'Form submitted successfully',
            fieldRequired: '{field} is required'
        },
        InfiniteTableFormView: {
            name: 'Infinite Table Form (View)',
            info: 'Preview mode for infinite table form',
            props: {
                title: 'Title',
                showIndex: 'Show index',
                showSelection: 'Show selection',
                showActions: 'Show actions',
                showPagination: 'Show pagination',
                height: 'Height',
                pageSize: 'Page size'
            },
            event: {
                add: 'Triggered when add is clicked',
                edit: 'Triggered when edit is clicked',
                delete: 'Triggered when delete is clicked',
                refresh: 'Triggered when refresh is clicked',
                change: 'Triggered when data changes'
            }
        },
        infiniteTableFormView: {
            title: 'Data Preview',
            index: '#',
            actions: 'Actions',
            addRow: 'Add Row',
            dataCount: '{visible} of {total} items displayed',
            rowAdded: 'Row added',
            rowDeleted: 'Row deleted'
        },
        NestedTableFormView: {
            name: 'Nested Table Form (View)',
            info: 'Preview mode for nested table form',
            props: {
                title: 'Title',
                showIndex: 'Show index',
                showActions: 'Show actions',
                rowKey: 'Row key',
                displayField: 'Display field'
            },
            event: {
                add: 'Triggered when add is clicked',
                edit: 'Triggered when edit is clicked',
                delete: 'Triggered when delete is clicked',
                'add-child': 'Triggered when child is added',
                'delete-child': 'Triggered when child is deleted',
                change: 'Triggered when data changes'
            }
        },
        nestedTableFormView: {
            title: 'Nested Data Preview',
            index: '#',
            actions: 'Actions',
            children: 'Children of {name}',
            addRoot: 'Add Root',
            addChild: 'Add Child',
            noChildren: 'No child items',
            expandAll: 'Expand All',
            collapseAll: 'Collapse All',
            dataCount: '{total} items',
            rowAdded: 'Root row added',
            childAdded: 'Child row added',
            rowDeleted: 'Row deleted',
            childDeleted: 'Child row deleted'
        },
        FcMermaid: {
            name: 'Mermaid Chart',
            info: 'Display charts and diagrams using Mermaid',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showHeader: 'Show header',
                diagramType: 'Diagram type',
                direction: 'Direction',
                theme: 'Theme',
                height: 'Height'
            },
            event: {
                rendered: 'Triggered when diagram is rendered',
                error: 'Triggered on error',
                edit: 'Triggered when edit button is clicked'
            }
        },
        fcMermaid: {
            renderSuccess: 'Diagram rendered successfully',
            renderError: 'Failed to render diagram',
            exportSuccess: 'Diagram exported successfully'
        },
        FcTdtMapPicker: {
            name: 'Map Location Picker',
            info: 'Pick location on TDT map',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showHeader: 'Show header',
                showAddress: 'Show address',
                showCoordinate: 'Show coordinate',
                height: 'Height',
                ak: 'API Key',
                center: 'Center',
                zoom: 'Zoom level',
                markerDraggable: 'Marker draggable'
            },
            event: {
                locate: 'Triggered when location is found',
                error: 'Triggered on error'
            }
        },
        fcTdtMapPicker: {
            addressPlaceholder: 'Selected address',
            latLng: 'Coordinates',
            addressCopied: 'Address copied to clipboard',
            locationFound: 'Location found',
            locationFailed: 'Failed to get location',
            geolocationNotSupported: 'Geolocation is not supported'
        },
        StepFormItem: {
            name: 'Step Form Item',
            info: 'Step form item with fields',
            props: {
                label: 'Label',
                description: 'Description',
                fields: 'Fields',
                isActive: 'Is active',
                isCompleted: 'Is completed',
                showExpand: 'Show expand',
                showActions: 'Show actions',
                showPrev: 'Show previous',
                showNext: 'Show next',
                showSubmit: 'Show submit'
            },
            event: {
                prev: 'Triggered when previous is clicked',
                next: 'Triggered when next is clicked',
                submit: 'Triggered when submit is clicked',
                expand: 'Triggered when expanded',
                collapse: 'Triggered when collapsed'
            }
        },
        stepFormItem: {
            expand: 'Expand',
            collapse: 'Collapse',
            prev: 'Previous',
            next: 'Next',
            submit: 'Submit',
            noFields: 'No fields in this step',
            fieldsCount: '{count} fields',
            submitSuccess: 'Step submitted successfully'
        },
        Signature: {
            name: 'Signature',
            info: 'Digital signature component',
            props: {
                title: 'Title',
                disabled: 'Disabled',
                showHeader: 'Show header',
                showPreview: 'Show preview',
                showTips: 'Show tips',
                width: 'Width',
                height: 'Height',
                lineWidth: 'Line width',
                strokeColor: 'Stroke color',
                backgroundColor: 'Background color'
            },
            event: {
                clear: 'Triggered when cleared',
                save: 'Triggered when saved'
            }
        },
        Signature: {
            clear: 'Clear',
            save: 'Save',
            placeholder: 'Sign here',
            preview: 'Preview:',
            tips: 'Use mouse or touch to sign above',
            saveSuccess: 'Signature saved',
            clearSuccess: 'Signature cleared'
        }
    },
};

export default En;

