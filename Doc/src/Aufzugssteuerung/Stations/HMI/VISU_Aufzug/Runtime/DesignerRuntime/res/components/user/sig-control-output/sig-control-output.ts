import { LasalRuntimeSigElementLight, SigPolymer } from '../../sigmatek/sig-element-light/sig-element-light.js';
import { cssObject } from '../../sigmatek/sig-element-mixins/designer-support-mixin.js';
import { UnitConversionMixin } from '../../sigmatek/sig-element-mixins/unit-conversion-mixin.js';

/****************************************************************************************************
* @class 
* @classdesc Implements and exports the sig-control-output component.
* @version 02.00.000
* @extends LasalRuntimeSigElementLight
* 
* @property {String} value  The source of the output value.   
* @property {String} previewtext The preview title text for the style class editor of LVD.
* @property {String} unittext The unittext of the value.
* @property {Number} borderLeftWidth The left border width.
* @property {Number} borderRightWidth The right border width.
* @property {Number} borderBottomWidth The bottom border width.
* @property {Number} borderTopWidth The top border width.
****************************************************************************************************/
export class LasalRuntimeSigOutputElement extends UnitConversionMixin(LasalRuntimeSigElementLight) {

    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @returns {String} The component's tag name.
    * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    static get is(): string{
        return "sig-control-output";
    }

    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }
   
    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @type {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
            <style include="sig-element-light-css">
            :host {
            /* Basic styling of the component */
            color: var(--theme-sig-control-output-color, inherit);
            background-color: var(--theme-sig-control-output-background-color, inherit);
            border-width: var(--theme-sig-control-output-border-width, 0px);
            border-color: var(--theme-sig-control-output-border-color, inherit);
            border-style: var(--theme-sig-control-output-border-style, none);
            border-radius: var(--theme-sig-control-output-border-radius, 0);
            border-top-left-radius: var(--theme-sig-control-output-border-radius-tl, var(--theme-sig-control-output-border-radius, 0));
            border-top-right-radius: var(--theme-sig-control-output-border-radius-tr, var(--theme-sig-control-output-border-radius, 0));
            border-bottom-right-radius: var(--theme-sig-control-output-border-radius-br, var(--theme-sig-control-output-border-radius, 0));
            border-bottom-left-radius: var(--theme-sig-control-output-border-radius-bl, var(--theme-sig-control-output-border-radius, 0));

            /* Basic box model settings */
            display: block;
            position: absolute;
            overflow: hidden;

            --calc-width: 100%;
            --calc-height: 100%;
        }

        :host * {
            /* Reset margin and paddings for child elements and turn of text selection */
            @apply --notextselect;
            margin: 0;
            padding: 0;
        }

        :host([bordergradient]) {
            border-width: 0px;
        }

        .clearfix:after {
            @apply --clearfix
        }

        .sig-output-base {
            width: 100%;
            height: 100%;
            text-decoration: inherit;
            text-align: center;
            position: relative;
        }

        :host([bordergradient]) .sig-output-base {
            width: var(--calc-width, 100%);
            height: var(--calc-height, 100%);

            background-image: linear-gradient(var(--theme-sig-control-output-border-color-direction, to bottom), var(--theme-sig-control-output-border-color, #fff), var(--theme-sig-control-output-border-color-stop, var(--theme-sig-control-output-border-color)));
            padding: var(--theme-sig-control-output-border-width, 1px);
        }

        .sig-output {
            width: 100%;
            height: 100%;
            text-decoration: inherit;

            display: grid;
            grid-template-columns: 100%;

            background-color: var(--theme-sig-control-output-background-color, inherit);
            background-image: var(--theme-sig-control-output-background-image, none),
            linear-gradient(var(--theme-sig-control-output-background-color-direction, to bottom),
            var(--theme-sig-control-output-background-color, inherit),
            var(--theme-sig-control-output-background-color-stop, var(--theme-sig-control-output-background-color)));
        }

        :host([shadowactive]) .sig-output {
            box-shadow: inset 0 0 var(--theme-sig-control-output-shadow-size, 5px) var(--theme-sig-control-output-shadow-color, #000000);
        }

        :host([bordergradient]) .sig-output {
            border-radius: var(--theme-sig-control-output-border-radius, 3px);
            border-top-left-radius: var(--theme-sig-control-output-border-radius-tl, var(--theme-sig-control-output-border-radius, 3px));
            border-top-right-radius: var(--theme-sig-control-output-border-radius-tr, var(--theme-sig-control-output-border-radius, 3px));
            border-bottom-right-radius: var(--theme-sig-control-output-border-radius-br, var(--theme-sig-control-output-border-radius, 3px));
            border-bottom-left-radius: var(--theme-sig-control-output-border-radius-bl, var(--theme-sig-control-output-border-radius, 3px));
        }

        :host([unitposition="leftside"][unitactiv]) .sig-output {
            grid-template-columns: var(--theme-sig-control-output-grid-column-width-unit, 30%) calc(100% - var(--theme-sig-control-output-grid-column-width-unit, 30%));
        }

        :host([unitposition="rightside"][unitactiv]) .sig-output {
            grid-template-columns: calc(100% - var(--theme-sig-control-output-grid-column-width-unit, 30%)) var(--theme-sig-control-output-grid-column-width-unit, 30%);
        }

        :host([unitposition="lowerbottom"][unitactiv]) .sig-output {
            grid-template-rows: calc(100% - var(--theme-sig-control-output-grid-column-width-unit, 50%)) var(--theme-sig-control-output-grid-column-width-unit, 50%);
        }

        :host([unitposition="uppertop"][unitactiv]) .sig-output {
            grid-template-rows: var(--theme-sig-control-output-grid-column-width-unit, 50%) calc(100% - var(--theme-sig-control-output-grid-column-width-unit, 50%));
        }

        .content {
            position: relative;
            text-decoration: inherit;
            text-overflow: var(--theme-sig-control-output-text-overflow, clip);
            overflow: hidden;

            width: auto;
            height: auto;
            align-self: var(--theme-sig-control-output-value-vertical-align, center);
            text-align: var(--theme-sig-control-output-value-align, center);

            padding-right: var(--theme-sig-control-output-margin-leftright, 0px);
            padding-left: var(--theme-sig-control-output-margin-leftright, 0px);
            padding-bottom: var(--theme-sig-control-output-margin-top, 5px);
            padding-top: var(--theme-sig-control-output-margin-top, 5px);
            grid-column: 1;
            grid-row: 1;
        }

        :host([unitposition="lowerbottom"][unitactiv]) .content {
            padding-bottom: initial;
            padding-top: var(--theme-sig-control-output-margin-top, 5px);
            grid-column: 1;
            grid-row: 1;
        }

        :host([unitposition="uppertop"][unitactiv]) .content {
            padding-bottom: var(--theme-sig-control-output-margin-top, 5px);
            padding-top: initial;
            grid-column: 1;
            grid-row: 2;
        }

        :host([unitposition="rightside"][unitactiv]) .content {
            grid-column: 1;
            grid-row: 1;
            padding-bottom: var(--theme-sig-control-output-margin-top, 5px);
            padding-top: var(--theme-sig-control-output-margin-top, 5px);
        }

        :host([unitposition="leftside"][unitactiv]) .content {
            grid-column: 2;
            grid-row: 1;
            padding-bottom: var(--theme-sig-control-output-margin-top, 5px);
            padding-top: var(--theme-sig-control-output-margin-top, 5px);
        }

        .unitcontent {
            background-color: rgba(0, 0, 0, 0);
            text-align: var(--theme-sig-control-output-unit-text-align, center);
            color: var(--theme-sig-control-output-unit-color, inherit);
            overflow: hidden;

            width: auto;
            height: auto;
            position: relative;

            align-self: var(--theme-sig-control-output-unit-vertical-align, center);

            grid-column: 1;
            grid-row: 1;

            left: 0px;
            bottom: 0px;
            display:none;
        }

        :host([unitposition="uppertop"][unitactiv]) .unitcontent {
            grid-column: 1;
            grid-row: 1;
            padding-top: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-bottom: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-right: var(--theme-sig-control-output-unit-margin-leftright, 5px);
            padding-left: var(--theme-sig-control-output-unit-margin-leftright, 5px);
        }

        :host([unitposition="lowerbottom"][unitactiv]) .unitcontent {
            grid-column: 1;
            grid-row: 2;
            padding-top: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-bottom: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-right: var(--theme-sig-control-output-unit-margin-leftright, 5px);
            padding-left: var(--theme-sig-control-output-unit-margin-leftright, 5px);
        }

        :host([unitposition="leftside"][unitactiv]) .unitcontent {
            grid-column: 1;
            grid-row: 1;
            padding-bottom: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-top: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-right: var(--theme-sig-control-output-unit-margin-leftright, 5px);
            padding-left: var(--theme-sig-control-output-unit-margin-leftright, 5px);
        }

        :host([unitposition="rightside"][unitactiv]) .unitcontent {
            grid-column: 2;
            grid-row: 1;
            padding-bottom: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-top: var(--theme-sig-control-output-unit-margin-bottom, 5px);
            padding-right: var(--theme-sig-control-output-unit-margin-leftright, 5px);
            padding-left: var(--theme-sig-control-output-unit-margin-leftright, 5px);
        }

        :host([unitactiv]) .unitcontent {
            display:block;
        }
        </style>
        <div class="sig-output-base clearfix">
            <div class="sig-output">
                <div id="value" class="content">[[valuec]]</div>
                <div id="label" class="unitcontent">[[unittext]]</div>
            </div>
        </div>
    `;
    }

    //Polymer properties type definition
    valuec: string
    bordergradient: boolean
    shadowactive: boolean
    unitactiv: boolean
    unitposition: string
   
    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    *
    * @readonly
    * @static
    * @returns {object} The defined Polymer properties.
    * @memberof LasalRuntimeSigOutputElement
    * 
    * @property {String}   valuec              - Computed value.
    * @property {Boolean}  bordergradient      - Defines whether the border gradient is applied.
    * @property {Boolean}  shadowactiv         - Defines whether the box-shadow is applied on the component.
    * @property {Boolean}  unitactive          - Defines whether the unit text should be shown.
    * @property {String}   unitposition        - Defines the position of the unit text related to the value.
    ****************************************************************************************************/
    static get properties(): object {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            valuec: {
                type: String,
                value: '',
                computed: '_computeText(value,previewtext,value_converted,format)'
            },  
            bordergradient: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_calcDimensions'
            },
            shadowactive: {
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
            }
        }
        return props;
    }

    //Polymer properties type definition
    value: string
    unittext: string
    previewtext: string
    borderLeftWidth: number
    borderRightWidth: number
    borderBottomWidth: number
    borderTopWidth: number
   
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigOutputElement.
    * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    constructor() {
        super();

        //init value
        this.value = '';
        //init unittext
        this.unittext = '[Unit]';
        this.previewtext = '-- Output --';

        this.addPredefProps([{
            src: 'value',
            dest: 'value_unconverted',
            type: window.sigApi.SIG_CONST.PROP_PREDEF_PROPS_TYPE_UNCONVERTED_VALUE
        }, {
            src: 'value',
            dest: 'unittext',
            type: window.sigApi.SIG_CONST.PROP_PREDEF_PROPS_TYPE_UNIT_TEXT
        }]);
    }

    /****************************************************************************************************
    * An observer method which returns the computed input text.
    *
    * @param {string} _value Text from the text list.
    * @param {string} _previewtext Preview text.
    * @param {string} value_converted Value after unit conversion.
    * @param {string} _format Format
    * @return {string} The computed text.
    * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    _computeText(_value: string, _previewtext: string, value_converted: string, _format: string): string {
        const finalvalue = (value_converted !== undefined) ? value_converted : _value;
        if (this.isdesignmode) {
            if(_format === 'none' || _format === undefined || _format === '') {
                return (finalvalue === '') ? _previewtext : finalvalue;
            } else {
                switch (_format) {
                    case "ipv4":
                        return "255.255.255.255"
                    case "hex":
                        return "0x1234ABCD";
                    default:
                        return _format;
                }
            }
        } else {
            return finalvalue;
        }   
    }   

    /****************************************************************************************************
     * Called after property default values are set and local DOM is initialized.
     *
     * @memberof LasalRuntimeSigOutputElement
     ****************************************************************************************************/
     ready(): void {
        super.ready();

		// wait for next render in designer
		if (this.isdesignmode) {
			SigPolymer.afterNextRender(this, function (this: LasalRuntimeSigOutputElement) {
				this._calcDimensions();
			});
		} 
        else {
    		this._calcDimensions();			
		}
    }

    /****************************************************************************************************
     * Set css variables.
     *
     * @memberof LasalRuntimeSigOutputElement
     ****************************************************************************************************/
     _calcDimensions(): void{

        this._getBorderWidth();

        this.updateStyles({
            '--calc-width'   : String(this.offsetWidth - this.borderLeftWidth - this.borderRightWidth) + 'px',
            '--calc-height'   : String(this.offsetHeight - this.borderTopWidth - this.borderBottomWidth) + 'px',
        });
    }

    /****************************************************************************************************
     * Called when a CSS Variable is changed
     *
     * @param {object} cssObj An Object containing the changed CSS variables, and their values.
     * @param {boolean} [doBoundsCheck=false] Only relevant in designmode, leave as false.
     * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    sigApplyCSSValue(cssObj: cssObject, doBoundsCheck: boolean = false): void {
        super.sigApplyCSSValue(cssObj, doBoundsCheck);
        // value only changes in design mode
        if(this.isdesignmode) {
            if ((cssObj.hasOwnProperty('--theme-sig-control-output-border-width')) ||
                (cssObj.hasOwnProperty('--theme-sig-control-output-border-style'))) {
                this._calcDimensions();
            }
        }
    }

    /****************************************************************************************************
    * Method to get all the border width elements independent of the used shorthand style
    * @memberof LasalRuntimeSigOutputElement
    ****************************************************************************************************/
    _getBorderWidth(): void {
        const borderStyle = this.style.getPropertyValue('--theme-' + this.tagName.toLowerCase() + '-border-style');

        if (!this.bordergradient && ((borderStyle === "none") || (borderStyle === ""))) {
            this.borderTopWidth = this.borderRightWidth = this.borderBottomWidth = this.borderLeftWidth = 0;
            return;
        }

        let borderWidth = this.style.getPropertyValue('--theme-' + this.tagName.toLowerCase() + '-border-width');

        if (borderWidth === "") {
            this.borderTopWidth = this.borderRightWidth = this.borderBottomWidth = this.borderLeftWidth = 0;            
        } else {
            let values = borderWidth.split(' ');
        
            switch (values.length) {
                case 1: // "5px"
                    this.borderTopWidth = this.borderRightWidth = this.borderBottomWidth = this.borderLeftWidth = parseInt(values[0]);
                    break;
                case 2: // "1px 5px"
                    this.borderTopWidth = this.borderBottomWidth = parseInt(values[0]);
                    this.borderRightWidth = this.borderLeftWidth = parseInt(values[1]);
                    break;
                case 3: // "1px 5px 10px"
                    this.borderTopWidth = parseInt(values[0]);
                    this.borderRightWidth = this.borderLeftWidth = parseInt(values[1]);
                    this.borderBottomWidth = parseInt(values[2]);
                    break;
                case 4: // "1px 5px 10px 15px"
                    this.borderTopWidth = parseInt(values[0]);
                    this.borderRightWidth = parseInt(values[1]);
                    this.borderBottomWidth = parseInt(values[2]);
                    this.borderLeftWidth = parseInt(values[3]);
                    break;
                default: // invalid format => use no border
                    this.borderTopWidth = this.borderRightWidth = this.borderBottomWidth = this.borderLeftWidth = 0;
                    break;
            }
        }
    }       
}
customElements.define(LasalRuntimeSigOutputElement.is, LasalRuntimeSigOutputElement);
