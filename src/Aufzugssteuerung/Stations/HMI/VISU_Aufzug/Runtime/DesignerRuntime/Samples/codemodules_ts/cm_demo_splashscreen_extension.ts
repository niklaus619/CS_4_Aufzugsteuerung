// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

class SplashScreenExtension {
    static init() {
        window.sigApiReadyPromise.then(() => {
            (window as any).SplashScreenExtension = new SplashScreenExtension();
            if ((window as any).SplashScreenExtension) console.log('Created Splash Screen Extenstion : window.SplashScreenExtension');
        });
    }

    constructor() {
        this._registerEvents();
    }

    evtHideSplashScreen: SigApi.Event | null;
    splashscreen: HTMLElement | null;
    timeoutId: number | boolean | undefined;

    /**
     * @private
     * Subscribe to user defined events.
     * There is no need to use the sigUtils API to register event listeners because
     * global code modules such as this one are never destroyed during runtime. 
     */
    _registerEvents() {
        this.evtHideSplashScreen = window.sigApi.events.getInternalEvent('HIDE_SPLASH_SCREEN');
        if (this.evtHideSplashScreen) {
            window.sigApi.eventMediator.subscribe(
                this.evtHideSplashScreen,
                () => {
                    this._onHideSplashScreen();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.events.getUserDefinedInternalEvent
     */
    _onHideSplashScreen() {

        this.splashscreen = document.getElementById('lvdsplashscreeninstance');
        if (this.splashscreen) {
            (this.splashscreen as any).addMessage('Loading User Configuration');
            (this.splashscreen as any).show();
            if (!this.timeoutId) {
                this.timeoutId = window.sigApi.sigUtils.setTimeout(this,
                    () => {
                        if (this.splashscreen) {
                            (this.splashscreen as any).addMessage('Loading User Configuration finished !');
                            (this.splashscreen as any).hide();
                            this.timeoutId = undefined;
                        }
                    },
                    5000
                );
            }
        }
    }
}

/**
 * Create the codemodule instance
 */
SplashScreenExtension.init();
