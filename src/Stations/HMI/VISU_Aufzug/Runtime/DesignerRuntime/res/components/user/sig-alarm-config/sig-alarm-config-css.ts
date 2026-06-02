import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";
const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
<template>
    <style id="lvddefault">
    </style>
    <style id="lvdtemplate">
        /*! @@lvdstyles */
    </style>
    <style id="development">
    </style>
</template>`;
styleElement.register('sig-alarm-config-css'); 