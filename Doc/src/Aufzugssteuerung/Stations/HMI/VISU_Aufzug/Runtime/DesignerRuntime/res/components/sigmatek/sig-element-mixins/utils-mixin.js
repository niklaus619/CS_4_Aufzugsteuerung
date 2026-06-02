import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';

export const UtilsMixin = dedupingMixin((superClass) => {
    return class extends superClass {

        constructor() {
            super();
            this.utilsApi = (window.sigApi) ? window.sigApi.sigUtils : undefined;
        }

        sigAddEventListener(event, handler, type = 'jsEvent', target = this, options = {}) {
            return (this.utilsApi) ? this.utilsApi.addEventListener(this, event, handler, type, target, options) : false;
        }

        sigRemoveEventListener(event, handler, type = 'jsEvent', target = this, options = {}) {
            return (this.utilsApi) ? this.utilsApi.removeEventListener(this, event, handler, type, target, options) : false;
        }

        sigRemoveAllEventListeners() {
            return (this.utilsApi) ? this.utilsApi.removeAllEventListeners(this) : false;
        }

        sigSetInterval(handler, interval = 0) {
            return (this.utilsApi) ? this.utilsApi.setInterval(this, handler, interval) : null;
        }

        sigClearInterval(intervalID) {
            return (this.utilsApi) ? this.utilsApi.clearInterval(this, intervalID) : false;
        }

        sigClearAllIntervals() {
            return (this.utilsApi) ? this.utilsApi.clearAllIntervals(this) : false;
        }

        sigSetTimeout(handler, delay = 0) {
            return (this.utilsApi) ? this.utilsApi.setTimeout(this, handler, delay) : null;
        }

        sigClearTimeout(timeoutID) {
            return (this.utilsApi) ? this.utilsApi.clearTimeout(this, timeoutID) : false;
        }

        sigClearAllTimeouts() {
            return (this.utilsApi) ? this.utilsApi.clearAllTimeouts(this) : false;
        }

        sigRegisterPromise(promise, resolveFcn, rejectFcn) {
            return (this.utilsApi) ? this.utilsApi.registerPromise(this, promise, resolveFcn, rejectFcn) : false;
        }

        sigRejectAllPendingPromises() {
            return (this.utilsApi) ? this.utilsApi.rejectAllPendingPromises(this) : false;
        }

        sigClearAll() {
            return (this.utilsApi) ? this.utilsApi.clearAll(this) : false;
        }

    };
});
UtilsMixin.mixinName = 'UtilsMixin';