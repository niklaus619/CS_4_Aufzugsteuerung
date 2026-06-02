/**
 * Demo how to use sigApi.datapointManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtWriteDataPoint'
 *     * 'evtGetIdByName'
 *     * 'evtGetLasalIdByName'
 *     * 'evtGetIdByLasalId'
 *     * 'evtGetNameByLasalId'
 *     * 'evtGetNameById'
 *     * 'evtGetLasalIdById'
 *     * 'evtGetCrcById'
 *     * 'evtGetIdByCrc'
 *     * 'evtGetDpInfo'
 *     * 'evtGetDpListDS'
 *     * 'evtGetDpList'
 *     * 'evtGetDpText'
 *   required datapoints (by name)
 *     * '0:SampleObject.SampleServer'
 *     * '0:SampleString.Data'
 *   required station (by id)
 *     * 0
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

const DATAPOINT_NAME = '0:SampleObject.SampleServer';
const STRING_DATAPOINT_NAME = '0:SampleString.Data';

class DemoApiDatapointManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiDatapointManager();
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
            sigApi.events.getUserDefinedInternalEvent('evtReadDataPoint'),
            () => {
                this._onReadDataPoint();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtWriteDataPoint'),
            () => {
                this._onWriteDataPoint();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetIdByName'),
            () => {
                this._onGetIdByName();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetLasalIdByName'),
            () => {
                this._onGetLasalIdByName();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetIdByLasalId'),
            () => {
                this._onGetIdByLasalId();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetNameByLasalId'),
            () => {
                this._onGetNameByLasalId();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetNameById'),
            () => {
                this._onGetNameById();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetLasalIdById'),
            () => {
                this._onGetLasalIdById();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetCrcById'),
            () => {
                this._onGetCrcById();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetIdByCrc'),
            () => {
                this._onGetIdByCrc();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDpInfo'),
            () => {
                this._onGetDpInfo();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDpListDS'),
            () => {
                this._onGetDpListDS();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDpList'),
            () => {
                this._onGetDpList();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDpText'),
            () => {
                this._onGetDpText();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.readDataPoint
     */
    _onReadDataPoint() {
        console.log('[DemoApiDatapointManager] _onReadDataPoint()');
        const quality = 0;
        sigApi.datapointManager.readDataPoint(DATAPOINT_NAME, quality).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.readDataPoint('${DATAPOINT_NAME}', ${quality}) id: ${res.id} value: ${res.value}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.readDataPoint('${DATAPOINT_NAME}', ${quality}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.writeDataPoint
     */
    _onWriteDataPoint() {
        console.log('[DemoApiDatapointManager] _onWriteDataPoint()');
        const value = 123;
        sigApi.datapointManager.writeDataPoint(DATAPOINT_NAME, value).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.writeDataPoint('${DATAPOINT_NAME}', ${value}) id: ${res.id} value: ${res.value}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.writeDataPoint('${DATAPOINT_NAME}', ${value}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getIdFromName
     */
    _onGetIdByName() {
        console.log('[DemoApiDatapointManager] _onGetIdByName()');
        sigApi.datapointManager.getIdFromName(DATAPOINT_NAME).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getIdFromName('${DATAPOINT_NAME}') id: ${res[0]}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getLasalIdFromName
     */
    _onGetLasalIdByName() {
        console.log('[DemoApiDatapointManager] _onGetLasalIdByName()');
        sigApi.datapointManager.getLasalIdFromName(DATAPOINT_NAME).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getLasalIdFromName('${DATAPOINT_NAME}') lasalId: ${res[0]}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getIdFromLasalId
     */
    _onGetIdByLasalId() {
        console.log('[DemoApiDatapointManager] _onGetIdByLasalId()');
        sigApi.datapointManager.getLasalIdFromName(DATAPOINT_NAME).then((res) => {
            const lasalId = res[0];
            const station = 0;
            sigApi.datapointManager.getIdFromLasalId(lasalId, station).then((res) => {
                console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getIdFromLasalId(${lasalId}, ${station}) id: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromLasalId(${lasalId}, ${station}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getNameFromLasalId
     */
    _onGetNameByLasalId() {
        console.log('[DemoApiDatapointManager] _onGetNameByLasalId()');
        sigApi.datapointManager.getLasalIdFromName(DATAPOINT_NAME).then((res) => {
            const lasalId = res[0];
            const station = 0;
            sigApi.datapointManager.getNameFromLasalId(lasalId, station).then((res) => {
                console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getNameFromLasalId(${lasalId}, ${station}) name: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getNameFromLasalId(${lasalId}, ${station}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getNameFromId
     */
    _onGetNameById() {
        console.log('[DempApiDatapointManager] _onGetNameById()');
        sigApi.datapointManager.getIdFromName(DATAPOINT_NAME).then((res) => {
            const id = res[0];
            sigApi.datapointManager.getNameFromId(id).then((res) => {
                console.log(`[DempApiDatapointManager] sigApi.datapointManager.getNameFromId(${id}) name: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DempApiDatapointManager] error in sigApi.datapointManager.getNameFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getLasalIdFromId
     */
    _onGetLasalIdById() {
        console.log('[DempApiDatapointManager] _onGetLasalIdById()');
        sigApi.datapointManager.getIdFromName(DATAPOINT_NAME).then((res) => {
            const id = res[0];
            sigApi.datapointManager.getLasalIdFromId(id).then((res) => {
                console.log(`[DempApiDatapointManager] sigApi.datapointManager.getLasalIdFromId(${id}) lasalId: ${res}`);
            }).catch((error) => {
                console.log(`[DempApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getCRCFromId
     */
    _onGetCrcById() {
        console.log('[DemoApiDatapointManager] _onGetCrcById()');
        sigApi.datapointManager.getIdFromName(DATAPOINT_NAME).then((res) => {
            const id = res[0];
            sigApi.datapointManager.getCRCFromId(id).then((res) => {
                console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getCRCFromId(${id}) crc: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getCRCFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getIdFromCRC
     */
    _onGetIdByCrc() {
        console.log('[DemoApiDatapointManager] _onGetIdByCrc()');
        sigApi.datapointManager.getIdFromName(DATAPOINT_NAME).then((res) => {
            const id = res[0];
            sigApi.datapointManager.getCRCFromId(id).then((res) => {
                const crc = res[0];
                sigApi.datapointManager.getIdFromCRC(crc).then((res) => {
                    console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getIdFromCRC(${crc}) id: ${res[0]}`);
                }).catch((error) => {
                    console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromCRC(${crc}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
                });
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getCRCFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getDpInfo
     */
    _onGetDpInfo() {
        console.log('[DemoApiDatapointManager] _onGetDpInfo()');
        sigApi.datapointManager.getDpInfo(DATAPOINT_NAME).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDpInfo('${DATAPOINT_NAME}')`);
            for (let ii = 0, len = res.length; ii < len; ii += 1) {
                const dpInfo = res[ii];
                console.log(`[DemoApiDatapointManager]     dpInfos[${ii}]`);
                console.log(`[DemoApiDatapointManager]         id: ${dpInfo.getId()}`);
                console.log(`[DemoApiDatapointManager]         lasalId: ${dpInfo.getLasalId()}`);
                console.log(`[DemoApiDatapointManager]         name: ${dpInfo.getName()}`);
                console.log(`[DemoApiDatapointManager]         station: ${dpInfo.getStation()}`);
                console.log(`[DemoApiDatapointManager]         accNr: ${dpInfo.getAccessNumber()}`);
                console.log(`[DemoApiDatapointManager]         userDefinedBits: ${dpInfo.getUserdefinedBits()}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getDpInfo('${DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getDpList_DS
     */
    _onGetDpListDS() {
        console.log('[DemoApiDatapointManager] _onGetDpListDS()');
        const include = 0x0002;
        const exclude = 0x0001;
        const baseHex = 16;
        sigApi.datapointManager.getDpList_DS(include, exclude, baseHex).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDpList_DS(${include}, ${exclude}, ${baseHex})`);
            console.dir(res);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getDpList_DS(${include}, ${exclude}, ${baseHex}) status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getDatapointList
     */
    _onGetDpList() {
        console.log('[DemoApiDatapointManager] _onGetDpList()');
        const res = sigApi.datapointManager.getDatapointList();
        console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDatapointList() returned ${res.length} datapoint ids`);
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getDatapointText
     */
    _onGetDpText() {
        console.log('[DemoApiDatapointManager] onGetDpText()');
        const propertyName = 'text1';
        sigApi.datapointManager.getDatapointText(STRING_DATAPOINT_NAME, propertyName).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDatapointText('${STRING_DATAPOINT_NAME}', '${propertyName}') text: ${res}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getDatapointText('${STRING_DATAPOINT_NAME}', '${propertyName}') error: ${error}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiDatapointManager.init();
