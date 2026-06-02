const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-image {
            --theme-sig-element-width: initial;
            --theme-sig-element-height: initial;
        }
        :host sig-control-image {
   --theme-sig-control-image-background-color: rgba(255,255,255,0);
   --theme-sig-control-image-border-color: rgba(255,255,255,0);
}

        </style>
</template>
`;
styleElement.register('sig-control-image-css');