// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.properties
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetProperty'
 *     * 'evtGetValue'
 *     * 'evtGetUnconvertedValue'
 *     * 'evtGetUnitProp'
 *     * 'evtGetRoundType'
 *     * 'evtIsIndicateOverflow'
 *     * 'evtIsFloatingPoint'
 *     * 'evtFormatValueLike'
 *     * 'evtConvertValueLike'
 *     * 'evtConvertValueBackLike'
 *     * 'evtFormatValueWithUnit'
 *     * 'evtConvertValueWithUnit'
 *     * 'evtConvertValueBackWithUnit'
 *     * 'evtFormatValueWithUnitscheme'
 *     * 'evtConvertValueWithUnitscheme'
 *     * 'evtConvertValueBackWithUnitscheme'
 *     * 'evtDoScheme'
 *     * 'evtDoSchemeWithProperty'
 *     * 'evtGetSchemeData'
 *     * 'evtGetSchemeDataWithProperty'
 * 
 *   required control (by instanceId)
 *     * 'lvd856e166694ab42678c76c8568914cc7c'
 *           'sig-control-input'
 *               with datapoint with unit
 *               with colorScheme for property --theme-sig-control-input-color
 *
 *   required unit (by name)
 *     * 'mm'
 * 
 *   required unitScheme (by name)
 *     * 'UnitScheme0'
 *
 *   required colorScheme (by name)
 *    * 'ColorScheme0'
 * 
 *  required datapoint (by name)
 *    * '0:SampleObject.SampleServer'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DemoApiProperties {
    readonly CONTROL_INPUT = 'lvd856e166694ab42678c76c8568914cc7c';
    readonly UNIT_NAME = 'mm';
    readonly UNIT_SCHEME_NAME = 'UnitScheme0';
    readonly COLOR_SCHEME_NAME = 'ColorScheme0';
    readonly DATAPOINT_NAME = '0:SampleObject.SampleServer';
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiProperties();
        });
    }

    constructor() {
        this._registerEvents();
    }

    /**
     * @private
     * Subscribe to user defined events.
     * There is no need to use the sigUtils API to register event listeners because
     * global code modules such as this one are never destroyed during runtime. 
     */
    _registerEvents() {
        const evtGetProperty = window.sigApi.events.getUserDefinedInternalEvent('evtGetProperty');
        if (evtGetProperty) {
            window.sigApi.eventMediator.subscribe(
                evtGetProperty,
                () => {
                    this._onGetProperty();
                }
            );
        }
        const evtGetValue = window.sigApi.events.getUserDefinedInternalEvent('evtGetValue');
        if (evtGetValue) {
            window.sigApi.eventMediator.subscribe(
                evtGetValue,
                () => {
                    this._onGetValue();
                }
            );
        }
        const evtGetUnconvertedValue = window.sigApi.events.getUserDefinedInternalEvent('evtGetUnconvertedValue')
        if (evtGetUnconvertedValue) {
            window.sigApi.eventMediator.subscribe(
                evtGetUnconvertedValue,
                () => {
                    this._onGetUnconvertedValue();
                }
            );
        }
        const evtGetUnitProp = window.sigApi.events.getUserDefinedInternalEvent('evtGetUnitProp');
        if (evtGetUnitProp) {
            window.sigApi.eventMediator.subscribe(
                evtGetUnitProp,
                () => {
                    this._onGetUnitProp();
                }
            );
        }
        const evtGetRoundType = window.sigApi.events.getUserDefinedInternalEvent('evtGetRoundType');
        if (evtGetRoundType) {
            window.sigApi.eventMediator.subscribe(
                evtGetRoundType,
                () => {
                    this._onGetRoundType();
                }
            );
        }
        const evtIsIndicateOverflow = window.sigApi.events.getUserDefinedInternalEvent('evtIsIndicateOverflow');
        if (evtIsIndicateOverflow) {
            window.sigApi.eventMediator.subscribe(
                evtIsIndicateOverflow,
                () => {
                    this._onIsIndicateOverflow();
                }
            );
        }
        const evtIsFloatingPoint = window.sigApi.events.getUserDefinedInternalEvent('evtIsFloatingPoint');
        if (evtIsFloatingPoint) {
            window.sigApi.eventMediator.subscribe(
                evtIsFloatingPoint,
                () => {
                    this._onIsFloatingPoint();
                }
            );
        }
        const evtFormatValueLike = window.sigApi.events.getUserDefinedInternalEvent('evtFormatValueLike');
        if (evtFormatValueLike) {
            window.sigApi.eventMediator.subscribe(
                evtFormatValueLike,
                () => {
                    this._onFormatValueLike();
                }
            );
        }
        const evtConvertValueLike = window.sigApi.events.getUserDefinedInternalEvent('evtConvertValueLike');
        if (evtConvertValueLike) {
            window.sigApi.eventMediator.subscribe(
                evtConvertValueLike,
                () => {
                    this._onCovertValueLike();
                }
            );
        }
        const evtConvertValueBackLike = window.sigApi.events.getUserDefinedInternalEvent('evtConvertValueBackLike');
        if (evtConvertValueBackLike) {
            window.sigApi.eventMediator.subscribe(
                evtConvertValueBackLike,
                () => {
                    this._onConvertValueBackLike();
                }
            );
        }
        const evtFormatValueWithUnit = window.sigApi.events.getUserDefinedInternalEvent('evtFormatValueWithUnit');
        if (evtFormatValueWithUnit) {
            window.sigApi.eventMediator.subscribe(
                evtFormatValueWithUnit,
                () => {
                    this._onFormatValueWithUnit();
                }
            );
        }
        const evtConvertValueWithUnit = window.sigApi.events.getUserDefinedInternalEvent('evtConvertValueWithUnit');
        if (evtConvertValueWithUnit) {
            window.sigApi.eventMediator.subscribe(
                evtConvertValueWithUnit,
                () => {
                    this._onConvertValueWithUnit();
                }
            );
        }
        const evtConvertValueBackWithUnit = window.sigApi.events.getUserDefinedInternalEvent('evtConvertValueBackWithUnit');
        if (evtConvertValueBackWithUnit) {
            window.sigApi.eventMediator.subscribe(
                evtConvertValueBackWithUnit,
                () => {
                    this._onConvertValueBackWithUnit();
                }
            );
        }
        const evtFormatValueWithUnitscheme = window.sigApi.events.getUserDefinedInternalEvent('evtFormatValueWithUnitscheme');
        if (evtFormatValueWithUnitscheme) {
            window.sigApi.eventMediator.subscribe(
                evtFormatValueWithUnitscheme,
                () => {
                    this._onFormatValueWithUnitscheme();
                }
            );
        }
        const evtConvertValueWithUnitscheme = window.sigApi.events.getUserDefinedInternalEvent('evtConvertValueWithUnitscheme');
        if (evtConvertValueWithUnitscheme) {
            window.sigApi.eventMediator.subscribe(
                evtConvertValueWithUnitscheme,
                () => {
                    this._onConvertValueWithUnitscheme();
                }
            );
        }
        const evtConvertValueBackWithUnitscheme = window.sigApi.events.getUserDefinedInternalEvent('evtConvertValueBackWithUnitscheme');
        if (evtConvertValueBackWithUnitscheme) {
            window.sigApi.eventMediator.subscribe(
                evtConvertValueBackWithUnitscheme,
                () => {
                    this._onConvertValueBackWithUnitscheme();
                }
            );
        }
        const evtDoScheme = window.sigApi.events.getUserDefinedInternalEvent('evtDoScheme');
        if (evtDoScheme) {
            window.sigApi.eventMediator.subscribe(
                evtDoScheme,
                () => {
                    this._onDoScheme();
                }
            );
        }
        const evtDoSchemeWithProperty = window.sigApi.events.getUserDefinedInternalEvent('evtDoSchemeWithProperty');
        if (evtDoSchemeWithProperty) {
            window.sigApi.eventMediator.subscribe(
                evtDoSchemeWithProperty,
                () => {
                    this._onDoSchemeWithProperty();
                }
            );
        }
        const evtGetSchemeData = window.sigApi.events.getUserDefinedInternalEvent('evtGetSchemeData');
        if (evtGetSchemeData) {
            window.sigApi.eventMediator.subscribe(
                evtGetSchemeData,
                () => {
                    this._onGetSchemeData();
                }
            );
        }
        const evtGetSchemeDataWithProperty = window.sigApi.events.getUserDefinedInternalEvent('evtGetSchemeDataWithProperty');
        if (evtGetSchemeDataWithProperty) {
            window.sigApi.eventMediator.subscribe(
                evtGetSchemeDataWithProperty,
                () => {
                    this._onGetSchemeDataWithProperty();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.properties.getProperty
     */
    _onGetProperty() {
        console.log('[DemoApiProperties] _onGetProperty()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        console.log(property);
    }

    /**
     * @private
     * log the result of {Property}.getValue
     */
    _onGetValue() {
        console.log('[DemoApiProperties] _onGetValue()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        console.log(`[DemoApiProperties]     property.getValue: ${property.getValue()}`);
    }

    /**
     * @private
     * log the result of {Property}.getUnconvertedValue
     */
    _onGetUnconvertedValue() {
        console.log('[DemoApiProperties] _onGetUnconvertedValue()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        console.log(`[DemoApiProperties]     property.getUnconvertedValue: ${property.getUnconvertedValue()}`);
    }

    /**
     * @private
     * log the result of {Property}.getUnitProp
     */
    _onGetUnitProp() {
        console.log('[DemoApiProperties] _onGetUnitProp()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        if (window.sigApi.properties.instanceofPropertyDatapoint(property) === false) return;
        const propertyDatapoint = (property as SigApi.PropertyDatapoint);
        const unitProp = propertyDatapoint.getUnitProp();
        console.log('[DemoApiProperties]     property.getUnitProp:');
        console.dir(unitProp);
        if (!unitProp) return;
        const unit = unitProp.getValue();
        console.log('[DemoApiProperties]     property.getUnitProp.getValue: ${unit}');
        console.dir(unit);
    }

    /**
     * @private
     * log the result of {Property}.getRoundType
     */
    _onGetRoundType() {
        console.log('[DemoApiProperties] _onGetRoundType()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        const roundType = property.getRoundType();
        console.log(`[DemoApiProperties]     roundType: ${roundType}`);
    }

    /**
     * @private
     * log the result of {Property}.isIndicateOverflow
     */
    _onIsIndicateOverflow() {
        console.log('[DemoApiProperties] _onIsIndicateOverflow()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        const indicateOv = property.isIndicateOverflow();
        console.log(`[DemoApiProperties]     indicateOverflow: ${indicateOv}`);
    }

    /**
     * @private
     * log the result of {Property}.isFloatingPoint
     */
    _onIsFloatingPoint() {
        console.log('[DemoApiProperties] _onIsFloatingPoint()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const property = window.sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        const isFloatingPoint = property.isFloatingPoint();
        console.log(`[DemoApiProperties]     isFloatingPoint: ${isFloatingPoint}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.formatValueLike
     */
    _onFormatValueLike() {
        console.log('[DemoApiProperties] _onFormatValueLike()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const value = 30000;
        const formatedValue = window.sigApi.properties.formatValueLike(instanceId, propertyName, value);
        console.log(`[DemoApiProperties] sigApi.properties.formatValueLike('${instanceId}', '${propertyName}', ${value}) formatedValue: ${formatedValue}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueLike
     */
    _onCovertValueLike() {
        console.log('[DemoApiProperties] _onCovertValueLike()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const value = 30000;
        const convertedValue = window.sigApi.properties.convertValueLike(instanceId, propertyName, value);
        console.log(`[DemoApiProperties] sigApi.properties.convertValueLike('${instanceId}', '${propertyName}', ${value}) convertedValue: ${convertedValue}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueBackLike
     */
    _onConvertValueBackLike() {
        console.log('[DemoApiProperties] _onConvertValueBackLike()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = 'value';
        const formatedValue = '00.30';
        const convertValueBack = window.sigApi.properties.convertValueBackLike(instanceId, propertyName, formatedValue);
        console.log(`[DemoApiProperties] sigApi.properties.convertValueBackLike('${instanceId}', '${propertyName}', ${formatedValue}) convertValueBack: ${convertValueBack}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.formatValueWithUnit
     */
    _onFormatValueWithUnit() {
        console.log('[DemoApiProperties] _onFormatValueWithUnit()');
        const value = 30000;
        const isFloatingPoint = true;
        const indicateOverflow = true;
        const roundType = window.sigApi.SIG_CONST.ROUND_ROUND;
        window.sigApi.properties.formatValueWithUnit(this.UNIT_NAME, value, isFloatingPoint, indicateOverflow, roundType).then((formatedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.formatValueWithUnit('${this.UNIT_NAME}', ${value}, ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) formatedValue: ${formatedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.formatValueWithUnit('${this.UNIT_NAME}', ${value}, ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueWithUnit
     */
    _onConvertValueWithUnit() {
        console.log('[DemoApiProperties] _onConvertValueWithUnit()');
        const value = 30000;
        const isFloatingPoint = false;
        window.sigApi.properties.convertValueWithUnit(this.UNIT_NAME, value, isFloatingPoint).then((convertedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueWithUnit('${this.UNIT_NAME}', ${value}, ${isFloatingPoint}) convertedValue: ${convertedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueWithUnit('${this.UNIT_NAME}', ${value}, ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueBackWithUnit
     */
    _onConvertValueBackWithUnit() {
        console.log('[DemoApiProperties] _onConvertValueBackWithUnit()');
        const formatedValue = '00.30';
        const isFloatingPoint = false;
        window.sigApi.properties.convertValueBackWithUnit(this.UNIT_NAME, formatedValue, isFloatingPoint).then((realValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueBackWithUnit('${this.UNIT_NAME}, '${formatedValue}', ${isFloatingPoint}) realValue: ${realValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueBackWithUnit('${this.UNIT_NAME}, '${formatedValue}', ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.formatValueWithUnitscheme
     */
    _onFormatValueWithUnitscheme() {
        console.log('[DemoApiProperties] _onFormatValueWithUnitscheme()');
        const schemeIdentifier = {
            name: this.UNIT_SCHEME_NAME,
            type: window.sigApi.SIG_CONST.SCHEME_TYPE_UNIT
        };
        const value = 30000;
        const isFloatingPoint = false;
        const indicateOverflow = false;
        const roundType = window.sigApi.SIG_CONST.ROUND_ROUND;
        window.sigApi.properties.formatValueWithUnitscheme(schemeIdentifier, this.DATAPOINT_NAME, value, this.UNIT_NAME, isFloatingPoint, indicateOverflow, roundType).then((formatedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.formatValueWithUnitscheme('${this.UNIT_SCHEME_NAME}', '${this.DATAPOINT_NAME}', ${value}, '${this.UNIT_NAME}', ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) formatedValue: ${formatedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.formatValueWithUnitscheme('${this.UNIT_SCHEME_NAME}', '${this.DATAPOINT_NAME}', ${value}, '${this.UNIT_NAME}', ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueWithUnitscheme
     */
    _onConvertValueWithUnitscheme() {
        console.log('[DemoApiProperties] _onConvertValueWithUnitscheme()');
        const schemeIdentifier = {
            name: this.UNIT_SCHEME_NAME,
            type: window.sigApi.SIG_CONST.SCHEME_TYPE_UNIT
        };
        const value = 30000;
        const isFloatingPoint = false;
        window.sigApi.properties.convertValueWithUnitscheme(schemeIdentifier, this.DATAPOINT_NAME, value, this.UNIT_NAME, isFloatingPoint).then((convertedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueWithUnitscheme('${this.UNIT_SCHEME_NAME}', '${this.DATAPOINT_NAME}', ${value}, '${this.UNIT_NAME}', ${isFloatingPoint}) convertedValue: ${convertedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueWithUnitscheme('${this.UNIT_SCHEME_NAME}', '${this.DATAPOINT_NAME}', ${value}, '${this.UNIT_NAME}', ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueBackWithUnitscheme
     */
    _onConvertValueBackWithUnitscheme() {
        console.log('[DemoApiProperties] _onConvertValueBackWithUnitscheme()');
        const schemeIdentifier = {
            name: this.UNIT_SCHEME_NAME,
            type: window.sigApi.SIG_CONST.SCHEME_TYPE_UNIT
        };
        const formatedValue = '00.30';
        const isFloatingPoint = false;
        window.sigApi.properties.convertValueBackWithUnitscheme(schemeIdentifier, this.DATAPOINT_NAME, formatedValue, this.UNIT_NAME, isFloatingPoint).then((realValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueBackWithUnitscheme('${this.UNIT_SCHEME_NAME}', '${this.DATAPOINT_NAME}, '${formatedValue}', '${this.UNIT_NAME}', ${isFloatingPoint}) realValue: ${realValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueBackWithUnitscheme('${this.UNIT_SCHEME_NAME}', '${this.DATAPOINT_NAME}, '${formatedValue}', '${this.UNIT_NAME}', ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.doScheme
     */
    _onDoScheme() {
        console.log('[DemoApiProperties] _onDoScheme()');
        const schemeIdentifier = {
            name: this.COLOR_SCHEME_NAME,
            type: window.sigApi.SIG_CONST.SCHEME_TYPE_COLOR
        };
        const inputValue = 0;
        const useInputAsConstant = true;
        window.sigApi.properties.doScheme(schemeIdentifier, inputValue, useInputAsConstant).then((res) => {
            console.log(`[DemoApiProperties] sigApi.properties.doScheme({ name: '${schemeIdentifier.name}', type: ${schemeIdentifier.type} }, ${inputValue}, ${useInputAsConstant})`);
            console.dir(res);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.doScheme({ name: '${schemeIdentifier.name}', type: ${schemeIdentifier.type} }, ${inputValue}, ${useInputAsConstant}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.doSchemeWithProperty
     */
    _onDoSchemeWithProperty() {
        console.log('[DemoApiProperties] _onDoSchemeWithProperty()');
        const instanceId = this.CONTROL_INPUT;
        const propertyName = '--theme-sig-control-input-color';
        const inputValue = 0;
        const useInputAsConstant = true;
        window.sigApi.properties.doSchemeWithProperty(instanceId, propertyName, inputValue, useInputAsConstant).then((res) => {
            console.log(`[DemoApiProperties] sigApi.properties.doSchemeWithProperty('${instanceId}', '${propertyName}', ${inputValue}, ${useInputAsConstant})`);
            console.dir(res);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.doSchemeWithProperty('${instanceId}', '${propertyName}', ${inputValue}, ${useInputAsConstant}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.getSchemeData
     */
    _onGetSchemeData() {
        console.log('[DemoApiProperties] _onGetSchemeData()');
        const schemeIdentifier = {
            name: this.COLOR_SCHEME_NAME,
            type: window.sigApi.SIG_CONST.SCHEME_TYPE_COLOR
        };
        window.sigApi.properties.getSchemeData(schemeIdentifier).then((res) => {
            console.log(`[DemoApiProperties] sigApi.properties.getSchemeData({ name: '${schemeIdentifier.name}', type: ${schemeIdentifier.type} })`);
            console.dir(res);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.getSchemeData({ name: '${schemeIdentifier.name}', type: ${schemeIdentifier.type} }) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.getSchemeDataWithProperty
     */
    _onGetSchemeDataWithProperty() {
        console.log('[DemoApiProperties] _onGetSchemeDataWithProperty()');
        const instanceId = this.CONTROL_INPUT;
        const propName = '--theme-sig-control-input-color';
        window.sigApi.properties.getSchemeDataWithProperty(instanceId, propName).then((res) => {
            console.log(`[DemoApiProperties] sigApi.properties.getSchemeDataWithProperty('${instanceId}', '${propName}')`);
            console.dir(res);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.getSchemeDataWithProperty('${instanceId}', '${propName}') error: ${error}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiProperties.init();
