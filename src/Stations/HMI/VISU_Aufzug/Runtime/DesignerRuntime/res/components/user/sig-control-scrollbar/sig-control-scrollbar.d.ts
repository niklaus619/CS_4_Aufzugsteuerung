import { LasalRuntimeSigElement } from '../../sigmatek/sig-element/sig-element.js';

/**
 * @class
 * @classdesc Implements sig-control-scrollbar control
 * @version 01.03.001
 * @extends LasalRuntimeSigElement
 */
export declare class LasalRuntimeSigScrollbarElement extends LasalRuntimeSigElement {

    /** Applies at design time to preview the active state of scrollbar */
    simulationmode: boolean

    /**
     * Returns the components registered tag name.
     * @readonly
     * @static
     */
    static readonly is: string

    /**
     * Returns the defined polymer properties of the component
     * @readonly
     * @static
     */
    static readonly properties: object

    /**
     * Returns the import path url used by Polymer.
     * @readonly
     * @static
     */
    static readonly importMeta: ImportMeta

    /**
     * Returns the html literal of the component
     * @readonly
     * @static
     * @returns {HTMLTemplateElement} The template literal of the component. 
     */
    static readonly template: HTMLTemplateElement

    /**
     * Checks, if the scrollbar should show the active state in design mode.
     * @private
     * @param {boolean} isdesignmode True, if design mode is on.
     * @param {boolean} simulationmode True, if simulation mode is on.
     */
    _showActiveState(isdesignmode: boolean, simulationmode: boolean): boolean
}
