import { LasalRuntimeSigElementLight, SigPolymer } from '../../sigmatek/sig-element-light/sig-element-light.js';

/****************************************************************************************************
* @export
* @class LasalRuntimeSigrectangleElement
* @classdesc Implements and exports the sig-control-rectangle control.
* @version 03.00.000
* @extends {LasalRuntimeSigElementLight}
****************************************************************************************************/
export class LasalRuntimeSigrectangleElement extends LasalRuntimeSigElementLight {

    /****************************************************************************************************
    * Returns the component's registered tag name
    *
    * @readonly
    * @static
    * @returns {string} The control's tag name.
    * @memberof LasalRuntimeSigrectangleElement
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-rectangle";
    }

    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta}  The import path URL.
    * @memberof LasalRuntimeSigrectangleElement
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }

    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigrectangleElement
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                /* Basic styling of the component */
                background-color: var(--theme-sig-control-rectangle-background-color, inherit);

                border-width: var(--theme-sig-control-rectangle-border-width, 1px);
                border-color: var(--theme-sig-control-rectangle-border-color, inherit);
                border-style: var(--theme-sig-control-rectangle-border-style, solid);
                border-radius: var(--theme-sig-control-rectangle-border-radius, 0px);

                /* Basic box model settings */
                display: block;
                position: absolute;
                overflow: hidden;
            }

            :host * {
                /* Reset margin and paddings for child elements and turn of rectangle selection */
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .sig-rectangle {
                width: 100%;
                height: 100%;
            }
        </style>
        <div class="sig-rectangle clearfix">
        </div>`;
    }
}
customElements.define(LasalRuntimeSigrectangleElement.is, LasalRuntimeSigrectangleElement);
