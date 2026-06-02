const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
            :host sig-window-layer {
}

        </style>
</template>
`;
styleElement.register('sig-window-layer-css');