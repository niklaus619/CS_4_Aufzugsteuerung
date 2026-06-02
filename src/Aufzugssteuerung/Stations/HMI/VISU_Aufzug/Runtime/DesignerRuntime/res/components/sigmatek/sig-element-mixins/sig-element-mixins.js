import { DragDropSupportElm, DragDropSupportApp } from './drag-drop-support-mixin.js';
import { BaseMixin } from './base-mixin.js';
import { mixinManager as MixinManager } from './mixin-manager.js';
import { GestureEventListeners } from './gestures-support-mixin.js';
import { UtilsMixin } from './utils-mixin.js';
import { BrowserDetectionMixin } from './browser-detection-mixin.js';
import { ShadowDomStylingMixin } from './shadow-dom-styling-mixin.js';
import { UnitConversionMixin } from './unit-conversion-mixin.js';

export const sigMixins = {
    mixinManager: MixinManager,
    baseMixin: BaseMixin,
    dragDropSupportElm: DragDropSupportElm,
    dragDropSupportApp: DragDropSupportApp,
    gestureEventListeners: GestureEventListeners,
    utilsMixin: UtilsMixin,
    shadowDomStylingMixin: ShadowDomStylingMixin,
    browserDetectionMixin: BrowserDetectionMixin,
    unitConversionMixin: UnitConversionMixin
};
