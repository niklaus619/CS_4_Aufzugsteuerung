const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-led{
                --theme-sig-element-top: initial;
                --theme-sig-element-left: initial;
                --theme-sig-element-height: initial;
                --theme-sig-element-width: initial;
            }
            :host sig-control-led {
   --theme-sig-control-led-background-color: #D7D7D7;
   --theme-sig-control-led-border-width: 1px;
   --theme-sig-control-led-border-color: #FFFFFF;
   --theme-sig-control-led-border-style: solid;
   --theme-sig-control-led-border-radius-top-left: 2px;
   --theme-sig-control-led-border-radius-top-right: 2px;
   --theme-sig-control-led-border-radius-bottom-right: 2px;
   --theme-sig-control-led-border-radius-bottom-left: 2px;
   --theme-sig-control-led-background-image: none;
   --theme-sig-control-led-background-position-x: center;
   --theme-sig-control-led-background-position-y: center;
   --theme-sig-control-led-background-size: cover;
   --theme-sig-control-led-pressed-background-color: #007700;
   --theme-sig-control-led-pressed-background-image: inherit;
}

        </style>
</template>
`;
styleElement.register('sig-control-led-css');