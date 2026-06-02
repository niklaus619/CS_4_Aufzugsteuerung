const options = {
    before: (path, scriptElement) => {
        scriptElement.crossOrigin = 'use-credentials';
    }
};
loadjs('rt/node_modules/ag-grid-community/dist/styles/aggridalpinefont.min.css', options);
import './sig-utils-ag-grid-styles.js';
loadjs('rt/node_modules/ag-grid-community/dist/ag-grid-community.min.nostyle.js', options);
loadjs('rt/node_modules/ag-grid-community/dist/styles/ag-grid.min.css', options);
loadjs('rt/node_modules/ag-grid-community/dist/styles/ag-theme-alpine.min.css', options);
