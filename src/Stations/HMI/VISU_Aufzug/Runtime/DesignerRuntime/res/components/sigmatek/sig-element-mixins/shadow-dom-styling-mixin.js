import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';

export const ShadowDomStylingMixin = dedupingMixin((superClass) => {

    const baseElement = superClass.__baseElement;
    return class extends superClass {

        constructor() {
            super();
            this.shadowDomElementsMap = new Map();
            this.shadowDomVmId = '';
            this.shadowdomstyleclassapplied = false;
        }

        static get properties() {
            switch (baseElement) {
                case 'LitElement':
                    return {
                        shadowdomstyleclassapplied: {
                            type: Boolean,
                            reflect: true
                        }
                    };
                case 'PolymerElement':
                default:
                    return {
                        shadowdomstyleclassapplied: {
                            type: Boolean,
                            value: false,
                            reflectToAttribute: true
                        }
                    };
            }
        }


        sigApplyShadowDomStyleClass(selector, className, remove = false, parameters = {}) {
            if (!selector && !className) {
                this._log('[sigApplyShadowDomStyleClass] Selector or classname missing', 'ERROR');
                return false;
            }
            try {
                customElements.whenDefined(this.localName).then(() => {
                    const hasDomIf = (this.shadowRoot && this.shadowRoot.querySelectorAll('dom-if').length > 0) ? true : false;
                    this.shadowDomElementsMap.set(selector, { className: className, remove: remove, parameters: parameters });
                    if (hasDomIf && !this.shadowDomApplyClassHandlerBound) {
                        window.sigApi.sigUtils.addEventListener(this, 'dom-change', () => {
                            this._applyshadowDomElementsMap(true);
                        }, 'jsEvent', this);
                        this.shadowDomApplyClassHandlerBound = true;
                    }
                    return this._applyshadowDomElementsMap();
                });
            } catch (error) {
                this._log(error, 'ERROR');
                return false;
            }
        }

        _applyshadowDomElementsMap(calledByEvent) {
            if (!window.sigApi.defaultStyleManager) {
                this._log('[sigApplyShadowDomStyleClass] defaultStyleManager API not found!', 'ERROR');
                return false;
            }
            try {
                this.shadowDomElementsMap.forEach((classObj, selector) => {
                    const className = classObj.className;
                    const remove = classObj.remove;
                    const parameters = classObj.parameters;
                    if (remove) {
                        let components;
                        if (this.isdesignmode) components = this.shadowRoot ? this.shadowRoot.querySelectorAll(selector) : null;
                        else components = this.shadowRoot ? this.shadowRoot.querySelectorAll(selector + '[shadowdomstyleclassapplied]') : null;

                        if (components && components.length > 0) {
                            if (typeof window.sigApi.defaultStyleManager.removeStylingByClassName === 'function') {
                                const removed = window.sigApi.defaultStyleManager.removeStylingByClassName(
                                    this.id,
                                    components,
                                    className,
                                    parameters.include,
                                    parameters.exclude,
                                    parameters.disableRuntimeUpdates);
                                if (removed) {
                                    components.forEach((component) => {
                                        component.shadowdomstyleclassapplied = false;
                                    });
                                }
                                this.shadowDomElementsMap.delete(selector);
                                return removed;
                            } else {
                                this._log('removeStylingByClassName() not found!', 'ERROR');
                                return false;
                            }
                        }
                    } else {
                        let components;
                        if (this.isdesignmode) components = this.shadowRoot ? this.shadowRoot.querySelectorAll(selector) : null;
                        else components = this.shadowRoot ? this.shadowRoot.querySelectorAll(selector + ':not([shadowdomstyleclassapplied])') : null;

                        if (components && components.length > 0) {
                            if (typeof window.sigApi.defaultStyleManager.setStylingByClassName === 'function') {
                                const applied = window.sigApi.defaultStyleManager.setStylingByClassName(
                                    this.shadowDomVmId ? this.shadowDomVmId : this.id,
                                    components,
                                    className,
                                    parameters.include,
                                    parameters.exclude,
                                    parameters.disableRuntimeUpdates);
                                if (applied) {
                                    components.forEach((component) => {
                                        component.shadowdomstyleclassapplied = true;
                                    });
                                }
                                return applied;
                            } else {
                                this._log('setStylingByClassName() not found!', 'ERROR');
                                return false;
                            }
                        }
                    }
                });
            } catch (error) {
                this._log(error, 'ERROR');
                return false;
            }
        }


    };
});
ShadowDomStylingMixin.mixinName = 'ShadowDomStylingMixin';

