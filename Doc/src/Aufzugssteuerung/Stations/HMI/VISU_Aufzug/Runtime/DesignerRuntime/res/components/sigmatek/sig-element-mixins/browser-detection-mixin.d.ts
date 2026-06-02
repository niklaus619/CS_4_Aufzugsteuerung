/// <reference path="../../../../rt/node_modules/@types/sig-api/index.d.ts" />

/**
 * Declares mixin properties and functions for browser detection. 
 * @mixin BrowserDetectionMixin 
 * @version 01.00.001
 */
declare function BrowserDetectionMixin<T extends new (...args: any[]) => {}>(base: T): T & BrowserDetectionMixinConstructor;

interface BrowserDetectionMixinConstructor {
    new(...args: any[]): BrowserDetectionMixin;
}

interface BrowserDetectionMixin {

    /** Determines whether the component is shown on a mobile device. */
    ismobile: boolean

    /** A reference to the Runtime browser API. */
    readonly browserApi: SigApi.ApiBrowser | undefined

    /**
    * Returns the screen mode in which the app is running.
    * @returns {String|Undefined} Returns "browser", "minimal-ui", "standalone" or "fullscreen". If the screenmode could not be detected it returns undefined.
    */
    getScreenMode(): 'browser' | 'minimal-ui' | 'standalone' | 'fullscreen' | undefined

    /**
     * Checks if the http request is made by a browser running under iOs or iPadOs.
     * @returns {boolean} Returns true if the browser is running under iOs or iPadOs, otherwise false.
     */
    isAppleMobile(): boolean | undefined

    /**
     * Checks if the http request is made by the safari mobile browser
     * @returns {boolean} Returns true if the browsers is safari mobile, otherwise false.
     */
    isMobileSafari(): boolean | undefined

    /** 
     * Returns true if Chrome on Android is used, false otherwise.
     * @returns {boolean} Returns true if the chrome browser on Android is used.
     */
    isChromeAndroid(): boolean | undefined

    /**  
    * Returns whether the component is shown on a mobile device or not.
    * @returns {boolean} True, if the component is shown on a mobile device.
    */
    isMobile(): boolean

    /**
     * Returns true if Chrome browser is used, false otherwise.
     * @returns {boolean} Returns true if the chrome browser is used.
     */
    isChrome(): boolean | undefined

    /**
    * Returns true if Safari browser is used, false otherwise.
    * @returns {boolean} Returns true if the Safari browser is used.
    */
    isSafari(): boolean | undefined

    /**
    * Returns true if Firefox browser is used, false otherwise.
    * @returns {boolean} Returns true if the Firefox browser is used.
    */
    isFirefox(): boolean | undefined

    /**
    * Returns true if the browser runs on iPhone, false otherwise.
    * @returns {boolean} Returns true if a browser on iphone is used.
    */
    isiPhone(): boolean | undefined

    /**
    * Returns true if the browser runs on iPad, false otherwise.
    * @returns {boolean} Returns true if a browser on iPad is used.
    */
    isiPad(): boolean | undefined
}

export { BrowserDetectionMixin, BrowserDetectionMixinConstructor };