// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.state
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtRegState'
 *     * 'evtUnRegState'
 *     * 'evtGetState'
 *   required station (by id)
 *     * 0
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiState {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiState();
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
        const evtRegState = window.sigApi.events.getUserDefinedInternalEvent('evtRegState');
        if (evtRegState) {
            window.sigApi.eventMediator.subscribe(
                evtRegState,
                () => {
                    this._regState();
                }
            );
        }
        const evtUnRegState = window.sigApi.events.getUserDefinedInternalEvent('evtUnRegState');
        if (evtUnRegState) {
            window.sigApi.eventMediator.subscribe(
                evtUnRegState,
                () => {
                    this._unregState();
                }
            );
        }
        const evtGetState = window.sigApi.events.getUserDefinedInternalEvent('evtGetState');
        if (evtGetState) {
            window.sigApi.eventMediator.subscribe(
                evtGetState,
                () => {
                    this._getState();
                }
            );
        }
        const evtStateChanged = window.sigApi.events.getInternalEvent('STATE_CHANGED');
        if (evtStateChanged) {
            window.sigApi.eventMediator.subscribe(
                evtStateChanged,
                /**
                 * @param {number} maID 
                 * @param {number} miID 
                 * @param {SigState} sigState 
                 */
                (maID: number, miID: number, sigState: SigApi.SigState) => {
                    this._onStateChange(maID, miID, sigState);
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.state.registerState
     */
    _regState() {
        console.log('[DemoApiState] _regState()');
        const stationId = 0;
        // [optional] {DataView} data
        // const dv = new DataView(new ArrayBuffer(4));
        // dv.setUint32(0, stationId, true); // stationId - offset: 0 data: {uint32} 0
        window.sigApi.state.registerState(
            window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE,
            window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST,
            // dv
            { station: stationId } // {object} data
        ).then((res) => {
            console.log(`[DemoApiState] sigApi.state.registerState(${window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${res.uid} status: ${res.status}`);
        }).catch((error) => {
            console.log(`[DemoApiState] error in sigApi.state.registerState(${window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.state.unregisterState
     */
    _unregState() {
        console.log('[DemoApiState] _unregState()');
        const stationId = 0;
        // [optional] {DataView} data
        // const dv = new DataView(new ArrayBuffer(4));
        // dv.setUint32(0, stationId, true); // stationId - offset: 0 data: {uint32} 0
        window.sigApi.state.unregisterState(
            window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE,
            window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST,
            // dv
            { station: stationId } // {object} data
        ).then((res) => {
            console.log(`[DemoApiState] sigApi.state.unregisterState(${window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${res.uid} status: ${res.status}`);
        }).catch((error) => {
            console.log(`[DemoApiState] error in sigApi.state.unregisterState(${window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.state.getState
     */
    _getState() {
        const stationId = 0;
        // [optional] {DataView} data
        // const dv = new DataView(new ArrayBuffer(4));
        // dv.setUint32(0, stationId, true); // stationId - offset: 0 data: {uint32} 0
        window.sigApi.state.getState(
            window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE,
            window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST,
            // dv
            { station: stationId } // {object} data
        ).then((res) => {
            console.log(`[DemoApiState] sigApi.state.getState(${window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${res.uid} status: ${res.status}, station: ${res.station}, state: ${res.state}`);
        }).catch((error) => {
            console.log(`[DemoApiState] error in sigApi.state.getState(${window.sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${window.sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log event STATE_CHANGED
     * @param {number} maID 
     * @param {number} miID 
     * @param {SigState} sigState 
     */
    _onStateChange(maID: number, miID: number, sigState: SigApi.SigState) {
        console.log('[DemoApiState] _onStateChange()');
        if (sigState.error !== window.sigApi.SIG_CONST.ERROR_NONE) {
            console.log(`[DemoApiState]     error: ${sigState.error}`);
            return;
        }
        // [optional] processing of {DataView} sigState.data
        // const dv = new DataView(sigState.data);
        // const stationId = dv.getUint32(0, true); // stationId - offset: 0
        // const state = dv.getUint32(4, true); // state - offset: 4
        console.log(`[DemoApiState]     target: ${sigState.target} type: ${sigState.type} station: ${sigState.station} state: ${sigState.state}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiState.init();
