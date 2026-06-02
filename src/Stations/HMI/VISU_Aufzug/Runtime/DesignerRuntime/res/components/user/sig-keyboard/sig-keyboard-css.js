const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host sig-keyboard {
                --theme-sig-keyboard-background-color: --palette-default-color250;

                
                
                --theme-sig-keyboard-keyshell-padding: 8px;
                --theme-sig-keyboard-keyshell-min-width: 200px;
                --theme-sig-keyboard-keyshell-padding-horizontal: 7px;
                --theme-sig-keyboard-keyshell-padding-vertical: 0px;
                --theme-sig-keyboard-layers-marging-bottom: 7px;

                
                --theme-sig-keyboard-disabled-overlay-background-color: --palette-default-color247;
                
                
                --theme-sig-keyboard-input-font-size: 17px;
                --theme-sig-keyboard-input-unit-font-size: 17px;
                --theme-sig-keyboard-input-inactive-background-color: --palette-default-color248;
                --theme-sig-keyboard-input-inactive-color: --palette-default-color252;
                --theme-sig-keyboard-input-inactive-bottom-color: --palette-default-color254;
                --theme-sig-keyboard-input-background-color: --palette-default-color240;
                --theme-sig-keyboard-input-color: --palette-default-color252;
                --theme-sig-keyboard-input-border-bottom-color: --palette-default-color254;
                --theme-sig-keyboard-input-invalid-bottom-color: --palette-default-color235;
                --theme-sig-keyboard-input-invalid-color: --palette-default-color253;
                --theme-sig-keyboard-input-invalid-background-color: --palette-default-color003;
                --theme-sig-keyboard-input-margin-top: 12px;
                --theme-sig-keyboard-input-margin-bottom: 8px;
                
                
                --theme-sig-keyboard-info-color: --palette-default-color248;

                
                --theme-sig-keyboard-type-background-color: --palette-default-color248;
                --theme-sig-keyboard-type-color: --palette-default-color252;
                
                
                --theme-sig-keyboard-key-margin-right: 0px;
                --theme-sig-keyboard-key-margin-bottom: 0px;
                --theme-sig-keyboard-key-font-size: 13px;
                --theme-sig-keyboard-key-background-color: --palette-default-color251;
                --theme-sig-keyboard-key-color: --palette-default-color248;
                --theme-sig-keyboard-key-border-top-width: 1px;
                --theme-sig-keyboard-key-border-top-style: solid;
                --theme-sig-keyboard-key-border-top-color: --palette-default-color254;
                --theme-sig-keyboard-key-border-left-width: 1px;
                --theme-sig-keyboard-key-border-left-style: solid;
                --theme-sig-keyboard-key-border-left-color: --palette-default-color254;
                --theme-sig-keyboard-key-border-right-width: 1px;
                --theme-sig-keyboard-key-border-right-style: solid;
                --theme-sig-keyboard-key-border-right-color: --palette-default-color254;
                --theme-sig-keyboard-key-border-bottom-width: 1px;
                --theme-sig-keyboard-key-border-bottom-style: solid;
                --theme-sig-keyboard-key-border-bottom-color: --palette-default-color254;
                --theme-sig-keyboard-key-border-radius: 0px;

                
                --theme-sig-keyboard-key-off-background-color: --palette-default-color251;
                --theme-sig-keyboard-key-off-color: --palette-default-color252;
                --theme-sig-keyboard-key-off-border-top-width: 1px;
                --theme-sig-keyboard-key-off-border-top-style: solid;
                --theme-sig-keyboard-key-off-border-top-color: --palette-default-color254;
                --theme-sig-keyboard-key-off-border-left-width: 1px;
                --theme-sig-keyboard-key-off-border-left-style: solid;
                --theme-sig-keyboard-key-off-border-left-color: --palette-default-color254;
                --theme-sig-keyboard-key-off-border-right-width: 1px;
                --theme-sig-keyboard-key-off-border-right-style: solid;
                --theme-sig-keyboard-key-off-border-right-color: --palette-default-color254;
                --theme-sig-keyboard-key-off-border-bottom-width: 1px;
                --theme-sig-keyboard-key-off-border-bottom-style: solid;
                --theme-sig-keyboard-key-off-border-bottom-color: --palette-default-color254;

                
                --theme-sig-keyboard-key-pressed-background-color: --palette-default-color240;
                --theme-sig-keyboard-key-pressed-color: --palette-default-color252;
                --theme-sig-keyboard-key-pressed-border-top-width: 1px;
                --theme-sig-keyboard-key-pressed-border-top-style: solid;
                --theme-sig-keyboard-key-pressed-border-top-color: --palette-default-color254;
                --theme-sig-keyboard-key-pressed-border-left-width: 1px;
                --theme-sig-keyboard-key-pressed-border-left-style: solid;
                --theme-sig-keyboard-key-pressed-border-left-color: --palette-default-color254;
                --theme-sig-keyboard-key-pressed-border-right-width: 1px;
                --theme-sig-keyboard-key-pressed-border-right-style: solid;
                --theme-sig-keyboard-key-pressed-border-right-color: --palette-default-color254;
                --theme-sig-keyboard-key-pressed-border-bottom-width: 1px;
                --theme-sig-keyboard-key-pressed-border-bottom-style: solid;
                --theme-sig-keyboard-key-pressed-border-bottom-color: --palette-default-color254;
               
                
                --theme-sig-keyboard-key-special-alpha-min-width: 50px;
                --theme-sig-keyboard-key-special-background-color: --palette-default-color250;
                --theme-sig-keyboard-key-special-color: --palette-default-color248;
                --theme-sig-keyboard-key-special-border-top-width: 1px;
                --theme-sig-keyboard-key-special-border-top-style: solid;
                --theme-sig-keyboard-key-special-border-top-color: --palette-default-color254;
                --theme-sig-keyboard-key-special-border-left-width: 1px;
                --theme-sig-keyboard-key-special-border-left-style: solid;
                --theme-sig-keyboard-key-special-border-left-color: --palette-default-color254;
                --theme-sig-keyboard-key-special-border-right-width: 1px;
                --theme-sig-keyboard-key-special-border-right-style: solid;
                --theme-sig-keyboard-key-special-border-right-color: --palette-default-color254;
                --theme-sig-keyboard-key-special-border-bottom-width: 1px;
                --theme-sig-keyboard-key-special-border-bottom-style: solid;
                --theme-sig-keyboard-key-special-border-bottom-color: --palette-default-color254;
                
                
                --theme-sig-keyboard-key-special-selected-background-color: --palette-default-color240;
                --theme-sig-keyboard-key-special-selected-color: --palette-default-color252;
                --theme-sig-keyboard-key-special-selected-border-top-width: 1px;
                --theme-sig-keyboard-key-special-selected-border-top-style: solid;
                --theme-sig-keyboard-key-special-selected-border-top-color: --palette-default-color254;
                --theme-sig-keyboard-key-special-selected-border-left-width: 1px;
                --theme-sig-keyboard-key-special-selected-border-left-style: solid;
                --theme-sig-keyboard-key-special-selected-border-left-color: --palette-default-color254;
                --theme-sig-keyboard-key-special-selected-border-right-width: 1px;
                --theme-sig-keyboard-key-special-selected-border-right-style: solid;
                --theme-sig-keyboard-key-special-selected-border-right-color: --palette-default-color254;
                --theme-sig-keyboard-key-special-selected-border-bottom-width: 1px;
                --theme-sig-keyboard-key-special-selected-border-bottom-style: solid;
                --theme-sig-keyboard-key-special-selected-border-bottom-color: --palette-default-color254;
                

                
                --theme-sig-keyboard-key-accept-background-color: --palette-default-color239;
                --theme-sig-keyboard-key-accept-color: --palette-default-color253;

                
                --theme-sig-keyboard-close-color: --palette-default-color253;
                --theme-sig-keyboard-close-background-color: --palette-default-color244;

                
                --theme-sig-keyboard-key-cancel-background-color: --palette-default-color235;
                --theme-sig-keyboard-key-cancel-color: --palette-default-color253;
                
                
                --theme-sig-keyboard-title-color: --palette-default-color253;
                --theme-sig-keyboard-title-background-color: --palette-default-color244;
                --theme-sig-keyboard-title-height: 25px;
                --theme-sig-keyboard-title-font-size: 13px;

                

                
                --theme-sig-keyboard-sb-height: 44px;
                --theme-sig-keyboard-sb-background-color: --palette-default-color252;
                --theme-sig-keyboard-sb-border-color: --palette-default-color255;
                --theme-sig-keyboard-sb-border-style: none;
                --theme-sig-keyboard-sb-border-width: 0px;
                --theme-sig-keyboard-sb-border-radius: 0px;
                --theme-sig-keyboard-sb-margin-bottom: 7px;
                --theme-sig-keyboard-sb-opacity-disabled: 0.8;
                --theme-sig-keyboard-sb-layer-marging-bottom: 7px;

                
                --theme-sig-keyboard-sb-scrollbar-background-color: --palette-default-color240;
                --theme-sig-keyboard-sb-scrollbar-height: 3px;    
     
                
                --theme-sig-keyboard-sb-suggestion-color: --palette-default-color248;
                --theme-sig-keyboard-sb-suggestion-background-color: --palette-default-color251;
                --theme-sig-keyboard-sb-suggestion-border-color: --palette-default-color250;
                --theme-sig-keyboard-sb-suggestion-border-width: 1px;
                --theme-sig-keyboard-sb-suggestion-border-style: solid;
                --theme-sig-keyboard-sb-suggestion-border-radius: 4px;
                --theme-sig-keyboard-sb-suggestion-margin-horizontal: 8px;
                --theme-sig-keyboard-sb-suggestion-margin-vertical: 6px;
                --theme-sig-keyboard-sb-suggestion-padding-horizontal: 4px;
                --theme-sig-keyboard-sb-suggestion-padding-vertical: 2px;
                --theme-sig-keyboard-sb-suggestion-font-size: 14px;

                 
                --theme-sig-keyboard-sb-suggestion-color-hover: --palette-default-color248;
                --theme-sig-keyboard-sb-suggestion-background-color-hover: --palette-default-color251;
                --theme-sig-keyboard-sb-suggestion-border-color-hover: --palette-default-color240;

                
                --theme-sig-keyboard-sb-suggestion-color-selected: --palette-default-color252;
                --theme-sig-keyboard-sb-suggestion-background-color-selected: --palette-default-color240;
                --theme-sig-keyboard-sb-suggestion-border-color-selected: --palette-default-color240;

                
                --theme-sig-keyboard-sb-button-width: 40px;
                --theme-sig-keyboard-sb-button-color: --palette-default-color248;
                --theme-sig-keyboard-sb-button-background-color: --palette-default-color249;
                --theme-sig-keyboard-sb-button-border-color: --palette-default-color250;
                --theme-sig-keyboard-sb-button-border-width: 1px;
                --theme-sig-keyboard-sb-button-border-style: solid;
                --theme-sig-keyboard-sb-button-border-radius: 6px;
                --theme-sig-keyboard-sb-button-font-size: 14px;

                
                --theme-sig-keyboard-sb-button-color-hover: --palette-default-color240;
                --theme-sig-keyboard-sb-button-background-color-hover: --palette-default-color249;
                --theme-sig-keyboard-sb-button-border-color-hover: --palette-default-color250;

                 
                --theme-sig-keyboard-sb-button-color-disabled: --palette-default-color250;
                --theme-sig-keyboard-sb-button-background-color-disabled: --palette-default-color249;
                --theme-sig-keyboard-sb-button-border-color-disabled   : --palette-default-color250;

                
                ---theme-sig-keyboard-info-tag-color: --palette-default-color248;
                ---theme-sig-keyboard-info-tag-background-color: --palette-default-color254;
                ---theme-sig-keyboard-info-tag-span-color : --palette-default-color240;

                
                --theme-sig-keyboard-grid-column-gap: unset;
                --theme-sig-keyboard-grid-row-gap: unset;

                
                --theme-sig-keyboard-key-accept-phrase-active-background-color: --palette-default-color124;
                --theme-sig-keyboard-key-accept-phrase-active-color: --palette-default-color253;
            }
        </style>
        <style id="lvdtemplate">
            /*! @@lvdstyles */
        </style>
        <style id="development">
        </style>
        `;
styleElement.register('sig-keyboard-css');