'use strict';


if (!jsPanel.hideonclose) {

    jsPanel.hideonclose = {

        version: '1.0.2',
        date: '2022-09-27',

        close: function (callback, panel) {
            panel.hide(callback);
        }
    };


    jsPanel.globalCallbacks = (!jsPanel.globalCallbacks) ? [] : jsPanel.globalCallbacks;

    jsPanel.globalCallbacks.push((panel) => {

        if (panel.options.hideOnClose) {
            panel.close = (callback) => {
                jsPanel.hideonclose.close(callback, panel);
            };
        }
        if (panel.content.dir) {
            panel.content.removeAttribute('dir');
        }
    });

    if (!jsPanel.show) {
        jsPanel.extend({
            show: function () {
                const panel = this;
                if (panel instanceof HTMLElement) {
                    if (panel.hidden) {
                        const options = panel.options;
                        const jspanelloaded = new CustomEvent('jspanelloaded', { detail: options.id });
                        if (panel.options.animateOut) {
                            jsPanel.remClass(panel, panel.options.animateOut);
                        }
                        if (panel.options.animateIn) {
                            jsPanel.setClass(panel, panel.options.animateIn);
                        }
                        if (panel.options.autoclose && typeof panel.options.autoclose.time === 'number') {
                            panel.closetimer = setTimeout(() => {
                                panel.close();
                            }, panel.options.autoclose.time);
                        }

                        panel.style.display = 'flex';
                        panel.hidden = false;
                        if (panel.options.paneltype === "modal") {
                            const md = document.getElementById(`jsPanel-modal-backdrop-${panel.id}`);
                            if (panel.options.modalAnimateIn)
                                md.classList.add(panel.options.modalAnimateIn);

                            md.style.display = "block";
                            jsPanel.modal.ziModal.toFront(panel, panel.options.sigLayer);
                        } else {
                            panel.front();
                        }

                        switch (panel.status) {
                            case 'minimized':
                                panel.normalize();
                                break;
                            case 'normalized':
                                panel.resize(`${panel.currentData.width} ${panel.currentData.height}`);
                                break;
                        }


                        document.dispatchEvent(jspanelloaded);
                    }
                } else {
                    console.error('jsPanel.hideonclose.show: Panel is no valid HTML Element');
                }
            }
        });
    } else {
        console.error('jsPanel.hideonclose.show: Could not extend .show() method');
    }

    if (!jsPanel.hide) {
        jsPanel.extend({
            hide: function (callback) {
                const panel = this;
                if (panel instanceof HTMLElement) {
                    if (!panel.hidden || panel.removeOnClose) {
                        const options = panel.options;
                        const jspanelbeforeclose = new CustomEvent('jspanelbeforeclose', { detail: options.id });
                        const jspanelclosed = new CustomEvent('jspanelclosed', { detail: options.id });
                        const closetimer = panel.closetimer;

                        const doClose = () => {
                            panel.style.display = 'none';
                            panel.hidden = true;
                            const panelId = options.id;

                            if (closetimer) {
                                window.clearTimeout(closetimer);
                            }


                            if (panel.removeOnClose) {
                                panel.closeChildpanels();
                                if (panel.parentElement) {
                                    panel.parentElement.removeChild(panel);
                                }
                                if (document.querySelector('#' + panelId)) {
                                    return false;
                                }
                            }

                            panel.removeMinimizedReplacement();

                            document.dispatchEvent(jspanelclosed);

                            if (callback instanceof Function) {
                                callback.call(panelId, panelId);
                            }

                            if (options.onclosed) {
                                jsPanel.processCallbacks(panel, options.onclosed, 'every');
                            }

                            jsPanel.autopositionRemaining(panel);

                            if (options.animateOut && !panel.removeOnClose) {
                                panel.removeEventListener('animationend', doClose);
                            }
                        };

                        document.dispatchEvent(jspanelbeforeclose);

                        if (options.onbeforeclose && options.onbeforeclose.length > 0 && !jsPanel.processCallbacks(panel, options.onbeforeclose)) {
                            return panel;
                        }

                        if (options.animateOut && !panel.removeOnClose) {
                            if (options.animateIn) {
                                jsPanel.remClass(panel, options.animateIn);
                            }
                            jsPanel.setClass(panel, options.animateOut);
                            panel.addEventListener('animationend', doClose);
                        } else {
                            doClose();
                        }
                    }
                } else {
                    console.error('jsPanel.hideonclose.hide: Panel is no valid HTML Element');
                }
            }
        });
    } else {
        console.error('jsPanel.hideonclose.hide: Could not extend .hide() method');
    }
};