// Import the Lasal Runtime base element into your component
// Import SigPolymer to use Polymer methods: html, afterNextRender, beforeNextRender, debouncer, timeOut
// or if your component's getter template() returns a HTML literal
import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
/****************************************************************************************************
 *
 * @export
 * @classdesc LasalRuntimeSigControlSwitchButton2
 * @version 02.01.001
 * @extends {LasalRuntimeSigElement}
 *
 * @property {SigApi.ApiProperties} propApi Property Api.
 * @property {Boolean} animating
 * @property {Boolean} isWindow
 * @property {null} window
 * @property {Boolean} correctPos
 * @property {Boolean} showundefinedon If the value is set to a value that isn't either the ON or OFF value, show the button as ON/OFF.\ntrue = ON, false = OFF
 * @property {Boolean} isReady Defines if the Element is ready for initialization.
 * @property {Boolean} propsReady Defines if the properties are ready.
 * @property {Element} textOn Reference to the text-on div.
 * @property {Element} textOff Reference to the text-off div.
 * @property {HTMLElement} thumbContainer HTML Element Container for the thumb of the switch button.
 * @property {Boolean} initialized Gets set when _initialized() got called.
 *
****************************************************************************************************/
export class LasalRuntimeSigControlSwitchButton2 extends LasalRuntimeSigElement {
    /****************************************************************************************************
     * When the element is loaded, importMeta() assigns reference to the path from
     * which an element was imported to its importPath property.
     * Relative URLs in styles are automatically re-written to be relative to the importPath property.
     * You can use [[importPath]] in your component to load url resources
     ****************************************************************************************************/
    static get importMeta() {
        return import.meta;
    }
    /****************************************************************************************************
     * Return the component style and template as a template literal
     ****************************************************************************************************/
    static get template() {
        return SigPolymer.html `
        <style include="sig-element-css">
            :host {
                display: block;
                position: absolute;
                /*To position Text outside of the container */
                overflow: visible;
            }

            .sig-control-switch-button2 {
                position: relative;
                height: 100%;
                width: 100%;
                text-decoration: inherit;
            }

            #sig-control-switch-button2-track {
                position: absolute;
                height: var(--theme-sig-control-switch-button2-track-height, 50%);
                width: calc(100% - var(--theme-sig-control-switch-button2-track-padding-left-right, 35px));
                box-sizing: border-box;

                /** Track Top Positioning */
                top: var(--theme-sig-control-switch-button2-track-top-position, 50%);
                left: 50%;
                transform: translateY(calc(var(--theme-sig-control-switch-button2-track-top-position, 50%) * -1)) translateX(-50%);

                /** Border in General */
                border-radius: var(--theme-sig-control-switch-button2-track-border-radius, 25px);

                /** Background */
                background-color: var(--theme-sig-control-switch-button2-track-color, inherit);
                background-image: var(--theme-sig-control-switch-button2-track-background-image, none);
                background-repeat: no-repeat;
                background-position-x: 0;
                background-position-y: 0;
                background-size: 100% 100%;
                text-decoration: inherit;
            }

            #sig-control-switch-button2-thumb-container {
                position: absolute;
                height: 100%;
                width: var(--theme-sig-control-switch-button2-thumb-width, 56%);                
                max-width: 100%;
                overflow: hidden;
                box-sizing: border-box;
                background-clip: content-box;

                padding: var(--theme-sig-control-switch-button2-thumb-container-padding, 5px 13px);
                text-align: -webkit-center;
            }

            #sig-control-switch-button2-thumb {
                display: block;

                height: var(--theme-sig-control-switch-button2-thumb-height, 60%);
                width: 100%;

                overflow: hidden;
                border-radius: var(--theme-sig-control-switch-button2-thumb-container-border-radius, 20px);
                background-color: var(--theme-sig-control-switch-button2-thumb-color, inherit);
                box-sizing: border-box;

                position: relative;
                top: var(--theme-sig-control-switch-button2-thumb-top-position, 50%);
                transform: translateY(calc((-1) * var(--theme-sig-control-switch-button2-thumb-top-position, 50%)))
            }

            #sig-control-switch-button2-thumb img {
                height:100%;
                width: auto;
                
            }

            #sig-control-switch-button2-thumb img.newChrome {
                margin: 0 calc(var(--theme-sig-control-switch-button2-thumb-container-padding, 3px) * -1);
            }

            .moveToAnimation {
                transition: all 0.1s;
            }

            .moveFromAnimation {
                transition: all 0.1s;
            }

            :host([checked="1"]) #sig-control-switch-button2-thumb {
                background-color: var(--theme-sig-control-switch-button2-thumb-color-active, inherit);
            }

            :host([checked="1"]) #sig-control-switch-button2-track {
                background-color: var(--theme-sig-control-switch-button2-track-color-active, inherit);
                background-image: var(--theme-sig-control-switch-button2-track-background-image-active, none);
            }

            .text {
                display: inline-block;
                position: absolute;
                top: var(--theme-sig-control-switch-button2-text-top, 50%);
                left: var(--theme-sig-control-switch-button2-text-left, 50%);
                transform: translateY(calc(var(--theme-sig-control-switch-button2-text-top, 50%) * -1)) translateX(calc(var(--theme-sig-control-switch-button2-text-left, 50%) * -1));
                text-decoration: inherit;
            }

            /** Show The Texts when they need to be shown */
            #text-on {
                display: none;
                top: var(--theme-sig-control-switch-button2-text-top, 50%);
                left: var(--theme-sig-control-switch-button2-text-left, 50%);
                transform: translateY(calc(var(--theme-sig-control-switch-button2-text-top, 50%) * -1)) translateX(calc(var(--theme-sig-control-switch-button2-text-left, 50%) * -1));
                padding: var(--theme-sig-control-switch-button2-text-on-padding, 0px);
            }

            #text-off {
                display: initial;
                color: var(--theme-sig-control-switch-button2-text-off-color, #000);
                top: var(--theme-sig-control-switch-button2-text-off-top, 50%);
                left: var(--theme-sig-control-switch-button2-text-off-left, 50%);
                transform: translateY(calc(var(--theme-sig-control-switch-button2-text-off-top, 50%) * -1)) translateX(calc(var(--theme-sig-control-switch-button2-text-off-left, 50%) * -1));
                padding: var(--theme-sig-control-switch-button2-text-off-padding, 0px);
            }

            #text-on, #text-off {
                text-wrap: nowrap;
            }
            
            :host([checked="1"]) #text-on {
                display: initial;
                color: var(--theme-sig-control-switch-button2-text-on-color, inherit);
                top: var(--theme-sig-control-switch-button2-text-on-top, var(--theme-sig-control-switch-button2-text-top, 50%));
                left: var(--theme-sig-control-switch-button2-text-on-left, var(--theme-sig-control-switch-button2-text-left, 50%))
            }

            :host([checked="1"]) #text-off {
                display: none;
            }

            .imageinactive,
            :host([checked="1"]) .imageactive {
                display: initial;
            }

            .imageactive,
            :host([checked="1"]) .imageinactive {
                display: none;
            }

            img {
                padding: var(--theme-sig-control-switch-button2-thumb-image-padding, 0);
                box-sizing: border-box;
            }

            #switch-container {
                height: 100%;
                text-decoration: inherit;
            }

            #text-on.text.hide-element,
            #text-off.text.hide-element {
                display: none;
            }
        </style>
        <div class="sig-control-switch-button2 clearfix " on-tap="_handleTap">
            <div id="switch-container">
                <div id="sig-control-switch-button2-track">
                    <div id="text-on" class="text text-on">
                        <span>[[ontext]]</span>
                    </div>
                    <div id="text-off" class="text text-off">
                        <span>[[offtext]]</span>
                    </div>
                </div>
                <div id="sig-control-switch-button2-thumb-container" style="transform: translateX(0%);">
                    <div id="sig-control-switch-button2-thumb">
                        <img id="imageactive" class="imageactive" src="[[imgsrcactive]]" alt="" />
                        <img id="imageinactive" class="imageinactive" src="[[imgsrcinactive]]" />
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    /****************************************************************************************************
     * define the custom tag name
     *
     * @readonly
     * @static
     * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    static get is() {
        return "sig-control-switch-button2";
    }
    /****************************************************************************************************
     * define the main porperties of the component
     * reflected property names should always be lower case so it can be used directly on the element as an attribute
     *
     * @readonly
     * @static
     * @memberof LasalRuntimeSigControlSwitchButton2
     *
     * @property {String} imgsrcactive The Image used for the Thumb in ON state. The default is a 1x1 transparent Image needed to draw a nice circle.
     * @property {String} imgsrcinactive The Image used for the Thumb in OFF state. The default is a 1x1 transparent Image needed to draw a nice circle.
     * @property {Number} value The Value of the Control. Can be set via a Datapoint. If the Control is tapped, it writes its value to the specified Datapoint.
     * @property {Number} checked
     * @property {String} ontext The Text shown if the switch is ON.
     * @property {String} offtext The Text shown if the switch is OFF.
     * @property {Boolean} previewstate Set the Switch in the ON/OFF state as preview in the Designer.
     * @property {Number} offvalue The value of the switch in the OFF state.
     * @property {Number} onvalue The value of the switch in the ON state.
    ****************************************************************************************************/
    static get properties() {
        let props = {
            imgsrcactive: {
                type: String,
                value: "",
                observer: '_activeImgChange'
            },
            imgsrcinactive: {
                type: String,
                value: "",
                observer: '_inactiveImgChange'
            },
            value: {
                type: Number,
                value: null,
                reflectToAttribute: false,
                observer: '_stateChanged',
                notify: true,
            },
            checked: {
                type: Number,
                value: 0,
                reflectToAttribute: true,
                notify: true
            },
            ontext: {
                type: String,
                value: '',
                observer: '_onTextChanged'
            },
            offtext: {
                type: String,
                value: '',
                observer: '_offTextChanged'
            },
            previewstate: {
                type: Boolean,
                value: false,
                observer: '_previewChanged'
            },
            offvalue: {
                type: Number,
                value: 0,
                observer: '_valueOnOffChanged'
            },
            onvalue: {
                type: Number,
                value: 1,
                observer: '_valueOnOffChanged'
            }
        };
        return props;
    }
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigControlSwitchButton2.
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    constructor() {
        super();
        // get refererence to properties api
        this.propApi = window.sigApi.properties;
        // initialize variables
        this.animating = false;
        this.isWindow = false;
        this.window = null;
        this.correctPos = false;
        this.showundefinedon = true;
        this.ignoreoffvalue = false;
        this.ignoreonvalue = false;
        // add required properties
        this.sigAddRequiredProperty('value');
        this.sigAddRequiredProperty('onvalue');
        this.sigAddRequiredProperty('offvalue');
        this.sigAddRequiredProperty('previewstate');
        this.sigAddRequiredProperty('showundefinedon');
    }
    /*****************************************************************************************************
    * called after property default values are set and local DOM is initialized
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    ready() {
        super.ready();
        this.isReady = true;
        // get reference to text elements and update the button texts
        this.textOn = this.$['text-on'];
        this.textOff = this.$['text-off'];
        this.textOnSpan = this.textOn.querySelector('span');
        this.textOffSpan = this.textOff.querySelector('span');
        this._updateButtonText(this.textOnSpan, this.ontext);
        this._updateButtonText(this.textOffSpan, this.offtext);
        //  Check for newer chrome version;
        //  The sizing of the image is different here
        if (navigator && navigator.userAgent) {
            const userAgent = navigator.userAgent;
            const chromeVersion = userAgent.match(/Chrome\/(.*) Safari/);
            if (chromeVersion && chromeVersion[1]) {
                const chromeVersionMajor = parseInt(chromeVersion[1].split('.')[0]);
                if (chromeVersionMajor >= 83 && chromeVersionMajor < 90) {
                    this.$.imageactive.classList.add('newChrome');
                    this.$.imageinactive.classList.add('newChrome');
                }
            }
        }
        // event listener for transitionend
        this.thumbContainer = this.$['sig-control-switch-button2-thumb-container'];
        this.sigAddEventListener('transitionend', this._thumbAnimationEndHandler.bind(this), 'jsEvent', this.thumbContainer);
        // wait for next render in designer, for getting control bounds
        if (this.isdesignmode) {
            SigPolymer.afterNextRender(this, function () {
                this._initialize();
            });
            // no designer, get control bounds immediately
        }
        else {
            if (this.propsReady) {
                this._initialize();
            }
        }
    }
    /*****************************************************************************************************
    * called when values are ready
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    sigOnRequiredPropertiesReady() {
        super.sigOnRequiredPropertiesReady();
        this.propsReady = true;
        if (this.isReady) {
            this._initialize();
        }
    }
    /****************************************************************************************************
    * Initialize the component
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _initialize() {
        this._updateButtonState();
        // initialization is done
        this.initialized = true;
        // set position of switch
        this._setThumbPos();
    }
    /****************************************************************************************************
    * shows the state according to the passed parameter and the value of valueon/valueoff
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _updateButtonState() {
        if (!this.isdesignmode) {
            // set actual position of switch
            if ((this.ignoreoffvalue === false) && (this.value === this.offvalue)) {
                this.checked = 0;
            }
            else if ((this.ignoreonvalue === false) && (this.value === this.onvalue)) {
                this.checked = 1;
            }
            else {
                this.checked = this.showundefinedon ? 1 : 0;
            }
        }
        else {
            if (this.previewstate) {
                this.checked = 1;
            }
            else {
                this.checked = 0;
            }
        }
    }
    /****************************************************************************************************
    * Observer for the valueon and valueoff prop
    *
    * @param {number} newstate New value of the value property
    * @param {number} oldstate Old value of the value property
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _valueOnOffChanged(newstate, oldstate) {
        if (newstate !== undefined) {
            this._updateButtonState();
            // set position of switch
            this._setThumbPos();
        }
    }
    /****************************************************************************************************
    * Handler when the animation ends
    * Makes sure the position for the thumb is correct, and removes the animation classes
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _thumbAnimationEndHandler() {
        if (this.initialized) {
            this._setThumbPos();
            this.thumbContainer.classList.remove('moveToAnimation');
            this.thumbContainer.classList.remove('moveFromAnimation');
            this.textOff.classList.remove('hide-element');
            this.textOn.classList.remove('hide-element');
        }
    }
    /****************************************************************************************************
    * Sets the thumb position
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _setThumbPos() {
        if (this.initialized) {
            if (!this.isdesignmode) {
                if (this.checked === 1) {
                    this.thumbContainer.style.left = '100%';
                    this.thumbContainer.style.transform = 'translateX(-100%)';
                }
                else if (this.checked === 0) {
                    this.thumbContainer.style.left = '0%';
                    this.thumbContainer.style.transform = 'translateX(0%)';
                }
            }
            else {
                if (this.previewstate) {
                    this.thumbContainer.style.left = '100%';
                    this.thumbContainer.style.transform = 'translateX(-100%)';
                }
                else {
                    this.thumbContainer.style.left = '0%';
                    this.thumbContainer.style.transform = 'translateX(0%)';
                }
            }
        }
    }
    /****************************************************************************************************
    * Sets the value to either min or max Value
    *
    * @param {Event} e On-tap event.
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _handleTap(e) {
        if (!this.isdesignmode) {
            if ((this.checked) && (this.ignoreoffvalue === false)) {
                this.value = this.offvalue;
            }
            else if (this.ignoreonvalue === false) {
                this.value = this.onvalue;
            }
        }
    }
    /****************************************************************************************************
    * State Changed
    * needed for some css
    * checks the value, and sets it correctly if neccessary
    *
    * @param {number} newstate New state of the value
    * @param {number} oldstate Old state of the value
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _stateChanged(newstate, oldstate) {
        if ((this.initialized) && (!this.isdesignmode)) {
            if (newstate !== null && newstate !== undefined) {
                const newVal = parseFloat(newstate);
                let oldChecked = this.checked;
                if ((newVal === this.offvalue) && (this.ignoreoffvalue === false)) {
                    this.checked = 0;
                }
                else if ((newVal === this.onvalue) && (this.ignoreonvalue === false)) {
                    this.checked = 1;
                }
                else {
                    this.checked = this.showundefinedon ? 1 : 0;
                }
                this._setThumbPos();
                if (oldstate !== null && oldstate !== undefined && oldChecked !== this.checked) {
                    this._animateThumbMove();
                }
            }
        }
    }
    /****************************************************************************************************
    * Switches between on and off state in the design Mode
    * To be able to view and adjust colors/texts for both views
    *
    * @param {boolean} newVal
    * @return {void}
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _previewChanged(newVal) {
        if (!this.isdesignmode) {
            return;
        }
        if (this.previewstate) {
            this.checked = 1;
        }
        else {
            this.checked = 0;
        }
        this._setThumbPos();
    }
    /****************************************************************************************************
    * Only needed for the design mode really
    * if the value changes to '', go back to the default value
    *
    * @param {string} newVal
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _activeImgChange(newVal) {
        if (newVal === '') {
            this.imgsrcactive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC44GzRO2AAAAA1JREFUGFdj+C+pyAAABI4BOoLbnY0AAAAASUVORK5CYII=";
        }
    }
    /****************************************************************************************************
    * Only needed for the design mode really
    * if the value changes to '', go back to the default value
    *
    * @param {string} newVal
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _inactiveImgChange(newVal) {
        if (newVal === '') {
            this.imgsrcinactive = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABh0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC44GzRO2AAAAA1JREFUGFdj+C+pyAAABI4BOoLbnY0AAAAASUVORK5CYII=";
        }
    }
    /****************************************************************************************************
    * Adds the animation classes to the thumb
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    _animateThumbMove() {
        if (this.initialized) {
            let needAnimation = false;
            if (this.checked === 0) {
                needAnimation = true;
                this.thumbContainer.classList.add('moveFromAnimation');
            }
            else if (this.checked === 1) {
                needAnimation = true;
                this.thumbContainer.classList.add('moveToAnimation');
            }
            // if an animation is needed, both texts are hidden
            // and only the needed one is shown once the animation finished
            if (needAnimation) {
                this.textOn.classList.add('hide-element');
                this.textOff.classList.add('hide-element');
            }
        }
    }
    /****************************************************************************************************
    * function is called if component gets resized in designmode
    *
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    designerOnBoundsChanged() {
        // set the thumb again because the element size wasn't not available in former calculations for the thumb button
        SigPolymer.afterNextRender(this, () => { this._setThumbPos(); });
    }
    /****************************************************************************************************
    * Will be called when the runtime shows or hides the component by setting "display" to "block" or "none".
    *
    * @param {boolean} isVisible
    * @memberof LasalRuntimeSigControlSwitchButton2
    ****************************************************************************************************/
    sigOnVisibilityChange(isVisible) {
        //call base
        super.sigOnVisibilityChange(isVisible);
        if (isVisible) {
            // since transitionend is not fired when dashboard is changed, we execute the function manually
            this._thumbAnimationEndHandler();
        }
    }
    /****************************************************************************************************
     * Observer for the ontext string property
     *
     * @memberof LasalRuntimeSigControlSwitchButton2
     ****************************************************************************************************/
    _onTextChanged() {
        // show the new text as multiline if it contains <br>
        this._updateButtonText(this.textOnSpan, this.ontext);
    }
    /****************************************************************************************************
     * Observer for the offtext string property
     *
     * @memberof LasalRuntimeSigControlSwitchButton2
     ****************************************************************************************************/
    _offTextChanged() {
        // show the new text as multiline if it contains <br>
        this._updateButtonText(this.textOffSpan, this.offtext);
    }
    /****************************************************************************************************
     * Updates the texts of the button foreground or background depending on the parameters and
     * if multiple lines are needed
     *
     * @param {(HTMLElement | null)} textElement
     * @param {string} newText
     * @memberof LasalRuntimeSigControlSwitchButton2
     ****************************************************************************************************/
    _updateButtonText(textElement, newText) {
        if (textElement) {
            // use empty string instead of undefined or null
            if (!newText)
                newText = '';
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
customElements.define(LasalRuntimeSigControlSwitchButton2.is, LasalRuntimeSigControlSwitchButton2);
//# sourceMappingURL=sig-control-switch-button2.js.map