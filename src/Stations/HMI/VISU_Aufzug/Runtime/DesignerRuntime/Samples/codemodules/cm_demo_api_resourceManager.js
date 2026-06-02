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

const IMAGE_FILE_NAME = 'SampleImage.png';

class DemoApiResourceManager {
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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetResourceUrl'),
            () => {
                this._onGetResourceUrl();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.resourceManager.getResourceUrl
     */
    _onGetResourceUrl() {
        console.log('[DemoApiResourceManager] _onGetResourceUrl()');
        const resourceFolder = 'Image';
        const res = sigApi.resourceManager.getResourceUrl(resourceFolder, IMAGE_FILE_NAME);
        console.log(`[DemoApiResourceManager] sigApi.resourceManager.getResourceUrl('${resourceFolder}', '${IMAGE_FILE_NAME}') res: ${res}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiResourceManager.init();
