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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRegState'),
            () => {
                this._regState();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtUnRegState'),
            () => {
                this._unregState();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetState'),
            () => {
                this._getState();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getInternalEvent('STATE_CHANGED'),
            /**
             * @param {number} maID 
             * @param {number} miID 
             * @param {SigState} sigState 
             */
            (maID, miID, sigState) => {
                this._onStateChange(maID, miID, sigState);
            }
        );
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
        sigApi.state.registerState(
            sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE,
            sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST,
            // dv
            { station: stationId } // {object} data
        ).then((res) => {
            console.log(`[DemoApiState] sigApi.state.registerState(${sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${res.uid} status: ${res.status}`);
        }).catch((error) => {
            console.log(`[DemoApiState] error in sigApi.state.registerState(${sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
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
        sigApi.state.unregisterState(
            sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE,
            sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST,
            // dv
            { station: stationId } // {object} data
        ).then((res) => {
            console.log(`[DemoApiState] sigApi.state.unregisterState(${sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${res.uid} status: ${res.status}`);
        }).catch((error) => {
            console.log(`[DemoApiState] error in sigApi.state.unregisterState(${sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
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
        sigApi.state.getState(
            sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE,
            sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST,
            // dv
            { station: stationId } // {object} data
        ).then((res) => {
            console.log(`[DemoApiState] sigApi.state.getState(${sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${res.uid} status: ${res.status}, station: ${res.station}, state: ${res.state}`);
        }).catch((error) => {
            console.log(`[DemoApiState] error in sigApi.state.getState(${sigApi.SIG_CONST.STATION_STATE_TARGET_DATASERVICE}, ${sigApi.SIG_CONST.STATION_STATE_TYPE_LASALID_LIST}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log event STATE_CHANGED
     * @param {number} maID 
     * @param {number} miID 
     * @param {SigState} sigState 
     */
    _onStateChange(maID, miID, sigState) {
        console.log('[DemoApiState] _onStateChange()');
        if (sigState.error !== sigApi.SIG_CONST.ERROR_NONE) {
            console.log(`[DemoApiState]     error: ${sigState.error}`);
            return;
        }
        // [optional] processing of {DataView} sigState.data
        // const dv = new DataView(sigState.data);
        // const stationId = dv.getUint32(0, true); // stationId - offset: 0
        // const state = dv.getUint32(4, true); // state - offset: 4
        console.log(`[DemoApiState]     uid: ${sigState.uid} target: ${sigState.target} type: ${sigState.type} station: ${sigState.station} state: ${sigState.state}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiState.init();
