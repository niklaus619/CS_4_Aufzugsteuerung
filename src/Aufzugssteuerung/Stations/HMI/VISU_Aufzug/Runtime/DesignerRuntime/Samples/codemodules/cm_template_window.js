/**
 * window module template
 */
class WindowModule {
    /**
     * @returns {WindowModule}
     */
    static create() {
        return new WindowModule();
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

// Register the WindowModule for a window
window.registerWindowModule('WindowName', WindowModule.create);
