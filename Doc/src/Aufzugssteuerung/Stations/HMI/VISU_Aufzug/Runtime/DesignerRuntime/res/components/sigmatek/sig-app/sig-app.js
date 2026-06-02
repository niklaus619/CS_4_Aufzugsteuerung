import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import { DragDropSupportApp } from '../sig-element-mixins/drag-drop-support-mixin.js';
import * as Gestures from '../../../../rt/node_modules/@polymer/polymer/lib/utils/gestures.js';

class LasalRuntimeAppElement extends DragDropSupportApp(LasalRuntimeSigElement) {
    static get is() {
        return "sig-app";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style>
        :host {
        
        color: var(--theme-sig-app-color, inherit);
        background-color: var(--theme-sig-app-background-color, transparent);
        background-image: var(--theme-sig-app-background-image, none);
        background-repeat: var(--theme-sig-app-background-repeat, repeat);
        border: var(--theme-sig-app-border, none);

        
        display: var(--theme-sig-app-display, block);
        position: var(--theme-sig-app-position, absolute);
        top: var(--theme-sig-app-top, 0);
        left: var(--theme-sig-app-left, 0);
        width: var(--theme-sig-element-width, 100%);
        height: var(--theme-sig-element-height, 100%);
        margin: var(--theme-sig-app-margin, 0);
        padding: var(--theme-sig-app-padding, 0);
        overflow: var(--theme-sig-app-overflow, hidden);

        
        zoom: 1;
        z-index: 1;
        }

        :host * {
        
        @apply --notextselect;
        margin: 0;
        padding: 0;
        }

        .clearfix:after {
         @apply --clearfix;
        }

        .sig-app {
        height: 100%;
        width: 100%;
        background-color: var(--theme-sig-app-background-color, transparent);
        }

        

        .sig-app:before {
        position: absolute;
        z-index: 10000000000000;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        background-color: transparent;
        content: ' ';
    }
    </style>
    <div class="sig-app clearfix">
        <slot>
        </slot>
    </div>
    `;
    }

    static get properties() {
        return {
            usescaling: {
                type: Boolean,
                value: true
            },
            use3dscaling: {
                type: Boolean,
                value: true
            },
            allowZooming: {
                type: Boolean,
                value: false
            },
            view: {
                type: String,
                value: null,
                reflectToAttribute: true
            },
            tabTitle: {
                type: String,
                value: null,
                observer: '_tabTitleChanged'
            }
        };
    }

    static get importMeta() {
        return import.meta;
    }

    constructor() {
        super();
        this.appChangedOrientation = false;
        this.firstResizeDone = false;
        this.lastTouchTimestamp = 0;
        this.visualViewportIsScaled = false;
        this.inputClickListenerBound = false;
        this.viewPortMeta = document.querySelector('meta[name="viewport"]');
        if (this.viewPortMeta instanceof HTMLElement && this.viewPortMeta.content && !this.viewPortMeta.content.includes('user-scalable=no')) this.allowZooming = true;
    }

    ready() {
        super.ready();
        SigPolymer.afterNextRender(this, function () {
            log.info('[Polymer] APP rendering complete');
            this._onResizeApp(false, undefined, 'Intit');


            if (this.allowZooming) {
                if (this.isFirefox() && !this.isAppleMobile()) {
                    Gestures.setTouchAction(this, 'manipulation');
                } else {
                    Gestures.setTouchAction(this, 'pan-x pan-y pinch-zoom');
                }
            }
        });

        if (!this.isdesignmode) {
            const isMobile = this.isMobile();
            const isAppleMobile = this.isAppleMobile();
            const isSafari = this.isMobileSafari();
            const screenMode = this.getScreenMode();

            if (!isAppleMobile) {
                this.sigAddEventListener('resize', (evt) => {
                    this._onResizeApp(false, evt, 'resizeHandler');
                }, 'jsEvent', window);
            }

            if (isMobile) {
                this.sigAddEventListener('orientationchange', (evt) => {
                    if (isAppleMobile) {
                        this.sigSetTimeout(() => {
                            this._onResizeApp(true, evt, 'orientationChangeHandler');
                        }, 50);
                    } else {
                        this.appChangedOrientation = true;
                    }
                    log.debug('App orientation changed, viewport will be resized!');
                }, 'jsEvent', window);
            }

            if (isAppleMobile) {
                this.sigAddEventListener('click', (evt) => {
                    evt.preventDefault();
                    log.debug('Prevented double-tap zooming!');
                }, 'jsEvent', document, {
                    passive: false
                });

                this.sigAddEventListener('dblclick', (evt) => {
                    evt.preventDefault();
                    log.debug('Prevented double-tap zooming!');
                }, 'jsEvent', document, {
                    passive: false
                });
            }

            if (isAppleMobile && !this.allowZooming) {
                this.sigAddEventListener('touchmove', (evt) => {
                    if (evt.scale !== 1) evt.preventDefault();
                    log.debug('Prevented pinch/zoom!');
                }, 'jsEvent', document, {
                    passive: false
                });
            }

            if (isAppleMobile && this.allowZooming) {
                this.sigAddEventListener('touchstart', (evt) => {
                    if (this.isiPad() && this.isSafari() && visualViewport.scale !== 1) {
                        this.visualViewportIsScaled = true;
                    }
                }, 'jsEvent', document, {
                    passive: true
                });
                this.sigAddEventListener('touchend', (evt) => {
                    if (this.isiPad() && this.isSafari() && this.visualViewportIsScaled && visualViewport.scale <= 1) {
                        this.sigSetTimeout(() => {
                            this._onResizeApp(true, evt, 'touchendHandler');
                        }, 300);
                    }
                }, 'jsEvent', document, {
                    passive: true
                });
            }

            if (this.allowZooming) {
                this.sigAddEventListener('touchmove', (evt) => {
                    if (this.isdragmode) {
                        if (evt.touches.length === 1 && evt.target.isdraggable) evt.preventDefault();
                        log.debug('Prevented pinch/zoom while dragging!');
                    }
                }, 'jsEvent', document, {
                    passive: false
                });
            }

            const urlParams = new URLSearchParams(window.location.search);
            if (!urlParams.has('enableContext')) {
                this.sigAddEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    log.debug('Prevented rightclick menue on touch device!');
                    return false;
                });
            }
        }

        this.sigAddEventListener('wheel', (e) => {
            if (!this.isdesignmode && e.ctrlKey) {
                e.preventDefault();
                e.stopPropagation();
                log.debug('Prevented zoom of viewport via ctr+scroll!');
                return false;
            }
        }, 'jsEvent', document.body, { passive: false }
        );

        this.sigAddEventListener('keydown', (e) => {
            if (!this.isdesignmode && e.ctrlKey && (e.keyCode === 173 || e.keyCode === 171 || e.keyCode === 189 || e.keyCode === 187 || e.keyCode === 107 || e.keyCode === 109)) {
                e.preventDefault();
                e.stopPropagation();
                log.debug('Prevented zoom of viewport via ctr+plus or ctrl+minus!');
                return false;
            }
        }, 'jsEvent', window);
    }

    _onResizeApp(force = false, evt, origin = '') {
        if (!this.isdesignmode) { 
            if (this.ismobile && this.firstResizeDone && !this.appChangedOrientation && !force) return;
            let widthW = parseInt(document.documentElement.clientWidth, 10);
            let heightW = parseInt(document.documentElement.clientHeight, 10);
            let widthApp = parseInt(this.style.width, 10);
            let heightApp = parseInt(this.style.height, 10);

            const scale1 = widthW / widthApp;
            const scale2 = heightW / heightApp;
            let scale, factor;

            if (this.usescaling) {
                factor = Math.round(((scale1 < scale2) ? scale1 : scale2) * 100) / 100;
            } else {
                factor = 1;
            }
            if (this.use3dscaling) {
                scale = `scale3d(${factor},${factor},1)`;
            } else {
                scale = `scale(${factor})`;
            }

            if (this.usescaling && (this._appShouldResize(evt) || !this.firstResizeDone)) {
                if (this.isMobile() && this.allowZooming) this._resetViewport();
                this.style.setProperty('-webkit-transform', scale);
                this.style.setProperty('-ms-transform', scale);
                this.style.setProperty('transform', scale);

                this.style.setProperty('-webkit-transform-origin', 'top left');
                this.style.setProperty('-ms-transform-origin', 'top left');
                this.style.setProperty('transform-origin', 'top left');

                this.visualViewportIsScaled = false;
                log.debug(`Viewport resized, transform updated to "${scale}"!`);
            } else {
                this.style.setProperty('transform', '');
            }
            this.appChangedOrientation = false;
            this.firstResizeDone = true;
        }
    }

    _resetViewport() {
        this._setViewportMetatag('device-width', undefined, 1.001, 1.001, 1);
        this._setViewportMetatag('device-width', undefined, 1, 1, 6);
    }

    _setViewportMetatag(width, height, initialScale, minimumScale, maximumScale, isUserScaleable = true) {
        let value = '';
        if (width) value += `width=${width}`;
        if (height) value += `, height=${height}`;
        if (initialScale) value += `, initial-scale=${initialScale}`;
        if (minimumScale) value += `, minimum-scale=${minimumScale}`;
        if (maximumScale) value += `, maximum-scale=${maximumScale}`;
        if (!isUserScaleable) value += `, user-scalable=no`;
        if (this.viewPortMeta instanceof HTMLElement && value.length > 0) {
            this.viewPortMeta.setAttribute('content', value);
            log.debug(`Updated viewport metatag content to "${value}"`);
        }
    }

    _preventDoubleTapTouch(evt) {
        if (evt instanceof TouchEvent) {
            const t2 = evt.timeStamp;
            const t1 = this.lastTouchTimestamp || t2;
            const dt = t2 - t1;
            const fingers = evt.touches.length;
            this.lastTouchTimestamp = t2;
            if (!dt || dt >= 300 || fingers > 1) return;
            this.lastTouchTimestamp = 0;
            evt.preventDefault();
            log.debug('Prevented double tap touch gesture!');
        }
    }

    _appShouldResize(evt) {
        if (this.isiPad() && this.isSafari() && this.getScreenMode() === 'browser' && visualViewport.scale !== 1) {
            return false;
        }
        return true;
    }

    _tabTitleChanged(newTabTitle, oldTabTitle) {
        if (typeof newTabTitle === 'string') {
            if (newTabTitle.length === 0) {
                document.title = '\u200E';
            } else {
                document.title = newTabTitle;
            }
        }
    }

}
customElements.define(LasalRuntimeAppElement.is, LasalRuntimeAppElement);
