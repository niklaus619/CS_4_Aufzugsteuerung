import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
/********************************************************************************************************************************
 * @class
 * @classdesc Implements and exports sig-control-title component.
 * @version 02.00.000
 * @extends LasalRuntimeSigElement
 *
 * @property {SigApi.ApiAppRouter} appRouter The reference to the AppRouter API object.
 * @property {SigApi.ApiTextManager} textManager The reference to the TextManager API object.
 * @property {Boolean} isReady Defines if the Element is ready for initialization.
 * @property {Boolean} propsReady Defines if the properties are ready.
 * @property {SigApi.Route} activeRoute Holds the active Route.
 * @property {Boolean} callbackCreated True if callback is created.
 ********************************************************************************************************************************/
export class LasalRuntimeSigTitleElement extends LasalRuntimeSigElement {
    /********************************************************************************************************************************
     * Returns the component's registered tag name.
     * @readonly
     * @static
     * @returns {String} The component's tag name.
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    static get is() {
        return "sig-control-title";
    }
    /********************************************************************************************************************************
     * Returns the import path URL used by Polymer.
     * @readonly
     * @static
     * @returns {ImportMeta} The import path URL.
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    static get importMeta() { return import.meta; }
    /********************************************************************************************************************************
     * Returns the HTML literal of the component.
     * @readonly
     * @static
     * @returns {HTMLTemplateElement} The template literal of the component.
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    static get template() {
        return SigPolymer.html `
        <style include="sig-element-css">
        :host {
            /* Basic styling of the component */
            color: var(--theme-sig-control-title-color, inherit);
            background-color: var(--theme-sig-control-title-background-color, inherit);
            border-width: var(--theme-sig-control-title-border-width, 0);
            border-color: var(--theme-sig-control-title-border-color, inherit);
            border-style: var(--theme-sig-control-title-border-style, none);
            border-radius: var(--theme-sig-control-title-border-radius, 0);

            /* Basic box model settings */
            display: block;
            position: absolute;
            overflow: hidden;

            --neon-color-1: var(--theme-sig-control-title-shadow-neon-color-1);
            --neon-color-2: var(--theme-sig-control-title-shadow-neon-color-2);
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

        .sig-title {
            /* The container is rendered as a table so we can set the span to table-cell */
            display: table;
            width: 100%;
            height: 100%;
            text-decoration: inherit;
        }

        .sig-title div.content {
            /* The container is rendered as a table-cell so we can position the value via vertical-align */
            display: table-cell;
            padding: var(--theme-sig-control-title-value-padding, 0);
            text-align: var(--theme-sig-control-title-value-align, center);
            vertical-align: var(--theme-sig-control-title-value-vertical-align, middle);
            white-space: var(--theme-sig-control-title-value-white-space, normal);
            text-decoration: inherit;
        }

        :host([isdesignmode]:hover) {
            background-color: var(--theme-sig-control-title-background-color, transparent);
        }
    </style>
    <div class="sig-title clearfix">
        <div id="label" class="content">[[sigtitle]]</div>
    </div>`;
    }
    /********************************************************************************************************************************
     * Returns the defined Polymer properties of the component.
     * @readonly
     * @static
     * @returns {Object} The defined Polymer properties.
     * @memberof LasalRuntimeSigTitleElement
     *
     * @property {string} sigtitle          - The title of the active dashboard.
     * @property {string} neon1             - The first text-shadow color.
     * @property {string} neon2             - The second text-shadow color.
     * @property {string} neon1blur         - The blur of the first text shadow.
     * @property {string} neon2blur         - The blur of the second text shadow.
     * @property {string} neon1strength     - Number of overlayed text-shadows.
     * @property {string} neon2strength     - Number of overlayed text-shadows.
     ********************************************************************************************************************************/
    static get properties() {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            sigtitle: {
                type: String,
                value: '-- Title --',
                reflectToAttribute: true
            },
            neon1: {
                type: String,
                value: "rgba(255,255,255,1)",
                observer: '_updateTextShadow'
            },
            neon2: {
                type: String,
                value: "rgba(255,255,255,1)",
                observer: '_updateTextShadow'
            },
            neon1blur: {
                type: String,
                value: "1px",
                observer: '_updateTextShadow'
            },
            neon2blur: {
                type: String,
                value: "1px",
                observer: '_updateTextShadow'
            },
            neon1strength: {
                type: String,
                value: "0",
                observer: '_updateTextShadow'
            },
            neon2strength: {
                type: String,
                value: "0",
                observer: '_updateTextShadow'
            }
        };
        return props;
    }
    /********************************************************************************************************************************
     * Creates an instance of the sig-control-title component.
     *
     * @constructor
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    constructor() {
        super();
        this.appRouter = window.sigApi.appRouter;
        this.textManager = window.sigApi.textManager;
        this.sigAddRequiredProperty('dolinebreak');
        this.sigAddRequiredProperty('neon1');
        this.sigAddRequiredProperty('neon2');
        this.sigAddRequiredProperty('neon1blur');
        this.sigAddRequiredProperty('neon2blur');
        this.sigAddRequiredProperty('neon1strength');
        this.sigAddRequiredProperty('neon2strength');
        if (!this.isdesignmode && this.appRouter) {
            this.sigAddEventListener('LANGUAGE_CHG', () => {
                this._labelCHG();
            }, 'runtimeEvent');
        }
    }
    /********************************************************************************************************************************
     * This callback is called after property values have been set and the local DOM has been initialized.
     *
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    ready() {
        super.ready();
        this.isReady = true;
        SigPolymer.afterNextRender(this, function () {
            if (!this.isdesignmode) {
                this._updateTextShadow();
                // update text and add eventlistener
                if (this.appRouter) {
                    this._approuteCHG();
                    this.sigAddEventListener('APPROUTE_CHG', (maID, miID, message) => {
                        this._approuteCHG();
                    }, 'runtimeEvent');
                    // no route available, reset text
                }
                else {
                    this.sigtitle = '';
                }
            }
            else {
                this.propsReady = true;
                this._updateTextShadow();
            }
        });
    }
    /********************************************************************************************************************************
     * Is called after required properties are ready.
     *
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    sigOnRequiredPropertiesReady() {
        super.sigOnRequiredPropertiesReady();
        this.propsReady = true;
        this._updateTextShadow();
    }
    /****************************************************************************************************
     * Gets called if control gets disconnected from the DOM
     *
     * @memberof LasalRuntimeSigTitleElement
    ****************************************************************************************************/
    disconnectedCallback() {
        super.disconnectedCallback();
        // remove callback for changes of label text
        if (this.activeRoute && this.callbackCreated) {
            this.activeRoute.removeUpdateFcn(this._labelCHG);
            this.callbackCreated = false;
        }
    }
    /********************************************************************************************************************************
     * An observer method which is called to update the text shadow.
     *
     * @param {string} newval
     * @param {string} oldval
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    _updateTextShadow(newval, oldval) {
        if (this.propsReady && this.isReady) {
            let textShadow = this._getTextShadow();
            this.$.label.style.textShadow = textShadow;
        }
    }
    /********************************************************************************************************************************
     * Returns the computed text-shadow.
     *
     * @returns {string} The computed text-shadow.
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
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
    /********************************************************************************************************************************
     * Called by the LANGUAGE_CHG event. It updates the property sigtitle.
     *
     * @private
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    _labelCHG(name, value) {
        // get label of dashboard
        if (this.activeRoute) {
            this.sigtitle = this.activeRoute.getLabel();
            // no route available, reset output
        }
        else {
            this.sigtitle = '';
        }
    }
    /********************************************************************************************************************************
     * Called by the APPROUTE_CHG event. It updates the property sigtitle.
     *
     * @private
     * @memberof LasalRuntimeSigTitleElement
     ********************************************************************************************************************************/
    _approuteCHG() {
        // remove callback for changes of label text
        if (this.activeRoute && this.callbackCreated) {
            this.activeRoute.removeUpdateFcn(this._labelCHG);
            this.callbackCreated = false;
        }
        // get current route
        this.activeRoute = this.appRouter.getCurrentRoute();
        if (this.activeRoute) {
            // get label of dashboard
            this.sigtitle = this.activeRoute.getLabel();
            // add callback to get changes of label text
            if (!this.callbackCreated) {
                this.activeRoute.addUpdateFcn(this._labelCHG.bind(this));
                this.callbackCreated = true;
            }
            // no route available, reset output
        }
        else {
            this.sigtitle = '';
        }
    }
}
customElements.define(LasalRuntimeSigTitleElement.is, LasalRuntimeSigTitleElement);
//# sourceMappingURL=sig-control-title.js.map