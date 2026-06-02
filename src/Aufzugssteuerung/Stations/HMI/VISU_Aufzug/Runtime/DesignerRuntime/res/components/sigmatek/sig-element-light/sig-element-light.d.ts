import { PolymerElement } from '../../../../rt/node_modules/@polymer/polymer/polymer-element.js';
import * as SigPolymer from '../sig-element/sig-element-polymer.js';
import { BaseMixin } from '../sig-element-mixins/base-mixin.js';
import { PolymerElementMixin } from '../sig-element-mixins/polymer-element-mixin.js';

/**
 * @class 
 * @classdesc Implements and exports the sig-element-light component from which simple and fast components are extended.
 * @version 01.02.001
 * @mixes DesignerSupport Only mixed in design mode.
 * @mixes BaseMixin Always mixed.
 * @mixes PolymerElementMixin Always mixed.
 * @extends {PolymerElement}
 */
declare class LasalRuntimeSigElementLight extends
    PolymerElementMixin(
        // The Base Mixin provides also Designer Support
        BaseMixin(PolymerElement)
    )
{ }

export { LasalRuntimeSigElementLight, SigPolymer };
