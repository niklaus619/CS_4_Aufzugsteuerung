
import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import { Handles } from './sig-designer-handles-mixin.js';

class LasalRuntimeSigDesignerHandle extends Handles(LasalRuntimeSigElement) {
    static get is() {
        return "sig-designer-handle";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                
                position: absolute;
                border: 1px dashed var(--theme-sig-designer-handle-border-color, rgba(32, 157, 229, 0.5));
                background-color:  var(--theme-sig-designer-handle-background-color, transparent);  
                z-index: 10000;
                display: block;

                

                overflow:visible;
                pointer-events:none;
                background:none !important;
            }

            :host([hidden]) {
                display: none;
            }
                        
            .handle {
                position: absolute;
                width: var(--theme-sig-designer-handle-size, 8px);
                height:  var(--theme-sig-designer-handle-size, 8px);
                background-color: var(--theme-sig-designer-handle-background-color, #fff);
                border: 1px solid var(--theme-sig-designer-handle-border-color, #209DE5);
                border-radius: 100%;
                cursor: inherit;
                line-height: normal !important;
                pointer-events:all;
                zoom: var(--theme-sig-designer-handle-zoom, 1);
            }
            .handle:hover {
                cursor: pointer;
            }
            .handle:active {
               cursor: inherit;
            }
            :host([hidehandles]) .handle {
                display: none;
            }
            :host(:not([ismaster])) .handle {
                opacity:0.4;
                background-color: var(--theme-sig-designer-handle-background-color, #209DE5);
                filter: grayscale(50%);
            }
            .handle.ne {
                top: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                right: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                cursor: var(--theme-sig-designer-handle-cursor,ne-resize);
            }
            .handle.se {
                bottom: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                right: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px );
                cursor: var(--theme-sig-designer-handle-cursor,se-resize);
            }
            .handle.sw {
                bottom: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                left: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                cursor: var(--theme-sig-designer-handle-cursor,sw-resize);
            }
            .handle.nw {
                top: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                left: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                cursor: var(--theme-sig-designer-handle-cursor,nw-resize);
            }
            .handle.nn {
                top: calc( var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                left: calc( 50% - var(--theme-sig-designer-handle-size, 8px) / 2);
                cursor: var(--theme-sig-designer-handle-cursor, n-resize);
            }
            .handle.ee {
                top: calc( 50% - var(--theme-sig-designer-handle-size, 8px) / 2 );
                right: calc(var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                cursor: var(--theme-sig-designer-handle-cursor,e-resize);
            }
            .handle.ss {
                bottom: calc(var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px );
                left: calc( 50% - var(--theme-sig-designer-handle-size, 8px) / 2);
                cursor: var(--theme-sig-designer-handle-cursor,s-resize);
            }
            .handle.ww {
                top: calc( 50% - var(--theme-sig-designer-handle-size, 8px) / 2);
                left: calc(var(--theme-sig-designer-handle-size, 8px) / 2 * -1 + -1px);
                cursor: var(--theme-sig-designer-handle-cursor, w-resize);
            }
            .rotate {
                padding: 1px 3px 0 3px;
                width: auto !important;
                height: auto !important;
                top: calc( var(--theme-sig-designer-handle-size, 8px) * -1 + -16px);  
                left: calc( var(--theme-sig-designer-handle-size, 8px) * -1 - 16px);
                font-size:10px;
                color:#14537A;
                text-align: center;
                display: none;
            }

            .rotate:hover,
            .rotate:active {
                color:var(--theme-sig-designer-handle-border-color, #209DE5);
            }

            .fa-rotate:before {
                @apply --symbol;
                content: "\f0e2";
            }

            :host([ismaster]) .rotate {
                display: block;
            }

            :host([debug]) .handle.ne {
                background-color: red !important;
            }
            :host([debug]) .handle.se {
                background-color: blue !important;
            }
            :host([debug]) .handle.sw {
                background-color: orange !important;
            }
            :host([debug]) .handle.nw {
                background-color: yellow !important;
            }
            :host([debug]) .handle.nn {
                background-color: green !important;
            }
            :host([debug]) .handle.ee {
                background-color: cyan !important;
            }
            :host([debug]) .handle.ss {
                 background-color: purple !important;
            }
            :host([debug]) .handle.ww {
                 background-color: fuchsia !important;
            }
            
        </style>
        <div id="handle1" class="handle ne"></div>
        <div id="handle2" class="handle se"></div>
        <div id="handle3" class="handle sw"></div>
        <div id="handle4" class="handle nw"></div>
        <div id="handle5" class="handle nn"></div>
        <div id="handle6" class="handle ee"></div>
        <div id="handle7" class="handle ss"></div>
        <div id="handle8" class="handle ww"></div>
        
        `
    }

    static get properties() {
        let props = {
            hidden: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
                observer: '_toggleHidden'
            },
            handlesize: {
                type: Number,
                value: 8,
                observer: '_setHandleSize'
            },
            hidehandles: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            debug: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            isselected: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_toggleSelected'
            },
            ismaster: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_toggleMaster'
            },
            cursor: {
                type: String,
                value: 'default',
                observer: '_setCursor'
            }
        }
        return props;
    }

    constructor() {
        super();
        this.parent = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this._fit();
    }

    _toggleHidden(newval, oldval) {
        if (oldval !== undefined) {
            if (!newval) {
                this._fit();
            }
        }
    }

    _toggleSelected(newval, oldval) {
        if (oldval !== undefined) {
            if (!newval && this.ismaster) {
                this.ismaster = false;
            }
            this.hidden = !newval;
        }
    }

    _toggleMaster(newval, oldval) {
        if (oldval !== undefined && this.parent !== null) {
            if (newval && !this.isselected) {
                this.isselected = true;
            }
        }
    }

    _getInitalViewPortOffset() {
        let viewPortOffset = {};
        const preferences = sigApi.designer.getPreferences();
        viewPortOffset.left = preferences.app.offsetLeft;
        viewPortOffset.top = preferences.app.offsetTop;
        return viewPortOffset;
    }

    _setHandleSize(newval, oldval) {
        if (oldval !== undefined) {
            this.style.setProperty("--theme-sig-designer-handle-size", newval + "px");
        }
    }

    _fit() {
        if (this.parent instanceof HTMLElement) {
            const bounds = this.getControlRectangleBounds(this.parent);
            this._setBounds(bounds.top, bounds.left, bounds.height, bounds.width, undefined, bounds.translateX, bounds.translateY);
        }
    }


    _setCursor(cursor) {
        if (cursor) {
            const prop = '--theme-sig-designer-handle-cursor';
            if (cursor === 'default' && this.style.getPropertyValue(prop) !== 'default') this.style.removeProperty(prop);
            else this.style.setProperty(prop, cursor);
        }
    }
}
customElements.define(LasalRuntimeSigDesignerHandle.is, LasalRuntimeSigDesignerHandle);