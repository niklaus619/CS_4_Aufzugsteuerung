const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host sig-control-button {
                
                --theme-sig-control-button-font-size: 11px;
                
                --theme-sig-control-button-background-color: --palette-default-color228;
                --theme-sig-control-button-background-color-stop: --palette-default-color224;
                --theme-sig-control-button-color: --palette-default-color253;

                --theme-sig-control-button-border-color: --palette-default-color228;
                --theme-sig-control-button-border-color-stop: --palette-default-color255;
                --theme-sig-control-button-shadow-color: --palette-default-color254;

                --theme-sig-control-button-pressed-background-color: --palette-default-color229;
                --theme-sig-control-button-pressed-background-color-stop: --palette-default-color225;
                --theme-sig-control-button-pressed-color: --palette-default-color228;
                --theme-sig-control-button-pressed-border-color: --palette-default-color229;
                --theme-sig-control-button-pressed-border-color-stop: --palette-default-color255;
                
                --theme-sig-control-button-shadow-color: --palette-default-color254;
                --theme-sig-control-button-pressed-shadow-color: --palette-default-color254;
            }
        </style>
        <style id="lvdtemplate">
        :host sig-control-button {
            --theme-sig-element-height: initial;
            --theme-sig-element-width: initial;
        }
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-button-css');
export {};
//# sourceMappingURL=sig-control-button-css.js.map