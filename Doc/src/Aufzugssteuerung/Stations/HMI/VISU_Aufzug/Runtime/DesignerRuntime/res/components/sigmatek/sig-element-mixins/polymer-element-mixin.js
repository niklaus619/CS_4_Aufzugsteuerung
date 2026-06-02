import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';
export const PolymerElementMixin = dedupingMixin((superClass) => {
    return class extends superClass {

        constructor() {
            super();
            this.notifyOnAllUpdateTypes = false;
            this.notifyOnInternalDefaultValueUpdate = false;
            this.notifyOnRuntimeValueUpdate = false;
            this.notifyOnValueUpdatesInShadowDom = false;
        }

        static get properties() {
            const props = {
                isdesignmode: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                },
                rotation: {
                    type: Number,
                    value: 0,
                    reflectToAttribute: true,
                    observer: '_rotateComponent'
                },
                realrotation: {
                    type: Number,
                    value: 0,
                    reflectToAttribute: true
                },
                state: {
                    type: Number,
                    value: 1,
                    observer: '_onStateChange'
                },
                checkbit: {
                    type: Boolean,
                    value: true,
                    observer: '_onCheckbitChange'
                }
            };
            return props;
        }

        ready() {
            super.ready();
            this._internalDefaultValuesApplied = true;
        }

        shouldPropertyDispatchNotify(property, value) {
            if (this.isdesignmode) return false;
            if (!this.notifyOnAllUpdateTypes) {
                if (this.isInShadowDom() && !this.getParentHostElement().notifyOnValueUpdatesInShadowDom) return false;
                if (!this._internalDefaultValuesApplied) return this.notifyOnInternalDefaultValueUpdate;
                if (this._isRuntimeValueUpdate && property === this._pendingUpdatePropertyName) return this.notifyOnRuntimeValueUpdate;
            }
            return true;
        }

        sigSetForceUpdateForProperty(property) {
            if (Array.isArray(this.arrForceUpdateProps)) {
                this.arrForceUpdateProps.push(property);
            } else {
                this.arrForceUpdateProps = [property];
            }
        }

        sigShouldPropertyUpdate(property, originalResult, value, old) {
            return originalResult === true ||
                (this._isRuntimeValueUpdate === false || (this._isRuntimeValueUpdate === true && property !== this._pendingUpdatePropertyName)) &&
                Array.isArray(this.arrForceUpdateProps) && this.arrForceUpdateProps.includes(property);
        }

        _shouldPropertyChange(property, value, old) {
            const result = super._shouldPropertyChange(property, value, old);
            return this.sigShouldPropertyUpdate(property, result, value, old);
        }
    };
});
PolymerElementMixin.mixinName = 'PolymerElementMixin';