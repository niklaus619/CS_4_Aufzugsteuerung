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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtStationState'),
            () => {
                this._onGetStationStatus();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtStationStateTxt'),
            () => {
                this._onGetStationStatusAsString();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtIsInOfflinePreview'),
            () => {
                this._onIsInOfflinePreview();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.stationManager.getStationStatus
     */
    _onGetStationStatus() {
        console.log('[DemoApiStationManager] _onGetStationStatus()');
        const stationId = 0;
        const stationStatus = sigApi.stationManager.getStationStatus(stationId);
        console.log(`[DemoApiStationManager] sigApi.stationManager.getStationStatus(${stationId}) stationStatus: ${stationStatus}`);
    }

    /**
     * @private
     * log the result of sigApi.stationManager.getStationStatusAsString
     */
    _onGetStationStatusAsString() {
        console.log('[DemoApiStationManager] _onGetStationStatusAsString()');
        const stationId = 0;
        const stationStatusTxt = sigApi.stationManager.getStationStatusAsString(stationId);
        console.log(`[DemoApiStationManager]  sigApi.stationManager.getStationStatusAsString(${stationId}) stationStatus: ${stationStatusTxt}`);
    }

    /**
     * @private
     * log the result of sigApi.stationManager.isInOfflinePreview
     */
    _onIsInOfflinePreview() {
        console.log('[DemoApiStationManager] _onIsInOfflinePreview()');
        console.log(`[[DemoApiStationManager] sigApi.stationManager.isInOfflinePreview() ${sigApi.stationManager.isInOfflinePreview()}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiStationManager.init();
