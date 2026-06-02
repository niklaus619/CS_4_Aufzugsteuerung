// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.sigUtils
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetSigDateTimeAsString'
 *     * 'evtAddGlobalHandleInactiveInteractionCallback'
 *     * 'evtRemoveGlobalHandleInactiveInteractionCallback'
 *     * 'evtAddGlobalInterceptInactiveInteractionEventCallback'
 *     * 'evtRemoveGlobalInterceptInactiveInteractionEventCallback'
 *     * 'evtAddGlobalInactiveInteractionEventHandler'
 *     * 'evtRemoveGlobalInactiveInteractionEventHandler'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiSigUtils {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiSigUtils();
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
        const evtGetSigDateTimeAsString = window.sigApi.events.getUserDefinedInternalEvent('evtGetSigDateTimeAsString');
        if (evtGetSigDateTimeAsString) {
            window.sigApi.eventMediator.subscribe(
                evtGetSigDateTimeAsString,
                () => {
                    this._onGetSigDateTimeAsString();
                }
            );
        }
        const evtAddGlobalHandleInactiveInteractionCallback = window.sigApi.events.getUserDefinedInternalEvent('evtAddGlobalHandleInactiveInteractionCallback');
        if (evtAddGlobalHandleInactiveInteractionCallback) {
            window.sigApi.eventMediator.subscribe(
                evtAddGlobalHandleInactiveInteractionCallback,
                () => {
                    this._onAddGlobalHandleInactiveInteractionCallback();
                }
            );
        }
        const evtRemoveGlobalHandleInactiveInteractionCallback = window.sigApi.events.getUserDefinedInternalEvent('evtRemoveGlobalHandleInactiveInteractionCallback');
        if (evtRemoveGlobalHandleInactiveInteractionCallback) {
            window.sigApi.eventMediator.subscribe(
                evtRemoveGlobalHandleInactiveInteractionCallback,
                () => {
                    this._onRemoveGlobalHandleInactiveInteractionCallback();
                }
            );
        }
        const evtAddGlobalInterceptInactiveInteractionEventCallback = window.sigApi.events.getUserDefinedInternalEvent('evtAddGlobalInterceptInactiveInteractionEventCallback');
        if (evtAddGlobalInterceptInactiveInteractionEventCallback) {
            window.sigApi.eventMediator.subscribe(
                evtAddGlobalInterceptInactiveInteractionEventCallback,
                () => {
                    this._onAddGlobalInterceptInactiveInteractionEventCallback();
                }
            );
        }
        const evtRemoveGlobalInterceptInactiveInteractionEventCallback = window.sigApi.events.getUserDefinedInternalEvent('evtRemoveGlobalInterceptInactiveInteractionEventCallback');
        if (evtRemoveGlobalInterceptInactiveInteractionEventCallback) {
            window.sigApi.eventMediator.subscribe(
                evtRemoveGlobalInterceptInactiveInteractionEventCallback,
                () => {
                    this._onRemoveGlobalInterceptInactiveInteractionEventCallback();
                }
            );
        }
        const evtAddGlobalInactiveInteractionEventHandler = window.sigApi.events.getUserDefinedInternalEvent('evtAddGlobalInactiveInteractionEventHandler');
        if (evtAddGlobalInactiveInteractionEventHandler) {
            window.sigApi.eventMediator.subscribe(
                evtAddGlobalInactiveInteractionEventHandler,
                () => {
                    this._onAddGlobalInactiveInteractionEventHandler();
                }
            );
        }
        const evtRemoveGlobalInactiveInteractionEventHandler = window.sigApi.events.getUserDefinedInternalEvent('evtRemoveGlobalInactiveInteractionEventHandler');
        if (evtRemoveGlobalInactiveInteractionEventHandler) {
            window.sigApi.eventMediator.subscribe(
                evtRemoveGlobalInactiveInteractionEventHandler,
                () => {
                    this._onRemoveGlobalInactiveInteractionEventHandler();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.sigUtils.getSigDateTimeAsString
     */
    _onGetSigDateTimeAsString() {
        console.log('[DemoApiSigUtils] _onGetSigDateTimeAsString()');
        const date = 132276676;
        const time = 219816192;
        const datedelimiter = '.';
        const timedelimiter = ':';
        const delimiter = ' ';
        const res = window.sigApi.sigUtils.getSigDateTimeAsString(date, time, datedelimiter, timedelimiter, delimiter);
        console.log(`[DemoApiSigUtils] sigApi.sigUtils.getSigDateTimeAsString(${date}, ${time}, '${datedelimiter}', '${timedelimiter}', '${delimiter}') res: ${res}`);
    }

    /**
     * @private
     */
    _onAddGlobalHandleInactiveInteractionCallback() {
        window.sigApi.sigUtils.addGlobalHandleInactiveInteractionCallback(
            /**
             * @param {Event} event 
             * @returns {Promise|null}
             */
            (event: globalThis.Event) => {
                return window.sigApi.windowManager.systemWindow_alert('Action not allowed', `Inactive Action (${event.type})`, window.sigApi.SIG_CONST.SYSTEM_WINDOW_WARNING);
            }
        );
    }

    /**
     * @private
     */
    _onRemoveGlobalHandleInactiveInteractionCallback() {
        window.sigApi.sigUtils.removeGlobalHandleInactiveInteractionCallback();
    }

    /**
     * @private
     */
    _onAddGlobalInterceptInactiveInteractionEventCallback() {
        window.sigApi.sigUtils.addGlobalInterceptInactiveInteractionEventCallback(
            /**
             * @param {Event} event 
             * @returns {boolean}
             */
            (event: globalThis.Event) => {
                if (!event) return false;
                return (event.type === 'pointerup');
            }
        );
    }

    /**
     * @private
     */
    _onRemoveGlobalInterceptInactiveInteractionEventCallback() {
        window.sigApi.sigUtils.removeGlobalInterceptInactiveInteractionEventCallback();
    }

    /**
     * @private
     */
    _onAddGlobalInactiveInteractionEventHandler() {
        window.sigApi.sigUtils.addGlobalInactiveInteractionEventHandler('testEvent');
    }

    /**
     * @private
     */
    _onRemoveGlobalInactiveInteractionEventHandler() {
        window.sigApi.sigUtils.removeGlobalInactiveInteractionEventHandler('testEvent');
    }

}

/**
 * Create the codemodule instance
 */
DemoApiSigUtils.init();
