// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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
        const evtGetColor = window.sigApi.events.getUserDefinedInternalEvent('evtGetColor');
        if (evtGetColor) {
            window.sigApi.eventMediator.subscribe(
                evtGetColor,
                () => {
                    this._onGetColor();
                }
            );
        }
        const evtToRGBA = window.sigApi.events.getUserDefinedInternalEvent('evtToRGBA');
        if (evtToRGBA) {
            window.sigApi.eventMediator.subscribe(
                evtToRGBA,
                () => {
                    this._onToRGBA();
                }
            );
        }
        const evtToHash = window.sigApi.events.getUserDefinedInternalEvent('evtToHash');
        if (evtToHash) {
            window.sigApi.eventMediator.subscribe(
                evtToHash,
                () => {
                    this._onToHash();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.colorManager.getColor
     */
    _onGetColor() {
        console.log('[DemoApiColorManager] _onGetColor()');
        const colorPalette = 'HtmlColorPalette';
        const color = 'lime';
        const res = window.sigApi.colorManager.getColor(colorPalette, color);
        console.dir(res);
    }

    /**
     * @private
     * log the result of sigApi.colorManager.toRGBA
     */
    _onToRGBA() {
        console.log('[DemoApiColorManager] _onToRGBA()');
        const color = '#FF45BA32';
        console.log(`[DemoApiColorManager] sigApi.colorManager.toRGBA(${color}): ${window.sigApi.colorManager.toRGBA(color)}`);
    }

    /**
     * @private
     * log the result of sigApi.colorManager.toHash
     */
    _onToHash() {
        console.log('[DemoApiColorManager] _onToHash()');
        const color = 'rgba(255,45,87,0.5)';
        console.log(`[DemoApiColorManager] sigApi.colorManager.toHash(${color}): ${window.sigApi.colorManager.toHash(color)}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiColorManager.init();
