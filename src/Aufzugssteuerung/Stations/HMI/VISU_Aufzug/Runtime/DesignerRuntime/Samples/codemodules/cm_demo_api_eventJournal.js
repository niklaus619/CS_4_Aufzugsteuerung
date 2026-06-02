/**
 * Demo how to use sigApi.eventJournal
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtJournalLen'
 *     * 'evtAlarmLen'
 *     * 'evtQuitAlarms'
 *     * 'evtQuitAllAlarms'
 *     * 'evtGetAlarms'
 *     * 'evtGetJournal'
 *     * 'evtAddJournalMessage'
 *     * 'evtAddJournalWarning'
 *     * 'evtAddJournalError'
 *     * 'evtAddEntry'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiEventJournal {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiEventJournal();
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
            sigApi.events.getUserDefinedInternalEvent('evtJournalLen'),
            () => {
                this._onGetJournalListLength();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAlarmLen'),
            () => {
                this._onGetAlarmListLength();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtQuitAlarms'),
            () => {
                this._onQuitAlarms();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtQuitAllAlarms'),
            () => {
                this._onQuitAllAlarms();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetAlarms'),
            () => {
                this._onGetAlarms();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetJournal'),
            () => {
                this._onGetJournal();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddJournalMessage'),
            () => {
                this._onAddMessage();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddJournalWarning'),
            () => {
                this._onAddWarning();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddJournalError'),
            () => {
                this._onAddError();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddEntry'),
            () => {
                this._onAddEntry();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.getJournalListLength
     */
    _onGetJournalListLength() {
        console.log('[DemoApiEventJournal] _onGetJournalListLength()');
        const journalListLength = sigApi.eventJournal.getJournalListLength();
        console.log(`DemoApiEventJournal] sigApi.eventJournal.getJournalListLength() journalListLength: ${journalListLength}`);
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.getAlarmListLength
     */
    _onGetAlarmListLength() {
        console.log('[DemoApiEventJournal] _onGetAlarmListLength()');
        const singleLineFalse = false;
        const alarmListLengthSingleLineFalse = sigApi.eventJournal.getAlarmListLength(singleLineFalse);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getAlarmListLength(${singleLineFalse}) alarmListLength: ${alarmListLengthSingleLineFalse}`);
        const singleLineTrue = true;
        const alarmListLengthSingleLineTrue = sigApi.eventJournal.getAlarmListLength(singleLineTrue);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getAlarmListLength(${singleLineTrue}) alarmListLength: ${alarmListLengthSingleLineTrue}`);
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.quitAlarms
     */
    _onQuitAlarms() {
        console.log('[DemoApiEventJournal] _onQuitAlarms()');
        const alarmIds = [2, 5];
        sigApi.eventJournal.quitAlarms(alarmIds).then((res) => {
            console.log(`[DemoApiEventJournal] sigApi.eventJournal.quitAlarms([${alarmIds[0]}, ${alarmIds[1]}]) uid: ${res.uid}`);
            for (let ii = 0, len = res.result.length; ii < len; ii += 1) {
                const resultEntry = res.result[ii];
                console.log(`[DemoApiEventJournal]     result[${ii}]`);
                console.log(`[DemoApiEventJournal]         idxcnt: ${resultEntry.idxcnt}`);
                console.log(`[DemoApiEventJournal]         status: ${resultEntry.status}`);
                console.log(`[DemoApiEventJournal]         errortxt: ${resultEntry.errortxt}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiEventJournal] error in sigApi.eventJournal.quitAlarms([${alarmIds[0]}, ${alarmIds[1]}]) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.quitAllAlarms
     */
    _onQuitAllAlarms() {
        console.log('[DemoApiEventJournal] _onQuitAllAlarms()');
        sigApi.eventJournal.quitAllAlarms().then((res) => {
            console.log(`[DemoApiEventJournal] sigApi.eventJournal.quitAllAlarms() uid: ${res.uid}`);
            for (let ii = 0, len = res.result.length; ii < len; ii += 1) {
                const resultEntry = res.result[ii];
                console.log(`[DemoApiEventJournal]     result[${ii}]`);
                console.log(`[DemoApiEventJournal]         station: ${resultEntry.station}`);
                console.log(`[DemoApiEventJournal]         status: ${resultEntry.status}`);
                console.log(`[DemoApiEventJournal]         errortxt: ${resultEntry.errortxt}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiEventJournal] error in sigApi.eventJournal.quitAllAlarms() uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.getAlarmEntries
     */
    _onGetAlarms() {
        console.log('[DemoApiEventJournal] _onGetAlarms()');
        const offset = 0;
        const itemscount = 5;
        const filter = null;
        const sort = null;
        const multiline = false;
        const alarms = sigApi.eventJournal.getAlarmEntries(offset, itemscount, filter, sort, multiline);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getAlarmEntries(${offset}, ${itemscount}, ${filter}, ${sort}, ${multiline})`);
        for (let ii = 0, len = alarms.length; ii < len; ii += 1) {
            const alarm = alarms[ii];
            console.log(`[DemoApiEventJournal]     alarms[${ii}]`);
            console.log(`[DemoApiEventJournal]         dataAsStr: ${alarm.getDataAsStr()}`);
        }
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.getEventJournalEntries
     */
    _onGetJournal() {
        console.log('[DemoApiEventJournal] _onGetJournal()');
        const offset = 0;
        const itemscount = 5;
        const filter = null;
        const sort = null;
        const eventJournals = sigApi.eventJournal.getEventJournalEntries(offset, itemscount, filter, sort);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getEventJournalEntries(${offset}, ${itemscount}, ${filter}, ${sort})`);
        for (let ii = 0, len = eventJournals.length; ii < len; ii += 1) {
            const eventJournal = eventJournals[ii];
            console.log(`[DemoApiEventJournal]     eventJournals[${ii}]`);
            console.log(`[DemoApiEventJournal]         dataAsStr: ${eventJournal.getDataAsStr()}`);
        }
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.addMessage
     */
    _onAddMessage() {
        console.log('[DemoApiEventJournal] _onAddMessage()');
        const messageText = 'a message text...';
        sigApi.eventJournal.addMessage(messageText).then((res) => {
            console.log(`[DemoApiEventJournal] sigApi.eventJournal.addMessage(${messageText}) uid: ${res.uid}`);
            for (let ii = 0, len = res.result.length; ii < len; ii += 1) {
                const resultEntry = res.result[ii];
                console.log(`[DemoApiEventJournal]     result[${ii}]`);
                console.log(`[DemoApiEventJournal]         idxcnt: ${resultEntry.idxcnt}`);
                console.log(`[DemoApiEventJournal]         valid: ${resultEntry.valid}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiEventJournal] error in sigApi.eventJournal.addMessage(${messageText}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.addWarning
     */
    _onAddWarning() {
        console.log('[DemoApiEventJournal] _onAddWarning()');
        const warningText = 'a warning text...';
        sigApi.eventJournal.addWarning(warningText).then((res) => {
            console.log(`[DemoApiEventJournal] sigApi.eventJournal.addWarning(${warningText}) uid: ${res.uid}`);
            for (let ii = 0, len = res.result.length; ii < len; ii += 1) {
                const resultEntry = res.result[ii];
                console.log(`[DemoApiEventJournal]     result[${ii}]`);
                console.log(`[DemoApiEventJournal]         idxcnt: ${resultEntry.idxcnt}`);
                console.log(`[DemoApiEventJournal]         valid: ${resultEntry.valid}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiEventJournal] error in sigApi.eventJournal.addWarning(${warningText}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.addError
     */
    _onAddError() {
        console.log('[DemoApiEventJournal] _onAddError()');
        const errorText = 'a error text...';
        sigApi.eventJournal.addError(errorText).then((res) => {
            console.log(`[DemoApiEventJournal] sigApi.eventJournal.addError(${errorText}) uid: ${res.uid}`);
            for (let ii = 0, len = res.result.length; ii < len; ii += 1) {
                const resultEntry = res.result[ii];
                console.log(`[DemoApiEventJournal]     result[${ii}]`);
                console.log(`[DemoApiEventJournal]         idxcnt: ${resultEntry.idxcnt}`);
                console.log(`[DemoApiEventJournal]         valid: ${resultEntry.valid}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiEventJournal] error in sigApi.eventJournal.addError(${errorText}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.addEntry
     */
    _onAddEntry() {
        console.log('[DemoApiEventJournal] _onAddEntry()');
        const eventJournalId = 0x1111;
        const arrayBuffer = new ArrayBuffer(0);
        sigApi.eventJournal.addEntry(eventJournalId, arrayBuffer).then((res) => {
            console.log(`[DemoApiEventJournal] sigApi.eventJournal.addEntry(${eventJournalId}, ...) uid: ${res.uid}`);
            for (let ii = 0, len = res.result.length; ii < len; ii += 1) {
                const resultEntry = res.result[ii];
                console.log(`[DemoApiEventJournal]     result[${ii}]`);
                console.log(`[DemoApiEventJournal]         idxcnt: ${resultEntry.idxcnt}`);
                console.log(`[DemoApiEventJournal]         valid: ${resultEntry.valid}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiEventJournal] error in sigApi.eventJournal.addEntry(${eventJournalId}, ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt} `);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiEventJournal.init();
