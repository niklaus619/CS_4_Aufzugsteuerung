window.jQueryLoadjsPromise = loadjs('rt/node_modules/jquery/dist/jquery.min.js', 'jQuery', {
    returnPromise: true,
    before: (path, scriptElement) => {
        scriptElement.crossOrigin = 'use-credentials';
    }
});