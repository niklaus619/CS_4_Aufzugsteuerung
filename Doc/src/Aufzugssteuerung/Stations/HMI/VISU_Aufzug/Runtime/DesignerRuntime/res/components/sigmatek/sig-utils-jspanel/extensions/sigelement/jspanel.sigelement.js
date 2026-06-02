'use strict';

if (!jsPanel.sigelement) {

    jsPanel.sigelement = {
        version: '1.0.5',
        date: '2022-20-09 11:14'
    };

    jsPanel.usePointerEvents(false);

    jsPanel.globalCallbacks = (!jsPanel.globalCallbacks) ? [] : jsPanel.globalCallbacks;

    jsPanel.globalCallbacks.push((panel) => {
        if (panel.options.closeOnEscape) {
            panel.options.closeOnEscape = (callback) => {
                const topPanel = jsPanel.modal.ziModal.getTopPanel();
                if (panel === topPanel) {
                    panel.close(null, true);
                    return true;
                } else {
                    return false;
                }
            };
        }

        if (!panel.sigApplyCSSValue) {
            panel.options.onminimized = function (panel) {
                const minimizedContainer = document.getElementById(panel.id + '-min');
                panel._applyThemeClass(minimizedContainer);
                if (minimizedContainer instanceof HTMLElement) {
                    if (panel.sigStyleClass) {
                        panel.minimizedContainerSigStyleClass = panel.sigStyleClass;
                        minimizedContainer.classList.add(panel.minimizedContainerSigStyleClass);
                    } else if (panel.minimizedContainerSigStyleClass) {
                        minimizedContainer.classList.remove(panel.minimizedContainerSigStyleClass);
                        panel.minimizedContainerSigStyleClass = undefined;
                    }
                }
            };

            panel.sigApplyCSSValue = (cssObj = {}) => {
                if (Object.keys(cssObj).length > 0) {
                    const minimizedContainer = document.getElementById(panel.id + '-min');
                    const backdropContainer = document.getElementById('jsPanel-modal-backdrop-' + panel.id);
                    for (const key in cssObj) {
                        panel.style.setProperty(key, cssObj[key]);
                        if (minimizedContainer instanceof HTMLElement) {
                            minimizedContainer.style.setProperty(key, cssObj[key]);
                        }
                        if (backdropContainer instanceof HTMLElement) {
                            backdropContainer.style.setProperty(key, cssObj[key]);
                        }
                    }
                }
            };
        };

        if (!panel.sigRemoveCSSValue) {
            panel.sigRemoveCSSValue = (propName = '') => {
                panel.style.removeProperty(propName);
                const minimizedContainer = document.getElementById(panel.id + '-min');
                if (minimizedContainer instanceof HTMLElement) {
                    minimizedContainer.style.removeProperty(propName);
                }
            };
        }

        if (!panel.sigApplyFontObject) {
            panel.sigApplyFontObject = (propName, fontObj) => {
                if (propName === 'elementMainFont') {
                    panel._applyFontObjectToNode(panel, fontObj);
                    const minimizedContainer = document.getElementById(panel.id + '-min');
                    if (minimizedContainer instanceof HTMLElement) {
                        panel._applyFontObjectToNode(minimizedContainer, fontObj);
                    }
                } else {
                    const querySelector = `#${panel.id} ${propName}`;
                    const nodeList = document.querySelectorAll(querySelector);
                    nodeList.forEach(node => {
                        panel._applyFontObjectToNode(node, fontObj);
                    });
                    const minimizedContainer = document.getElementById(panel.id + '-min');
                    if (minimizedContainer instanceof HTMLElement) {
                        panel._applyFontObjectToNode(minimizedContainer, fontObj);
                    }
                }
            };
        }

        if (!panel._applyFontObjectToNode) {
            panel._applyFontObjectToNode = (node, fontObj) => {
                const title = node.querySelector('.jsPanel-title');
                if (fontObj !== undefined && fontObj !== null && fontObj.fontFamily !== undefined) {
                    node.style.setProperty('font-family', '\'' + fontObj.fontFamily + '\'');
                    if (title) title.style.setProperty('font-family', '\'' + fontObj.fontFamily + '\'');
                } else {
                    node.style.removeProperty('font-family');
                    if (title) title.style.removeProperty('font-family');
                }
                if (fontObj !== undefined && fontObj !== null && fontObj.size !== undefined) {
                    node.style.setProperty('font-size', fontObj.size + 'px');
                    if (title) title.style.setProperty('font-size', fontObj.size + 'px');
                } else {
                    node.style.removeProperty('font-size');
                    if (title) title.style.removeProperty('font-size');
                }

                if (fontObj !== undefined && fontObj !== null && fontObj.italic !== undefined) {
                    node.style.setProperty('font-style', fontObj.italic ? 'italic' : 'normal');
                    if (title) title.style.setProperty('font-style', fontObj.italic ? 'italic' : 'normal');
                } else {
                    node.style.removeProperty('font-style');
                    if (title) title.style.removeProperty('font-style');
                }
                if (fontObj !== undefined && fontObj !== null && fontObj.bold !== undefined) {
                    node.style.setProperty('font-weight', fontObj.bold ? 'bold' : 'normal');
                    if (title) title.style.setProperty('font-weight', fontObj.bold ? 'bold' : 'normal');
                } else {
                    node.style.removeProperty('font-weight');
                    if (title) title.style.removeProperty('font-weight');
                }
                if (fontObj !== undefined && fontObj !== null && fontObj.underline !== undefined) {
                    node.style.setProperty('text-decoration', fontObj.underline ? 'underline' : 'none');
                    if (title) title.style.setProperty('text-decoration', fontObj.underline ? 'underline' : 'none');
                } else {
                    node.style.removeProperty('text-decoration');
                    if (title) title.style.removeProperty('text-decoration');
                }
            };
        }

        if (!panel.sigApplyStyleClass) {
            panel.sigApplyStyleClass = (propName, className = '', remove = false) => {
                const backdropContainer = document.getElementById('jsPanel-modal-backdrop-' + panel.id);
                if (propName === 'elementMainClass') {
                    if (remove) {
                        panel.classList.remove(className);
                        if (backdropContainer instanceof HTMLElement) backdropContainer.classList.remove(className);
                        panel.sigStyleClass = undefined;
                    } else {
                        panel.classList.add(className);
                        if (backdropContainer instanceof HTMLElement) backdropContainer.classList.add(className);
                        panel.sigStyleClass = className;
                    }
                    if (panel.status === 'minimized') panel.options.onminimized(panel);
                }
            };
        }

        if (!panel.sigApplyPropValue) {
            panel.sigApplyPropValue = (propname, value, force = true) => {
                if (propname) {
                    switch (propname) { 
                        case 'headerheightbehavior':
                            if (value) panel.setAttribute(propname, value);
                            else panel.removeAttribute(propname);
                            break;
                    };
                    panel[propname] = value;
                }
            };
        }

        panel._applyThemeClass = (node) => {
            let themeClass = 'jsPanel-theme-';
            themeClass += (panel.theme) ? panel.theme : 'default';

            if (node instanceof HTMLElement && !node.classList.contains(themeClass)) {
                node.classList.add(themeClass);
                if (panel.options.paneltype === 'modal') node.classList.add('ag-custom-component-popup');
            }
        };

        switch (panel.options.sigLayer) {
            case 'keyboard':
                panel.theme = 'keyboard';
                break;
            default:
                panel.theme = 'default';
        }

        panel._applyThemeClass(panel);

        const minimizedContainer = document.getElementById(panel.id + '-min');
        panel._applyThemeClass(minimizedContainer);


        const panelContent = panel.getElementsByClassName('jsPanel-content')[0];
        const panelContentStyles = window.getComputedStyle(panelContent);
        const imagePropertyNames = [
            '--theme-sig-control-scrollbar-up-image',
            '--theme-sig-control-scrollbar-down-image',
            '--theme-sig-control-scrollbar-left-image',
            '--theme-sig-control-scrollbar-right-image',
            '--theme-sig-control-scrollbar-active-up-image',
            '--theme-sig-control-scrollbar-active-down-image',
            '--theme-sig-control-scrollbar-active-left-image',
            '--theme-sig-control-scrollbar-active-right-image'
        ];

        if (panelContent) {
            const separator = document.createElement('div');
            separator.classList.add('jsPanel-sig-separator');
            separator.innerHTML = '<div class="jsPanel-sig-separator-border"></div>';
            panel.insertBefore(separator, panelContent);
            if (panelContent.classList.contains('jsPanel-content-noheader')) {
                separator.style.display = 'none';
            }

            imagePropertyNames.forEach((imagePropertyName) => {
                const oldImagePath = panelContentStyles.getPropertyValue(imagePropertyName);
                if (oldImagePath !== '') {
                    const newImagePath = oldImagePath.replace('../../', '../../../../../');
                    panelContent.style.setProperty(imagePropertyName, newImagePath);
                }
            });

        }
    });
};