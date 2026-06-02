const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
    :host sig-app {
            --theme-sig-app-background-color: --palette-default-color250;
        }
     </style>
    <style id="lvdtemplate">
    /*! @@lvdstyles */
    </style>
    <style id="development">    
    </style>
    </template>`;
styleElement.register('sig-app-css');
