const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host sig-control-text {
                --theme-sig-control-text-value-padding: 3px;
                --theme-sig-control-text-color: --palette-default-color228;
                --theme-sig-control-text-font-size: 11px;
                --theme-sig-control-text-background-color: --palette-default-color255;
                --theme-sig-control-text-border-color: --palette-default-color255;
            }
        </style>
        <style id="lvdtemplate">
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-text-css');
export {};
//# sourceMappingURL=sig-control-text-css.js.map