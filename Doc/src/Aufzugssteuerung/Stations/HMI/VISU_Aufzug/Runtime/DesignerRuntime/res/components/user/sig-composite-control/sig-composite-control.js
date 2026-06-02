import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';

class LasalRuntimeSigCompositeControl extends LasalRuntimeSigElement {

    constructor() {
        super();
        this.stretchmode = 'none'; 
        this.valign = 'top'; 
        this.halign = 'left'; 
        this.firstRenderDone = false;
    }

    static get is() {
        return "sig-composite-control";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
                :host {
                    background-color: transparent;
                    display: block;
                    position: absolute;
                    overflow: hidden;
                    border: none;
                    
                    will-change: contents;
                }
            </style>
            <slot></slot>
        `;
    }

    _handleScaling() {
        if (!this.isdesignmode) {
            this._updateScaling();
        } else {
            SigPolymer.afterNextRender(this, function (params) {
                this._updateScaling();
            });
        }
    }

    _updateScaling() {
        this._log(`Update scaling of ${this.id}`);
        const factor = this._getScaleFactor();
        switch (this.stretchmode) {
            case 'stretch':
                this._setScaling(factor.x, factor.y, factor.z);
                this._setTransformOrigin(); 
                break;
            case 'aspect':
                this._setScaling(factor.x, factor.y, factor.z);
                this._setTransformOrigin(this.valign, this.halign);
                break;
            case 'none':
                this._setScaling(); 
                this._setTransformOrigin(this.valign, this.halign);
                break;
        }
    }

    _setScaling(factorX = 1, factorY = 1, factorZ = 1, use3d = false) {
        let scale = '';
        if (use3d) {
            scale = `scale3d(${factorX}, ${factorY}, ${factorZ})`;
        } else {
            scale = `scale(${factorX}, ${factorY})`;
        }
        this.style.setProperty('transform', scale);
    }

    _setTransformOrigin(posY = 'top', posX = 'left') {
        const controls = this.getControlBounds();
        this.style.setProperty('transform-origin', `${posY} ${posX}`);
        switch (posY) {
            case 'top':
                this.style.top = 0;
                this.style.bottom = 'unset';
                break;
            case 'center':
                this.style.top = `calc(50% - ${controls.height / 2}px)`;
                this.style.bottom = 'unset';
                break;
            case 'bottom':
                this.style.top = 'unset';
                this.style.bottom = 0;
                break;
        }

        switch (posX) {
            case 'left':
                this.style.left = 0;
                this.style.right = 'unset';
                break;
            case 'center':
                this.style.left = `calc(50% - ${controls.width / 2}px)`;
                this.style.right = 'unset';
                break;
            case 'right':
                this.style.left = 'unset';
                this.style.right = 0;
                break;
        }
    }

    _removeTransform() {
        this.style.removeProperty('transform');
        this.style.removeProperty('transform-origin');
        this.style.top = 0;
        this.style.left = 0;
        this.style.bottom = 'unset';
        this.style.right = 'unset';
    }

    _getScaleFactor() {
        let factorX = 1,
            factorY = 1,
            factorZ = 1;

        const controls = this.getControlBounds();
        const container = this.parentNode ? this.parentNode.getControlBounds() : null;

        if (controls && container) {
            switch (this.stretchmode) {
                case 'stretch':
                    factorX = (container.width - container.border * 2) / controls.width;
                    factorY = (container.height - container.border * 2) / controls.height;
                    break;
                case 'aspect':
                    const factor = Math.min(
                        (container.width - container.border * 2) / controls.width,
                        (container.height - container.border * 2) / controls.height
                    );
                    factorX = factor;
                    factorY = factor;
                    break;
            }
        }

        return {
            x: factorX,
            y: factorY,
            z: factorZ
        };
    }

    _getDesignerTool() {
        return null;
    }
}
customElements.define(LasalRuntimeSigCompositeControl.is, LasalRuntimeSigCompositeControl);