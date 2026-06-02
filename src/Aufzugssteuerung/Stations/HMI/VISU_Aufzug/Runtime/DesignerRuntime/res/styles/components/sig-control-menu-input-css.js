const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
            :host sig-control-menu-input {
                --theme-sig-element-height: initial;
                --theme-sig-element-width: initial;
            }
            :host sig-control-menu-input {
   --theme-sig-control-menu-input-background-color: #D7D7D7;
   --theme-sig-control-menu-input-pressed-background-color: #D7D7D7;
   --theme-sig-control-menu-input-border-color: #000000;
   --theme-sig-control-menu-input-border-color-stop: #000000;
   --theme-sig-control-menu-input-pressed-border-color: #000000;
   --theme-sig-control-menu-input-pressed-border-color-stop: #000000;
   --theme-sig-control-menu-input-caretdown-width: 25px;
   --theme-sig-control-menu-input-caretdown-background-color: rgba(42,42,42,0.3);
   --theme-sig-control-menu-input-caretdown-pressed-background-color: rgba(42,42,42,0.3);
   --theme-sig-control-menu-input-color: #2F2F2F;
   --theme-sig-control-menu-input-shadow-color: #000000;
   --theme-sig-control-menu-input-pressed-color: #2F2F2F;
   --theme-sig-control-menu-input-pressed-shadow-color: #000000;
}

        </style>
</template>
`;
styleElement.register('sig-control-menu-input-css');