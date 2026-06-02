import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class LasalRuntimeDashboardElement extends LasalRuntimeSigElement {

    static get is() {
        return "sig-dashboard";
    }

    static get importMeta() {
        return import.meta;
    }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
            :host {
                
                color: var(--theme-sig-dashboard-color, inherit);
                background-color: var(--theme-sig-dashboard-background-color, transparent);

                
                display: var(--theme-sig-dashboard-display, block);
                position: var(--theme-sig-dashboard-position, absolute);
                top: var(--theme-sig-dashboard-top, 0);
                left: var(--theme-sig-dashboard-left, 0);
                width: var(--theme-sig-dashboard-width, var(--theme-sig-element-width, 0));
                height: var(--theme-sig-dashboard-height, var(--theme-sig-element-height, 0));
                margin: var(--theme-sig-dashboard-margin, 0);
                padding: var(--theme-sig-dashboard-padding, 0);
                overflow: var(--theme-sig-dashboard-overflow, visible);
            }

            :host * {
                
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .sig-dashboard {
                position: relative;
                height: 100%;
                width: 100%;
            }

            :host([globalscreen][shaded]) ::slotted(*) {
                filter: sepia() !important;
                opacity: .4 !important;
            }

            :host([globalscreen]:not([shaded])) ::slotted(*) {
                
                opacity: 1 !important;
                filter: none !important;
            }

            :host([hidden]) {
                display: none;
            }
        </style>
        <div class="sig-dashboard">
            <slot></slot>
        </div>`;
    }

    static get properties() {
        return {
            globalscreen: {
                value: false,
                type: Boolean,
                reflectToAttribute: true,
            },
            shaded: {
                value: false,
                type: Boolean,
                reflectToAttribute: true,
            },
            hidden: {
                value: false,
                type: Boolean,
                reflectToAttribute: true
            }
        };
    }

    ready() {
        super.ready();
        SigPolymer.afterNextRender(this, function () {
            log.info('[Polymer] Dashboard rendering complete');
        });
    }
}

customElements.define(LasalRuntimeDashboardElement.is, LasalRuntimeDashboardElement);
