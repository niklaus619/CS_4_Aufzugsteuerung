import { PolymerElement } from '../../../../rt/node_modules/@polymer/polymer/polymer-element.js';
import * as Polymer from './sig-element-polymer.js';
import { DragDropSupportElm } from '../sig-element-mixins/drag-drop-support-mixin.js';
import { mixinManager } from '../sig-element-mixins/mixin-manager.js';
import { BaseMixin } from '../sig-element-mixins/base-mixin.js';
import { GestureEventListeners } from '../sig-element-mixins/gestures-support-mixin.js';
import { UtilsMixin } from '../sig-element-mixins/utils-mixin.js';
import { PolymerElementMixin } from '../sig-element-mixins/polymer-element-mixin.js';
import { BrowserDetectionMixin } from '../sig-element-mixins/browser-detection-mixin.js';
import { ShadowDomStylingMixin } from '../sig-element-mixins/shadow-dom-styling-mixin.js';

import '../../../../rt/node_modules/@webcomponents/shadycss/entrypoints/apply-shim.js';
import '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-if.js';
import '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import './sig-element-css.js';

export const SigPolymer = Polymer;

const mixins = [
    BaseMixin, 
    PolymerElementMixin,
    UtilsMixin,
    DragDropSupportElm,
    GestureEventListeners,
    BrowserDetectionMixin,
    ShadowDomStylingMixin,
    {
        mixin: 'DesignerSupport',
        rule: 'isdesignmode'
    }
];


export class LasalRuntimeSigElement extends mixinManager.mix(mixins, PolymerElement) {

    static get is() {
        return 'sig-element';
    }
}
customElements.define(LasalRuntimeSigElement.is, LasalRuntimeSigElement);