const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
            :host sig-control-image {
                --theme-sig-control-image-background-color: --palette-default-color255;
                --theme-sig-control-image-border-color: --palette-default-color255;
            }
        </style>
        <style id="lvdtemplate">
        :host sig-control-image {
            --theme-sig-element-width: initial;
            --theme-sig-element-height: initial;
        }
        /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>`;
styleElement.register('sig-control-image-css');
export {};
//# sourceMappingURL=sig-control-image-css.js.map