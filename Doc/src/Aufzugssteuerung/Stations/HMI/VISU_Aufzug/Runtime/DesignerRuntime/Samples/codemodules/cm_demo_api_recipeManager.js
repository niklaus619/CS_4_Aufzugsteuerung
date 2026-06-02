/**
 * Demo how to use sigApi.recipeManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtRecipeSave'
 *     * 'evtRecipeLoad'
 *   required directories and files
 *     * 'c:\temp\recipe.txt' expected to exist
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiRecipeManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiRecipeManager();
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
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRecipeSave'),
            () => {
                this._onRecipeSave();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRecipeLoad'),
            () => {
                this._onRecipeLoad();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.recipeManager.load
     */
    _onRecipeLoad() {
        console.log('[DemoApiRecipeManager] _onRecipeLoad()');
        const dpne = 'c:\\temp\\recipe.txt';
        const filter1 = 0;
        const filter2 = 0;
        sigApi.recipeManager.load(dpne, filter1, filter2).then((res) => {
            console.log(`[DemoApiRecipeManager] sigApi.recipeManager.load('${dpne}', ${filter1}, ${filter2}) uid: ${res.uid} dpne: ${res.dpne}`);
        }).catch((error) => {
            console.log(`[DemoApiRecipeManager] error in sigApi.recipeManager.load('${dpne}', ${filter1}, ${filter2}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

    /**
     * @private
     * log the result of sigApi.recipeManager.save
     */
    _onRecipeSave() {
        console.log('[DemoApiRecipeManager] _ onRecipeSave()');
        const dpne = 'c:\\temp\\recipe.txt';
        const headertext = 'header row1\nrow2\nrow3\n\n';
        const filter1 = 0;
        const filter2 = 0;
        sigApi.recipeManager.save(dpne, headertext, filter1, filter2).then((res) => {
            console.log(`[DemoApiRecipeManager] sigApi.recipeManager.save('${dpne}', '${headertext}', ${filter1}, ${filter2}) uid: ${res.uid} dpne: ${res.dpne}`);
        }).catch((error) => {
            console.log(`[DemoApiRecipeManager] error in sigApi.recipeManager.save('${dpne}', '${headertext}', ${filter1}, ${filter2}) uid: ${error.uid} status: ${error.status} errortxt: ${error.errortxt}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiRecipeManager.init();
