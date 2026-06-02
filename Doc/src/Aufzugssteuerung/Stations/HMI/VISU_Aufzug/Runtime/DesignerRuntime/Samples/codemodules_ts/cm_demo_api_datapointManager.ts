// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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

class DemoApiDatapointManager {
    readonly DATAPOINT_NAME = '0:SampleObject.SampleServer';
    readonly STRING_DATAPOINT_NAME = '0:SampleString.Data';
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
        const evtReadDataPoint = window.sigApi.events.getUserDefinedInternalEvent('evtReadDataPoint');
        if (evtReadDataPoint) {
            window.sigApi.eventMediator.subscribe(
                evtReadDataPoint,
                () => {
                    this._onReadDataPoint();
                }
            );
        }
        const evtWriteDataPoint = window.sigApi.events.getUserDefinedInternalEvent('evtWriteDataPoint');
        if (evtWriteDataPoint) {
            window.sigApi.eventMediator.subscribe(
                evtWriteDataPoint,
                () => {
                    this._onWriteDataPoint();
                }
            );
        }
        const evtGetIdByName = window.sigApi.events.getUserDefinedInternalEvent('evtGetIdByName');
        if (evtGetIdByName) {
            window.sigApi.eventMediator.subscribe(
                evtGetIdByName,
                () => {
                    this._onGetIdByName();
                }
            );
        }
        const evtGetLasalIdByName = window.sigApi.events.getUserDefinedInternalEvent('evtGetLasalIdByName');
        if (evtGetLasalIdByName) {
            window.sigApi.eventMediator.subscribe(
                evtGetLasalIdByName,
                () => {
                    this._onGetLasalIdByName();
                }
            );
        }
        const evtGetIdByLasalId = window.sigApi.events.getUserDefinedInternalEvent('evtGetIdByLasalId');
        if (evtGetIdByLasalId) {
            window.sigApi.eventMediator.subscribe(
                evtGetIdByLasalId,
                () => {
                    this._onGetIdByLasalId();
                }
            );
        }
        const evtGetNameByLasalId = window.sigApi.events.getUserDefinedInternalEvent('evtGetNameByLasalId');
        if (evtGetNameByLasalId) {
            window.sigApi.eventMediator.subscribe(
                evtGetNameByLasalId,
                () => {
                    this._onGetNameByLasalId();
                }
            );
        }
        const evtGetNameById = window.sigApi.events.getUserDefinedInternalEvent('evtGetNameById')
        if (evtGetNameById) {
            window.sigApi.eventMediator.subscribe(
                evtGetNameById,
                () => {
                    this._onGetNameById();
                }
            );
        }
        const evtGetLasalIdById = window.sigApi.events.getUserDefinedInternalEvent('evtGetLasalIdById');
        if (evtGetLasalIdById) {
            window.sigApi.eventMediator.subscribe(
                evtGetLasalIdById,
                () => {
                    this._onGetLasalIdById();
                }
            );
        }
        const evtGetCrcById = window.sigApi.events.getUserDefinedInternalEvent('evtGetCrcById');
        if (evtGetCrcById) {
            window.sigApi.eventMediator.subscribe(
                evtGetCrcById,
                () => {
                    this._onGetCrcById();
                }
            );
        }
        const evtGetIdByCrc = window.sigApi.events.getUserDefinedInternalEvent('evtGetIdByCrc');
        if (evtGetIdByCrc) {
            window.sigApi.eventMediator.subscribe(
                evtGetIdByCrc,
                () => {
                    this._onGetIdByCrc();
                }
            );
        }
        const evtGetDpInfo = window.sigApi.events.getUserDefinedInternalEvent('evtGetDpInfo');
        if (evtGetDpInfo) {
            window.sigApi.eventMediator.subscribe(
                evtGetDpInfo,
                () => {
                    this._onGetDpInfo();
                }
            );
        }
        const evtGetDpListDS = window.sigApi.events.getUserDefinedInternalEvent('evtGetDpListDS');
        if (evtGetDpListDS) {
            window.sigApi.eventMediator.subscribe(
                evtGetDpListDS,
                () => {
                    this._onGetDpListDS();
                }
            );
        }
        const evtGetDpList = window.sigApi.events.getUserDefinedInternalEvent('evtGetDpList');
        if (evtGetDpList) {
            window.sigApi.eventMediator.subscribe(
                evtGetDpList,
                () => {
                    this._onGetDpList();
                }
            );
        }
        const evtGetDpText = window.sigApi.events.getUserDefinedInternalEvent('evtGetDpText');
        if (evtGetDpText) {
            window.sigApi.eventMediator.subscribe(
                evtGetDpText,
                () => {
                    this._onGetDpText();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.readDataPoint
     */
    _onReadDataPoint() {
        console.log('[DemoApiDatapointManager] _onReadDataPoint()');
        const quality = 0;
        window.sigApi.datapointManager.readDataPoint(this.DATAPOINT_NAME, quality).then((res) => {
            (!Array.isArray(res)) && console.log(`[DemoApiDatapointManager] sigApi.datapointManager.readDataPoint('${this.DATAPOINT_NAME}', ${quality}) id: ${res.id} value: ${res.value}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.readDataPoint('${this.DATAPOINT_NAME}', ${quality}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.writeDataPoint
     */
    _onWriteDataPoint() {
        console.log('[DemoApiDatapointManager] _onWriteDataPoint()');
        const value = 123;
        window.sigApi.datapointManager.writeDataPoint(this.DATAPOINT_NAME, value).then((res) => {
            (!Array.isArray(res)) && console.log(`[DemoApiDatapointManager] sigApi.datapointManager.writeDataPoint('${this.DATAPOINT_NAME}', ${value}) id: ${res.id} value: ${res.value}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.writeDataPoint('${this.DATAPOINT_NAME}', ${value}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getIdFromName
     */
    _onGetIdByName() {
        console.log('[DemoApiDatapointManager] _onGetIdByName()');
        window.sigApi.datapointManager.getIdFromName(this.DATAPOINT_NAME).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getIdFromName('${this.DATAPOINT_NAME}') id: ${res[0]}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getLasalIdFromName
     */
    _onGetLasalIdByName() {
        console.log('[DemoApiDatapointManager] _onGetLasalIdByName()');
        window.sigApi.datapointManager.getLasalIdFromName(this.DATAPOINT_NAME).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getLasalIdFromName('${this.DATAPOINT_NAME}') lasalId: ${res[0]}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getIdFromLasalId
     */
    _onGetIdByLasalId() {
        console.log('[DemoApiDatapointManager] _onGetIdByLasalId()');
        window.sigApi.datapointManager.getLasalIdFromName(this.DATAPOINT_NAME).then((res) => {
            const lasalId = res[0];
            const station = 0;
            window.sigApi.datapointManager.getIdFromLasalId(lasalId, station).then((res) => {
                console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getIdFromLasalId(${lasalId}, ${station}) id: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromLasalId(${lasalId}, ${station}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getNameFromLasalId
     */
    _onGetNameByLasalId() {
        console.log('[DemoApiDatapointManager] _onGetNameByLasalId()');
        window.sigApi.datapointManager.getLasalIdFromName(this.DATAPOINT_NAME).then((res) => {
            const lasalId = res[0];
            const station = 0;
            window.sigApi.datapointManager.getNameFromLasalId(lasalId, station).then((res) => {
                console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getNameFromLasalId(${lasalId}, ${station}) name: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getNameFromLasalId(${lasalId}, ${station}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getNameFromId
     */
    _onGetNameById() {
        console.log('[DempApiDatapointManager] _onGetNameById()');
        window.sigApi.datapointManager.getIdFromName(this.DATAPOINT_NAME).then((res) => {
            const id = res[0];
            window.sigApi.datapointManager.getNameFromId(id).then((res) => {
                console.log(`[DempApiDatapointManager] sigApi.datapointManager.getNameFromId(${id}) name: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DempApiDatapointManager] error in sigApi.datapointManager.getNameFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getLasalIdFromId
     */
    _onGetLasalIdById() {
        console.log('[DempApiDatapointManager] _onGetLasalIdById()');
        window.sigApi.datapointManager.getIdFromName(this.DATAPOINT_NAME).then((res) => {
            const id = res[0];
            window.sigApi.datapointManager.getLasalIdFromId(id).then((res) => {
                console.log(`[DempApiDatapointManager] sigApi.datapointManager.getLasalIdFromId(${id}) lasalId: ${res}`);
            }).catch((error) => {
                console.log(`[DempApiDatapointManager] error in sigApi.datapointManager.getLasalIdFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getCRCFromId
     */
    _onGetCrcById() {
        console.log('[DemoApiDatapointManager] _onGetCrcById()');
        window.sigApi.datapointManager.getIdFromName(this.DATAPOINT_NAME).then((res) => {
            const id = res[0];
            window.sigApi.datapointManager.getCRCFromId(id).then((res) => {
                console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getCRCFromId(${id}) crc: ${res[0]}`);
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getCRCFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getIdFromCRC
     */
    _onGetIdByCrc() {
        console.log('[DemoApiDatapointManager] _onGetIdByCrc()');
        window.sigApi.datapointManager.getIdFromName(this.DATAPOINT_NAME).then((res) => {
            const id = res[0];
            window.sigApi.datapointManager.getCRCFromId(id).then((res) => {
                const crc = res[0];
                window.sigApi.datapointManager.getIdFromCRC(crc).then((res) => {
                    console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getIdFromCRC(${crc}) id: ${res[0]}`);
                }).catch((error) => {
                    console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromCRC(${crc}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
                });
            }).catch((error) => {
                console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getCRCFromId(${id}) id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
            });
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getIdFromName('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getDpInfo
     */
    _onGetDpInfo() {
        console.log('[DemoApiDatapointManager] _onGetDpInfo()');
        window.sigApi.datapointManager.getDpInfo(this.DATAPOINT_NAME).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDpInfo('${this.DATAPOINT_NAME}')`);
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
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getDpInfo('${this.DATAPOINT_NAME}') id: ${error.id} status: ${error.status} errortxt: ${error.errortxt}`);
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
        window.sigApi.datapointManager.getDpList_DS(include, exclude, baseHex).then((res) => {
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
        const res = window.sigApi.datapointManager.getDatapointList();
        console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDatapointList() returned ${res.length} datapoint ids`);
    }

    /**
     * @private
     * log the result of sigApi.datapointManager.getDatapointText
     */
    _onGetDpText() {
        console.log('[DemoApiDatapointManager] onGetDpText()');
        const propertyName = 'text1';
        window.sigApi.datapointManager.getDatapointText(this.STRING_DATAPOINT_NAME, propertyName).then((res) => {
            console.log(`[DemoApiDatapointManager] sigApi.datapointManager.getDatapointText('${this.STRING_DATAPOINT_NAME}', '${propertyName}') text: ${res}`);
        }).catch((error) => {
            console.log(`[DemoApiDatapointManager] error in sigApi.datapointManager.getDatapointText('${this.STRING_DATAPOINT_NAME}', '${propertyName}') error: ${error}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiDatapointManager.init();
