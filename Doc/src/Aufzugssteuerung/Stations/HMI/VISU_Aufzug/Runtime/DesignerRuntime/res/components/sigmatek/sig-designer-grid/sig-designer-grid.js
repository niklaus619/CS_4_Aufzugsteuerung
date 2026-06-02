import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class SigGridElement extends LasalRuntimeSigElement {
    static get is() {
        return "sig-designer-grid";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        
        <style>
            :host {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                padding: 0;
                margin: 0;
                background: transparent;
                z-index: 95;
            }

            :host([hidden]) {
                display: none;
            }

            .sig-designer-grid {
                height: 100%;
                width: 100%;
                zoom: 1;
            }

            .backfillpattern {
                fill: url(#pattern);
            }
        </style>
        <div class="sig-designer-grid" id="sigdesignergridsvg"></div>
        `;
    }

    static get properties() {
        let props = {
            hidden: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            enablesnap: {
                type: Boolean,
                value: false
            },
            displaygrid: {
                type: Boolean,
                value: false
            },
            linegrid: {
                type: Boolean,
                value: true
            },
            gridrasterx: {
                type: String,
                value: "10",
                reflectToAttribute: true
            },
            gridrastery: {
                type: String,
                value: "10",
                reflectToAttribute: true
            },
            gridcolor: {
                type: String,
                value: "#dcdcdc"
            },
            zoomfactor: {
                type: Number,
                value: 100
            }
        }
        return props;
    }

    constructor() {
        super();
        this.coreEvent = null;
        this.coreEventHandler = null;
        this.controlEvent = null;
        this.controlEventHandler = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._subscribeEvents();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeEvents();
    }
    ready() {
        super.ready();
    }

    _subscribeEvents() {
        if (this.coreEventHandler === null) {
            this.coreEventHandler = (e) => {
                this._handleCoreEvent(e);
            }
        }
        if (this.coreEvent === null) {
            this.coreEvent = sigApi.designer.getCoreEventInstance();
            this.coreEvent.subscribe(this.coreEventHandler);
        }
    }

    _handleCoreEvent(e) {
        const {
            type,
            source,
            target,
            data,
            sourceEvent
        } = e.detail;

        if (type === 'setgrid') {
            this._init(data);
        }

    }
    _unsubscribeEvents() {
        this.coreEvent.unsubscribe(this.coreEventHandler);
        this.controlEvent.unsubscribe(this.controlEventHandler);
    }

    _init(data) {
        this._log('Grid init');
        this._setRaster(data);
    }
    _setRaster(data) {
        if (data.gridrasterx !== undefined) this.gridrasterx = data.gridrasterx;
        if (data.gridrastery !== undefined) this.gridrastery = data.gridrastery;

        if (data.gridcolor !== undefined) this.gridcolor = data.gridcolor;
        if (data.displaygrid !== undefined) this.displaygrid = data.displaygrid;
        if (data.linegrid !== undefined) this.linegrid = data.linegrid;
        this.doSvgRaster();
    }

    doSvgRaster() {
        const _width = parseInt(this.gridrasterx, 10);
        const _height = parseInt(this.gridrastery, 10);
        const patternTransform = '';
        const _stroke = 1; 

        let svgPattern = '<pattern id="pattern" width="' + _width + '" height="' + _height + '" patternUnits="userSpaceOnUse" ' + patternTransform + '>';
        if (this.displaygrid === true && this.linegrid === false) svgPattern += '<rect width="' + _stroke + '" height="' + _stroke + '" fill="' + this.gridcolor + '"></rect>';
        else if (this.displaygrid === true && this.linegrid === true) svgPattern += '<path d="M 0 0 L ' + _width + ' 0 ' + _width + ' ' + _height + ' 0 ' + _height + ' z" stroke="' + this.gridcolor + '" stroke-width="' + _stroke + '" fill="transparent "></path>';
        svgPattern += '</pattern>';

        const option = '';
        const svg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" ' + option + '><defs id="svg-defs">' + svgPattern + '</defs><rect class="backfillpattern" height="100%" width="100%" y="0" x="0" stroke="transparent" /></svg>';
        this.$.sigdesignergridsvg.innerHTML = svg;
    }

    recalcRaster(_snap = null) {
        if (_snap !== null && _snap !== undefined) {
            const snap = _snap.toString();
            if (snap.search(/px/) > 0) return parseInt(snap, 10);
            else if (snap.search(/\%/) > 0) return (this.component.offsetWidth / 100) * parseInt(snap, 10);
            else if (parseInt(snap, 10) > 0) return this.component.offsetWidth / parseInt(snap, 10);
            else {
                log.warn('Invalid value for Gridsize: ' + snap);
                return null;
            }
        }
        return null;
    }

    sigApplyPropValue(propName, propValue) {
        this._log('setProperty override');
    }
}
customElements.define(SigGridElement.is, SigGridElement);