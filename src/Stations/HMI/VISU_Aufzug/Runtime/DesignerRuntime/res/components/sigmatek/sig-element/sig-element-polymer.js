export { html } from '../../../../rt/node_modules/@polymer/polymer/polymer-element.js';
import { afterNextRender as origAfterNextRender } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/render-status.js';
import { beforeNextRender as origBeforeNextRender } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/render-status.js';
export { timeOut } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/debounce.js';
export const debouncer = Debouncer;

import * as StyleGather from '../../../../rt/node_modules/@polymer/polymer/lib/utils/style-gather.js';
export const styleGather = StyleGather;

export const afterNextRender = (context, callback, args) => {
    origAfterNextRender(context, (...theArgs) => {
        if (context && context.disconnected === false && typeof callback === 'function')
            callback.apply(context, theArgs);
    }, args);
};

export const beforeNextRender = (context, callback, args) => {
    if (context && context.disconnected === false && typeof callback === 'function') {
        origBeforeNextRender(context, (...theArgs) => {
            if (context && context.disconnected === false && typeof callback === 'function')
                callback.apply(context, theArgs);
        }, args);
    }
};

export * from '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-module.js';
export * from '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-if.js';
export * from '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-bind.js';
export * from '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
export * from '../../../../rt/node_modules/@polymer/polymer/lib/elements/array-selector.js';
export * from '../../../../rt/node_modules/@polymer/polymer/lib/elements/custom-style.js';