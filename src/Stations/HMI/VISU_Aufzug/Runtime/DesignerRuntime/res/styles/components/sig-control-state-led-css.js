const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-state-led {
            --theme-sig-element-top: initial;
            --theme-sig-element-left: initial;
            --theme-sig-element-height: initial;
            --theme-sig-element-width: initial;
        }
        :host sig-control-state-led {
   --theme-sig-control-state-led-background-color: #A5ABB0;
   --theme-sig-control-state-led-border-color: #A5ABB0;
   --theme-sig-control-state-led-pressed-background-color: #AFC81A;
}

    </style>
</template>
`;
styleElement.register('sig-control-state-led-css');