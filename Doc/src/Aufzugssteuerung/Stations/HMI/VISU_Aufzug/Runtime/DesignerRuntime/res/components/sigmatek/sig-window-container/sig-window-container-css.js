const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>    
        <style id="lvddefault">
            :host sig-window-container {
                
                
                
                
                
                --theme-sig-window-panel-hdr-background-color: --palette-default-color240;
                --theme-sig-window-panel-hdr-color: --palette-default-color252;

                
                --theme-sig-window-panel-content-background-color: --palette-default-color253;
                --theme-sig-window-panel-border-color: --palette-default-color248;
                --theme-sig-window-panel-content-border-top-color: --palette-default-color248;
            }
        </style>
        <style id="lvdtemplate">
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
`;
styleElement.register('sig-window-container-css');