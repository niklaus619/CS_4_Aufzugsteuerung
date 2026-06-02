
import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import "../sig-control-scrollbar/sig-control-scrollbar-css.js"

/****************************************************************************************************
 * @class 
 * @classdesc Implements and exports sig-control-mediacontainer component.
 * @version 02.01.000
 * @extends {LasalRuntimeSigElement}
****************************************************************************************************/
export class LasalRuntimeSigMediaContainerElement extends LasalRuntimeSigElement {

    /****************************************************************************************************
     * Returns the component's registered tag name.
     * @readonly
     * @static
     * @returns {String} The component's tag name.
     * @memberof LasalRuntimeSigMediaContainerElement
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-mediacontainer";
    }

    /****************************************************************************************************
     * Returns the import path URL used by Polymer.
     * @readonly
     * @static
     * @returns {ImportMeta} The import path URL.
     * @memberof LasalRuntimeSigMediaContainerElement
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }

    /****************************************************************************************************
     * Returns the HTML literal of the component.
     * @readonly
     * @static
     * @returns {HTMLTemplateElement} The template literal of the component.
     * @memberof LasalRuntimeSigMediaContainerElement
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
        <style include="sig-element-css sig-control-scrollbar-css">
            :host {
            /* Basic styling of the component */
            background-color: var(--theme-sig-control-mediacontainer-background-color, inherit);

            border-width: var(--theme-sig-control-mediacontainer-border-width, 0px);
            border-color: var(--theme-sig-control-mediacontainer-border-color, inherit);
            border-style: var(--theme-sig-control-mediacontainer-border-style, none);
            border-radius: var(--theme-sig-control-mediacontainer-border-radius, 0px);

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

        .sig-control-mediacontainer {
            position: relative;
            width: 100%;
            height: 100%;
        }

        .sig-control-mediacontainer object {
            display: block;
            position: absolute;
            border: none;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }

        #objectcontainer {
            width: 100%;
            height: 100%;
        }

        /* if a img is displayed center it */
        img#objid {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        :host([isdesignmode]) .sig-control-mediacontainer {
            cursor: unset;
            background: url(preview.svg) no-repeat center center;
            background-size: 100% 100%;
        }

        /* If dragmode is enabled or the component is dragged
         * This div is palaced over the loaded pdf so drag & drop works correctly;
         * IMPORTANT: The div needs at least a opacity of 0.1!
         */
        #draghandle {
            position:absolute;
            width:100%;
            height:100%;
            display: none;
            background-color:white;
            opacity: 0.1;
        } 
        :host([isdragmode]) #draghandle,
        :host([isdragged]) #draghandle
         {
            display:block;
         }
    </style>
    <div class="sig-control-mediacontainer clearfix">
        <div id="objectcontainer">
            <template is="dom-if" if="[[!isdesignmode]]">
                <object id="objid" data="[[computedsrc]]"></object>
            </template>
        </div>
        <div id="draghandle"><div>
    </div>`;
    }

    //polymer properties
    computedsrc: string;
   
    /****************************************************************************************************
     * Returns the defined Polymer properties of the component.
     * @readonly
     * @static
     * @returns {Object} The defined Polymer properties.
     * @memberof LasalRuntimeSigMediaContainerElement
     * 
     * @property {String}   computedsrc     - The content source of the media container.
    ****************************************************************************************************/
    static get properties(): object {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            computedsrc: {
                type: String,
                value: '',
                computed: '_computeSource(src, externalsrc)'
            }
        }
        return props;
    }


    /****************************************************************************************************
     * Called when src or external src changed. It is used to compute the final source which should 
     * be used.
     * 
     * @param {string} source - normal source
     * @param {string} externalSource - external source
     * @return {*}  {string} - computed source
     * @memberof LasalRuntimeSigMediaContainerElement
     ****************************************************************************************************/
    _computeSource(source: string, externalSource: string): string {
        //get final source
        const finalSrc = externalSource ? externalSource : source;
        //check if source changed
        if (finalSrc !== this.computedsrc) {
            const container = this.$.objectcontainer;
            if (container !== null) {
                const oldObj = container.querySelector("#objid");

                if (finalSrc !== undefined && finalSrc !== null && oldObj !== null && oldObj.id === "objid") {
                    oldObj.remove();
                    let newObj: HTMLImageElement | HTMLObjectElement ;
                    var computedsrctype = finalSrc.slice(-4);
                    switch (computedsrctype) {
                        case ".jpg":
                        case "jpeg":
                        case ".png":
                            newObj = document.createElement("img");
                            newObj.src = finalSrc;      
                            break;
                                    
                        default:
                            newObj = document.createElement("object");
                            newObj.data = finalSrc;
                            break;
                    }
                    newObj.id = "objid";
                    container.append(newObj);
                }
            }            
        }
        return finalSrc;
    }
}
customElements.define(LasalRuntimeSigMediaContainerElement.is, LasalRuntimeSigMediaContainerElement);
