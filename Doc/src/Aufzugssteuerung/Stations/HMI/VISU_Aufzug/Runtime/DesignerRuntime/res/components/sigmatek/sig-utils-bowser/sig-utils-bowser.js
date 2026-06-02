loadjs('rt/node_modules/bowser/index.js', 'bowser', {
    before: (path, scriptElement) => {
        scriptElement.crossOrigin = 'use-credentials';
    }
});