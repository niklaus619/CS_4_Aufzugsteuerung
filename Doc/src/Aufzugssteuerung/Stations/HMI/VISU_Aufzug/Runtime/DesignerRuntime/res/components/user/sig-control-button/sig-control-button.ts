import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';

import '../sig-control-led/sig-control-led.js';
import '../sig-control-led/sig-control-led-css.js';


/****************************************************************************************************
 * @class
 * @version 02.00.000
 * @classdesc Implements sig-control-button.
 * @extends {LasalRuntimeSigElement}
 * 
 * @property {Number} interval Holds interval id returned from sigSetInterval.
 * @property {Number} timeout Holds timeout id returned form sigSetTimeout.
 * @property {String} sigbtntextpressed The text source of the pressed button.
 * @property {String} sigbtnintervaltype Defines how often an event, defined by Interval event type, is fired on button click.
 * @property {Number} sigbtrepeatinterval The repeat interval in milliseconds. This property only has a meaning if interval type is set on autorepeat.
 * @property {String} sigbtnintervaleventtype Defines what type of event is dispatched. This property only has a meaning if interval type is set on autorepeat.
 * @property {String} previewtext The preview text of the component in the style class editor.
 * @property {Boolean} previewled Shows a preview of the led.
 * @property {Boolean} showundefinedon If the value is set to a value that isn't either the ON or OFF value, show the button as ON/OFF.\ntrue = ON, false = OFF
 * @property {null} valueDpId Datapoint Id of the value
 * @property {Number} ledvalue If not 0 the led is in active mode.
 * @property {Boolean} ledinbuttonactiv If true the led is shown in the button.
 * @property {Boolean} ledboxshadow The shadow of the led box in the button.
 * @property {SigApi.ApiDatapointManager} dpApi DatapointManager Api.
 * @property {SigApi.ApiProperties} propApi PropertyManager Api.
 * @property {Number} valueset The value of the button in pressed state.
 * @property {Number} valuereset The value of the button in released state.
 * @property {Number} btnrepeatdelay The delay before the repeat interval starts in milliseconds.
 * @property {Boolean} isReady Defines if the Element is ready for initialization.
 * @property {Boolean} propsReady Defines if the properties are ready.
 * 
 * 
 ****************************************************************************************************/
export class LasalRuntimeSigButtonElement extends LasalRuntimeSigElement {

    /****************************************************************************************************
    * Returns the components registered tag name.
    *
    * @readonly
    * @static
    * @return {string} The control's tag name
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-button";
    }

    /****************************************************************************************************
    * Returns the import path url used by Polymer
    *
    * @readonly
    * @static
    * @returns {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }
    
    /****************************************************************************************************
    * Returns the HTML literal of the component
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    static get template():HTMLTemplateElement {
        return SigPolymer.html`
            <style include="sig-element-css sig-control-led-css">
                :host {
                    /* Basic styling of the component */
                    color: var(--theme-sig-control-button-color, inherit);

                    display: block;
                    position: absolute;
                    overflow: hidden;
                    /* default offsets for LED positions */
                    --led-offset: var(--theme-sig-control-button-border-width, 1px);
                    --led-height-offset: var(--theme-sig-control-button-led-margin-height, 3px);
                    --led-width-offset: var(--theme-sig-control-button-led-margin-width, 3px);
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

                .sig-control-button-base {
                    color: inherit;
                    display: table;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    box-sizing: inherit;
                    text-decoration: inherit;
                    border: none;
                    border-top-left-radius: var(--theme-sig-control-button-border-radius-tl, var(--theme-sig-control-button-border-radius, 3px));
                    border-top-right-radius: var(--theme-sig-control-button-border-radius-tr, var(--theme-sig-control-button-border-radius, 3px));
                    border-bottom-right-radius: var(--theme-sig-control-button-border-radius-br, var(--theme-sig-control-button-border-radius, 3px));
                    border-bottom-left-radius: var(--theme-sig-control-button-border-radius-bl, var(--theme-sig-control-button-border-radius, 3px));
                    cursor: pointer;
                }

                :host(:not([btnvalue="0"])[bordergradientpressed]) {
                    border-width: 0px;
                }

                :host([btnvalue="0"][bordergradient]), :host([bordergradient]) {
                    border-width: 0px;
                }

                :host([btnvalue="0"][bordergradient]) .sig-control-button-base, :host([bordergradient]) .sig-control-button-base {
                    background-image: linear-gradient(var(--theme-sig-control-button-border-color-direction, to bottom), var(--theme-sig-control-button-border-color, #fff), var(--theme-sig-control-button-border-color-stop, var(--theme-sig-control-button-border-color)));
                    padding: var(--theme-sig-control-button-border-width, 0px);
                }

                :host(:not([btnvalue="0"])[bordergradientpressed]) .sig-control-button-base {
                    background-image: linear-gradient(var(--theme-sig-control-button-pressed-border-color-direction, to bottom), var(--theme-sig-control-button-pressed-border-color, var(--theme-sig-control-button-border-color)), var(--theme-sig-control-button-pressed-border-color-stop, var(--theme-sig-control-button-border-color-stop)));
                    padding: var(--theme-sig-control-button-border-width, 0px);
                }
            
                #sig-control-button-foreground {    
                    background-color: var(--theme-sig-control-button-background-color, inherit);
                    background-image: var(--theme-sig-control-button-background-image, linear-gradient(var(--theme-sig-control-button-background-color-direction, to bottom), var(--theme-sig-control-button-background-color, inherit), var(--theme-sig-control-button-background-color-stop, var(--theme-sig-control-button-background-color)))), linear-gradient(var(--theme-sig-control-button-background-color-direction, to bottom), var(--theme-sig-control-button-background-color, inherit), var(--theme-sig-control-button-background-color-stop, var(--theme-sig-control-button-background-color)));
                    border-radius: inherit;

                    border-width: var(--theme-sig-control-button-border-width, 0px);
                    border-color: var(--theme-sig-control-button-border-color, inherit);
                    border-style: var(--theme-sig-control-button-border-style, solid);
                    
                    border-top-left-radius: var(--theme-sig-control-button-border-radius-tl, var(--theme-sig-control-button-border-radius, 3px));
                    border-top-right-radius: var(--theme-sig-control-button-border-radius-tr, var(--theme-sig-control-button-border-radius, 3px));
                    border-bottom-right-radius: var(--theme-sig-control-button-border-radius-br, var(--theme-sig-control-button-border-radius, 3px));
                    border-bottom-left-radius: var(--theme-sig-control-button-border-radius-bl, var(--theme-sig-control-button-border-radius, 3px));
                }
                
                #sig-control-button-background {
                    background-color: var(--theme-sig-control-button-pressed-background-color, inherit);
                    color: var(--theme-sig-control-button-pressed-color, inherit);

                    border-width: var(--theme-sig-control-button-border-width, 0px);
                    border-color: var(--theme-sig-control-button-pressed-border-color, var(--theme-sig-control-button-border-color));
                    border-style: var(--theme-sig-control-button-border-style, solid);

                    border-top-left-radius: var(--theme-sig-control-button-border-radius-tl, var(--theme-sig-control-button-border-radius, 3px));
                    border-top-right-radius: var(--theme-sig-control-button-border-radius-tr, var(--theme-sig-control-button-border-radius, 3px));
                    border-bottom-right-radius: var(--theme-sig-control-button-border-radius-br, var(--theme-sig-control-button-border-radius, 3px));
                    border-bottom-left-radius: var(--theme-sig-control-button-border-radius-bl, var(--theme-sig-control-button-border-radius, 3px));
                }

                :host([bordergradient]) #sig-control-button-foreground,
                :host([bordergradientpressed]) #sig-control-button-background {
                    border: none;
                    border-top-left-radius: calc(var(--theme-sig-control-button-border-radius-tl, var(--theme-sig-control-button-border-radius, 3px)) - var(--theme-sig-control-button-border-width, 0px));
                    border-top-right-radius: calc(var(--theme-sig-control-button-border-radius-tr, var(--theme-sig-control-button-border-radius, 3px)) - var(--theme-sig-control-button-border-width, 0px));
                    border-bottom-right-radius: calc(var(--theme-sig-control-button-border-radius-br, var(--theme-sig-control-button-border-radius, 3px)) - var(--theme-sig-control-button-border-width, 0px));
                    border-bottom-left-radius: calc(var(--theme-sig-control-button-border-radius-bl, var(--theme-sig-control-button-border-radius, 3px)) - var(--theme-sig-control-button-border-width, 0px));  
                }

                #sig-control-button-foreground:before {
                    @apply --symbol;
                    content: attr(sigbtnicon);
                }

                #sig-control-button-background:before {
                    @apply --symbol;
                    content: attr(sigbtnicon);
                }

                #sig-control-button-background {
                    background-image: var(--theme-sig-control-button-pressed-background-image, var(--theme-sig-control-button-background-image, none)), linear-gradient(var(--theme-sig-control-button-pressed-background-color-direction, to bottom), var(--theme-sig-control-button-pressed-background-color, inherit), var(--theme-sig-control-button-pressed-background-color-stop, var(--theme-sig-control-button-pressed-background-color)));
                }

                :host([shadowactive]) #sig-control-button-foreground {
                    box-shadow: inset 0 0 var(--theme-sig-control-button-shadow-size, 0px) var(--theme-sig-control-button-shadow-color, #000000);
                }

                :host([shadowpressedactive]) #sig-control-button-background {
                    box-shadow: inset 0 0 var(--theme-sig-control-button-pressed-shadow-size, 0px) var(--theme-sig-control-button-pressed-shadow-color, #000000);
                }

                :host(:not([btnvalue="0"])) #sig-control-button-foreground {
                    display: none;
                }

                :host([btnvalue="0"]) #sig-control-button-background {
                    display: none;
                }

                .textlabel {
                    background-position-x: var(--theme-sig-control-button-background-position-x, center);
                    background-position-y: var(--theme-sig-control-button-background-position-y, center);
                    background-size: var(--theme-sig-control-button-background-size, contain);
                    background-repeat: no-repeat;
                    text-align: var(--theme-sig-control-button-text-align, center);
                    vertical-align: var(--theme-sig-control-button-vertical-align, middle);
                    display: table-cell;
                    cursor: inherit;
                    width: 100%;
                    height: 100%;
                    text-decoration: inherit;
                    padding: 0 var(--theme-sig-control-button-padding, 0) !important;
                }

                :host([bordergradient]) #led, 
                :host([bordergradient][btnvalue="0"]) #led, 
                :host([bordergradientpressed]:not([btnvalue="0"])) #led {
                    --led-height-offset: calc(var(--led-offset, 1px) + var(--theme-sig-control-button-led-margin-height, 3px));
                    --led-width-offset: calc(var(--led-offset, 1px) + var(--theme-sig-control-button-led-margin-width, 3px));
                }

                :host([ledpositioning="topleft"]) #led {
                    top: var(--led-height-offset);
                    left: var(--led-width-offset);
                }

                :host([ledpositioning="topright"]) #led {
                    top: var(--led-height-offset);
                    right: var(--led-width-offset);
                }

                :host([ledpositioning="bottomleft"]) #led {
                    bottom: var(--led-height-offset);
                    left: var(--led-width-offset);
                }

                :host([ledpositioning="bottomright"]) #led {
                    bottom: var(--led-height-offset);
                    right: var(--led-width-offset);
                }

                #led {
                    position: absolute;
                    width: var(--theme-sig-element-width, 10px);
                    height: var(--theme-sig-element-height, 10px);
                    
                    --theme-sig-control-led-vertical-align: middle;     
                }
            </style>
            <div class="sig-control-button-base clearfix" on-tap="_handleTap" on-down="_handleDown" on-up="_handleUp">
                <div id="sig-control-button-background" sigbtnicon$=[[sigbtniconpressed]] class="textlabel"></div>
                <div id="sig-control-button-foreground" sigbtnicon$=[[sigbtnicon]] class="textlabel"></div>
                <template is="dom-if" if="[[ledinbuttonactiv]]">
                    <!-- class led still needed as used in publishName of style class property -> cannot be changed otherwise style class is not
                        applied properly after update -->
                    <sig-control-led id="led" class="led" value="[[ledvalue]]" preview=[[previewled]] showboxshadow="[[ledboxshadow]]"></sig-control-led>
                </template>
            </div>
        `;
    }
    //Polymer properties type definition
    sigbtntext: string
    sigbtntextc: string
    sigbtntextpressedc: string
    sigbtniconpressed: string
    btnvalue: number
    value: number
    sigbtnicon: string
    sigbtntype: string
    shadowactive: boolean
    shadowpressedactive: boolean
    bordergradient: boolean
    bordergradientpressed: boolean
    ledpositioning: string
    preview: boolean

    /****************************************************************************************************
    * Returns the defined polymer properties of the component.
    * @readonly
    * @static
    * @returns {Object} The defined polymer properties.
    * @memberof LasalRuntimeSigButtonElement
    *
    * @property {String}  sigbtntext                - The text source of the button
    * @property {String}  sigbtntextc               - The computed text property of the button
    * @property {String}  sigbtntextpressedc        - The computed text property of the pressed button
    * @property {String}  sigbtniconpressed         - Icon path of a pressed button
    * @property {Number}  btnvalue                  - Defines the value of the button. If not 0, the button is in pressed state.
    * @property {Number}  value                     - Defines the actual value of the button. If not "valuereset", the button is in pressed state.
    * @property {String}  sigbtnicon                - Button icon path
    * @property {String}  sigbtntype                - Defines the type of the button: "click" or "toggle".
    * @property {Boolean} shadowactive              - Activates the border shadow of the component.
    * @property {Boolean} shadowpressedactive       - Activates the border shadow of the component in the pressed state.
    * @property {Boolean} bordergradient            - Activates the border gradient of the component.
    * @property {Boolean} bordergradientpressed     - Activates the border gradient of the component in pressed state.
    * @property {String}  ledpositioning            - Defines the position of the led in the button.
    * @property {Boolean} preview                   - Preview setting for designer
    * 
    ****************************************************************************************************/
    static get properties(): object {
        let props = {
            //needed for computed of sigbtntextc if set from outside
            sigbtntext: {
                type: String,
                value: ''
            },
            sigbtntextc: {
                type: String,
                value: '',
                computed: '_computeText(sigbtntext,previewtext,isstylepreview)'
            },
            sigbtntextpressedc: {
                type: String,
                computed: '_computePressedText(sigbtntext,sigbtntextpressed,previewtext,isstylepreview)'
            },
            sigbtnicon: {
                type: String,
                value: '',
                reflectToAttribute: false
            },
            sigbtniconpressed: {
                type: String,
                value: '',
                reflectToAttribute: false
            },
            btnvalue: {
                type: Number,
                value: 0,
                reflectToAttribute: true
            },
            value: {
                type: Number,
                value: 0,
                observer: '_stateChanged',
                notify: true
            },
            valueset: {
                type: Number,
                value: 1,
                observer: '_valueOnOffChanged',
            },
            valuereset: {
                type: Number,
                value: 0,
                observer: '_valueOnOffChanged',
            },
            inheritbgimg: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            shadowactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            shadowpressedactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bordergradient: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bordergradientpressed: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            ledpositioning: {
                type: String,
                value: 'topleft',
                reflectToAttribute: true
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
    interval: number | null
    timeout: number | null
    sigbtntextpressed: string
    sigbtnintervaltype: string
    sigbtrepeatinterval: number
    sigbtnintervaleventtype: string
    previewtext: string
    previewled: boolean
    showundefinedon: boolean
    valueDpId: null
    ledvalue: number
    ledinbuttonactiv: boolean
    ledboxshadow: boolean
    dpApi:  SigApi.ApiDatapointManager
    propApi: SigApi.ApiProperties
    valueset: number
    valuereset: number
    btnrepeatdelay: number | undefined
    ignorevaluereset: boolean
    ignorevalueset: boolean
    textForeground: HTMLElement | null;
    textBackground: HTMLElement | null;    

    isReady: boolean
    propsReady: boolean
    
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigButtonElement.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    constructor() {
        super();
        this.interval = null;
        this.timeout = null;
        this.sigbtntext = '';
        this.sigbtntextpressed = '';
        this.sigbtntype = 'click';
        this.sigbtnintervaltype = 'singleshot'; // singleshot, autorepeat
        this.sigbtrepeatinterval = 100; //Milliseconds
        this.sigbtnintervaleventtype = 'interval';  //mousedown, mouseup, tap,
        this.previewtext = '-- Button --';
        this.previewled = false;
        this.showundefinedon = true;        
        this.valueDpId = null;
        this.ledvalue = 0;
        this.ledinbuttonactiv = false;
        this.ledboxshadow = true;
        this.ignorevaluereset = false;
        this.ignorevalueset = false;
    
        this.dpApi = window.sigApi.datapointManager;
        this.propApi = window.sigApi.properties;

        if (this.sigSetForceUpdateForProperty) this.sigSetForceUpdateForProperty('value');
        this.addPredefProps(
            [{
                src: 'value',
                dest: 'state',
                type: window.sigApi.SIG_CONST.PROP_PREDEF_PROPS_TYPE_STATE
            }]
        );

        this.sigAddRequiredProperty('value');
        this.sigAddRequiredProperty('valueset');
        this.sigAddRequiredProperty('valuereset');
    }
    
    /****************************************************************************************************
    * This callback is called after property values are set and local DOM is initialized.
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    ready(): void {
        super.ready();        
        this.isReady = true;

        // get reference to text elements and update the button texts
        this.textForeground = this.$['sig-control-button-foreground'] as HTMLElement;
        this.textBackground = this.$['sig-control-button-background'] as HTMLElement;
        this._updateButtonText(this.textForeground, this.sigbtntextc);
        this._updateButtonText(this.textBackground, this.sigbtntextpressedc);
        
        if ((this.propsReady) || (this.isdesignmode)) {
            this._initialize();
        }

        if (!this.isdesignmode) {
            SigPolymer.afterNextRender(this, function (this: LasalRuntimeSigButtonElement) {
                this.sigAddEventListener('APPROUTE_CHG', (maID, miID, message) => {
                    this._stopAutorepeat();
                }, 'runtimeEvent');
            });
        }
    }
     
     /****************************************************************************************************
     * called when values are ready
     *
     * @memberof LasalRuntimeSigButtonElement
     ****************************************************************************************************/
     sigOnRequiredPropertiesReady(): void {
        super.sigOnRequiredPropertiesReady();
        this.propsReady = true;
        
        if (this.isReady) {
            this._initialize();
        }
    }

    /****************************************************************************************************
    * Initialize the component
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
     _initialize(): void {
        this._updateButtonState(this.value);
    }

    /****************************************************************************************************
    * shows the state according to the passed parameter and the value of valueon/valueoff
    *
    * @param {number} newstate The new value of the value property
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _updateButtonState(newstate: number): void {
        //in designer we get "000000000" if datapoint is configured
        //as we are working with the btnvalue for preview we need to take the preview value
        if (this.isdesignmode) {
            if (this.preview) {
                this.btnvalue = 1;
            }
            else {
                this.btnvalue = 0;
            }
        } else {
            if ((this.ignorevalueset === false) && (newstate === this.valueset)) {
                this.btnvalue = 1;
            } else if ((this.ignorevaluereset === false) && (newstate === this.valuereset)) {
                this.btnvalue = 0;
            } else {
                this.btnvalue = this.showundefinedon ? 1 : 0;
            }
        }     
    }
   
    /****************************************************************************************************
    * An observer method that is fired every time the property 'value' changed
    *
    * @param {number} newstate The new value of the property 'value'.
    * @param {number} oldstate The old value of the property 'value'.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _stateChanged(newstate: number, oldstate: number): void {
        if (newstate !== undefined) {
            this._updateButtonState(newstate);
        }
    }

    /****************************************************************************************************
    * Observer for the valueon and valueoff prop
    *
    * @param {number} newstate The new value of the value property.
    * @param {number} oldstate The old value of the value property.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _valueOnOffChanged(newstate: number, oldstate: number): void {
        if (newstate !== undefined) {
            this._updateButtonState(this.value);
        }
    }

    /****************************************************************************************************
    * A method that handles the on-tap event on button.
    *
    * @param {Event} event on-typ Event
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _handleTap(event: Event): void {
        if (!this.isdesignmode) {
            this._dispatchEvent('tap');
        }
    }

    /****************************************************************************************************
    * A method that handles the on-down event on button.
    *
    * @param {Event} event on-down Event
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _handleDown(event: Event): void {
        if (!this.isdesignmode) {
            if (this.sigbtntype === 'click') {
                if (this.ignorevalueset === false) {
                    this.value = this.valueset;
                }
            } else {
                if ((parseFloat(this.value as any) !== this.valueset) && (this.ignorevalueset === false)) {
                    this.value = this.valueset;
                } else if (this.ignorevaluereset === false) {
                    this.value = this.valuereset;                 
                } 
            }
            // send event after changing the datapoint, so the new value can be used in the function block
            this._dispatchEvent('mousedown');

            // handle autorepeat
            if (this.sigbtnintervaltype === 'autorepeat') {
                this._setInterval();
            }          
        }
    }
   
    /****************************************************************************************************
    * A method that handles the on-up event on button
    *
    * @param {Event} event on-up Event
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _handleUp(event: Event): void {
        if (!this.isdesignmode) {
            // handle autorepeat -> needs to be done first otherwise interval will overwrite value set
            if (this.sigbtnintervaltype === 'autorepeat') {
                this._clearInterval();
            }              

            if ((this.sigbtntype === 'click') && (this.ignorevaluereset === false)) {
                this.value = this.valuereset;
            }
            // send event after changing the datapoint, so the new value can be used in the function block
            this._dispatchEvent('mouseup');         
        }
    }

    /****************************************************************************************************
    * Sets the interval that dispatches defined events.
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _setInterval(): void {
        this.timeout = this.sigSetTimeout(() => {
            // write on datapoint directly
            this._writeDatapoint();
            this._dispatchEvent(this.sigbtnintervaleventtype);
            this.interval = this.sigSetInterval(() => {
                // write on datapoint in interval
                this._writeDatapoint();
                this._dispatchEvent(this.sigbtnintervaleventtype);
            }, this.sigbtrepeatinterval);
        }, this.btnrepeatdelay);
    }

    /****************************************************************************************************
    * Writes value to the datapoint.
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _writeDatapoint(): void {
        //we need to fetch property everytime to get datapoint in case of datapoint-scheme configured
        if ((this.propApi !== null) && (this.dpApi !== null)) {
            //check if property configured
            const prop = this.propApi.getProperty(this.id, 'value') as SigApi.PropertyDatapoint;
            if (prop !== null) {
                //get datapoint
                const dp = prop.getDatapoint();
                if (dp !== null) {
                    //write value
                    this.dpApi.writeDataPoint(dp.getId(), this.value);
                }
                else {
                    this._log('_writeDatapoint(): failed to get datapoint', 'ERROR');
                }
            }
        }
        else {
            this._log('_writeDatapoint(): invalid apis', 'ERROR');
        }
    }

    /****************************************************************************************************
    * Clears the interval that dispatches events.
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _clearInterval(): void {
        if (this.timeout !== null) {
            this.sigClearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.interval !== null) {
            this.sigClearInterval(this.interval);
            this.interval = null;
        }
    }

    /****************************************************************************************************
    * Autorepeat interval is cleared if a new route is set.
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _stopAutorepeat(): void {
        if (this.interval !== null) {
            this._clearInterval();
            if (this.sigbtntype = "toggle") {
                if (this.ignorevaluereset === false) {
                    this.value = this.valuereset;
                }
            }
        }
    }

    /****************************************************************************************************
    * Computed property method that computes the button text.
    *
    * @param {string} normal Button text from the text list.
    * @param {string} _previewtext Preview button text.
    * @param {boolean} _isstylepreview True, if button is in previewmode.
    * @return {string} The computed property.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _computeText(normal: string, _previewtext: string, _isstylepreview: boolean): string {
        const newText = (normal === '' && this.isdesignmode && _isstylepreview) ? _previewtext : normal;
        // show the new text as multiline if it contains <br>
        this._updateButtonText(this.textForeground, newText);
        return newText;
    }

    /****************************************************************************************************
    * Computed property method that computes the pressed button text.
    *
    * @param {string} normal Pressed normal text.
    * @param {string} pressed Pressed button text.
    * @param {string} _previewtext Preview button text.
    * @param {boolean} _isstylepreview True, if button is in previemode.
    * @return {string} The computed property.
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _computePressedText(normal: string, pressed: string, _previewtext: string, _isstylepreview: boolean): string {
        const newText = (pressed === '') ? ((normal === '' && this.isdesignmode && _isstylepreview) ? _previewtext : normal) : pressed;
        // show the new text as multiline if it contains <br>
        this._updateButtonText(this.textBackground, newText);
        return newText;
    }

    /****************************************************************************************************
    * Called when changing the preview value in the designer
    *
    * @memberof LasalRuntimeSigButtonElement
    ****************************************************************************************************/
    _previewChanged(): void {
        if (this.isdesignmode) {
            if (this.preview) {
                this.btnvalue = 1;
            } else {
                this.btnvalue = 0;
            }
        }
    }


    /****************************************************************************************************
     * Updates the texts of the button foreground or background depending on the parameters and
     * if multiple lines are needed
     *
     * @param {(HTMLElement | null)} textElement
     * @param {string} newText
     * @memberof LasalRuntimeSigButtonElement
     ****************************************************************************************************/
    _updateButtonText(textElement: HTMLElement | null, newText: string): void {
        if (textElement) {
            // use empty string instead of undefined or null
            if (!newText) newText = '';
            // check for multiline text
            if (newText.includes('<br>')) {
                textElement.innerText = '';
                textElement.innerHTML = newText;
            }
            else {
                textElement.innerHTML = '';
                textElement.innerText = newText;
            }
        }
    }        
}
customElements.define(LasalRuntimeSigButtonElement.is, LasalRuntimeSigButtonElement);
