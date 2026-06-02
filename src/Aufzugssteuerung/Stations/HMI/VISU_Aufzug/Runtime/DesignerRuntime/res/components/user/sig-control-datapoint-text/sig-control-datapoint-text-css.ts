import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";
const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host sig-control-datapoint-text {
                --theme-sig-control-datapoint-text-value-padding: 3px;
                --theme-sig-control-datapoint-text-color: --palette-default-color253;
                --theme-sig-control-datapoint-text-background-color: --palette-default-color231;
                --theme-sig-control-datapoint-text-border-color: --palette-default-color255;
                --theme-sig-control-datapoint-text-font-size: 11px;
                --theme-sig-control-datapoint-text-neon-color-1: --palette-default-color253;
                --theme-sig-control-datapoint-text-neon-color-2: --palette-default-color253;
            }
        </style>
        <style id="lvdtemplate">
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-datapoint-text-css');