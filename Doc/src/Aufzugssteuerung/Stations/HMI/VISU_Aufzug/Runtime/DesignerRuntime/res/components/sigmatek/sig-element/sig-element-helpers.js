export const onPropertyReady = (name = '', retries = 100) => {
    console.warn('This method is deprecated! Please use loadjs library or waitForPropertyReady() method.');
    return (
        new Promise((resolve, reject) => {
            const waitForProperty = (name, retries) => {
                if (retries > 0) {
                    if (window[name]) {
                        resolve(name, retries);
                    } else {
                        window.requestAnimationFrame((timestamp) => {
                            retries -= 1;
                            waitForProperty(name, retries);
                        });
                    }
                } else {
                    reject(`[onPropertyReady] Property "window.${name}" after max. retries not ready!`);
                }
            };
            waitForProperty(name, retries);
        }));
};

export const waitForPropertyReady = (name = '', timeout = 60000, interval = 50) => {
    return new Promise((resolve, reject) => {
        let check = true,
            intervalTimeout = null;
        const waitForProperty = (name) => {
            if (window[name]) {
                clearTimeout(intervalTimeout);
                clearTimeout(totalTimeout);
                resolve(name);
            } else {
                intervalTimeout = setTimeout(() => {
                    if (check) waitForProperty(name);
                }, interval);
            }
        };

        const totalTimeout = setTimeout(() => {
            check = false;
            clearTimeout(intervalTimeout);
            reject(`[waitForPropertyReady] Property "window.${name}" after ${timeout} milliseconds not ready!`);
        }, timeout);

        waitForProperty(name);
    });
};

export const addScriptToHead = (src, id, type = 'text/javascript', async = true, crossorigin = 'use-credentials') => {
    if (src) {
        const elm = document.createElement('script');
        elm.setAttribute('src', src);
        elm.setAttribute('type', type);
        if (id) elm.setAttribute('id', id);
        if (async) elm.setAttribute('async', '');
        if (crossorigin) elm.setAttribute('crossorigin', crossorigin);
        document.head.appendChild(elm);
    }
};

export const addLinkToHead = (href, id, rel = 'stylesheet', crossorigin = 'use-credentials') => {
    if (href) {
        const elm = document.createElement('link');
        elm.setAttribute('href', href);
        elm.setAttribute('rel', rel);
        if (id) elm.setAttribute('id', id);
        if (crossorigin) elm.setAttribute('crossorigin', crossorigin);
        document.head.appendChild(elm);
    }
};