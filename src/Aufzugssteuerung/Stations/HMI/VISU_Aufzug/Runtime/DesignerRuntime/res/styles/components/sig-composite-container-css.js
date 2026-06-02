const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
    :host sig-composite-container {
}

    </style>
</template>
`;
styleElement.register('sig-composite-container-css');