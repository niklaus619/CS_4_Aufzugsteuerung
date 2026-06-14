const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style id="lvddefault">
        :host sig-control-button {
            --theme-sig-control-fast-button-background-color: --palette-default-color228;
            --theme-sig-control-fast-button-background-color-stop: --palette-default-color224;
            --theme-sig-control-fast-button-color: --palette-default-color253;
            --theme-sig-control-fast-button-border-color: --palette-default-color228;
            --theme-sig-control-fast-button-border-color-stop: --palette-default-color255;
            --theme-sig-control-fast-button-shadow-color: --palette-default-color254;

            --theme-sig-control-fast-button-pressed-background-color: --palette-default-color229;
            --theme-sig-control-fast-button-pressed-background-color-stop: --palette-default-color225;
            --theme-sig-control-fast-button-pressed-color: --palette-default-color228;
            --theme-sig-control-fast-button-pressed-border-color: --palette-default-color229;
            --theme-sig-control-fast-button-pressed-border-color-stop: --palette-default-color255;
            --theme-sig-control-fast-button-pressed-shadow-color: --palette-default-color254;
        }
    </style>
    <style id="lvdtemplate">
        /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
</template>`;
styleElement.register('sig-control-fast-button-css');
export {};
//# sourceMappingURL=sig-control-fast-button-css.js.map