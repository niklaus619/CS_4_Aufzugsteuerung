const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
    :host sig-wrapper {
}

    </style>
</template>
`;
styleElement.register('sig-wrapper-css');