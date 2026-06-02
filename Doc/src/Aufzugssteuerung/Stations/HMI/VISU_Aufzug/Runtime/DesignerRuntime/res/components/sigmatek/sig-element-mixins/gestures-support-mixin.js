import { GestureEventListeners as gestureEventListenersOri } from '../../../../rt/node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import '../sig-element/sig-element-gestures.js';
import * as Gestures from '../../../../rt/node_modules/@polymer/polymer/lib/utils/gestures.js';
import { dedupingMixin } from '../../../../rt/node_modules/@polymer/polymer/lib/utils/mixin.js';

export const GestureEventListeners = dedupingMixin((superClass) => {
    return class extends gestureEventListenersOri(superClass) {
        constructor() {
            super();
            this.iszooming = false;
            this.ismoving = false;
        }

        get gestures() {
            return Gestures;
        }
    };
});
GestureEventListeners.mixinName = 'GestureEventListeners';

