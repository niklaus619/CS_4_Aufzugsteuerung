import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class LasalRuntimeWrapperElement extends LasalRuntimeSigElement {
    static get is() {
        return "sig-wrapper";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <style>
                :host {
                    display: block;
                    overflow: visible;
                    background-color: transparent;
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 100%;
                }
            </style>
            <slot></slot>
        `;
    }
}
customElements.define(LasalRuntimeWrapperElement.is, LasalRuntimeWrapperElement);