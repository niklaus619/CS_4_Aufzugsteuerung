import { LasalRuntimeSigElementLight, SigPolymer } from '../../sigmatek/sig-element-light/sig-element-light.js';

/****************************************************************************************************
* @class 
* @classdesc Implements and exports sig-control-text component.
* @version 02.00.000
* @extends LasalRuntimeSigElementLight
* 
* @property {String}  sigtext The source text of the component.
* @property {String}  previewtext The preview text of the component in the style class editor.
*
****************************************************************************************************/
export class LasalRuntimeSigTextElement extends LasalRuntimeSigElementLight {

    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @returns {string} The controls tag name.
    * @memberof LasalRuntimeSigTextElement
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-text";
    }

    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigTextElement
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }
    
    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigTextElement
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
            <style include="sig-element-light-css">
                :host {
                    /* Basic styling of the component */
                    color: var(--theme-sig-control-text-color, inherit);
                    background-color: var(--theme-sig-control-text-background-color, inherit);
                    border-width: var(--theme-sig-control-text-border-width, 0px);
                    border-color: var(--theme-sig-control-text-border-color, inherit);
                    border-style: var(--theme-sig-control-text-border-style, none);
                    border-radius: var(--theme-sig-control-text-border-radius, 0px);

                    /* Basic box model settings */
                    display: block;
                    position: absolute;
                    overflow: hidden;
                }

                :host * {
                    /* Reset margin and paddings for child elements and turn of text selection */
                    @apply --notextselect;
                    margin: 0;
                    padding: 0;
                }

                .clearfix:after {
                    @apply --clearfix
                }

                .sig-text {
                    /* The container is rendered as a table so we can set the span to table-cell */
                    display: table;
                    width: 100%;
                    height: 100%;
                    text-decoration: inherit;
                }

                #label {
                    /* The container is rendered as a table-cell so we can position the value via vertical-align */
                    display: table-cell;
                    padding: var(--theme-sig-control-text-value-padding, 3);
                    padding-top: var(--theme-sig-control-text-value-padding-top, var(--theme-sig-control-text-value-padding, 3));
                    padding-right: var(--theme-sig-control-text-value-padding-right, var(--theme-sig-control-text-value-padding, 3));
                    padding-bottom: var(--theme-sig-control-text-value-padding-bottom, var(--theme-sig-control-text-value-padding, 3));
                    padding-left: var(--theme-sig-control-text-value-padding-left, var(--theme-sig-control-text-value-padding, 3));
                    text-align: var(--theme-sig-control-text-value-align, center);
                    vertical-align: var(--theme-sig-control-text-value-vertical-align, middle);
                    white-space: var(--theme-sig-control-text-value-white-space, normal);
                    text-decoration: inherit;
                }

                :host([isdesignmode]:hover) {
                    background-color: var(--theme-sig-control-text-background-color, rgba(255, 255, 255, .3));
                }
            </style>
            <div class="sig-text clearfix">
                <div id="label" class="content">[[sigtextc]]</div>
            </div>
            `
    }
    //Polymer properties type definition
    sigtextc: string
    dolinebreak: boolean

    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    *
    * @readonly
    * @static
    * @returns {object} The defined Polymer properties.
    * @memberof LasalRuntimeSigTextElement
    * 
    * @property {String}  sigtextc          - The computed text of the component.
    * @property {Boolean}  dolinebreak      - De/activate automatic Linebreaks.
    ****************************************************************************************************/
    static get properties(): object{
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            sigtextc: {
                type: String,
                value: '',
                computed: '_computeText(sigtext,previewtext)'
            },
            dolinebreak: {
                type: Boolean,
                value: true,
                observer: '_toggleLinebreak'
            }
        }
        return props;
    }
    
    //Member properties type definition
    sigtext: string
    previewtext: string
    
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigTextElement.
    * @memberof LasalRuntimeSigTextElement
    ****************************************************************************************************/
    constructor() {
        super();

        this.sigtext = '';
        this.previewtext = '-- Text --';
    }

    /****************************************************************************************************
    * Computed property method that returns the text string.
    *
    * @param {string} _sigtext The text source of the component.
    * @param {string} _previewtext The preview text of the component.
    * @return {string}  The computed text.
    * @memberof LasalRuntimeSigTextElement
    ****************************************************************************************************/
    _computeText(_sigtext: string, _previewtext: string): string {
        return (_sigtext === '' && this.isdesignmode) ? _previewtext : _sigtext;
    }

    /****************************************************************************************************
    * Called when 'Linebreak' checkbox state in Editor changes
    * sets the linebreak of the text depending on checkbox state
    * @memberof LasalRuntimeSigTextElement
    ****************************************************************************************************/
    _toggleLinebreak(): void{
        if (this.dolinebreak) {
            // linebreak on
            this.updateStyles({ '--theme-sig-control-text-value-white-space': 'normal' }); 
        } else {
             // linebreak off
             this.updateStyles({ '--theme-sig-control-text-value-white-space': 'nowrap' }); 
        }
    }
}
customElements.define(LasalRuntimeSigTextElement.is, LasalRuntimeSigTextElement);
