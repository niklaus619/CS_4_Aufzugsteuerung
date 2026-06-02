const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-input {
            --theme-sig-element-width: initial;
            --theme-sig-element-height: initial;
        }
        :host sig-control-input {
   --theme-sig-control-input-background-color: #FFFFFF;
   --theme-sig-control-input-value-background-color: #D7D7D7;
   --theme-sig-control-input-value-active-color: #000000;
   --theme-sig-control-input-value-active-background-color: #AEC81A;
   --theme-sig-control-input-font-size: 11px;
   --theme-sig-control-input-color: #28322D;
   --theme-sig-control-input-border-color: #28322D;
   --theme-sig-control-input-border-width: 1px;
   --theme-sig-control-input-border-style: solid;
   --theme-sig-control-input-margin-leftright: 0px;
   --theme-sig-control-input-margin-top: 0px;
   --theme-sig-control-input-shadow-color: #000000;
   --theme-sig-control-input-pressed-shadow-color: #000000;
   --theme-sig-control-input-background-color-stop: rgba(255,255,255,0);
   --theme-sig-control-input-border-color-stop: rgba(255,255,255,0);
   --theme-sig-control-input-value-active-background-color-stop: rgba(255,255,255,0);
   --theme-sig-control-input-activ-border-color: #28322D;
   --theme-sig-control-input-activ-border-color-stop: rgba(255,255,255,0);
}

        </style>
</template>
`;
styleElement.register('sig-control-input-css');