// Import the Lasal Runtime base element into your component
// Import SigPolymer to use Polymer methods: html, afterNextRender, beforeNextRender, debouncer, timeOut
// or if your component's getter template() returns a HTML literal
import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';

/****************************************************************************************************
* @class
* @classdesc Implements and exports the sig-control-state-led component.
* @version 03.00.000
* @extends {LasalRuntimeSigElement}
*
* @property {Number} intervalHandle declares whether the Interval should get set or not.
****************************************************************************************************/
export class LasalRuntimeSigStateLed extends LasalRuntimeSigElement {

    /****************************************************************************************************
     * When the element is loaded, importMeta() assigns reference to the path from 
     * which an element was imported to its importPath property. 
     * Relative URLs in styles are automatically re-written to be relative to the importPath property. 
     * You can use [[importPath]] in your component to load url resources
    ****************************************************************************************************/

    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @type {ImportMeta} The import path URL
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    static get importMeta(): ImportMeta {
        return import.meta;
    }

    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @type {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                border-width: var(--theme-sig-control-state-led-border-width, 3px);
                border-color: var(--theme-sig-control-state-led-border-color, inherit);
                border-style: var(--theme-sig-control-state-led-border-style, solid);
                border-radius: var(--theme-sig-control-state-led-border-radius, 20px);
                border-top-left-radius: var(--theme-sig-control-state-led-border-radius-top-left, var(--theme-sig-control-state-led-border-radius, 20px));
                border-bottom-left-radius: var(--theme-sig-control-state-led-border-radius-bottom-left, var(--theme-sig-control-state-led-border-radius, 20px));
                border-top-right-radius: var(--theme-sig-control-state-led-border-radius-top-right, var(--theme-sig-control-state-led-border-radius, 20px));
                border-bottom-right-radius: var(--theme-sig-control-state-led-border-radius-bottom-right, var(--theme-sig-control-state-led-border-radius, 20px));

                display: block;
                position: absolute;
                overflow: hidden;
            }

            :host * {
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .sig-control-state-led {
                color: inherit;
                width: 100%;
                height: 100%;
                position: relative;     
            }
            
            #stateledinactive {
                background-color: var(--theme-sig-control-state-led-background-color, inherit);
                background-image: var(--theme-sig-control-state-led-background-image, none);
                border: none;
                border-radius: 0px;
            }

            #stateledactive {
                background-color: var(--theme-sig-control-state-led-pressed-background-color, inherit);
                background-image: var(--theme-sig-control-state-led-pressed-background-image, var(--theme-sig-control-state-led-background-image, none));
                border: none;
                border-radius: 0px;
            }

            .stateled {
                background-position-x: var(--theme-sig-control-state-led-background-position-x, center);
                background-position-y: var(--theme-sig-control-state-led-background-position-y, center);
                background-size: var(--theme-sig-control-state-led-background-size, contain);
                background-repeat: no-repeat;
                vertical-align: var(--theme-sig-control-state-led-vertical-align, middle);
                width: 100%;
                height: 100%;
            }

            :host(:not([ledstate="0"])) #stateledinactive {
                display: none;
            }

            :host([ledstate="0"]) #stateledactive {
                display: none;
            }

        </style>
        <div class="sig-control-state-led clearfix">
            <div id="stateledactive" class="stateled"></div>
            <div id="stateledinactive" class="stateled"></div>
        </div>
        `;
    }

    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @type {string} The component's registered tag name
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-state-led";
    }

    //Polymer properties type definition
    value: number
    ledstate: number
    ledinterval: number
    preview: boolean

    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    *
    * @readonly
    * @static
    * @return {object} The defined Polymer properties
    * @memberof LasalRuntimeSigStateLed
    * 
    * @property {String} value                  - Defines the value of the component.
    * @property {String} ledstate               - Defines the state of the led.
    * @property {String} ledinterval            - Defines the interval of the on/off time of the led.
    * @property {String} preview                - Defines if the preview of the active led gets shown.
    ****************************************************************************************************/
    static get properties(): object{
        // property names should always be lower case so we
        // can use them directly on the element as an attribute

        let props = {
            value: {
                type: Number,
                value: 0,
                reflectToAttribute: true,
                observer: "_stateChanged"
            },
            ledstate: {
                type: Number,
                value: 0,
                reflectToAttribute: true
            },
            ledinterval: {
                type: Number,
                value: 500,
                observer: "_intervalChanged"
            },
            preview: {
                type: Boolean,
                value: false,
                observer: '_previewChanged'
            }
        }
        return props;
    }

    //Member properties type definition
    intervalHandle: number | null

    /*****************************************************************************************************
    * Creates an instance of LasalRuntimeSigStateLed.
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    constructor() {
        super();
        //init null for simple check
        this.intervalHandle = null;
    }

    /****************************************************************************************************
    * An observer method that runs every time the property value changes
    *
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    _stateChanged(): void{
        if (this.isdesignmode) {
            if(this.preview) {
                this.ledstate = 1;
            } else {
                this.ledstate = 0;
            }
        } else {
            if (this.value === 2) {
                // led has to blink -> install interval and toggle state
                this.intervalHandle = this.sigSetInterval(() => {
                    this._toggleState();
                }, this.ledinterval);
            }
            else {
                // uninstall interval if it's started
                if (this.intervalHandle !== null) {
                    this.sigClearInterval(this.intervalHandle);
                    this.intervalHandle = null;
                }

                // set ledstate to value but also check if value is out of "defined area"
                this.ledstate = this.value;
                if ((this.ledstate > 2) || (this.ledstate < 0)) {
                    this.ledstate = 0;
                }
            }
        }
    }

    /****************************************************************************************************
    *  Handles the change of property ledinterval
    *
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    _intervalChanged(): void{
        // if interval is already running uninstall and set new time, otherwise do nothing
        if (this.intervalHandle !== null) {
            this.sigClearInterval(this.intervalHandle);
            this.intervalHandle = this.sigSetInterval(() => {
                this._toggleState();
            }, this.ledinterval);         
        }
    }

    /****************************************************************************************************
    * Toogles the state of the led
    *
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    _toggleState(): void{
        this.ledstate = this.ledstate ^ 1;
    }

    /****************************************************************************************************
    * Called when the preview is toggled.
    *
    * @memberof LasalRuntimeSigStateLed
    ****************************************************************************************************/
    _previewChanged(): void{
        if (this.isdesignmode) {
            if(this.preview) {
                this.ledstate = 1;
            } else {
                this.ledstate = 0;
            }
        }
    }
}
customElements.define(LasalRuntimeSigStateLed.is, LasalRuntimeSigStateLed);
