const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-switch-button2 {
   --theme-sig-control-switch-button2-track-color: #A5ABB0;
   --theme-sig-control-switch-button2-track-color-active: #AFC81A;
   --theme-sig-control-switch-button2-thumb-color: #FFFFFF;
   --theme-sig-control-switch-button2-thumb-color-active: #FFFFFF;
   --theme-sig-control-switch-button2-text-on-color: #28322D;
   --theme-sig-control-switch-button2-text-off-color: #FFFFFF;
}

    </style>
</template>
`;
styleElement.register('sig-control-switch-button2-css');