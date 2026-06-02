const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-mediacontainer {
   --theme-sig-control-mediacontainer-background-color: rgba(255,255,255,0);
   --theme-sig-control-mediacontainer-border-color: rgba(255,255,255,0);
}

        </style>
</template>
`;
styleElement.register('sig-control-mediacontainer-css');