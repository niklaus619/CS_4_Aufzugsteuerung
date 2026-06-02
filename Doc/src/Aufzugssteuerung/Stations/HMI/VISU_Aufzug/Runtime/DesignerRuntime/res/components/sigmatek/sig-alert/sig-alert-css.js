const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
            :host sig-alert {
                
            }
    </style>
    <style id="lvdtemplate">
    /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
    </template>
    `;
styleElement.register('sig-alert-css');