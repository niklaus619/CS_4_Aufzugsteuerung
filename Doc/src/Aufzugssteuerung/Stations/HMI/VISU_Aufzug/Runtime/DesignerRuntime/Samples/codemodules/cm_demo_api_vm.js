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

const CONTROL_VM = 'lvd469a848765b542ca89b55b2ea23ebe48';
const COMPOSITE_CONTAINER_VM = 'lvd0a1f19dfe3fe438987b753a60b256502';

class DemoApiVm {
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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetVmById'),
            () => {
                this._onGetVmById();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtGetVmByName'),
            () => {
                this._onGetVmByName();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddRenderCallback'),
            () => {
                this._onAddRenderCallback();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.vm.getVmById
     */
    _onGetVmById() {
        console.log('[DemoApiVm] _onGetVmById()');
        const instanceId = CONTROL_VM;
        const res = sigApi.vm.getVmById(instanceId);
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
        const container = sigApi.vm.getVmById(COMPOSITE_CONTAINER_VM);
        // find by name inside container
        const name = 'Input0';
        const res = sigApi.vm.getVmByName(name, container);
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
        const vm = sigApi.vm.getVmById(COMPOSITE_CONTAINER_VM);
        if (!vm) return;
        sigApi.vm.addRenderCallback(vm.getDomRef(),
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
