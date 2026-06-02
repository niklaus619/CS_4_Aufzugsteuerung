/**
 * Demo how to use sigApi.colorManager
 *
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetColor'
 *     * 'evtToRGBA'
 *     * 'evtToHash'
 *
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiColorManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiColorManager();
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
            sigApi.events.getUserDefinedInternalEvent('evtGetColor'),
            () => {
                this._onGetColor();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtToRGBA'),
            () => {
                this._onToRGBA();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtToHash'),
            () => {
                this._onToHash();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.colorManager.getColor
     */
    _onGetColor() {
        console.log('[DemoApiColorManager] _onGetColor()');
        const colorPalette = 'HtmlColorPalette';
        const color = 'lime';
        const res = sigApi.colorManager.getColor(colorPalette, color);
        console.dir(res);
    }

    /**
     * @private
     * log the result of sigApi.colorManager.toRGBA
     */
    _onToRGBA() {
        console.log('[DemoApiColorManager] _onToRGBA()');
        const color = '#FF45BA32';
        console.log(`[DemoApiColorManager] sigApi.colorManager.toRGBA(${color}): ${sigApi.colorManager.toRGBA(color)}`);
    }

    /**
     * @private
     * log the result of sigApi.colorManager.toHash
     */
    _onToHash() {
        console.log('[DemoApiColorManager] _onToHash()');
        const color = 'rgba(255,45,87,0.5)';
        console.log(`[DemoApiColorManager] sigApi.colorManager.toHash(${color}): ${sigApi.colorManager.toHash(color)}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiColorManager.init();
