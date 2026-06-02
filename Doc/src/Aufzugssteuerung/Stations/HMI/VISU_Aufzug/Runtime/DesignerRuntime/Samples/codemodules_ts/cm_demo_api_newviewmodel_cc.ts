// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.vm.newViewModel to append a composite control
 * to a dashboard
 * 
 * demo setup:
 *   required dashboard (by name)
 *     * 'Dashboard0'
 *   required user defined internal events
 *     * 'addControl'
 *     * 'removeControl'
 *   required datapoint classes (by name)
 *     * '0:Data00'
 *     * '0:Data01'
 *     * '0:Data02'
 *     * '0:Data03'
 *     * '0:Data04'
 *     * '0:Data05'
 *     * '0:Data06'
 *     * '0:Data07'
 *     * '0:Data08'
 *     * '0:Data09'
 *   required composite control (by id)
 *     * 0
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DashboardModuleNewViewModelCC implements SigApi.ViewModelCodeModule {
    readonly DP_PREFIX = '0:Data0';
    readonly MAX_CONTROLS = 10;
    /**
     * @returns {DashboardModuleNewViewModelCC}
     */
    static create(): DashboardModuleNewViewModelCC {
        return new DashboardModuleNewViewModelCC();
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
            'controlId': 'sig-composite-container',
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
                    'value': '230px',
                    'src': window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_CSS
                },
                'sigcompositectrl': {
                    'value': 0, // composite control id
                    'src': window.sigApi.SIG_CONST.PROP_SRC_COMPOSITE_CONTROL,
                    'dest': window.sigApi.SIG_CONST.PROP_DEST_COMPOSITE_CONTROL
                },
                'sigoverloadcontent': {
                    'value': undefined, // set dpId (dp class)
                    "src": window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    "dest": window.sigApi.SIG_CONST.PROP_DEST_STATIC_OVERLOAD
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
    _destroyViewModel(vm) {
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
                        vmBlueprint.props['sigoverloadcontent'].value = dpId;
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
window.registerDashboardModule('Dashboard0', DashboardModuleNewViewModelCC.create);
