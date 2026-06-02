loadjs.ready('jQuery', {
    success: () => {
        loadjs('rt/node_modules/jstree/dist/jstree.min.js', {
            before: (path, scriptElement) => {
                scriptElement.crossOrigin = 'use-credentials';
            }
        });
    }
});
