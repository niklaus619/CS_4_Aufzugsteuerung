import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import { Handles } from './sig-designer-handles-mixin.js';

class LasalRuntimeSigDesignerHandleGhost extends Handles(LasalRuntimeSigElement) {
    static get is() {
        return "sig-designer-ghost";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                
                position: absolute;
                border: 1px solid var(--theme-sig-designer-handle-ghost-border-color, #209DE5);
                background-color: var(--theme-sig-designer-handle-ghost-background-color, transparent);
                overflow: visible !important;
                z-index: 10000;
                display: block;
            }

            :host([hidden]) {
                display: none;
            }
        </style>
        `
    }

    static get properties() {
        let props = {
            hidden: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
                observer: '_toggleHidden'
            }
        }
        return props;
    }

    constructor() {
        super();
        this.parent = null;
        this.parentBoundingClientRect = null;
    }

    connectedCallback() {
        super.connectedCallback();
    }

    _toggleHidden(newval, oldval) {
        if (oldval !== undefined) {
            if (!newval)
                this._fit();
        }
    }

    _fit() {
        if (this.parent instanceof HTMLElement) {
            const bounds = this.getControlBounds(this.parent);
            this._setBounds(bounds.top, bounds.left, bounds.height, bounds.width, bounds.rotation);
        }
    }

    _getDesignerTool() {
        return null;
    }

}
customElements.define(LasalRuntimeSigDesignerHandleGhost.is, LasalRuntimeSigDesignerHandleGhost);
