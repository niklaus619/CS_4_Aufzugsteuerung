const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style id="lvddefault">
        :host sig-control-state-led {
            --theme-sig-control-state-led-background-color: --palette-default-color231;
            --theme-sig-control-state-led-border-color: --palette-default-color231;
            --theme-sig-control-state-led-pressed-background-color: --palette-default-color229;
        }
    </style>
    <style id="lvdtemplate">
        :host sig-control-state-led {
            --theme-sig-element-top: initial;
            --theme-sig-element-left: initial;
            --theme-sig-element-height: initial;
            --theme-sig-element-width: initial;
        }
        /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
</template>`;
styleElement.register('sig-control-state-led-css');
export {};
//# sourceMappingURL=sig-control-state-led-css.js.map