import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import { cssObject } from '../../sigmatek/sig-element-mixins/designer-support-mixin.js';

/****************************************************************************************************
* @export
* @class LasalRuntimeSigImageElement
* @classdesc Implements and exports the sig-control-image component.
* @version  02.01.000
* @extends {LasalRuntimeSigElement}
****************************************************************************************************/
export class LasalRuntimeSigImageElement extends LasalRuntimeSigElement {

    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @returns {string} The component's tag name.
    * @memberof LasalRuntimeSigImageElement
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-image";
    }

    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @type {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigImageElement
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }

    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @type {HTMLTemplateElement} The template literal of the component. 
    * @memberof LasalRuntimeSigImageElement
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
        <style include="sig-element-css">
        :host {
            /* Basic styling of the component */
            background-color: var(--theme-sig-control-image-background-color, transparent);

            border-width: var(--theme-sig-control-image-border-width, 0);
            border-color: var(--theme-sig-control-image-border-color, inherit);
            border-style: var(--theme-sig-control-image-border-style, none);
            border-radius: var(--theme-sig-control-image-border-radius, 0);

            background-position-x: var(--theme-sig-control-image-background-position-x, center);
            background-position-y: var(--theme-sig-control-image-background-position-y, center);
            background-size: var(--theme-sig-control-image-background-size, contain);
            background-repeat: no-repeat;
            background-image: var(--theme-sig-control-image-external-background-image, var(--theme-sig-control-image-background-image, none));

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

        .sig-control-image {
            position: relative;
            width: 100%;
            height: 100%;
        }

        :host([isdesignmode]) {
            background-image: var(--theme-sig-control-image-background-image, url('preview.svg'));
        }
    </style>
    <div id="image" class="sig-control-image clearfix">
    </div>`;
    }

    /****************************************************************************************************
     * Gets called when a css property should be applied. We use it to prefix the external source
     * with url as it's not possible to configure it in json like that
     *
     * @param {cssObject} cssObj - object containing css properties which should be applied
     * @param {(boolean | undefined)} [doBoundsCheck=false] - if bound check should be done or not
     * @memberof LasalRuntimeSigImageElement
     ****************************************************************************************************/
    sigApplyCSSValue(cssObj: cssObject, doBoundsCheck: boolean | undefined = false): void {
        //for better readability
        const extImgProp = '--theme-sig-control-image-external-background-image';
        //check if the external source should be applied
        //keep empty to use the normal image source as fallback
        if ((cssObj.hasOwnProperty(extImgProp)) && (cssObj[extImgProp])) {
            cssObj[extImgProp] = `url(${cssObj[extImgProp]})`;
        }
        super.sigApplyCSSValue(cssObj, doBoundsCheck);
    }    
}
customElements.define(LasalRuntimeSigImageElement.is, LasalRuntimeSigImageElement);