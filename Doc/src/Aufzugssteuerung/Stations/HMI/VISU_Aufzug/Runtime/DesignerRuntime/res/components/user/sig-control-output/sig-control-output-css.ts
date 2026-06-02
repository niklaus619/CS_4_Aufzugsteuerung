import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";
const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host sig-control-output {
                --theme-sig-control-output-background-color: --palette-default-color231;
                --theme-sig-control-output-background-color-stop: --palette-default-color255;
                --theme-sig-control-output-color: --palette-default-color253;
                --theme-sig-control-output-font-size: 11px;
                --theme-sig-control-output-border-color: --palette-default-color255;
                --theme-sig-control-output-border-color-stop: --palette-default-color255;
                --theme-sig-control-output-shadow-color: --palette-default-color254;
                --theme-sig-control-output-border-radius: 3px; 
                --theme-sig-control-output-unit-color: --palette-default-color253;
            }
        </style>
        <style id="lvdtemplate">
        :host sig-control-output {
            --theme-sig-element-height: initial;
            --theme-sig-element-width: initial;
        }
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-output-css');