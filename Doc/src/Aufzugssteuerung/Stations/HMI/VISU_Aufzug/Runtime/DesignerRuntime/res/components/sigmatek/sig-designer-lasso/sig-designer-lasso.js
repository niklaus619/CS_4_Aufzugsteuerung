import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class SigLassoElement extends LasalRuntimeSigElement {
    static get is() {
        return 'sig-designer-lasso';
    }

    static get importMeta() {
        return import.meta;
    }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
                :host {
                    position:absolute;
                    top:0;
                    left:0;
                    width:0;
                    height:0;
                    padding: 0;
                    margin: 0;
                    border: 1px solid var(--theme-sig-designer-lasso-border-color, #64F5A0);
                    background-color: var(--theme-sig-designer-lasso-background-color, rgba(100,245,160,.3));
                    z-index: 100100;
                }
                #container {
                    position: relative;
                    top:0;
                    width: 0;
                    width: 100%;
                    height: 100%;
                    padding:0;
                    margin: 0;
                }
                #handle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    border-color: var(--theme-sig-designer-lasso-handle-border-color, black);
                    border-style: solid;
                }
                #handle.ne {
                    top: 0;
                    right: 0;
                    margin: -1px -1px 0 0;
                    border-width: 3px 3px 0 0;
                }
                #handle.se {
                    bottom :0;
                    right: 0;
                    margin: 0 -1px -1px 0;
                    border-width: 0 3px 3px 0;
                }
                #handle.sw {
                    bottom: 0;
                    left: 0;
                    margin: 0 0 -1px -1px;
                    border-width: 0 0 3px 3px;
                }
                #handle.nw {
                    top:0;
                    left: 0;
                    margin: -1px 0 0 -1px;
                    border-width: 3px 0 0 3px;
                }
                :host([hidden]) {
                    display:none;
                }
            </style>
            <div id="container">
                <div id="handle" class="se"></div>
            </div>
        `;
    }

    static get properties() {
        const props = {
            hidden: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
        return props;
    }

    constructor() {
        super();
        this.coreEvent = null;
        this.coreEventHandler = null;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('coreevent', (e) => {
            this._handleCoreEvent(e);
        }, false);
        this._init();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeEvents();
    }

    _subscribeEvents() {
        if (this.coreEventHandler === null) {
            this.coreEventHandler = (e) => {
                this._handleCoreEvent(e);
            };
        }
        if (this.coreEvent === null) {
            this.coreEvent = sigApi.designer.getCoreEventInstance();
            this.coreEvent.subscribe(this.coreEventHandler);
        }
    }

    _unsubscribeEvents() {
        this.coreEvent.unsubscribe(this.coreEventHandler);
    }

    _init() {
        this.style.cssText = 'top:0; left:0; width:0; height:0;';
        this.hidden = true;
    }

    reset() {
        this._init();
    }

    setPosition(posX = 0, posY = 0) {
        this.style.left = posX + 'px';
        this.style.top = posY + 'px';
    }

    resizeTo(width = 0, height = 0, posX = 0, posY = 0) {

        if (width < 0) {
            this.style.left = posX + width + 'px';
            this.style.width = Math.abs(width) + 'px';
        } else {
            this.style.left = posX + 'px';
            this.style.width = width + 'px';
        }

        if (height < 0) {
            this.style.top = posY + height + 'px';
            this.style.height = Math.abs(height) + 'px';
        } else {
            this.style.top = posY + 'px';
            this.style.height = height + 'px';
        }

        if (width > 0 && height < 0) {
            this.$.handle.className = 'ne';
        } else if (width > 0 && height > 0) {
            this.$.handle.className = 'se';
        } else if (width < 0 && height > 0) {
            this.$.handle.className = 'sw';
        } else if (width < 0 && height < 0) {
            this.$.handle.className = 'nw';
        }

    }

    _handleCoreEvent(e) {
        const type = e.detail.type;
        const source = e.detail.source;
        const target = e.detail.target;
        const data = e.detail.data;
        const sourceEvent = e.detail.sourceEvent;

        let altKey = false;
        let ctrlKey = false;
        let shiftKey = false;
        let isTarget = false;

        if (sourceEvent !== null) {
            altKey = sourceEvent.altKey;
            shiftKey = sourceEvent.shiftKey;
            ctrlKey = sourceEvent.ctrlKey;
        }

        if (target !== null) {
            if (target.id === this.id) {
                isTarget = true;
            }
        }

        switch (type) {
            case 'lassostart':
                if (this.hidden && isTarget) {
                    this.setPosition(data.posX, data.posY);
                    this.hidden = false;
                }
                break;
            case 'lassomove':
                if (!this.hidden && isTarget) {
                    this.resizeTo(data.width, data.height, data.posX, data.posY);
                }
                break;
            case 'lassostop':
                if (!this.hidden && isTarget) {
                    this.reset();
                }
                break;

            case 'lassocancel':
                if (!this.hidden && isTarget) {
                    this.reset();
                }
                break;
        }
    }
}
customElements.define(SigLassoElement.is, SigLassoElement);