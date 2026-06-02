class SplashScreenExtension {
    static init() {
        window.sigApiReadyPromise.then(() => {
            window.SplashScreenExtension = new SplashScreenExtension();
            if (window.SplashScreenExtension)
                console.log('Created Splash Screen Extenstion : window.SplashScreenExtension');
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
        this.evtHideSplashScreen = window.sigApi.events.getInternalEvent('HIDE_SPLASH_SCREEN');
        if (this.evtHideSplashScreen) {
            window.sigApi.eventMediator.subscribe(this.evtHideSplashScreen, () => {
                this._onHideSplashScreen();
            });
        }
    }

    /**
     * @private
     * log the result of sigApi.events.getUserDefinedInternalEvent
     */
    _onHideSplashScreen() {
        this.splashscreen = document.getElementById('lvdsplashscreeninstance');
        if (this.splashscreen) {
            this.splashscreen.addMessage('Loading User Configuration');
            this.splashscreen.show();
            if (!this.timeoutId) {
                this.timeoutId = window.sigApi.sigUtils.setTimeout(this, () => {
                    if (this.splashscreen) {
                        this.splashscreen.addMessage('Loading User Configuration finished !');
                        this.splashscreen.hide();
                        this.timeoutId = undefined;
                    }
                }, 5000);
            }
        }
    }
}

/**
 * Create the codemodule instance
 */
SplashScreenExtension.init();
