loadjs.ready('d3', {
    success: () => {
        loadjs(['rt/node_modules/c3/c3.min.js', 'rt/node_modules/c3/c3.min.css'], {
            before: (path, scriptElement) => {
                scriptElement.crossOrigin = 'use-credentials';
            }
        });
    }
});