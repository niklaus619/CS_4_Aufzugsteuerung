// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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

class DemoApiWindowManager {
    readonly WINDOW = 'Window0';
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
        const evtGetWindow = window.sigApi.events.getUserDefinedInternalEvent('evtGetWindow');
        if (evtGetWindow) {
            window.sigApi.eventMediator.subscribe(
                evtGetWindow,
                () => {
                    this._onGetWindow();
                }
            );
        }
        const evtOpenWindow = window.sigApi.events.getUserDefinedInternalEvent('evtOpenWindow');
        if (evtOpenWindow) {
            window.sigApi.eventMediator.subscribe(
                evtOpenWindow,
                () => {
                    this._onOpenWindow();
                }
            );
        }
        const evtCloseWindow = window.sigApi.events.getUserDefinedInternalEvent('evtCloseWindow');
        if (evtCloseWindow) {
            window.sigApi.eventMediator.subscribe(
                evtCloseWindow,
                () => {
                    this._onCloseWindow();
                }
            );
        }
        const evtGetOpenWindows = window.sigApi.events.getUserDefinedInternalEvent('evtGetOpenWindows');
        if (evtGetOpenWindows) {
            window.sigApi.eventMediator.subscribe(
                evtGetOpenWindows,
                () => {
                    this._onGetOpenWindows();
                }
            );
        }
        const evtResetWindows = window.sigApi.events.getUserDefinedInternalEvent('evtResetWindows');
        if (evtResetWindows) {
            window.sigApi.eventMediator.subscribe(
                evtResetWindows,
                () => {
                    this._onResetWindows();
                }
            );
        }
        const evtGetWindows = window.sigApi.events.getUserDefinedInternalEvent('evtGetWindows');
        if (evtGetWindows) {
            window.sigApi.eventMediator.subscribe(
                evtGetWindows,
                () => {
                    this._onGetWindows();
                }
            );
        }
        const evtCreateWindow = window.sigApi.events.getUserDefinedInternalEvent('evtCreateWindow');
        if (evtCreateWindow) {
            window.sigApi.eventMediator.subscribe(
                evtCreateWindow,
                () => {
                    this._onCreateWindow();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.windowManager.getWindow
     */
    _onGetWindow() {
        console.log('[DemoApiWindowManager] _onGetWindow()');
        const res = window.sigApi.windowManager.getWindow(this.WINDOW);
        console.log(`sigApi.windowManager.getWindow('${this.WINDOW}')`);
        console.dir(res);
    }

    /**
     * @private
     * open a window and log the result of sigApi.windowManager.openWindow
     */
    _onOpenWindow() {
        console.log('[DemoApiWindowManager] _onOpenWindow()');
        window.sigApi.windowManager.openWindow(this.WINDOW).then(() => {
            console.log(`[DemoApiWindowManager] sigApi.windowManager.openWindow('${this.WINDOW}')`);
        }).catch((error) => {
            console.log(`[DemoApiWindowManager] error in sigApi.windowManager.openWindow('${this.WINDOW}') ${error}`);
        });
    }

    /**
     * @private
     * close a window and log the result of sigApi.windowManager.closeWindow
     */
    _onCloseWindow() {
        console.log('[DemoApiWindowManager] _onCloseWindow()');
        window.sigApi.windowManager.closeWindow(this.WINDOW).then(() => {
            console.log(`[DemoApiWindowManager] sigApi.windowManager.closeWindow('${this.WINDOW}')`);
        }).catch((error) => {
            console.log(`[DemoApiWindowManager] error in sigApi.windowManager.closeWindow('${this.WINDOW}') ${error}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.windowManager.getOpenWindows
     */
    _onGetOpenWindows() {
        console.log('[DemoApiWindowManager] _onGetOpenWindows()');
        const openWindows = window.sigApi.windowManager.getOpenWindows();
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
        const windows = window.sigApi.windowManager.getWindows();
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
            eventhandler: { close: `${window.sigApi.SIG_CONST.EVENT_LIST_USER_INTERN}closeWindow` },
            fonts: { elementMainFont: 'DefaultRoboto' }
        };

        const top = 100;
        const left = 20;
        const width = 300;
        const height = 200;
        window.sigApi.windowManager.createWindow(top, left, width, height,
            /**
             * render callback
             * @param {HTMLElement} domRef 
             */
            (domRef) => {
                console.log('[DemoApiWindowManager] createWindow render callback');
                const myElement = document.createElement('p');
                myElement.innerHTML = 'This is a Text';
                (domRef as any).content.appendChild(myElement);
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
        window.sigApi.windowManager.resetWindows();
        console.log('sigApi.windowManager.resetWindows()');
    }

}

/**
 * Create the codemodule instance
 */
DemoApiWindowManager.init();
