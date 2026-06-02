import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class SigRulersElement extends LasalRuntimeSigElement {
    static get is() {
        return "sig-designer-rulers";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <style>
                    :host {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        padding: 0;
                        margin: 0;
                        --theme-sig-app-crosslinex:  0px;
                        --theme-sig-app-crosslinehx: 0px;
                        --theme-sig-app-crossliney:  0px;
                        --theme-sig-app-crosslinehy: 0px;
                        background: 
                            linear-gradient( to right,  transparent var(--theme-sig-app-crosslinex),  var(--theme-sig-app-gridcolor) 0px, transparent calc(var(--theme-sig-app-crosslinex) + 2px) ),
                            linear-gradient( to bottom, transparent var(--theme-sig-app-crossliney),  var(--theme-sig-app-gridcolor) 0px, transparent calc(var(--theme-sig-app-crossliney) + 2px) ),
                            linear-gradient( to right,  transparent var(--theme-sig-app-crosslinehx), var(--theme-sig-app-gridcolor) 0px, transparent calc(var(--theme-sig-app-crosslinehx) + 2px) ),
                            linear-gradient( to bottom, transparent var(--theme-sig-app-crosslinehy), var(--theme-sig-app-gridcolor) 0px, transparent calc(var(--theme-sig-app-crosslinehy) + 2px) );
                        z-index: 95;
                        height: 100%;
                        width: 100%;
                    }
                    
                    .ruler {
                        background: rgba(255,255,255,1);
                        color: #444;
                        font-family: source code pro, "Arial Narrow", "Helvetica Neue", Helvetica, Arial, Veranda, sans-serif;
                        font-size: 12px;
                        line-height: 14px;
                        overflow: hidden;
                        width: 100%;
                        height: 100%;
                    }
                    .corner {
                        position: absolute;
                        top: 0px;
                        left: 0px;
                        width: 20px;
                        height: 20px;
                    }
                    .hRuler {
                        position: absolute;
                        width: 100%;
                        height: 19px;
                        left: 0px;
                        top: 0px;
                        border-bottom: 1px solid #333;
                        background-color: var(--theme-sig-designer-rulers-background-color, rgba(100,245,160,.3));
                        cursor:crosshair;
                    }
                    .vRuler {
                        position: absolute;
                        min-height: 100%;
                        width: 19px;
                        left: 0px;
                        top: 0px;
                        border-right: 1px solid #333;
                        background-color: var(--theme-sig-designer-rulers-background-color, rgba(100,245,160,.3));
                        cursor:crosshair;
                    }
                    .hRuler .tickLabel {
                        position: absolute;
                        top: 0px;
                        width: 1px;
                        height: 100%;
                        text-indent: 1px;
                        background: red;
                        font-size: 10px;
                        color:red;
                    }
                    .hRuler .tickMajor {
                        position: absolute;
                        bottom: 0px;
                        width: 1px;
                        height: 6px;
                        background: #000
                    }
                    .hRuler .tickMinor {
                        position: absolute;
                        bottom: 0px;
                        width: 1px;
                        height: 4px;
                        background: #666;
                    }
                    .vRuler .tickLabel {
                        position: absolute;
                        right: 0px;
                        height: 1px;
                        width: 100%;
                        text-indent: 1px;
                        background: red;
                        font-size: 10px;
                        color:red;
                    }
                    .vRuler .tickLabel span {
                        display: block;
                        position: absolute;
                        
                        top: 1px;
                        right: 0px;
                        margin-right: 18px;
                        
                        -webkit-transform: rotate(-90deg);
                        -moz-transform: rotate(-90deg);
                        -ms-transform: rotate(-90deg);
                        -o-transform: rotate(-90deg);
                        transform: rotate(-90deg);
                        
                        -webkit-transform-origin: top right;
                        -moz-transform-origin: top right;
                        -ms-transform-origin: top right;
                        -o-transform-origin: top right;
                        transform-origin: top right;
                        
                    }
                    .vRuler .tickMajor {
                        position: absolute;
                        right: 0px;
                        height: 1px;
                        width: 6px;
                        background: #000;
                    }
                    .vRuler .tickMinor {
                        position: absolute;
                        right: 0px;
                        height: 1px;
                        width: 4px;
                        background: #666;
                    }
                    .hRulerCarret {
                        position: absolute;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                        border-top: 8px solid var(--theme-sig-app-gridcolor, #699);
                        cursor: not-allowed;
                    }
                    .hRulerCarret[enableguidelines=false] {
                        display:none;
                    }
                    .vRulerCarret {
                        position: absolute;
                        border-top: 5px solid transparent;
                        border-bottom: 5px solid transparent;
                        border-left: 8px solid var(--theme-sig-app-gridcolor, #699);
                        cursor: not-allowed;
                    }
                    .vRulerCarret[enableguidelines=false] {
                        display:none;
                    }

                    :host([hidden]) {
                        display:none;
                    }
                </style>
                <div class="rulers corner" id="corner"></div>
                
                <div class="rulers hRuler" id="hRuler" on-mousemove="_hRulerMove" on-mouseleave="_hRulerMoveOut" on-mousedown="_hRulerClick"></div>
                <div class="rulers hRulerCarret" id="hRulerCarret" on-mousedown="_hCarretClick"></div>
                <div class="rulers vRuler" id="vRuler" on-mousemove="_vRulerMove" on-mouseleave="_vRulerMoveOut" on-mousedown="_vRulerClick"></div>
                <div class="rulers vRulerCarret" id="vRulerCarret" on-mousedown="_vCarretClick"></div>
            `;
    }

    static get properties() {
        let props = {
            hidden: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            vRulerSize: {
                type: Number,
                value: 20
            },
            hRulerSize: {
                type: Number,
                value: 20
            },
            vRulerSet: {
                type: Boolean,
                value: true
            },
            hRulerSet: {
                type: Boolean,
                value: true
            },
            enableguidelines: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_enableChanged'
            },
            displayrulers: {
                type: Boolean,
                value: false
            },
            guidelinex: {
                type: Number,
                value: 0,
                observer: '_propertyChanged'
            },
            guideliney: {
                type: Number,
                value: 0,
                observer: '_propertyChanged'
            },
            guidelinecolor: {
                type: String,
                value: "#dcdcdc",
                observer: '_propertyChanged'
            },
            iswindow: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            offsetX: {
                type: Number,
                value: 0
            },
            offsetY: {
                type: Number,
                value: 0
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
        this.APP_ELEMENT = document.getElementsByTagName('sig-app')[0];
        this.APP_WRAPPER_ELEMENT = this.APP_ELEMENT.getElementsByTagName('sig-wrapper')[0];

        this._subscribeEvents();
    }
    ready() {
        super.ready();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeEvents();
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

        if (this.controlEvent === null) {
            this.controlEvent = sigApi.designer.getControlEventInstance();
            this.controlEvent.source = this;
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

        if (type === 'setrulers') {
            this._setRulers(data);
            this._init();
        }
    }
    _unsubscribeEvents() {
        this.coreEvent.unsubscribe(this.coreEventHandler);
    }

    _setRulers(data) {
        if (data.displayrulers !== undefined) this.displayrulers = data.displayrulers;
        if (data.enableguidelines !== undefined) this.enableguidelines = data.enableguidelines;
        if (data.guidelinecolor !== undefined) this.guidelinecolor = data.guidelinecolor;
        if (data.guidelinex !== undefined) this.guidelinex = data.guidelinex;
        if (data.guideliney !== undefined) this.guideliney = data.guideliney;
        if (data.iswindow !== undefined) this.iswindow = data.iswindow;
    }
    _enableChanged() {
        if (this.enableguidelines === false) this._resetRulers();
    }
    _propertyChanged(newobj, oldobj) {
        const _data = {};
        _data.guidelinex = this.guidelinex;
        _data.guideliney = this.guideliney;
        _data.guidelinecolor = this.guidelinecolor;
        this._setGuidelinesColor(this.guidelinecolor);
    }
    _resetRulers() {
        this.guidelinex = 0;
        this.guideliney = 0;
        this._setGuidelines(this.guidelinex, this.guideliney);
    }
    _setGuidelinesColor(_color = null) {
        if (_color !== null) {
            this.style.setProperty('--theme-sig-app-gridcolor', _color);
        }
    }

    _setFrameOffset(offsetrulers) {
        this.APP_WRAPPER_ELEMENT.style.setProperty('margin', offsetrulers + 'px');
        this.APP_ELEMENT.style.setProperty('padding-right', offsetrulers + 'px');
        this.APP_ELEMENT.style.setProperty('padding-bottom', offsetrulers + 'px');
    }

    _setGuidelines(_xpos = null, _ypos = null) {
        if (_xpos !== null) {
            const _carret = this.$.hRulerCarret;
            _carret.style.setProperty('display', 'block');
            _carret.style.setProperty('left', (_xpos - 4.5) + 'px');
            _carret.style.setProperty('top', '12px');
            this.guidelinex = _xpos;
            this.style.setProperty('--theme-sig-app-crosslinex', _xpos + 'px');
        }

        if (_ypos !== null) {
            const _carret = this.$.vRulerCarret;
            _carret.style.setProperty('top', (_ypos - 4.5) + 'px');
            _carret.style.setProperty('left', '12px');
            _carret.style.setProperty('display', 'block');
            this.guideliney = _ypos;
            this.style.setProperty('--theme-sig-app-crossliney', _ypos + 'px');
        }
        this._dispatchEvent();
    }

    _dispatchEvent() {
        if (this.controlEvent !== null) {
            const _data = {
                enableguidelines: this.enableguidelines,
                displayrulers: this.displayrulers,
                guidelinecolor: this.guidelinecolor,
                guidelinex: this.guidelinex,
                guideliney: this.guideliney
            };
            this.controlEvent.data = _data;
            this.controlEvent.setRulers();
        }
    }

    _hRulerMoveOut(evt) {
        this.style.setProperty('--theme-sig-app-crosslinehx', "0px");
    }
    _vRulerMoveOut(evt) {
        this.style.setProperty('--theme-sig-app-crosslinehy', "0px");
    }
    _hRulerMove(evt) {
        const preferences = sigApi.designer.getPreferences();
        this.offsetX = preferences.app.offsetLeft - this.vRulerSize;
        this.style.setProperty('--theme-sig-app-crosslinehx', (evt.pageX - this.offsetX) + "px");
    }
    _vRulerMove(evt) {
        const preferences = sigApi.designer.getPreferences();
        this.offsetY = preferences.app.offsetTop - this.hRulerSize;
        this.style.setProperty('--theme-sig-app-crosslinehy', (evt.pageY - this.offsetY) + "px");
    }

    _hRulerClick(evt) {
        if (this.enableguidelines === true) {
            const preferences = sigApi.designer.getPreferences();
            this.offsetX = preferences.app.offsetLeft - this.vRulerSize;
            this._setGuidelines(evt.pageX - this.offsetX, null);
        }
    }
    _vRulerClick(evt) {
        if (this.enableguidelines === true) {
            const preferences = sigApi.designer.getPreferences();
            this.offsetY = preferences.app.offsetTop - this.hRulerSize;
            this._setGuidelines(null, evt.pageY - this.offsetY);
        }
    }
    _hCarretClick(evt) {
        this.style.setProperty('--theme-sig-app-crosslinex', '0px');
        this.style.setProperty('--theme-sig-app-crosslinehx', '0px');
        this.$.hRulerCarret.style.setProperty('display', 'none');
    }
    _vCarretClick(evt) {
        this.style.setProperty('--theme-sig-app-crossliney', '0px');
        this.style.setProperty('--theme-sig-app-crosslinehy', '0px');
        this.$.vRulerCarret.style.setProperty('display', 'none');
    }

    _init() {
        this._log('Rulers init');
        const $hRuler = $(this.$.hRuler);
        $hRuler.html('');
        const $vRuler = $(this.$.vRuler);
        $vRuler.html('');
        this.hidden = (this.displayrulers === true) ? false : true;

        const _rulerWidth = this.offsetWidth;
        const _rulerHeight = this.offsetHeight;

        this.style.setProperty('width', _rulerWidth + ' + 25px');
        this.style.setProperty('height', _rulerHeight + ' + 25px');

        let tickLabelPos = this.vRulerSize;
        let tickLabelPosKorr = this.vRulerSize;
        let newTickLabel = '';
        while (tickLabelPos <= parseInt(_rulerWidth, 10) + this.vRulerSize * 2) {
            tickLabelPosKorr = tickLabelPos - this.vRulerSize;
            if (tickLabelPos >= this.vRulerSize) {

                if (((tickLabelPosKorr) % 50) === 0) {
                    newTickLabel = '<div class="tickLabel rulersTick">' + (tickLabelPosKorr) + '</div>';
                    $(newTickLabel).css('left', tickLabelPos + 'px').appendTo($hRuler);
                } else if (((tickLabelPosKorr) % 10) === 0) {
                    newTickLabel = '<div class="tickMajor rulersTick"></div>';
                    $(newTickLabel).css('left', tickLabelPos + 'px').appendTo($hRuler);
                } else if (((tickLabelPosKorr) % 5) === 0) {
                    newTickLabel = '<div class="tickMinor rulersTick"></div>';
                    $(newTickLabel).css('left', tickLabelPos + 'px').appendTo($hRuler);
                }

            }
            tickLabelPos += 5;
        }
        tickLabelPos = this.hRulerSize;
        newTickLabel = "";
        while (tickLabelPos <= parseInt(_rulerHeight, 10) + this.hRulerSize * 2) {
            tickLabelPosKorr = tickLabelPos - this.hRulerSize;
            if (tickLabelPos >= this.hRulerSize) {

                if (((tickLabelPosKorr) % 50) === 0) {
                    newTickLabel = "<div class='tickLabel rulersTick'><span>" + (tickLabelPosKorr) + "</span></div>";
                    $(newTickLabel).css("top", tickLabelPos + "px").appendTo($vRuler);
                } else if (((tickLabelPosKorr) % 10) === 0) {
                    newTickLabel = "<div class='tickMajor rulersTick'></div>";
                    $(newTickLabel).css("top", tickLabelPos + "px").appendTo($vRuler);
                } else if (((tickLabelPosKorr) % 5) === 0) {
                    newTickLabel = "<div class='tickMinor rulersTick'></div>";
                    $(newTickLabel).css("top", tickLabelPos + "px").appendTo($vRuler);
                }

            }
            tickLabelPos += 5;
        }

        if (this.APP_ELEMENT !== undefined && this.hidden === false) {
            this._setFrameOffset(this.hRulerSize);
        } else if (this.APP_ELEMENT !== undefined && this.hidden === true) {
            this._setFrameOffset(0);
        }
    }
}
customElements.define(SigRulersElement.is, SigRulersElement);
