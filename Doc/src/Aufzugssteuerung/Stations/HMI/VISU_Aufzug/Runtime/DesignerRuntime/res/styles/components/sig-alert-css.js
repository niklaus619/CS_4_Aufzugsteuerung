const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
    :host sig-alert {
}

    </style>
</template>
`;
styleElement.register('sig-alert-css');