const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
            :host .__menu {
   --theme-sig-control-menu-ul-background-color: #D7D7D7;
   --theme-sig-control-menu-ul-shadow-color: #2F2F2F;
   --theme-sig-control-menu-li-background-color: #D7D7D7;
   --theme-sig-control-menu-li-color: #000000;
   --theme-sig-control-menu-li-selected-background-color: #AEC81A;
   --theme-sig-control-submenu-li-selected-background-color: #AEC81A;
   --theme-sig-control-submenu-li-color: #000000;
   --theme-sig-control-menu-li-selected-color: #000000;
   --theme-sig-control-menu-li-inactive-background-color: #A0A0A0;
   --theme-sig-control-menu-li-inactive-color: #000000;
}

            :host .__menu {
                --theme-sig-element-height: initial;
                --theme-sig-element-width: initial;
            }
            </style>
</template>
`;
styleElement.register('sig-control-menu-css');