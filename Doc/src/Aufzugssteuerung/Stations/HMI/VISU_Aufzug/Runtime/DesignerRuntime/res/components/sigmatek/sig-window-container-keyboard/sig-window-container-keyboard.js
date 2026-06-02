import { LasalRuntimeSigWindowContainer } from '../sig-window-container/sig-window-container.js';

class LasalRuntimeSigWindowContainerKeyboard extends LasalRuntimeSigWindowContainer {

    static get is() {
        return 'sig-window-container-keyboard';
    }

    constructor() {
        super();
        this.theme = 'keyboard';
        this.controlButtons = `<button class="jsPanel-btn jsPanel-btn-close jsPanel-btn-md" aria-label="Close">${this.defaultIcons.close}</button> `;
    }
}
customElements.define(LasalRuntimeSigWindowContainerKeyboard.is, LasalRuntimeSigWindowContainerKeyboard);