import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";

const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style id="lvddefault">
        :host sig-control-rectangle {
            --theme-sig-control-rectangle-border-width: 1px;
            --theme-sig-control-rectangle-border-style: solid;
            --theme-sig-control-rectangle-border-color: --palette-default-color253;
            --theme-sig-control-rectangle-background-color: --palette-default-color255;
        }
    </style>
    <style id="lvdtemplate">
        /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
</template>`;
styleElement.register('sig-control-rectangle-css');