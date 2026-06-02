import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";

const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
        :host sig-control-menu-input {
                
                --theme-sig-control-menu-input-background-color: --palette-default-color246;
                --theme-sig-control-menu-input-pressed-background-color: --palette-default-color246;
                
                --theme-sig-control-menu-input-border-color: --palette-default-color254;
                --theme-sig-control-menu-input-border-color-stop: --palette-default-color254;
                --theme-sig-control-menu-input-pressed-border-color: --palette-default-color254;
                --theme-sig-control-menu-input-pressed-border-color-stop: --palette-default-color254;

                
                --theme-sig-control-menu-input-caretdown-width: 25px;
                --theme-sig-control-menu-input-caretdown-background-color:--palette-default-color247;
                --theme-sig-control-menu-input-caretdown-pressed-background-color: --palette-default-color247;

                --theme-sig-control-menu-input-color: --palette-default-color252;
                --theme-sig-control-menu-input-shadow-color: --palette-default-color254;
                --theme-sig-control-menu-input-pressed-color:  --palette-default-color252;
                --theme-sig-control-menu-input-pressed-shadow-color: --palette-default-color254;
            }
            </style>
            <style id="lvdtemplate">
            :host sig-control-menu-input {
                --theme-sig-element-height: initial;
                --theme-sig-element-width: initial;
            }
            /*! @@lvdstyles */
        </style>
            <style id="development">
            </style>
    </template>`;
styleElement.register('sig-control-menu-input-css');