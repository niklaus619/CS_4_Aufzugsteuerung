declare type stateValues = 1 | 2 | 3

/**
 * Declares mixin properties and functions needed by components which extend PolymerElement.
 * @mixin
 * @version 01.00.003
 */
declare function PolymerElementMixin<T extends new (...args: any[]) => {}>(base: T): T & PolymerElementMixinConstructor

interface PolymerElementMixinConstructor {
    new(...args: any[]): PolymerElementMixin
}

interface PolymerElementMixin {

    /** Determines if polymer notifies are dispatched for all value updates. Default is false. */
    notifyOnAllUpdateTypes: boolean

    /** Determines if polymer notifies are dispatched for internal default value updates. Default is false. */
    notifyOnInternalDefaultValueUpdate: boolean

    /** Determines if polymer notifies are dispatched for runtime value updates. Default is false. */
    notifyOnRuntimeValueUpdate: boolean

    /** Determines if polymer notifies are dispatched for value updates of components in shadow dom. Default is false. */
    notifyOnValueUpdatesInShadowDom: boolean

    /** A array containing property names, for which polymer updates should be forced. */
    arrForceUpdateProps: Array<string>

    /** Is true, if the component is used in design mode. */
    isdesignmode: boolean

    /** Determines the rotation of the component. */
    rotation: number

    /** Determines the real rotation of the component. */
    realrotation: number

    /** Determines the state of the component: 1=active, 2=inactive or 3=invisible. */
    state: stateValues

    /**
     *  The boolean result of the evaluation of the components checkbit.
     *  By default the class 'sig-element-checkbit'is applied (true) or 
     *  removed (false) by the "_onCheckbitChange" observer.
     */
    checkbit: boolean

    /**
     * Determines if a property update should dispatch a Polymer notify (= "<propertyname>-changed" event).
     * This function is only called for properties, which are defined in the Polymer properties array
     * and have the "notify" property set true. 
     * By default notifies are suppressed for runtime value updates and internal default value updates.
     * You can bypass this check if you set notifyOnAllUpdateTypes = true.
     * If you want notifies on internal default value updates, you can set notifyOnInternalDefaultValueUpdate = true.
     * If you want notifies on runtime value updates, you can set notifyOnRuntimeValueUpdate = true.
     * By default notifies are disabled for components in shadow dom. Set notifyOnValueUpdatesInShadowDom = true to notify on these updates.
     * You may override this function to implement your own logic.
     * @param {string} property The property name of the update.
     * @param {*} value The value of the property update.
     * @returns {boolean} Returns true, if the property notify should be dispatched, otherwise false.
     */
    shouldPropertyDispatchNotify(property: string, value: any): boolean

    /**
     * Configures a property, so that value changes by the component will always trigger polymer property effects.
     * Use this method if it must be ensured that every write to the property causes a datapoint write, no matter
     * if the new value equals the original value or not.
     * This could be necessary for properties that allow fast toggle of a datapoint value to mitigate
     * timing issues that cause updates to be swallowed due to the async communication with the stations.
     * 
     * Important note: 
     * Using this method on a property will cause property effects like observers to run even if no real
     * change occurred. Bear this in mind when implementing those observers, etc.
     * 
     * Possible scenario where it might be useful:
     * -> Button down writes 1 to "value" property which fires "value-changed" and causes propertyDataPoint to write 1 to its datapoint
     * -> Reflist causes propertyDataPoint to update "value" property to 1 which is already 1 - nothing happens
     * -> Button up writes 0 to "value" property which fires "value-changed" and causes propertyDataPoint to write 0 to its datapoint
     * -> Reflist has not yet updated change from 1 to 0 due to async communication
     * -> Button down writes 1 to "value" property which fires "value-changed" and causes propertyDataPoint to write 1 to its datapoint
     * -> Reflist causes propertyDataPoint to update "value" property to 0 which will update its value from 1 to 0
     * -> ERROR: Button up writes 0 to "value" property which was already set to 0 by previous Reflist update - nothing happens and the value at the PLC will never be reset!!!
     * -> Reflist causes propertyDataPoint to update "value" property to 1 which will update its value from 0 to 1     
     * This issue can be solved by calling this.sigSetForceUpdateForProperty("value") in the constructor of your component
     * 
     * @param {string} property The name of the property for which updates should be forced for value changes by the component.
     */
    sigSetForceUpdateForProperty(property: string): void

    /**
     * Default implementation for custom handling of polymer implementation that determines if a write to a property should 
     * trigger any property effects (run, notify, observer).
     * By default select properties configured by a call to "sigSetForceUpdateForProperty" method will always cause property effects
     * to trigger for value changes done by the component, even if the new value equals the old.
     * 
     * Override this to achieve custom behavior.
     * 
     * @param {string} property The name of the updated property.
     * @param {boolean} originalResult The original result of the polymer implementation.
     * @param {*} value The new value of the property.
     * @param {*} old The old value of the property.
     * @returns {boolean} Return true, if the property change should trigger property effects (run, notify, observer).
     */
    sigShouldPropertyUpdate(property: string, originalResult: boolean, value: any, old: any): boolean

    /**
     * Override of the polymer implementation that determines if a write to a property should 
     * trigger any property effects (run, notify, observer) to inject custom handling by
     * "sigShouldPropertyUpdate" method.
     * 
     * Original implementation found at "node_modules\@polymer\lib\mixins\properties-changed.js"
     * 
     * @param {string} property The property name of the update.
     * @param {*} value The new value of the property update.
     * @param {*} old The old value of the property.
     * @returns {boolean} Returns true, if the property notify should be dispatched, otherwise false.
     */
    _shouldPropertyChange(property: string, value: any, old: any): boolean
}

export { PolymerElementMixin, PolymerElementMixinConstructor, stateValues }
