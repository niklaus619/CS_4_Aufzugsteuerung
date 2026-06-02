const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-button {
            --theme-sig-element-height: initial;
            --theme-sig-element-width: initial;
        }
            :host sig-control-button {
   --theme-sig-control-button-font-size: 11px;
   --theme-sig-control-button-background-color: #28322D;
   --theme-sig-control-button-background-color-stop: #37423C;
   --theme-sig-control-button-color: #FFFFFF;
   --theme-sig-control-button-border-color: #28322D;
   --theme-sig-control-button-border-color-stop: rgba(255,255,255,0);
   --theme-sig-control-button-shadow-color: #000000;
   --theme-sig-control-button-pressed-background-color: #AFC81A;
   --theme-sig-control-button-pressed-background-color-stop: #BCD528;
   --theme-sig-control-button-pressed-color: #28322D;
   --theme-sig-control-button-pressed-border-color: #AFC81A;
   --theme-sig-control-button-pressed-border-color-stop: rgba(255,255,255,0);
   --theme-sig-control-button-pressed-shadow-color: #000000;
}

        </style>
</template>
`;
styleElement.register('sig-control-button-css');