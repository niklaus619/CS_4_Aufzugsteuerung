/**
 * Demo how to use sigApi.websocketState
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiWebsocketState {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiWebsocketState();
        });
    }

    constructor() {
        console.log(`[DemoApiWebsocketState] initial websocketState from api: ${sigApi.websocketState.getState()}`);
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
            sigApi.events.getInternalEvent('WS_STATE_CHG'),
            /**
             * @param {number} maId 
             * @param {number} miId 
             * @param {object} message {{number} state, {string} url}
             */
            (maId, miId, message) => {
                console.log(`[DemoApiWebsocketState] on event WS_STATE_CHG state: ${message.state}`);
                // apiWebsocketState subscribes on WS_STATE_CHG but order of execution of listeners can not be guarantied;
                // use message.state instead of sigApi.websocketState.getState() is recommended.
                // we use setTimeout here to illustrate how this problem could be mitigated
                setTimeout(() => {
                    console.log(`[DemoApiWebsocketState] after event WS_STATE_CHG sigApi.websocketState.getState(): ${sigApi.websocketState.getState()}`);
                }, 0);
            }
        );
    }

}

/**
 * Create the codemodule instance
 */
DemoApiWebsocketState.init();
