// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.textManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtGetCurrLang'
 *     * 'evtGetText'
 *     * 'evtGetTexts'
 *     * 'evtGetTextWithParam'
 *     * 'evtGetLanguages'
 *   required textList
 *     * 'sampleTextList'
 *   required text
 *     * 'sampleText' (textList: 'sampleTextList') text should have 1 parameter e.g. 'sample text with parameter: %any'
 *  
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiTextManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiTextManager();
        });
    }

    constructor() {
        this._registerEvents();
    }

    /**
     * @private
     * Subscribe to user defined events.
     * There is no need to use the sigUtils API to register event listeners because
     * global code modules such as this one are never destroyed during runtime. 
     */
    _registerEvents() {
        const evtGetCurrLang = window.sigApi.events.getUserDefinedInternalEvent('evtGetCurrLang');
        if (evtGetCurrLang) {
            window.sigApi.eventMediator.subscribe(
                evtGetCurrLang,
                () => {
                    this._onGetCurrentLanguage();
                }
            );
        }
        const evtGetText = window.sigApi.events.getUserDefinedInternalEvent('evtGetText');
        if (evtGetText) {
            window.sigApi.eventMediator.subscribe(
                evtGetText,
                () => {
                    this._onGetText();
                }
            );
        }
        const evtGetTexts = window.sigApi.events.getUserDefinedInternalEvent('evtGetTexts');
        if (evtGetTexts) {
            window.sigApi.eventMediator.subscribe(
                evtGetTexts,
                () => {
                    this._onGetTexts();
                }
            );
        }
        const evtGetTextWithParam = window.sigApi.events.getUserDefinedInternalEvent('evtGetTextWithParam');
        if (evtGetTextWithParam) {
            window.sigApi.eventMediator.subscribe(
                evtGetTextWithParam,
                () => {
                    this._onGetTextWithParameter();
                }
            );
        }
        const evtGetLanguages = window.sigApi.events.getUserDefinedInternalEvent('evtGetLanguages');
        if (evtGetLanguages) {
            window.sigApi.eventMediator.subscribe(
                evtGetLanguages,
                () => {
                    this._onGetLanguages();
                }
            );
        }
    }

    /**
     * @private
     * log the result of sigApi.textManager.getCurrentLanguage
     */
    _onGetCurrentLanguage() {
        console.log('[DemoApiTextManager] _onGetCurrentLanguage()');
        window.sigApi.textManager.getCurrentLanguageAsync().then((currentLanguage) => {
            console.log(`[DemoApiTextManager] sigApi.textManager.getCurrentLanguage() languageIndex: ${currentLanguage.languageIndex} languageCode: ${currentLanguage.languageCode} languageID: ${currentLanguage.languageID}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.textManager.getText
     */
    _onGetText() {
        console.log('[DemoApiTextManager] _onGetText()');
        const textListName = 'sampleTextList';
        const textName = 'sampleText';
        window.sigApi.textManager.getCurrentLanguageAsync().then((currentLanguage) => {
            window.sigApi.textManager.getTextAsync(textListName, textName, currentLanguage.languageIndex).then((text) => {
                console.log(`[DemoApiTextManager] sigApi.textManager.getText('${textListName}', '${textName}', ${currentLanguage.languageIndex}) text: ${text}`);
            });
        });
    }

    /**
     * @private
     * log the result of sigApi.textManager.getTexts
     */
    _onGetTexts() {
        console.log('[DemoApiTextManager] _onGetTexts()');
        const descObj = {
            sampleTextList: {
                sampleText: 'default1'
            },
            sampleTextList2: {
                sampleText: 'default2'
            }
        };
        window.sigApi.textManager.getCurrentLanguageAsync().then((currentLanguage) => {
            console.log(`[DemoApiTextManager] sigApi.textManager.getTexts(${descObj}, ${currentLanguage.languageIndex})`);
            window.sigApi.textManager.getTextsAsync(descObj, currentLanguage.languageIndex).then((res) => {
                console.log(`[DemoApiTextManager]     sampleTextList.sampleText: ${res.sampleTextList.sampleText}`);
                console.log(`[DemoApiTextManager]     sampleTextList2.sampleText: ${res.sampleTextList2.sampleText}`);
            });
        });
    }

    /**
     * @private
     * log the result of sigApi.textManager.getTextWithParameter
     */
    _onGetTextWithParameter() {
        console.log('[DemoApiTextManager] _onGetTextWithParameter()');
        const descObj = {
            textList: 'sampleTextList',
            text: 'sampleText',
            param: ['someText']
        };
        window.sigApi.textManager.getCurrentLanguageAsync().then((currentLanguage) => {
            console.log(`[DemoApiTextManager] sigApi.textManager.getTextWithParameter(${descObj}, ${currentLanguage.languageIndex})`);
            window.sigApi.textManager.getTextWithParameterAsync(descObj, currentLanguage.languageIndex).then((res) => {
                console.log(`[DemoApiTextManager]     res: ${res}`);
            });
        });
    }

    /**
     * @private
     * log the result of sigApi.textManager.getLanguages
     */
    _onGetLanguages() {
        console.log('[DemoApiTextManager] _onGetLanguages()');
        window.sigApi.textManager.getLanguagesAsync().then((languages) => {
            console.log('[DemoApiTextManager] sigApi.textManager.getLanguages()');
            for (const lang of languages) {
                console.log(`[DemoApiTextManager]     description: ${lang.getDescription()}`);
                console.log(`[DemoApiTextManager]     index: ${lang.getIndex()}`);
                console.log(`[DemoApiTextManager]     code: ${lang.getCode()}`);
                console.log(`[DemoApiTextManager]     id: ${lang.getId()}`);
                console.log('');
            }
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiTextManager.init();
