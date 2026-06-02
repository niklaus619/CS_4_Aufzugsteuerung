/**
 * Demo how to use sigApi.appRouter
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetRoutes'
 *     * 'evtGetCurrentRoute'
 *     * 'evtGetCurrentPath'
 *     * 'evtNavigate'
 *     * 'evtNavigateBack'
 *     * 'evtNavigateForward'
 *     * 'evtGetRouteByIndex'
 *     * 'evtSwitchToRoute'
 *     * 'evtGetSortedIndexList'
 *     * 'evtOverloadActiveScreen'
 *   required dashboard (route)
 *     * 'Dashboard0/'
 *   required datapoint
 *     * '0:SampleObject.SampleServer'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

const PATH = 'Dashboard0/';
const DATAPOINT_NAME = '0:SampleObject.SampleServer';

class DemoApiAppRouter {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiAppRouter();
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
            sigApi.events.getUserDefinedInternalEvent('evtGetRoutes'),
            () => {
                this._onGetRoutes();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetCurrentRoute'),
            () => {
                this._onGetCurrentRoute();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetCurrentPath'),
            () => {
                this._onGetCurrentPath();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtNavigate'),
            () => {
                this._onNavigate();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtNavigateBack'),
            () => {
                this._onNavigateBack();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtNavigateForward'),
            () => {
                this._onNavigateForward();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetRouteByIndex'),
            () => {
                this._onGetRouteByIndex();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtSwitchToRoute'),
            () => {
                this._onSwitchToRoute();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetSortedIndexList'),
            () => {
                this._onGetSortedIndexList();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtOverloadActiveScreen'),
            () => {
                this._onOverloadActiveScreen();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getRoutes
     */
    _onGetRoutes() {
        console.log('[DemoApiAppRouter] _onGetRoutes()');
        const res = sigApi.appRouter.getRoutes();
        for (let ii = 0, len = res.length; ii < len; ii += 1) {
            console.log(`[DemoApiAppRouter] sigApi.appRouter.getRoutes()[${ii}].getPath(): ${res[ii].getPath()}`);
        }
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getCurrentRoute
     */
    _onGetCurrentRoute() {
        console.log('[DemoApiAppRouter] _onGetCurrentRoute()');
        const res = sigApi.appRouter.getCurrentRoute();
        console.log(`[DemoApiAppRouter] sigApi.appRouter.getCurrentRoute().getPath(): ${res.getPath()}`);
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getCurrentPath
     */
    _onGetCurrentPath() {
        console.log('[DemoApiAppRouter] _onGetCurrentPath()');
        const res = sigApi.appRouter.getCurrentPath();
        console.log(`[DemoApiAppRouter] sigApi.appRouter.getCurrentPath(): ${res}`);
    }

    /**
     * @private
     * navigate via path
     */
    _onNavigate() {
        console.log('[DemoApiAppRouter] _onNavigate()');
        sigApi.appRouter.navigate(PATH);
    }

    /**
     * @private
     * navigate back
     */
    _onNavigateBack() {
        console.log('[DemoApiAppRouter] _onNavigateBack()');
        sigApi.appRouter.navigateBack();
    }

    /**
     * @private
     * navigate forward
     */
    _onNavigateForward() {
        console.log('[DemoApiAppRouter] _onNavigateForward()');
        sigApi.appRouter.navigateForward();
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getRouteByIndex
     */
    _onGetRouteByIndex() {
        console.log('[DemoApiAppRouter] _onGetRouteByIndex()');
        const index = 0;
        const res = sigApi.appRouter.getRouteByIndex(index);
        console.log(`[DemoApiAppRouter] sigApi.appRouter.getRouteByIndex(${index}).getPath(): ${res.getPath()}`);
    }

    /**
     * @private
     * navigate via Route
     */
    _onSwitchToRoute() {
        console.log('[DemoApiAppRouter] _onSwitchToRoute()');
        const index = 0;
        const route = sigApi.appRouter.getRouteByIndex(index);
        sigApi.appRouter.switchToRoute(route);
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getSortedIndexList
     */
    _onGetSortedIndexList() {
        console.log('[DemoApiAppRouter] _onGetSortedIndexList()');
        const res = sigApi.appRouter.getSortedIndexList();
        console.log('[DemoApiAppRouter] sigApi.appRouter.getSortedIndexList():', res);
    }

    /**
     * @private
     * overload active screen
     */
    _onOverloadActiveScreen() {
        console.log('[DemoApiAppRouter] _onOverloadActiveScreen()');
        const selectionGroup = null;
        const targetDatapointId = null;
        sigApi.appRouter.overloadActiveScreen(DATAPOINT_NAME, selectionGroup, targetDatapointId);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiAppRouter.init();
