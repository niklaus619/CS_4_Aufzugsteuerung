const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
            :host sig-control-title {
   --theme-sig-control-title-color: #FFFFFF;
   --theme-sig-control-title-background-color: rgba(255,255,255,0);
   --theme-sig-control-title-border-color: rgba(255,255,255,0);
   --theme-sig-control-title-shadow-neon-color-1: #FFFFFF;
   --theme-sig-control-title-shadow-neon-color-2: #00C5FF;
}

        </style>
</template>
`;
styleElement.register('sig-control-title-css');