const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
        :host sig-alarm-config-base {
}

    </style>
</template>
`;
styleElement.register('sig-alarm-config-base-css');