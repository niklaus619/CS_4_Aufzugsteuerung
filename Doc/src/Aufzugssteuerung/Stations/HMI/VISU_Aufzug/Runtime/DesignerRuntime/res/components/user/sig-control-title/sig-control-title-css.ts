import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";

const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style id="lvddefault">
            :host sig-control-title {
                --theme-sig-control-title-color: --palette-default-color253;
                --theme-sig-control-title-background-color: --palette-default-color255;
                --theme-sig-control-title-border-color: --palette-default-color255;
                --theme-sig-control-title-shadow-neon-color-1: --palette-default-color253;
                --theme-sig-control-title-shadow-neon-color-2: --palette-default-color230;
            }
        </style>
        <style id="lvdtemplate">
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
</template>`;
styleElement.register('sig-control-title-css');