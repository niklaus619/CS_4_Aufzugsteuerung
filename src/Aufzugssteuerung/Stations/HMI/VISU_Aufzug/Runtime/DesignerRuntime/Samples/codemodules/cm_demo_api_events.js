/**
 * Demo how to use sigApi.events
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetUsrIntEvent'
 *     * 'evtGetUsrExtEvent'
 *     * 'evtGetIntEvent'
 *     * 'evtGetExtEvent'
 *     * 'internalTestEvent'
 *   required user defined external event
 *     * 'externalTestEvent'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiEvents {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiEvents();
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
            sigApi.events.getUserDefinedInternalEvent('evtGetUsrIntEvent'),
            () => {
                this._onGetUsrIntEvent();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetUsrExtEvent'),
            () => {
                this._onGetUsrExtEvent();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetIntEvent'),
            () => {
                this._onGetIntEvent();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetExtEvent'),
            () => {
                this._onGetExtEvent();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.events.getUserDefinedInternalEvent
     */
    _onGetUsrIntEvent() {
        console.log('[DemoApiEvents] _onGetUsrIntEvent()');
        const eventName = 'internalTestEvent';
        const event = sigApi.events.getUserDefinedInternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getUserDefinedInternalEvent('${eventName}')`, event);
    }

    /**
     * @private
     * log the result of sigApi.events.getUserDefinedExternalEvent
     */
    _onGetUsrExtEvent() {
        console.log('[DemoApiEvents] _onGetUsrExtEvent()');
        const eventName = 'externalTestEvent';
        const event = sigApi.events.getUserDefinedExternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getUserDefinedExternalEvent('${eventName}')`, event);
    }

    /**
     * @private
     * log the result of sigApi.events.getInternalEvent
     */
    _onGetIntEvent() {
        console.log('[DemoApiEvents] _onGetIntEvent()');
        const eventName = 'LANGUAGE_CHG';
        const event = sigApi.events.getInternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getInternalEvent('${eventName}')`, event);
    }

    /**
     * @private
     * log the result of sigApi.events.getExternalEvent
     */
    _onGetExtEvent() {
        console.log('[DemoApiEvents] _onGetExtEvent()');
        const eventName = 'LOOP';
        const event = sigApi.events.getExternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getExternalEvent('${eventName}')`, event);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiEvents.init();
