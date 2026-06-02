// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.vm.newViewModel to append a control to a dashboard
 * 
 * demo setup:
 *   required dashboard (by name)
 *     * 'Dashboard0'
 *   required user defined internal events
 *     * 'addControl'
 *     * 'removeControl'
 *   required datapoints (by name)
 *     * '0:Data00.Server0'
 *     * '0:Data00.Server1'
 *     * '0:Data00.Server2'
 *     * '0:Data00.Server3'
 *     * '0:Data00.Server4'
 *     * '0:Data00.Server5'
 *     * '0:Data00.Server6'
 *     * '0:Data00.Server7'
 *     * '0:Data00.Server8'
 *     * '0:Data00.Server9'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DashboardModuleNewViewModel implements SigApi.ViewModelCodeModule {
    readonly DP_PREFIX = '0:Data00.Server';
    readonly MAX_CONTROLS = 10;
    /**
     * @returns {DashboardModuleNewViewModel}
     */
    static create(): DashboardModuleNewViewModel {
        return new DashboardModuleNewViewModel();
    }

    _initialized: boolean
    _active: boolean
    _vmBlueprintTemplate: object
    _controlList: SigApi.ViewModel[]
    _addControlGuard: boolean
    _viewModel: SigApi.ViewModel
    constructor() {
        this._initialized = false;
        this._active = false;

        this._vmBlueprintTemplate = {
            'name': undefined, // set name
            'controlId': 'sig-control-input',
            'props': {
                '--theme-sig-element-left': {
                    'value': '200px',
                    'src': window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_CSS
                },
                '--theme-sig-element-top': {
                    'value': undefined, // set control position
                    'src': window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_CSS
                },
                '--theme-sig-element-height': {
                    'value': '20px',
                    'src': window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_CSS
                },
                '--theme-sig-element-width': {
                    'value': '80px',
                    'src': window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_CSS
                },
                'value': {
                    'value': undefined, // set dpId
                    'src': window.sigApi.SIG_CONST.PROP_SRC_DATAPOINT,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_VARIABLE
                }
            }
        };
        this._controlList = [];
        this._addControlGuard = false;
    }

    /**
     * @param {object} vmBlueprint 
     */
    _createViewModel(vmBlueprint: any) {
        const vm = window.sigApi.vm.newViewModel(vmBlueprint);
        this._controlList.push(vm);
        this._viewModel.addChild(vm);
        /**
         * @param {HTMLElement} child
         */
        const appendChildToParentDomRefCallback = (child: HTMLElement) => {
            const domRef = this._viewModel.getDomRef();
            if (domRef) {
                domRef.appendChild(child);
            }
        };
        vm.show(appendChildToParentDomRefCallback);
    }

    /**
     * @param {ViewModel} vm 
     */
    _destroyViewModel(vm: SigApi.ViewModel) {
        /**
         * @param {HTMLElement} child
         */
        const removeChildFromParentDomRefCallback = (child: HTMLElement) => {
            const parent = vm.getParent();
            if (parent) {
                const parentDomRef = parent.getDomRef();
                if (parentDomRef) {
                    parentDomRef.removeChild(child);
                }
            }
        };
        const destroyVmInstance = true;
        vm.destroy(removeChildFromParentDomRefCallback, destroyVmInstance);
    }

    /**
     * @private
     * register to user defined events
     */
    _registerEvents() {
        const addControl = window.sigApi.events.getUserDefinedInternalEvent('addControl');
        if (addControl) {
            window.sigApi.sigUtils.addEventListener(this,
                addControl,
                () => {
                    if (!this._initialized) return;
                    if (!this._active) return;
                    if (this._addControlGuard) return;
                    const index = this._controlList.length;
                    if (index >= this.MAX_CONTROLS) return;
                    this._addControlGuard = true;
                    window.sigApi.datapointManager.getIdFromName(`${this.DP_PREFIX}${index}`).then(([dpId]) => {
                        const vmBlueprint = window.sigApi.sigUtils.copyObject(this._vmBlueprintTemplate);
                        vmBlueprint.name = `newControl${index}`;
                        vmBlueprint.props['--theme-sig-element-top'].value = `${10 + 25 * index}px`;
                        vmBlueprint.props['value'].value = dpId;
                        this._createViewModel(vmBlueprint);
                    }).finally(() => {
                        this._addControlGuard = false;
                    });
                }, 'runtimeUserEvent'
            );
        }
        const removeControl = window.sigApi.events.getUserDefinedInternalEvent('removeControl');
        if (removeControl) {
            window.sigApi.sigUtils.addEventListener(this,
                removeControl,
                () => {
                    if (!this._initialized) return;
                    if (!this._active) return;
                    if (this._controlList.length === 0) return;
                    const vm = this._controlList.pop();
                    if (!vm) return;
                    this._destroyViewModel(vm);
                }, 'runtimeUserEvent'
            );
        }
    }

    /**
     * @param {ViewModel} viewModel 
     */
    init(viewModel: SigApi.ViewModel) {
        this._viewModel = viewModel;
        this._registerEvents();
        this._initialized = true;
    }

    /**
     * @param {ViewModel} viewModel 
     */
    cleanUp(viewModel: SigApi.ViewModel) {
        window.sigApi.sigUtils.removeAllEventListeners(this);
        this._initialized = false;
        while (this._controlList.length > 0) {
            const vm = this._controlList.pop();
            if (!vm) return;
            this._destroyViewModel(vm);
        }
    }

    /**
     * @param {boolean} active 
     */
    onActiveChanged(active: boolean) {
        this._active = active;
    }

}

// Register the DashboardModule for a dashboard
window.registerDashboardModule('Dashboard0', DashboardModuleNewViewModel.create);
