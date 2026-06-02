const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
        <style id="lvddefault">
            :host .__menu {
                --theme-sig-control-menu-ul-background-color: --palette-default-color246;
                --theme-sig-control-menu-ul-shadow-color: --palette-default-color252;
                --theme-sig-control-menu-li-background-color: --palette-default-color246;
                --theme-sig-control-menu-li-color: --palette-default-color254;
                --theme-sig-control-menu-li-selected-background-color: --palette-default-color240;
                --theme-sig-control-submenu-li-selected-background-color: --palette-default-color240;
                --theme-sig-control-submenu-li-color: --palette-default-color254;
                --theme-sig-control-menu-li-selected-color: --palette-default-color254;
                --theme-sig-control-menu-li-inactive-background-color: --palette-default-color248;
                --theme-sig-control-menu-li-inactive-color: --palette-default-color254; 
            }
            </style>
            <style id="lvdtemplate">
            /*! @@lvdstyles */
            :host .__menu {
                --theme-sig-element-height: initial;
                --theme-sig-element-width: initial;
            }
            </style>
            <style id="development">
            </style>
    </template>
    `;
styleElement.register('sig-control-menu-css');