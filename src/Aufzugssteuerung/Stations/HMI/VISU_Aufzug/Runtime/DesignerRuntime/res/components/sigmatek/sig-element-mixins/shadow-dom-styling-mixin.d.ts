declare type stylingParameters = {
    include?: Array<string>
    exclude?: Array<string>
    disableRuntimeUpdates?: boolean
}

declare type shadowDomElementMapsObject = {
    className: string
    remove?: boolean
    parameters?: stylingParameters
}

/**
 * Declares mixin properties and functions for shadow dom styling support.
 * @mixin
 * @version 01.00.001
 */
declare function ShadowDomStylingMixin<T extends new (...args: any[]) => {}>(base: T): T & ShadowDomStylingMixinConstructor

interface ShadowDomStylingMixinConstructor {
    new(...args: any[]): ShadowDomStylingMixin
}

interface ShadowDomStylingMixin {

    /** A map containing style classes and other style properties of the Shadow DOM elements of the component. This will be used to apply styling on those in dom-if upon need. */
    shadowDomElementsMap: Map<string, shadowDomElementMapsObject>

    /** The Shadow Dom View Model ID of the component. */
    shadowDomVmId: string

    /** If true (default: false) the Style Class was applied to the elements in ShadowDom. */
    shadowdomstyleclassapplied: boolean

    /**
     * Applies the style class and its non-css properties to controls inside the Shadow DOM.
     * If the control is NOT inside a dom-if element, the class properties get applied immediately.
     * If the control is inside a dom-if, all the parameters are stored inside a map and applied later when the dom-if element becomes visible. 
     * @param {string} selector The query selector to identify the controls(s).
     * @param {string} className The class name which should be applied.
     * @param {boolean} [remove=false] Set to true to remove the given class name, otherwise it will be applied.
     * @param {object} [parameters={}] An object containing the parameters of the style class property (include, exclude, parameters, disableRuntimeUpdates).
     * @returns {boolean} True if the class name was successfully applied or false if not.
     */
    sigApplyShadowDomStyleClass(
        selector: string,
        className: string,
        remove?: boolean,
        parameters?: stylingParameters
    ): boolean

    /**
     * Applies the classObj stored in the shadowDomElementsMap property to the control(s) in the Shadow DOM.
     * @private
     * @param {boolean} calledByEvent If true the method was called by a dom-change event.
     * @returns {boolean} True if the class object was successfully applied or removed or false if not.
     */
    _applyshadowDomElementsMap(calledByEvent: boolean): boolean
}

export { ShadowDomStylingMixin, ShadowDomStylingMixinConstructor, stylingParameters, shadowDomElementMapsObject }
