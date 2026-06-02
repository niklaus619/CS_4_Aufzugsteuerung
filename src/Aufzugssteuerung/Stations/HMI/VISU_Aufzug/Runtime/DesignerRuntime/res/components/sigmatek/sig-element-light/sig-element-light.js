import { PolymerElement } from '../../../../rt/node_modules/@polymer/polymer/polymer-element.js';
import * as Polymer from '../sig-element/sig-element-polymer.js';
import { mixinManager } from '../sig-element-mixins/mixin-manager.js';
import { BaseMixin } from '../sig-element-mixins/base-mixin.js';
import { PolymerElementMixin } from '../sig-element-mixins/polymer-element-mixin.js';
import './sig-element-light-css.js';
export const SigPolymer = Polymer;

const mixins = [
    BaseMixin,
    PolymerElementMixin,
    {
        mixin: 'DesignerSupport',
        rule: 'isdesignmode'
    }
];

export class LasalRuntimeSigElementLight extends mixinManager.mix(mixins, PolymerElement) {

    static get is() {
        return 'sig-element-light';
    }

}
customElements.define(LasalRuntimeSigElementLight.is, LasalRuntimeSigElementLight);