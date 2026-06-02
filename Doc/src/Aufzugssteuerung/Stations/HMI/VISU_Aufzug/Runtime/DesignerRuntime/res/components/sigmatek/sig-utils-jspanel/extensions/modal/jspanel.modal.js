'use strict';



if (!jsPanel.modal) {

    jsPanel.modal = {

        version: '1.0.2',
        date: '2022-13-12 14:20',

        defaults: {
            closeOnBackdropClick: false,
            useBackdropAnimation: false,
            modalAnimateIn: undefined,
            modalAnimateOut: undefined,
        },

        ziBases: {
            user: 390000,
            system: 400100,
            keyboard: 400200
        },
        backdropContainer: '#lvddefaultwindowlayerinstance',
        addBackdrop(id, theme, animateIn, animateOut, slot) {
            const modalCount = document.getElementsByClassName('jsPanel-modal-backdrop').length,
                mb = document.createElement('div');
            mb.id = 'jsPanel-modal-backdrop-' + id;
            mb.classList.add('jsPanel-modal-backdrop', 'jsPanel-theme-' + theme, 'ag-custom-component-popup');
            if (modalCount > 0) {
                mb.classList.add('jsPanel-modal-backdrop-multi');
            }
            jsPanel.modal.ziModal.resetZIndex(mb, slot);
            if (slot) mb.slot = slot;

            return mb;
        },

        removeBackdrop(id, animateIn, animateOut, hideOnClose, slot) {
            const mb = document.getElementById(`jsPanel-modal-backdrop-${id}`);
            if (mb) {
                jsPanel.modal.ziModal.resetZIndex(mb, slot);
                if (animateOut) {
                    mb.classList.remove(animateIn);
                    mb.classList.add(animateOut);
                    const delay = parseFloat(getComputedStyle(mb).animationDuration) * 1000;
                    window.setTimeout(function () {
                        if (hideOnClose) {
                            mb.style.display = 'none';
                            mb.classList.remove(animateOut);
                        } else mb.remove();
                    }, delay);
                } else {
                    if (hideOnClose) mb.style.display = 'none';
                    else mb.remove();
                }
            }
        },

        create(options = {}) {
            options.paneltype = 'modal';
            if (!options.id) {
                options.id = `jsPanel-${jsPanel.idCounter += 1}`;
            } else if (typeof options.id === 'function') {
                options.id = options.id();
            }

            let opts = options;
            if (options.config) {
                opts = Object.assign({}, options.config, options);
                delete opts.config;
            }
            opts = Object.assign({}, this.defaults, opts);

            switch (opts.sigLayer) {
                case 'keyboard':
                    opts.theme = 'keyboard';
                    break;
                default:
                    opts.theme = 'default';
            }

            const backdrop = this.addBackdrop(opts.id, opts.theme, opts.modalAnimateIn, opts.modalAnimateOut, opts.sigLayer);

            let backdropContainer;
            if (this.backdropContainer instanceof HTMLElement) {
                backdropContainer = this.backdropContainer;
            } else {
                try { 
                    backdropContainer = document.querySelector(this.backdropContainer);
                } catch (error) {
                    backdropContainer = document.body;
                    console.warn('[jsPanel.modal] Could not find backdrop container. Falling back to Body');
                }
            }

            if (backdropContainer instanceof HTMLElement) {
                backdropContainer.append(backdrop);
                if (opts.modalAnimateIn) {
                    backdrop.classList.remove(opts.modalAnimateOut);
                    backdrop.classList.add(opts.modalAnimateIn);
                }
            } else {
                console.error('[jsPanel.modal] Backdrop container is not a valid HTNL element!');
            }


            return jsPanel.create(opts, modal => {
                jsPanel.modal.ziModal.resetZIndex(modal, opts.sigLayer);
                modal.header.style.cursor = 'default';
                modal.footer.style.cursor = 'default';

                if (opts.closeOnBackdropClick) {
                    document.getElementById(`jsPanel-modal-backdrop-${opts.id}`).addEventListener('click', () => {
                        modal.close();
                    });
                }

                modal.options.onbeforeclose.unshift((panel) => {
                    const hide = (document.getElementById(panel.id)) ? opts.hideOnClose : false;
                    jsPanel.modal.removeBackdrop(modal.id, opts.modalAnimateIn, opts.modalAnimateOut, hide, opts.sigLayer);
                    return true;
                });

                modal.options.onclosed.unshift((panel) => {
                    const remove = (document.getElementById(panel.id)) ? false : true;
                    if (remove) jsPanel.modal.removeBackdrop(modal.id, undefined, undefined, false, opts.sigLayer);
                    jsPanel.modal.ziModal.resetZIndex(panel, opts.sigLayer);
                    return true;
                });
                if (!modal.hidden) jsPanel.modal.ziModal.toFront(modal);
            });

        }
    };

    jsPanel.modal.ziModal = (() => {
        return {
            toFront: (panel) => {
                const domPanels = jsPanel.modal.ziModal.getOpenedWindows(panel.options.sigLayer);
                const maxIndex = Math.max.apply(Math, domPanels.map((pan) => (pan.zIndex)));

                panel.style.zIndex = maxIndex + 2;
                const backdrop = document.getElementById(`jsPanel-modal-backdrop-${panel.id}`);
                if (backdrop) backdrop.style.zIndex = maxIndex + 1;
            },
            getOpenedWindows: (layer) => {
                const domPanels = [];
                const panels = document.getElementsByClassName('jsPanel');
                for (let i = 0; panels.length > i; i++) {
                    if (panels[i].hidden === false && (layer === 'all' || panels[i].options.sigLayer === layer)) {
                        domPanels.push({
                            id: panels[i].id,
                            zIndex: panels[i].style.zIndex,
                            sigLayer: panels[i].options.sigLayer,
                            instance: panels[i]
                        });
                    }
                }
                return domPanels;
            },
            resetZIndex: (panel, layer) => {
                switch (layer) {
                    case 'keyboard':
                        panel.style.zIndex = jsPanel.modal.ziBases.keyboard;
                        break;
                    case 'system':
                        panel.style.zIndex = jsPanel.modal.ziBases.system;
                        break;
                    default:
                        panel.style.zIndex = jsPanel.modal.ziBases.user;
                }
            },
            getTopPanel: (layer = 'all') => {
                const domPanels = jsPanel.modal.ziModal.getOpenedWindows(layer);
                const maxIndex = Math.max.apply(Math, domPanels.map((pan) => (pan.zIndex)));
                const topPanel = domPanels.filter(pan => {
                    return parseInt(pan.zIndex, 10) === maxIndex;
                });
                return (topPanel[0]) ? topPanel[0].instance : undefined;
            }
        };
    })();

}
