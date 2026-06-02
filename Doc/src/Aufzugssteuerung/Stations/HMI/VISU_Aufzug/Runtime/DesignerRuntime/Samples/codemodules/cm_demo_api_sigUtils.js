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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetSigDateTimeAsString'),
            () => {
                this._onGetSigDateTimeAsString();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddGlobalHandleInactiveInteractionCallback'),
            () => {
                this._onAddGlobalHandleInactiveInteractionCallback();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRemoveGlobalHandleInactiveInteractionCallback'),
            () => {
                this._onRemoveGlobalHandleInactiveInteractionCallback();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddGlobalInterceptInactiveInteractionEventCallback'),
            () => {
                this._onAddGlobalInterceptInactiveInteractionEventCallback();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRemoveGlobalInterceptInactiveInteractionEventCallback'),
            () => {
                this._onRemoveGlobalInterceptInactiveInteractionEventCallback();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddGlobalInactiveInteractionEventHandler'),
            () => {
                this._onAddGlobalInactiveInteractionEventHandler();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRemoveGlobalInactiveInteractionEventHandler'),
            () => {
                this._onRemoveGlobalInactiveInteractionEventHandler();
            }
        );
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
        const res = sigApi.sigUtils.getSigDateTimeAsString(date, time, datedelimiter, timedelimiter, delimiter);
        console.log(`[DemoApiSigUtils] sigApi.sigUtils.getSigDateTimeAsString(${date}, ${time}, '${datedelimiter}', '${timedelimiter}', '${delimiter}') res: ${res}`);
    }

    /**
     * @private
     */
    _onAddGlobalHandleInactiveInteractionCallback() {
        sigApi.sigUtils.addGlobalHandleInactiveInteractionCallback(
            /**
             * @param {Event} event 
             * @returns {Promise|null}
             */
            (event) => {
                return sigApi.windowManager.systemWindow_alert('Action not allowed', `Inactive Action (${event.type})`, sigApi.SIG_CONST.SYSTEM_WINDOW_WARNING);
            }
        );
    }

    /**
     * @private
     */
    _onRemoveGlobalHandleInactiveInteractionCallback() {
        sigApi.sigUtils.removeGlobalHandleInactiveInteractionCallback();
    }

    /**
     * @private
     */
    _onAddGlobalInterceptInactiveInteractionEventCallback() {
        sigApi.sigUtils.addGlobalInterceptInactiveInteractionEventCallback(
            /**
             * @param {Event} event 
             * @returns {boolean}
             */
            (event) => {
                if (!event) return false;
                return (event.type === 'pointerup');
            }
        );
    }

    /**
     * @private
     */
    _onRemoveGlobalInterceptInactiveInteractionEventCallback() {
        sigApi.sigUtils.removeGlobalInterceptInactiveInteractionEventCallback();
    }

    /**
     * @private
     */
    _onAddGlobalInactiveInteractionEventHandler() {
        sigApi.sigUtils.addGlobalInactiveInteractionEventHandler('testEvent');
    }

    /**
     * @private
     */
    _onRemoveGlobalInactiveInteractionEventHandler() {
        sigApi.sigUtils.removeGlobalInactiveInteractionEventHandler('testEvent');
    }

}

/**
 * Create the codemodule instance
 */
DemoApiSigUtils.init();
