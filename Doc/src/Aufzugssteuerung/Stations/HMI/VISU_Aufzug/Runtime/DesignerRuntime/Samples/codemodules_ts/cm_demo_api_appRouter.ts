// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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

class DemoApiAppRouter {
    readonly PATH = 'Dashboard0/';
    readonly DATAPOINT_NAME = '0:SampleObject.SampleServer';
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
        const evtGetRoutes = window.sigApi.events.getUserDefinedInternalEvent('evtGetRoutes');
        if (evtGetRoutes) {
            window.sigApi.eventMediator.subscribe(
                evtGetRoutes,
                () => {
                    this._onGetRoutes();
                }
            );
        }
        const evtGetCurrentRoute = window.sigApi.events.getUserDefinedInternalEvent('evtGetCurrentRoute');
        if (evtGetCurrentRoute) {
            window.sigApi.eventMediator.subscribe(
                evtGetCurrentRoute,
                () => {
                    this._onGetCurrentRoute();
                }
            );
        }
        const evtGetCurrentPath = window.sigApi.events.getUserDefinedInternalEvent('evtGetCurrentPath');
        if (evtGetCurrentPath) {
            window.sigApi.eventMediator.subscribe(
                evtGetCurrentPath,
                () => {
                    this._onGetCurrentPath();
                }
            );
        }
        const evtNavigate = window.sigApi.events.getUserDefinedInternalEvent('evtNavigate');
        if (evtNavigate) {
            window.sigApi.eventMediator.subscribe(
                evtNavigate,
                () => {
                    this._onNavigate();
                }
            );
        }
        const evtNavigateBack = window.sigApi.events.getUserDefinedInternalEvent('evtNavigateBack');
        if (evtNavigateBack) {
            window.sigApi.eventMediator.subscribe(
                evtNavigateBack,
                () => {
                    this._onNavigateBack();
                }
            );
        }
        const evtNavigateForward = window.sigApi.events.getUserDefinedInternalEvent('evtNavigateForward');
        if (evtNavigateForward) {
            window.sigApi.eventMediator.subscribe(
                evtNavigateForward,
                () => {
                    this._onNavigateForward();
                }
            );
        }
        const evtGetRouteByIndex = window.sigApi.events.getUserDefinedInternalEvent('evtGetRouteByIndex');
        if (evtGetRouteByIndex) {
            window.sigApi.eventMediator.subscribe(
                evtGetRouteByIndex,
                () => {
                    this._onGetRouteByIndex();
                }
            );
        }
        const evtSwitchToRoute = window.sigApi.events.getUserDefinedInternalEvent('evtSwitchToRoute')
        if (evtSwitchToRoute) {
            window.sigApi.eventMediator.subscribe(
                evtSwitchToRoute,
                () => {
                    this._onSwitchToRoute();
                }
            );
        }
        const evtGetSortedIndexList = window.sigApi.events.getUserDefinedInternalEvent('evtGetSortedIndexList');
        if (evtGetSortedIndexList) {
            window.sigApi.eventMediator.subscribe(
                evtGetSortedIndexList,
                () => {
                    this._onGetSortedIndexList();
                }
            );
        }
        const evtOverloadActiveScreen = window.sigApi.events.getUserDefinedInternalEvent('evtOverloadActiveScreen');
        if (evtOverloadActiveScreen) {
            window.sigApi.eventMediator.subscribe(
                evtOverloadActiveScreen,
                () => {
                    this._onOverloadActiveScreen();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getRoutes
     */
    _onGetRoutes() {
        console.log('[DemoApiAppRouter] _onGetRoutes()');
        const res = window.sigApi.appRouter.getRoutes();
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
        const res = window.sigApi.appRouter.getCurrentRoute();
        if (res) {
            console.log(`[DemoApiAppRouter] sigApi.appRouter.getCurrentRoute().getPath(): ${res.getPath()}`);
        }
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getCurrentPath
     */
    _onGetCurrentPath() {
        console.log('[DemoApiAppRouter] _onGetCurrentPath()');
        const res = window.sigApi.appRouter.getCurrentPath();
        console.log(`[DemoApiAppRouter] sigApi.appRouter.getCurrentPath(): ${res}`);
    }

    /**
     * @private
     * navigate via path
     */
    _onNavigate() {
        console.log('[DemoApiAppRouter] _onNavigate()');
        window.sigApi.appRouter.navigate(this.PATH);
    }

    /**
     * @private
     * navigate back
     */
    _onNavigateBack() {
        console.log('[DemoApiAppRouter] _onNavigateBack()');
        window.sigApi.appRouter.navigateBack();
    }

    /**
     * @private
     * navigate forward
     */
    _onNavigateForward() {
        console.log('[DemoApiAppRouter] _onNavigateForward()');
        window.sigApi.appRouter.navigateForward();
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getRouteByIndex
     */
    _onGetRouteByIndex() {
        console.log('[DemoApiAppRouter] _onGetRouteByIndex()');
        const index = 0;
        const res = window.sigApi.appRouter.getRouteByIndex(index);
        console.log(`[DemoApiAppRouter] sigApi.appRouter.getRouteByIndex(${index}).getPath(): ${res?.getPath()}`);
    }

    /**
     * @private
     * navigate via Route
     */
    _onSwitchToRoute() {
        console.log('[DemoApiAppRouter] _onSwitchToRoute()');
        const index = 0;
        const route = window.sigApi.appRouter.getRouteByIndex(index);
        (route) && window.sigApi.appRouter.switchToRoute(route);
    }

    /**
     * @private
     * log the result of sigApi.appRouter.getSortedIndexList
     */
    _onGetSortedIndexList() {
        console.log('[DemoApiAppRouter] _onGetSortedIndexList()');
        const res = window.sigApi.appRouter.getSortedIndexList();
        console.log('[DemoApiAppRouter] sigApi.appRouter.getSortedIndexList():', res);
    }

    /**
     * @private
     * overload active screen
     */
    _onOverloadActiveScreen() {
        console.log('[DemoApiAppRouter] _onOverloadActiveScreen()');
        const selectionGroup = undefined;
        const targetDatapointId = undefined;
        window.sigApi.appRouter.overloadActiveScreen(this.DATAPOINT_NAME, selectionGroup, targetDatapointId);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiAppRouter.init();
