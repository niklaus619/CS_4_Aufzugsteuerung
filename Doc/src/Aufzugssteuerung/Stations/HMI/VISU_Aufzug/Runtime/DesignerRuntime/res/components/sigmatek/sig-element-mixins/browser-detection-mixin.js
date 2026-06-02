import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';

export const BrowserDetectionMixin = dedupingMixin((superClass) => {

    const baseElement = superClass.__baseElement;
    return class extends superClass {

        static get properties() {
            switch (baseElement) {
                case 'LitElement':
                    return {
                        ismobile: {
                            type: Boolean,
                            reflect: true
                        }
                    };
                case 'PolymerElement':
                default:
                    return {
                        ismobile: {
                            type: Boolean,
                            value: false,
                            reflectToAttribute: true
                        }
                    };
            }
        }

        constructor() {
            super();
            this.browserApi = (window.sigApi) ? window.sigApi.browser : undefined;
            this.ismobile = this.isMobile();
        }

        getScreenMode() {
            if (this.browserApi) {
                return this.browserApi.getScreenMode();
            }
        }

        isAppleMobile() {
            if (this.browserApi) {
                return this.browserApi.isAppleMobile();
            }
        }

        isMobileSafari() {
            if (this.browserApi) {
                return this.browserApi.isAppleMobile() && this.browserApi.isSafari();
            }
        }

        isChromeAndroid() {
            if (this.browserApi) {
                return this.browserApi.isAndroidMobile() && this.browserApi.isChrome();
            }
        }

        isMobile() {
            if (this.browserApi) {
                return this.browserApi.isMobile();
            }
            if (typeof window.orientation !== 'undefined') {
                return true;
            }
            return false;
        }

        isChrome() {
            return (this.browserApi) ? this.browserApi.isChrome() : undefined;
        }

        isSafari() {
            return (this.browserApi) ? this.browserApi.isSafari() : undefined;
        }

        isFirefox() {
            return (this.browserApi) ? this.browserApi.isFirefox() : undefined;
        }

        isiPhone() {
            return (this.browserApi) ? this.browserApi.isiPhone() : undefined;
        }

        isiPad() {
            return (this.browserApi) ? this.browserApi.isiPad() : undefined;
        }
    };
});
BrowserDetectionMixin.mixinName = 'BrowserDetectionMixin';
