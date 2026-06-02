/**
 * Demo how to use registerViewSelectionCallback
 */
function init() {
    window.registerViewSelectionCallback(
        /**
         * @param {Api} api window.sigApi not ready, use parameter api
         * @param {number} viewIndex
         * @param {View[]} views
         * @returns {undefined|number|Promise({undefined|number})} viewIndex
         */
        (api, viewIndex, views) => {
            // return 0;
            // return 'default';
            // return undefined; // use default view
            // return Promise.resolve(0);
            // return Promise.resolve('default');
            // return Promise.resolve(undefined); // use default view
            // window.unregisterViewSelectionCallback(); // optional
            return new Promise((resolve, reject) => {
                return resolve(undefined); // use default view
            });

        });
}

init();
