import { setPassiveTouchGestures, passiveTouchGestures } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/settings.js';
import { gestures } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/gestures.js';
import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';
if (!passiveTouchGestures) setPassiveTouchGestures(true);

export const BaseMixin = dedupingMixin((superClass) => {
    return class extends superClass {

        constructor() {
            super();
            this.disconnected = false;
            this.isdesignmode = this._isDesignMode();
            this._waitForRequiredProps = true;
            this._isRuntimeValueUpdate = false;
            this._internalDefaultValuesApplied = false;
            this._propInitValueBackups = {}; 
            this.dispatchAllInternalEvents = false;

        }


        get baseElement() {
            return this.constructor.__baseElement;
        }

        get mixins() {
            return this.constructor.__mixed;
        }

        getPredefPropMap() {
            return this.predefPropsMap;
        }

        addPredefProps(array) {
            if (Array.isArray(array)) {
                for (let ii = 0, len = array.length; ii < len; ii += 1) {
                    this._addPredefProp(array[ii].src, array[ii].dest, array[ii].type);
                }
            }
        }

        _addPredefProp(srcAttrib, destAttrib, type) {
            if (destAttrib === 'unit' || destAttrib === 'format') {
                console.warn(`predefProp ${destAttrib} was not generated. The name is reserved for internal use!`);
                return;
            }
            if (this.predefPropsMap === undefined) this.predefPropsMap = {};

            let map = this.predefPropsMap[srcAttrib];
            if (map === undefined) {
                map = {};
                this.predefPropsMap[srcAttrib] = map;
            }

            map[destAttrib] = type;
        }

        _addRequiredProperty(name, warn = true) {
            if (warn) console.warn('_addRequiredProperty() is a private method and should not be called directly. Call sigAddRequiredProperty(name) instead.');
            if (this._waitForRequiredProps !== true) {
                log.error('[SigElement] could not add a required datapoint after the element is appended');
            }
            if (this._statusProperties === undefined) this._statusProperties = [];
            if (this.reqNames === undefined) this.reqNames = [];
            this._statusProperties[name] = null;
            this.reqNames.push(name);
        }

        sigAddRequiredProperty(name) {
            this._addRequiredProperty(name, false);
        }

        sigApplyPropState(name, value) {
            if (this._statusProperties === undefined) this._statusProperties = [];
            if (this.reqNames === undefined) this.reqNames = [];
            this._statusProperties[name] = value;
            this.sigOnPropertyStateChange(name, value);
            if (this._waitForRequiredProps === true && this.isConnected) {
                this._checkRequiredProperties();
            } else {
                if (!this._isPropertyStateValid(name, value) && this.reqNames.includes(name)) {
                    this._waitForRequiredProps = true;
                    if (!this.isdragClone) this._setInitialState();
                }
            }
        }

        _checkRequiredProperties() {
            if (this._statusProperties === undefined) this._statusProperties = [];
            if (this.reqNames === undefined) this.reqNames = [];
            if (this.isdragClone) {
                this.sigOnRequiredPropertiesReady();
                return;
            }

            for (const name of this.reqNames) {
                const value = this._statusProperties[name];
                if (value === null || !this._isPropertyStateValid(name, value)) {
                    return;
                }
            }
            this._waitForRequiredProps = false;
            this.sigOnRequiredPropertiesReady();
        }

        _isPropertyStateValid(name, value) {
            return value === 0 || value === -1;
        }

        sigOnPropertyStateChange(name, value) {
            if (typeof this._onPropertyStateChange === 'function') {
                this._onPropertyStateChange(name, value, false);
            }
        }

        _onPropertyStateChange(name, value, warn = true) {
            if (warn) console.warn('_onPropertyStateChange() is an obsolete callback. Use sigOnPropertyStateChange() instead.');
        }

        sigOnRequiredPropertiesReady() {
            this._onRequiredPropertiesReady(false);
        }

        _onRequiredPropertiesReady(warn = true) {
            if (warn) console.warn('_onRequiredPropertiesReady() is an obsolete callback. Use sigOnRequiredPropertiesReady() instead.');
            if (!this.isdragClone) {
                this.classList.remove('sig-element-not-ready');
            }
        }

        _setInitialState() {
            this.classList.add('sig-element-not-ready');
        }

        connectedCallback() {
            super.connectedCallback();
            if (!this.isdesignmode && window.sigApi && !window.sigApi.stationManager.isInOfflinePreview()) {
                if (this._waitForRequiredProps) {
                    if (!this.isdragClone) this._setInitialState();
                    this._checkRequiredProperties();
                }
            }
            if (!this.isdesignmode) {
                this._applyFontMap();
            }
        }

        disconnectedCallback() {
            super.disconnectedCallback();
            this.disconnected = true;
            this._internalDefaultValuesApplied = false;
            this._isRuntimeValueUpdate = false;
            this.removeEventListener('dom-change', this.fontApplyHandler);
            this.fontApplyHandler = undefined;
            if (sigApi && sigApi.sigUtils) sigApi.sigUtils.clearAll(this);
        }

        _isDesignMode() {
            if (window.____sigIsDesignMode !== undefined) {
                return (window.____sigIsDesignMode);
            } else {
                return false;
            }
        }

        _getActiveLang() {
            if (this.isdesignmode) {
                return 'de-de';
            }
            return window.sigApi.textManager.getCurrentLanguage().languageCode.toLowerCase();
        }


        async _getActiveLangAsync() {
            const language = await window.sigApi.textManager.getCurrentLanguageAsync();
            return (window.sigApi.textManager.instanceofLanguage(language)) ? language.getCode().toLowerCase() : null;
        }

        _log(msg = '', level = '') {
            const component = this.tagName;
            switch (level) {
                case 'INFO':
                    log.info(`[${component}] ${msg}`);
                    break;
                case 'WARN':
                    log.warn(`[${component}] ${msg}`);
                    break;
                case 'ERROR':
                    log.error(`[${component}] ${msg}`);
                    break;
                case 'DIR':
                    log.debug(`[${component}] ${this.id} dumps the following object:`);
                    log.dir(msg);
                    break;
                default:
                    log.debug(`[${component}] ${msg}`);
                    break;
            }
        }

        _dispatchEvent(event = '', disablePrefix = false) {
            if (this.isdesignmode) return;
            if (this.shouldDispatchInternalEvent(event)) {
                const fullevent = (disablePrefix) ? event : this.tagName.toLowerCase() + '-' + event;
                this.dispatchEvent(new CustomEvent(fullevent, {
                    detail: {
                        component: this
                    }
                }));
            }
        }

        _onStateChange(newval, oldval) {
            switch (newval) {
                case 1: 
                case '1':
                case 'Active':
                default: 
                    this.classList.remove('sig-element-inactive');
                    this.classList.remove('sig-element-invisible');
                    break;
                case 2: 
                case '2':
                case 'Inactive':
                    this.classList.add('sig-element-inactive');
                    this.classList.remove('sig-element-invisible');
                    break;
                case 3: 
                case '3':
                case 'Invisible':
                    this.classList.add('sig-element-invisible');
                    this.classList.remove('sig-element-inactive');
                    break;
            }
        }

        sigOnStatePropertyDetailChange() { }

        _onCheckbitChange(newval, oldval) {
            if (newval === false) {
                this.classList.add('sig-element-checkbit');
            } else {
                this.classList.remove('sig-element-checkbit');
            }
        }

        _rotateComponent(newval, oldval) {
            this._setRotation(newval);

        }

        _setRotation(rotation, notranslate = false, force = false) {
            if (this.isRotated() || force) {
                const bounds = this.getControlBounds();
                if (notranslate) {
                    this.style.transform = `rotate(${rotation}deg)`;
                } else {
                    this.style.transform = `translate(${bounds.translateX}px, ${bounds.translateY}px) rotate(${rotation}deg)`;
                }
                this.style.setProperty('--theme-sig-element-rotation', rotation + 'deg');
            } else {
                if (this.style.transform !== '') {
                    const newTransform = this.style.transform.replace(/rotate.*?\(.*?\)|translate.*?\(.*?\)/gi, '');
                    this.style.transform = newTransform.trim();
                    this.style.setProperty('--theme-sig-element-rotation', 0);
                }
            }
            if (this.isdesignmode) this._resizeHandles();
        }

        checkLimits(val, propName = 'value', propNameLow = 'limitLow', propNameHigh = 'limitHigh') { 
            const min = parseFloat(this[propNameLow]);
            const max = parseFloat(this[propNameHigh]);

            if (isNaN(min) || isNaN(max)) {
                return [-1, undefined];
            } else if (min > val) {
                return [-1, val];
            } else if (max < val) {
                return [1, val];
            } else {
                return [0, val];
            }
        }

        incDataPoint(write, oldval) {
            return undefined;
        }

        decDataPoint(write, oldval) {
            return undefined;
        }

        sigApplyPropValue(propName, propValue, force = true) {
            this._isRuntimeValueUpdate = true;
            this._pendingUpdatePropertyName = propName;
            let _propValue = propValue;
            if (_propValue === 'src' && _propValue === 'none') {
                _propValue = '//:0';
            }
            this._setValueBackup(propName, _propValue, force);
            this._isRuntimeValueUpdate = false;
            this._pendingUpdatePropertyName = undefined;
        }

        _setValueBackup(propName, propValue, force = false) {
            if (this._propInitValueBackups === undefined) this._propInitValueBackups = {};
            if (force && propValue !== null) this._propInitValueBackups[propName] = { value: propValue, type: 'ComponentForce' };
            else if (this._propInitValueBackups[propName] === undefined || force) {
                const _defaultProp = this._getDefaultSyles(this.localName, propName);
                if (_defaultProp[0]) this._propInitValueBackups[propName] = { value: _defaultProp[0].value, type: 'DefaultStyle' };
                else if (this[propName]) this._propInitValueBackups[propName] = { value: this[propName], type: 'Component' };
                else this._propInitValueBackups[propName] = { value: propValue, type: 'Component' };
            } else {
            }

            if (propValue !== undefined && propValue !== null) {
                this[propName] = propValue;
            } else {
                this[propName] = this._propInitValueBackups[propName].value;
            }
        }

        sigApplyCSSValue(cssObj, doBoundsCheck = false) {
            if (cssObj instanceof Object) {
                if (Object.keys(cssObj).length > 0) {
                    if (this.isdesignmode && doBoundsCheck) {
                        this._doBoundsCheck(cssObj);
                    } else {
                        this.updateStyles(cssObj);
                    }
                }
            }
        }

        sigRemoveCSSValue(propName) {
            this.style.removeProperty(propName);
        }

        _applyFontObjectToNode(node, fontObj) {
            if (fontObj !== undefined && fontObj !== null && fontObj.fontFamily !== undefined) {
                node.style.setProperty('font-family', '\'' + fontObj.fontFamily + '\'');
            } else {
                node.style.removeProperty('font-family');
            }
            if (fontObj !== undefined && fontObj !== null && fontObj.size !== undefined) {
                node.style.setProperty('font-size', fontObj.size + 'px');
            } else {
                node.style.removeProperty('font-size');
            }

            if (fontObj !== undefined && fontObj !== null && fontObj.italic !== undefined) {
                node.style.setProperty('font-style', fontObj.italic ? 'italic' : 'normal');
            } else {
                node.style.removeProperty('font-style');
            }
            if (fontObj !== undefined && fontObj !== null && typeof fontObj.bold !== 'function') {
                node.style.setProperty('font-weight', fontObj.bold ? 'bold' : 'normal');
            } else {
                node.style.removeProperty('font-weight');
            }
            if (fontObj !== undefined && fontObj !== null && fontObj.underline !== undefined) {
                node.style.setProperty('text-decoration', fontObj.underline ? 'underline' : 'none');
            } else {
                node.style.removeProperty('text-decoration');
            }
        }

        sigApplyFontObject(propName, fontObj) {
            if (this.fontMap === undefined) this.fontMap = new Map();
            if (propName === 'elementMainFont') {
                this._applyFontObjectToNode(this, fontObj);
            } else {
                if (fontObj instanceof Object) {
                    this.fontMap.set(propName, fontObj);
                } else {
                    this.fontMap.delete(propName);
                }
                if (this.fontApplyHandler === undefined && !this.disconnected) {
                    this.fontApplyHandler = (evt) => {
                        this._applyFontMap();
                    };
                    this.addEventListener('dom-change', this.fontApplyHandler);
                }
                if (this.shadowRoot instanceof DocumentFragment) {
                    const nodeList = this.shadowRoot.querySelectorAll(propName);
                    nodeList.forEach(node => {
                        this._applyFontObjectToNode(node, fontObj);
                    });
                }
            }
        }

        _applyFontMap() {
            if (this.fontMap === undefined) this.fontMap = new Map();
            this.fontMap.forEach(this._applyFont, this);
        }

        _applyFont(fontObj, propName, map) {
            if (this.shadowRoot instanceof DocumentFragment && fontObj && propName && map) {
                if (map.size > 0) {
                    const nodeList = this.shadowRoot.querySelectorAll(propName);
                    nodeList.forEach(node => {
                        this._applyFontObjectToNode(node, fontObj);
                    });
                }
            }
        }

        getControlBounds(control = this) {
            if (control instanceof HTMLElement === false) return null;
            let translateX = 0,
                translateY = 0;

            let top = parseInt(control.style.getPropertyValue('--theme-sig-element-top'), 10);
            let left = parseInt(control.style.getPropertyValue('--theme-sig-element-left'), 10);
            let height = parseInt(control.style.getPropertyValue('--theme-sig-element-height'), 10);
            let width = parseInt(control.style.getPropertyValue('--theme-sig-element-width'), 10);
            let zindex = parseInt(control.style.getPropertyValue('--theme-sig-element-zindex'), 10);
            let rotation = parseInt(control.rotation, 10);

            if (!this.isdesignmode && window.sigApi && window.sigApi.vm && window.sigApi.properties) {
                const vm = window.sigApi.vm.getVmById(control.id);
                if (vm && vm.isActive() === false) {
                    if (isNaN(top)) {
                        const _top = window.sigApi.properties.getProperty(control.id, '--theme-sig-element-top');
                        if (_top) top = parseInt(_top.getValue(), 10);
                    }
                    if (isNaN(left)) {
                        const _left = window.sigApi.properties.getProperty(control.id, '--theme-sig-element-left');
                        if (_left) left = parseInt(_left.getValue(), 10);
                    }
                    if (isNaN(height)) {
                        const _height = window.sigApi.properties.getProperty(control.id, '--theme-sig-element-height');
                        if (_height) height = parseInt(_height.getValue(), 10);
                    }
                    if (isNaN(width)) {
                        const _width = window.sigApi.properties.getProperty(control.id, '--theme-sig-element-width');
                        if (_width) width = parseInt(_width.getValue(), 10);
                    }
                    if (isNaN(rotation)) {
                        const _rotation = window.sigApi.properties.getProperty(control.id, 'rotation');
                        if (_rotation) rotation = parseInt(_rotation.getValue(), 10);
                    }
                }
            }

            if (isNaN(top)) top = control.offsetTop;
            if (isNaN(left)) left = control.offsetLeft;
            if (isNaN(height)) height = control.offsetHeight;
            if (isNaN(width)) width = control.offsetWidth;
            if (isNaN(rotation)) rotation = 0;
            if (isNaN(zindex)) zindex = 'auto';

            let padding = parseInt(control.style.getPropertyValue('--theme-' + control.tagName.toLowerCase() + '-padding'), 10);
            let border = parseInt(control.style.getPropertyValue('--theme-' + control.tagName.toLowerCase() + '-border-width'), 10);
            if (isNaN(padding)) padding = 0;
            if (isNaN(border)) border = 0;

            let boxDelta = 0;
            let boxChanged = false;
            boxDelta += padding;
            boxDelta += border;
            if (boxDelta * 2 > width) {
                width = 2 * boxDelta;
                boxChanged = true;
            }
            if (boxDelta * 2 > height) {
                height = 2 * boxDelta;
                boxChanged = true;
            }
            if (!boxChanged) boxDelta = 0;

            if (this.isRotated(rotation)) {
                const rotatedBounds = this._getRotatedBounds({
                    top: top,
                    left: left,
                    height: height,
                    width: width,
                    rotation: rotation,
                    zindex: zindex,
                    boxdelta: boxDelta
                });
                translateX = rotatedBounds.translateX;
                translateY = rotatedBounds.translateY;
            }

            return {
                left: left,
                top: top,
                width: width,
                height: height,
                bottom: top + height,
                right: left + width,
                rotation: rotation,
                translateX: translateX,
                translateY: translateY,
                zindex: zindex,
                boxdelta: boxDelta,
                border: border,
                padding: padding
            };
        }

        getControlRectangleBounds(control = this) {
            if (control instanceof HTMLElement) {
                const bounds = this.getControlBounds(control);
                return this._getRotatedBounds(bounds);
            } else {
                return null;
            }
        }

        _getRotatedBounds(bounds = {}) {
            const angle = bounds.rotation * (Math.PI / 180); 
            const top = bounds.top;
            const left = bounds.left;
            const width = bounds.width;
            const height = bounds.height;
            const rotation = bounds.rotation;
            const zindex = bounds.zindex;
            const rHeight = height * Math.abs(Math.cos(angle)) + width * Math.abs(Math.sin(angle));
            const rWidth = width * Math.abs(Math.cos(angle)) + height * Math.abs(Math.sin(angle));
            const translateX = (rWidth - width) / 2;
            const translateY = (rHeight - height) / 2;
            const rLeft = left - translateX;
            const rTop = top - translateY;
            const boxdelta = bounds.boxdelta;
            return {
                top: rTop,
                left: rLeft,
                height: rHeight,
                width: rWidth,
                bottom: rTop + rHeight,
                right: rLeft + rWidth,
                rotation: rotation,
                translateX: translateX,
                translateY: translateY,
                zindex: zindex,
                boxdelta: boxdelta
            };
        }

        isRotated(rotation = this.rotation) {
            if (Math.abs(rotation) === 0 || Math.abs(rotation) === 360) {
                return false;
            }
            return true;
        }

        _setBounds(top, left, height, width, rotation, translateX, translateY) {
            let updateTranslate = false;
            const cssObj = {};
            if (top !== undefined) {
                cssObj['--theme-sig-element-top'] = top + 'px';
            }

            if (left !== undefined) {
                cssObj['--theme-sig-element-left'] = left + 'px';
            }

            if (height !== undefined) {
                cssObj['--theme-sig-element-height'] = height + 'px';
                updateTranslate = true;
            }

            if (width !== undefined) {
                cssObj['--theme-sig-element-width'] = width + 'px';
                updateTranslate = true;
            }

            if (this.isdesignmode && Object.keys(cssObj).length > 0 && this._executeDesignerCallback()) {
                this.sigApplyCSSValue(cssObj, true);
            } else {
                this.sigApplyCSSValue(cssObj, false);
            }

            if (rotation !== undefined) {
                this.rotation = rotation;
            } else if (updateTranslate && translateX === undefined && translateY === undefined) {
                this._setRotation(this.rotation); 
            } else if (translateX !== undefined || translateY !== undefined) {
                const styleTranslateX = (translateX === undefined) ? 0 : translateX;
                const styleTranslateY = (translateY === undefined) ? 0 : translateY;
                this.style.transform = `translate(${styleTranslateX}px,${styleTranslateY}px)`;
            }
        }

        getScaleFactor(control = this, rotation = this.rotation) {
            const scaleFactor = { x: 1, y: 1 };
            if (control instanceof HTMLElement) {
                if (rotation % 90 === 0 && rotation % 180 !== 0) {
                    scaleFactor.y = control.getBoundingClientRect().height / control.offsetWidth;
                    scaleFactor.x = control.getBoundingClientRect().width / control.offsetHeight;
                } else {
                    scaleFactor.y = control.getBoundingClientRect().height / control.offsetHeight;
                    scaleFactor.x = control.getBoundingClientRect().width / control.offsetWidth;
                }
            }
            return scaleFactor;
        }

        sigOnVisibilityChange(visible) {
        }

        sigOnActiveStateChange(active) {
        }



        sigPreventDefault(evt, forceTouchEndPrevent = false) {
            if (evt) {
                let shouldPrevent = true;
                if (passiveTouchGestures && gestures[evt.type]) {
                    const isTouch = (evt.detail && evt.detail.sourceEvent && this._isTouchInput(evt.detail.sourceEvent)) ? true : false;
                    if (isTouch) shouldPrevent = (evt.detail && evt.detail.preventer && evt.detail.preventer.type === 'touchend' && forceTouchEndPrevent) ? true : false;
                };
                if (shouldPrevent) {
                    evt.preventDefault();
                    return true;
                } else {
                    return false;
                }
            };
        };

        _isTouchInput(evt) {
            let isTouchInput = false;
            if (evt) {
                if (evt.mozInputSource) { 
                    const source = evt.mozInputSource;
                    if (source === MouseEvent.MOZ_SOURCE_PEN || source === MouseEvent.MOZ_SOURCE_TOUCH) {
                        isTouchInput = true;
                    }
                } else if ((typeof Touch === 'function' && evt instanceof Touch) || (typeof TouchEvent === 'function' && evt instanceof TouchEvent)) {
                    isTouchInput = true;
                }
            } else {
                this._log('Please provide a valid event to check, if it was initiated by touch input.', 'ERROR');
            }
            return isTouchInput;
        }


        _getDefaultSyles(control, prop = null) {
            const _styleDataDefault = Object.assign([], this.isdesignmode ? window.sigApi.designer.getDefaultStyles(control, window.sigApi.SIG_CONST.DEFAULT_STYLE_CLASS) : window.sigApi.defaultStyleManager.getDefaultStylingAsJson(control, window.sigApi.SIG_CONST.DEFAULT_STYLE_CLASS));
            if (prop) return _styleDataDefault.filter((_prop) => _prop.name === prop);
            return _styleDataDefault;
        }

        sigApplyStyleClass(propName, className = window.sigApi.SIG_CONST.DEFAULT_STYLE_CLASS, remove = false, parameters) {
            if (propName === 'elementMainClass') {
                return this.sigApplyLightDomStyleClass(className, remove);
            } else {
                if (this.sigApplyShadowDomStyleClass) return this.sigApplyShadowDomStyleClass(propName, className, remove, parameters);
                else {
                    this._log('Shadom DOM style classes not applied! Make sure the ShadowDomStylingMixin is mixed in.', 'WARN');
                    return false;
                }
            }
        }

        sigApplyLightDomStyleClass(className, remove = false) {
            try {
                if (remove) {
                    this.classList.remove(className);
                } else {
                    this.classList.add(className);
                }
                return true;

            } catch (error) {
                this._log(error, 'ERROR');
                return false;
            }
        }

        isInShadowDom(elm = this) {
            if (elm instanceof HTMLDocument || elm instanceof HTMLElement) {
                return elm.getRootNode() instanceof ShadowRoot;

            }
            this._log('Element is not a valid html document or html element!', 'ERROR');
            return;
        }

        getParentHostElement(elm = this) {
            if (elm instanceof Document || elm instanceof HTMLElement) {
                if (!this.isInShadowDom(elm)) {
                    return null;
                }
                return elm.getRootNode().host;
            }
            this._log('Element is not a valid html document or html element!', 'ERROR');
            return null;
        }

        getRealRotation(rotation = 0) {
            return (rotation % 360 + 360) % 360;
        }

        shouldDispatchInternalEvent(event) {
            if (!this.dispatchAllInternalEvents) {
                if (!this._internalDefaultValuesApplied || this._isRuntimeValueUpdate) return false;
            }
            return true;
        }

        _getCurrentBounds() {
            console.warn('The _getCurrentBounds() method is deprecated and will be removed in the release Q3/2021.');
            const bounds = {};
            bounds.top = this.offsetTop;
            bounds.left = this.offsetLeft;
            bounds.height = this.offsetHeight;
            bounds.width = this.offsetWidth;
            return bounds;
        }

        getControlTextListName(tagName = this.tagName) {
            if (typeof tagName !== 'string') return '';
            if (!window.sigApi) return '';
            return sigApi.SIG_CONST.CONTROL_TEXTLIST_PREFIX + '_' + tagName.toLowerCase().replaceAll('-', '_');
        }

        sigHandleInactiveInteraction(evt) {
            if (window.sigApi) return window.sigApi.sigUtils.handleGlobalInactiveInteraction(evt);
            return null;
        }

        sigInterceptInactiveInteractionEvent(evt) {
            if (window.sigApi) return window.sigApi.sigUtils.interceptGlobalInactiveInteractionEvent(evt);
            return false;
        }

        getContext(elm = this) {
            if (elm instanceof HTMLElement === false) return null;
            if (elm && typeof elm.context === 'object') return elm.context;
            if (this.isInShadowDom(elm) === false) return null;
            const _host = this.findFirstTopLevelHostElement(elm);
            if (_host && typeof _host.context === 'object') return _host.context;
            return null;
        }

        findFirstTopLevelHostElement(elm = this) {
            if (elm instanceof HTMLElement === false) return null;
            let _elm = elm;
            while (_elm) {
                const _host = this.getParentHostElement(_elm);
                if (_host instanceof HTMLElement === false) return null;
                if (_host === document.body) return null;
                if (this.isInShadowDom(_host) === false) return _host;
                _elm = _host;
            }
            return null;
        }
    };
});
BaseMixin.mixinName = 'BaseMixin';