const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
    :host sig-dashboard {
}

    </style>
</template>
`;
styleElement.register('sig-dashboard-css');