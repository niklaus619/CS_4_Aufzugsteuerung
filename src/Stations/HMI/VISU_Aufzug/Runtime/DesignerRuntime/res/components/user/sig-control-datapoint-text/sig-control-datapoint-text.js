import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
/****************************************************************************************************
* @export
* @class LasalRuntimeSigTextShadowElement
* @classdesc Implements and exports the sig-control-datapoint-text component.
* @version 02.00.000
* @extends {LasalRuntimeSigElement}
*
* @property {String} sigtext The selected text of the datapoint.
* @property {String} previewtext The preview text for the datapoint.
* @property {String} isReady Defines if the Element is ready for initialization
* @property {Boolean} propsReady Defines if the properties are ready
*
****************************************************************************************************/
export class LasalRuntimeSigTextShadowElement extends LasalRuntimeSigElement {
    /****************************************************************************************************
    * Returns the component's registered tag name
    *
    * @readonly
    * @static
    * @returns {string} The component's registered tag name.
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    static get is() {
        return "sig-control-datapoint-text";
    }
    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta}  The import path URL.
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    static get importMeta() { return import.meta; }
    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    static get template() {
        return SigPolymer.html `
            <style include="sig-element-css">
                :host {
                    color: var(--theme-sig-control-datapoint-text-color, inherit);
                    background-color: var(--theme-sig-control-datapoint-text-background-color, transparent);
                    border-width: var(--theme-sig-control-datapoint-text-border-width, 0px);
                    border-color: var(--theme-sig-control-datapoint-text-border-color, transparent);
                    border-style: var(--theme-sig-control-datapoint-text-border-style, none);
                    border-radius: var(--theme-sig-control-datapoint-text-border-radius, 0px);

                    display: block;
                    position: absolute;
                    overflow: hidden;

                    --neon-color-1: var(--theme-sig-control-datapoint-text-neon-color-1);
                    --neon-color-2: var(--theme-sig-control-datapoint-text-neon-color-2);
                }

                :host * {
                    @apply --notextselect;
                    margin: 0;
                    padding: 0;
                }

                .clearfix:after {
                    @apply --clearfix
                }

                .sig-text {
                    display: table;
                    width: 100%;
                    height: 100%;
                    text-decoration: inherit;
                }

                .sig-text div.content {
                    display: table-cell;
                    padding: var(--theme-sig-control-datapoint-text-value-padding, 0);
                    text-align: var(--theme-sig-control-datapoint-text-value-align, center);
                    vertical-align: var(--theme-sig-control-datapoint-text-value-vertical-align, middle);
                    white-space: var(--theme-sig-control-datapoint-text-value-white-space, normal);
                    text-decoration: inherit;
                }

                :host([isdesignmode]:hover) {
                    background-color: var(--theme-sig-control-datapoint-text-background-color, rgba(255, 255, 255, .3));
                }

                .xs {
                    text-shadow: 0 0 3px var(--neon-color-1),
                                0 0 5px var(--neon-color-1),
                                0 0 10px var(--neon-color-2),
                                0 0 20px var(--neon-color-2),
                                0 0 30px var(--neon-color-2);
                }
                .s {
                    text-shadow: 0 0 3px var(--neon-color-1),
                                0 0 5px var(--neon-color-1),
                                0 0 10px var(--neon-color-2),
                                0 0 20px var(--neon-color-2),
                                0 0 30px var(--neon-color-2),
                                0 0 50px var(--neon-color-2);
                }
                .m {
                    text-shadow: 0 0 5px var(--neon-color-1),
                                0 0 7px var(--neon-color-1),
                                0 0 20px var(--neon-color-2),
                                0 0 40px var(--neon-color-2),
                                0 0 60px var(--neon-color-2),
                                0 0 90px var(--neon-color-2),
                                0 0 120px var(--neon-color-2),
                                0 0 160px var(--neon-color-2);
                }
                .l {
                    text-shadow: 0 0 5px var(--neon-color-1),
                                0 0 10px var(--neon-color-1),
                                0 0 20px var(--neon-color-2),
                                0 0 30px var(--neon-color-2),
                                0 0 40px var(--neon-color-2),
                                0 0 60px var(--neon-color-2),
                                0 0 90px var(--neon-color-2),
                                0 0 120px var(--neon-color-2),
                                0 0 160px var(--neon-color-2),
                                0 0 180px var(--neon-color-2);
                }

                .xl {
                    text-shadow: 0 0 5px var(--neon-color-1),
                                0 0 10px var(--neon-color-1),
                                0 0 20px var(--neon-color-2),
                                0 0 30px var(--neon-color-2),
                                0 0 40px var(--neon-color-2),
                                0 0 60px var(--neon-color-2),
                                0 0 90px var(--neon-color-2),
                                0 0 100px var(--neon-color-2),
                                0 0 120px var(--neon-color-2),
                                0 0 140px var(--neon-color-2),
                                0 0 160px var(--neon-color-2),
                                0 0 180px var(--neon-color-2);
                }
            </style>
            <div class="sig-text clearfix">
                <div id="label" class="content neon">[[sigtextc]]</div>
            </div>
            `;
    }
    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    * @readonly
    * @static
    * @returns {object} The defined Polymer properties.
    * @memberof LasalRuntimeSigTextShadowElement
    *
    * @property {Boolean} dolinebreak               - Causes Linebreak if true.
    * @property {String} sigtextc                   - Holds computed datapoint text.
    * @property {String} neon1                      - First text shadow color.
    * @property {String} neon2                      - Second text shadow color.
    * @property {String} neon1blur                  - The blur of the first text shadow.
    * @property {String} neon2blur                  - The blur of the second text shadow.
    * @property {String} neon1strength              - Number of overlaid text shadows.
    * @property {String} neon2strength              - Number of overlaid text shadows.
    ****************************************************************************************************/
    static get properties() {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            dolinebreak: {
                type: Boolean,
                value: true,
                observer: '_toggleLinebreak'
            },
            sigtextc: {
                type: String,
                value: '',
                computed: '_computeText(sigtext,previewtext)'
            },
            neon1: {
                type: String,
                value: "rgba(255,255,255,1)",
                observer: '_updateLine'
            },
            neon2: {
                type: String,
                value: "rgba(255,255,255,1)",
                observer: '_updateLine'
            },
            neon1blur: {
                type: String,
                value: "1px",
                observer: '_updateLine'
            },
            neon2blur: {
                type: String,
                value: "1px",
                observer: '_updateLine'
            },
            neon1strength: {
                type: String,
                value: "0",
                observer: '_updateLine'
            },
            neon2strength: {
                type: String,
                value: "0",
                observer: '_updateLine'
            }
        };
        return props;
    }
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigTextShadowElement.
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    constructor() {
        super();
        this.sigtext = '';
        this.previewtext = '-- Datapoint Text --';
        this.sigAddRequiredProperty('dolinebreak');
        this.sigAddRequiredProperty('neon1');
        this.sigAddRequiredProperty('neon2');
        this.sigAddRequiredProperty('neon1blur');
        this.sigAddRequiredProperty('neon2blur');
        this.sigAddRequiredProperty('neon1strength');
        this.sigAddRequiredProperty('neon2strength');
    }
    /****************************************************************************************************
    * The callback is called after property values are set and local DOM is initialized.
    *
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    ready() {
        super.ready();
        this.isReady = true;
        if (this.isdesignmode) {
            SigPolymer.afterNextRender(this, function () {
                this.propsReady = true;
                this._updateLine();
            });
        }
        else {
            this._updateLine();
        }
    }
    /****************************************************************************************************
    * Callback that is called as soon as all required properties are loaded
    *
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    sigOnRequiredPropertiesReady() {
        super.sigOnRequiredPropertiesReady();
        this.propsReady = true;
        this._updateLine();
    }
    /****************************************************************************************************
    * An Observer method which returns the computed input text.
    *
    * @param {string} _sigtext Selected Dataponttext
    * @param {string} _previewtext Prewievtext of the Datapoint
    * @returns {string} Return whether _previewtext or _sigtext (the computed text)
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    _computeText(_sigtext, _previewtext) {
        return (_sigtext === '' && this.isdesignmode) ? _previewtext : _sigtext;
    }
    /****************************************************************************************************
    * Calls function _getTextShadow() and updates the textShadow of the line with the returned value
    *
    * @param {string} [newval]
    * @param {string} [oldval]
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    _updateLine(newval, oldval) {
        if (this.propsReady && this.isReady) {
            let textShadow = this._getTextShadow();
            this.$.label.style.textShadow = textShadow;
        }
    }
    /****************************************************************************************************
    * Calculates the textshadow based on neon1, neon2, neonstrnght1, neonstrength2, neon1blur, neon2blur.
    *
    * @return {string} Textshadow.
    * @memberof LasalRuntimeSigTextShadowElement
    *****************************************************************************************************/
    _getTextShadow() {
        let neon1 = '';
        let neon2 = '';
        for (let i = 0; i < parseInt(this.neon1strength); i++) {
            neon1 += `0px 0px ${parseFloat(this.neon1blur)}px ${this.neon1}, `;
        }
        for (let i = 0; i < parseInt(this.neon2strength); i++) {
            neon2 += `0px 0px ${parseFloat(this.neon2blur)}px ${this.neon2}, `;
        }
        return (neon1 + neon2).slice(0, -2);
    }
    /****************************************************************************************************
    * Toogles Line or not depening on variable this.dolinebreak
    *
    * @memberof LasalRuntimeSigTextShadowElement
    ****************************************************************************************************/
    _toggleLinebreak() {
        if (this.propsReady && this.isReady) {
            if (this.dolinebreak) {
                this.updateStyles({ '--theme-sig-control-datapoint-text-value-white-space': 'normal' });
            }
            else {
                this.updateStyles({ '--theme-sig-control-datapoint-text-value-white-space': 'nowrap' });
            }
        }
    }
}
customElements.define(LasalRuntimeSigTextShadowElement.is, LasalRuntimeSigTextShadowElement);
//# sourceMappingURL=sig-control-datapoint-text.js.map