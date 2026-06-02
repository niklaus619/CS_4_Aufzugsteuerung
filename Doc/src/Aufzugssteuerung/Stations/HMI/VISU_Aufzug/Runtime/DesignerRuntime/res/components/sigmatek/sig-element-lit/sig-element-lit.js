import { LitElement } from '../../../../rt/node_modules/lit-element/lit-element.js';
import * as Lit from './sig-element-lit-html.js';
import { mixinManager } from '../sig-element-mixins/mixin-manager.js';
import { BaseMixin } from '../sig-element-mixins/base-mixin.js';
import './sig-element-lit-css.js';
export const SigLit = Lit;

const mixins = [
    BaseMixin,
    {
        mixin: 'DesignerSupport',
        rule: 'isdesignmode'
    }
];

export class LasalRuntimeSigElementLit extends mixinManager.mix(mixins, LitElement) {

    constructor() {
        super();
        this.rotation = 0;
        this.realrotation = 0;
        this.state = 1;
        this.checkbit = true;
    }

    static get is() {
        return 'sig-element-lit';
    }

    static get properties() {
        const props = {
            isdesignmode: {
                type: Boolean,
                reflect: true
            },
            rotation: {
                type: Number,
                reflect: true
            },
            realrotation: {
                type: Number,
                reflect: true
            },
            state: {
                type: Number
            },
            checkbit: {
                type: Boolean
            }
        };
        return props;
    }

    updateStyles(properties) {
        if (window.ShadyCSS) window.ShadyCSS.styleSubtree((this), properties);
    }

    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this._internalDefaultValuesApplied = true;
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('rotation')) this._rotateComponent(this.rotation, changedProperties.get('rotation'));
        if (changedProperties.has('state')) this._onStateChange(this.state, changedProperties.get('state'));
        if (changedProperties.has('checkbit')) this._onCheckbitChange(this.checkbit, changedProperties.get('checkbit'));
    }
}
customElements.define(LasalRuntimeSigElementLit.is, LasalRuntimeSigElementLit);