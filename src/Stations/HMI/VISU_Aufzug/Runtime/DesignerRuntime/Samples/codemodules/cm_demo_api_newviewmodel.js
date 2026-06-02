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

const DP_PREFIX = '0:Data00.Server';
const MAX_CONTROLS = 10;

class DashboardModuleNewViewModel {
    /**
     * @returns {DashboardModuleNewViewModel}
     */
    static create() {
        return new DashboardModuleNewViewModel();
    }

    constructor() {
        this._initialized = false;
        this._active = false;

        this._vmBlueprintTemplate = {
            'name': undefined, // set name
            'controlId': 'sig-control-input',
            'props': {
                '--theme-sig-element-left': {
                    'value': '200px',
                    'src': sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': sigApi.SIG_CONST.PROP_DEST_CSS
                },
                '--theme-sig-element-top': {
                    'value': undefined, // set control position
                    'src': sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': sigApi.SIG_CONST.PROP_DEST_CSS
                },
                '--theme-sig-element-height': {
                    'value': '20px',
                    'src': sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': sigApi.SIG_CONST.PROP_DEST_CSS
                },
                '--theme-sig-element-width': {
                    'value': '80px',
                    'src': sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': sigApi.SIG_CONST.PROP_DEST_CSS
                },
                'value': {
                    'value': undefined, // set dpId
                    'src': sigApi.SIG_CONST.PROP_SRC_DATAPOINT,
                    'dest': sigApi.SIG_CONST.PROP_DEST_VARIABLE
                }
            }
        };
        this._controlList = [];
        this._addControlGuard = false;
    }

    /**
     * @param {object} vmBlueprint 
     */
    _createViewModel(vmBlueprint) {
        const vm = sigApi.vm.newViewModel(vmBlueprint);
        this._controlList.push(vm);
        this._viewModel.addChild(vm);
        /**
         * @param {HTMLElement} child
         */
        const appendChildToParentDomRefCallback = (child) => {
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
        const removeChildFromParentDomRefCallback = (child) => {
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
        sigApi.sigUtils.addEventListener(this,
            sigApi.events.getUserDefinedInternalEvent('addControl'),
            () => {
                if (!this._initialized) return;
                if (!this._active) return;
                if (this._addControlGuard) return;
                const index = this._controlList.length;
                if (index >= MAX_CONTROLS) return;
                this._addControlGuard = true;
                sigApi.datapointManager.getIdFromName(`${DP_PREFIX}${index}`).then(([dpId]) => {
                    const vmBlueprint = sigApi.sigUtils.copyObject(this._vmBlueprintTemplate);
                    vmBlueprint.name = `newControl${index}`;
                    vmBlueprint.props['--theme-sig-element-top'].value = `${10 + 25 * index}px`;
                    vmBlueprint.props['value'].value = dpId;
                    this._createViewModel(vmBlueprint);
                }).finally(() => {
                    this._addControlGuard = false;
                });
            }, 'runtimeUserEvent'
        );

        sigApi.sigUtils.addEventListener(this,
            sigApi.events.getUserDefinedInternalEvent('removeControl'),
            () => {
                if (!this._initialized) return;
                if (!this._active) return;
                if (this._controlList.length === 0) return;
                const vm = this._controlList.pop();
                this._destroyViewModel(vm);
            }, 'runtimeUserEvent'
        );
    }

    /**
     * @param {ViewModel} viewModel 
     */
    init(viewModel) {
        this._viewModel = viewModel;
        this._registerEvents();
        this._initialized = true;
    }

    /**
     * @param {ViewModel} viewModel 
     */
    cleanUp(viewModel) {
        sigApi.sigUtils.removeAllEventListeners(this);
        this._initialized = false;
        while (this._controlList.length > 0) {
            const vm = this._controlList.pop();
            this._destroyViewModel(vm);
        }
    }

    /**
     * @param {boolean} active 
     */
    onActiveChanged(active) {
        this._active = active;
    }

}

// Register the DashboardModule for a dashboard
window.registerDashboardModule('Dashboard0', DashboardModuleNewViewModel.create);
