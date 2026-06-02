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
        this.ready = sigApi.accessSequence.isReady();
        // Register for state changes which could happen if websocket connection is lost
        sigApi.eventMediator.subscribe(
            sigApi.events.getInternalEvent('ACCESS_SEQUENCE_READY_STATE_CHANGED'),
            (maId, miId, isReady) => {
                this.ready = isReady;
            }
        );
    }

    /**
     * @private
     * Subscribe to user defined events.
     * There is no need to use the sigUtils API to register event listeners because
     * global code modules such as this one are never destroyed during runtime. 
     */
    _registerEvents() {
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAccessCurrentUser'),
            () => {
                this._onAccessCurrentUser();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAccessUserID'),
            () => {
                this._onAccessUserID();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.accessSequence.checkAccess
     */
    _onAccessCurrentUser() {
        console.log('[DemoApiAccessSequence] _onAccessCurrentUser()');
        const accNum = 0xFFFF;
        const res = sigApi.accessSequence.checkAccess(accNum);
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
        const res = sigApi.accessSequence.checkAccess(accNum, userId);
        console.log(`[DemoApiAccessSequence] user with id: ${userId} has${res ? '' : ' no'} access for accessnumber: ${accNum}`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiAccessSequence.init();
