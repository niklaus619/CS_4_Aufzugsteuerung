const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host sig-control-splash-screen {
                
                --theme-sig-control-splash-screen-background-color: --palette-default-color250;
                --theme-sig-control-splash-screen-spinner-color:--palette-default-color246;
                --theme-sig-control-splash-screen-reload-button-background-color: --palette-default-color251;
                --theme-sig-control-splash-screen-reload-button-border-style: solid;
                --theme-sig-control-splash-screen-reload-button-border-width: 1px;
                --theme-sig-control-splash-screen-reload-button-border-color: --palette-default-color254;
                --theme-sig-control-splash-screen-reload-button-color: --palette-default-color240;
                --theme-sig-control-splash-screen-msg-info-color: --palette-default-color237;
                --theme-sig-control-splash-screen-msg-warning-background-color : --palette-default-color238;
                --theme-sig-control-splash-screen-msg-warning-color: --palette-default-color254;
                --theme-sig-control-splash-screen-msg-error-background-color: --palette-default-color235;
                --theme-sig-control-splash-screen-msg-error-color: --palette-default-color237;
                --theme-sig-control-splash-screen-animation-duration: 1s;
            }
        </style>
        <style id="lvdtemplate">
        /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-splash-screen-css');