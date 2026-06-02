/**
 * Demo how to use window.sigApiReadyPromise and window.eventReadyPromises
 *  * window.sigApiReadyPromise {Promise}
 *  * window.eventReadyPromises {Map} key: {string} sigApi.CONST.EVENT_READY_PROMISE_*, value: {Promise}
 *    supported keys:
 *     * sigApi.SIG_CONST.EVENT_READY_PROMISE_API_READY
 *     * sigApi.SIG_CONST.EVENT_READY_PROMISE_WS_READY
 *     * sigApi.SIG_CONST.EVENT_READY_PROMISE_ACCESS_SEQUENCE_READY
 *     * sigApi.SIG_CONST.EVENT_READY_PROMISE_LASALIDS_READY
 *
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoReadyPromises {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoReadyPromises();
        });
    }

    constructor() {
        window.eventReadyPromises.get(sigApi.SIG_CONST.EVENT_READY_PROMISE_API_READY).then(() => {
            console.log('[DemoReadyPromises] EVENT_READY_PROMISE_API_READY');
        });
        window.eventReadyPromises.get(sigApi.SIG_CONST.EVENT_READY_PROMISE_WS_READY).then(() => {
            console.log('[DemoReadyPromises] EVENT_READY_PROMISE_WS_READY');
        });
        window.eventReadyPromises.get(sigApi.SIG_CONST.EVENT_READY_PROMISE_ACCESS_SEQUENCE_READY).then(() => {
            console.log('[DemoReadyPromises] EVENT_READY_PROMISE_ACCESS_SEQUENCE_READY');
        });
        window.eventReadyPromises.get(sigApi.SIG_CONST.EVENT_READY_PROMISE_STATIONS_READY).then(() => {
            console.log('[DemoReadyPromises] EVENT_READY_PROMISE_STATIONS_READY');
        });
        window.eventReadyPromises.get(sigApi.SIG_CONST.EVENT_READY_PROMISE_LASALIDS_READY).then(() => {
            console.log('[DemoReadyPromises] EVENT_READY_PROMISE_LASALIDS_READY');
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoReadyPromises.init();
