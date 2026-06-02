// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.stationManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtStationState'
 *     * 'evtStationStateTxt'
 *     * 'evtIsInOfflinePreview'
 *   required station (by id)
 *     * 0
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiStationManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiStationManager();
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
        const evtStationState = window.sigApi.events.getUserDefinedInternalEvent('evtStationState');
        if (evtStationState) {
            window.sigApi.eventMediator.subscribe(
                evtStationState,
                () => {
                    this._onGetStationStatus();
                }
            );
        }
        const evtStationStateTxt = window.sigApi.events.getUserDefinedInternalEvent('evtStationStateTxt');
        if (evtStationStateTxt) {
            window.sigApi.eventMediator.subscribe(
                evtStationStateTxt,
                () => {
                    this._onGetStationStatusAsString();
                }
            );
        }
        const evtIsInOfflinePreview = window.sigApi.events.getUserDefinedInternalEvent('evtIsInOfflinePreview');
        if (evtIsInOfflinePreview) {
            window.sigApi.eventMediator.subscribe(
                evtIsInOfflinePreview,
                () => {
                    this._onIsInOfflinePreview();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.stationManager.getStationStatus
     */
    _onGetStationStatus() {
        console.log('[DemoApiStationManager] _onGetStationStatus()');
        const stationId = 0;
        const stationStatus = window.sigApi.stationManager.getStationStatus(stationId);
        console.log(`[DemoApiStationManager] sigApi.stationManager.getStationStatus(${stationId}) stationStatus: ${stationStatus}`);
    }

    /**
     * @private
     * log the result of sigApi.stationManager.getStationStatusAsString
     */
    _onGetStationStatusAsString() {
        console.log('[DemoApiStationManager] _onGetStationStatusAsString()');
        const stationId = 0;
        const stationStatusTxt = window.sigApi.stationManager.getStationStatusAsString(stationId);
        console.log(`[DemoApiStationManager]  sigApi.stationManager.getStationStatusAsString(${stationId}) stationStatus: ${stationStatusTxt}`);
    }

    /**
     * @private
     * log the result of sigApi.stationManager.isInOfflinePreview
     */
    _onIsInOfflinePreview() {
        console.log('[DemoApiStationManager] _onIsInOfflinePreview()');
        console.log(`[[DemoApiStationManager] sigApi.stationManager.isInOfflinePreview() ${window.sigApi.stationManager.isInOfflinePreview()}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiStationManager.init();
