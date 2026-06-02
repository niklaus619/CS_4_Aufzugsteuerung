import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

export class LasalRuntimeSigWindowContainer extends LasalRuntimeSigElement {

    static get is() {
        return 'sig-window-container';
    }

    static get importMeta() {
        return import.meta;
    }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
                :host {
                    
                    color: var(--theme-sig-window-container-color, inherit);
                    background-color: var(--theme-sig-window-container-background-color, teal);
                    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

                    
                    display: block;
                    position: absolute;
                    overflow: hidden;
                }

                
                :host([isdesignmode]:not([isstylepreview])) {
                    overflow: unset;
                    height:0;
                    width:0;
                }

                :host * {
                    
                    @apply --notextselect;
                    margin: 0;
                    padding: 0;
                }

                .clearfix:after {
                    
                    @apply --clearfix;
                }

                .sig-window-container {
                    
                    position: relative;
                    width: 100%;
                    height: 100%;
                    
                    text-decoration: inherit;           
                }

                :host([isstylepreview]) ::slotted(div) {
                    width: 100%;
                    height: 100%;
                }
            </style>
            <div class="sig-window-container clearfix">
                <slot></slot>
            </div>
        `;
    }

    static get properties() {
        const props = {
            previewtext: {
                type: String,
                value: 'text',
                observer: '_setPreviewText'
            },
            headerheightbehavior: {
                type: String,
                vlaue: 'minHeight',
                reflectToAttribute: true
            }
        };
        return props;
    }

    constructor() {
        super();
        this.theme = 'default';
        this.defaultIcons = {
            close: '<img class="jsPanel-icon" src="res/components/sigmatek/sig-utils-jspanel/themes/icons/close-icon.svg">',
            maximize: '<img class="jsPanel-icon" src="res/components/sigmatek/sig-utils-jspanel/themes/icons/maximize-icon.svg">',
            minimize: '<img class="jsPanel-icon" src="res/components/sigmatek/sig-utils-jspanel/themes/icons/minimize-icon.svg">',
            normalize: '<img class="jsPanel-icon" src="res/components/sigmatek/sig-utils-jspanel/themes/icons/normalize-icon.svg">',
            smallify: '<img class="jsPanel-icon" src="res/components/sigmatek/sig-utils-jspanel/themes/icons/smallify-icon.svg">',
        };
        this.controlButtons = `<button class="jsPanel-btn jsPanel-btn-smallify jsPanel-btn-md" aria-label="Smallify" style="display:none">${this.defaultIcons.smallify}</button>
        <button class="jsPanel-btn jsPanel-btn-minimize jsPanel-btn-md" aria-label="Minimize">${this.defaultIcons.minimize}</button> 
        <button class="jsPanel-btn jsPanel-btn-normalize jsPanel-btn-md" aria-label="Normalize" >${this.defaultIcons.normalize}</button> 
        <button class="jsPanel-btn jsPanel-btn-maximize jsPanel-btn-md" aria-label="Maximize" >${this.defaultIcons.maximize}</button>
        <button class="jsPanel-btn jsPanel-btn-close jsPanel-btn-md" aria-label="Close">${this.defaultIcons.close}</button> `;
    }

    ready() {
        super.ready();
        this._renderMarkup(this.theme);
        this._setPreviewText();
        if (this.isdesignmode) {
            const _panel = document.getElementById('windowPanel');
            if (_panel instanceof HTMLElement === false) return;
            _panel.options = {
                closeOnEsc: null
            };
        }
    }

    sigApplyFontObject(propName, fontObj) {
        super.sigApplyFontObject(propName, fontObj);
        const _textdecoration = this.style.getPropertyValue('text-decoration');
        this.querySelector('#windowPanel').style.setProperty('text-decoration', _textdecoration);
    }

    _renderMarkup(windowType = 'default') {
        const templateContent = document.createElement('div');

        templateContent.id = 'windowPanelwrapper';
        templateContent.innerHTML = ` 
            <style>
            #windowPanel {
                left: 0px; 
                opacity: 1 !important; 
                z-index: unset; 
                overflow:hidden; 

                width: inherit;
                height: inherit;
            }

            sig-window-container[headerheightbehavior=fixedHeight] #windowPanel div.jsPanel-headerbar {
                min-height: initial;
                height: var(--theme-sig-window-panel-hdr-height, 36px);
                overflow: hidden;
            }
            </style>
            <div id="windowPanel" class="jsPanel jsPanel-standard jsPanel-theme-${windowType} jsPanel-depth-3">
              <div class="jsPanel-hdr" style="position:relative"> 
                    <div class="jsPanel-headerbar"> 
                        <div class="jsPanel-headerlogo" style="touch-action: none; cursor: default;"></div> 
                        <div class="jsPanel-titlebar" style="touch-action: none; cursor: default;"> 
                            <span class="jsPanel-title"></span> 
                        </div> 
                        <div class="jsPanel-controlbar" style="pointer-events: inherit;">        
                        ${this.controlButtons} 
                        </div> 
                    </div>
                </div> 
                <div class="jsPanel-progressbar"></div>
                <div class="jsPanel-sig-separator">
                    <div class="jsPanel-sig-separator-border"></div>
                </div>
                <div id="jsPanelContainer" class="jsPanel-content" style="overflow:hidden;"></div> 
                <div class="jsPanel-ftr" style="touch-action: none; cursor: default;"></div> 
            </div>                     
            `;
        this.appendChild(templateContent);
    }

    designerGenerateStylePreview() {
        this._setPreviewText();
    }

    _setPreviewText() {
        if (this.isstylepreview && this.isdesignmode) {
            const title = document.querySelector('#windowPanelwrapper .jsPanel-title');
            if (title) title.innerHTML = this.previewtext;
        }
    }
}
customElements.define(LasalRuntimeSigWindowContainer.is, LasalRuntimeSigWindowContainer);