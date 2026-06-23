const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style id="lvddefault">
        :host sig-control-switch-button2 {
            --theme-sig-control-switch-button2-track-color: --palette-default-color231;
            --theme-sig-control-switch-button2-track-color-active: --palette-default-color229;

            --theme-sig-control-switch-button2-thumb-color: --palette-default-color253;
            --theme-sig-control-switch-button2-thumb-color-active: --palette-default-color253;

            --theme-sig-control-switch-button2-text-on-color: --palette-default-color228;
            --theme-sig-control-switch-button2-text-off-color: --palette-default-color253;
        }
    </style>
    <style id="lvdtemplate">
        /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
</template>`;
styleElement.register('sig-control-switch-button2-css');
export {};
//# sourceMappingURL=sig-control-switch-button2-css.js.map