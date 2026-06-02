const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
    :host sig-designer-placeholder {
   --theme-sig-deisgner-placeholder-background-color: rgba(255,50,50,0.6);
   --theme-sig-deisgner-placeholder-color: #FFFFFF;
   --theme-sig-deisgner-placeholder-font-size: 11px;
}

    </style>
</template>
`;
styleElement.register('sig-designer-placeholder-css');