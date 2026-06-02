loadjs(['rt/node_modules/jspanel4/dist/jspanel.min.css',
    'rt/node_modules/jspanel4/dist/jspanel.min.js',
    'res/components/sigmatek/sig-utils-jspanel/themes/jspanel-default.css'
], {
    success: () => {
        loadjs([
            'res/components/sigmatek/sig-utils-jspanel/extensions/hideonclose/jspanel.hideonclose.js',
            'res/components/sigmatek/sig-utils-jspanel/extensions/sigelement/jspanel.sigelement.js',
            'res/components/sigmatek/sig-utils-jspanel/extensions/modal/jspanel.modal.js'], {
            before: (path, scriptElement) => {
                scriptElement.crossOrigin = 'use-credentials';
            }
        });
    },
    before: (path, scriptElement) => {
        scriptElement.crossOrigin = 'use-credentials';
    }
});
