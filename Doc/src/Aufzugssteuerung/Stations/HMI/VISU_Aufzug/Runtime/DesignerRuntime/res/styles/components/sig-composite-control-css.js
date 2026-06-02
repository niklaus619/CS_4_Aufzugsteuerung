const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
:host sig-composite-control {
}

</template>
`;
styleElement.register('sig-composite-control-css');