import * as Gestures from '../../../../rt/node_modules/@polymer/polymer/lib/utils/gestures.js';
import { wrap } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/wrap.js';


class SigGestures {
    constructor(usePointerEvents = false) {
        this.usePointerEvents = usePointerEvents;
        this.trackDistance = 5;
        this.trackLength = 2;
        this.longPressDelay = 500;
        this.excludedTargets = ['SIG-WRAPPER', 'SIG-DASHBOARD', 'SIG-APP', 'SIG-COMPOSITE-CONTROL'];
        this.GESTURE_KEY = '__polymerGestures';
        this._init();
    }

    _init() {
        if (window.PointerEvent && this.usePointerEvents === true) this._addToPointer(Gestures, this);
        else this._addToTouch(Gestures, this);
    }

    _addToTouch(Gestures, SigGestures) {
        const TRACK_DISTANCE = SigGestures.getTrackDistance();
        const TRACK_LENGTH = SigGestures.getTrackLength();

        function fire(target, type, detail) {
            const ev = new Event(type, { bubbles: true, cancelable: true, composed: true });
            ev.detail = detail;
            wrap(target).dispatchEvent(ev);
            if (ev.defaultPrevented) {
                const preventer = detail.preventer || detail.sourceEvent;
                if (preventer && preventer.preventDefault) {
                    preventer.preventDefault();
                }
            }
        }

        Gestures.register({
            name: 'sigtrack',
            touchAction: 'none',
            deps: ['mousedown', 'touchstart', 'touchend', 'touchmove'],
            flow: {
                start: ['mousedown', 'touchstart'],
                end: ['mouseup', 'mouseleave', 'touchend']
            },
            emits: ['track'],

            info: {
                x: 0,
                y: 0,
                state: 'start',
                started: false,
                moves: [],
                addMove: function (move) {
                    if (this.moves.length > TRACK_LENGTH) {
                        this.moves.shift();
                    }
                    this.moves.push(move);
                },
                movefn: null,
                upfn: null,
                prevent: false
            },

            reset: function () {
                this.info.state = 'start';
                this.info.started = false;
                this.info.moves = [];
                this.info.x = 0;
                this.info.y = 0;
                this.info.prevent = false;
                this.untrackDocument(this.info);
            },

            hasMovedEnough: function (x, y) {
                if (this.info.prevent) {
                    return false;
                }
                const dx = Math.abs(this.info.x - x);
                const dy = Math.abs(this.info.y - y);
                return (dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE);
            },

            mousedown: function (e) {
                const t = Gestures.findOriginalTarget(e);
                const self = this;
                const target = SigGestures.getRealTarget(e.target);

                const movefn = function movefn(e) {
                    const x = e.clientX, y = e.clientY;
                    if (self.hasMovedEnough(x, y)) {
                        self.info.state = self.info.started ? (e.type === 'mouseup' ? 'end' : 'track') : 'start';
                        if (self.info.moves.length >= 2) {
                            if (target) target.ismoving = true;
                        }
                        self.info.addMove({ x: x, y: y });
                        self._fire(t, e);
                        self.info.started = true;
                    }
                };
                const upfn = function upfn(e) {
                    if (self.info.started) {
                        movefn(e);
                    }
                    if (target) target.ismoving = false;
                    self.untrackDocument(self.info);
                };
                self.trackDocument(this.info, movefn, upfn);
                this.info.x = e.clientX;
                this.info.y = e.clientY;
            },
            touchstart: function (e) {
                const ct = e.changedTouches[0];
                this.info.x = ct.clientX;
                this.info.y = ct.clientY;
            },
            touchmove: function (e) {
                const t = Gestures.findOriginalTarget(e);
                const ct = e.changedTouches[0];
                const x = ct.clientX, y = ct.clientY;
                const target = SigGestures.getRealTarget(e.target);
                if (this.hasMovedEnough(x, y) && e.touches.length === 1) {
                    if (this.info.state === 'start') {
                        Gestures.prevent('tap');
                    }
                    this.info.addMove({ x: x, y: y });
                    this._fire(t, ct);
                    this.info.state = 'track';
                    if (target) target.ismoving = true;
                    this.info.started = true;
                }
            },
            touchend: function (e) {
                const t = Gestures.findOriginalTarget(e);
                const ct = e.changedTouches[0];
                const target = SigGestures.getRealTarget(e.target);
                if (this.info.started) {
                    this.info.state = 'end';
                    if (target) target.ismoving = false;
                    this.info.addMove({ x: ct.clientX, y: ct.clientY });
                    this._fire(t, ct, e);
                }
            },

            _fire: function (target, touch) {
                const secondlast = this.info.moves[this.info.moves.length - 2];
                const lastmove = this.info.moves[this.info.moves.length - 1];
                const dx = lastmove.x - this.info.x;
                const dy = lastmove.y - this.info.y;
                let ddx, ddy = 0;
                if (secondlast) {
                    ddx = lastmove.x - secondlast.x;
                    ddy = lastmove.y - secondlast.y;
                }
                fire(target, 'track', {
                    state: this.info.state,
                    x: touch.clientX,
                    y: touch.clientY,
                    dx: dx,
                    dy: dy,
                    ddx: ddx,
                    ddy: ddy,
                    sourceEvent: touch,
                    hover: function () {
                        return Gestures.deepTargetFind(touch.clientX, touch.clientY);
                    }
                });
            },

            _bindCapturePhase: function () {
                if (!sigApi) return false;
                if (!sigApi.projectConfigManager) return false;
                return sigApi.projectConfigManager.getAllowInactiveInteraction();
            },

            trackDocument: function (stateObj, movefn, upfn) {
                log.debug('Trackmove MOUSE');
                stateObj.movefn = movefn;
                stateObj.upfn = upfn;
                const options = this._bindCapturePhase() ? { capture: true } : undefined;
                document.addEventListener('mousemove', stateObj.movefn, options);
                document.addEventListener('mouseup', stateObj.upfn, options);
            },

            untrackDocument: function (stateObj) {
                const options = this._bindCapturePhase() ? { capture: true } : undefined;
                document.removeEventListener('mousemove', stateObj.movefn, options);
                document.removeEventListener('mouseup', stateObj.upfn, options);
                stateObj.movefn = null;
                stateObj.upfn = null;
            }

        });

        Gestures.register({
            name: 'sigzoom',

            deps: ['touchstart', 'touchend', 'touchmove'],
            flow: {
                start: ['touchstart'],
                end: ['touchend']
            },

            emits: ['pinchzoom'],

            info: {
                x: 0,
                y: 0,
                dx: 0,
                dy: 0,
                ddx: 0,
                ddy: 0,
                dist: 0,
                rotation: 0,
                rotationstart: 0
            },

            touchstart: function (e) {
                log.debug('[Zoom] Gesture: touchstart: ');
            },
            touchend: function (e) {
                log.debug('[Zoom] Gesture: touchend : ');
                const target = SigGestures.getRealTarget(e.target);
                target.iszooming = false;
                this.info.dx = 0;
                this.info.dy = 0;
            },
            touchmove: function (e) {
                const target = SigGestures.getRealTarget(e.target);
                if (e.touches.length >= 2 && !target.ismoving) {
                    log.debug('[Zoom] Gesture: touchmove : ');
                    const _dx = e.touches[1].pageX - e.touches[0].pageX;
                    const _dy = e.touches[1].pageY - e.touches[0].pageY;
                    const _dist = Math.hypot(_dx, _dy);
                    const _distFactor = Math.sign(_dist - this.info.dist);
                    const _touchAngle = Math.atan2(_dy, _dx);

                    if (this.info.dx !== 0) this.info.ddx = this.info.dx - _dx;
                    if (this.info.dy !== 0) this.info.ddy = this.info.dy - _dy;

                    this.info.touches = { x: [e.touches[0].pageX, e.touches[1].pageX], y: [e.touches[0].pageY, e.touches[1].pageY] };
                    this.info.dx = _dx;
                    this.info.dy = _dy;
                    this.info.dist = _dist;
                    this.info.distfactor = _distFactor;
                    this.info.rotation = _touchAngle;

                    if (target.iszooming === false) {
                        this.info.rotationstart = _touchAngle;
                        target.iszooming = true;
                    }

                    const t = Gestures.findOriginalTarget(e);
                    this._fire('pinchzoom', t, e);
                    log.debug('[Zoom] Gesture: touchmove fired zoom');
                } else {
                    this.info.dx = 0;
                    this.info.dy = 0;
                }
            },
            _fire: function (type, target, event, preventer) {
                fire(target, type, {
                    touches: this.info.touches,
                    dx: this.info.dx,
                    dy: this.info.dy,
                    ddx: this.info.ddx,
                    ddy: this.info.ddy,
                    dist: this.info.dist,
                    distfactor: this.info.distfactor,
                    rotation: this.info.rotation,
                    rotationstart: this.info.rotationstart,
                    sourceEvent: event,
                    preventer: preventer,
                    prevent: function (e) {
                        return Gestures.prevent(e);
                    }
                });
            }
        });

        Gestures.register({
            name: 'siglongpress',
            deps: ['mousedown', 'mouseup', 'touchstart', 'touchend', 'mouseleave'],
            flow: {
                start: ['mousedown', 'touchstart'],
                end: ['mouseup', 'touchend', 'mouseleave']
            },

            emits: ['longpress'],

            info: {
                x: 0,
                y: 0
            },
            longpress: false,
            __touchInit: false,
            pressTimers: [],
            touchstart: function (e) {
                log.debug('Gesture: touchstart');
                this.info.x = e.changedTouches[0].clientX;
                this.info.y = e.changedTouches[0].clientY;
                const t = Gestures.findOriginalTarget(e);
                this.longpress = false;
                this._checkLongPress(t, e);
                this.__touchInit = true;
            },
            touchend: function (e) {
                log.debug('Gesture: touchend - longpress: ' + this.longpress);
                this.info.x = e.changedTouches[0].clientX;
                this.info.y = e.changedTouches[0].clientY;
                this._clearPressTimers();
            },

            mousedown: function (e) {
                log.debug('Gesture: mousedown');
                this.info.x = e.clientX;
                this.info.y = e.clientY;
                const t = Gestures.findOriginalTarget(e);
                this.longpress = false;
                this._checkLongPress(t, e);
                this.__touchInit = false;
            },
            mouseup: function (e) {
                log.debug('Gesture: mouseup');
                this.info.x = e.clientX;
                this.info.y = e.clientY;
                this._clearPressTimers();
            },
            mouseleave: function (e) {
                log.debug('Gesture: mouseleave');
                if (!this.__touchInit) {
                    this.info.x = e.clientX;
                    this.info.y = e.clientY;
                    this._clearPressTimers();
                }
            },

            _checkLongPress: function (t, e) {
                const realTarget = SigGestures.getRealTarget(e.target);
                if (this.pressTimers.length > 0)
                    this._clearPressTimers();

                const path = e.path || e.composedPath();
                if (Array.isArray(path)) {
                    path.forEach(target => {
                        if (this._hasLongpressHandler(target) &&
                            !SigGestures.excludedTargets.includes(target.tagName)) {
                            const longpressdelay = this._getLongpressDelay(target);

                            this.pressTimers.push(window.setTimeout(() => {
                                if (!target.ismoving && !target.iszooming &&
                                    !realTarget.ismoving && !realTarget.iszooming) {
                                    this.longpress = true;
                                    this._fire('longpress', target, e);
                                    log.debug('Gesture: longpress! Delay:' + longpressdelay);
                                }
                            }, longpressdelay));
                        }
                    });
                }
            },
            _hasLongpressHandler: function (target) {
                if (target[SigGestures.GESTURE_KEY] &&
                    target[SigGestures.GESTURE_KEY].mouseleave &&
                    target[SigGestures.GESTURE_KEY].mouseleave.siglongpress > 0) {
                    return true;
                }
                return false;
            },
            _getLongpressDelay: function (target) {
                if (target.dataset && target.dataset.longpressdelay)
                    return parseInt(target.dataset.longpressdelay, 10);

                if (target.longpressdelay)
                    return parseInt(target.longpressdelay, 10);

                const realTarget = SigGestures.getRealTarget(target);
                if (realTarget.longpressdelay)
                    return realTarget.longpressdelay;

                return SigGestures.longpressdelay;
            },
            _fire: function (type, target, event, preventer = null) {
                log.debug('TOUCH Fire: ' + type);
                fire(target, type, {
                    x: this.info.x,
                    y: this.info.y,
                    sourceEvent: event,
                    preventer: preventer,
                    prevent: function (e) {
                        return Gestures.prevent(e);
                    }
                });
            },

            _clearPressTimers: function () {
                if (Array.isArray(this.pressTimers))
                    this.pressTimers.forEach(timer => clearTimeout(timer));
                this.pressTimers = [];
            }
        });
    }

    _addToPointer(Gestures, SigGestures) {
        const TRACK_DISTANCE = SigGestures.getTrackDistance();
        const TRACK_LENGTH = SigGestures.getTrackLength();

        function fire(target, type, detail) {
            const ev = new Event(type, { bubbles: true, cancelable: true, composed: true });
            ev.detail = detail;
            wrap(target).dispatchEvent(ev);
            if (ev.defaultPrevented) {
                const preventer = detail.preventer || detail.sourceEvent;
                if (preventer && preventer.preventDefault) {
                    preventer.preventDefault();
                }
            }
        }

        Gestures.register({
            name: 'sigtrack',
            touchAction: 'none',
            deps: ['pointerdown', 'pointermove', 'pointerup'],
            flow: {
                start: ['pointerdown'],
                end: ['pointerup']
            },
            emits: ['track'],

            info: {
                x: 0,
                y: 0,
                state: 'start',
                started: false,
                moves: [],
                evCache: [],
                addMove: function (move) {
                    if (this.moves.length > TRACK_LENGTH) {
                        this.moves.shift();
                    }
                    this.moves.push(move);
                },
                prevent: false
            },

            reset: function () {
                this.info.state = 'start';
                this.info.started = false;
                this.info.moves = [];
                this.info.x = 0;
                this.info.y = 0;
                this.info.prevent = false;
            },

            hasMovedEnough: function (x, y) {
                if (this.info.prevent) {
                    return false;
                }
                const dx = Math.abs(this.info.x - x);
                const dy = Math.abs(this.info.y - y);
                return (dx >= TRACK_DISTANCE || dy >= TRACK_DISTANCE);
            },

            pointerdown: function (e) {
                const target = SigGestures.getRealTarget(e.target);
                log.debug('[track] Gesture: pointerdown: ' + e.pointerId + ' [element] ' + e.target.nodeName + ' : ' + e.target.id);

                this.info.evCache.push(e);
                if (this.info.evCache.length === 1) {
                    this.info.x = e.x;
                    this.info.y = e.y;
                    this.info.started = true;
                } else {
                    target.ismoving = false;
                    this.info.started = false;
                }
            },

            pointermove: function (e) {
                const target = SigGestures.getRealTarget(e.target);
                if (this.info.started) {
                    for (let i = 0; i < this.info.evCache.length; i += 1) {
                        if (e.pointerId === this.info.evCache[i].pointerId) {
                            this.info.evCache[i] = e;
                            break;
                        }
                    }
                    const ev = this.info.evCache[0];
                    const t = Gestures.findOriginalTarget(ev);
                    const x = ev.x, y = ev.y;

                    if (this.hasMovedEnough(x, y)) {
                        log.debug('[track] Gesture: pointermove');
                        if (this.info.state === 'start') {
                            Gestures.prevent('tap');
                            target.ismoving = true;
                            e.target.setPointerCapture(e.pointerId);
                        }
                        this.info.addMove({ x: x, y: y });
                        this._fire(t, ev);
                        this.info.state = 'track';
                        this.info.started = true;
                    }

                }
            },

            pointerup: function (e) {
                const target = SigGestures.getRealTarget(e.target);
                log.debug('[track] ' + target.id + ' Gesture: pointerup: ' + e.pointerId);
                this.removeEvent(e);
                e.target.releasePointerCapture(e.pointerId);

                this.info.state = 'end';
                this.info.started = false;
                target.ismoving = false;
                const t = Gestures.findOriginalTarget(e);
                this._fire(t, e);
                this.info.addMove({ x: e.x, y: e.y });
            },
            removeEvent(e) {
                for (let i = 0; i < this.info.evCache.length; i += 1) {
                    if (this.info.evCache[i].pointerId === e.pointerId) {
                        this.info.evCache.splice(i, 1);
                        break;
                    }
                }
            },
            _fire: function (target, touch) {
                const secondlast = this.info.moves[this.info.moves.length - 2];
                const lastmove = this.info.moves[this.info.moves.length - 1];
                let dx, dy = 0;
                let ddx, ddy = 0;
                if (secondlast && lastmove) {
                    dx = lastmove.x - this.info.x;
                    dy = lastmove.y - this.info.y;
                    ddx = lastmove.x - secondlast.x;
                    ddy = lastmove.y - secondlast.y;
                }
                return fire(target, 'track', {
                    state: this.info.state,
                    x: touch.clientX,
                    y: touch.clientY,
                    dx: dx,
                    dy: dy,
                    ddx: ddx,
                    ddy: ddy,
                    sourceEvent: touch,
                    hover: function () {
                        return Gestures.deepTargetFind(touch.clientX, touch.clientY);
                    }
                });
            }

        });

        Gestures.register({
            name: 'sigtap',
            deps: ['pointerdown', 'pointerup'],
            flow: {
                start: ['pointerdown'],
                end: ['pointerup']
            },

            emits: ['tap'],

            info: {
                x: 0,
                y: 0
            },
            pointerdown: function (e) {
                log.debug('[tap] Gesture: pointerdown');
            },
            pointerup: function (e) {
                log.debug('[tap] Gesture: pointerup');
                const t = Gestures.findOriginalTarget(e);
                this._fire('tap', t, e);
            },
            _fire: function (type, target, event, preventer = null) {
                fire(target, type, {
                    x: event.clientX,
                    y: event.clientY,
                    sourceEvent: event,
                    preventer: preventer,
                    prevent: function (e) {
                        return Gestures.prevent(e);
                    }
                });
            }

        });

        Gestures.register({
            name: 'sigzoom',
            deps: ['pointerdown', 'pointerup', 'pointermove'],
            flow: {
                start: ['pointerdown'],
                end: ['pointerup']
            },

            emits: ['pinchzoom'],

            info: {
                x: 0,
                y: 0,
                dx: 0,
                dy: 0,
                ddx: 0,
                ddy: 0,
                dist: 0,
                evCache: [],
                rotation: 0,
                rotationstart: 0
            },


            pointerdown: function (e) {
                log.debug('[Zoom] Gesture: pointerdown: ' + e.pointerId);
                this.info.evCache.push(e);
                e.target.setPointerCapture(e.pointerId);
            },
            pointerup: function (e) {
                const target = SigGestures.getRealTarget(e.target);
                log.debug('[Zoom] Gesture: pointerup : ' + e.pointerId);
                target.iszooming = false;
                this.removeEvent(e);
                this.info.dx = 0;
                this.info.dy = 0;
                e.target.releasePointerCapture(e.pointerId);
            },
            removeEvent(e) {
                for (let i = 0; i < this.info.evCache.length; i += 1) {
                    if (this.info.evCache[i].pointerId === e.pointerId) {
                        this.info.evCache.splice(i, 1);
                        break;
                    }
                }
            },
            pointermove: function (e) {
                const target = SigGestures.getRealTarget(e.target);
                for (let i = 0; i < this.info.evCache.length; i += 1) {
                    if (e.pointerId === this.info.evCache[i].pointerId) {
                        this.info.evCache[i] = e;
                        break;
                    }
                }
                if (this.info.evCache.length >= 2 && !target.ismoving) {
                    const _dx = this.info.evCache[1].pageX - this.info.evCache[0].pageX;
                    const _dy = this.info.evCache[1].pageY - this.info.evCache[0].pageY;
                    const _dist = Math.hypot(_dx, _dy);
                    const _distFactor = Math.sign(_dist - this.info.dist);
                    const _touchAngle = Math.atan2(_dy, _dx);

                    if (this.info.dx !== 0) this.info.ddx = this.info.dx - _dx;
                    if (this.info.dy !== 0) this.info.ddy = this.info.dy - _dy;

                    this.info.dx = _dx;
                    this.info.dy = _dy;
                    this.info.dist = _dist;
                    this.info.distfactor = _distFactor;
                    this.info.rotation = _touchAngle;

                    if (target.iszooming === false) {
                        this.info.rotationstart = _touchAngle;
                        target.iszooming = true;
                    }

                    const t = Gestures.findOriginalTarget(e);
                    this._fire('pinchzoom', t, e);
                } else {
                    this.info.dx = 0;
                    this.info.dy = 0;
                }
            },
            _fire: function (type, target, event, preventer = null) {
                fire(target, type, {
                    x: event.clientX,
                    y: event.clientY,
                    dx: this.info.dx,
                    dy: this.info.dy,
                    ddx: this.info.ddx,
                    ddy: this.info.ddy,
                    dist: this.info.dist,
                    distfactor: this.info.distfactor,
                    rotation: this.info.rotation,
                    rotationstart: this.info.rotationstart,
                    sourceEvent: event,
                    preventer: preventer,
                    prevent: function (e) {
                        return Gestures.prevent(e);
                    }
                });
            }
        });

        Gestures.register({
            name: 'sigdownup',

            deps: ['pointerdown', 'pointerup'],
            flow: {
                start: ['pointerdown'],
                end: ['pointerup']
            },

            emits: ['down', 'up', 'longpress'],

            info: {
                x: 0,
                y: 0
            },
            longpress: false,
            pressTimers: [],

            pointerdown: function (e) {
                log.debug('Gesture: pointerdown');
                const t = Gestures.findOriginalTarget(e);
                this._fire('down', t, e, 'dummypassive');
                this.longpress = false;
                this._checkLongPress(t, e);
            },
            pointerup: function (e) {
                log.debug('Gesture: pointerup - longpress: ' + this.longpress);
                const t = Gestures.findOriginalTarget(e);
                this._clearPressTimers();
                this._fire('up', t, e, 'dummypassive');
            },
            _checkLongPress: function (t, e) {
                const realTarget = SigGestures.getRealTarget(e.target);

                if (this.pressTimers.length > 0)
                    this._clearPressTimers();

                const path = e.path || e.composedPath();
                if (Array.isArray(path)) {
                    path.forEach(target => {
                        if (this._hasLongpressHandler(target) &&
                            !SigGestures.excludedTargets.includes(target.tagName)) {
                            const longpressdelay = this._getLongpressDelay(target);

                            this.pressTimers.push(window.setTimeout(() => {
                                if (!target.ismoving && !target.iszooming &&
                                    !realTarget.ismoving && !realTarget.iszooming) {
                                    this.longpress = true;
                                    this._fire('longpress', target, e);
                                    log.debug('Gesture: longpress! Delay:' + longpressdelay);
                                }
                            }, longpressdelay));
                        }
                    });
                }
            },
            _hasLongpressHandler: function (target) {
                if (target[SigGestures.GESTURE_KEY] &&
                    target[SigGestures.GESTURE_KEY].mousedown &&
                    target[SigGestures.GESTURE_KEY].mousedown.siglongpress > 0) {
                    return true;
                }
                return false;
            },
            _getLongpressDelay: function (target) {
                if (target.dataset && target.dataset.longpressdelay)
                    return parseInt(target.dataset.longpressdelay, 10);

                const realTarget = SigGestures.getRealTarget(target);
                if (realTarget.longpressdelay)
                    return realTarget.longpressdelay;

                return Gestures.longpressdelay;
            },
            _fire: function (type, target, event, preventer = null) {
                log.debug('POINTER Fire: ' + type);
                fire(target, type, {
                    x: event.clientX,
                    y: event.clientY,
                    sourceEvent: event,
                    preventer: preventer,
                    prevent: function (e) {
                        return Gestures.prevent(e);
                    }
                });
            },
            _clearPressTimers: function () {
                if (Array.isArray(this.pressTimers))
                    this.pressTimers.forEach(timer => clearTimeout(timer));
                this.pressTimers = [];
            }
        });
    }

    getRealTarget(target) {
        if (target instanceof HTMLDocument || target instanceof HTMLElement || target instanceof SVGElement) {
            if (this._isInShadowDom(target)) return this._getParentHostElement(target);
            else return target;
        }
        log.error('Element is not a valid html document or html element!');
        return null;
    }


    _isInShadowDom(elm) {
        if (elm instanceof HTMLDocument || elm instanceof HTMLElement || elm instanceof SVGElement) {
            return document.contains(elm) ? false : true;
        }
        log.error('Element is not a valid html document or html element!');
        return;
    }

    _getParentHostElement(elm) {
        if (elm instanceof HTMLDocument || elm instanceof HTMLElement || elm instanceof SVGElement) {
            if (!this._isInShadowDom(elm)) {
                log.warn('Element is not in a shadow dom!');
                return null;
            }
            return elm.getRootNode().host;
        }
        log.error('Element is not a valid html document or html element!');
        return null;
    }

    getLongPressDelay() {
        return this.longPressDelay;
    }

    setLongPressDelay(delay) {
        this.longPressDelay = parseInt(delay, 10);
    }

    getTrackLength() {
        return this.trackLength;
    }

    setTrackLength(length) {
        this.trackLength = parseInt(length, 10);
    }

    getTrackDistance() {
        return this.trackDistance;
    }

    setTrackDistance(distance) {
        this.trackDistance = parseInt(distance, 10);
    }
}
export const sigGestures = new SigGestures;