/**
 * dashboard module template
 */
class DashboardModule {
    /**
     * @returns {DashboardModule}
     */
    static create() {
        return new DashboardModule();
    }

    constructor() { }

    /**
     * @param {ViewModel} viewModel 
     */
    init(viewModel) {
        this._viewModel = viewModel;

        // Add your own initialization

        this._initialized = true;
        this._active = false;
    }

    /**
     * @param {ViewModel} viewModel 
     */
    cleanUp(viewModel) {
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
    onActiveChanged(active) {
        // Add your own active state handling code

        this._active = active;
    }

}

// Register the DashboardModule for a dashboard
window.registerDashboardModule('DashboardName', DashboardModule.create);
