const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
    :host sig-app {
   --theme-sig-app-background-color: #5F5F64;
}

    </style>
</template>
`;
styleElement.register('sig-app-css');