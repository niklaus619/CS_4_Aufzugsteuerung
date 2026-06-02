export declare type ImeSuggestionObject = {
    /** The suggestion text */
    suggestion: string
    /** Determines if the input phrase should be finished after the user selected the suggestion. */
    finishPhrase: boolean
    /** If the suggestion will not finish the phrase, this is the number of characters replaced by the suggestion starting from the left side of the active phrase. */
    lengthOfReplacement: number
}

export declare type ImeKeyboardOptionsObject = {
    /** The current ISO language code of the keyboard. */
    activeLanguage: string
    /** The id of active layer of the keyboard */
    activeLayer: string
    /** A abort signal which indicates that the promise should be canceld. */
    abortSignal: AbortSignal | undefined
}

/**
 * Implements the Sigmatek IME Extension Base Class
 * @export
 * @version 01.00.002
 * @class SigImeExtension
 */
export class SigImeExtension {

    /**
     * Returns the id of the IME Extension.
     * 
     *  0 ...... 1000    Sigmatek Internal Range.
     *  1001.... 10000   Sigmatek Application Range.
     *  >10001 	         Customer Range.
     * 
     * @readonly
     * @static
     * @returns {number} The id of the IME Extensions.
     */
    static get id(): number

    /**
     * Returns an array of ISO language codes handled by the IME Extension.
     * @readonly
     * @static
     * @returns {string[]} An array of ISO language codes handled by the IME Extension.
     */
    static get languages(): string[]

    /**
     * Returns an array of suggestions objects for a given phrase.
     * This function is called by the keyboard while the user types in a phrase.
     * @param {string} phrase The phrase to return the suggestions for.
     * @param {ImeKeyboardOptionsObject} options An object with the following structure: {activeLanguage: string, activeLayer: string, abortSignal: AbortSignal}
     * @returns {Promise<ImeSuggestionObject[]|null>} Returns a promise which resolves an array of suggestions objects. []{suggestion: string, finishPhrase: boolean, lengthOfReplacement: number}
     */
    getSuggestions(phrase: string, options: ImeKeyboardOptionsObject): Promise<ImeSuggestionObject[] | null>

    /**
     * This function is called by the keyboard after the user selected a suggestion.
     * @param {ImeSuggestionObject} suggestion The suggestions object of the suggestion the user selected.
     * @param {ImeKeyboardOptionsObject} options  A object with the following structure: {activeLanguage: string, activeLayer: string}
     */
    selectedSuggestion(suggestion: ImeSuggestionObject, options: ImeKeyboardOptionsObject): void

    /**
     * Returns a replacment character for the given original character.
     * @param {string} original The original character to replace.
     * @returns {string|null} The replacement character or null if no replacement was found.
     */
    replaceMapping(original: string): string | null
}

/**
 * Registers an IME Extension class.
 * @export
 * @param {object} imeExtension The IME Extension class to register.
 * @returns {boolean} Returns true if the extension has been registered, otherwise false.
 */
export declare function registerImeExtension(imeExtension: object): boolean