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

const PREFIX = 'c:\\demo_api_fileManager';
const TEST_DIR = `${PREFIX}\\test`;
const NAME_FILTER = '*.txt';
const NEW_DIR = `${PREFIX}\\new`;
const RENAMED_DIR = `${PREFIX}\\renamed`;
const COPY_FILE = `${TEST_DIR}\\copy.txt`;
const FILE = `${TEST_DIR}\\file.txt`;
const NEW_FILE = `${PREFIX}\\file.txt`;

class DemoApiFileManager {
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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDriveList'),
            () => {
                this._onGetRoot();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtReadDir'),
            () => {
                this._onReadDir();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMakeDir'),
            () => {
                this._onMakeDir();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRename'),
            () => {
                this._onRename();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtCopy'),
            () => {
                this._onCopy();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMove'),
            () => {
                this._onMove();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRemove'),
            () => {
                this._onRemove();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtReadFile'),
            () => {
                this._onReadFile();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtWriteFile'),
            () => {
                this._onWriteFile();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtFileContent'),
            () => {
                this._onFileContent();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDriveInfos'),
            () => {
                this._onGetDriveInfos();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.fileManager.getRoot
     */
    _onGetRoot() {
        console.log('[DemoApiFileManager] _onGetRoot()');
        sigApi.fileManager.getRoot().then((res) => {
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
        sigApi.fileManager.readDir(TEST_DIR, NAME_FILTER, attributeIncludeFilter, attributeExcludeFilter).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.readDir('${TEST_DIR}', '${NAME_FILTER}', ${attributeIncludeFilter}, ${attributeExcludeFilter}) uid: ${res.uid}`);
            console.log(`[DemoApiFileManager]     parent: ${res.parent.dpne}`);
            for (let ii = 0, len = res.parent.nodes.length; ii < len; ii += 1) {
                const node = res.parent.nodes[ii];
                console.log(`[DemoApiFileManager]         nodes[${ii}]:`);
                console.log(`[DemoApiFileManager]             dpne: ${node.dpne}`);
                console.log(`[DemoApiFileManager]             size: ${node.size}`);
                console.log(`[DemoApiFileManager]             attribute: ${node.attribute}`);
            }
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.readDir('${TEST_DIR}', '${NAME_FILTER}', ${attributeIncludeFilter}, ${attributeExcludeFilter}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * create a directory
     */
    _onMakeDir() {
        console.log('[DemoApiFileManager] _onMakeDir()');
        sigApi.fileManager.makeDir(NEW_DIR).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.makeDir('${NEW_DIR}') uid: ${res.uid} dir: ${res.dir}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.makeDir('${NEW_DIR}') uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * rename a directory
     */
    _onRename() {
        console.log('[DemoApiFileManager] _onRename()');
        sigApi.fileManager.rename(RENAMED_DIR, NEW_DIR).then((res) => {
            console.log(`[DemoApiFileManager] sigApi.fileManager.rename('${RENAMED_DIR}', '${NEW_DIR}') uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.rename('${RENAMED_DIR}', '${NEW_DIR}') uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * copy a (file or) directory
     */
    _onCopy() {
        console.log('[DemoApiFileManager] _onCopy()');
        sigApi.fileManager.copy(
            COPY_FILE,
            FILE,
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
            console.log(`[DemoApiFileManager] sigApi.fileManager.copy('${COPY_FILE}', '${FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.copy('${COPY_FILE}', '${FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * move/rename a (file or) directory
     */
    _onMove() {
        console.log('[DemoApiFileManager] _onMove()');
        sigApi.fileManager.move(
            COPY_FILE,
            FILE,
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
            console.log(`[DemoApiFileManager] sigApi.fileManager.move('${COPY_FILE}', '${FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.move('${COPY_FILE}', '${FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * delete a (file or) directory
     */
    _onRemove() {
        console.log('[DemoApiFileManager] _onRemove()');
        sigApi.fileManager.remove(
            COPY_FILE,
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
            console.log(`[DemoApiFileManager] sigApi.fileManager.remove('${COPY_FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.remove('${COPY_FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * read a file
     */
    _onReadFile() {
        console.log('[DemoApiFileManager] _onReadFile()');
        const openPromise = sigApi.fileManager.open(NEW_FILE, 'r');
        const infoPromise = sigApi.fileManager.info(NEW_FILE);
        let fileHandle;
        Promise.all([openPromise, infoPromise]).then(([openResponse, infoResponse]) => {
            fileHandle = openResponse.handle;
            sigApi.fileManager.readFile(
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
                sigApi.fileManager.close(fileHandle);
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
        sigApi.fileManager.writeFile(
            NEW_FILE,
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
            console.log(`[DemoApiFileManager] sigApi.fileManager.writeFile('${NEW_FILE}', ...) uid: ${res.uid}`);
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.writeFile('${NEW_FILE}', ...) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * get file content
     */
    _onFileContent() {
        console.log('[DemoApiFileManager] _onFileContent()');
        sigApi.fileManager.fileContent(
            NEW_FILE,
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
            console.log(`[DemoApiFileManager] sigApi.fileManager.fileContent('${NEW_FILE}') uid: ${res.uid} filelength: ${res.filelength}`);
            if (res.data instanceof Blob) {
                res.data.text().then((text) => {
                    console.log(`[DemoApiFileManager]     -> '${text}'`);
                });
            }
        }).catch((error) => {
            console.log(`[DemoApiFileManager] error in sigApi.fileManager.fileContent('${NEW_FILE}') uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * get drive infos
     */
    _onGetDriveInfos() {
        console.log('[DemoApiFileManager] _onGetDriveInfos()');
        sigApi.fileManager.getDriveInfos().then((res) => {
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
