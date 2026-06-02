export declare type cssObject = {
    [key: string]: string
}

export declare type boundsObject = {
    top: number
    left: number
    width: number
    height: number
    boxdelta?: number
}

/**
 * Declares mixin properties and functions needed by the Designer Runtime. 
 * The implementation itself is part of the Designer Runtime Bundle.
 * Therefore the Base Mixin Declaration extends this interface. 
 * @version 01.00.002
 */
export interface DesignerSupport {

    /**
     * Determines whether the component is selected.
     * Only available in design mode. Default: false, Reflected: true
     */
    isselected: boolean

    /**
     * Determines whether the component is a master component.
     * Only available in design mode. Default: false, Reflected: true
     */
    ismaster: boolean

    /**
     * Determines whether the component is a designer control 
     * Only available in design mode. Default: false, Reflected: true
     */
    isdesignercontrol: boolean

    /**
     * Determines whether the component is being previewed in the Default Styling Editor
     * Only available in design mode. Default: false, Reflected: true
     */
    isstylepreview: boolean

    /** 
     * Determines whether the component has handles.
     * Only available in design mode. Default: false
     */
    hasHandles: boolean

    /**   
     * This array contains tag names for which no designer* callbacks are executed.
     * Default: ['SIG-DESIGNER-GHOST', 'SIG-DESIGNER-HANDLE', 'SIG-DESIGNER-HANDLES', 'SIG-DESIGNER-LASSO'];
     * Only available in design mode.
     */
    excludeDesignerCallbacks: Array<string>


    _lastVisibilityChange: number

    /**
     * This event handler is called if the dashboard visibility changes.
     * Only available in design mode.
     */
    visibilityChangeEvent: (evt: Event) => void

    /**
     * 
     * Only available in design mode.
     */
    designerBroadCastMessageEvent: (evt: Event) => void

    /**
     * 
     * Only available in design mode.
     */
    objectStoreReadyEven: (evt: Event) => void

    /**   
     * Only available in design mode.
     */
    objectStoreUpdateEvent: (evt: Event) => void

    /**   
     * Only available in design mode.
     */
    objectStoreLanguageChgEvent: (evt: Event) => void

    /** 
     * Adds a designer tool (lasso, grid, rulers, toolbar, handles) to the component. 
     * Only available in design mode.
     * @private
     * @param {string}  [name=''] The name of a designer tool.
     * @param {string}  [createInLightDom=false] If true, the designer tool will be created in Light DOM.
     * @param {boolean} [applyAfterNextRender=false] If true, it adds the designer tool after next render.
     * @param {object}  [props={}] An object of properties which should be applied to the designer tool.
     * @returns {HTMLElement | null} Returns the created Designer Tool or null on failure.
     */
    _addDesignerTool(name?: string, createInLightDom?: boolean, applyAfterNextRender?: boolean, props?: object): HTMLElement | null

    /** 
     * Removes a designer tool (handles, lasso, rulers, grid) from the component.
     * Only available in design mode.
     * @private
     * @param {string} [name=''] Name of the designer tool that should be removed.
     * @param {boolean} [removefromLightDom=false]  If true, it will remove the designer tool from the Light DOM.
     * @returns {boolean} True, if the component was removed successfully or false on failure.
     */
    _removeDesignerTool(name?: string, removefromLightDom?: boolean): boolean

    /** 
    * Returns the specified designer tool of the component.
    * Only available in design mode.
    * @private
    * @param {string} [name=''] Name of the designer tool which should be returned.
    * @param {boolean} [getfromLightDom=false] If true, it will search for the designer tool in the Light DOM.
    * @returns {HTMLElement} The searched designer tool.
    */
    _getDesignerTool(name?: string, getfromLightDom?: boolean): HTMLElement | null

    /**
     * This is the observer method which is called every time the property isstylepreview changes.
     * Only logs the property change.
     * If necessary you need to override this method in extended components and implement your own code.
     * Only available in design mode.
     * @param {boolean} newval The new value of the isstylepreview property.
     * @param {boolean} oldval The old value of the isstylepreview property.
     */
    designerGenerateStylePreview(newval: boolean, oldval: boolean): void

    /** 
     * Resizes the handles to fit the new size / rotation. 
     * Also calls the _designOnResize() if defined.
     * Only available in design mode.
     * @private
     */
    _resizeHandles(): void

    /** 
     * Checks if the bounds of the component changed. It compares the old bounds with the new bounds.
     * If the bounds changed, it updates the rotation and translations.
     * Only available in design mode.
     * @private
     * @param {object} oldBounds The old bounds of the component.
     * @param {object} newBounds Thew new bounds of the component.
     */
    _checkIfBoundsChanged(oldBounds: boundsObject, newBounds: boundsObject): void

    /** 
     * An observer method that runs every time the property rotation changes. 
     * It calls the _setRotation method which rotates the component and
     * also calls the designerOnBoundsChanged() callback.
     * Only available in design mode.
     * @private
     * @param {number} newval The new value of the property rotation.
     * @param {number} oldval The old value of the property rotation.
    */
    _rotateComponent(newval: number, oldval: number): void

    /**
     * Returns true, if the designer callbacks are supposed to be executed.
     * Only available in design mode.
     * @private
     * @returns {boolean} Returns true, if the designer callbacks are supposed to be executed.
    */
    _executeDesignerCallback(): boolean

    /**
     * Updates CSS styles of the component using Polymer method updateStyles with the CSS object passed in parameter.
     * Only available in design mode.
     * @param {object} cssObj  The CSS object that should be checked and applied.
     */
    _doBoundsCheck(cssObj: cssObject): void

    /**
     * Adds the event handlers which are needed by the Designer Runtime.
     * Only available in design mode.
     * @private
     */
    _addDesignerEvents(): void

    /**
    * Removes the event handlers which where bound by the Designer Runtime.
    * Only available in design mode.
    * @private
    */
    _removeDesignerEvents(): void

    /**
     * A designer callback called when the the bounds of the component change.
     * Only available in design mode.
     * @param {object} newBounds An object describing the new bounds of the component.
     * @param {object} oldBounds An object describing the old bounds of the component.
    */
    designerOnBoundsChanged(newBounds: boundsObject, oldBounds: boundsObject): void

    /**
     * Called by the Designer Runtime after a CSS obj was applied to the component.
     * Only available in design mode.
     * @param {object} cssObj The css property object that was applied on the component.
     */
    designerOnAppliedCSSValue(cssObj: cssObject): void

    /**
     * Called by the Designer Runtime after a property was changed.
     * Only available in design mode.
     * @param {string} id The id of the component
     * @param {object} properties The object of the changed properties
     */
    designerOnControlUpdate(id: string, properties: object): void

    /**
     * Called by the Designer Runtime if the visibility of the dashboard changes. 
     * Only available in design mode.
     * @param {object} state State object with properties state: visible|hidden, lastVisibilityChange: Timestamp, objectStoreChanged: Boolean.
     */
    designerOnDashboardVisibilityChanged(stateObj: object): void

    /**
     * Called by the Designer Runtime if the project language changes.
     * Only available in design mode.
     * @param {object} language The definition object of the current language.
     */
    designerOnLanguageChanged(language: object): void

    /**
     * Called by the Designer Runtime if the ObjectStore is ready.
     * Only available in design mode.
     */
    designerOnObjectStoreReady(): void

    /**
     * Called by the Designer Runtime if the ObjectStore has been updated.
     * Only available in design mode.
     * @param {object} data The payload of the ObjectStore command which triggered the update.
     */
    designerOnObjectStoreUpdate(data): void

    /**
     * Called by the Designer Runtime if a BroadCast Message is received.
     * Only available in design mode.
     * @param {object} message The payload of the message.
     * @param {string} from The origin of the sender.
     * @param {string} id The unique message id.
     */
    designerOnBroadCastMessage(message: object): void
}
