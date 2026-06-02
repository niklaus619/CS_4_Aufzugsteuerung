loadjs('rt/node_modules/d3/dist/d3.min.js', 'd3', {
    before: (path, scriptElement) => {
        scriptElement.crossOrigin = 'use-credentials';
    }
});