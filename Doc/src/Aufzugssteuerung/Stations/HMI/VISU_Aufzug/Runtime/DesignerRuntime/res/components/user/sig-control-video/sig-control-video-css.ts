			
import type { DomModule } from "../../sigmatek/sig-element/sig-element-polymer.js";
			
const styleElement: DomModule = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
    <style id="lvddefault">
            :host sig-control-video {
                --theme-sig-control-video-background-color:--palette-default-color255;
                --theme-sig-control-video-border-color:--palette-default-color255;
            }
        </style>
        <style id="lvdtemplate">
        /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
    </template>
    `;
styleElement.register('sig-control-video-css');