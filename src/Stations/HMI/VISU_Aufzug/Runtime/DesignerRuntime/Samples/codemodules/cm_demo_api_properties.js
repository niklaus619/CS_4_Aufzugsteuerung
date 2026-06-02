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

const CONTROL_INPUT = 'lvd856e166694ab42678c76c8568914cc7c';
const UNIT_NAME = 'mm';
const UNIT_SCHEME_NAME = 'UnitScheme0';
const COLOR_SCHEME_NAME = 'ColorScheme0';
const DATAPOINT_NAME = '0:SampleObject.SampleServer';

class DemoApiProperties {
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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetProperty'),
            () => {
                this._onGetProperty();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetValue'),
            () => {
                this._onGetValue();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetUnconvertedValue'),
            () => {
                this._onGetUnconvertedValue();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetUnitProp'),
            () => {
                this._onGetUnitProp();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetRoundType'),
            () => {
                this._onGetRoundType();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtIsIndicateOverflow'),
            () => {
                this._onIsIndicateOverflow();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtIsFloatingPoint'),
            () => {
                this._onIsFloatingPoint();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtFormatValueLike'),
            () => {
                this._onFormatValueLike();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtConvertValueLike'),
            () => {
                this._onCovertValueLike();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtConvertValueBackLike'),
            () => {
                this._onConvertValueBackLike();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtFormatValueWithUnit'),
            () => {
                this._onFormatValueWithUnit();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtConvertValueWithUnit'),
            () => {
                this._onConvertValueWithUnit();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtConvertValueBackWithUnit'),
            () => {
                this._onConvertValueBackWithUnit();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtFormatValueWithUnitscheme'),
            () => {
                this._onFormatValueWithUnitscheme();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtConvertValueWithUnitscheme'),
            () => {
                this._onConvertValueWithUnitscheme();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtConvertValueBackWithUnitscheme'),
            () => {
                this._onConvertValueBackWithUnitscheme();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtDoScheme'),
            () => {
                this._onDoScheme();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtDoSchemeWithProperty'),
            () => {
                this._onDoSchemeWithProperty();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetSchemeData'),
            () => {
                this._onGetSchemeData();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetSchemeDataWithProperty'),
            () => {
                this._onGetSchemeDataWithProperty();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.properties.getProperty
     */
    _onGetProperty() {
        console.log('[DemoApiProperties] _onGetProperty()');
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        console.log(property);
    }

    /**
     * @private
     * log the result of {Property}.getValue
     */
    _onGetValue() {
        console.log('[DemoApiProperties] _onGetValue()');
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
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
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
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
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        if (!property) return;
        const unitProp = property.getUnitProp();
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
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
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
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        const indicateOv = property.isIndicateOverflow();
        console.log(`[DemoApiProperties]     indicateOverflow: ${indicateOv}`);
    }

    /**
     * @private
     * log the result of {Property}.isFloatingPoint
     */
    _onIsFloatingPoint() {
        console.log('[DemoApiProperties] _onIsFloatingPoint()');
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const property = sigApi.properties.getProperty(instanceId, propertyName);
        console.log(`[DemoApiProperties] sigApi.properties.getProperty('${instanceId}', '${propertyName}')`);
        const isFloatingPoint = property.isFloatingPoint();
        console.log(`[DemoApiProperties]     isFloatingPoint: ${isFloatingPoint}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.formatValueLike
     */
    _onFormatValueLike() {
        console.log('[DemoApiProperties] _onFormatValueLike()');
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const value = 30000;
        const formatedValue = sigApi.properties.formatValueLike(instanceId, propertyName, value);
        console.log(`[DemoApiProperties] sigApi.properties.formatValueLike('${instanceId}', '${propertyName}', ${value}) formatedValue: ${formatedValue}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueLike
     */
    _onCovertValueLike() {
        console.log('[DemoApiProperties] _onCovertValueLike()');
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const value = 30000;
        const convertedValue = sigApi.properties.convertValueLike(instanceId, propertyName, value);
        console.log(`[DemoApiProperties] sigApi.properties.convertValueLike('${instanceId}', '${propertyName}', ${value}) convertedValue: ${convertedValue}`);
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueBackLike
     */
    _onConvertValueBackLike() {
        console.log('[DemoApiProperties] _onConvertValueBackLike()');
        const instanceId = CONTROL_INPUT;
        const propertyName = 'value';
        const formatedValue = '00.30';
        const convertValueBack = sigApi.properties.convertValueBackLike(instanceId, propertyName, formatedValue);
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
        const roundType = sigApi.SIG_CONST.ROUND_ROUND;
        sigApi.properties.formatValueWithUnit(UNIT_NAME, value, isFloatingPoint, indicateOverflow, roundType).then((formatedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.formatValueWithUnit('${UNIT_NAME}', ${value}, ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) formatedValue: ${formatedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.formatValueWithUnit('${UNIT_NAME}', ${value}, ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) error: ${error}`);
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
        sigApi.properties.convertValueWithUnit(UNIT_NAME, value, isFloatingPoint).then((convertedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueWithUnit('${UNIT_NAME}', ${value}, ${isFloatingPoint}) convertedValue: ${convertedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueWithUnit('${UNIT_NAME}', ${value}, ${isFloatingPoint}) error: ${error}`);
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
        sigApi.properties.convertValueBackWithUnit(UNIT_NAME, formatedValue, isFloatingPoint).then((realValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueBackWithUnit('${UNIT_NAME}, '${formatedValue}', ${isFloatingPoint}) realValue: ${realValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueBackWithUnit('${UNIT_NAME}, '${formatedValue}', ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.formatValueWithUnitscheme
     */
    _onFormatValueWithUnitscheme() {
        console.log('[DemoApiProperties] _onFormatValueWithUnitscheme()');
        const schemeIdentifier = {
            name: UNIT_SCHEME_NAME,
            type: sigApi.SIG_CONST.SCHEME_TYPE_UNIT
        };
        const value = 30000;
        const isFloatingPoint = false;
        const indicateOverflow = false;
        const roundType = sigApi.SIG_CONST.ROUND_ROUND;
        sigApi.properties.formatValueWithUnitscheme(schemeIdentifier, DATAPOINT_NAME, value, UNIT_NAME, isFloatingPoint, indicateOverflow, roundType).then((formatedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.formatValueWithUnitscheme('${UNIT_SCHEME_NAME}', '${DATAPOINT_NAME}', ${value}, '${UNIT_NAME}', ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) formatedValue: ${formatedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.formatValueWithUnitscheme('${UNIT_SCHEME_NAME}', '${DATAPOINT_NAME}', ${value}, '${UNIT_NAME}', ${isFloatingPoint}, ${indicateOverflow}, ${roundType}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueWithUnitscheme
     */
    _onConvertValueWithUnitscheme() {
        console.log('[DemoApiProperties] _onConvertValueWithUnitscheme()');
        const schemeIdentifier = {
            name: UNIT_SCHEME_NAME,
            type: sigApi.SIG_CONST.SCHEME_TYPE_UNIT
        };
        const value = 30000;
        const isFloatingPoint = false;
        sigApi.properties.convertValueWithUnitscheme(schemeIdentifier, DATAPOINT_NAME, value, UNIT_NAME, isFloatingPoint).then((convertedValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueWithUnitscheme('${UNIT_SCHEME_NAME}', '${DATAPOINT_NAME}', ${value}, '${UNIT_NAME}', ${isFloatingPoint}) convertedValue: ${convertedValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueWithUnitscheme('${UNIT_SCHEME_NAME}', '${DATAPOINT_NAME}', ${value}, '${UNIT_NAME}', ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.convertValueBackWithUnitscheme
     */
    _onConvertValueBackWithUnitscheme() {
        console.log('[DemoApiProperties] _onConvertValueBackWithUnitscheme()');
        const schemeIdentifier = {
            name: UNIT_SCHEME_NAME,
            type: sigApi.SIG_CONST.SCHEME_TYPE_UNIT
        };
        const formatedValue = '00.30';
        const isFloatingPoint = false;
        sigApi.properties.convertValueBackWithUnitscheme(schemeIdentifier, DATAPOINT_NAME, formatedValue, UNIT_NAME, isFloatingPoint).then((realValue) => {
            console.log(`[DemoApiProperties] sigApi.properties.convertValueBackWithUnitscheme('${UNIT_SCHEME_NAME}', '${DATAPOINT_NAME}, '${formatedValue}', '${UNIT_NAME}', ${isFloatingPoint}) realValue: ${realValue}`);
        }).catch((error) => {
            console.log(`[DemoApiProperties] error in sigApi.properties.convertValueBackWithUnitscheme('${UNIT_SCHEME_NAME}', '${DATAPOINT_NAME}, '${formatedValue}', '${UNIT_NAME}', ${isFloatingPoint}) error: ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.properties.doScheme
     */
    _onDoScheme() {
        console.log('[DemoApiProperties] _onDoScheme()');
        const schemeIdentifier = {
            name: COLOR_SCHEME_NAME,
            type: sigApi.SIG_CONST.SCHEME_TYPE_COLOR
        };
        const inputValue = 0;
        const useInputAsConstant = true;
        sigApi.properties.doScheme(schemeIdentifier, inputValue, useInputAsConstant).then((res) => {
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
        const instanceId = CONTROL_INPUT;
        const propertyName = '--theme-sig-control-input-color';
        const inputValue = 0;
        const useInputAsConstant = true;
        sigApi.properties.doSchemeWithProperty(instanceId, propertyName, inputValue, useInputAsConstant).then((res) => {
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
            name: COLOR_SCHEME_NAME,
            type: sigApi.SIG_CONST.SCHEME_TYPE_COLOR
        };
        sigApi.properties.getSchemeData(schemeIdentifier).then((res) => {
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
        const instanceId = CONTROL_INPUT;
        const propName = '--theme-sig-control-input-color';
        sigApi.properties.getSchemeDataWithProperty(instanceId, propName).then((res) => {
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
