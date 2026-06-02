// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * dashboard module template
 */
class DashboardModule implements SigApi.ViewModelCodeModule {
    /**
     * @returns {DashboardModule}
     */
    static create(): DashboardModule {
        return new DashboardModule();
    }

    _viewModel: SigApi.ViewModel
    _initialized: boolean
    _active: boolean
    constructor() { }

    /**
     * @param {ViewModel} viewModel 
     */
    init(viewModel: SigApi.ViewModel) {
        this._viewModel = viewModel;

        // Add your own initialization

        this._initialized = true;
        this._active = false;
    }

    /**
     * @param {ViewModel} viewModel 
     */
    cleanUp(viewModel: SigApi.ViewModel) {
        // Timeouts, intervals, promises and eventListeners registered using
        // sigApi.sigUtils functions are cleaned up by runtime
        // example of sigApi.sigUtils.setTimeout
        //   sigApi.sigUtils.setTimeout(this, () => {}, 1000);

        // Add your own cleanUp code

        this._initialized = false;
    }

    /**
     * @param {boolean} active 
     */
    onActiveChanged(active: boolean) {
        // Add your own active state handling code

        this._active = active;
    }

}

// Register the DashboardModule for a dashboard
window.registerDashboardModule('DashboardName', DashboardModule.create);
