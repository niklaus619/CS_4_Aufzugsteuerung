import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import '../sig-composite-control/sig-composite-control.js';

class LasalRuntimeSigcompositecontainer extends LasalRuntimeSigElement {

    constructor() {
        super();
        this.propertiesReady = false;
        this.sigAddRequiredProperty('stretchmode');
        this.sigAddRequiredProperty('valign');
        this.sigAddRequiredProperty('halign');
    }

    static get is() {
        return "sig-composite-container";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
                :host {
                    
                    background-color: var(--theme-sig-composite-container-background-color, transparent);
                    border-width: var(--theme-sig-composite-container-border-width, 0px);
                    border-color: var(--theme-sig-composite-container-border-color, transparent);
                    border-style: var(--theme-sig-composite-container-border-style, none);
                    border-radius: var(--theme-sig-composite-container-border-radius, 0px);

                    
                    display: block;
                    position: absolute;
                    overflow: hidden;
                }

                :host * {
                    
                    margin: 0;
                    padding: 0;
                }

                .clearfix:after {
                    @apply --clearfix
                }

                :host(:not([isdesignmode]):not([isdrag-clone])[transition]),
                 :host(:not([isdesignmode]):not([isdrag-clone])[transition]) ::slotted(*) {
                    transition: 
                        top var(--theme-sig-composite-container-transition-duration, 1000ms), 
                        left  var(--theme-sig-composite-container-transition-duration, 1000ms), 
                        width var(--theme-sig-composite-container-transition-duration, 1000ms), 
                        height  var(--theme-sig-composite-container-transition-duration, 1000ms), 
                        transform  var(--theme-sig-composite-container-transition-duration, 1000ms);
                }
            </style>

            <slot name="sigcompositectrl"></slot>
            <slot></slot>
            
        `;
    }

    static get properties() {
        return {
            stretchmode: {
                type: String,
                value: "none", 
                observer: '_updateStrechmode'
            },
            valign: {
                type: String,
                value: "top", 
                observer: '_updateValign'
            },
            halign: {
                type: String,
                value: "left", 
                observer: '_updateHalign'
            },
            transition: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
    }

    static get observers() {
        return [
            '_setDimensions(dpTop, dpLeft, dpHeight, dpWidth)'
        ]
    }

    ready() {
        super.ready();
        if (this.isdesignmode) {
            this.propertiesReady = true;
            SigPolymer.afterNextRender(this, function (params) {
                this._handleScaling(true);
            });
        }
    }

    sigOnRequiredPropertiesReady() {
        super.sigOnRequiredPropertiesReady();
        this.propertiesReady = true;
        if (this._hasDynamicDimensions()) this._setDimensions(this.dpTop, this.dpLeft, this.dpHeight, this.dpWidth);
        this._handleScaling(true);
    }

    _updateStrechmode(newval, oldval) {
        if (newval && oldval) {
            this._handleScaling(true);
        }
    }

    _updateHalign(newval, oldval) {
        if (newval && oldval) {
            this._handleScaling(true);
        }
    }

    _updateValign(newval, oldval) {
        if (newval && oldval) {
            this._handleScaling(true);
        }
    }

    _handleScaling(force = false, skipPropsCheck = false) {
        if (((this.propertiesReady && this.id) || skipPropsCheck) && !this.isstylepreview) {
            const controls = document.querySelectorAll(`#${this.id} > SIG-COMPOSITE-CONTROL`);
            for (const control of controls) {
                if (!control.firstRenderDone || force) {
                    control.stretchmode = this.stretchmode;
                    control.valign = this.valign;
                    control.halign = this.halign;
                    control._handleScaling();
                    control.firstRenderDone = true;
                }
            }
        }
    }

    designerOnBoundsChanged() {
        this._handleScaling(true);
    }

    refresh(control, force, skipPropsCheck) {
        this._handleScaling(force, skipPropsCheck);
    }

    _setDimensions(top, left, height, width) {
        if (!this.isdesignmode && !this.isdragClone && this.propertiesReady) {
            const bounds = this.getControlBounds();
            const _top = (top !== undefined && top !== bounds.top) ? top : undefined;
            const _left = (left !== undefined && left !== bounds.left) ? left : undefined;
            const _height = (height !== undefined && height !== bounds.height) ? height : undefined;
            const _width = (width !== undefined && width !== bounds.width) ? width : undefined;
            this._setBounds(_top, _left, _height, _width);
            if (_top || _left || _height || _width) this._handleScaling(true);
        }
    }

    _hasDynamicDimensions() {
        return (this.dpTop !== undefined || this.dpLeft !== undefined ||
            this.dpHeight !== undefined || this.dpWidth !== undefined) ? true : false;
    }
}
customElements.define(LasalRuntimeSigcompositecontainer.is, LasalRuntimeSigcompositecontainer);