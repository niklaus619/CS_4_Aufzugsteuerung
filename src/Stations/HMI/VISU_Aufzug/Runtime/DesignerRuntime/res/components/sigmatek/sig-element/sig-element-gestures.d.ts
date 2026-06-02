/**
 *  * Implements additional gestures based on pointer or mouse & touch events to polymer.
 *
 * on-tap:
 *   event detail:  x, y (position of the pointer)
 * on-down:
 *   event detail: x, y (position of the pointer)
 * on-up:
 *   event detail: x, y (position of the pointer)
 * on-track:
 *   event detail: x, y (position of the pointer) | dx, dy (relative position from start) | ddx, ddy (relative position from last tracking point)
 * on-longpress:
 *   event detail: x, y (position of the pointer)
 *   set data-longpressdelay on a component (in ms) to override default 500ms
 * on-pinchzoom:
 *   event detail: x, y (position of the pointer)
 *                 dx, dy (relative position from start)
 *                 ddx, ddy (relative position from last tracking point)
 *                 dist (calculate the square root of the sum of squares of the 2 pointer positions), distfactor (-1 ... pinch, +1 ... zoom)
 *                 rotation (two finger delta angle during gesture in rad)
 *                 rotationstart (two finger angle at start of gesture in rad)
 *
 * Additional served pointerevents if pointer events are enabled
 *
 *   on-pointerdown
 *   on-pointerup
 *   on-pointerenter
 *   on-pointermove
 *   on-pointerover
 *   on-pointerleave
 *   on-pointerout
 *   on-pointercancel
 * 
 * @class
 * @classdesc Implements additional gesture handlers for polymer gestures.
 * @version 01.02.000
 */
declare class SigGestures {
    constructor(usePointerEvents: boolean)

    /* If true the class uses pointer events instead of mouse or touch. Needs to be passed by the constructor. Default = false */
    usePointerEvents: boolean

    /** The radius for track and tap gestures. Default = 5 */
    trackDistance: number

    /** The number of last N track positions to keep in the gesture event. Default = 2 */
    trackLength: number

    /**The internal default longpress delay in milliseconds. This value may be overwritten by the component. Default = 500 */
    longPressDelay: number

    /** 
     * A array of tag names which are exclude when checking for a longpress. 
     * Default = ['SIG-WRAPPER', 'SIG-DASHBOARD', 'SIG-APP', 'SIG-COMPOSITE-CONTROL']
     */
    excludedTargets: ['SIG-WRAPPER', 'SIG-DASHBOARD', 'SIG-APP', 'SIG-COMPOSITE-CONTROL']

    /** Property name of DOM nodes where Polymer Gestures stores information about gestures. Default: __polymerGestures */
    readonly GESTURE_KEY: '__polymerGestures';

    /**
     * Registers the new gesture handlers in polymer.
     * @private
     */
    _init(): void

    /**
     * Register the additional gesture handlers based on mouse and touch events.
     * @private
     * @param {object} Gestures The reference to the polymer gestures module.
     * @param {object} SigGestures The reference to the Sigmatek gesture class.
     */
    _addToTouch(Gestures: object, SigGestures: object): void

    /**
    * Register the additional gesture handlers based on pointer events
    * @private
    * @param {object} Gestures The reference to the polymer gestures module
    * @param {object} SigGestures The reference to the Sigmatek gesture class
    */
    _addToPointer(Gestures: object, SigGestures: object): void

    /**
     * Finds the dom reference of the host component in the light dom based on the the event target.
     * @param {HTMLElement} target The dom reference of the event target.
     * @returns {HTMLElement|null} Returns the dom reference of the the host component in the light dom, or null.
     */
    getRealTarget(target: HTMLElement): HTMLElement | null

    /**
     * Checks the if a given html element is inside the shadow dom.
     * @private
     * @param {HTMLElement} elm The dom reference of the html element.
     * @returns {Boolean|Undefined} Returns true if the element is in the shadow dom, or false if not. It returns undefined if the element is not of type HTMLElement or HTMLDocument
     */
    _isInShadowDom(elm: HTMLElement): boolean | undefined

    /**
     * Returns the dom reference of the host element in the light dom of a given element in the shadow dom.
     * @private
     * @param {HTMLElement} elm The dom reference of the element in the shadow dom.
     * @returns {HTMLElement|null} The dom reference of the host element in the light dom, or null if it could not be found.
     */
    _getParentHostElement(elm: HTMLElement): HTMLElement | null

    /**
     * Returns the currently set default longpress delay.
     * @returns {number} The longpress delay in milliseconds.
     */
    getLongPressDelay(): number

    /**
     * Sets the default longpress delay.
     * @param {number} delay The longpress delay in milliseconds.
     */
    setLongPressDelay(delay: number): void

    /**
     * Returns the currently set track length.
     * @returns {number} The track length
     */
    getTrackLength(): number

    /**
     * Sets the default track length.
     * @param {number} length The track length.
     */
    setTrackLength(length: number): void

    /**
     * Returns the currently set track distance.
     * @returns {number} The track distance
     */
    getTrackDistance(): number

    /**
    * Sets the default track length.
    * @param {number} distance The track distance.
    */
    setTrackDistance(distance: number): void
}
export declare const sigGestures: SigGestures;
