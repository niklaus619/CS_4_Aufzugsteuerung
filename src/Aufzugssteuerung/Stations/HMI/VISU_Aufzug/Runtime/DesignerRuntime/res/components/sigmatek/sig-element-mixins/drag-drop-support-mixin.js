import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';
export const DragDropSupportElm = dedupingMixin((superClass) => {
    return class extends superClass {

        constructor() {
            super();
            this.initDragDropDone = false;
            this.dragSupportEnabled = false;
            this.dropSupportEnabled = false;
            this.dragOnLongPressEnabled = false;
            this.isdragClone = false;
            this.dragClone = null;
            this.dragData = {};
            this.activeDropTarget = null;
            this.validDropTargets = new Map();
            this.activeDropTargets = null;
            this.dragDropStartEvent = null;
            this.dragDropEndEvent = null;
            this.previewNode = null;
            this.appScaleFactor = 1;
            this.dragClonePosX = 0;
            this.dragClonePosY = 0;
            this.dragCloneVisible = false;
            this.dndApi = (window.sigApi) ? window.sigApi.dragAndDrop : undefined;
            this.utilsApi = (window.sigApi) ? window.sigApi.sigUtils : undefined;
            this.mandatoryCloneProperties = ['rotation', 'shadowDomElementsMap', 'fontMap'];
            this.cloneSuffix = (window.sigApi && window.sigApi.SIG_CONST && window.sigApi.SIG_CONST.DRAG_CLONE_SUFFIX) ? window.sigApi.SIG_CONST.DRAG_CLONE_SUFFIX : '_dragclone';
            this.unsupportedCloneTags = ['embedd', 'object', 'iframe'];
            this.draggedOpacityPropertyName = '--theme-sig-element-dragged-opacity';
            this.draggedOpacity = undefined;
            this.callbackLocks = new Map();
            this.scpTarget = null;
            this.scpGlobalLock = false;
            this.visualViewportOffsetX = 0;
            this.visualViewportOffsetY = 0;
            this.currentTarget = null;
            this.dragonlongpress = false;
            this.longpressdelay = 1000;

            this.sigAddRequiredProperty('dragonlongpress');
            this.sigAddRequiredProperty('longpressdelay');
            this.sigAddRequiredProperty('isdraggable');
            this.sigAddRequiredProperty('isdroppable');

            this.dragstartEvent = (evt) => {
                if (!this.isdragged) {
                    this._setEventData(evt);
                    evt.setDragData('component', this);
                    evt.setDragData('activeDropTarget', this.activeDropTarget);
                    evt.setDragData('activeDropTargets', this.activeDropTargets);
                    this.onComponentDragstart(evt);
                }
            };

            this.dragEvent = (evt) => {
                if (this.isdragged) {
                    this._setEventData(evt);
                    this.onComponentDrag(evt);
                    const targets = this._findDropTargets(evt.detail.x, evt.detail.y);
                    this.activeDropTargets = targets;
                    if (targets.length > 0) {

                        for (let index = 0; index < targets.length; index += 1) {
                            const target = targets[index];
                            if (target instanceof HTMLElement && (this.scpTarget === null || target.id === this.scpTarget.id)) { 
                                this.activeDropTarget = target;
                                this.currentTarget = target;
                                if (!this.validDropTargets.has(target.id)) {
                                    this.validDropTargets.set(target.id, target);
                                    this._executeCancelableCallback('onComponentDragenter', targets, target, evt);
                                }
                                if (this.validDropTargets.has(target.id)) {
                                    this._executeCancelableCallback('onComponentDragover', targets, target, evt);
                                }
                            } else {
                                target.onCancelCallback('all', evt);
                            }
                        }

                        const missingDropzones = this._getDropzonesNotInTargets(targets);
                        if (missingDropzones.length > 0) {
                            missingDropzones.forEach(target => {
                                if (target instanceof HTMLElement && (this.scpTarget === null || target.id === this.scpTarget.id)) {
                                    this.currentTarget = target;
                                    this._executeCancelableCallback('onComponentDragleave', targets, target, evt);
                                    if (this.scpTarget !== null && target.id === this.scpTarget.id) this._clearScpTarget();
                                } else {
                                    target.onCancelCallback('all', evt);
                                }
                                this.validDropTargets.delete(target.id);
                            });
                        }
                    } else {
                        this.validDropTargets.forEach((target, id, map) => {
                            this.currentTarget = target;
                            if (target instanceof HTMLElement && (this.scpTarget === null || target.id === this.scpTarget.id)) {
                                this._executeCancelableCallback('onComponentDragleave', targets, target, evt);
                            } else {
                                target.onCancelCallback('all', evt);
                            }
                        });
                        this._clearScpTarget();
                        this._clearActiveDropTargetsAndLocks();
                    }
                }
            };

            this.dragendEvent = (evt) => {
                this._setEventData(evt);
                const posX = (event.detail && evt.detail.x) ? evt.detail.x : evt.pageX;
                const posY = (event.detail && evt.detail.y) ? evt.detail.y : evt.pageY;
                const targets = this._findDropTargets(posX, posY);
                this.activeDropTargets = targets;
                if (targets.length > 0) {
                    targets.forEach(target => {
                        this.currentTarget = target;
                        if (target instanceof HTMLElement && (this.scpTarget === null || target.id === this.scpTarget.id)) {
                            if (target.isdroppable && target.onComponentDrop) {
                                this._executeCancelableCallback('onComponentDrop', targets, target, evt);
                            }
                        } else {
                            target.onCancelCallback('all', evt);
                        }
                    });
                }
                this._clearScpTarget(true);
                this._clearActiveDropTargetsAndLocks();
                this.onComponentDragend(evt);
                evt.clearDragData();
            };

            this.dragLongpressEvent = (evt) => {
                if (!this.isdragmode && evt.target.dragOnLongPressEnabled) {
                    this.onComponentLongpress(evt);
                }
            };
        }

        static get properties() {
            const props = {
                isdroppable: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                },
                isdraggable: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true,
                },
                isdragged: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                },
                isdragmode: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                },
                isdragClone: {
                    type: Boolean,
                    value: false,
                    reflectToAttribute: true
                }
            };
            return props;
        }

        connectedCallback() {
            super.connectedCallback();
            if (this.isdragclone) {
                this.classList.remove('sig-element-not-ready');
            }
        }

        static get observers() {
            return [
                '_initDragDrop(isdraggable, isdroppable, dragonlongpress)',
            ];
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.activeDropTarget = null;
            this.validDropTargets = null;
            this.activeDropTargets = null;
            this.dragDropStartEvent = null;
            this.dragDropEndEvent = null;
            this.previewNode = null;
            this.dndApi = null;
            this.utilsApi = null;
            this.cloneSuffix = null;
            this.callbackLocks = null;
            this.scpTarget = null;
            this.currentTarget = null;
            this.dragClone = null;
            this.dragData = null;
        }

        sigOnRequiredPropertiesReady() {
            super.sigOnRequiredPropertiesReady();
            if (!this.isdragClone) {
                this._initDragDrop(this.isdraggable, this.isdroppable, this.dragonlongpress);
            }
        }

        _publishRuntimeEvent(event, msg) {
            if (window.sigApi.eventMediator && window.sigApi.events && typeof event === 'string' && msg) {
                window.sigApi.eventMediator.publish(window.sigApi.events.getInternalEvent(event), msg);
            } else {
                console.error('Could not publish runtime event');
            }
        }

        _enableDragOnLongPress() {
            if (!this.isdragClone && !this.dragOnLongPressEnabled) {
                const [hasTags, tagNames] = this._containsUnsupportedCloneTags();
                if (hasTags) {
                    log.error(`[DragDropMixin] ${this.tagName}#${this.id} contains the unsupported tag(s): ${tagNames.join()}. The property "Drag On Longpress" has no effect on this component.`);
                    return;
                }
                if (this.utilsApi) this.utilsApi.addEventListener(this, 'longpress', this.dragLongpressEvent, 'polymerEvent', this);
                this.dragOnLongPressEnabled = true;
            }
        }

        _disableDragOnLongPress() {
            if (!this.isdragClone && this.dragOnLongPressEnabled) {
                if (this.utilsApi) this.utilsApi.removeEventListener(this, 'longpress', this.dragLongpressEvent, 'polymerEvent', this);
                this.dragOnLongPressEnabled = false;
            }
        }

        _initDragDrop(isdraggable, isdroppable, dragonlongpress) {

            if (!this.isdesignmode && !this.isdragClone) {

                if (dragonlongpress) this._enableDragOnLongPress();
                else this._disableDragOnLongPress();

                if (isdraggable || isdroppable) {

                    const [hasTags, tagNames] = this._containsUnsupportedCloneTags();
                    if (hasTags) {
                        log.warn(`[DragDropMixin] ${this.tagName}#${this.id} contains the unsupported tag(s): ${tagNames.join()}. Make sure to overlay these tags with a div while the component is in dragmode.`);
                    }

                    if (this.dndApi) {
                        if (this.dndApi.isDragMode()) {
                            if (isdraggable) this._addDragSupport();
                            else this._removeDragSupport();
                            if (isdroppable) this._addDropSupport();
                            else this._removeDropSupport();
                        }
                    } else {
                        this._log('Drag and Drop API not found!', 'ERROR');
                    }

                    if (this.dragDropStartEvent === null && this.utilsApi) {
                        this.dragDropStartEvent = this.utilsApi.addEventListener(this, 'DRAG_DROP_ENABLED', (maID, miID, message) => {
                            this._enableDragDrop(maID, miID, message);
                        }, 'runtimeEvent');
                    }
                    if (this.dragDropEndEvent === null && this.utilsApi) {
                        this.dragDropEndEvent = this.utilsApi.addEventListener(this, 'DRAG_DROP_DISABLED', (maID, miID, message) => {
                            this._disableDragDrop(maID, miID, message);
                        }, 'runtimeEvent');
                    }

                    if (!this.initDragDropDone) this.initDragDropDone = true;

                } else if (!isdraggable && !isdroppable && this.initDragDropDone) {


                    if (this.dragDropStartEvent !== null && this.utilsApi) {
                        this.utilsApi.removeEventListener(this, 'DRAG_DROP_ENABLED', this.dragDropStartEvent, 'runtimeEvent');
                        this.dragDropStartEvent = null;
                    }

                    if (this.dragDropEndEvent !== null && this.utilsApi) {
                        this.utilsApi.removeEventListener(this, 'DRAG_DROP_DISABLED', this.dragDropEndEvent, 'runtimeEvent');
                        this.dragDropEndEvent = null;
                    }

                    this.initDragDropDone = false;
                    this._disableDragDrop();
                }
            }
        }

        _enableDragDrop(maID, miID, message) {
            if (this.isdraggable) {
                this._addDragSupport();
            }
            if (this.isdroppable) {
                this._addDropSupport();
            }
            this.onComponentDragDropEnabled(maID, miID, message);
            this.isdragmode = true;
        }

        _disableDragDrop(maID, miID, message) {
            if (this.dragSupportEnabled) {
                this._removeDragSupport();
            }
            if (this.dropSupportEnabled) {
                this._removeDropSupport();
            }
            this.onComponentDragDropDisabled(maID, miID, message);
            this._removeClone();
            this.isdragmode = false;
        }

        _addDropSupport() {
            this.classList.add('sig-element-isdroppable');
            this.dropSupportEnabled = true;
        }

        _removeDropSupport() {
            this.classList.remove('sig-element-isdroppable');
            this.dropSupportEnabled = false;
        }

        _addDragSupport() {
            const isFirefoxAndroid = /Android.+Firefox\//.test(navigator.userAgent);
            if (isFirefoxAndroid) {
                this.sigSetTimeout(() => {
                    this.classList.add('sig-element-isdraggable');
                }, 10);
            } else {
                this.classList.add('sig-element-isdraggable');
            }
            this.dragSupportEnabled = true;
        }

        _removeDragSupport() {
            this.classList.remove('sig-element-isdraggable');
            this.dragSupportEnabled = false;
        }

        onComponentDragDropEnabled(maID, miID, message) {
        }

        onComponentDragDropDisabled(maID, miID, message) {
        }

        onComponentLongpress(evt) {
            this._publishRuntimeEvent('DRAG_DROP_ENABLED', evt);
        }

        onComponentDragstart(evt) {
            this.isdragged = true;
            document.body.classList.add('cursor-grabbing');
            this._createClone(evt);
            this._publishRuntimeEvent('DRAG_START', evt);
        }

        onComponentDrag(evt) {
            if (this.isdragged) {
                if (this.dragClone instanceof HTMLElement) {
                    const clonePosX = this.dragClonePosX + evt.detail.ddx / this.appScaleFactor.x;
                    const clonePosY = this.dragClonePosY + evt.detail.ddy / this.appScaleFactor.y;
                    this.dragClone._setBounds(clonePosY, clonePosX);
                    this.dragClonePosX = clonePosX;
                    this.dragClonePosY = clonePosY;
                    evt.setDragData('activeDropTarget', this.activeDropTarget);
                    evt.setDragData('activeDropTargets', this.activeDropTargets);
                    this._publishRuntimeEvent('DRAG_MOVE', evt);
                    if (!this.dragCloneVisible) this._showDragClone();
                }
            }
        }

        onComponentDragenter(evt) {
            this._publishRuntimeEvent('DRAG_ENTER', evt);
        }

        onComponentDragover(evt) {
            this._publishRuntimeEvent('DRAG_OVER', evt);
        }

        onComponentDragleave(evt) {
            this._publishRuntimeEvent('DRAG_LEAVE', evt);
        }

        onComponentDrop(evt) {
            this._publishRuntimeEvent('DRAG_DROP', evt);
        }

        onComponentDragend(evt) {
            this._removeClone();
            document.body.classList.remove('cursor-grabbing');
            this.isdragged = false;
            this._publishRuntimeEvent('DRAG_END', evt);
        }

        onRouteChangedWhileDrag(maID, miID, message) {
        }

        onCancelCallback(callback, evt) {
        }

        _cloneComponent(component, deep = true) {
            if (component instanceof HTMLElement) {
                const clone = component.cloneNode(deep);
                this._walkNodeTree(clone, (target) => {
                    const source = document.getElementById(target.id);
                    this._cloneProperties(source, target);
                    target.isdragClone = true;
                    target.sourceId = this.id;
                    target.id = source.id + this.cloneSuffix;
                    this._stripSigClasses(target);
                });
                return clone;
            } else {
                this._log('The source element is not a valid HTML Element');
                return null;
            }
        }

        _createClone(evt) {
            let clone = null;

            const app = document.getElementsByTagName('sig-app')[0];
            const appScaleFactor = app.getScaleFactor();
            let cloneSource = this;

            if (this.previewNode !== null) {
                if (this.previewNode instanceof HTMLElement) {
                    if (this.previewNode.mixins && this.previewNode.mixins.BaseMixin) {
                        cloneSource = this.previewNode;
                    } else {
                        log.error('The custom preview node does not contain the Base Mixin!');
                    }
                } else {
                    log.error('The custom preview node is not a valid html element!');
                }
            }

            clone = this._cloneComponent(cloneSource, true);

            if (clone instanceof HTMLElement) {
                clone.id = this.id + this.cloneSuffix;

                clone.style.zIndex = 2147483400;
                clone.style.visibility = 'hidden';

                clone.removeAttribute('draggable');
                clone.isdraggable = false;
                clone.isdroppable = false;
                clone.isdragmode = false;

                if (this.draggedOpacity) clone.style.setProperty(this.draggedOpacityPropertyName, this.draggedOpacity);

                const absoluteRotation = Math.abs(cloneSource.realrotation);
                const isRotated = (absoluteRotation === 0 || absoluteRotation === 360 || absoluteRotation === 180) ? false : true;

                clone._setBounds(0, 0, undefined, undefined, cloneSource.realrotation);
                clone.classList.add('sig-element-isdragclone');
                app.appendChild(clone);

                if (typeof clone._applyshadowDomElementsMap === 'function') clone._applyshadowDomElementsMap();
                clone._applyFontMap();
                const hasDomIf = (clone.shadowRoot && clone.shadowRoot.querySelectorAll('dom-if').length > 0) ? true : false;
                if (hasDomIf) {
                    clone.sigAddEventListener('dom-change', () => {
                        if (typeof this.dragClone._applyshadowDomElementsMap === 'function') this.dragClone._applyshadowDomElementsMap(true);
                        this.dragClone._applyFontMap();
                    });
                }

                const sourceScaledBounds = cloneSource.getBoundingClientRect();
                const cloneScaledBounds = clone.getBoundingClientRect();

                const normalizedScaleFactor = {
                    x: sourceScaledBounds.width / cloneScaledBounds.width,
                    y: sourceScaledBounds.height / cloneScaledBounds.height
                };

                const scaleX = (isRotated) ? normalizedScaleFactor.y : normalizedScaleFactor.x;
                const scaleY = (isRotated) ? normalizedScaleFactor.x : normalizedScaleFactor.y;

                if (scaleX !== 1 || scaleY !== 1) clone.style.transform = clone.style.transform + ` scale(${scaleX}, ${scaleY})`;
                if (clone.tagName === 'SIG-COMPOSITE-CONTAINER') clone.refresh(undefined, true, true);

                const cloneRealBounds = clone.getControlRectangleBounds();

                const cloneOffsetX = cloneRealBounds.width / 2;
                const cloneOffsetY = cloneRealBounds.height / 2;
                const isAppleMobile = (window.sigApi && window.sigApi.browser) ? window.sigApi.browser.isAppleMobile() : false;
                const visualViewportOffsetX = (isAppleMobile) ? visualViewport.offsetLeft / appScaleFactor.x : 0;
                const visualViewportOffsetY = (isAppleMobile) ? visualViewport.offsetTop / appScaleFactor.y : 0;
                const clonePosX = evt.detail.x / appScaleFactor.x - cloneOffsetX + visualViewportOffsetX;
                const clonePosY = evt.detail.y / appScaleFactor.y - cloneOffsetY + visualViewportOffsetY;
                clone._setBounds(clonePosY, clonePosX);

                this.dragClone = clone;
                this.appScaleFactor = appScaleFactor;
                this.dragClonePosX = clonePosX;
                this.dragClonePosY = clonePosY;
                this.visualViewportOffsetX = visualViewportOffsetX;
                this.visualViewportOffsetY = visualViewportOffsetY;

            }
        }

        _removeClone() {
            if (this.dragClone instanceof HTMLElement) {
                this._hideDragClone();
                this.dragClone.remove();
                this.dragClone = null;
            }
        }

        _cloneProperties(source, target) {
            if (source instanceof HTMLElement && target instanceof HTMLElement) {
                if (source.constructor.hasOwnProperty('properties')) {
                    const properties = source.constructor.properties;
                    for (const prop in properties) {
                        target[prop] = source[prop];
                    }
                }
                this.mandatoryCloneProperties.forEach(property => {
                    if (source[property] !== undefined) target[property] = source[property];
                });
            }
        }

        _walkNodeTree(node, func) {
            func(node);
            node = node.firstChild;
            while (node) {
                this._walkNodeTree(node, func);
                node = node.nextSibling;
            }
        }

        _findDropTargets(posX = 0, posY = 0) {
            const multipleDropTargetsSupport = (this.dndApi && typeof this.dndApi.getMultipleDropTargetsSupport === 'function') ? this.dndApi.getMultipleDropTargetsSupport() : true;
            const reverseDropTargetsOrder = this.dndApi ? this.dndApi.getReverseDropTargetsOrder() : false;
            const targets = document.elementsFromPoint(posX - window.scrollX / this.appScaleFactor.x + this.visualViewportOffsetX, posY - window.scrollY / this.appScaleFactor.y + this.visualViewportOffsetY);
            let dropTargets = [];
            for (let index = 0; index < targets.length; index += 1) {
                if (!multipleDropTargetsSupport && dropTargets.length === 1) break;
                const target = targets[index];
                const isValidTarget = (this.dndApi) ? this.dndApi.isValidDropTarget(target.id) : true;
                if (isValidTarget && target instanceof HTMLElement && target.classList.contains('sig-element-isdroppable')) {
                    dropTargets.push(target);
                }
            }
            if (dropTargets.length > 1) dropTargets = Array.from(new Set(dropTargets));
            return (reverseDropTargetsOrder) ? dropTargets.reverse() : dropTargets;
        }

        _getDropzonesNotInTargets(targets) {
            const missingDropzones = [];
            if (this.validDropTargets.size > 0) {
                this.validDropTargets.forEach((dropzone, id) => {
                    if (!targets.find(target => target.id === id)) missingDropzones.push(dropzone);
                });
            }
            return missingDropzones;
        }

        _setEventData(evt) {
            evt.dragData = this.dragData;
            evt.getDragData = (property) => {
                if (this.dragData.hasOwnProperty(property)) {
                    return this.dragData[property];
                } else {
                    return undefined;
                }
            };
            evt.setDragData = (property, data) => {
                if (typeof property === 'string') {
                    this.dragData[property] = data;
                } else {
                    log.error('Could not set drag data!');
                }
            };
            evt.clearDragData = (property) => {
                if (typeof property === 'string' && this.dragData.hasOwnProperty(property)) {
                    delete (this.dragData[property]);
                } else if (property === undefined) {
                    this.dragData = {};
                } else {
                    log.error('Could not clear drag data!');
                }
            };
            evt.stopCallbacksPropagation = (globalLock = false) => {
                this._stopCallbacksPropagation(globalLock);
            };
        }

        _stripSigClasses(component) {
            if (component instanceof HTMLElement) {
                const protectedClassnames = ['sig-element-invisible', 'sig-element-not-ready'];
                const classnames = [];
                component.classList.forEach(classname => {
                    if (classname.startsWith('sig-') && protectedClassnames.indexOf(classname) === -1) {
                        classnames.push(classname);
                    }
                });
                classnames.forEach(classname => {
                    component.classList.remove(classname);
                });
            } else {
                log.error('The given component is not a valid html elememt!');
            }
        }

        _showDragClone() {
            if (this.dragClone instanceof HTMLElement) {
                this.dragClone.style.visibility = 'visible';
            }
            this.dragCloneVisible = true;
        }

        _hideDragClone() {
            if (this.dragClone instanceof HTMLElement) {
                this.dragClone.style.visibility = 'hidden';
            }
            this.dragCloneVisible = false;
        }

        setDragPreviewNode(node) {
            if (node instanceof HTMLElement) {
                this.previewNode = node;
                return true;
            }
            return false;
        };

        getDragPreviewNode() {
            return this.previewNode;
        }

        removeDragPreviewNode(removeFromDom = false) {
            if (this.previewNode instanceof HTMLElement) {
                if (removeFromDom === true) this.previewNode.remove();
            }
            this.previewNode = null;
        }

        _containsUnsupportedCloneTags(component = this) {
            let hasTags = false;
            const foundTags = [];
            if (component instanceof HTMLElement) {
                if (component.shadowRoot) {
                    const tags = this.unsupportedCloneTags;
                    for (const tag of tags) {
                        const elements = component.shadowRoot.querySelectorAll(tag);
                        if (elements.length > 0) {
                            foundTags.push(tag);
                            hasTags = true;
                            break;
                        }
                    }
                } else {
                    this._log('No shadow root opened, nothing to check.');
                }
            } else {
                this._log('No valid html element.');
            }
            return [hasTags, foundTags];
        }

        addMandatoryCloneProperty(property) {
            if (typeof property === 'string' && this.mandatoryCloneProperties.indexOf(property) === -1) {
                this.mandatoryCloneProperties.push(property);
                return true;
            }
            return false;
        }

        removeMandatoryCloneProperty(property) {
            if (typeof property === 'string') {
                const index = this.mandatoryCloneProperties.indexOf(property);
                if (index > -1) {
                    this.mandatoryCloneProperties.splice(index, 1);
                    return true;
                }
            }
            return false;
        }

        clearAllMandatoryCloneProperties() {
            this.mandatoryCloneProperties = [];
        }

        getMandatoryCloneProperties() {
            return this.mandatoryCloneProperties;
        }

        setDraggedOpacity(opacity) {
            if (!isNaN(opacity) && opacity >= 0 && opacity <= 1) {
                this.draggedOpacity = opacity;
                return true;
            }
            this._log(`The dragged opacity value ${opacity} is invalid. It must be a value from 0.0 to 1.0!`, 'ERROR');
            return false;
        }

        getDraggedOpacity() {
            return this.draggedOpacity;
        }

        resetDraggedOpacity() {
            this.draggedOpacity = undefined;
        }

        addLongpressSupport(delay = this.longpressdelay) {
            if (!isNaN(delay) && delay > 0) {
                this.longpressdelay = delay;
                this.dragonlongpress = true;
                return true;
            }
            this._log(`The delay value ${delay} is invalid. It must be a number bigger than 0!`, 'ERROR');
            return false;
        }

        removeLongpressSupport() {
            this.dragonlongpress = false;
            return true;
        }

        _executeCancelableCallback(callback, targets, target, evt) {
            if (target.id === this.callbackLocks.get(callback) || !this.callbackLocks.has(callback)) {
                const breakCallback = target[callback](evt);
                if (breakCallback === false) {
                    this.callbackLocks.set(callback, target.id);
                }
            } else {
                target.onCancelCallback(callback, evt);
            }
        }

        _clearScpTarget(force = false) {
            if (!this.scpGlobalLock || force) {
                this.scpTarget = null;
                this.globalLock = false;
            }
        }

        _clearActiveDropTargetsAndLocks() {
            this.activeDropTarget = null;
            this.activeDropTargets = null;
            this.currentTarget = null;
            this.validDropTargets.clear();
            this.callbackLocks.clear();
        }

        getActiveDropTarget() {
            return this.activeDropTarget;
        }

        getActiveDropTargets() {
            return this.activeDropTargets;
        }

        _stopCallbacksPropagation(globalLock) {
            this.scpTarget = this.currentTarget;
            this.scpGlobalLock = globalLock;
        }
    };
});
DragDropSupportElm.mixinName = 'DragDropSupportElm';

export const DragDropSupportApp = dedupingMixin((superClass) => {
    return class extends superClass {

        constructor() {
            super();
            this.target = null;
            if (!this.isdesignmode) {
                this.sigAddEventListener('track', (evt) => {
                    if (this.isdragmode) {
                        this._handleDrag(evt);
                    }
                }, 'polymerEvent');

                this.sigAddEventListener('mousedown', (evt) => {
                    if (this.isdragmode) {
                        if (this.target instanceof HTMLElement && this._isValidFunction(this.target.dragendEvent)) this.target.dragendEvent(evt);
                    }
                }, 'jsEvent', document);

                this.sigAddEventListener('DRAG_DROP_ENABLED', (maID, miID, message) => {
                    this.isdragmode = true;
                }, 'runtimeEvent');

                this.sigAddEventListener('DRAG_DROP_DISABLED', (maID, miID, message) => {
                    this.isdragmode = false;
                }, 'runtimeEvent');

                this.sigAddEventListener('APPROUTE_CHG', (maID, miID, message) => {
                    if (this.isdragmode && this.target !== null) {
                        if (this.target instanceof HTMLElement && this.target.isdragged) {
                            this.target.onRouteChangedWhileDrag(maID, miID, message);
                        }
                    }
                }, 'runtimeEvent');
            }
        }

        _handleDrag(evt) {
            const target = (this.target === null) ? this._findFirstDraggableTarget(evt) : this.target;
            const state = evt.detail.state;
            if (target instanceof HTMLElement && target.isdraggable) {
                switch (state) {
                    case 'start':
                        if (this.target === null) this.target = target;
                        if (this._isValidFunction(target.dragstartEvent)) target.dragstartEvent(evt);
                        break;
                    case 'track':
                        if (this._isValidFunction(target.dragEvent)) target.dragEvent(evt);
                        break;
                    case 'end':
                        if (this._isValidFunction(target.dragendEvent)) target.dragendEvent(evt);
                        this.target = null;
                        break;
                }
            }
        }

        _isValidFunction(fnc) {
            if (typeof fnc !== 'function') return false;
            return true;
        }

        _findFirstDraggableTarget(evt) {
            let target = event.target;
            const path = event.composedPath().reverse();
            for (const element of path) {
                if (element.isdraggable) {
                    target = element;
                    break;
                }
            }
            return target;
        }
    };
});
DragDropSupportApp.mixinName = 'DragDropSupportApp';