const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
            :host sig-control-mediacontainer {
                --theme-sig-control-mediacontainer-background-color: --palette-default-color255;
                --theme-sig-control-mediacontainer-border-color: --palette-default-color255;
            }
        </style>
        <style id="lvdtemplate">
        /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>`;
styleElement.register('sig-control-mediacontainer-css');
export {};
//# sourceMappingURL=sig-control-mediacontainer-css.js.map