/**
 * Demo how to use sigApi.windowManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetWindow'
 *     * 'evtOpenWindow'
 *     * 'evtCloseWindow'
 *     * 'evtGetOpenWindows'
 *     * 'evtResetWindows'
 *     * 'evtGetWindows'
 *     * 'evtCreateWindow'
 *   required window (by name)
 *     * 'Window0' expected to exist
 *     * 'newWindow' expected not to exist (createWindow)
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

const WINDOW = 'Window0';

class DemoApiWindowManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiWindowManager();
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
            sigApi.events.getUserDefinedInternalEvent('evtGetWindow'),
            () => {
                this._onGetWindow();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtOpenWindow'),
            () => {
                this._onOpenWindow();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtCloseWindow'),
            () => {
                this._onCloseWindow();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetOpenWindows'),
            () => {
                this._onGetOpenWindows();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtResetWindows'),
            () => {
                this._onResetWindows();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetWindows'),
            () => {
                this._onGetWindows();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtCreateWindow'),
            () => {
                this._onCreateWindow();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.windowManager.getWindow
     */
    _onGetWindow() {
        console.log('[DemoApiWindowManager] _onGetWindow()');
        const res = sigApi.windowManager.getWindow(WINDOW);
        console.log(`sigApi.windowManager.getWindow('${WINDOW}')`);
        console.dir(res);
    }

    /**
     * @private
     * open a window and log the result of sigApi.windowManager.openWindow
     */
    _onOpenWindow() {
        console.log('[DemoApiWindowManager] _onOpenWindow()');
        sigApi.windowManager.openWindow(WINDOW).then(() => {
            console.log(`[DemoApiWindowManager] sigApi.windowManager.openWindow('${WINDOW}')`);
        }).catch((error) => {
            console.log(`[DemoApiWindowManager] error in sigApi.windowManager.openWindow('${WINDOW}') ${error}`);
        });
    }

    /**
     * @private
     * close a window and log the result of sigApi.windowManager.closeWindow
     */
    _onCloseWindow() {
        console.log('[DemoApiWindowManager] _onCloseWindow()');
        sigApi.windowManager.closeWindow(WINDOW).then(() => {
            console.log(`[DemoApiWindowManager] sigApi.windowManager.closeWindow('${WINDOW}')`);
        }).catch((error) => {
            console.log(`[DemoApiWindowManager] error in sigApi.windowManager.closeWindow('${WINDOW}') ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.windowManager.getOpenWindows
     */
    _onGetOpenWindows() {
        console.log('[DemoApiWindowManager] _onGetOpenWindows()');
        const openWindows = sigApi.windowManager.getOpenWindows();
        console.log(`[DemoApiWindowManager] sigApi.windowManager.getOpenWindows() openWindows.length: ${openWindows.length}`);
        for (let ii = 0, len = openWindows.length; ii < len; ii += 1) {
            console.log(`[DemoApiWindowManager]     openWindows[${ii}]`);
            console.dir(openWindows[ii]);
        }
    }

    /**
     * @private
     * log the result of sigApi.windowManager.getWindows
     */
    _onGetWindows() {
        console.log('[DemoApiWindowManager] _onGetWindows()');
        const windows = sigApi.windowManager.getWindows();
        console.log(`[DemoApiWindowManager] sigApi.windowManager.getWindows() windows.length: ${windows.length}`);
        for (let ii = 0, len = windows.length; ii < len; ii += 1) {
            console.log(`[DemoApiWindowManager]     windows[${ii}]`);
            console.dir(windows[ii]);
        }
    }

    /**
     * @private
     * create a window and log the result of sigApi.windowManager.createWindow
     */
    _onCreateWindow() {
        console.log('[DemoApiWindowManager] _onCreateWindow()');
        const props = {
            window: { hasMinButton: false, headerTitle: 'A window' },
            css: { '--theme-sig-window-panel-background-color': 'red' },
            events: {
                jspanelbeforeclose: () => {
                    console.log('[DemoApiWindowManager] createWindow jspanelbeforeclose callback');
                }
            },
            eventhandler: { close: `${sigApi.SIG_CONST.EVENT_LIST_USER_INTERN}closeWindow` },
            fonts: { elementMainFont: 'DefaultRoboto' }
        };

        const top = 100;
        const left = 20;
        const width = 300;
        const height = 200;
        sigApi.windowManager.createWindow(top, left, width, height,
            /**
             * render callback
             * @param {HTMLElement} domRef 
             */
            (domRef) => {
                console.log('[DemoApiWindowManager] createWindow render callback');
                const myElement = document.createElement('p');
                myElement.innerHTML = 'This is a Text';
                domRef.content.appendChild(myElement);
            },
            props
        ).then(() => {
            console.log('[DemoApiWindowManager] sigApi.windowManager.createWindow(..) resolved');
        }).catch((error) => {
            console.log(`[DemoApiWindowManager] error in sigApi.windowManager.createWindow(..) error: ${error}`);
        });
    }

    /**
     * @private
     * call sigApi.windowManager.resetWindows
     */
    _onResetWindows() {
        console.log('[DemoApiWindowManager] _onResetWindows()');
        sigApi.windowManager.resetWindows();
        console.log('sigApi.windowManager.resetWindows()');
    }

}

/**
 * Create the codemodule instance
 */
DemoApiWindowManager.init();
