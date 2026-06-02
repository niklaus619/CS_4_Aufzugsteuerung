const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
            :host sig-designer-placeholder {
                --theme-sig-deisgner-placeholder-background-color: --palette-default-color236;
                --theme-sig-deisgner-placeholder-color: --palette-default-color253;
                --theme-sig-deisgner-placeholder-font-size: 11px;
            }
        </style>
    <style id="lvdtemplate">
    /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
    </template>
`;
styleElement.register('sig-designer-placeholder-css');