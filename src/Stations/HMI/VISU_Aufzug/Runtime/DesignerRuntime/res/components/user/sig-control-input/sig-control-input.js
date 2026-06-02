import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import { UnitConversionMixin } from '../../sigmatek/sig-element-mixins/unit-conversion-mixin.js';
/****************************************************************************************************
 * @class LasalRuntimeSigInputElement
 * @classdesc Implements and exports the sig-control-input component.
 * @version 02.00.000
 * @extends LasalRuntimeSigElement
 * @extends {UnitConversionMixin(LasalRuntimeSigElement)}
 *
 * @property {String} activeLang The active language marker.
 * @property {HTMLElement} dashboardKeyboard The instance of a standalone keyboard linked to the input with the property keyboardid.
 * @property {Number} maxlength The max length of the input value.
 * @property {Object} constApi The saved reference to the SIG_CONST Api.
 * @property {Object} vmApi The reference to the ViewModel Api.
 * @property {Object} keyboardApi The reference to the Keyboard Api.
 * @property {Object} eventsApi The reference to the events Api.
 * @property {Object} eventMediatorApi The reference to the eventMediator Api.
 * @property {String} type Defines the type of the input (text, numeric, hex, ipv4, date-rt, time-rt).
 * @property {String} keyboardid Defines the keyboard ID that is supposed to be opened on click.
 * @property {String} titletext Defines the title text of the keyboard window.
 * @property {Boolean} writeonincrement Defines whether the increment and decrement buttons directly write the value.
 * @property {String} previewtext Defines the preview text of the input in the style class editor.
 * @property {Boolean} openkeyboardbeside If true, the runtime positions the opened keyboard window so it does not cover the input.
 * @property {Number} keyboardwindow The index of a keyboard window that should be opened by the input.
 * @property {String} format  Defines the date/time format of the value property.
 * @property {Boolean} updateonsamevalue If activated the data point, configured at value, is also written if the value doesn't change.
 *
****************************************************************************************************/
export class LasalRuntimeSigInputElement extends UnitConversionMixin(LasalRuntimeSigElement) {
    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @returns {string} The component's registered tag name.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    static get is() {
        return "sig-control-input";
    }
    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    static get importMeta() { return import.meta; }
    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    static get template() {
        return SigPolymer.html `
        <style include="sig-element-css">
            :host {
                /* Basic styling of the component */
                color: var(--theme-sig-control-input-color, inherit);
                background-color: var(--theme-sig-control-input-background-color, inherit);
                border-width: var(--theme-sig-control-input-border-width, 0px);
                border-color: var(--theme-sig-control-input-border-color, inherit);
                border-style: var(--theme-sig-control-input-border-style, none);
                border-top-left-radius: var(--theme-sig-control-input-border-radius-tl, var(--theme-sig-control-input-border-radius, 3px));
                border-top-right-radius: var(--theme-sig-control-input-border-radius-tr, var(--theme-sig-control-input-border-radius, 3px));
                border-bottom-right-radius: var(--theme-sig-control-input-border-radius-br, var(--theme-sig-control-input-border-radius, 3px));
                border-bottom-left-radius: var(--theme-sig-control-input-border-radius-bl, var(--theme-sig-control-input-border-radius, 3px));

                /* Basic box model settings */
                position: absolute;
                overflow: hidden;
                padding: 0px 0px;
                display: block;

                /* default offsets (bordergradient is not set) */
                --bordergradient-offset: 0px;
            }

            :host * {
                /* Reset margins and paddings for child elements and turn of text selection */
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }

            ::placeholder {
                color: var(--theme-sig-control-input-placeholder-color, rgba(142, 142, 142, 1));
                opacity: 1;
                font-family: inherit;
                font-size: inherit;
                text-decoration: inherit;
            }

            .clearfix:after {
                /* Import the global clearfix css mixin */
                @apply --clearfix
            }

            :host([iskeyboardopen]) {
                border-color: var(--theme-sig-control-input-activ-border-color, transparent);
            }

            /* BORDERGRADIENT DEPENDENCIES */
            :host([bordergradient][isdesignmode]),
            :host([bordergradient]:not([iskeyboardopen])),
            :host([bordergradientactiv][iskeyboardopen]) {
                border-width: 0px;
                --bordergradient-offset: calc(2*var(--theme-sig-control-input-border-width, 0px));
            }

            /* SIG-INPUT */
            .sig-input {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                text-decoration: inherit;
                position: relative;
            }

            :host([bordergradient]:not([iskeyboardopen])) .sig-input {
                padding: var(--theme-sig-control-input-border-width, 0px);
                background-image: linear-gradient(var(--theme-sig-control-input-border-color-direction, to bottom), var(--theme-sig-control-input-border-color, transparent), var(--theme-sig-control-input-border-color-stop, var(--theme-sig-control-input-border-color)));
            }

            :host([bordergradientactiv][iskeyboardopen]) .sig-input {
                padding: var(--theme-sig-control-input-border-width, 0px);
                background-image: linear-gradient(var(--theme-sig-control-input-activ-border-color-direction, to bottom), var(--theme-sig-control-input-activ-border-color, #fff), var(--theme-sig-control-input-activ-border-color-stop, var(--theme-sig-control-input-activ-border-color)));
            }

            /* SIG-INPUT-BACKGROUND */
            .sig-input-background {
                cursor: pointer;
                color: inherit;

                background-color: var(--theme-sig-control-input-background-color, inherit);
                background-image: var(--theme-sig-control-input-background-image, none),
                    linear-gradient(var(--theme-sig-control-input-background-color-direction, to bottom),
                    var(--theme-sig-control-input-background-color, inherit),
                    var(--theme-sig-control-input-background-color-stop, var(--theme-sig-control-input-background-color)));

                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: 100%;
                text-decoration: inherit;
            }

            :host([iskeyboardopen]) .sig-input-background {
                background-color: var(--theme-sig-control-input-value-active-background-color, inherit);
                background-image: var(--theme-sig-control-input-background-image, none),
                    linear-gradient(var(--theme-sig-control-input-active-background-color-direction, to bottom),
                    var(--theme-sig-control-input-value-active-background-color, inherit),
                    var(--theme-sig-control-input-value-active-background-color-stop, var(--theme-sig-control-input-value-active-background-color, inherit)));

                    color: var(--theme-sig-control-input-value-active-color, inherit);
            }

            :host([shadowactive]:not([iskeyboardopen])) .sig-input-background {
                box-shadow: inset 0 0 var(--theme-sig-control-input-shadow-size, 5px) var(--theme-sig-control-input-shadow-color, inherit);
            }

            :host([shadowactivactive][iskeyboardopen]) .sig-input-background {
                box-shadow: inset 0 0 var(--theme-sig-control-input-pressed-shadow-size, 5px) var(--theme-sig-control-input-pressed-shadow-color, inherit);
            }

            :host([unitposition="leftside"][unitactiv]) .sig-input-background {
                grid-template-columns: var(--theme-sig-control-input-grid-column-width-unit, 30%) calc(100% - var(--theme-sig-control-input-grid-column-width-unit, 30%));
            }

            :host([unitposition="rightside"][unitactiv]) .sig-input-background {
                grid-template-columns: calc(100% - var(--theme-sig-control-input-grid-column-width-unit, 30%)) var(--theme-sig-control-input-grid-column-width-unit, 30%);
            }

            :host([unitactiv][unitposition="lowerbottom"]) .sig-input-background {
                grid-template-rows: calc(100% - var(--theme-sig-control-input-grid-column-width-unit, 50%)) var(--theme-sig-control-input-grid-column-width-unit, 50%);
                
            }
            :host([unitactiv][unitposition="uppertop"]) .sig-input-background {
                grid-template-rows: var(--theme-sig-control-input-grid-column-width-unit, 50%) calc(100% - var(--theme-sig-control-input-grid-column-width-unit, 50%));
            }

            /* value field */
            .sig-input-field {
                cursor: pointer;
                color: inherit;

                /*avoid text select on longpress */
                pointer-events: none;                

                background-color: transparent;

                align-self: var(--theme-sig-control-input-value-vertical-align, center);
                text-align: var(--theme-sig-control-input-value-text-align, center);
                text-indent: 0px;
                border: none;
                outline: none;

                box-sizing: border-box;
                padding-right: var(--theme-sig-control-input-margin-leftright, 0px);
                padding-left: var(--theme-sig-control-input-margin-leftright, 0px);
                padding-top: var(--theme-sig-control-input-margin-top, 0px);
                padding-bottom: var(--theme-sig-control-input-margin-top, 0px);

                grid-column: 1;
                grid-row: 1;
                text-decoration: inherit;
                font-family: inherit;
                font-size: inherit;
                font-weight: inherit;
                font-style: inherit;
            }

            :host([unitactiv][unitposition="uppertop"]) .sig-input-field {
                grid-column: 1;
                grid-row: 2;
            }

            :host([unitactiv][unitposition="lowerbottom"]) .sig-input-field {
                grid-column: 1;
                grid-row: 1;
                
            }

            :host([unitactiv][unitposition="leftside"]) .sig-input-field {
                grid-column: 2;
                grid-row: 1;
            }

            :host([unitactiv][unitposition="rightside"]) .sig-input-field {
                grid-column: 1;
                grid-row: 1;
            }

            /* UNIT */
            .content {
                cursor: pointer;

                padding-right: var(--theme-sig-control-input-unit-margin-leftright, 5px) !important;
                padding-left: var(--theme-sig-control-input-unit-margin-leftright, 5px) !important;
                padding-bottom: var(--theme-sig-control-input-unit-margin-bottom, 5px);
                padding-top: var(--theme-sig-control-input-unit-margin-bottom, 5px);

                text-align: var(--theme-sig-control-input-unit-text-align, center);
                align-self: var(--theme-sig-control-input-unit-vertical-align, center);
                color: var(--theme-sig-control-input-unit-color, inherit);
                overflow: hidden;
                grid-column: 1;
                grid-row: 1;
            }

            :host([unitactiv][unitposition="uppertop"]) .content {
                grid-column: 1;
                grid-row: 1;
            }

            :host([unitactiv][unitposition="lowerbottom"]) .content {
                grid-column: 1;
                grid-row: 2;
            }

            :host([unitactiv][unitposition="leftside"]) .content {
                grid-column: 1;
                grid-row: 1;
            }

            :host([unitactiv][unitposition="rightside"]) .content {
                grid-column: 2;
                grid-row: 1;
            }
        </style>
        <div class="sig-input clearfix" on-tap="_showKeyboard">
            <div class="sig-input-background">
                <input type="text" id="siginput" size="10" class="sig-input-field" placeholder="[[placeholder]]"
                    value="{{valuec}}" autocomplete="off" spellcheck="false" readonly="readonly" />
                <template is="dom-if" if="[[unitactiv]]">
                    <div id="label" class="content">[[unittext]]</div>
                </template>
            </div>
        </div>
        `;
    }
    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    *
    * @readonly
    * @static
    * @returns {object} The defined Polymer properties.
    * @memberof LasalRuntimeSigInputElement
    *
    * @property {String}   value               - Defines the value of the component.
    * @property {String}   valuec              - Defines the computed value that is shown in the input field.
    * @property {Boolean}  ispassword          - Defines whether the input should be behave as a password field (characters shown as dots).
    * @property {Boolean}  iskeyboardopen      - Is true when the keyboard is opened.
    * @property {Boolean}  bordergradient      - Defines whether the border gradient is used.
    * @property {Boolean}  bordergradientactiv - Defines whether the active border gradient ist used.
    * @property {Boolean}  shadowactive        - Defines whether the shadow is shown.
    * @property {Boolean}  shadowactivactive   - Defines whether the active shadow is shown.
    * @property {Boolean}  unitactiv           - Defines whether the unit should be shown.
    * @property {String}   unitposition        - Defines the position of the unit.
    * @property {Boolean}   ignoremax          - True - ignores maximum of value.
    * @property {Boolean}   ignoremin          - True - ignores minimum of value.
    * @property {Number}   limitLow            - Lower limit of value.
    * @property {Number}   limitHigh           - Upper limit of value.
    *
    ****************************************************************************************************/
    static get properties() {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            value: {
                type: String,
                value: '',
                observer: "_stateChanged",
                notify: true
            },
            valuec: {
                type: String,
                value: '',
                computed: '_computeText(value,previewtext,isstylepreview,value_converted,format)'
            },
            ispassword: {
                type: Boolean,
                value: false,
                observer: '_makePassword'
            },
            iskeyboardopen: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bordergradient: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bordergradientactiv: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            shadowactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            shadowactivactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            unitactiv: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            unitposition: {
                type: String,
                value: 'rightside',
                reflectToAttribute: true
            },
            // Needed for attribute bindings on tag, defaults are in the constructor.
            type: { type: String },
            ignoremax: { type: Boolean },
            ignoremin: { type: Boolean },
            limitLow: { type: Number },
            limitHigh: { type: Number },
        };
        return props;
    }
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigInputElement.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    constructor() {
        super();
        this.activeLang = '';
        this.dashboardKeyboard = null;
        this.ignoremin = false;
        this.ignoremax = false;
        this.maxlength = 0;
        this.constApi = window.sigApi.SIG_CONST;
        this.vmApi = window.sigApi.vm;
        //this.keyboardApi = (window.sigApi && window.sigApi.keyboard) ? window.sigApi.keyboard : null;  // defined in unitConversionMixin
        this.eventMediatorApi = window.sigApi.eventMediator;
        this.eventsApi = window.sigApi.events;
        this.type = 'text';
        this.limitLow = 0;
        this.limitHigh = 0;
        this.keyboardid = '';
        this.titletext = '';
        this.writeonincrement = false;
        this.previewtext = '-- Input --';
        this.openkeyboardbeside = false;
        this.keyboardwindow = null;
        this.format = '';
        this.unittext = this.isdesignmode ? '[Unit]' : '';
        this.updateonsamevalue = false;
        this.addPredefProps([{
                src: 'value',
                dest: 'value_unconverted',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_UNCONVERTED_VALUE
            }, {
                src: 'value',
                dest: 'limitLow',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_LIMIT_LOW
            }, {
                src: 'value',
                dest: 'limitHigh',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_LIMIT_HIGH
            }, {
                src: 'value',
                dest: 'unittext',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_UNIT_TEXT
            }, {
                src: 'value',
                dest: 'titletext',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_TEXT1
            }, {
                src: 'value',
                dest: 'type',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_KEYBOARD_TYPE
            }, {
                src: 'value',
                dest: 'state',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_STATE
            }]);
    }
    /****************************************************************************************************
    * This callback is called after property values are set and local DOM is initialized.
    *
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    ready() {
        super.ready();
        //Set Language intially.
        this._switchLang();
    }
    /****************************************************************************************************
    * Called every time the runtime event LANGUAGE_CHG is fired. It switches the active language of the component.
    *
    * @return {Promise<void>} Returns a promise which resolves with undefined.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    async _switchLang() {
        this.activeLang = await this._getActiveLangAsync();
    }
    /****************************************************************************************************
     * Method gets called to check if property should be updated or not
     *
     * @param {string} property - property which should be checked
     * @param {boolean} originalResult - result of the original property update info
     * @param {any} value - new value
     * @param {any} old - old value
     * @return {boolean}
     * @memberof LasalRuntimeSigInputElement
     ****************************************************************************************************/
    sigShouldPropertyUpdate(property, originalResult, value, old) {
        if ((this.updateonsamevalue) && (property === 'value')) {
            return true;
        }
        return originalResult;
    }
    /****************************************************************************************************
    * Updates the property value of the component and dispatches the value-updated event.
    *
    * @param {(string)} newValue The new value of the property value.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    _updateValue(newValue) {
        this.value = newValue;
        this._dispatchEvent('value-updated');
    }
    /****************************************************************************************************
    * An observer method which sets the property ispassword.
    *
    * @param {boolean} newval The new value of the property ispassword.
    * @param {boolean} oldval The old value of the property ispassword.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    _makePassword(newval, oldval) {
        let type;
        if (newval !== undefined) {
            if (newval) {
                type = 'password';
            }
            else {
                type = 'text';
            }
            this.$.siginput.setAttribute('type', type);
        }
        else {
            this.$.siginput.setAttribute('type', '');
        }
    }
    /****************************************************************************************************
    * An observer method that runs every time the property value changes.
    *
    * @param {string} newstate The new value of the value property.
    * @param {string} oldstate The old value of the value property.
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    _stateChanged(newstate, oldstate) {
        if (oldstate !== undefined && oldstate !== '') {
            this._dispatchEvent('value-changed');
        }
    }
    /****************************************************************************************************
    * Shows the correct type of keyboard and updates the value once the keyboard value is submitted (Keyboard promise resolved).
    *
    * @memberof LasalRuntimeSigInputElement
    ****************************************************************************************************/
    _showKeyboard() {
        if (!this.isdesignmode) {
            //Determine what standalone keyboard is linked to the input by the keyboardid property.
            //The standalone keyboard must be in DOM, visible and with state:active otherwise it is null.
            if (this.keyboardid && this.keyboardid !== '' && this.context && !this.isdesignmode) {
                //Check whether keyboard is in DOM and visible. (Keyboard in CC is not found, because its ID is dynamic)
                const keyboardVM = (this.vmApi) ? this.vmApi.getVmById(this.keyboardid) : null;
                const keyboard = (keyboardVM) ? keyboardVM.getDomRef() : null;
                const stateIntacive = (this.constApi) ? this.constApi.CONTROL_STATE_INACTIVE : 2;
                const stateInvisibile = (this.constApi) ? this.constApi.CONTROL_STATE_INVISIBLE : 3;
                const isKeyboardHidden = (keyboard) ? keyboard.state === stateInvisibile || keyboard.state === stateIntacive : false;
                //Check whether parent is in DOM and visible (dashboard/window)
                const parentVM = (keyboardVM) ? keyboardVM.getParent() : null;
                const parent = (keyboardVM) ? parentVM?.getDomRef() : null;
                const isParentHidden = (parent) ? parent.hidden : true;
                //Save the dashboard keyboard only if it is visible.
                this.dashboardKeyboard = (keyboard && !isParentHidden && !isKeyboardHidden) ? keyboard : null;
            }
            //Only send the keyboard ID if the dashboard keyboard is in DOM and visible.
            const keyboardid = (this.dashboardKeyboard instanceof HTMLElement) ? this.keyboardid : undefined;
            if (this.value_converted !== undefined) {
                this.openKeyboardWithUnit('value');
                return;
            }
            if (this.keyboardApi) {
                if (this.keyboardwindow === null)
                    this.keyboardwindow = undefined;
                this.keyboardApi.open(this.type, this.titletext, {
                    keyboardplaceholder: this.placeholder,
                    keyboardmin: this.limitLow,
                    keyboardmax: this.limitHigh,
                    keyboardmaxlength: this.maxlength,
                    keyboardlang: this.activeLang,
                    ispassword: this.ispassword,
                    ignoremin: this.ignoremin,
                    ignoremax: this.ignoremax,
                    keyboardunittext: this.unittext,
                    writeonincrement: this.writeonincrement,
                    datapointtype: this.type
                }, this, 'value', this.keyboardwindow, this.openkeyboardbeside, keyboardid).then((value) => {
                    this._updateValue(value);
                }, () => {
                    //input update cancelled -> we do not need this information
                }).catch((error) => {
                    this._log('Error: ' + error.message, 'ERROR');
                });
            }
        }
    }
    /****************************************************************************************************
   * An observer method which returns the computed input text.
   *
   * @param {string} _value Text from the text list.
   * @param {string} _previewtext Preview text.
   * @param {string} value_converted Value after unit conversion.
   * @return {string} The computed text.
   * @memberof LasalRuntimeSigInputElement
   ****************************************************************************************************/
    _computeText(_value, _previewtext, _isstylepreview, value_converted, _format) {
        const finalvalue = (value_converted !== undefined) ? value_converted : _value;
        if (this.isdesignmode) {
            if (_format === 'none' || _format === undefined || _format === '') {
                return (finalvalue === '') ? _previewtext : finalvalue;
            }
            else {
                switch (_format) {
                    case "ipv4":
                        return "255.255.255.255";
                    case "hex":
                        return "0x1234ABCD";
                    default:
                        return _format;
                }
            }
        }
        else {
            return finalvalue;
        }
    }
}
customElements.define(LasalRuntimeSigInputElement.is, LasalRuntimeSigInputElement);
//# sourceMappingURL=sig-control-input.js.map