// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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
        const evtJournalLen = window.sigApi.events.getUserDefinedInternalEvent('evtJournalLen');
        if (evtJournalLen) {
            window.sigApi.eventMediator.subscribe(
                evtJournalLen,
                () => {
                    this._onGetJournalListLength();
                }
            );
        }
        const evtAlarmLen = window.sigApi.events.getUserDefinedInternalEvent('evtAlarmLen');
        if (evtAlarmLen) {
            window.sigApi.eventMediator.subscribe(
                evtAlarmLen,
                () => {
                    this._onGetAlarmListLength();
                }
            );
        }
        const evtQuitAlarms = window.sigApi.events.getUserDefinedInternalEvent('evtQuitAlarms');
        if (evtQuitAlarms) {
            window.sigApi.eventMediator.subscribe(
                evtQuitAlarms,
                () => {
                    this._onQuitAlarms();
                }
            );
        }
        const evtQuitAllAlarms = window.sigApi.events.getUserDefinedInternalEvent('evtQuitAllAlarms');
        if (evtQuitAllAlarms) {
            window.sigApi.eventMediator.subscribe(
                evtQuitAllAlarms,
                () => {
                    this._onQuitAllAlarms();
                }
            );
        }
        const evtGetAlarms = window.sigApi.events.getUserDefinedInternalEvent('evtGetAlarms');
        if (evtGetAlarms) {
            window.sigApi.eventMediator.subscribe(
                evtGetAlarms,
                () => {
                    this._onGetAlarms();
                }
            );
        }
        const evtGetJournal = window.sigApi.events.getUserDefinedInternalEvent('evtGetJournal');
        if (evtGetJournal) {
            window.sigApi.eventMediator.subscribe(
                evtGetJournal,
                () => {
                    this._onGetJournal();
                }
            );
        }
        const evtAddJournalMessage = window.sigApi.events.getUserDefinedInternalEvent('evtAddJournalMessage');
        if (evtAddJournalMessage) {
            window.sigApi.eventMediator.subscribe(
                evtAddJournalMessage,
                () => {
                    this._onAddMessage();
                }
            );
        }
        const evtAddJournalWarning = window.sigApi.events.getUserDefinedInternalEvent('evtAddJournalWarning');
        if (evtAddJournalWarning) {
            window.sigApi.eventMediator.subscribe(
                evtAddJournalWarning,
                () => {
                    this._onAddWarning();
                }
            );
        }
        const evtAddJournalError = window.sigApi.events.getUserDefinedInternalEvent('evtAddJournalError');
        if (evtAddJournalError) {
            window.sigApi.eventMediator.subscribe(
                evtAddJournalError,
                () => {
                    this._onAddError();
                }
            );
        }
        const evtAddEntry = window.sigApi.events.getUserDefinedInternalEvent('evtAddEntry');
        if (evtAddEntry) {
            window.sigApi.eventMediator.subscribe(
                evtAddEntry,
                () => {
                    this._onAddEntry();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.getJournalListLength
     */
    _onGetJournalListLength() {
        console.log('[DemoApiEventJournal] _onGetJournalListLength()');
        const journalListLength = window.sigApi.eventJournal.getJournalListLength();
        console.log(`DemoApiEventJournal] sigApi.eventJournal.getJournalListLength() journalListLength: ${journalListLength}`);
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.getAlarmListLength
     */
    _onGetAlarmListLength() {
        console.log('[DemoApiEventJournal] _onGetAlarmListLength()');
        const singleLineFalse = false;
        const alarmListLengthSingleLineFalse = window.sigApi.eventJournal.getAlarmListLength(singleLineFalse);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getAlarmListLength(${singleLineFalse}) alarmListLength: ${alarmListLengthSingleLineFalse}`);
        const singleLineTrue = true;
        const alarmListLengthSingleLineTrue = window.sigApi.eventJournal.getAlarmListLength(singleLineTrue);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getAlarmListLength(${singleLineTrue}) alarmListLength: ${alarmListLengthSingleLineTrue}`);
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.quitAlarms
     */
    _onQuitAlarms() {
        console.log('[DemoApiEventJournal] _onQuitAlarms()');
        const alarmIds = [2, 5];
        window.sigApi.eventJournal.quitAlarms(alarmIds).then((res) => {
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
        window.sigApi.eventJournal.quitAllAlarms().then((res) => {
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
        const filter = undefined;
        const sort = undefined;
        const multiline = false;
        const alarms = window.sigApi.eventJournal.getAlarmEntries(offset, itemscount, filter, sort, multiline);
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
        const filter = undefined;
        const sort = undefined;
        const eventJournals = window.sigApi.eventJournal.getEventJournalEntries(offset, itemscount, filter, sort);
        console.log(`[DemoApiEventJournal] sigApi.eventJournal.getEventJournalEntries(${offset}, ${itemscount}, ${filter}, ${sort})`);
        for (let ii = 0, len = eventJournals.length; ii < len; ii += 1) {
            const eventJournal = eventJournals[ii];
            console.log(`[DemoApiEventJournal]     eventJournals[${ii}]`);
            console.log(`[DemoApiEventJournal]         dataAsStr: ${eventJournal.getDataAsStr()}`);
            switch (eventJournal.id) {
                case window.sigApi.SIG_CONST.EVENTJOURNAL_ALARM:
                    const eventJournalAlarm = (eventJournal as SigApi.EventJournalAlarm);
                    console.log('[DemoApiEventJournal]         EventJournalAlarm');
                    console.log(`[DemoApiEventJournal]         alarmNr: ${eventJournalAlarm.alarmNr}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_SET_POINT:
                    const eventJournalSetPoint = (eventJournal as SigApi.EventJournalSetPoint);
                    console.log('[DemoApiEventJournal]         EventJournalSetPoint');
                    console.log(`[DemoApiEventJournal]         newVal: ${eventJournalSetPoint.newVal}`);
                    console.log(`[DemoApiEventJournal]         oldVal: ${eventJournalSetPoint.oldVal}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_MESSAGE:
                    const eventJournalMessage = (eventJournal as SigApi.EventJournalMessage);
                    console.log('[DemoApiEventJournal]         EventJournalMessage');
                    console.log(`[DemoApiEventJournal]         text: ${eventJournalMessage.text}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_WARNING:
                    const eventJournalWarning = (eventJournal as SigApi.EventJournalWarning);
                    console.log('[DemoApiEventJournal]         EventJournalWarning');
                    console.log(`[DemoApiEventJournal]         text: ${eventJournalWarning.text}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_ERROR:
                    const eventJournalError = (eventJournal as SigApi.EventJournalError);
                    console.log('[DemoApiEventJournal]         EventJournalError');
                    console.log(`[DemoApiEventJournal]         text: ${eventJournalError.text}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_LOG_IN_OUT:
                    const eventJournalLogInOut = (eventJournal as SigApi.EventJournalLogInOut);
                    console.log('[DemoApiEventJournal]         EventJournalLogInOut');
                    console.log(`[DemoApiEventJournal]         state: ${eventJournalLogInOut.state}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_POWER_ON_OFF:
                    const eventJournalPowerOnOff = (eventJournal as SigApi.EventJournalPowerOnOff);
                    console.log('[DemoApiEventJournal]         EventJournalPowerOnOff');
                    console.log(`[DemoApiEventJournal]         state: ${eventJournalPowerOnOff.state}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_DEL_ALL:
                    const eventJournalDelAll = (eventJournal as SigApi.EventJournalDeleteAll);
                    console.log('[DemoApiEventJournal]         EventJournalDeleteAll');
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_SET_POINT_STR:
                    const eventJournalSetPointStr = (eventJournal as SigApi.EventJournalSetPointStr);
                    console.log('[DemoApiEventJournal]         EventJournalSetPointStr');
                    console.log(`[DemoApiEventJournal]         newVal: ${eventJournalSetPointStr.newValStr}`);
                    console.log(`[DemoApiEventJournal]         oldVal: ${eventJournalSetPointStr.oldValStr}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_RECIPE_LOAD:
                    const eventJournalRecipeLoad = (eventJournal as SigApi.EventJournalRecipeLoad);
                    console.log('[DemoApiEventJournal]         EventJournalRecipeLoad');
                    console.log(`[DemoApiEventJournal]         state: ${eventJournalRecipeLoad.state}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_RECIPE_SAVE:
                    const eventJournalRecipeSave = (eventJournal as SigApi.EventJournalRecipeSave);
                    console.log('[DemoApiEventJournal]         EventJournalRecipeSave');
                    console.log(`[DemoApiEventJournal]         state: ${eventJournalRecipeSave.state}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_USER_TEXT:
                    const eventJournalUserText = (eventJournal as SigApi.EventJournalUserText);
                    console.log('[DemoApiEventJournal]         EventJournalUserText');
                    console.log(`[DemoApiEventJournal]         text: ${eventJournalUserText.text}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_STATION_RECONNECT:
                    const eventJournalStationReconnect = (eventJournal as SigApi.EventJournalStationReconnect);
                    console.log('[DemoApiEventJournal]         EventJournalStationReconnect');
                    console.log(`[DemoApiEventJournal]         stationNr: ${eventJournalStationReconnect.stationNr}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_SERVER_POINT_CHANGED:
                    const eventJournalServerPointChanged = (eventJournal as SigApi.EventJournalServerPointChanged);
                    console.log('[DemoApiEventJournal]         EventJournalServerPointChanged');
                    console.log(`[DemoApiEventJournal]         stationNr: ${eventJournalServerPointChanged.stationNr}`);
                    break;
                case window.sigApi.SIG_CONST.EVENTJOURNAL_STRING_POINT_CHANGED:
                    const eventJournalStringPointChanged = (eventJournal as SigApi.EventJournalStringPointChanged);
                    console.log('[DemoApiEventJournal]         EventJournalStringPointChanged');
                    console.log(`[DemoApiEventJournal]         stationNr: ${eventJournalStringPointChanged.stationNr}`);
                    break;
            }
        }
    }

    /**
     * @private
     * log the result of sigApi.eventJournal.addMessage
     */
    _onAddMessage() {
        console.log('[DemoApiEventJournal] _onAddMessage()');
        const messageText = 'a message text...';
        window.sigApi.eventJournal.addMessage(messageText).then((res) => {
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
        window.sigApi.eventJournal.addWarning(warningText).then((res) => {
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
        window.sigApi.eventJournal.addError(errorText).then((res) => {
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
        window.sigApi.eventJournal.addEntry(eventJournalId, arrayBuffer).then((res) => {
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
