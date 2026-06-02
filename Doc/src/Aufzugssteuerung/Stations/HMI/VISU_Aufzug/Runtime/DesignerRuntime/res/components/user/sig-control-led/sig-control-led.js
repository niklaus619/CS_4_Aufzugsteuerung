import { LasalRuntimeSigElementLight, SigPolymer } from '../../sigmatek/sig-element-light/sig-element-light.js';
/****************************************************************************************************
* @export
* @class LasalRuntimeSigLed
* @classdesc Implements and exports the sig-control-led component.
* @version 02.00.000
* @extends {LasalRuntimeSigElementLight}
****************************************************************************************************/
export class LasalRuntimeSigLed extends LasalRuntimeSigElementLight {
    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @returns {string} The control's tag name.
    * @memberof LasalRuntimeSigLed
    ****************************************************************************************************/
    static get is() {
        return "sig-control-led";
    }
    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigLed
    ****************************************************************************************************/
    static get importMeta() {
        return import.meta;
    }
    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigLed
    ****************************************************************************************************/
    static get template() {
        return SigPolymer.html `
        <style include="sig-element-light-css">
            :host {
                /* Basic styling of the component */
                color: var(--theme-sig-control-led-color, inherit);

                border-width: var(--theme-sig-control-led-border-width, 1px);
                border-color: var(--theme-sig-control-led-border-color, #fff);
                border-style: var(--theme-sig-control-led-border-style, solid);
                border-top-left-radius: var(--theme-sig-control-led-border-radius-top-left, 0);
                border-bottom-left-radius: var(--theme-sig-control-led-border-radius-bottom-left, 0);
                border-top-right-radius: var(--theme-sig-control-led-border-radius-top-right, 0);
                border-bottom-right-radius: var(--theme-sig-control-led-border-radius-bottom-right, 0);

                /* Basic box model settings */
                display: block;
                position: absolute;
                overflow: hidden;
            }

            :host * {
                /* Reset margins and paddings for child elements and turn of text selection */
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .sig-control-led {
                color: inherit;
                display: table;
                width: 100%;
                height: 100%;
                position: relative;

                text-decoration: inherit;
                border: none;

                cursor: inherit;
            }

            #sig-control-led-foreground {
                /* Border (radius) hack - backgroundprops applied on Shadow-DOM Element */
                background-color: var(--theme-sig-control-led-background-color, #ccc);
                background-image: var(--theme-sig-control-led-background-image, none);
            }

            :host([showboxshadow]) #sig-control-led-foreground {
                box-shadow: inset 1px 1px 0px 0px rgba(255, 255, 255, .4), inset -1px -1px 0px 0px rgba(0, 0, 0, .2);
            }

            #sig-control-led-background {
                background-color: var(--theme-sig-control-led-pressed-background-color, #070);
                background-image: var(--theme-sig-control-led-pressed-background-image, var(--theme-sig-control-led-background-image, none));
            }

            :host([showboxshadow]) #sig-control-led-background {
                box-shadow: inset 1px 1px 0px 0px rgba(0, 0, 0, .4), inset -1px -1px 0px 0px rgba(255, 255, 255, .2);
            }

            :host([isdesignmode][preview]) #sig-control-led-foreground, 
            :host(:not([isdesignmode]):not([value="0"])) #sig-control-led-foreground {
                display: none;
            }

            :host([isdesignmode]:not([preview])) #sig-control-led-background,
            :host(:not([isdesignmode])[value="0"]) #sig-control-led-background {
                display: none;
            }

            .ledlabel {
                background-position-x: var(--theme-sig-control-led-background-position-x, center);
                background-position-y: var(--theme-sig-control-led-background-position-y, center);
                background-size: var(--theme-sig-control-led-background-size, cover);
                background-repeat: no-repeat;
                vertical-align: var(--theme-sig-control-led-vertical-align, middle);
                display: table-cell;
                width: 100%;
                height: 100%;
                text-decoration: inherit;
                border: none;
                border-radius: 0px;
            }
        </style>
        <div class="sig-control-led clearfix">
            <div id="sig-control-led-background" class="ledlabel"></div>
            <div id="sig-control-led-foreground" class="ledlabel"></div>
        </div>
        `;
    }
    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    *
    * @readonly
    * @static
    * @returns {object} The defined Polymer properties.
    * @memberof LasalRuntimeSigLed
    *
    * @property {Number} value           - Defines the value property of the component
    * @property {Boolean} showboxshadow  - Defines, if box shadow should be used
    * @property {Boolean} preview        - Preview the active led.
    ****************************************************************************************************/
    static get properties() {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            value: {
                type: Number,
                value: 0,
                reflectToAttribute: true,
            },
            showboxshadow: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            preview: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
        return props;
    }
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigLed.
    * @memberof LasalRuntimeSigLed
    ****************************************************************************************************/
    constructor() {
        super();
        this.addPredefProps([{
                src: 'value',
                dest: 'state',
                type: window.sigApi.SIG_CONST.PROP_PREDEF_PROPS_TYPE_STATE
            }]);
    }
}
customElements.define(LasalRuntimeSigLed.is, LasalRuntimeSigLed);
//# sourceMappingURL=sig-control-led.js.map