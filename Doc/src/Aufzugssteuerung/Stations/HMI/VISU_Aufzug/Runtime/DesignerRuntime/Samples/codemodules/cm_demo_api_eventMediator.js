/**
 * Demo how to use sigApi.eventMediator
 * 
 *  demo setup:
 *   required user defined internal events
 *     * 'evtSubEvent'
 *     * 'evtPublishEvent'
 *     * 'evtPublishToStation'
 *     * 'internalTestEvent'
 *   required user defined external event
 *     * 'externalTestEvent'
 *   required station (by id)
 *     * 0
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiEventMediator {

    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiEventMediator();
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
            sigApi.events.getUserDefinedInternalEvent('evtSubEvent'),
            () => {
                this._onSubscribeEvent();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtPublishEvent'),
            () => {
                this._onPublishEvent();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtPublishToStation'),
            () => {
                this._onPublishToStation();
            }
        );
    }

    /**
     * @private
     * subscribe/unsubscribe a user defined event
     */
    _onSubscribeEvent() {
        console.log('[DemoApiEventMediator] _onSubscribeEvent()');
        const event = sigApi.events.getUserDefinedInternalEvent('internalTestEvent');
        const subscriptionId = sigApi.eventMediator.subscribe(
            event,
            (maId, miId, message) => {
                console.log('[DemoApiEventMediator] executing callback - internalTestEvent');
                // handle event one time and unsubscribe
                sigApi.eventMediator.unsubscribe(event, subscriptionId);
            }
        );
    }

    /**
     * @private
     * publish a user defined event with string data
     */
    _onPublishEvent() {
        console.log('[DemoApiEventMediator] _onPublishEvent()');
        sigApi.eventMediator.publish(sigApi.events.getUserDefinedInternalEvent('internalTestEvent'), 'some data');
    }

    /**
     * @private
     * publish a user defined event to a station
     */
    _onPublishToStation() {
        console.log('[DemoApiEventMediator] _onPublishToStation()');
        const event = sigApi.events.getUserDefinedExternalEvent('externalTestEvent');
        const dest = 0; //Station 0
        const dv = new DataView(new ArrayBuffer(12));
        dv.setUint32(0, 1, true); // offset: 0 data: {uint32} 1
        dv.setUint32(4, 2, true); // offset: 2 data: {uint32} 2
        dv.setUint32(8, 3, true); // offste: 8 data: {uint32} 3
        sigApi.eventMediator.publishToStation(event, dest, dv).then(() => {
            console.log('[DemoApiEventMediator] sigApi.eventMediator.publishToStation(...) resolved');
        }).catch((error) => {
            console.log(`[DemoApiEventMediator] error in sigApi.eventMediator.publishToStation(...) error: ${error}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiEventMediator.init();
