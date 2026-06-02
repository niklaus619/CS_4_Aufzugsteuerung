// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Example on how to implement a singleton pattern in the Lasal VISUDesigner System
 * This sample shows the following use cases:
 *  * Singleton for use as a codemodule (dashboard, window, compositecontrol, keyboard, global) including reference counting
 *  * Access of Sigmatek APIs from within the singleton
 *  * Implementation and access of APIs of the singleton
 */

// Property that holds the singleton instance of the class
let _singletonInstance: Singleton | undefined = undefined;
let _constructorGuard: boolean = true;

/**
 * Define and implement the class for the singleton
 * IMPORTANT: export keyword is only necessary to be able to use Singleton when used through module import
 */
export class Singleton implements SigApi.ViewModelCodeModule {
    /**
     * @returns {Singleton}
     */
    static getInstance() {
        if (!_singletonInstance) {
            _constructorGuard = false;
            _singletonInstance = new Singleton();
            _constructorGuard = true;
        }
        return _singletonInstance;
    }

    _activeRefCnt: number
    _viewModelMap: Map<string, SigApi.ViewModel>
    constructor() {
        if (_constructorGuard || _singletonInstance) {
            throw 'new Singleton() not allowed, use getInstance';
        }
        // Start with reference count 0 (not applicable for global code module / usage in control)
        this._activeRefCnt = 0;
        // Map that holds all view models that currently interact with the singleton instance (not applicable for global code module)
        this._viewModelMap = new Map;

        // IMPORTANT: sigApi is not accessible until ready
        window.sigApiReadyPromise.then(() => {
            // From this moment it is possible to access the Sigmatek APIs
            console.log('[Singleton] window.sigApiReadyPromise resolved');
            // IMPORTANT: Commands that communicate with the dataservice will fail if the webSocket communication channel is down
            // For more information see cm_demo_api_websocketState.js
            window.eventReadyPromises.get(window.sigApi.SIG_CONST.EVENT_READY_PROMISE_WS_READY)?.then(() => {
                // From this moment websocket is ready for the first time 
                console.log('[Singleton] EVENT_READY_PROMISE_WS_READY');
            });
            // IMPORTANT: Commands that communicate with the dataservice will also fail if the accessSequence, which is responsible for acess management, is not ready!
            window.eventReadyPromises.get(window.sigApi.SIG_CONST.EVENT_READY_PROMISE_ACCESS_SEQUENCE_READY)?.then(() => {
                console.log('[Singleton] EVENT_READY_PROMISE_ACCESS_SEQUENCE_READY');
            });
            // IMPORTANT: Commands that communicate with station(s) must wait until all of the required station(s) are available and in Run RAM state!
            // For more information see cm_demo_api_state.js
            window.eventReadyPromises.get(window.sigApi.SIG_CONST.EVENT_READY_PROMISE_STATIONS_READY)?.then(() => {
                console.log('[Singleton] EVENT_READY_PROMISE_STATIONS_READY');
            });
            // IMPORTANT: Commands that require Lasal IDs must also wait until the Lasal Ids of the required station(s) are available!
            // For more information see cm_demo_api_state.js
            window.eventReadyPromises.get(window.sigApi.SIG_CONST.EVENT_READY_PROMISE_LASALIDS_READY)?.then(() => {
                console.log('[Singleton] EVENT_READY_PROMISE_LASALIDS_READY');
            });
        });
    }

    /**
     * Notifies the singleton for every registered viewModel instance that is created (not applicable for global code module / usage in control)
     * @param {ViewModel} viewModel 
     */
    init(viewModel: SigApi.ViewModel) {
        // Register new view model
        this._viewModelMap.set(viewModel.getInstanceId(), viewModel);
    }

    /**
     * Notifies the singleton for every registered viewModel instance that is deleted (not applicable for global code module / usage in control)
     * @param {ViewModel} viewModel 
     */
    cleanUp(viewModel: SigApi.ViewModel) {
        // Unregister deleted view model
        this._viewModelMap.delete(viewModel.getInstanceId());
    }

    /**
     * Notifies the singleton every time a viewModel is registered / unregistered or changing its active state (not applicable for global code module / usage in control)
     * @param {boolean} active 
     */
    onActiveChanged(active: boolean) {
        if (active === true) {
            // Increase reference count whenever an associated view model becomes active
            this._activeRefCnt += 1;
        } else {
            // Decrease reference count whenever an associated view model becomes inactive
            this._activeRefCnt -= 1;
        }
        if (this._activeRefCnt === 0) {
            // Add your own inactive state handling code
            this.doSomething(`Module is inactive! refCnt is now ${this._activeRefCnt}`);
        } else {
            // Add your own active state handling code
            this.doSomething(`Module is active! refCnt is now ${this._activeRefCnt}`);
        }
    }

    /**
     * Dummy Api method
     * @param {*} someData 
     * @returns {string}
     */
    doSomething(someData: any): string {
        console.log(someData);
        return `someResult for ${someData}`;
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Usage as LVD code module (for application developers)

// Register the singleton module for a dashboard
window.registerDashboardModule('dashboardname', Singleton.getInstance);

// Register the singleton module for a window
window.registerWindowModule('windowname', Singleton.getInstance);

// Register the singleton module for composite control
window.registerCompositeControlModule('compositecontrolname', Singleton.getInstance);

// Register the singleton module for a keyboard window
window.registerKeyboardModule('keyboardname', Singleton.getInstance);

// Register the singleton module for global access
window.registerGlobalModule('singletonmodulename', Singleton.getInstance);
// Global access of the singleton through global codemodule factory (register first with "window.registerGlobalModule"
const arrayModuleInstances = window.codemoduleFactory.GlobalModules.requestInstances('singletonmodulename');
// Call some APIs on the found instances
arrayModuleInstances.forEach((module: Singleton) => {
    if (module && typeof module.doSomething === 'function') {
        const someResult = module.doSomething('someData');
        console.log(someResult);
    }
});
