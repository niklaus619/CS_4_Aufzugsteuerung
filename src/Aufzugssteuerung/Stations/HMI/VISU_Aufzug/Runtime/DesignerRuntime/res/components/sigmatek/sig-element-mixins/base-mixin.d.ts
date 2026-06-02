/// <reference path="../../../../rt/node_modules/@types/globals/sig-api.d.ts" />
/// <reference path="../../../../rt/node_modules/@types/globals/loadjs.d.ts" />

import { DesignerSupport, cssObject } from "./designer-support-mixin";
import { stylingParameters } from "./shadow-dom-styling-mixin";
import { boundsObject } from "./designer-support-mixin";

export declare type predefinedPropertyObject = {
    src: string
    dest: string
    type: number
}

export declare type logLevel = 'INFO' | 'WARN' | 'ERROR' | 'DIR' | 'DEBUG'

export declare type fontObject = {
    fontFamily?: string
    size?: number
    italic?: boolean
    bold?: boolean
    underline?: boolean
    // Property used by Appli
    available?: boolean
}

export declare type controlBoundsObject = {
    left: number
    top: number
    width: number
    height: number
    bottom: number
    right: number
    rotation: number
    translateX: number
    translateY: number
    zindex: number | string
    boxdelta?: number
    border?: number
    padding?: number
}

export declare type scaleFactorObject = {
    x: number
    y: number
}

export declare type ContextObject = {
    instanceId: string,
    parentId: string,
    type: 'dashboard' | 'window'
}

export interface statusProperties {
    [key: string]: number
}

/**
 * Declares mixin properties and functions needed by all base elements.
 * @mixin 
 * @version 01.01.012
 */
declare function BaseMixin<T extends new (...args: any[]) => {}>(base: T): T & BaseMixinConstructor;

interface BaseMixinConstructor {
    new(...args: any[]): BaseMixin;
}

interface BaseMixin extends DesignerSupport {

    /** If true the element is going to be disconnected from the dom. */
    disconnected: boolean

    /** Determines whether the component is in design mode(in LVD). */
    isdesignmode: boolean

    /** Determines the context, in which the component is placed. */
    context: ContextObject

    /** Determines whether to wait for the required properties to be ready or not. */
    _waitForRequiredProps: boolean

    /** Contains the status of the required properties. */
    _statusProperties: statusProperties[]

    /* An object containing the default properties as backup values for them to be set later when needed.Is needed by DRT(Utils.js) and cannot be lazy loaded. */
    _propInitValueBackups: object

    /** An map containing the predefined properties. */
    predefPropsMap: Map<string, object>

    /** An array containing the names of the required properties. */
    reqNames: Array<string>

    /** A map containing stored fonts.We need to store the fonts for later use if the dom -if templates are stamped to the template and become visible. */
    fontMap: Map<string, fontObject>

    /** Saved reference to the dom - change event listener. */
    fontApplyHandler: Function

    /** Contains the ID of the View Model, if this is a Shadow DOM component. Runtime mode only!  */
    shadowDomVmId: string

    /** Is true if the runtime updates a property value */
    _isRuntimeValueUpdate: boolean

    /** The Property name currently being updated by the Runtime. */
    _pendingUpdatePropertyName: string

    /** Is true if the internal default values of the defined Polymer Properties are applied. */
    _internalDefaultValuesApplied: boolean

    /** Determines if all internal events are dispatched on all value updates. Default is false. */
    dispatchAllInternalEvents: boolean

    /**
    * Returns the component's base element.
    * @readonly
    * @returns {string} The base element's name.
    */
    get baseElement(): string

    /**
     * Returns a object with a status properties per applied mixin. 
     * @readonly
     * @returns {object} A object with a status properties. 
     */
    get mixins(): object

    /** 
     * Returns a map of the predefined properties of the component.
     * @returns {Map<string,object} A map containing the predefined properties.
     */
    getPredefPropMap(): Map<string, object>

    /** 
     * Adds predefined properties passed in the parameter array to the property predefPropsMap by calling _addPredefProp().
     * @param {Array} array Predefined properties to be added.
     */
    addPredefProps(array: Array<predefinedPropertyObject>): void

    /** 
    * Add a single predefined property to the property predefPropsMap.
    * @private
    * @param {string} srcAttrib  The source property.
    * @param {string} destAttrib The destination property.
    * @param {number} type       The type of the generated property which is to be added.
    */
    _addPredefProp(srcAttrib: string, destAttrib: string, type: number): void

    /** 
     * Adds a single required property passed in parameter to the property reqNames.
     * It also and resets the required property state in the property _statusProperties.
     * @private
     * @param {string} name Name of the required property.
     * @param {boolean} [warn=true] If true, warning is shown, as this method should not be called directly.
     */
    _addRequiredProperty(name: string, warn?: boolean): void

    /** 
    * Adds a single required property passed in parameter to the property reqNames.
    * It also resets the required property state in the property _statusProperties.
    * @param {string} name Name of the required property.
    */
    sigAddRequiredProperty(name: string): void

    /** 
     * Applies the given required property state passed in parameter.
     * @param {string} name The name of required property.
     * @param {number} value The state which should be applied to the required property.
     */
    sigApplyPropState(name: string, value: number): void

    /** 
     * Checks whether all the required properties are ready. If they are, it calls sigOnRequiredPropertiesReady().
     * @private
     */
    _checkRequiredProperties(): void

    /** 
     * Returns a boolean based on the state of the property passed in parameter -> 0 = no error | -1 = property not set.
     * You can override this method in an extended component to specify which particular state values are valid for each required property differently.
     * @private
     * @param {string} name The name of the required property.
     * @param {number} value The state of the property.
     * @returns {boolean} True, if the state of the property is valid.
     */
    _isPropertyStateValid(name: string, value: number): boolean

    /** 
     * Callback called every time a property's state changes.
     * You can override this method in an extended component to react to a property state change differently.
     * @param {string} name The name of the property
     * @param {number} value The state of the property
     */
    sigOnPropertyStateChange(name: string, value: number): void

    /** 
    * Callback called every time a property's state changes.
    * @private
    * @obsolete
    * @param {string} name The name of the property.
    * @param {number} value The state of the property.
    * @param {boolean} [warn=true] If true, throw a warning that this is an obsolete callback.
    */
    _onPropertyStateChange(name: string, value: number, warn?: boolean): void

    /** 
     * Callback called once all the required properties are loaded.
     * It removes the 'sig-element-not-ready' style class from the component's class list.
     * You can override this method in your components to react to the loaded required properties differently.
     */
    sigOnRequiredPropertiesReady(): void

    /** 
     * Callback called once all the required properties are loaded.
     * It removes the 'sig-element-not-ready' style class from the component's class list.
     * You can override this method in your components to react to the loaded required properties differently.
     * @private
     * @param {boolean} [warn=true] If true, throw a warning that this is an obsolete callback.
.     */
    _onRequiredPropertiesReady(warn?: boolean)

    /** 
     * Sets the initial state of the component.
     * It adds the 'sig-element-not-ready' style class to the component's class list.
     * This class is removed once the element is ready to be manipulated with.
     * You can override this method in an extended component to set the initial style class on your own.
     * @private
    */
    _setInitialState(): void

    /**
     * Returns boolean indicating whether the component is in design mode (LVD) or not.
     * @private
     * @returns {boolean} True, if the environment is LVD, false if not.
     */
    _isDesignMode(): boolean

    /** 
     * Calls the Text Manager API to get the currently used language as its standard code.
     * When in design mode, it always returns the german 'de-de' code, because there is no language support enabled.
     * @deprecated 
     * @private
     * @returns {string} Currently used language standard code
     */
    _getActiveLang(): string

    /** 
     * Calls the Text Manager API to get the currently used language as its standard code.
     * @async
     * @private
     * @returns {Promise<string|null>} Currently used language standard code, or null if the language was not found.
     */
    _getActiveLangAsync(): Promise<string | null>

    /**
     * Logs the message passed in the first parameter with the level passed in the second parameter.
     * @private
     * @param {string | object} msg The message to be logged.
     * @param {string} [level] Determines the logging level of the message. Possible levels: INFO, WARN, ERROR, DIR.
     */
    _log(msg: string | object, level?: logLevel): void

    /**
     * Dispatches a custom JavaScript event named as the passed parameter with the tag name of the component as the prefix. Runtime mode only.
     * @private
     * @param {string} event The event name.
     * @param {boolean} [disablePrefix=false] If true the event is not prefixed with the components tagname.
     */
    _dispatchEvent(event: string, disablePrefix?: boolean): void

    /**  
    * An observer method that is called every time the property state changes. It handles the state of the component.
    * You can override this method in extended components for custom handling of the control state (Invisible, Inactive, Active).
    * @private
    * @param {number} newval The new value of the property state. Possible states: 1 - active, 2 - inactive, 3 - invisible
    * @param {number} oldval The old value of the property state.
    */
    _onStateChange(newval: number, oldval: number): void

    /**
     * Callback called every time state property details could have changed.
     * To get state property details call sigApi.vm.getStatePropertyDetailInfo.
     * @callback
     */
    sigOnStatePropertyDetailChange(): void

    /** 
     * An observer method that runs every time the property checkbit changes.
     * It adds and removes the 'sig-element-checkbit' style class based on the value of the checkbit.
     * @private
     * @param {boolean} newval The new value of the checkbit property.
     * @param {boolean} oldval The old value of the checkbit property.
     */
    _onCheckbitChange(newval: boolean, oldval: boolean): void

    /** 
     * An observer method that runs every time the property rotation changes. 
     * It calls the _setRotation method which rotates the component.
     * @private
     * @param {number} newval The new value of the property rotation.
     * @param {number} oldval The old value of the property rotation.
    */
    _rotateComponent(newval: number, oldval: number): void

    /** 
    * This method rotates the component and optionally translates the component accordingly.
    * @private
    * @param {number}  rotation The rotation that should be applied to the component.
    * @param {boolean} [notranslate=false] If true, it will transform the component accordingly (Used for handles to fit the component)
    * @param {boolean} [force=false]  Force rotation of the component.
    */
    _setRotation(rotation: number, notranslate?: boolean, force?: boolean): void

    /** 
    * The base function for limit checks - connected dataPoint properties will override this implementation.
    * Do not override this method in extended components!
    * @param {number} val The value of the property.
    * @param {string} [propName='value'] The name of the property.
    * @param {string} [propNameLow='limitLow'] The name of the limit low property.
    * @param {string} [propNameHigh='limitHigh'] The name of the limit high property.
    * @returns {Array<number|undefined>} Array of two numbers carrying information whether the val exceeds limits or not. 
    * [0, val] means that the val is between limits.
    * [1, val] means that the val exceeds the upper limit.
    * [-1, val] means that the val is below the lower limit.
    * [-1, undefined] means that strings propNameLow / propNameHigh are not valid numbers
    */
    checkLimits(val: number, propName?: string, propNameLow?: string, propNameHigh?: string): Array<number | undefined>

    /**
     * The base function for incrementing values - connected dataPoint properties will override this implementation.
     * Do not override this method in extended components !
     * @param {*} write To be defined.
     * @param {*} oldval The data point old value.
     * @todo: Fix types
    */
    incDataPoint(write: any, oldval: any): void

    /** 
     * The base function for decrementing values - connected dataPoint properties wil override this implementation.
     * Do not override this method in extended components !
     * @param {*} write  To be defined. 
     * @param {*} oldval The data point old value.
     * @todo Fix types
    */
    decDataPoint(write: any, oldval: any): void

    /** 
    * Applies the property value. Override for custom component property handling.
    * @param {string} propName The name of the property.
    * @param {string} propValue The value of the property.
    * @param {boolean} [force=true] Force property update.
    */
    sigApplyPropValue(propName: string, propValue: any, force?: boolean): void

    /** 
     * Sets the property and saves it as backup value, to set it later when needed.
     * @private
     * @param {string} propName Name of the property that is to be saved.
     * @param {*} propValue Value of the property that is to be saved.
     * @param {boolean} [force=false] Force property update.
    */
    _setValueBackup(propName: string, propValue: any, force?: boolean)

    /** 
     * Updates CSS styles of the component using Polymer method updateStyles with the CSS object passed in parameter.
     * Override this for custom component css variable handling.
     * @param {object} cssObj The CSS object that should be applied.
     * @param {boolean} [doBoundsCheck=false] If true and design mode difference between oldBounds and oldBounds should be checked after CSS style properties are applied.
     */
    sigApplyCSSValue(cssObj: cssObject, doBoundsCheck?: boolean): void

    /** 
     * Removes the component's CSS property passed in parameter. 
     * @param {string} propName Name of the property that is to be removed.
     */
    sigRemoveCSSValue(propName: string): void

    /** 
     * Applies the font object passed in the parameter to the node passed in the parameter.
     * @private
     * @param {HTMLElement} node The node to which the font object should be applied.
     * @param {object} fontObj The font object that should be applied.
     */
    _applyFontObjectToNode(node: HTMLElement, fontObj: fontObject): void

    /** 
     * Applies the font object passed in the parameter as the component main font or on a sub-component.
     * For the sub-components in dom-if templates the fontObj is saved in the property fontMap for later use.
     * You can override this for custom component font handling.
     * @param {string} propName Determines where to apply the font object.
     * @param {object} fontObj The font object that should be applied on the component.
     */
    sigApplyFontObject(propName: string, fontObj: fontObject): void

    /** 
     * Applies font objects saved in the property fontMap. 
     * @private
     */
    _applyFontMap(): void

    /** 
     * Applies the specified font object to the specified element of the font map.
     * @private
     * @param {object} fontObj Font object to apply.
     * @param {string} propName Selector of elements to which the font should be applied.
     * @param {Map<string,object>} map The saved font map.
    */
    _applyFont(fontObj: fontObject, propName: string, map: Map<string, fontObject>): void

    /** 
     * Calculates the component's bounds and returns an object describing the component's bounds.
     * @param {HTMLElement} [control=this] The component which bound should be returned.
     * @returns {object|null} Returns an object with the following component's properties: height, width, 
     * top, left, bottom, right, rotation, translateX, translateY, zindex, boxdelta, border and padding.
     * Returns null if the passed control is not a valid HTML element.
     */
    getControlBounds(control?: HTMLElement): controlBoundsObject | null

    /** 
     * Returns an object describing the component's rectangle bounds.
     * @param {HTMLElement} [control=null] The component which rectangle bounds should be returned.
     * @returns {Object|Null} The object describing the component's rectangle bounds or null if the passed control is not a valid HTML element.
     */
    getControlRectangleBounds(control?: HTMLElement): controlBoundsObject | null;

    /** 
     * Returns the rotated bounds of a component.
     * @private
     * @param {object} [bounds={}] The bounds object used to calculate the rotated bounds.
     * @returns {object} The rotated bounds object.
     */
    _getRotatedBounds(bounds?: controlBoundsObject): controlBoundsObject

    /** 
     * Returns, whether the component is rotated or not.
     * @param {number} rotation The rotation of the component given in degrees.
     * @returns {boolean} True if the component is rotated i.e. the value of the parameter rotation differs from 0 and 360.
     */
    isRotated(rotation: number): boolean

    /** 
     * Sets the bounds passed in parameters on the component.
     * @private
     * @param {number|undefined} top The distance of the element from the top of the window.
     * @param {number|undefined} left The distance of the element from the left side of the window.
     * @param {number|undefined} height The height of the element.
     * @param {number|undefined} width The width of the element.
     * @param {number|undefined} rotation Rotation of the element.
     * @param {number|undefined} translateX Translated X  of the element.
     * @param {number|undefined} translateY Translated Y of the element.
     */
    _setBounds(
        top: number | undefined,
        left: number | undefined,
        height: number | undefined,
        width: number | undefined,
        rotation: number | undefined,
        translateX: number | undefined,
        translateY: number | undefined
    ): void

    /** 
     * Calculates the scale factor of the component taking into account the component's rotation, too.
     * @param {HTMLElement} [control=this] The component which scale factor should be calculated.
     * @param {number} [rotation=this.rotation] The rotation of the component.
     * @returns {object} The component's scale factor object containing scale factors along x and y axes.
    */
    getScaleFactor(control?: HTMLElement, rotation?: number): scaleFactorObject

    /**
     * Will be called when the runtime shows or hides the component by setting "display" to "block" or "none".
     * By default, components are inserted in DOM with the "display": "block" setting, the function will not be 
     * called on insertion - use the connected callback instead.
     * The function will be called recursively first for the container and then for all its children.
     * You can override this method in extended components for custom handling.
     * @param {boolean} visible True if component is being shown, false if component is being hidden.
     * @callback
     */
    sigOnVisibilityChange(visible: boolean): void

    /**
     * Will be called when the runtime activates/deactivates the viewmodel of the component (usually when it is shown or hidden).
     * The viewmodel will activate/deactivate all properties, codemodules when being activated/deactivated itself,
     * to prevent unnecessary updates in the background while the viewmodel is inactive.
     * The function will be called recursively first for the container and then for all its children.
     * You can override this method in extended components for custom handling.
     * @callback
     * @param {boolean} active True if component is active, false if component is inactive.
     */
    sigOnActiveStateChange(active: boolean): void

    /**
     * Callback called every time the control is overloaded.
     * @param {number} dataPointId The datapoint id of the datapoint with witch the overload should be made.
     * @param {number} [selectionGroup] The number of the selection group which should be overloaded.
     * @param {number} [targetDp] The id of the target datapoint which should be overloaded.
     * @callback @abstract @virtual
     */
    sigOnOverload?(dataPointId: number, selectionGroup?: number, targetDp?: number): void

    /**
     * Callback called every time the overload of the control is reset.
     * @callback @abstract @virtual
     */
    sigOnResetOverload?(): void

    /**
     * Prevents the default action of none-touch events in case passiveTouchGestures is enabled.
     * @param {Event} evt Any valid event.
     * @param {boolean} [forceTouchEndPrevent=false] Determines if touchend events will prevent the default action.
     * @returns {boolean} Returns true if the default was prevented, otherwise it returns false.
     */
    sigPreventDefault(evt: Event, forceTouchEndPrevent?: boolean)

    /**
     * Detects if an event was initiated by touch input.
     * @private
     * @param {Event} evt A valid JavaScript event.
     * @returns {boolean} Returns true if the event was initiated by touch input or false for all other input types.
     */
    _isTouchInput(evt: Event): boolean

    /**
     * Returns the styling definitions of a controlId (=tagname) as a JSON object.
     * @private
     * @param {string} control The controlId (=tagName) to get the styling definitions for. 
     * @param {string|null} [prop=null] If set only the styling definition of this specific property name will be returned.
     * @returns {object} A JSON object containing the styling definitions.
     * @todo: Declare structure of return object.
     */
    _getDefaultSyles(control: string, prop?: string | null): object

    /**
     * Applies a runtime style class property to the control in the Light DOM, or to one or multiple control(s) in the Shadow DOM.
     * @param {string} propName If the value is 'ElementMainClass' the class name is applied to the control in the Light DOM. Otherwise, it is applied to the control(s) in Shadow DOM matching the selector.
     * @param {string} [className=window.sigApi.SIG_CONST.DEFAULT_STYLE_CLASS] The class name which should be applied.
     * @param {boolean} [remove=false] Set to true to remove the given class name, otherwise it will be applied.
     * @param {object} [parameters={}] An object containing the parameters of the style class property (include, exclude, parameters, disableRuntimeUpdates).
     * @returns {boolean} True if the class name was successfully applied or removed and false if not.#
     */
    sigApplyStyleClass(propName: string, className?: string, remove?: boolean, parameters?: stylingParameters): boolean

    /**
     * Applies the style class to the control inside the Light DOM.
     * @param {string} className The class name which should be applied.
     * @param {boolean} [remove=false] Set true to remove the given class name, otherwise it will be applied.
     * @returns {boolean} True if the style class was successfully removed or applied, false if an error occurred.
     */
    sigApplyLightDomStyleClass(className: string, remove?: boolean): boolean

    /**
     * Checks if the given element is inside the Shadow DOM.
     * @param {HTMLElement} [elm=this] The DOM ref of the element to check.
     * @returns {boolean|Undefined} Returns true if the elm is inside the Shadow DOM, or false if not.
     * Returns undefined if the elm is not a valid HTMLElement.
     */
    isInShadowDom(elm?: HTMLElement): boolean | undefined

    /**
     * Returns the parent element of the component.
     * @param {HTMLElement} [elm=this] The DOM ref of a valid HTML element which is inside the Shadow DOM.
     * @returns {HTMLElement|Null} Returns the DOM ref of the parent element, or null if there is no valid parent node.
     * Returns null if the elem is not a valid HTMLElement.
     */
    getParentHostElement(elm?: HTMLElement): HTMLElement | null;

    /**
     * Calculates and returns the real rotation of the passed rotation.
     * @param {number} [rotation=0] The rotation given as an integer number. 
     * @returns {number} The real rotation of the passed rotation.
    */
    getRealRotation(rotation?: number): number

    /**
     * Determines if the _dispatchEvent() function should dispatch the given event.
     * By default, internal default value updates, or runtime property updates will suppress the event.
     * You can bypass this check if you set dispatchAllInternalEvents = true.
     * You may override this function to implement your own logic. 
     * @param {string} event The internal event name which should be dispatched.
     * @returns {boolean} Return true, if the event should be dispatched, otherwise false.
     */
    shouldDispatchInternalEvent(event: string): boolean

    /** 
     * Gets the current bounds of the component. This method is deprecated and will be removed in Q3/2021.
     * @private
     * @returns {object} An object describing the component's bounds. It contains top, left, height and width of the component.
     */
    _getCurrentBounds(): boundsObject

    /**
    * Returns the unique name of the controls text list used by the object store based on the controls tagname. 
    * @param {string} [tagName=this.tagName] The tag name of the component. If the parameter is undefined the tag name of the current component is used.
    * @returns {string} The full name of the controls textlist, or an empty string if the given tagname is invalid.
    */
    getControlTextListName(tagName?: string): string

    /**
    * Handles the inactive interaction on the component.
    * If it is not overwritten it uses the global implementation if enabled in the project.
    * If you implemented the method yourself, do not call super(). 
    * @param {Event} evt The native JavaScript event which caused the interaction.
    * @return {Promise<any>|null} Returns a promise which is resolved when the interaction has finished 
    * or null if the inactive interaction handling is not enabled.
    */
    sigHandleInactiveInteraction(evt: Event): Promise<any> | null

    /**
     * Checks if the passed event should be intercepted.
     * If it is not overwritten it uses the global implementation if enabled in the project.
     * If you implemented the method yourself, do not call super(). 
     * @param {Event} evt The native JavaScript event which caused the interaction.
     * @return {boolean} Returns true if the interaction should be intercepted, otherwise false. 
     */
    sigInterceptInactiveInteractionEvent(evt: Event): boolean

    /**
     * Returns the context property object of a given element.
     * If the element is in the Shadow Dom it returns the context of 
     * the first Host element which is in the Light Dom.
     * @param {HTMLElement} [elm=this] The element to get the context for.
     * @return {ContextObject | null} Returns the context object or null.
     */
    getContext(elm: HTMLElement): ContextObject | null

    /**
     * Returns the first top level Host element which is in the Light Dom for a given element. 
     * @param {HTMLElement} [elm=this] The element to get the Host element for.
     * @return {HTMLElement | null} Returns the Host element or null. 
     */
    findFirstTopLevelHostElement(elm: HTMLElement): HTMLElement | null;
}

export { BaseMixin, BaseMixinConstructor };
