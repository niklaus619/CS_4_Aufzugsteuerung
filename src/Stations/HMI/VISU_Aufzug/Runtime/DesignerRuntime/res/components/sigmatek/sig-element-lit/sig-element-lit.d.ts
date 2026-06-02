import { LitElement } from '../../../../rt/node_modules/lit-element/lit-element.js';
import * as SigLit from './sig-element-lit-html.js';
import { BaseMixin } from '../sig-element-mixins/base-mixin.js';

/**
 * @class 
 * @classdesc Implements and exports the sig-element-lit component from which simple and fast components are extended.
 * @version 01.02.001
 * @mixes BaseMixin Always mixed.
 * @mixes DesignerSupport Only mixed in design mode.
 * @extends {LitElement}
 */
declare class LasalRuntimeSigElementLit extends
    // The Base Mixin provides also Designer Support
    BaseMixin(LitElement)
{ }

export { LasalRuntimeSigElementLit, SigLit };
