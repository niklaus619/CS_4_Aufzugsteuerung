const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-video {
   --theme-sig-control-video-background-color: rgba(255,255,255,0);
   --theme-sig-control-video-border-color: rgba(255,255,255,0);
}

        </style>
</template>
`;
styleElement.register('sig-control-video-css');