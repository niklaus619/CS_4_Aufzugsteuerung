// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.accessSequence
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtAccessCurrentUser'
 *     * 'evtAccessUserID'
 *   required user
 *     * userId: 0
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiAccessSequence {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiAccessSequence();
        });
    }

    ready: boolean
    constructor() {
        this._handleReadyState();
        this._registerEvents();
    }

    /**
     * @private
     * Check if accessSequence is ready and register for state changes
     */
    _handleReadyState() {
        // Check current state of accessSequence
        this.ready = window.sigApi.accessSequence.isReady();
        // Register for state changes which could happen if websocket connection is lost
        const eventAccessSequenceReadyStateChanged = window.sigApi.events.getInternalEvent('ACCESS_SEQUENCE_READY_STATE_CHANGED');
        if (eventAccessSequenceReadyStateChanged) {
            window.sigApi.eventMediator.subscribe(
                eventAccessSequenceReadyStateChanged,
                (maId: number, miId: number, isReady: boolean) => {
                    this.ready = isReady;
                }
            );
        }
    }

    /**
     * @private
     * Subscribe to user defined events.
     * There is no need to use the sigUtils API to register event listeners because
     * global code modules such as this one are never destroyed during runtime. 
     */
    _registerEvents() {
        const evtAccessCurrentUser = window.sigApi.events.getUserDefinedInternalEvent('evtAccessCurrentUser');
        if (evtAccessCurrentUser) {
            window.sigApi.eventMediator.subscribe(
                evtAccessCurrentUser,
                () => {
                    this._onAccessCurrentUser();
                }
            );
        }

        const evtAccessUserID = window.sigApi.events.getUserDefinedInternalEvent('evtAccessUserID');
        if (evtAccessUserID) {
            window.sigApi.eventMediator.subscribe(
                evtAccessUserID,
                () => {
                    this._onAccessUserID();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.accessSequence.checkAccess
     */
    _onAccessCurrentUser() {
        console.log('[DemoApiAccessSequence] _onAccessCurrentUser()');
        const accNum = 0xFFFF;
        const res = window.sigApi.accessSequence.checkAccess(accNum);
        console.log(`[DemoApiAccessSequence] current user has${res ? '' : ' no'} access for accessnumber: ${accNum}`);
    }

    /**
     * @private
     * log the result of sigApi.accessSequence.checkAccess for userId 0
     */
    _onAccessUserID() {
        console.log('[DemoApiAccessSequence] _onAccessUserID()');
        const accNum = 0xFFFF;
        const userId = 0;
        const res = window.sigApi.accessSequence.checkAccess(accNum, userId);
        console.log(`[DemoApiAccessSequence] user with id: ${userId} has${res ? '' : ' no'} access for accessnumber: ${accNum}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiAccessSequence.init();
