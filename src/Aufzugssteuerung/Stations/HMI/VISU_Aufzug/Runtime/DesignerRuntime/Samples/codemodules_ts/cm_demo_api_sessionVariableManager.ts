// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.sessionVariableManager
 * 
 *  demo setup:
 *   required user defined internal events
 *     * 'evtCreateImage'
 *     * 'evtWriteImage'
 *     * 'evtWrite'
 *     * 'evtReadImage'
 *     * 'evtLoadImage'
 *     * 'evtLoad'
 *   any local datapoint with user defined bit: 'Save in recipe'
 *   required directory
 *     * 'c:\\demo_api_sessionVariableManager'
 * copyright by Sigmatek GmbH & CoKG
 */

const FILE = 'c:\\demo_api_sessionVariableManager\\sessionVariables.txt';

class DemoApiSessionVariableManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiSessionVariableManager();
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
        const evtCreateImage = window.sigApi.events.getUserDefinedInternalEvent('evtCreateImage');
        if (evtCreateImage) {
            window.sigApi.eventMediator.subscribe(
                evtCreateImage,
                () => {
                    this._onCreateImage();
                }
            );
        }
        const evtWriteImage = window.sigApi.events.getUserDefinedInternalEvent('evtWriteImage');
        if (evtWriteImage) {
            window.sigApi.eventMediator.subscribe(
                evtWriteImage,
                () => {
                    this._onWriteImage();
                }
            );
        }
        const evtWrite = window.sigApi.events.getUserDefinedInternalEvent('evtWrite');
        if (evtWrite) {
            window.sigApi.eventMediator.subscribe(
                evtWrite,
                () => {
                    this._onWrite();
                }
            );
        }
        const evtReadImage = window.sigApi.events.getUserDefinedInternalEvent('evtReadImage');
        if (evtReadImage) {
            window.sigApi.eventMediator.subscribe(
                evtReadImage,
                () => {
                    this._onReadImage();
                }
            );
        }
        const evtLoadImage = window.sigApi.events.getUserDefinedInternalEvent('evtLoadImage');
        if (evtLoadImage) {
            window.sigApi.eventMediator.subscribe(
                evtLoadImage,
                () => {
                    this._onLoadImage();
                }
            );
        }
        const evtLoad = window.sigApi.events.getUserDefinedInternalEvent('evtLoad');
        if (evtLoad) {
            window.sigApi.eventMediator.subscribe(
                evtLoad,
                () => {
                    this._onLoad();
                }
            );
        }
    }

    /**
     * @private
     */
    _onCreateImage() {
        window.sigApi.sessionVariableManager.createImage('headertext').then((image) => {
            console.log(`[DemoApiSessionVariableManager] createImage -> ${JSON.stringify(image)}`);
        }).catch((error) => {
            console.log(`[DemoApiSessionVariableManager] createImage -> failed with: ${JSON.stringify(error)}`);
        });
    }

    /**
     * @private
     */
    _onWriteImage() {
        window.sigApi.sessionVariableManager.createImage('headertext').then((image) => {
            window.sigApi.sessionVariableManager.writeImage(
                image,
                FILE,
                (progress) => { // progress
                    console.log(`[DemoApiSessionVariableManager] writeImage -> progress: ${JSON.stringify(progress)}`);
                },
                (progress) => { // begin
                    console.log(`[DemoApiSessionVariableManager] writeImage -> begin: ${JSON.stringify(progress)}`);
                },
                (progress) => { // end
                    console.log(`[DemoApiSessionVariableManager] writeImage -> end: ${JSON.stringify(progress)}`);
                }
            ).then(() => {
                console.log('[DemoApiSessionVariableManager] writeImage -> successful');
            }).catch((error) => {
                console.log(`[DemoApiSessionVariableManager] writeImage -> failed with: ${JSON.stringify(error)}`);
            });
        });
    }

    /**
     * @private
     */
    _onWrite() {
        window.sigApi.sessionVariableManager.write(
            FILE,
            'headertext',
            undefined, // filterInclude
            undefined, // filterExclude
            undefined, // filterBase
            (progress) => { // progress
                console.log(`[DemoApiSessionVariableManager] write -> progress: ${JSON.stringify(progress)}`);
            },
            (progress) => { // begin
                console.log(`[DemoApiSessionVariableManager] write -> begin: ${JSON.stringify(progress)}`);
            },
            (progress) => { // end
                console.log(`[DemoApiSessionVariableManager] write -> end: ${JSON.stringify(progress)}`);
            }
        ).then(() => {
            console.log('[DemoApiSessionVariableManager] write -> successful');
        }).catch((error) => {
            console.log(`[DemoApiSessionVariableManager] write -> failed with: ${JSON.stringify(error)}`);
        });
    }

    /**
     * @private
     */
    _onReadImage() {
        window.sigApi.sessionVariableManager.readImage(
            FILE,
            (progress) => { // progress
                console.log(`[DemoApiSessionVariableManager] readImage -> progress: ${JSON.stringify(progress)}`);
            },
            (progress) => { // begin
                console.log(`[DemoApiSessionVariableManager] readImage -> begin: ${JSON.stringify(progress)}`);
            },
            (progress) => { // end
                console.log(`[DemoApiSessionVariableManager] readImage -> end: ${JSON.stringify(progress)}`);
            }
        ).then((image) => {
            console.log(`[DemoApiSessionVariableManager] readImage -> ${JSON.stringify(image)}`);
        }).catch((error) => {
            console.log(`[DemoApiSessionVariableManager] readImage -> failed with: ${JSON.stringify(error)}`);
        });
    }

    /**
     * @private
     */
    _onLoadImage() {
        window.sigApi.sessionVariableManager.readImage(FILE).then((image) => {
            window.sigApi.sessionVariableManager.loadImage(image).then(() => {
                console.log('[DemoApiSessionVariableManager] loadImage -> successful');
            }).catch((error) => {
                console.log(`[DemoApiSessionVariableManager] loadImage -> failed with: ${JSON.stringify(error)}`);
            });
        });
    }

    /**
     * @private
     */
    _onLoad() {
        window.sigApi.sessionVariableManager.load(
            FILE,
            undefined, // filterInclude
            undefined, // filterExclude
            undefined, // filterBase
            (progress) => { // progress
                console.log(`[DemoApiSessionVariableManager] load -> progress: ${JSON.stringify(progress)}`);
            },
            (progress) => { // begin
                console.log(`[DemoApiSessionVariableManager] load -> begin: ${JSON.stringify(progress)}`);
            },
            (progress) => { // end
                console.log(`[DemoApiSessionVariableManager] load -> end: ${JSON.stringify(progress)}`);
            }
        ).then(() => {
            console.log('[DemoApiSessionVariableManager] load -> successful');
        }).catch((error) => {
            console.log(`[DemoApiSessionVariableManager] load -> failed with: ${JSON.stringify(error)}`);
        });
    }
}

/**
 * Create the codemodule instance
 */
DemoApiSessionVariableManager.init();
