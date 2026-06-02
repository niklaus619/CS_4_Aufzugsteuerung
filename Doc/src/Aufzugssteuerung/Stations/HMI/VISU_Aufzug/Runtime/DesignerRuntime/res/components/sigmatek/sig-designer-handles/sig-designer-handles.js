import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import { Handles } from './sig-designer-handles-mixin.js';
import './sig-designer-handle.js';
import './sig-designer-handle-ghost.js';

class LasalRuntimeSigDesignerHandles extends Handles(LasalRuntimeSigElement) {
    static get is() {
        return "sig-designer-handles";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style>
            :host {
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                width: auto;
                height: auto;
                position: absolute;
                overflow: hidden;
                pointer-events: all;
                z-index: 1000;
            }

            #frame {
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                position: relative;
                background-color: transparent;
            }
        </style>
        <div id="frame" class="controller"></div>
        `
    }

    static get properties() {
        let props = {
            spacing: {
                type: Number,
                value: 0
            },
            isselected: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_toggleSelected'
            },
            ismaster: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_toggleMaster'
            },
            showghost: {
                type: Boolean,
                value: false,
                observer: '_toggleGhost'
            },
            viewportoffset: {
                type: Object,
                value: {
                    top: 0,
                    left: 0,
                    rulersmargin: 0
                }
            }
        }
        return props;
    }

    constructor() {
        super();
        this.parent = null;
        this.parentBoundingClientRect = null;
        this.addToolsAfterNextRenderer = true;
        this.ghost = null;
        this.handle = null;
        this.sourceEvent = null;
        this.appWidth = 0;
        this.appHeight = 0;
        this.newLeft = 0;
        this.newTop = 0;

        this.deltaLeft = 0;
        this.deltaTop = 0;
        this.deltaWidth = 0;
        this.deltaHeight = 0;

        this.realTop = 0;
        this.realLeft = 0;
        this.realHeight = 0;
        this.realWidth = 0;
        this.issuspended = { issuspendedX: null, issuspendedY: null, issuspendedDirX: 0, issuspendedDirY: 0 };

        this.oldBounds = {};
        this.newBounds = {};
        this.coreEvent = null;
        this.coreEventHandler = null;
        this.controlEvent = null;
        this.controlEventHandler = null;
        this.controlObserver = null;
    }

    connectedCallback() {
        super.connectedCallback();
        this.parent = this.shadowRoot.host.parentNode.host;
        this.parent.isdesignercontrol = true;
        this.viewportoffset = this._getInitalViewPortOffset();
        this.oldBounds = this.getControlBounds(this.parent);
        this.newBounds = this.oldBounds; 
        if (this.addToolsAfterNextRenderer) {
            SigPolymer.beforeNextRender(this, function () {
                this._createToolsAsync()
            });
        }
        this._subscribeEvents();
        this._getAppProps();
    }

    ready() {
        super.ready();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this._unsubscribeEvents();
        this._remove(this.handle);
        this._remove(this.ghost);
    }

    _getInitalViewPortOffset() {
        let viewPortOffset = {};
        const preferences = sigApi.designer.getPreferences();
        viewPortOffset.left = preferences.app.offsetLeft;
        viewPortOffset.top = preferences.app.offsetTop;
        viewPortOffset.rulersmargin = preferences.rulers.rulersmargin;
        return viewPortOffset;
    }

    _createToolsAsync() {
        this.parent.isselected = this.isselected;
        this.parent.ismaster = this.ismaster;
        this._create('handle', 'sig-designer-handle', {
            parent: this.parent,
            hidden: !this.isselected,
            isselected: this.isselected,
            ismaster: this.ismaster
        }, this.parent);
        this._create('ghost', 'sig-designer-ghost', {
            parent: this.parent
        }, this.parent);
    }

    _createToolsInDashboard(dashboard, parent) {
        this._create('handle', 'sig-designer-handle', {
            parent: parent
        }, parent, dashboard);
        this._create('ghost', 'sig-designer-ghost', {
            parent: parent
        }, parent, dashboard);
    }

    _getAppProps() {
        this.appWidth = parseInt(document.querySelector('sig-app').style.width, 10);
        this.appHeight = parseInt(document.querySelector('sig-app').style.height, 10);

        if (isNaN(this.appWidth)) this.appWidth = parseInt(document.querySelector('sig-app').style.getPropertyValue('--theme-sig-element-width'), 10);
        if (isNaN(this.appHeight)) this.appHeight = parseInt(document.querySelector('sig-app').style.getPropertyValue('--theme-sig-element-height'), 10);
    }


    _subscribeEvents() {
        if (this.coreEventHandler === null) {
            this.coreEventHandler = (e) => {
                this._handleCoreEvent(e);
            }
        }
        if (this.controlEventHandler === null) {
            this.controlEventHandler = (e) => {
                this._handleControlEvent(e);
            }
        }
        if (this.coreEvent === null) {
            this.coreEvent = sigApi.designer.getCoreEventInstance();
            this.coreEvent.subscribe(this.coreEventHandler);
        }
        if (this.controlEvent === null) {
            this.controlEvent = sigApi.designer.getControlEventInstance();
            this.controlEvent.subscribe(this.controlEventHandler);
            this.controlEvent.source = this.parent;
        }
    }

    _dispatchSuspendEvent(sourceEvent) {
        if (this.coreEvent !== null) {
            const _data = {
                issuspendedX: this.issuspended.issuspendedX,
                issuspendedY: this.issuspended.issuspendedY,
                issuspendedDirX: this.issuspended.issuspendedDirX,
                issuspendedDirY: this.issuspended.issuspendedDirY
            };
            this.coreEvent.data = _data;
            this.coreEvent.moveSuspend();

            this._dispatchMoveEvent();
        }
    }

    _dispatchResumeEvent() {
        if (this.coreEvent !== null) {
            const _data = {
                issuspendedX: this.issuspended.issuspendedX,
                issuspendedY: this.issuspended.issuspendedY,
                issuspendedDirX: this.issuspended.issuspendedDirX,
                issuspendedDirY: this.issuspended.issuspendedDirY
            };
            this.coreEvent.data = _data;
            this.coreEvent.moveResume();
        }
    }

    _dispatchMoveEvent() {
        if (this.coreEvent !== null) {
            const _data = {
                movementX: 0,
                movementY: 0
            };

            this.coreEvent.data = _data;
            this.coreEvent.move();
        }
    }

    _unsubscribeEvents() {
        this.coreEvent.unsubscribe(this.coreEventHandler);
        this.controlEvent.unsubscribe(this.controlEventHandler);
    }

    _toggleSelected(newval, oldval) {
        if (oldval !== undefined && this.parent !== null && this.handle !== null) {
            this.parent.isselected = newval;
            this.handle.isselected = newval;
            if (!newval && this.ismaster) {
                this.ismaster = false;
            }
        }
        this.sourceEvent = null;
    }

    _toggleMaster(newval, oldval) {
        if (oldval !== undefined && this.parent !== null && this.handle !== null) {
            this.parent.ismaster = newval;
            this.handle.ismaster = newval;
            if (newval && !this.isselected) {
                this.isselected = true;
            }
        }
    }

    _toggleGhost(newval, oldval) {
        if (oldval !== undefined && this.parent !== null && this.ghost !== null) {
            this.ghost.hidden = !newval;
        }
    }

    _handleCoreEvent(e) {
        const type = e.detail.type;
        const source = e.detail.source;
        const target = e.detail.target;
        const data = e.detail.data;
        const sourceEvent = e.detail.sourceEvent;
        const mode = sigApi.designer.mode();

        let altKey = false;
        let ctrlKey = false;
        let shiftKey = false;
        let isTarget = false;

        if (sourceEvent !== null) {
            altKey = sourceEvent.altKey;
            shiftKey = sourceEvent.shiftKey;
            ctrlKey = sourceEvent.ctrlKey;
        }

        if (target !== null) {
            if (target.id === this.parent.id) {
                isTarget = true;
            }
        }

        switch (type) {

            case 'movestart':
                if (this.isselected) {
                    this.realRotation = (this.parent.rotation % 360 + 360) % 360;
                    this.oldBounds = this.getControlBounds(this.parent);
                    this.realTop = this.oldBounds.top;
                    this.realLeft = this.oldBounds.left;
                    this.newTop = 0;
                    this.newLeft = 0;
                    this.issuspended = { issuspendedX: null, issuspendedY: null, issuspendedDirX: 0, issuspendedDirY: 0 };

                    const _elementBounds = this.getControlRectangleBounds(this.parent);
                    this.boxTop = _elementBounds.top + _elementBounds.translateY;
                    this.boxLeft = _elementBounds.left + _elementBounds.translateX;
                    this.boxBottom = _elementBounds.bottom + _elementBounds.translateY;
                    this.boxRight = _elementBounds.right + _elementBounds.translateX;
                    this.boxWidth = this.boxRight - this.boxLeft;
                    this.boxHeight = this.boxBottom - this.boxTop;

                    if (this.ghost !== null) {
                        this.ghost._setBounds(
                            this.oldBounds.top,
                            this.oldBounds.left,
                            this.oldBounds.height,
                            this.oldBounds.width
                        );
                    }
                }
                break;

            case 'move':
                if (this.isselected) {
                    this.showghost = true;
                    this.handle.hidden = true;
                    this.newTop += data.movementY;
                    this.newLeft += data.movementX;
                    this.realTop = this.oldBounds.top + this.newTop;
                    this.realLeft = this.oldBounds.left + this.newLeft;

                    if (this.ghost !== null) {

                        this._setValidBounds(type, data, sourceEvent);
                        const _mouseEvent = sourceEvent instanceof MouseEvent;
                        const _keyboardEvent = sourceEvent instanceof KeyboardEvent;

                        if (this.issuspended.issuspendedX !== null) {
                            if (this.newLeft * this.issuspended.issuspendedDirX > this.issuspended.issuspendedX * this.issuspended.issuspendedDirX) this.realLeft = this.oldBounds.left + this.issuspended.issuspendedX;
                            else if (this.newLeft * this.issuspended.issuspendedDirX < this.issuspended.issuspendedX * this.issuspended.issuspendedDirX) {
                                if (_mouseEvent || _keyboardEvent) { this.issuspended.issuspendedX = null; this._dispatchResumeEvent(); }
                            }
                        }

                        if (this.issuspended.issuspendedY !== null) {
                            if (this.newTop * this.issuspended.issuspendedDirY > this.issuspended.issuspendedY * this.issuspended.issuspendedDirY) this.realTop = this.oldBounds.top + this.issuspended.issuspendedY;
                            else if (this.newTop * this.issuspended.issuspendedDirY < this.issuspended.issuspendedY * this.issuspended.issuspendedDirY) {
                                if (_mouseEvent || _keyboardEvent) { this.issuspended.issuspendedY = null; this._dispatchResumeEvent(); }
                            }
                        }

                        this.ghost._setBounds(
                            this.realTop,
                            this.realLeft
                        )
                    }
                }
                break;

            case 'movesuspend':
                if (this.isselected) {
                    this.issuspended.issuspendedX = data.issuspendedX;
                    this.issuspended.issuspendedY = data.issuspendedY;
                    this.issuspended.issuspendedDirX = data.issuspendedDirX;
                    this.issuspended.issuspendedDirY = data.issuspendedDirY;
                }
                break;
            case 'moveresume':
                if (this.isselected) {
                    this.issuspended.issuspendedX = data.issuspendedX;
                    this.issuspended.issuspendedY = data.issuspendedY;
                    this.issuspended.issuspendedDirX = data.issuspendedDirX;
                    this.issuspended.issuspendedDirY = data.issuspendedDirY;
                }
                break;

            case 'movestop':
                if (this.isselected) {
                    this.showghost = false;
                    this.newBounds.left = Math.round(this.realLeft);
                    this.newBounds.top = Math.round(this.realTop);
                    this.newBounds.height = this.oldBounds.height;
                    this.newBounds.width = this.oldBounds.width;

                    if (!ctrlKey || mode === 3) { 
                        this.parent._setBounds(this.newBounds.top, this.newBounds.left);
                        this.handle.hidden = false;
                    }
                }
                break;

            case 'movecancel':
                if (this.isselected) {
                    this.showghost = false;
                    this.handle.hidden = false;
                }
                break;

            case 'resizestart':
                if (this.isselected) {
                    this.oldBounds = this.getControlBounds(this.parent);

                    this.deltaLeft = 0;
                    this.deltaTop = 0;
                    this.deltaWidth = 0;
                    this.deltaHeight = 0;

                    this.realTop = this.oldBounds.top;
                    this.realLeft = this.oldBounds.left;
                    this.realHeight = this.oldBounds.height;
                    this.realWidth = this.oldBounds.width;

                    this.ratio = this.oldBounds.height / this.oldBounds.width;
                    this.realRotation = ((this.parent.rotation) % 360 + 360) % 360;
                    const _elementBounds = this.getControlRectangleBounds(this.parent);

                    this.boxTop = _elementBounds.top + _elementBounds.translateY;
                    this.boxLeft = _elementBounds.left + _elementBounds.translateX;
                    this.boxBottom = _elementBounds.bottom + _elementBounds.translateY;
                    this.boxRight = _elementBounds.right + _elementBounds.translateX;
                    this.boxWidth = this.boxRight - this.boxLeft;
                    this.boxHeight = this.boxBottom - this.boxTop;

                }
                break;

            case 'resize':
                if (this.isselected) {
                    const _keyboardEvent = sourceEvent instanceof KeyboardEvent;
                    this.showghost = true;
                    this.handle.hidden = true;


                    this.oldLeft = this.realLeft;
                    this.oldTop = this.realTop;
                    this.oldWidth = this.realWidth;
                    this.oldHeight = this.realHeight;

                    if (shiftKey) {
                        if (_keyboardEvent !== true) {
                            if (this.realRotation === 0 || this.realRotation === 180) {
                                data.movementY = (data.movementX * this.ratio * data.dirX * data.dirY);
                            } else if (this.realRotation === 90 || this.realRotation === 270) {
                                data.movementX = (data.movementY * this.ratio * data.dirX * data.dirY);
                            } else {
                                data.movementX = (data.movementY * this.ratio * data.dirX * data.dirY);
                            }
                        }
                    }

                    if (data.dirX === -1) this.deltaLeft += data.movementX;
                    if (data.dirY === -1) this.deltaTop += data.movementY;

                    let _corrStretchFaktor = 1;
                    if (ctrlKey && _keyboardEvent !== true) {
                        if (data.dirY === 1) this.deltaTop -= data.movementY;
                        if (data.dirX === 1) this.deltaLeft -= data.movementX;
                        _corrStretchFaktor = 2;
                    }
                    this.realTop = Math.min(Math.max(this.boxTop + this.deltaTop, 0), this.appHeight);
                    this.realLeft = Math.min(Math.max(this.boxLeft + this.deltaLeft, 0), this.appWidth);


                    this.deltaWidth += data.movementX * data.dirX;
                    this.deltaHeight += data.movementY * data.dirY;

                    let _corrWidth = this.deltaWidth;
                    let _corrHeight = this.deltaHeight;

                    if (this.realLeft <= 0 && (data.dirX < 0 || (ctrlKey && _keyboardEvent !== true))) _corrWidth = this.boxLeft;
                    if (this.realTop <= 0 && (data.dirY < 0 || (ctrlKey && _keyboardEvent !== true))) _corrHeight = this.boxTop;

                    if (this.boxRight + _corrWidth >= this.appWidth && (data.dirX > 0 || ctrlKey)) {
                        _corrWidth = this.appWidth - this.boxRight;
                        if (ctrlKey && _keyboardEvent !== true) this.realLeft = this.boxLeft - _corrWidth;
                    }
                    if (this.boxBottom + _corrHeight >= this.appHeight && (data.dirY > 0 || ctrlKey)) {
                        _corrHeight = this.appHeight - this.boxBottom;
                        if (ctrlKey && _keyboardEvent !== true) this.realTop = this.boxTop - _corrHeight;
                    }

                    _corrWidth = _corrWidth * _corrStretchFaktor;
                    _corrHeight = _corrHeight * _corrStretchFaktor;

                    if ((this.realRotation >= 0 && this.realRotation < 90) || (this.realRotation >= 180 && this.realRotation < 270)) {
                        this.realWidth = Math.max(Math.min(this.oldBounds.width + _corrWidth, this.appWidth), 0);
                        this.realHeight = Math.max(Math.min(this.oldBounds.height + _corrHeight, this.appHeight), 0);
                    } else if ((this.realRotation >= 90 && this.realRotation < 180) || (this.realRotation >= 270 && this.realRotation < 360)) {
                        this.realHeight = Math.max(Math.min(this.oldBounds.height + _corrWidth, this.appWidth), 0);
                        this.realWidth = Math.max(Math.min(this.oldBounds.width + _corrHeight, this.appHeight), 0);
                    }

                    if ((this.realRotation >= 0 && this.realRotation < 90) || (this.realRotation >= 180 && this.realRotation < 270)) {
                        if (this.realWidth === 0 && (ctrlKey && _keyboardEvent === true)) this.realLeft = this.oldLeft;
                        else if (this.realWidth === 0 && (data.dirX < 0 || (ctrlKey && _keyboardEvent !== true))) this.realLeft = this.oldLeft + (this.oldWidth / _corrStretchFaktor);

                        if (this.realHeight === 0 && (ctrlKey && _keyboardEvent === true)) this.realTop = this.oldTop;
                        else if (this.realHeight === 0 && (data.dirY < 0 || (ctrlKey && _keyboardEvent !== true))) this.realTop = this.oldTop + (this.oldHeight / _corrStretchFaktor);
                    } else if ((this.realRotation >= 90 && this.realRotation < 180) || (this.realRotation >= 270 && this.realRotation < 360)) {
                        if (this.realWidth === 0 && (ctrlKey && _keyboardEvent === true)) this.realTop = this.oldTop;
                        else if (this.realWidth === 0 && (data.dirY < 0 || (ctrlKey && _keyboardEvent !== true))) this.realTop = this.oldTop + (this.oldWidth / _corrStretchFaktor);

                        if (this.realHeight === 0 && (ctrlKey && _keyboardEvent === true)) this.realLeft = this.oldLeft;
                        else if (this.realHeight === 0 && (data.dirX < 0 || (ctrlKey && _keyboardEvent !== true))) this.realLeft = this.oldLeft + (this.oldHeight / _corrStretchFaktor);
                    }

                    if (this.ghost !== null) {
                        this.ghost._setBounds(
                            this.realTop,
                            this.realLeft,
                            this.realHeight,
                            this.realWidth
                        );
                    }

                }
                break;
            case 'resizestop':
                if (this.isselected) {
                    this.showghost = false;
                    this.newBounds.left = Math.round(this.realLeft);
                    this.newBounds.top = Math.round(this.realTop);
                    this.newBounds.height = Math.round(this.realHeight);
                    this.newBounds.width = Math.round(this.realWidth);
                    this.parent._setBounds(this.newBounds.top, this.newBounds.left, this.newBounds.height, this.newBounds.width);
                    this.handle.hidden = false;
                }
                break;
            case 'resizecancel':
                if (this.isselected) {
                    this.showghost = false;
                    this.handle.hidden = false;
                }
                break;

            case 'setmaster':
                if (isTarget) {
                    this.ismaster = true;
                    this._log(`${this.parent.id} is now the new master`);
                } else {
                    this.ismaster = false;
                }
                break;

            case 'unselectall':
                if (this.isselected) {
                    this.isselected = false;
                }
                break;

            case 'unselect':
                if (this.isselected && isTarget) {
                    this.isselected = false;
                    if (this.ismaster) this.ismaster = false;
                }
                break;

            case 'multiunselect':
                if (this.isselected && data.ids.indexOf(this.parent.id) > -1) {
                    this.isselected = false;
                }
                break;

            case 'selectall':
                if (!this.isselected) {
                    this.isselected = true;
                }
                break;

            case 'select':
                if (!this.isselected && isTarget) {
                    this.isselected = true;
                }
                break;

            case 'multiselect':
                if (!this.isselected && data.ids.indexOf(this.parent.id) > -1) {
                    this.isselected = true;
                }
                break;

            case 'lassostart':
                this.parentBoundingClientRect = this.getControlRectangleBounds(this.parent);
                if (!this.isselected) {
                    this.handle.hidehandles = true;
                }
                break;

            case 'lassomove':
                const isInRectangle = this._inRectangle(data.posX, data.posY, data.width, data.height, data.rangeExtend, this.viewportoffset.rulersmargin);
                if (!this.isselected && isInRectangle && !shiftKey) {
                    this.isselected = true;
                } else if (this.isselected && isInRectangle && !ctrlKey && shiftKey) {
                    this.isselected = false;
                    this.handle.hidehandles = true;
                } else if (this.isselected && !isInRectangle && !ctrlKey && !shiftKey) {
                    this.isselected = false;
                    this.handle.hidehandles = true;
                }
                break;

            case 'lassostop':
                this.handle.hidehandles = false;
                break;

            case 'lassocancel':
                this.handle.hidehandles = false;
                break;

            case 'setrulers':
                if (data.rulersmargin !== undefined && data.displayrulers !== undefined) {
                    if (data.displayrulers === true) {
                        this.viewportoffset.rulersmargin = data.rulersmargin;
                    } else {
                        this.viewportoffset.rulersmargin = 0;
                    }
                }
                break;

            case 'rotatestart':
                if (this.isselected) {
                    this.oldBounds = this.getControlBounds(this.parent);
                    this.centerX = this.oldBounds.left + this.oldBounds.width / 2;
                    this.centerY = this.oldBounds.top + this.oldBounds.height / 2;
                    this.showghost = true;
                    this.handle.hidden = true;
                    this._log('Rotate Start');
                }
                break;

            case 'rotate':
                if (this.isselected) {
                    this.realRotation = this.getRealRotation(data.rotation + this.parent.rotation);
                    this.ghost._setRotation(this.realRotation, true, true);
                    this._log(`Rotate values: PARENT ${this.realRotation} DATA ${data.rotation} REAL ${this.realRotation}`);
                }
                break;

            case 'rotatestop':
                if (this.isselected) {
                    this.showghost = false;
                    this.parent.rotation = this.realRotation;
                    this.newBounds = this.getControlBounds(this.parent);
                    this.handle.hidden = false;
                }
                break;

            case 'rotatecancel':
                if (this.isselected) {
                    this.showghost = false;
                    this.handle.hidden = false;
                    this.newBounds = this.oldBounds;
                }
                break;
            case 'setmode':
                if (source && source.mode !== undefined) {
                    switch (source.mode) {
                        case 3:
                            this.handle.cursor = 'move';
                            break;
                        case 2:
                            this.handle.cursor = 'crosshair';
                            break;
                        case 1:
                            this.handle.cursor = 'grab';
                            break;
                        case 0:
                        default:
                            this.handle.cursor = 'default';
                            break;
                    }
                }
                break;
        }
    }

    _handleControlEvent(e) {
        const detail = e.detail;

        let altKey = false;
        let ctrlKey = false;
        let shiftKey = false;

        if (detail.sourceEvent !== null) {
            altKey = detail.sourceEvent.altKey;
            shiftKey = detail.sourceEvent.shiftKey;
            ctrlKey = detail.sourceEvent.ctrlKey;
        }

        if (detail.source.id !== this.parent.id) {
        } else {
            this._log('Skip own control events');
        }
    }

    _create(toolName, tagName, props = {}, parent, dashboard) {
        if (this[toolName] === null) {
            this[toolName] = document.createElement(tagName);
            this[toolName].setAttribute('id', parent.id + '-' + toolName);
            this[toolName] = Object.assign(this[toolName], props);
            if (this.addToolsAfterNextRenderer) {
                SigPolymer.afterNextRender(this, function () {
                    this._add(this[toolName], dashboard);
                });
            } else {
                this._add(this[toolName], dashboard);
            }
        }
    }

    _add(tool, dashboard) {
        if (tool instanceof HTMLElement) {
            if (dashboard instanceof HTMLElement) {
                dashboard.appendChild(tool);
            } else {
                this.parent.parentNode.appendChild(tool);
            }
            if (this.addToolsAfterNextRenderer) {
                this._log(`Added "${tool.tagName}" with id "${tool.id}" after next renderer`);
            } else {
                this._log(`Added "${tool.tagName}" with id "${tool.id}"`);
            }
        }
    }

    _remove(tool) {
        if (tool instanceof HTMLElement) {
            this._log(`Removed "${tool.tagName}" with id "${tool.id}"`);
            tool.remove();
        }
    }

    _inRectangle(posX = 0, posY = 0, width = 0, height = 0, rangeExtend = 0, viewportoffset = 0) {
        const clientRect = this.parentBoundingClientRect;
        let lassoX = posX;
        let lassoY = posY;
        let lassoHeight = Math.abs(height);
        let lassoWidth = Math.abs(width);

        if (width < 0) {
            lassoX = posX - lassoWidth;
        }
        if (height < 0) {
            lassoY = posY - lassoHeight;
        }

        const lassoLeft = lassoX - rangeExtend - viewportoffset - clientRect.translateX;
        const lassoRight = lassoX + lassoWidth + rangeExtend - viewportoffset - clientRect.translateX;
        const lassoTop = lassoY - rangeExtend - viewportoffset - clientRect.translateY;
        const lassoBottom = lassoY + lassoHeight + rangeExtend - viewportoffset - clientRect.translateY;

        if (lassoLeft < clientRect.left && lassoRight > clientRect.right) {
            if (lassoTop < clientRect.top && lassoBottom > clientRect.bottom) {
                return true;
            }
        }
        return false;
    }

    _resize() {
        if (this.handle !== null && this.isselected) {
            this.handle._fit();
        }
    }

    _bindControlObserver() {
        if (this.controlObserver === null && this.parent !== null) {
            this.controlObserver = new MutationObserver(mutations => {
                const currentBounds = this.getControlBounds(this.parent);
                const commandContext = sigApi.designer.getCommandContext();
                if ((JSON.stringify(this.oldBounds) !== JSON.stringify(currentBounds)) || commandContext === 'undo') {
                    this._log(`Changes in style attribute of ${this.parent.id} have changed control box! Handle needs update!`);
                    this._resize();
                }
            });

            const config = {
                attributes: true,
                childList: false,
                characterData: false,
                attributeFilter: ['style']
            }

            this.controlObserver.observe(this.parent, config);
            this._log(`Bound mutation observer to ${this.parent.id}`);
        } else {
            this._log(`Could not bind mutation observer to ${this.parent.id}`, 'ERROR');
        }
    }

    _removeControlObserver() {
        if (this.controlObserver !== null) {
            this.controlObserver.disconnect();
            this._log(`Removed mutation observer from ${this.parent.id}`);
        }
    }

    _setValidBounds(type = null, data, sourceEvent) {
        if (type === 'move') {
            if (this.boxLeft + this.newLeft < 0 && (this.issuspended.issuspendedX === null || this.issuspended.issuspendedX < -this.boxLeft)) {
                this.realLeft = 0; this.issuspended.issuspendedX = -this.boxLeft; this.issuspended.issuspendedDirX = -1;
                this._dispatchSuspendEvent(sourceEvent);
            }
            if (this.boxTop + this.newTop < 0 && (this.issuspended.issuspendedY === null || this.issuspended.issuspendedY < -this.boxTop)) {
                this.realTop = 0; this.issuspended.issuspendedY = -this.boxTop; this.issuspended.issuspendedDirY = -1;
                this._dispatchSuspendEvent(sourceEvent);
            }

            if (this.boxRight + this.newLeft > this.appWidth && (this.issuspended.issuspendedX === null || this.issuspended.issuspendedX > this.appWidth - this.boxRight)) {
                this.realLeft = this.appWidth - this.boxWidth; this.issuspended.issuspendedX = this.appWidth - this.boxRight; this.issuspended.issuspendedDirX = 1;
                this._dispatchSuspendEvent(sourceEvent);
            }
            if (this.boxBottom + this.newTop > this.appHeight && (this.issuspended.issuspendedY === null || this.issuspended.issuspendedY > this.appHeight - this.boxBottom)) {
                this.realTop = this.appHeight - this.boxHeight; this.issuspended.issuspendedY = this.appHeight - this.boxBottom; this.issuspended.issuspendedDirY = 1;
                this._dispatchSuspendEvent(sourceEvent);
            }
        }
    }

}
customElements.define(LasalRuntimeSigDesignerHandles.is, LasalRuntimeSigDesignerHandles);