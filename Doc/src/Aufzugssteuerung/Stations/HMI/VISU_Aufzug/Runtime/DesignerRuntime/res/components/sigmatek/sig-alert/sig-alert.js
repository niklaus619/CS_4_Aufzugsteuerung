import { PolymerElement, html } from '../../../../rt/node_modules/@polymer/polymer/polymer-element.js';
import { afterNextRender } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/render-status.js';
import { GestureEventListeners } from '../../../../rt/node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../../../../rt/node_modules/@polymer/polymer/lib/elements/dom-repeat.js';
import '../../../../rt/node_modules/@webcomponents/shadycss/entrypoints/apply-shim.js';

class LasalRuntimeSigAlert extends GestureEventListeners(PolymerElement) {
    static get is() {
        return "sig-alert";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return html`
        <style>
        :host * {
            
            @apply --notextselect;
            margin: 0;
            padding: 0;
        }

        :host {
            
            color: var(--theme-sig-alert-color, #fff);
            background-color: var(--theme-sig-alert-background-color, rgba(187, 2, 33, 0.7));
            background-image: var(--theme-sig-alert-background-image, none);
            border-style: var(--theme-sig-alert-border-style, none);
            border-width: var(--theme-sig-alert-border-width, 0px);
            border-color: var(--theme-sig-alert-border-color, transparent);
            
            display: var(--theme-sig-alert-display, block);
            width: var(--theme-sig-alert-width, 100%);
            height: var(--theme-sig-alert-height, 100%);
            margin: var(--theme-sig-alert-margin, 0);
            padding: var(--theme-sig-alert-padding, 0);
            position: fixed;
            overflow: hidden;
            z-index: 2147483600;
        }

        :host([hidden]) {
            display: none;
        }

        .clearfix:after {
            
            @apply --clearfix
        }

        .sig-alert {
            position: relative;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }

        .sig-alert-header {
            position: absolute;
            text-align: center;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 70px;
            color: black;
            background: white;
            border: 2px solid black;
            overflow: hidden;
        }

        .sig-alert-title {
            position: absolute;
            line-height: 70px;
            font-size: 30px;
            font-weight: bold;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            overflow: hidden;
        }

        .sig-alert-messages {
            position: absolute;
            top: 74px;
            left: 0;
            width: 100%;
            height: calc(100% - 74px);
            overflow: auto;
        }

        .sig-alert-text {
            text-align: center;
            line-height: 30px;
            font-size: 20px;
            font-weight: bold;
            
            margin-top: 20px !important ;
        }

        #alertreload {
            position:absolute;
            right:0;
            top:0;
            cursor: pointer;
            margin: 10px 10px 20px 0;
        }

        .fa-reload:before {
            @apply --symbol;
            content: "\\f2f9";
            font-size:50px;
        }
    </style>
    <div class='sig-alert'>
        <div id="alertheader" class="sig-alert-header">
            <div id="alerttitle" class="sig-alert-title">[[alerttitle]]</div>
            <div id="alertreload" on-tap="_reload"><i class="fa-reload"></i></div>
        </div>
        <div class="sig-alert-messages">
            <dom-repeat items="[[alertArray]]" as="alertItem">
                <template>
                    <div class="sig-alert-text">
                        [[alertItem]]
                    </div>
                </template>
            </dom-repeat>
        </div>
        `;
    }

    static get properties() {
        return {
            alerttitle: {
                type: String,
                value: ''
            },
            hidden: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
            },
            alertArray: {
                type: Array,
                value: () => []
            }
        }
    }

    static get importMeta() {
        return import.meta;
    }

    ready() {
        super.ready();
        afterNextRender(this, function () {
            if (!this.isdesignmode) {
            }
            log.info('[Polymer] Alert rendering complete');
        });
    }

    show() {
        this.hidden = false;
    }

    hide() {
        this.alertArray = [];
        this.hidden = true;
    }

    clearAlert() {
        this.hide();
    }

    updateValue(message) {
        if (message === '') {
            this.hide();
        } else {
            this.show();
        }
        this.push('alertArray', message);
        this.alerttitle = 'Runtime Error';
    }

    _reload() {
        document.location.reload();
    }
}
customElements.define(LasalRuntimeSigAlert.is, LasalRuntimeSigAlert);
