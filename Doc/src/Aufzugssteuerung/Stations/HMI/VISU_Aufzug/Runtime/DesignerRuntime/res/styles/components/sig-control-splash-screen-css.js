const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-splash-screen {
   --theme-sig-control-splash-screen-background-color: #5F5F64;
   --theme-sig-control-splash-screen-spinner-color: #D7D7D7;
   --theme-sig-control-splash-screen-reload-button-background-color: #404247;
   --theme-sig-control-splash-screen-reload-button-border-style: solid;
   --theme-sig-control-splash-screen-reload-button-border-width: 1px;
   --theme-sig-control-splash-screen-reload-button-border-color: #000000;
   --theme-sig-control-splash-screen-reload-button-color: #AEC81A;
   --theme-sig-control-splash-screen-msg-info-color: #E5F2F8;
   --theme-sig-control-splash-screen-msg-warning-background-color: #DEF755;
   --theme-sig-control-splash-screen-msg-warning-color: #000000;
   --theme-sig-control-splash-screen-msg-error-background-color: #FF0000;
   --theme-sig-control-splash-screen-msg-error-color: #E5F2F8;
   --theme-sig-control-splash-screen-animation-duration: 1s;
}

        </style>
</template>
`;
styleElement.register('sig-control-splash-screen-css');