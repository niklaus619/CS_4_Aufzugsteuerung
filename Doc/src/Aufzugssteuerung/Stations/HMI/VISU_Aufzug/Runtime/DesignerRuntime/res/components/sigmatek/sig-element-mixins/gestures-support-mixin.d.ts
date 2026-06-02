import type * as Gestures from '../../../../rt/node_modules/@polymer/polymer/lib/utils/gestures.js';

/**
 * Declares mixin properties and functions needed for gestures support in components based on sig-element. 
 * @mixin
 * @version 01.00.002
 */
declare function GestureEventListeners<T extends new (...args: any[]) => {}>(base: T): T & GestureEventListenersConstructor

interface GestureEventListenersConstructor {
    new(...args: any[]): GestureEventListeners
}

interface GestureEventListeners {

    /** Determines whether the component is being moved. Default = false */
    iszooming: boolean

    /**  Determines whether the component is being zoomed. Default=false */
    ismoving: boolean

    /**
    * Readonly property containing the Polymer Gestures functions.
    * @readonly
    */
    get gestures(): typeof Gestures
}

export { GestureEventListeners, GestureEventListenersConstructor }