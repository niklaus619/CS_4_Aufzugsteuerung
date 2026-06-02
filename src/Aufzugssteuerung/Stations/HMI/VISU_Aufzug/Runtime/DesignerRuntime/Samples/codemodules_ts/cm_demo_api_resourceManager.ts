// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.resourceManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetResourceUrl'
 *   required image
 *     * 'SampleImage.png'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DemoApiResourceManager {
    readonly IMAGE_FILE_NAME = 'SampleImage.png';
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiResourceManager();
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
        const evtGetResourceUrl = window.sigApi.events.getUserDefinedInternalEvent('evtGetResourceUrl');
        if (evtGetResourceUrl) {
            window.sigApi.eventMediator.subscribe(
                evtGetResourceUrl,
                () => {
                    this._onGetResourceUrl();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.resourceManager.getResourceUrl
     */
    _onGetResourceUrl() {
        console.log('[DemoApiResourceManager] _onGetResourceUrl()');
        const resourceFolder = 'Image';
        const res = window.sigApi.resourceManager.getResourceUrl(resourceFolder, this.IMAGE_FILE_NAME);
        console.log(`[DemoApiResourceManager] sigApi.resourceManager.getResourceUrl('${resourceFolder}', '${this.IMAGE_FILE_NAME}') res: ${res}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiResourceManager.init();
