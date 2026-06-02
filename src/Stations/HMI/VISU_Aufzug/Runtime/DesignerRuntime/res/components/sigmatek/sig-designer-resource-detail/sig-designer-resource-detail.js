import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import '../../user/sig-keyboard/sig-keyboard.js';
import '../../user/sig-keyboard/sig-keyboard-css.js';

export class LasalRuntimeSigResourceDetail extends LasalRuntimeSigElement {

    static get is() {
        return "sig-designer-resource-detail";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css sig-keyboard-css">
            :host {
                
                display: block;
                position: absolute;
                top:0px;
                left:0px;

                width:100%;
                height:100%;
            }

            :host * {
                
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .wrapper {
                width: 100%;
                height: 100%;
                text-align:center;
                display:none;
                align-items:center;
                justify-content:center;
            }

            #imgWrapper {
                background-color: var(--theme-sig-designer-resource-detail-background-color, #FFFFFF);
                height:100%;
                
            }

            #imgWrapperBackgroundImg {
                background: var(--theme-sig-designer-resource-detail-background-url, url('background.png'));
                background-size: 70px;
                height:100%;
            }

            #img {
                max-height:90%;
                border: 7px solid var(--theme-sig-designer-resource-detail-border-color, #87AEC0);
            }

            #keyboard {
                
                width: 900px;
                height:380px;
            }

            .italic {
                font-style:italic;
            }

            .bold {
                font-weight:bold;
            }

            .underlined {
                text-decoration: underline;
            }

            p#font {
                color :var(--theme-sig-designer-resource-detail-color, black);
                font-size:30px;
                margin:5px;
                padding:10px;
            }
        </style>
        
            <div class="wrapper" id="imgWrapper">
                <div class="wrapper" id="imgWrapperBackgroundImg">
                    <img src="" id="img"/>
                </div>
            </div>

        
            <div class="wrapper" id="fontWrapper"> 
                <p id="font">[[previewText]]</p> 
            </div>

        
            <div class="wrapper" id="keyboardWrapper">
                <sig-keyboard id="keyboard"></sig-keyboard>
            </div>

        
            <div class="wrapper" id="audioWrapper">
                <audio controls id="audio">
                    <source src="" id="source">
                </audio>
            </div>
            
            <div class="wrapper" id="defaultWrapper">
                <p>[[config.initText]]</p>
            </div>`;
    }

    static get properties() {
        let props = {
            detail: {
                type: Object,
                value: () => { return {} },
                observer: '_detailChanged'
            }
        };
        return props;
    }

    constructor() {
        super();
        this.config = {};
        this.previewText = '';

        this.sigAddEventListener('visibilitychange', () => {
            if (this.$.audio) this.$.audio.pause();
        }, 'jsEvent', document);
    }

    _detailChanged(newDetail, oldDetail) {
        if (newDetail) {
            switch (newDetail.resourceType) {
                case 'image':
                    this.$.img.src = newDetail.resourceUrl;
                    this.$.img.style.border = `7px solid ${newDetail.borderColor}`;
                    this._showWrapper(this.$.imgWrapper);
                    this.$.imgWrapper.style.backgroundColor = newDetail.backgroundColor;
                    this._showWrapper(this.$.imgWrapperBackgroundImg);
                    break;
                case 'fonts':
                    this._loadFont(newDetail.resourceUrl);
                    this._showWrapper(this.$.fontWrapper);
                    const fontObj = newDetail.font;
                    this.previewText = newDetail.previewText;
                    if (fontObj) {
                        this.$.font.className = '';
                        if (fontObj.italic) this.$.font.classList.add('italic');
                        if (fontObj.bold) this.$.font.classList.add('bold');
                        if (fontObj.underlined) this.$.font.classList.add('underlined');
                        if (fontObj.fontSize) this.$.font.style.fontSize = fontObj.fontSize + 'px';
                    }
                    break;
                case 'keyboardlayouts':
                    this.$.keyboard.layoutmap = newDetail.resourceUrl;
                    this._showWrapper(this.$.keyboardWrapper);
                    break;
                case 'audio':
                    if (this.$.audio) {
                        this.$.audio.pause();
                        this.$.audio.load();
                        this.$.source.src = newDetail.resourceUrl;
                        this._showWrapper(this.$.audioWrapper);
                    }
                    break;
                default:
                    this.$.defaultWrapper.style.display = 'flex';
            }
        }
    }

    async _loadFont(url) {
        if (url && url !== '') {
            try {
                const font = new FontFace('previewFont', 'url(' + url + ')');
                await font.load();
                document.fonts.add(font);
                this.$.font.style.fontFamily = 'previewFont';
            } catch (error) {
                this.$.font.style.fontFamily = 'inherit';
                this._log('Font could not be loaded:' + error.message, 'ERROR')
            }
        } else {
            this.$.font.style.fontFamily = 'inherit';
        }
    }

    _showWrapper(wrapper) {
        wrapper.style.display = 'flex';
        this.$.defaultWrapper.style.display = 'none';
    }

}
customElements.define(LasalRuntimeSigResourceDetail.is, LasalRuntimeSigResourceDetail);
