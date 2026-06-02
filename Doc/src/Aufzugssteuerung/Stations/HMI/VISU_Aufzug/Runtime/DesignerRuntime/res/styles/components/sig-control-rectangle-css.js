const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-control-rectangle {
   --theme-sig-control-rectangle-border-width: 1px;
   --theme-sig-control-rectangle-border-style: solid;
   --theme-sig-control-rectangle-border-color: #FFFFFF;
   --theme-sig-control-rectangle-background-color: rgba(255,255,255,0);
}

    </style>
</template>
`;
styleElement.register('sig-control-rectangle-css');