// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.unitManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetUnit'
 *     * 'evtGetUnitList'
 * 
 *   required unit (by name)
 *     * 'mm'
 *
 * copyright by Sigmatek GmbH & CoKG
 */

class DemoApiUnitManager {
    readonly UNIT_NAME = 'mm';
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiUnitManager();
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
        const evtGetUnit = window.sigApi.events.getUserDefinedInternalEvent('evtGetUnit');
        if (evtGetUnit) {
            window.sigApi.eventMediator.subscribe(
                evtGetUnit,
                () => {
                    this._onGetUnit();
                }
            );
        }
        const evtGetUnitList = window.sigApi.events.getUserDefinedInternalEvent('evtGetUnitList');
        if (evtGetUnitList) {
            window.sigApi.eventMediator.subscribe(
                evtGetUnitList,
                () => {
                    this._onGetUnitList();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.unitManager.getUnit
     */
    _onGetUnit() {
        console.log('[DemoApiUnitManager] _onGetUnit()');
        const unit = window.sigApi.unitManager.getUnit(this.UNIT_NAME);
        if (!unit) {
            console.log(`[DemoApiUnitManager] sigApi.unitManager.getUnit('${this.UNIT_NAME}') ${unit}`);
            return;
        }
        console.log(`[DemoApiUnitManager] sigApi.unitManager.getUnit('${this.UNIT_NAME}')`);
        console.log(`[DemoApiUnitManager]     unit: ${unit.getName()}`);
        console.log(`[DemoApiUnitManager]     numDigits: ${unit.getNumDigits()}`);
        console.log(`[DemoApiUnitManager]     numDecimalDigits: ${unit.getNumDecimalDigits()}`);
        console.log(`[DemoApiUnitManager]     hasFixedDecimalPoint: ${unit.hasFixedDecimalPoint()}`);
        console.log(`[DemoApiUnitManager]     hasLeadingZeros: ${unit.hasLeadingZeros()}`);

    }

    /**
     * @private
     * log the result of sigApi.unitManager.getUnitList
     */
    _onGetUnitList() {
        console.log('[DemoApiUnitManager] _onGetUnitList()');
        const list = window.sigApi.unitManager.getUnitList();
        console.log(`[DemoApiUnitManager] sigApi.unitManager.getUnitList() ${list.length} units loaded`);
        for (let ii = 0, len = list.length; ii < len; ii += 1) {
            const unit = list[ii];
            console.log(`[DemoApiUnitManager]     list[${ii}]:`);
            console.log(`[DemoApiUnitManager]         unit: ${unit.getName()}`);
            console.log(`[DemoApiUnitManager]         numDigits: ${unit.getNumDigits()}`);
            console.log(`[DemoApiUnitManager]         numDecimalDigits: ${unit.getNumDecimalDigits()}`);
            console.log(`[DemoApiUnitManager]         hasFixedDecimalPoint: ${unit.hasFixedDecimalPoint()}`);
            console.log(`[DemoApiUnitManager]         hasLeadingZeros: ${unit.hasLeadingZeros()}`);
        }
    }

}

/**
 * Create the codemodule instance
 */
DemoApiUnitManager.init();
