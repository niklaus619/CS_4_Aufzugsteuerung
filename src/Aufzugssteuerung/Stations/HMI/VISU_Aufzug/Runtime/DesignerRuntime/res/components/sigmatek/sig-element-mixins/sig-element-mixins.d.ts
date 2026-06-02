import { DragDropSupportElm, DragDropSupportApp } from './drag-drop-support-mixin.js';
import { BaseMixin } from './base-mixin.js';
import { mixinManager } from './mixin-manager.js';
import { GestureEventListeners } from './gestures-support-mixin.js';
import { UtilsMixin } from './utils-mixin.js';
import { BrowserDetectionMixin } from './browser-detection-mixin.js';
import { ShadowDomStylingMixin } from './shadow-dom-styling-mixin.js';
import { UnitConversionMixin } from './unit-conversion-mixin.js';

/**
 * Declares a a single type for all Mixins.
 * @exports sigMixins 
 * @version 01.01.024
 */
type SigMixins = {
    mixinManager: typeof mixinManager
    baseMixin: BaseMixin
    dragDropSupportElm: DragDropSupportElm
    dragDropSupportApp: DragDropSupportApp
    gestureEventListeners: GestureEventListeners
    utilsMixin: UtilsMixin
    shadowDomStylingMixin: ShadowDomStylingMixin
    browserDetectionMixin: BrowserDetectionMixin
    unitConversionMixin: UnitConversionMixin
};

export declare const sigMixins: SigMixins
