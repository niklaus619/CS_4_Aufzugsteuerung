export declare type mixinDefinitionObject = {
    mixin: string | Function
    rule?: string | Function
}

/**
 * @class MixinManager
 * @classdesc Implements a mixin manager class to mix mixin based on rules.
 * @version 01.00.002
 */
declare class MixinManager {
    /**
     * Mixes the mixins and extends the super class.
     * @param {Array} mixins A array of mixin functions or objects with mixin definitions.
     * @param {any} superClass The super class to extend.
     * @returns {any} The extended super class. 
     * @todo Define possible types for Array
     * @todo Cast type of superClass to classes which extended one of the base elements
     */
    mix(mixins: Array<Function | mixinDefinitionObject>, superClass: any): any

    /**
     * Extends a class with a mixin.
     * @param {Function} mixin The mixin function.
     * @param {any} extendedClass The class to extend.
     * @param {object} mixed A object containing a property for each mixed mixin. 
     * @private
     * @returns {any} The extended class
     */
    private _extendClass(mixin: Function, extendedClass: any, mixed: object): any

    /**
     * Searches for a valid mixin function in a given property path and returns the mixin function if possible.
     * @param {string} mixin The property path of the mixin.
     * @param {object} [obj=window] The object to search in for the mixin. Default is the window scope.
     * @private
     * @returns {Function | undefined} The mixin function or undefined.
     */
    private _getMixinFunction(mixin: string, obj?: object): Function | undefined

    /**
     * Evaluates a mixin rule.
     * @param {Function|boolean|string} rule The rule to evaluate.
     * @private
     * @returns {boolean} Returns true if the rule evaluates or false if not. */
    private _evaluateRule(rule: Function | boolean | string): boolean

    /**
    * Evaluates a internal mixin rule
    * @param {string} rule The internal rule to evaluate.
    * @private
    * @returns {boolean} Returns true if the rule evaluates or false if not.
    */
    private _evaluateInternalRule(rule: string): boolean

    /**
     * Returns boolean indicating whether the component is in design mode (LVD) or not.
     * @private
     * @returns {boolean} True, if the environment is LVD, false if not.
     */
    private _isDesignmode(): boolean;
}

export declare const mixinManager: MixinManager
