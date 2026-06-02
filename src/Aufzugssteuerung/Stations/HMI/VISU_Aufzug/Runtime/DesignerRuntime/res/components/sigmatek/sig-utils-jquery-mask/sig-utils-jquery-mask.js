loadjs.ready('jQuery', {
    success: () => {
        loadjs('rt/node_modules/jquery-mask-plugin/dist/jquery.mask.min.js', {
            before: (path, scriptElement) => {
                scriptElement.crossOrigin = 'use-credentials';
            }
        });
    }
});
