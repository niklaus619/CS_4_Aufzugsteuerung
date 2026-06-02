import { PolymerElement } from '../../../../rt/node_modules/@polymer/polymer/polymer-element.js';
import * as SigPolymer from './sig-element-polymer.js';
import { DragDropSupportElm } from '../sig-element-mixins/drag-drop-support-mixin.js';
import { BaseMixin } from '../sig-element-mixins/base-mixin.js';
import { GestureEventListeners } from '../sig-element-mixins/gestures-support-mixin.js';
import { UtilsMixin } from '../sig-element-mixins/utils-mixin.js';
import { PolymerElementMixin } from '../sig-element-mixins/polymer-element-mixin.js';
import { BrowserDetectionMixin } from '../sig-element-mixins/browser-detection-mixin.js';
import { ShadowDomStylingMixin } from '../sig-element-mixins/shadow-dom-styling-mixin.js';

/**
 * @class 
 * @classdesc Implements and exports the sig-element component from which the most components are extended.
 * This is the base component that contains functionalities and properties that are necessary for every component.
 * @version 01.03.002
 * @mixes DragDropSupportElm Always mixed.
 * @mixes GestureEventListeners Always mixed.
 * @mixes BaseMixin Always mixed.
 * @mixes PolymerElementMixin Always mixed.
 * @mixes ShadowDomStylingMixin Always mixed.
 * @mixes BrowserDetectionMixin Always mixed.
 * @mixes DesignerMixin Only mixed in design mode.
 * @extends {PolymerElement}
 * 
 */
declare class LasalRuntimeSigElement extends
    ShadowDomStylingMixin(
        BrowserDetectionMixin(
            GestureEventListeners(
                DragDropSupportElm(
                    UtilsMixin(
                        PolymerElementMixin(
                            // The Base Mixin provides also Designer Support
                            BaseMixin(PolymerElement)
                        )
                    )
                )
            )
        )
    )
{ }

export { LasalRuntimeSigElement, SigPolymer };
