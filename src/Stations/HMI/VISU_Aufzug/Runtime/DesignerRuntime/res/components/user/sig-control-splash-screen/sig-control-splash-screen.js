import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import '../sig-control-scrollbar/sig-control-scrollbar-css.js';

export class LasalRuntimeSigSplashScreen extends LasalRuntimeSigElement {

    static get is() {
        return 'sig-control-splash-screen';
    }

    static get importMeta() {
        return import.meta;
    }


    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css sig-control-scrollbar-css">
            :host {              

                
                color: var(--theme-sig-control-splash-screen-color, inherit);
                background-color: var(--theme-sig-control-splash-screen-background-color, rgba(255,255,255,1));
                font-size: var(--theme-sig-control-splash-screen-font-size, 12px);
                border-width: var(--theme-sig-control-splash-screen-border-width, 0px);
                border-color: var(--theme-sig-control-splash-screen-border-color, transparent);
                border-style: var(--theme-sig-control-splash-screen-border-style, none);
                
                
                position: absolute;
                overflow: hidden;
                z-index: var(--theme-sig-element-zindex, 2147483500);
            }
            :host * {
                
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }
            .clearfix:after {
                 
                @apply --clearfix
            }
            :host([ishidden]) {
                display: none;
            }

            

            .sig-control-splash-screen {
                position: relative;
                width: 100%;
                height:100%;
            }

            #layout {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-content: flex-start;
                align-items: flex-start;
                height:100%;
                width:100%;
            }

            .container {
                align-self: auto;
                width:100%;
                position: relative;
            }

            #layout .spinner{
                order: var(--theme-sig-control-splash-screen-container-spinner-order, 0);
                flex: 0 1 var(--theme-sig-control-splash-screen-container-spinner-spacing, 70%);
                background-color: var(--theme-sig-control-splash-screen-container-spinner-background-color, transparent);
            }

            #layout .reload {
                order: var(--theme-sig-control-splash-screen-container-reload-order, 0);
                flex: 0 1 var(--theme-sig-control-splash-screen-container-reload-spacing, 15%);
                background-color: var(--theme-sig-control-splash-screen-container-reload-background-color, transparent);
            }

            #layout .messages {
                order: var(--theme-sig-control-splash-screen-container-messages-order, 0);
                flex: 0 1 var(--theme-sig-control-splash-screen-container-messages-spacing, 15%);
                background-color: var(--theme-sig-control-splash-screen-container-messages-background-color, transparent);
            }
            
            .absmiddle {
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
            }
            
            

            #spinnerwrapper {
                display:none;
            }

            #spinner{
                position:absolute;
                width: var(--theme-sig-control-splash-screen-spinner-size, 100%);
                height: var(--theme-sig-control-splash-screen-spinner-size, 100%);
                stroke: var(--theme-sig-control-splash-screen-spinner-color, rgba(100,100,100,1));
                max-height:100%;
                max-width:100%;
            }

            #spinnerimage {
                background-image: var(--theme-sig-control-splash-screen-spinner-background-image, none);
                width: var(--theme-sig-control-splash-screen-spinner-size, 100%);
                height: var(--theme-sig-control-splash-screen-spinner-size, 100%);
                max-height:100%;
                max-width:100%;
                display:none;
                position:absolute;
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center center;
            }

            :host([usespinnerimage]) #spinner {
                display: none;
            }

            :host([usespinnerimage]) #spinnerimage {
                display:block;      
            }


            

            #reloadbutton {
                position:relative;  
                height:70%;
                width: 70%;
                transform:translate(-50%,-50%);
            }

            #reloadicon {
                position:absolute;
                cursor: pointer;
                width: var(--theme-sig-control-splash-screen-reload-button-size, 100%);
                height: var(--theme-sig-control-splash-screen-reload-button-size,100%);
                max-height: 100%;
                max-width:100%;
                background-color: var(--theme-sig-control-splash-screen-reload-button-background-color, transparent);
                border-width: var(--theme-sig-control-splash-screen-reload-button-border-width, 0px);
                border-style: var(--theme-sig-control-splash-screen-reload-button-border-style, none);
                border-color: var(--theme-sig-control-splash-screen-reload-button-border-color, transparent);
                border-radius: var(--theme-sig-control-splash-screen-reload-button-border-radius, 0px);
            }
            
            #reloadicon path {
                fill: var(--theme-sig-control-splash-screen-reload-button-color, rgba(100,100,100,1));
            }

            #reloadiconimage {
                display:none;
                position:absolute;
                width: var(--theme-sig-control-splash-screen-reload-button-size, 100%);
                height: var(--theme-sig-control-splash-screen-reload-button-size,100%);
                max-height: 100%;
                max-width: 100%;
                cursor: pointer;
                background-image: var(--theme-sig-control-splash-screen-reload-button-background-image, none);
                background-repeat: no-repeat;
                background-size:contain;
                background-position: center center;
                background-color: var(--theme-sig-control-splash-screen-reload-button-background-color, rgba(200,200,200,1));
                border-width: var(--theme-sig-control-splash-screen-reload-button-border-width, 0px);
                border-style: var(--theme-sig-control-splash-screen-reload-button-border-style, none);
                border-color: var(--theme-sig-control-splash-screen-reload-button-border-color, transparent);
                border-radius: var(--theme-sig-control-splash-screen-reload-button-border-radius, 0px);
            }

            :host([usereloadimage]) #reloadiconimage {
                display:block;
            }

            :host([usereloadimage]) #reloadicon {
                display:none;
            }

            

            #messages {
                position: absolute;
                width:100%;
                height:100%;
                font-size: var(--theme-sig-control-splash-screen-message-font-size, var(--theme-sig-control-splash-screen-font-size, 12px));
                overflow:auto;
            }
            #messages p {
                padding: 2px 10px;
            }
            #messages p:first-child {
                margin-top:10px;
            }
            #messages p:last-child { 
                margin-bottom:10px;
            }
            
            #messages p.info {
                background-color: var(--theme-sig-control-splash-screen-msg-info-background-color, transparent);
                color: var(--theme-sig-control-splash-screen-msg-info-color, var(--theme-sig-control-splash-screen-color, inherit));
            }

            #messages p.warning {
                background-color: var(--theme-sig-control-splash-screen-msg-warning-background-color, rgba(255,255,0,1));
                color: var(--theme-sig-control-splash-screen-msg-warning-color, var(--theme-sig-control-splash-screen-color, inherit));
            }

            #messages p.error {
                background-color: var(--theme-sig-control-splash-screen-msg-error-background-color, rgba(240,10,10,1));
                color: var(--theme-sig-control-splash-screen-msg-error-color, var(--theme-sig-control-splash-screen-color, rgba(255,255,255,1)));
            }
 
            

            .animation {
                animation-name: var(--theme-sig-control-splash-screen-animation-name, spin);
                animation-duration: var(--theme-sig-control-splash-screen-animation-duration, 1s);
                
                animation-timing-function: var(--theme-sig-control-splash-screen-animation-timing-function, linear);
                animation-iteration-count: var(--theme-sig-control-splash-screen-animation-iteration-count, infinite);
            }
            
            @keyframes spin {
                0% { transform: translate(-50%,-50%) rotate(0deg); }
                100% { transform: translate(-50%,-50%) rotate(360deg); }
            }
            
            @keyframes pulse {
                0% { transform: translate(-50%,-50%) scale(0.7); }
                70% { transform: translate(-50%,-50%) scale(1); }
                100% { transform: translate(-50%,-50%) scale(0.7); } 
            }

        </style>
        <div class="sig-control-splash-screen">
        <div id="layout">
            <div class="spinner container">
                <div id="spinnerwrapper">
                    <div id="spinnerimage" class="absmiddle"></div>
                    <svg id="spinner" class="absmiddle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                        <circle cx="50" cy="50" fill="none" stroke-width="10" r="20"
                            stroke-dasharray="94.24777960769379 33.41592653589793" transform="rotate(126 50 50)">
                        </circle>
                    </svg>
                </div>
            </div> 
            <div class="reload container">
                <div id="reloadbutton" class="absmiddle" on-tap="_reload">
                    <div id="reloadiconimage" class="absmiddle"></div>
                    <svg id="reloadicon" class="absmiddle" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path d="M15.65 4.35A8 8 0 1 0 17.4 13h-2.22a6 6 0 1 1-1-7.22L11 9h7V2z"/>
                    </svg>
                </div>
            </div>
            <div class="messages container">
                <div id="messages"></div>
            </div>
        </div>
        </div>
        `;
    }

    static get properties() {
        const props = {
            ishidden: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            messages: {
                type: Array,
                value: () => {
                    return [];
                },
            },
            usespinnerimage: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            usereloadimage: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            animationname: {
                type: String,
                value: 'spin',
                observer: '_toggleAnimationName'
            },
            forceanimation: {
                type: Boolean,
                value: false,
                observer: '_forceAnimation'
            }
        };
        return props;
    }

    constructor() {
        super();
        this.isanimated = false;
        if (!this.isdesignmode) {
            if (!this.context) {
                this.resizeEvent = (evt) => {
                    this._fitToWindow();
                };
                if (!this.context) window.addEventListener('resize', this.resizeEvent);
            }
            window.sigApiReadyPromise.then(() => {
                this.utilsApi = (window.sigApi) ? window.sigApi.sigUtils : undefined;
                this.sigAddEventListener('SHOW_SPLASH_SCREEN', (maID, miID, message) => {
                    this.show();
                }, 'runtimeEvent');
                this.sigAddEventListener('HIDE_SPLASH_SCREEN', (maID, miID, message) => {
                    this.hide();
                }, 'runtimeEvent');
            });
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this._fitToWindow();
        SigPolymer.afterNextRender(this, function () {
            this._checkCSSValue(true);
            if (!this.ishidden) this.show();
        });

        if (this.isdesignmode) {
            this.addMessages([
                { msg: 'Error message 2', logType: 2 },
                { msg: 'Warning message 1', logType: 1 },
                { msg: 'Info message 0', logType: 0 }]);
        }
    }

    ready() {
        super.ready();
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.has('enableContext')) {
            this.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
    }

    hide() {
        this.ishidden = true;
        this._disableAnimation();
        this._dispatchEvent('hide');
        this._log('Splash screen is now ishidden.');
    }

    show() {
        this.ishidden = false;
        this._enableAnimation();
        this._dispatchEvent('show');
        this._log('Splash screen is now shown.');
    }

    _fitToWindow() {
        if (this.parentNode === document.body) {
            this.style.height = window.innerHeight + 'px';
            this.style.width = window.innerWidth + 'px';
            this._log(`Resized to ${window.innerWidth}px x ${window.innerHeight}px`);
        } else {
            if (!this.isdesignmode) this.style.zIndex = 'unset';
        }
    }

    renderAllMessages() {
        if (this.messages instanceof Array) {
            this.$.messages.innerHTML = '';
            this.messages.forEach(m => {
                const item = document.createElement('p');
                item.innerHTML = m;
                this.$.messages.appendChild(item);
            });
            return true;
        } else {
            return false;
        }
    }

    addMessages(messages) {
        if (messages instanceof Array && messages.length > 0) {
            messages.forEach(m => {
                this.messages.push(m);
                const item = document.createElement('p');
                item.innerHTML = m.msg;
                if (m.logType === 0) item.classList.add('info');
                else if (m.logType === 1) item.classList.add('warning');
                else if (m.logType === 2) item.classList.add('error');
                this._renderMessage(item);
            });
            return true;
        }
        return false;
    }

    addMessage(message, logType = 0) {
        if (message !== '') {
            this.messages.push('messages', { msg: message, logType: logType });
            const item = document.createElement('p');
            item.innerHTML = message;
            if (logType === 0) item.classList.add('info');
            else if (logType === 1) item.classList.add('warning');
            else if (logType === 2) item.classList.add('error');
            else item.classList.add('info');
            this._renderMessage(item);
            return true;
        }
        return false;
    }

    _renderMessage(item) {
        if (this.$.messages.hasChildNodes) {
            this.$.messages.insertBefore(item, this.$.messages.firstChild);
        } else {
            this.$.messages.appendChild(item);
        }
    }

    clearMessages() {
        this.messages = [];
        this.$.messages.innerHTML = '';
        return true;
    }

    _reload() {
        document.location.reload();
    }

    sigApplyCSSValue(cssObj) {
        super.sigApplyCSSValue(cssObj);
        this._checkCSSValue();
    }

    sigRemoveCSSValue(property) {
        super.sigRemoveCSSValue(property);
        this._checkCSSValue();
    }

    _checkCSSValue(enableSpinner = false) {
        const style = window.getComputedStyle(this);

        if (style.getPropertyValue('--theme-sig-control-splash-screen-spinner-background-image') === '') this.usespinnerimage = false;
        else this.usespinnerimage = true;
        if (style.getPropertyValue('--theme-sig-control-splash-screen-reload-button-background-image') === '') this.usereloadimage = false;
        else this.usereloadimage = true;

        const animationName = style.getPropertyValue('--theme-sig-control-splash-screen-animation-name');
        if (typeof animationName === 'string') this.animationname = animationName;

        if (enableSpinner) {
            setTimeout(() => {
                this.$.spinnerwrapper.style.display = 'block';
            }, 100);
        }
    }

    _enableAnimation(force = false) {
        if (!this.isdesignmode || force) {
            this.$.spinner.classList.add('animation');
            this.$.spinnerimage.classList.add('animation');
            this.isanimated = true;
        }
    }

    _disableAnimation(force = false) {
        if (!this.isdesignmode || force) {
            this.$.spinner.classList.remove('animation');
            this.$.spinnerimage.classList.remove('animation');
            this.isanimated = false;
        }
    }

    _toggleAnimationName(newval, oldval) {
        if (newval && oldval) { 
            this.style.setProperty('--theme-sig-control-splash-screen-animation-name', newval);
        }
    }

    _forceAnimation(newval, oldval) {
        if (this.isdesignmode) {
            if (newval && !this.isanimated) {
                this._enableAnimation(true);
                setTimeout(() => {
                    this.forceanimation = false;
                }, 20000);
            } else if (newval === false && this.isanimated) {
                this._disableAnimation(true);
            }
        }
    }
}
customElements.define(LasalRuntimeSigSplashScreen.is, LasalRuntimeSigSplashScreen);