import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';

export const UnitConversionMixin = dedupingMixin((superClass) => {
    return class extends superClass {

        constructor() {
            super();
            this.__dpUnitObj = {};
            this.VALUE_CONVERTED_SUFFIX = '_converted';
            this.VALUE_UNCONVERTED_SUFFIX = '_unconverted';
            this.OBSERVER_PREFIX = '_observedChanged_';
            this.keyboardApi = (sigApi && sigApi.keyboard) ? sigApi.keyboard : null;
            this.propertiesApi = (sigApi && sigApi.properties) ? sigApi.properties : null;
            this.datapointApi = (sigApi && sigApi.datapointManager) ? sigApi.datapointManager : null;
            this.unitApi = (sigApi && sigApi.unitManager) ? sigApi.unitManager : null;
            this.constApi = (sigApi && sigApi.SIG_CONST) ? sigApi.SIG_CONST : null;
            this.preventUnitChange = false;
            this.excludedInputTypesList = ['text', 'time-rt', 'date-rt'];
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.keyboardApi = null;
            this.propertiesApi = null;
            this.datapointApi = null;
            this.unitApi = null;
            this.constApi = null;
            this.__dpUnitObj = null;
        }

        sigSetUnitConversion(unitIndex, dpAccessObj = {}, dpPropName = 'value', unitTextPropName = 'unittext', limitLowPropName = 'limitLow', limitHighPropName = 'limitHigh') {
            const unitObj = this.unitApi.getUnit(unitIndex);
            if (!this.unitApi.instanceofUnit(unitObj)) {
                this._log('Provide a valid unit ID or unit name to convert the values.', 'WARN');
                return false;
            }
            const dpAccessObject = {
                instanceId: (dpAccessObj && dpAccessObj.instanceId) ? dpAccessObj.instanceId : this.id,
                dpPropName: (dpAccessObj && dpAccessObj.dpPropName) ? dpAccessObj.dpPropName : dpPropName
            };

            if (!this.__dpUnitObj[dpPropName]) this.__dpUnitObj[dpPropName] = {};
            this.__dpUnitObj[dpPropName].unitIndex = unitIndex;
            this.__dpUnitObj[dpPropName].unitTextPropName = unitTextPropName;
            this.__dpUnitObj[dpPropName].limitLowPropName = limitLowPropName;
            this.__dpUnitObj[dpPropName].limitHighPropName = limitHighPropName;
            this.__dpUnitObj[dpPropName].dpAccessObj = dpAccessObject;

            const inputType = this._getDataPointInputType(this._getDataPointProperty(dpPropName));
            if (!inputType || this.excludedInputTypesList.includes(inputType)) {
                this._log('Unit conversion cannot be set on a string data point', 'WARN');
                return false;
            }

            this[unitTextPropName] = unitObj.getUnitText();
            this.preventUnitChange = true;

            const unconvertedPropName = dpPropName + this.VALUE_UNCONVERTED_SUFFIX;
            const unconvertedLimitLowPropName = limitLowPropName; 
            const unconvertedLimitHighPropName = limitHighPropName; 
            const unconvertedValueObserver = this.OBSERVER_PREFIX + unconvertedPropName;
            const unitTextObserver = this.OBSERVER_PREFIX + unitTextPropName;
            const unconvertedLimitLowObserver = this.OBSERVER_PREFIX + unconvertedLimitLowPropName;
            const unconvertedLimitHighObserver = this.OBSERVER_PREFIX + unconvertedLimitHighPropName;

            if (!this.__dpUnitObj[dpPropName].observerSet) {
                this._createPropertyObserver(unconvertedPropName, unconvertedValueObserver, false);
                this._createPropertyObserver(unitTextPropName, unitTextObserver, false);
                this._createPropertyObserver(unconvertedLimitLowPropName, unconvertedLimitLowObserver, false);
                this._createPropertyObserver(unconvertedLimitHighPropName, unconvertedLimitHighObserver, false);
                this.__dpUnitObj[dpPropName].observerSet = true;


                this[unconvertedValueObserver] = () => {
                    if (this.__dpUnitObj[dpPropName]) {
                        const dpProperty = this._getDataPointProperty(dpPropName);
                        const inputType = this._getDataPointInputType(dpProperty);

                        if (this.propertiesApi.instanceofPropertyDatapoint(dpProperty) && inputType && !this.excludedInputTypesList.includes(inputType)) {
                            this._formatValueWithUnitAndDp(this.__dpUnitObj[dpPropName].unitIndex, dpProperty.getUnconvertedValue(), dpProperty)
                                .then((convertedValue) => {
                                    this[dpPropName + this.VALUE_CONVERTED_SUFFIX] = convertedValue;
                                }).catch((error) => {
                                    this._log(error, 'ERROR');
                                });
                        } else {
                            this._log('Unit conversion cannot be set on a string data point.', 'WARN');
                            this.sigRemoveUnitConversion(dpPropName);
                        }
                    }
                };

                this[unconvertedLimitLowObserver] = (newval, oldval) => {
                    this._limitChanged(newval, oldval, 'limitLow', dpPropName);
                };

                this[unconvertedLimitHighObserver] = (newval, oldval) => {
                    this._limitChanged(newval, oldval, 'limitHigh', dpPropName);
                };

                this[unitTextObserver] = () => {
                    if (this.preventUnitChange) {
                        const unitOverride = this.unitApi.getUnit(this.__dpUnitObj[dpPropName].unitIndex);
                        if (this.unitApi.instanceofUnit(unitOverride))
                            this[this.__dpUnitObj[dpPropName].unitTextPropName] = unitOverride.getUnitText();
                    }
                };
            }

            this[unconvertedValueObserver]();
            this[unitTextObserver]();
            this[unconvertedLimitLowObserver]();
            this[unconvertedLimitHighObserver]();

            return true;
        }

        sigGetUnitConversion(dpPropName = 'value') {
            if (this.__dpUnitObj && this.__dpUnitObj[dpPropName]) {
                const returnObj = Object.assign({}, this.__dpUnitObj[dpPropName]);
                delete returnObj.observerSet;
                return returnObj;
            }
            return null;
        }

        sigRemoveUnitConversion(dpPropName = 'value') {
            if (this.__dpUnitObj[dpPropName]) {
                const dpProp = this._getDataPointProperty(dpPropName);
                const unitProp = (this.propertiesApi.instanceofPropertyDatapoint(dpProp)) ? dpProp.getUnitProp() : null;

                this.preventUnitChange = false;

                const newUnitText = (unitProp && this.propertiesApi.instanceofPropertyUnit(unitProp)) ? unitProp.getValue().getUnitText() : '';
                this[this.__dpUnitObj[dpPropName].unitTextPropName] = newUnitText;

                this[dpPropName + this.VALUE_CONVERTED_SUFFIX] = undefined;
                this[this.__dpUnitObj[dpPropName].limitLowPropName + this.VALUE_CONVERTED_SUFFIX] = undefined;
                this[this.__dpUnitObj[dpPropName].limitHighPropName + this.VALUE_CONVERTED_SUFFIX] = undefined;

                this.__dpUnitObj[dpPropName] = null;
                delete this.__dpUnitObj[dpPropName];
                return true;
            }
            this._log('No unit conversion is set, there is nohing to remove.', 'WARN');
            return false;
        }

        async openKeyboardWithUnit(dpPropName = 'value') {
            if (this.__dpUnitObj[dpPropName]) {
                const keyboardid = (this.dashboardKeyboard instanceof HTMLElement) ? this.keyboardid : undefined;

                const dpProperty = this._getDataPointProperty(dpPropName);
                const dpObj = (this.propertiesApi.instanceofPropertyDatapoint(dpProperty)) ? dpProperty.getDatapoint() : undefined;
                const currentUnitIndex = this.__dpUnitObj[dpPropName].unitIndex;
                const unitObj = this.unitApi.getUnit(currentUnitIndex);
                const dpLimits = this._getDpLimits(dpObj);

                if (!this.datapointApi.instanceofDatapoint(dpObj) || !this.unitApi.instanceofUnit(unitObj) ||
                    !dpLimits || !dpLimits.limitHigh || !dpLimits.limitLow) {
                    this._log('Could not get data point or unit. Keyboard opening stopped.', 'WARN');
                    return false;
                }

                const limitLowPromise = await dpLimits.limitLow;
                const limitHighPromise = await dpLimits.limitHigh;

                const conLimitLowPromise = this._formatValueWithUnitAndDp(currentUnitIndex, limitLowPromise, dpProperty, false, this.constApi.ROUND_CEIL);
                const conLimitHighPromise = this._formatValueWithUnitAndDp(currentUnitIndex, limitHighPromise, dpProperty, false, this.constApi.ROUND_FLOOR);

                Promise.all([conLimitLowPromise, conLimitHighPromise])
                    .then(([convertedLimitLow, convertedLimitHigh]) => {
                        const keyboardMin = convertedLimitLow;
                        const keyboardMax = convertedLimitHigh;

                        this.keyboardApi.open(
                            this.type,
                            (dpObj) ? dpObj.getFullName() : '',
                            {
                                keyboardplaceholder: this.placeholder,
                                keyboardmin: keyboardMin,
                                keyboardmax: keyboardMax,
                                keyboardmaxlength: this.maxlength,
                                keyboardlang: this.activeLang,
                                ispassword: this.ispassword,
                                ignoremin: this.ignoremin,
                                ignoremax: this.ignoremax,
                                keyboardunittext: (unitObj) ? unitObj.getUnitText() : '',
                                writeonincrement: this.writeonincrement,
                                datapointtype: this.type,
                                keyboardcurrentvalue: {
                                    src: this.constApi.PROP_SRC_CONSTANT,
                                    dest: this.constApi.PROP_DEST_VARIABLE,
                                    value: this[dpPropName + this.VALUE_CONVERTED_SUFFIX]
                                },
                                customIncDataPoint: (writeToDp, value) =>
                                    this.customIncDecDataPoint(writeToDp, value, unitObj, dpObj, 'inc', dpProperty),
                                customDecDataPoint: (writeToDp, value) =>
                                    this.customIncDecDataPoint(writeToDp, value, unitObj, dpObj, 'dec', dpProperty),
                                customInputValidation: (newval, oldval) =>
                                    this.customInputValidation(newval, oldval, unitObj, dpObj)
                            }, undefined, undefined, this.keyboardwindow, this.openkeyboardbeside, keyboardid
                        ).then((value) => {

                            this.propertiesApi.convertValueBackWithUnit(currentUnitIndex, value, dpProperty.isFloatingPoint())
                                .then(unconvertedValue => this.datapointApi.writeDataPoint(dpObj.getId(), unconvertedValue))
                                .catch((error) => {
                                    this._log('Data point update failed: ' + error.errortxt, 'ERROR');
                                });

                        }).catch((err) => {
                            console.log('[openkeyboardwithunit] error in sigApi.keyboard.open:', err.errortxt);
                        });
                    });
            } else {
                this._log('You can only use this method if you set a unit conversion for the data point property.', 'WARN');
            }
        }

        customInputValidation(newval, oldval, unitObj, dpObj, decSeparator = '.') {
            const result = { isvalid: true, revertChange: false };

            if ((this.unitApi.instanceofUnit(unitObj)) && this.datapointApi.instanceofDatapoint(dpObj)) {
                const numDigits = unitObj.getNumDigits();
                const numDecimalDigits = this._getNumDecimalDigits(unitObj, dpObj);
                const split = newval.split(decSeparator);

                if (numDigits !== undefined) {
                    const comma = (split && split.length === 2) ?  1 :  0;
                    const minus = (newval.startsWith('-')) ?  1 :  0;
                    result.isvalid = result.isvalid && (newval.length - comma - minus <= numDigits);
                }

                if (numDecimalDigits !== undefined && split[1] !== undefined) {
                    result.isvalid = result.isvalid && (split[1].length <= numDecimalDigits);
                }

                result.revertChange = !result.isvalid;
            }
            return result;
        }

        customIncDecDataPoint(writeToDp, value, unitObj, dpObj, type, dpProperty) {
            if (!this.unitApi.instanceofUnit(unitObj) || !this.datapointApi.instanceofDatapoint(dpObj) ||
                !this.propertiesApi.instanceofPropertyDatapoint(dpProperty) ||
                typeof writeToDp !== 'boolean' || (type !== 'inc' && type !== 'dec') || !value) {
                this._log('Invalid parameters, value returned unchanged', 'WARN');
                return value;
            }
            const currVal = parseFloat(value);
            if (isNaN(currVal)) return undefined;
            const numDigits = this._getNumDecimalDigits(unitObj, dpObj);
            const amt = (numDigits) ? Math.pow(10, -numDigits) : 1;
            let newVal = currVal;
            if (type === 'inc') newVal = (currVal + amt);
            else if (type === 'dec') newVal = (currVal - amt);

            if (writeToDp) {
                this.propertiesApi.convertValueBackWithUnit(unitObj.getName(), newVal.toFixed(numDigits), dpProperty.isFloatingPoint())
                    .then(unconvertedValue => this.datapointApi.writeDataPoint(dpObj.getId(), unconvertedValue))
                    .catch((error) => this._log('Data point update failed: ' + error.errortxt, 'ERROR'));
            }

            return newVal.toFixed(numDigits);
        }

        _getDataPointProperty(dpPropName) {
            if (dpPropName && this.__dpUnitObj[dpPropName]) {
                const dpAccessObject = this.__dpUnitObj[dpPropName].dpAccessObj;
                return this.propertiesApi.getProperty(dpAccessObject.instanceId, dpAccessObject.dpPropName);
            }
            return null;
        }

        _getDataPointInputType(dpProperty) {
            const dpObj = (this.propertiesApi.instanceofPropertyDatapoint(dpProperty)) ? dpProperty.getDatapoint() : null;
            return (dpObj) ? dpObj.getInputType() : null;
        }

        _formatValueWithUnitAndDp(unitIndex, value, dpProperty, indicateOverflow, roundType) {
            if (this.propertiesApi.instanceofPropertyDatapoint(dpProperty)) {
                const _indicateOverflow = (typeof indicateOverflow === 'boolean') ? indicateOverflow : dpProperty.isIndicateOverflow();
                const _roundType = (typeof roundType === 'number') ? roundType : dpProperty.getRoundType();

                return this.propertiesApi.formatValueWithUnit(unitIndex, value, dpProperty.isFloatingPoint(), _indicateOverflow, _roundType);
            } else {
                return Promise.reject('Invalid data point object');
            }
        }

        _getNumDecimalDigits(unit, dataPoint) {
            if (!this.unitApi.instanceofUnit(unit) && !this.datapointManager.instanceofDatapoint(dataPoint)) return undefined;
            const unitNumDecimalDigits = (unit) ? unit.getNumDecimalDigits() : undefined;
            if (unitNumDecimalDigits !== undefined) return unitNumDecimalDigits;
            return (dataPoint.getInputType() === 'numeric') ? dataPoint.getNumDecimalDigits() : undefined;
        };


        _limitChanged(newVal, oldVal, type, dpPropName) {
            if (this.__dpUnitObj[dpPropName]) {
                const dpProperty = this._getDataPointProperty(dpPropName);
                const dpObj = (this.propertiesApi.instanceofPropertyDatapoint(dpProperty)) ? dpProperty.getDatapoint() : undefined;
                const unitObj = this.unitApi.getUnit(this.__dpUnitObj[dpPropName].unitIndex);

                const getDpLimits = this._getDpLimits(dpObj);

                if (this.unitApi.instanceofUnit(unitObj) &&
                    getDpLimits && getDpLimits[type]) {
                    const roundType = (type === 'limitLow') ? this.constApi.ROUND_CEIL : this.constApi.ROUND_FLOOR;
                    getDpLimits[type].then((limitValue) =>
                        this._formatValueWithUnitAndDp(this.__dpUnitObj[dpPropName].unitIndex, limitValue, dpProperty, false, roundType)
                    ).then((convertedValue) => {
                        const limitType = (type === 'limitLow') ? 'limitLowPropName' : 'limitHighPropName';
                        const limitConvertedPropName = this.__dpUnitObj[dpPropName][limitType] + this.VALUE_CONVERTED_SUFFIX;
                        this[limitConvertedPropName] = convertedValue;
                    }).catch((error) => {
                        this._log(error, 'ERROR');
                    });

                } else {
                    this._log(`No limit ${type} set`, 'WARN');
                    this.sigRemoveUnitConversion(dpPropName);
                }
            }
        }

        _getDpLimits(dpObj) {
            if (this.datapointApi.instanceofDatapoint(dpObj)) {
                const limitLowRef = dpObj.getLimitLow();
                const limitHighRef = dpObj.getLimitHigh();
                return {
                    limitLow: this._getLimitValue(limitLowRef),
                    limitHigh: this._getLimitValue(limitHighRef),
                };
            }
            return undefined;
        }

        _getLimitValue(limitObj) {
            if (limitObj && limitObj.type) {
                switch (limitObj.type) {
                    case 0:
                        return undefined;
                    case 1:
                        return Promise.resolve(limitObj.value);
                    case 2:
                        if (typeof limitObj.value === 'number') {
                            const limitDp = this.datapointApi.getDatapoint(limitObj.value);
                            if (this.datapointApi.instanceofDatapoint(limitDp))
                                return limitDp.getValue();
                        }
                }
            }
            return undefined;
        }
    };
});
UnitConversionMixin.mixinName = 'UnitConversionMixin';