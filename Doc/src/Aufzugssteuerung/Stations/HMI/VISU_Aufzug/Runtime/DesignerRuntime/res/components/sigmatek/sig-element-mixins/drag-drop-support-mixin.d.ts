/// <reference path="../../../../rt/node_modules/@types/sig-api/index.d.ts" />

/**
 * @mixin DragDropSupportElm 
 * @version 01.02.007
 */
declare function DragDropSupportElm<T extends new (...args: any[]) => {}>(base: T): T & DragDropSupportElmConstructor

interface DragDropSupportElmConstructor {
    new(...args: any[]): DragDropSupportElm
}

interface DragDropSupportElm {

    /** Is true, if the initialization of the drag and drop is done. */
    initDragDropDone: boolean

    /** Is true, if the drag support is enabled on the component. */
    dragSupportEnabled: boolean

    /**  Is true, if the drop support is enabled on the component. */
    dropSupportEnabled: boolean

    /** Is true, if the drag on longpress is enabled on the component. */
    dragOnLongPressEnabled: boolean

    /** Is true if the element is a drag clone. */
    isdragClone: boolean

    /** The domRef of the drag clone HTML element. */
    dragClone: HTMLElement | null

    /** An object containing the custom event data. */
    dragData: object

    /** The domRef of the currently handled active drop target. Does not include s missing target. */
    activeDropTarget: HTMLElement | null

    /**  A map with all active drop target domRefs to handle. */
    validDropTargets: Map<string, HTMLElement>

    /** All drop targets at the current clone position */
    activeDropTargets: Array<HTMLElement> | null

    /**  The UID Number of the drag and drop enable event. */
    dragDropStartEvent: number | null

    /** The UID Number of the drag and drop disable event. */
    dragDropEndEvent: number | null

    /**The domRef of the current preview node. */
    previewNode: HTMLElement | null

    /** The scale factor of the sig-app used to generate the clone. */
    appScaleFactor: number | object

    /**  The current horizontal position of the drag clone. */
    dragClonePosX: number

    /** The current vertical position of the drag clone. */
    dragClonePosY: number

    /**  Is true, if the drag clone is visible. */
    dragCloneVisible: boolean

    /** A reference to the Drag and Drop Api */
    readonly dndApi: SigApi.ApiDragAndDrop | undefined

    /** A reference to the sigUtils Api */
    readonly utilsApi: SigApi.ApiSigUtils | undefined

    /** All non-Polymer properties which have to be cloned to the drag clone. */
    mandatoryCloneProperties: Array<string>

    /** The suffix which gets appended to the clone id. */
    cloneSuffix: string /** @todo How to use const from interface */

    /** All HTML tags which could cause trouble while cloning and dragging the component. */
    unsupportedCloneTags: Array<string>

    /** 
     * The css var to apply the dragged opacity.
     * Default is '--theme-sig-element-dragged-opacity'. 
     */
    draggedOpacityPropertyName: String

    /** The custom dragged opacity value applied to the drag clone. Not applied on the custom preview node.  */
    draggedOpacity: number | undefined

    /**  A map with instance ids which cancelled a specific callback. */
    callbackLocks: Map<string, string>

    /** The domRef of the node which called evt.stopCallbacksPropagation(); */
    scpTarget: Node | null

    /** Determines if stop callbacks propagation is locked globally. */
    scpGlobalLock: boolean

    /** The X offset of the visual viewport on apple mobile devices. */
    visualViewportOffsetX: number

    /**  The Y offset of the visual viewport on apple mobile devices. */
    visualViewportOffsetY: number

    /** The domRef which is currently handled including missing targets. */
    currentTarget: Node | null

    /** Determines whether it is possible to activate the Drop & Drop mode using a long press on the component. */
    dragonlongpress: boolean

    /** The minimal press duration accepted as the long press signal. */
    longpressdelay: number

    /** The event handler function to handle the dragstart event. */
    dragstartEvent: (evt: Event) => void

    /** The event handler function to handle drag event. */
    dragEvent: (evt: Event) => void

    /** The event handler function to handle the dragend event. */
    dragendEvent: (evt: Event) => void

    /** The event handler function to handle the drag on longpress event. */
    dragLongpressEvent: (evt: Event) => void

    /** 
     * Publishes the specified Runtime event using the Event Mediator API. Runtime mode only.
     * @private 
     * @param {string} event The name of the Runtime event that should be published.
     * @param {object} msg Payload of the Runtime event.
     */
    _publishRuntimeEvent(event: string, msg: object): void

    /**
     * Binds the longpress event listener of the component.
     * @private
     */
    _enableDragOnLongPress(): void

    /**
    * Removes the longpress event listener of the component.
    * @private
    */
    _disableDragOnLongPress(): void

    /**
     * This complex observer is called when isdraggable, isdroppable, isdragmode or dragonlongpress changes.
     * @private
     * @param {boolean} isdraggable Determines, whether the component is draggable.
     * @param {boolean} isdroppable Determines, whether the component is dropable.
     * @param {boolean} dragonlongpress Determines, whether the component's drag mode can be activated by long press.
     */
    _initDragDrop(isdraggable: boolean, isdroppable: boolean, dragonlongpress: boolean): void

    /**
     * This event handler is called if the runtime event 'DRAG_DROP_ENABLED' is fired.
     * @private
     * @param {number} maID The major id of the event.
     * @param {number} miID The minor id of the event.
     * @param {object} message The payload of the event.
     */
    _enableDragDrop(maID: number, miID: number, message: object): void

    /**
     * This event handler is called if the runtime event 'DRAG_DROP_DISABLED' is fired.
     * @private
     * @param {number} maID The major id of the event.
     * @param {number} miID The minor id of the event.
     * @param {object} message The payload of the event.
     */
    _disableDragDrop(maID: number, miID: number, message: object): void

    /**
     * This method adds the 'sig-element-isdroppable' class to the component.
     * @private
     */
    _addDropSupport(): void

    /**
    * This method removes the 'sig-element-isdroppable' class from the component.
    * @private
    */
    _removeDropSupport(): void

    /**
    * This method adds the 'sig-element-isdraggable' class to the component.
    * If the sig-element-isdraggable class gets applied all pointer events are immediately disabled.
    * It seems this breaks the event bubbling on firefox / android and the track event bound on the 
    * the sig-app does not get fired anymore. To prevent this, a small delay is used.
    * @private
    */
    _addDragSupport(): void

    /**
     * This method removes the 'sig-element-isdraggable' class from the component.
     * @private
     */
    _removeDragSupport(): void

    /**
     * This callback is called if drag & drop is enabled. You can override this if needed.
     * @param {number} maID The major id of the runtime event.
     * @param {number} miID The minor id of the runtime event.
     * @param {object} message The payload of the runtime event.
     */
    onComponentDragDropEnabled(maID: number, miID: number, message: object): void

    /**
     * This callback is called if drag & drop is disabled. You can override this if needed.
     * @param {number} maID The major id of the runtime event.
     * @param {number} miID The minor id of the runtime event.
     * @param {object} message The payload of the runtime event.
     */
    onComponentDragDropDisabled(maID: number, miID: number, message: object): void

    /**
     * This callback is called if the drag mode is activated by long press. You can override this if needed.
     * @param {Event} evt The polymer long press event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    onComponentLongpress(evt: Event): void

    /**
     * This callback is called if the component is draggable and starts being dragged. You can override this if needed.
     * @param {Event} evt The polymer track event. The sourcevent may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDragstart(evt: Event): void

    /**
     * This callback is called if the component is draggable and is being dragged. You can override this if needed.
     * @param {Event} evt The polymer track event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDrag(evt: Event): void

    /**
     * This callback is called if the component is dropable and the component enters the dropzone. You can override this if needed.
     * @param {Event} evt The polymer track event. The sourcevent may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDragenter(evt: Event): void

    /**
     * This callback is called if the component is dropable, while the component is over the dropzone. You can override this if needed.
     * @param {Event} evt The polymer track event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDragover(evt: Event): void

    /**
     * This callback is called if the component is dropable and the component leaves the dropzone. You can override this if needed.
     * @param {Event} evt The polymer track event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDragleave(evt: Event): void

    /**
     * This callback is called if the component is dropable and the component was dropped on the dropzone. You can override this if needed.
     * @param {Event} evt The polymer track event. The sourevent may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDrop(evt: Event): void

    /**
     * This callback is called if the component is draggable and it stops being dragged. You can override this if needed.
     * @param {Event} evt The polymer track event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    onComponentDragend(evt: Event): void

    /**
     * This callback is called if a route change event is fired while a component is being dragged. You can override this if needed.
     * @param {number} maID The major id of the runtime event.
     * @param {number} miID The minor id of the runtime event.
     * @param {object} message The payload of the runtime event.
     */
    onRouteChangedWhileDrag(maID: number, miID: number, message: object): void

    /**
     * This callback is called when a callback was cancelled by another drop target.
     * @param {string} callback The name of the callback which was cancelled or "all" if the callback was cancelled by evt.stopCallbackPropagation(); 
     * @param {Event} evt The polymer track event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    onCancelCallback(callback: string, evt: Event): void

    /**
     * Clones a given DOM reference (HTMLElement) with all its children and their Polymer properties. 
     * @private
     * @param {HTMLElement} component The DOM ref of the component which should be cloned.
     * @param {boolean} [deep=true] By default, the node is cloned with all its children. You can turn this off by setting the parameter to false.
     * @returns {HTMLElement|null} The DOM ref of the clone or NULL.
     */
    _cloneComponent(component: HTMLElement, deep?: boolean): HTMLElement | null

    /**
     * Creates the drag clone which is shown while the element is being dragged.
     * @private
     * @param {Event} evt The polymer track event. The source event may be of type mouse, touch or pointer (if enabled).
     */
    _createClone(evt: Event): void

    /**
     * Removes the drag clone from the DOM.
     * @private
     */
    _removeClone(): void

    /**
     * Clones the properties from the given source element to the target element.
     * Both elements need to be valid Sigmatek components inherited from LasalRuntimeSigElement.
     * @private
     * @param {HTMLElement} source The source element, from which the properties are cloned.
     * @param {HTMLElement} target The target element, to which the properties are cloned.
     */
    _cloneProperties(source: HTMLElement, target: HTMLElement): void

    /**
     * Walks recursively through all the DOM nodes of the given HTMLElement node.
     * @private
     * @param {HTMLElement} node The domRef of the node.
     * @param {Function} func The callback function to execute on the node.
     */
    _walkNodeTree(node: HTMLElement, func: Function): void

    /**
     * Detects if a dropable element is at the given position.
     * @private
     * @param {number} [posX=0] The horizontal position.
     * @param {number} [posY=0] The vertical position.
     * @returns {Array<HTMLElement>} Returns an array of the domRefs which are dropable.
     */
    _findDropTargets(posX?: number, posY?: number): Array<HTMLElement>

    /**
     * Finds the dropzones, which are not in the active targets list anymore.
     * @private
     * @param {HTMLElement[]} targets A list of dom refs, which are active dropzones.
     * @returns {Array<HTMLElement>} Returns an array of dom refs, which are not an active dropzone anymore.
     */
    _getDropzonesNotInTargets(targets: HTMLElement[]): Array<HTMLElement>

    /**
     * Extends the given event with custom methods to set, get and remove a custom data object.
     * @private
     * @param {Event} evt The event which should be extended.
     */
    _setEventData(evt: Event): void

    /**
     * Removes all classes starting with sig- prefix from a given component.
     * @private
     * @param {HTMLElement} component The domRef of the component to remove the classes from.
     */
    _stripSigClasses(component: HTMLElement): void

    /**
     * Shows the current drag clone.
     * @private
     */
    _showDragClone(): void

    /**
    * Hides the current drag clone.
    * @private
    */
    _hideDragClone(): void

    /**
     * Sets an existing DOM node as the source for the drag clone.
     * This DOM node must be a valid Sigmatek component inherited from LasalRuntimeSigElement.
     * @param {HTMLElement} node The domRef of the HTML element which should be used as the source for the drag clone.
     * @returns {boolean} True, if the previewnode was set, false if not.
     */
    setDragPreviewNode(node: HTMLElement): boolean

    /**
     * Gets the domRef of the currently set preview node.
     * @returns {HTMLElement|null} Returns the domRef of the preview node or null.
     */
    getDragPreviewNode(): HTMLElement | null

    /**
     * Removes the reference to the currently set preview node.
     * @param {boolean} [removeFromDom=false]  If set true, the preview node is also removed from the dom.
     */
    removeDragPreviewNode(removeFromDom?: boolean): void

    /**
     * Checks if the Shadow Dom of the component contains unsupported 
     * HTML tags like object, embed, iframe ..., which could cause
     * problems during cloning and dragging of a component. 
     * @private
     * @param {HTMLElement} [component=this]  The dom ref of the component to check.
     * @returns {Array} The array[0] will be {boolean} true or false if tags are found, array[1] contains a {Array} with all found tag names.
     */
    _containsUnsupportedCloneTags(component?: HTMLElement): Array<boolean | Array<string>>

    /**
     * Adds a new property name to the mandatoryCloneProperties array.
     * If it already exists it will not be added.
     * @param {string} property The property name which should be added.
     * @returns {boolean} Returns true if the property name was added, or false if not.
     */
    addMandatoryCloneProperty(property: string): boolean

    /**
     * Removes an existing property name from the mandatoryCloneProperties array.
     * @param {string} property The property name which should be removed.
     * @returns {boolean} Returns true if the property name was removed, or false if not.
     */
    removeMandatoryCloneProperty(property: string): boolean

    /**
     * Clears all entries in mandatoryCloneProperties array.
     */
    clearAllMandatoryCloneProperties(): void

    /**
     * Returns the mandatoryCloneProperties array.
     * @returns {Array<string>} An array containing all mandatory clone property names.
     */
    getMandatoryCloneProperties(): Array<string>

    /**
     * Sets a custom dragged opacity value for the drag clone.
     * @param {number} opacity A number from 0.0 to 1.0.
     * @returns {boolean}  True, if the opacity was successfully set. False, if the specified opacity is not Number or out of range. 
     */
    setDraggedOpacity(opacity: number): boolean

    /**
     * Gets the currently set custom dragged opacity value.
     * @returns {Number|Undefined} Number from 0.0 to 1.0, if custom opacity is set. Undefined, if no custom opacity is set.
     */
    getDraggedOpacity(): number | undefined

    /**
     * Resets the currently set custom dragged opacity value to undefined.
     */
    resetDraggedOpacity(): void

    /** 
     * Adds the long press support with the given delay.
     * @param {number} [delay=this.longpressdelay] The long press delay in milliseconds.
     * @returns {boolean} True, if the long press support was activated and delay is a valid number. False, if the delay is not a valid number.
     */
    addLongpressSupport(delay?: number): boolean

    /**
     * Removes the long press support by removing the longpress event listener.
     * @returns {boolean} True.
     */
    removeLongpressSupport(): boolean

    /**
     * Checks if the return value of a callback is false and cancels all subsequent callbacks of the same type.
     * @private
     * @param {string} callback The name of the callback.
     * @param {Array} targets An array containing all the currently handled drop targets.
     * @param {Node} target The domRef of the actively handled drop target.
     * @param {Event} evt The raw polymer Track event.
     */
    _executeCancelableCallback(callback: string, targets: Array<HTMLElement>, target: Node, evt: Event): void

    /**
     * Clears the target which called evt.stopCallbacksPropagation().
     * @private
     * @param {boolean} [force=false] Force clearing the target.
     */
    _clearScpTarget(force?: boolean): void

    /**
     * Clears all active drop targets and locks.
     * @private
     */
    _clearActiveDropTargetsAndLocks(): void

    /**
     * Returns the actively handled drop target.
     * @returns {Node|null} The domRef of the drop target.
     */
    getActiveDropTarget(): Node | null

    /**
     * Returns a list of nodes currently handled drop targets.
     * @returns {HTMLElement[]|null} The domRefs of the drop targets, or null
     */
    getActiveDropTargets(): HTMLElement[] | null

    /**
     * Stops the propagation of all subsequent callbacks regardless of the type.
     * @private
     * @param {boolean} globalLock Needs to be true to stop the propagation globally.
     */
    _stopCallbacksPropagation(globalLock: boolean): void
}

/**
 * @mixin DragDropSupportApp
 * @version 01.02.005
 */
declare function DragDropSupportApp<T extends new (...args: any[]) => {}>(base: T): T & DragDropSupportAppConstructor

interface DragDropSupportAppConstructor {
    new(...args: any[]): DragDropSupportApp
}

interface DragDropSupportApp {
    /** @todo: needs declaration */
}

export { DragDropSupportElm, DragDropSupportElmConstructor, DragDropSupportApp, DragDropSupportAppConstructor }
