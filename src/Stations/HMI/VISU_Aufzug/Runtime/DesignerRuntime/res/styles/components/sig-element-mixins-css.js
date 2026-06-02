const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
:host sig-element-mixins {
}

</template>
`;
styleElement.register('sig-element-mixins-css');