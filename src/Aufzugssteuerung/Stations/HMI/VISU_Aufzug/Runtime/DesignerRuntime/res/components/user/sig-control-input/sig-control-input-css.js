const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
            :host sig-control-input {
                --theme-sig-control-input-background-color: --palette-default-color253;
                // --theme-sig-control-input-value-background-color: --palette-default-color246;
                --theme-sig-control-input-value-active-color: -palette-default-color254;
                --theme-sig-control-input-value-active-background-color: --palette-default-color240;
                
                --theme-sig-control-input-font-size: 11px;
                --theme-sig-control-input-color: --palette-default-color228;
                --theme-sig-control-input-border-color: --palette-default-color228;
                --theme-sig-control-input-border-width: 1px;
                --theme-sig-control-input-border-style: solid;
                --theme-sig-control-input-margin-leftright: 0px;
                --theme-sig-control-input-margin-top: 0px;
                --theme-sig-control-input-shadow-color: --palette-default-color254;
                --theme-sig-control-input-pressed-shadow-color: --palette-default-color254;
                --theme-sig-control-input-background-color-stop: --palette-default-color255;
                --theme-sig-control-input-border-color-stop: --palette-default-color255;
                --theme-sig-control-input-value-active-background-color-stop: --palette-default-color255;
                --theme-sig-control-input-activ-border-color: --palette-default-color228;
                --theme-sig-control-input-activ-border-color-stop: --palette-default-color255;

            }
        </style>
        <style id="lvdtemplate">
        :host sig-control-input {
            --theme-sig-element-width: initial;
            --theme-sig-element-height: initial;
        }
        /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-input-css');
export {};
//# sourceMappingURL=sig-control-input-css.js.map