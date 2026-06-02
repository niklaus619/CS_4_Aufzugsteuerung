// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.fileManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetDriveList'
 *     * 'evtReadDir'
 *     * 'evtMakeDir'
 *     * 'evtRename'
 *     * 'evtCopy'
 *     * 'evtMove'
 *     * 'evtRemove'
 *     * 'evtReadFile'
 *     * 'evtWriteFile'
 *     * 'evtFileContent'
 *     * 'evtGetDriveInfos'
 *   required directories and files
 *     * 'c:\demo_api_fileManager\test' expected to contain file.txt (readDir/copy/move)
 *     * 'c:\demo_api_fileManager\new' expected not to exist (makeDir), expected to exist (rename)
 *     * 'c:\demo_api_fileManager\renamed' expected not to exist (rename)
 *     * 'c:\demo_api_fileManager\test\copy.txt' expected not to exist (copy/move), expected to exist (delete)
 *     * 'c:\demo_api_fileManager\file.txt' (writeFile/readFile)
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DemoApiFileManager {
    readonly PREFIX = 'c:\\demo_api_fileManager';
    readonly TEST_DIR = `${this.PREFIX}\\test`;
    readonly NAME_FILTER = '*.txt';
    readonly NEW_DIR = `${this.PREFIX}\\new`;
    readonly RENAMED_DIR = `${this.PREFIX}\\renamed`;
    readonly COPY_FILE = `${this.TEST_DIR}\\copy.txt`;
    readonly FILE = `${this.TEST_DIR}\\file.txt`;
    readonly NEW_FILE = `${this.PREFIX}\\file.txt`;
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiFileManager();
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
        const evtGetDriveList = window.sigApi.events.getUserDefinedInternalEvent('evtGetDriveList');
        if (evtGetDriveList) {
            window.sigApi.eventMediator.subscribe(
                evtGetDriveList,
                () => {
                    this._onGetRoot();
                }
            );
        }
        const evtReadDir = window.sigApi.events.getUserDefinedInternalEvent('evtReadDir');
        if (evtReadDir) {
            window.sigApi.eventMediator.subscribe(
                evtReadDir,
                () => {
                    this._onReadDir();
                }
            );
        }
        const evtMakeDir = window.sigApi.events.getUserDefinedInternalEvent('evtMakeDir');
        if (evtMakeDir) {
            window.sigApi.eventMediator.subscribe(
                evtMakeDir,
                () => {
                    this._onMakeDir();
                }
            );
        }
        const evtRename = window.sigApi.events.getUserDefinedInternalEvent('evtRename');
        if (evtRename) {
            window.sigApi.eventMediator.subscribe(
                evtRename,
                () => {
                    this._onRename();
                }
            );
        }
        const evtCopy = window.sigApi.events.getUserDefinedInternalEvent('evtCopy');
        if (evtCopy) {
            window.sigApi.eventMediator.subscribe(
                evtCopy,
                () => {
                    this._onCopy();
                }
            );
        }
        const evtMove = window.sigApi.events.getUserDefinedInternalEvent('evtMove');
        if (evtMove) {
            window.sigApi.eventMediator.subscribe(
                evtMove,
                () => {
                    this._onMove();
                }
            );
        }
        const evtRemove = window.sigApi.events.getUserDefinedInternalEvent('evtRemove');
        if (evtRemove) {
            window.sigApi.eventMediator.subscribe(
                evtRemove,
                () => {
                    this._onRemove();
                }
            );
        }
        const evtReadFile = window.sigApi.events.getUserDefinedInternalEvent('evtReadFile');
        if (evtReadFile) {
            window.sigApi.eventMediator.subscribe(
                evtReadFile,
                () => {
                    this._onReadFile();
                }
            );
        }
        const evtWriteFile = window.sigApi.events.getUserDefinedInternalEvent('evtWriteFile');
        if (evtWriteFile) {
            window.sigApi.eventMediator.subscribe(
                evtWriteFile,
                () => {
                    this._onWriteFile();
                }
            );
        }
        const evtFileContent = window.sigApi.events.getUserDefinedInternalEvent('evtFileContent');
        if (evtFileContent) {
            window.sigApi.eventMediator.subscribe(
                evtFileContent,
                () => {
                    this._onFileContent();
                }
            );
        }
        const evtGetDriveInfos = window.sigApi.events.getUserDefinedInternalEvent('evtGetDriveInfos');
        if (evtGetDriveInfos) {
            window.sigApi.eventMediator.subscribe(
                evtGetDriveInfos,
                () => {
                    this._onGetDriveInfos();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.fileManager.getRoot
     */
    _onGetRoot() {
        console.log('[DemoApiFileManager] _onGetRoot()');
        window.sigApi.fileManager.getRoot().then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.getRoot() uid: ${res.uid} root: ${res.root.dpne}`);
            for (let ii = 0, len = res.root.nodes.length; ii < len; ii += 1) {
                const node = res.root.nodes[ii];
                console.log(`[DemoApiFileManager]     root.nodes[${ii}]: ${node.dpne}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.getRoot() uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.fileManager.readDir
     */
    _onReadDir() {
        console.log('[DemoApiFileManager] _onReadDir()');
        const attributeIncludeFilter = 0;
        const attributeExcludeFilter = 0;
        window.sigApi.fileManager.readDir(this.TEST_DIR, this.NAME_FILTER, attributeIncludeFilter, attributeExcludeFilter).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.readDir('${this.TEST_DIR}', '${this.NAME_FILTER}', ${attributeIncludeFilter}, ${attributeExcludeFilter}) uid: ${res.uid}`);
            console.log(`[DemoApiFileManager]     parent: ${res.parent.dpne}`);
            for (let ii = 0, len = res.parent.nodes.length; ii < len; ii += 1) {
                const node = res.parent.nodes[ii];
                console.log(`[DemoApiFileManager]         nodes[${ii}]:`);
                console.log(`[DemoApiFileManager]             dpne: ${node.dpne}`);
                console.log(`[DemoApiFileManager]             size: ${node.size}`);
                console.log(`[DemoApiFileManager]             attribute: ${node.attribute}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.readDir('${this.TEST_DIR}', '${this.NAME_FILTER}', ${attributeIncludeFilter}, ${attributeExcludeFilter}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * create a directory
     */
    _onMakeDir() {
        console.log('[DemoApiFileManager] _onMakeDir()');
        window.sigApi.fileManager.makeDir(this.NEW_DIR).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.makeDir('${this.NEW_DIR}') uid: ${res.uid} dir: ${res.dir}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.makeDir('${this.NEW_DIR}') uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * rename a directory
     */
    _onRename() {
        console.log('[DemoApiFileManager] _onRename()');
        window.sigApi.fileManager.rename(this.RENAMED_DIR, this.NEW_DIR).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.rename('${this.RENAMED_DIR}', '${this.NEW_DIR}') uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.rename('${this.RENAMED_DIR}', '${this.NEW_DIR}') uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * copy a (file or) directory
     */
    _onCopy() {
        console.log('[DemoApiFileManager] _onCopy()');
        window.sigApi.fileManager.copy(
            this.COPY_FILE,
            this.FILE,
            (data) => { // onProgress
                console.log(`[DemoApiFileManager] copy progress uid: ${data.uid} progress: ${data.progress}`);
            },
            (data) => { // onBegin
                console.log(`[DemoApiFileManager] copy begin uid: ${data.uid}`);
            },
            (data) => { // onEnd
                console.log(`[DemoApiFileManager] copy end uid: ${data.uid}`);
            }
        ).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.copy('${this.COPY_FILE}', '${this.FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.copy('${this.COPY_FILE}', '${this.FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * move/rename a (file or) directory
     */
    _onMove() {
        console.log('[DemoApiFileManager] _onMove()');
        window.sigApi.fileManager.move(
            this.COPY_FILE,
            this.FILE,
            (data) => { // onProgress
                console.log(`[DemoApiFileManager] move progress uid: ${data.uid} progress: ${data.progress}`);
            },
            (data) => { // onBegin
                console.log(`[DemoApiFileManager] move begin uid: ${data.uid}`);
            },
            (data) => { // onEnd
                console.log(`[DemoApiFileManager] move end uid: ${data.uid}`);
            }
        ).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.move('${this.COPY_FILE}', '${this.FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.move('${this.COPY_FILE}', '${this.FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * delete a (file or) directory
     */
    _onRemove() {
        console.log('[DemoApiFileManager] _onRemove()');
        window.sigApi.fileManager.remove(
            this.COPY_FILE,
            (data) => { // onProgress
                console.log(`[DemoApiFileManager] remove progress uid: ${data.uid} progress: ${data.progress}`);
            },
            (data) => { // onBegin
                console.log(`[DemoApiFileManager] remove begin uid: ${data.uid}`);
            },
            (data) => { // onEnd
                console.log(`[DemoApiFileManager] remove end uid: ${data.uid}`);
            }
        ).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.remove('${this.COPY_FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.remove('${this.COPY_FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * read a file
     */
    _onReadFile() {
        console.log('[DemoApiFileManager] _onReadFile()');
        const openPromise = window.sigApi.fileManager.open(this.NEW_FILE, 'r');
        const infoPromise = window.sigApi.fileManager.info(this.NEW_FILE);
        let fileHandle;
        Promise.all([openPromise, infoPromise]).then(([openResponse, infoResponse]) => {
            fileHandle = openResponse.handle;
            window.sigApi.fileManager.readFile(
                openResponse.handle,
                infoResponse.size,
                undefined, // uid
                (progressResponse) => { // progress
                    console.log('readFile progress:', progressResponse);
                },
                (beginResponse) => { // begin
                    console.log('readFile begin:', beginResponse);
                },
                (endResponse) => { // end
                    console.log('readFile end:', endResponse);
                }
            ).then((readFileResponse) => {
                console.log('[DemoApiFileManager]     -> ', readFileResponse);
            }).finally(() => {
                window.sigApi.fileManager.close(fileHandle);
            });
        });
    }

    /**
     * @private
     * write a file
     */
    _onWriteFile() {
        console.log('[DemoApiFileManager] _onWriteFile()');
        const dummyText = ['dummy text...'];
        const blob = new Blob(dummyText, { type: 'text/plain' });
        window.sigApi.fileManager.writeFile(
            this.NEW_FILE,
            blob,
            undefined, // uid
            (progressResponse) => { // progress
                console.log('writeFile progress:', progressResponse);
            },
            (beginResponse) => { // begin
                console.log('writeFile begin:', beginResponse);
            },
            (endResponse) => { // end
                console.log('writeFile end:', endResponse);
            }
        ).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.writeFile('${this.NEW_FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.writeFile('${this.NEW_FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * get file content
     */
    _onFileContent() {
        console.log('[DemoApiFileManager] _onFileContent()');
        window.sigApi.fileManager.fileContent(
            this.NEW_FILE,
            undefined, // uid
            (progressResponse) => { // progress
                console.log('fileContent progress:', progressResponse);
            },
            (beginResponse) => { // begin
                console.log('fileContent begin:', beginResponse);
            },
            (endResponse) => { // end
                console.log('fileContent end:', endResponse);
            }
        ).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.fileContent('${this.NEW_FILE}') uid: ${res.uid} filelength: ${res.filelength}`);
            if (res.data instanceof Blob) {
                res.data.text().then((text) => {
                    console.log(`[DemoApiFileManager]     -> '${text}'`);
                });
            }
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.fileContent('${this.NEW_FILE}') uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * get drive infos
     */
    _onGetDriveInfos() {
        console.log('[DemoApiFileManager] _onGetDriveInfos()');
        window.sigApi.fileManager.getDriveInfos().then((res) => {
            console.log('[DemoApiFileManager] sigApi.fileManager.getDriveInfos()');
            console.log('[DemoApiFileManager]     -> ', res);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.getDriveInfos()  uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiFileManager.init();
