// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.jsonLoader
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtLoadJson'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiJsonLoader {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiJsonLoader();
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
        const evtLoadJson = window.sigApi.events.getUserDefinedInternalEvent('evtLoadJson');
        if (evtLoadJson) {
            window.sigApi.eventMediator.subscribe(
                evtLoadJson,
                () => {
                    this._onLoadJson();
                }
            );
        }
    }

    /**
     * @private
     * load a json file
     */
    _onLoadJson() {
        console.log('[DemoApiJsonLoader] _onLoadJson()');
        const url = '../../res/localization/languages.json';
        window.sigApi.jsonLoader.getJSON(
            url,
            (data) => { // onSuccess
                console.log(`[DemoApiJsonLoader] sigApi.jsonLoader.getJSON('${url}')`);
                console.dir(data);
            },
            (error) => { // onError
                console.log(`[DemoApiJsonLoader] error in sigApi.jsonLoader.getJSON('${url}') error: ${error}`);
            });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiJsonLoader.init();
