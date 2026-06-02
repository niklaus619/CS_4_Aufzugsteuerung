/**
 * Demo how to use sigApi.defaultStyleManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetAllControlStyles'
 *     * 'evtGetDefaultStyleListForControl'
 *     * 'evtGetDefaultStyleByControlAndStyle'
 *     * 'evtGetWindowDefaultStyles'
 *     * 'evtGetWindowDefaultStyle'
 *   required styleClass
 *     * 'sig-control-button' - 'myButtonClass'
 *     * 'sig-window-container' - 'myWindowStyle'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiDefaultStyleManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiDefaultStyleManager();
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
            sigApi.events.getUserDefinedInternalEvent('evtGetAllControlStyles'),
            () => {
                this._onAllControlStyles();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDefaultStyleListForControl'),
            () => {
                this._onDefaultStyleListForControl();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetDefaultStyleByControlAndStyle'),
            () => {
                this._onDefaultStyleByControlAndStyle();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetWindowDefaultStyles'),
            () => {
                this._onWindowDefaultStyles();
            }
        );

        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetWindowDefaultStyle'),
            () => {
                this._onWindowDefaultStyle();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.defaultStyleManager.getAllControlStyles
     */
    _onAllControlStyles() {
        console.log('[DemoApiDefaultStyleManager] _onAllControlStyles()');
        const styleClassListArray = sigApi.defaultStyleManager.getAllControlStyles();
        for (let ii = 0, len = styleClassListArray.length; ii < len; ii += 1) {
            const styleClassList = styleClassListArray[ii];
            console.log(`[DemoApiDefaultStyleManager]     styleClassListArray[${ii}]`);
            console.log(`[DemoApiDefaultStyleManager]         controlName: ${styleClassList.getControlName()}`);
            const controlStyleClassListArray = styleClassList.getStyleClassList();
            for (let jj = 0, len = controlStyleClassListArray.length; jj < len; jj += 1) {
                console.log(`[DemoApiDefaultStyleManager]         controlStyleClassListArray[${jj}]`);
                const styleClass = controlStyleClassListArray[jj];
                console.log(`[DemoApiDefaultStyleManager]             name: ${styleClass.getName()}`);
                console.log(`[DemoApiDefaultStyleManager]             properties: ${JSON.stringify(styleClass.getProperties())}`);
            }
        }
    }

    /**
     * @private
     * log the result of sigApi.defaultStyleManager.getDefaultStyleListForControl
     */
    _onDefaultStyleListForControl() {
        console.log('[DemoApiDefaultStyleManager] _onDefaultStyleListForControl()');
        const styleClassListArray = sigApi.defaultStyleManager.getDefaultStyleListForControl('sig-control-button');
        for (let ii = 0, len = styleClassListArray.length; ii < len; ii += 1) {
            const styleClassList = styleClassListArray[ii];
            console.log(`[DemoApiDefaultStyleManager]     styleClassListArray[${ii}]`);
            console.log(`[DemoApiDefaultStyleManager]         controlName: ${styleClassList.getControlName()}`);
            const controlStyleClassListArray = styleClassList.getStyleClassList();
            for (let jj = 0, len = controlStyleClassListArray.length; jj < len; jj += 1) {
                console.log(`[DemoApiDefaultStyleManager]         controlStyleClassListArray[${jj}]`);
                const styleClass = controlStyleClassListArray[jj];
                console.log(`[DemoApiDefaultStyleManager]             name: ${styleClass.getName()}`);
                console.log(`[DemoApiDefaultStyleManager]             properties: ${JSON.stringify(styleClass.getProperties())}`);
            }
        }
    }

    /**
     * @private
     * log the result of sigApi.defaultStyleManager.getDefaultStyleByControlAndStyle
     */
    _onDefaultStyleByControlAndStyle() {
        console.log('[DemoApiDefaultStyleManager] _onDefaultStyleByControlAndStyle()');
        const styleClass = sigApi.defaultStyleManager.getDefaultStyleByControlAndStyle('sig-control-button', 'myButtonClass');
        if (styleClass) {
            console.log(`[DemoApiDefaultStyleManager]     styleClassName: ${styleClass.getName()}`);
            console.log(`[DemoApiDefaultStyleManager]     properties: ${JSON.stringify(styleClass.getProperties())}`);
        } else {
            console.log(`[DemoApiDefaultStyleManager]     => ${styleClass}`);
        }
    }

    /**
     * @private
     * log the result of sigApi.defaultStyleManager.getWindowDefaultStyles
     */
    _onWindowDefaultStyles() {
        console.log('[DemoApiDefaultStyleManager] _onWindowDefaultStyles()');
        const windowDefaultStyleList = sigApi.defaultStyleManager.getWindowDefaultStyles();
        for (let ii = 0, len = windowDefaultStyleList.length; ii < len; ii += 1) {
            const style = windowDefaultStyleList[ii];
            console.log(`[DemoApiDefaultStyleManager]     styleClassName: ${style.getName()}`);
            console.log(`[DemoApiDefaultStyleManager]     properties: ${JSON.stringify(style.getProperties())}`);
        }
    }

    /**
     * @private
     * log the result of sigApi.defaultStyleManager.getWindowDefaultStyle
     */
    _onWindowDefaultStyle() {
        console.log('[DemoApiDefaultStyleManager] _onWindowDefaultStyle()');
        const styleClass = sigApi.defaultStyleManager.getWindowDefaultStyle('myWindowStyle');
        if (styleClass) {
            console.log(`[DemoApiDefaultStyleManager]     styleClassName: ${styleClass.getName()}`);
            console.log(`[DemoApiDefaultStyleManager]     properties: ${JSON.stringify(styleClass.getProperties())}`);
        } else {
            console.log(`[DemoApiDefaultStyleManager]     => ${styleClass}`);
        }
    }

}

/**
 * Create the codemodule instance
 */
DemoApiDefaultStyleManager.init();
