const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-output {
            --theme-sig-element-height: initial;
            --theme-sig-element-width: initial;
        }
            :host sig-control-output {
   --theme-sig-control-output-background-color: #A5ABB0;
   --theme-sig-control-output-background-color-stop: rgba(255,255,255,0);
   --theme-sig-control-output-color: #FFFFFF;
   --theme-sig-control-output-font-size: 11px;
   --theme-sig-control-output-border-color: rgba(255,255,255,0);
   --theme-sig-control-output-border-color-stop: rgba(255,255,255,0);
   --theme-sig-control-output-shadow-color: #000000;
   --theme-sig-control-output-border-radius: 3px;
   --theme-sig-control-output-unit-color: #FFFFFF;
}

        </style>
</template>
`;
styleElement.register('sig-control-output-css');