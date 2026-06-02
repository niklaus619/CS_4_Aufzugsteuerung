loadjs('res/components/sigmatek/sig-utils-pwacompat/pwacompat.min.js', {
    before: (path, scriptElement) => {
        scriptElement.crossOrigin = 'use-credentials';
    }
});

