// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.vm
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetVmById'
 *     * 'evtGetVmByName'
 *     * 'evtAddRenderCallback'
 * 
 *   required control (by instanceId)
 *     * 'lvd469a848765b542ca89b55b2ea23ebe48'
 *     * 'lvd0a1f19dfe3fe438987b753a60b256502' 'sig-composite-container' containing a 'sig-control-input' with name 'Input0'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DemoApiVm {
    readonly CONTROL_VM = 'lvd469a848765b542ca89b55b2ea23ebe48';
    readonly COMPOSITE_CONTAINER_VM = 'lvd0a1f19dfe3fe438987b753a60b256502';
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiVm();
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
        const evtGetVmById = window.sigApi.events.getUserDefinedInternalEvent('evtGetVmById');
        if (evtGetVmById) {
            window.sigApi.eventMediator.subscribe(
                evtGetVmById,
                () => {
                    this._onGetVmById();
                }
            );
        }
        const evtGetVmByName = window.sigApi.events.getUserDefinedInternalEvent('evtGetVmByName');
        if (evtGetVmByName) {
            window.sigApi.eventMediator.subscribe(
                evtGetVmByName,
                () => {
                    this._onGetVmByName();
                }
            );
        }
        const evtAddRenderCallback = window.sigApi.events.getUserDefinedInternalEvent('evtAddRenderCallback');
        if (evtAddRenderCallback) {
            window.sigApi.eventMediator.subscribe(
                evtAddRenderCallback,
                () => {
                    this._onAddRenderCallback();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.vm.getVmById
     */
    _onGetVmById() {
        console.log('[DemoApiVm] _onGetVmById()');
        const instanceId = this.CONTROL_VM;
        const res = window.sigApi.vm.getVmById(instanceId);
        console.log(`[DemoApiVm] sigApi.vm.getVmById('${instanceId}')`);
        console.dir(res);
    }

    /**
     * @private
     * log the result of sigApi.vm.getVmByName
     */
    _onGetVmByName() {
        console.log('[DemoApiVm] _onGetVmByName()');
        // the parent of a control (default: appViewModel)
        const container = window.sigApi.vm.getVmById(this.COMPOSITE_CONTAINER_VM);
        // find by name inside container
        const name = 'Input0';
        const res = window.sigApi.vm.getVmByName(name, (container) ? container : undefined);
        if (!res) {
            console.log(`[DemoApiVm] sigApi.vm.getVmByName('${name}', ...) ${res}`);
            return;
        }
        console.log(`[DemoApiVm] sigApi.vm.getVmByName('${name}', ...) id: ${res.getInstanceId()}`);
    }

    /**
     * @private
     * log the result of sigApi.vm.addRenderCallback
     */
    _onAddRenderCallback() {
        console.log('[DemoApiVm] _addRenderCallback()');
        const vm = window.sigApi.vm.getVmById(this.COMPOSITE_CONTAINER_VM);
        if (!vm) return;
        const domRef = vm.getDomRef();
        if (!domRef) return;
        window.sigApi.vm.addRenderCallback(domRef,
            () => { // callback
                console.log('[DemoApiVm] sigApi.vm.addRenderCallback(...) callback');
            },
            () => { // errorCallback
                console.log('[DemoApiVm] sigApi.vm.addRenderCallback(...) errorCallback');
            }, 10
        );
    }

}

/**
 * Create the codemodule instance
 */
DemoApiVm.init();
