const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
            :host sig-window-container-keyboard {
   --theme-sig-window-panel-hdr-background-color: #007FC5;
   --theme-sig-window-panel-hdr-color: #2F2F2F;
   --theme-sig-window-panel-content-background-color: #5F5F64;
   --theme-sig-window-panel-border-color: #A0A0A0;
   --theme-sig-window-panel-content-border-top-color: #A0A0A0;
}

        </style>
</template>
`;
styleElement.register('sig-window-container-keyboard-css');