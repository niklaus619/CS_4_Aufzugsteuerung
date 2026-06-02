const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-designer-resource-preview {
}

    </style>
</template>
`;
styleElement.register('sig-designer-resource-preview-css');