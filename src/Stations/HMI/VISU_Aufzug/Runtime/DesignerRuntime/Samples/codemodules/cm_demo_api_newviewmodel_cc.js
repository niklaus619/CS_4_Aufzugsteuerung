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

const DP_PREFIX = '0:Data0';
const MAX_CONTROLS = 10;

class DashboardModuleNewViewModelCC {
    /**
     * @returns {DashboardModuleNewViewModelCC}
     */
    static create() {
        return new DashboardModuleNewViewModelCC();
    }

    constructor() {
        this._initialized = false;
        this._active = false;

        this._vmBlueprintTemplate = {
            'name': undefined, // set name
            'controlId': 'sig-composite-container',
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
                    'value': '230px',
                    'src': sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    'dest': sigApi.SIG_CONST.PROP_DEST_CSS
                },
                'sigcompositectrl': {
                    'value': 0, // composite control id
                    'src': sigApi.SIG_CONST.PROP_SRC_COMPOSITE_CONTROL,
                    'dest': sigApi.SIG_CONST.PROP_DEST_COMPOSITE_CONTROL
                },
                'sigoverloadcontent': {
                    'value': undefined, // set dpId (dp class)
                    "src": sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    "dest": sigApi.SIG_CONST.PROP_DEST_STATIC_OVERLOAD
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
                    vmBlueprint.props['sigoverloadcontent'].value = dpId;
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
window.registerDashboardModule('Dashboard0', DashboardModuleNewViewModelCC.create);
