// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.alarmInfo
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiAlarmInfo {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiAlarmInfo();
        });
    }

    constructor() {
        const readyPromiseMap = window.sigApi.alarmInfo.getReadyPromises();
        Promise.all([...readyPromiseMap.values()]).then(() => {
            const alarmInfos = window.sigApi.alarmInfo.getAlarmInfos();
            for (const alarmInfo of alarmInfos) {
                console.log(`[DemoApiAlarmInfo] alarmInfo
  varNo: ${alarmInfo.getVarNo()}
  alarmNr: ${alarmInfo.getAlarmNr()}
  group: ${alarmInfo.getGroup()}
  stationId: ${alarmInfo.getStationId()}
  parameters:`);
                const parameters = alarmInfo.getParameters();
                for (const parameter of parameters) {
                    console.log(`    [${parameters.indexOf(parameter)}] ${parameter.getVarNo()}`);
                }
            }
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiAlarmInfo.init();
