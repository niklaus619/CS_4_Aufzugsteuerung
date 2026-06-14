const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-fast-button {
   --theme-sig-control-fast-button-background-color: #28322D;
   --theme-sig-control-fast-button-background-color-stop: #37423C;
   --theme-sig-control-fast-button-color: #FFFFFF;
   --theme-sig-control-fast-button-border-color: #28322D;
   --theme-sig-control-fast-button-border-color-stop: rgba(255,255,255,0);
   --theme-sig-control-fast-button-shadow-color: #000000;
   --theme-sig-control-fast-button-pressed-background-color: #AFC81A;
   --theme-sig-control-fast-button-pressed-background-color-stop: #BCD528;
   --theme-sig-control-fast-button-pressed-color: #28322D;
   --theme-sig-control-fast-button-pressed-border-color: #AFC81A;
   --theme-sig-control-fast-button-pressed-border-color-stop: rgba(255,255,255,0);
   --theme-sig-control-fast-button-pressed-shadow-color: #000000;
}

    </style>
</template>
`;
styleElement.register('sig-control-fast-button-css');