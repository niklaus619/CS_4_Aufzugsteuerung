/// <reference path="../../../../rt/node_modules/@types/sig-api/index.d.ts" />

declare type limitTypes = 'limitHigh' | 'limitLow'
declare type limitObject = { type: number, value: string | number }
declare type limitsPromiseObject = { limitHigh?: Promise<number>, limitLow?: Promise<number> }
declare type customValidationResult = { isvalid: boolean, revertChange: boolean }
declare type incDecTypes = 'inc' | 'dec'

/**
 * Declares mixin properties and functions for unit conversion.
 * @mixin
 * @version 01.00.004
 */
declare function UnitConversionMixin<T extends new (...args: any[]) => {}>(base: T): T & UnitConversionMixinConstructor

interface UnitConversionMixinConstructor {
    new(...args: any[]): UnitConversionMixin
}

interface UnitConversionMixin {

    /** Contains registered unit conversions for the component. 
     *  @private
    */
    __dpUnitObj: object

    /** This suffix (default: '_converted') is added to the name of the value property and used as the the converted value property name */
    VALUE_CONVERTED_SUFFIX: string

    /** This suffix (default: '_unconverted') is added to the name of the value property and used as the the unconverted value property name. */
    VALUE_UNCONVERTED_SUFFIX: string

    /** This prefix (default: '_observedChanged_' ) is used to denote an observer method. */
    OBSERVER_PREFIX: string

    /** If true (default: false), the unit of the component will not change even if unit scheme or data point scheme change. */
    preventUnitChange: boolean

    /** 
     * An array of unsupported input types that cannot use the unit conversion. 
     * Currently, 'text', 'time-rt', 'date-rt' are excluded because no meaningful 
     * unit can be set on data point with this input type.  
     */
    readonly excludedInputTypesList: Array<string>

    /** Reference to the Runtime keyboard API. */
    readonly keyboardApi: SigApi.ApiKeyboardManager | null

    /** Reference to the Runtime properties API. */
    readonly propertiesApi: SigApi.ApiProperties | null

    /** Reference to the Runtime datapoint API. */
    readonly datapointApi: SigApi.ApiDatapointManager | null

    /**  Reference to the Runtime unit API. */
    readonly unitApi: SigApi.ApiUnitManager | null

    /** Reference to the Runtime CONST API. */
    readonly constApi: SigApi.ApiSigConst | null

    /**
     * Sets the unit conversion on the component. To set another unit, use this same function.
     * @param {number|string} unitIndex The unitIndex or the name of the unit that the component should display. (e.g. 10 or Fahrenheit)
     * @param {object} [dpAccessObj={}] Optional, if the component is not in shadow Dom and the name of the datapoint property is equal to dpPropName.
     * Otherwise, pass the instanceId and the data point property name of the component where the data point is set.
     * @param {string} [dpPropName='value'] The name of the value property that should be converted. 
     * The converted value will be written to dpPropName_converted. Default 'value'.
     * Remember to also set the value_unconverted predefined property, from which the converted value will be calculated.
     * @param {string} [unitTextPropName='unittext'] The name of the property that contains unit text. Default 'unittext'.
     * @param {string} [limitLowPropName='limitLow'] The name of the limitLow property in the input/output component.
     * @param {string} [limitHighPropName='limitHigh'] The name of the limitHigh property in the input/output component.
     * @returns {boolean} True if unit conversion was set, false if not.
     */
    sigSetUnitConversion(
        unitIndex: number | string,
        dpAccessObj?: object,
        dpPropName?: string,
        unitTextPropName?: string,
        limitLowPropName?: string,
        limitHighPropName?: string
    ): boolean

    /**
     * Returns an object describing the unit conversion currently set for the given property name.
     * If no unit conversion is set, null is returned.
     * @param {string} [dpPropName='value'] The name of the datapoint property that has the unit conversion set.
     * @returns {object|null} Returns an object describing the unit conversion currently set for the given property name.
     */
    sigGetUnitConversion(dpPropName?: string): object | null

    /**
     * Removes Unit conversion from the component.
     * @param {string} [dpPropName='value'] The name of the datapoint property that had the unit conversion set.
     * @returns {boolean} True, if the unit conversion was removed, false if the unit conversion for that dpPropName was not found.
     */
    sigRemoveUnitConversion(dpPropName?: string): boolean

    /**
     * Opens a keyboard with the converted unit and passes the current value, unittext to the keyboard.
     * @async
     * @param {string} [dpPropName='value'] Name of the data point property for which you registered the unit conversion.
     * @returns {Promise<undefined>} Always a resolved promise with 'undefined' as a fulfillment value.
     */
    openKeyboardWithUnit(dpPropName?: string): Promise<undefined>

    /**
     * Custom Input Validation Callback used to validate input format, e.g. number of digits and decimal digits
     * based on data point and unit settings.
     * @param {string} newval The new value to be validated.
     * @param {string} oldval The old value of the keyboard
     * @param {object} unitObj Current unit object in use, when the keyboard was opened.
     * @param {object} dpObj Current data point object in use, when the keyboard was opened.
     * @param {string} [decSeparator='.'] Decimal separator used to separate the integer part from the fractional part of the new value.
     * @returns {object} Object describing whether the newval is valid.
     */
    customInputValidation(
        newval: string,
        oldval: string,
        unitObj: SigApi.Unit,
        dpObj: SigApi.Datapoint,
        decSeparator?: string
    ): customValidationResult

    /**
     * Custom Increment or Decrement Data Point callback used to increment or decrement value by the minimal possible amount
     * based on unit and data point settings of the number of decimal digits.
     * @param {boolean} writeToDp If true, data point will  be updated instantly while keyboard still open.
     * @param {string} value The value to increment or decrement.
     * @param {object} unitObj Current unit object in use, when the keyboard was opened.
     * @param {object} dpObj Current data point object in use, when the keyboard was opened.
     * @param {string} type Type of operation, Either 'inc' if value should be incremented or 'dec' if value should be decremented.
     * @param {object} dpProperty Current data point property in use, when the keyboard was opened.
     * @returns {number} The new value.
     */
    customIncDecDataPoint(
        writeToDp: boolean,
        value: string,
        unitObj: SigApi.Unit,
        dpObj: SigApi.Datapoint,
        type: incDecTypes,
        dpProperty: SigApi.PropertyDatapoint
    ): number | string

    /**
     * Returns the data point property based on the data point access object passed in the sigSetUnitConversion method.
     * @private
     * @param {string} dpPropName The name of the property that displays the data point values. 
     * @returns {object|null} The data point property object or null if not such dpPropName was registered.
     */
    _getDataPointProperty(dpPropName: string): SigApi.PropertyDatapoint | null

    /**
     * Returns the data point input type. e.g 'numeric', 'text', 'hex', ...
     * @private
     * @param {object} dpProperty The data point property
     * @returns {string|null} Returns the datapoint input type or null if no data point input type is defined.
     */
    _getDataPointInputType(dpProperty: SigApi.PropertyDatapoint): string | null

    /**
     * Helper wrapper function that calls formatValueWithUnit() with datapoint settings as parameters.
     * @private
     * @param {string|number} unitIndex The target unit index that the value should be converted to.
     * @param {number} value The unconverted value.
     * @param {object} dpProperty The reference to the datapoint property object.
     * @param {boolean} [indicateOverflow=dpProperty.indicateOverflow] A flag which specifies if values which are greater then the maxDigits should be displayed as <<< (= true) or as the max Number (= false & correct Round Type)
     * @param {number} [roundType=dpProperty.roundType] Specifies how values are round (0 = normalRound, 1 = ceil, 2 = floor)
     * @returns {Promise<string>} A Promise which is resolved with the formatted value as parameter.
     */
    _formatValueWithUnitAndDp(
        unitIndex: string | number,
        value: number,
        dpProperty: SigApi.PropertyDatapoint,
        indicateOverflow?: boolean,
        roundType?: number
    ): Promise<string>

    /**
     * Returns the number of decimal digits of unit. If not decimal digit limitation is set on unit, it looks at
     * data point decimal digit limitation.
     * @private
     * @param {object} unit The unit object.
     * @param {object} dataPoint The data point object.
     * @returns {number|undefined} Number of decimal digits set, or undefined if no limitation is set.    
     */
    _getNumDecimalDigits(unit: SigApi.Unit, dataPoint: SigApi.Datapoint): number | undefined

    /**
     * This method is called every time limit low or limit high changes.
     * It formats the value of the limit with the target unit and writes in on the limit(Low/High)_converted property.
     * @private
     * @param {string} newVal The new value of the limit.
     * @param {string} oldVal The old value of the limit.
     * @param {string} type The type of limit (limitLow or limitHigh)
     * @param {string} dpPropName The name of the property on which the data point value is set.
     */
    _limitChanged(newVal: string, oldVal: string, type: limitTypes, dpPropName: string): void

    /**
     * Returns an object with limitLow and limitHigh Promises of the passed data point object.
     * @private
     * @param {object} dpObj The data point object.
     * @returns {object|undefined} Returns an object with limitLow and limitHigh Promises of the data point or undefined if no dp Object is passed.
     */
    _getDpLimits(dpObj: SigApi.Datapoint): limitsPromiseObject | undefined

    /**
     * Returns a Promise that, when fulfilled returns a limit value or undefined when no limit value is set.
     * @private
     * @param {object} limitObj The limit object {type: `number`, value: `string|number`}
     * The type attribute describes if the set limit is a constant(1), a datapoint(2) or not set(0).
     * If it is a constant, the value is the set limit and if it is an datapoint the value is the datapoint id.
     * If no limit was set, the value is undefined
     * @returns {Promise<number>|undefined} Returns a promise with the limit value or undefined when no limit value is set.
     */
    _getLimitValue(limitObj: limitObject): Promise<number> | undefined
}

export { UnitConversionMixin, UnitConversionMixinConstructor, limitObject, limitTypes, limitsPromiseObject, customValidationResult, incDecTypes }