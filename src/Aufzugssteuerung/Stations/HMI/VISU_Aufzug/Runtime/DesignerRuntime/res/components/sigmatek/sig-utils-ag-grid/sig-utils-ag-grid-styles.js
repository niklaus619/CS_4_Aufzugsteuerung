
if (!customElements.get('sig-utils-ag-grid-css')) {
    const styleSheets = [
        'rt/node_modules/ag-grid-community/dist/styles/ag-grid.min.css',
        'rt/node_modules/ag-grid-community/dist/styles/ag-theme-alpine.min.css'
    ];
    Promise.all(styleSheets.map(styleSheet =>
        fetch(styleSheet).then(resp => resp.text())
    )).then(styles => {
        const styleElement = document.createElement('dom-module');
        let combinedStyles = '';
        styles.forEach(style => {
            combinedStyles += `<style>${style}</style>`
        });
        styleElement.innerHTML = `
        <template>   
            ${combinedStyles};
        </template>`;
        styleElement.register('sig-utils-ag-grid-css');
    }).catch(error => {
        log.error(error);
    });
}