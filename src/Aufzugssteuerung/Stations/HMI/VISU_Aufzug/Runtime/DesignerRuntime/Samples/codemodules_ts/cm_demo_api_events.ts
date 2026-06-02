// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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
        const evtGetUsrIntEvent = window.sigApi.events.getUserDefinedInternalEvent('evtGetUsrIntEvent');
        if (evtGetUsrIntEvent) {
            window.sigApi.eventMediator.subscribe(
                evtGetUsrIntEvent,
                () => {
                    this._onGetUsrIntEvent();
                }
            );
        }
        const evtGetUsrExtEvent = window.sigApi.events.getUserDefinedInternalEvent('evtGetUsrExtEvent');
        if (evtGetUsrExtEvent) {
            window.sigApi.eventMediator.subscribe(
                evtGetUsrExtEvent,
                () => {
                    this._onGetUsrExtEvent();
                }
            );
        }
        const evtGetIntEvent = window.sigApi.events.getUserDefinedInternalEvent('evtGetIntEvent');
        if (evtGetIntEvent) {
            window.sigApi.eventMediator.subscribe(
                evtGetIntEvent,
                () => {
                    this._onGetIntEvent();
                }
            );
        }
        const evtGetExtEvent = window.sigApi.events.getUserDefinedInternalEvent('evtGetExtEvent');
        if (evtGetExtEvent) {
            window.sigApi.eventMediator.subscribe(
                evtGetExtEvent,
                () => {
                    this._onGetExtEvent();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.events.getUserDefinedInternalEvent
     */
    _onGetUsrIntEvent() {
        console.log('[DemoApiEvents] _onGetUsrIntEvent()');
        const eventName = 'internalTestEvent';
        const event = window.sigApi.events.getUserDefinedInternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getUserDefinedInternalEvent('${eventName}')`, event);
    }

    /**
     * @private
     * log the result of sigApi.events.getUserDefinedExternalEvent
     */
    _onGetUsrExtEvent() {
        console.log('[DemoApiEvents] _onGetUsrExtEvent()');
        const eventName = 'externalTestEvent';
        const event = window.sigApi.events.getUserDefinedExternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getUserDefinedExternalEvent('${eventName}')`, event);
    }

    /**
     * @private
     * log the result of sigApi.events.getInternalEvent
     */
    _onGetIntEvent() {
        console.log('[DemoApiEvents] _onGetIntEvent()');
        const eventName = 'LANGUAGE_CHG';
        const event = window.sigApi.events.getInternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getInternalEvent('${eventName}')`, event);
    }

    /**
     * @private
     * log the result of sigApi.events.getExternalEvent
     */
    _onGetExtEvent() {
        console.log('[DemoApiEvents] _onGetExtEvent()');
        const eventName = 'LOOP';
        const event = window.sigApi.events.getExternalEvent(eventName);
        console.log(`[DemoApiEvents] sigApi.events.getExternalEvent('${eventName}')`, event);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiEvents.init();
