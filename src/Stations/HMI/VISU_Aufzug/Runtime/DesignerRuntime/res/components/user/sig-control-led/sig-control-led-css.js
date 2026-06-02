const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
        :host sig-control-led {
            --theme-sig-control-led-background-color: --palette-default-color246;
            --theme-sig-control-led-border-width: 1px;
            --theme-sig-control-led-border-color: --palette-default-color253;
            --theme-sig-control-led-border-style: solid;
            --theme-sig-control-led-border-radius-top-left: 2px;
            --theme-sig-control-led-border-radius-top-right: 2px;
            --theme-sig-control-led-border-radius-bottom-right: 2px;
            --theme-sig-control-led-border-radius-bottom-left: 2px;
            --theme-sig-control-led-background-image: none;
            --theme-sig-control-led-background-position-x: center;
            --theme-sig-control-led-background-position-y: center;
            --theme-sig-control-led-background-size: cover;
            --theme-sig-control-led-pressed-background-color: --palette-default-color239;
            --theme-sig-control-led-pressed-background-image: inherit;    
        }
        </style>
        <style id="lvdtemplate">
        :host sig-control-led{
                --theme-sig-element-top: initial;
                --theme-sig-element-left: initial;
                --theme-sig-element-height: initial;
                --theme-sig-element-width: initial;
            }
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-led-css');
export {};
//# sourceMappingURL=sig-control-led-css.js.map