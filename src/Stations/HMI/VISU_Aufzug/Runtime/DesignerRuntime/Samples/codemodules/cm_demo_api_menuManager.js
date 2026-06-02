/**
 * Demo how to use sigApi.menuManager
 * 
 * demo setup:
 *   required user defined internal events
 *     * 'evtAddMenu'
 *     * 'evtRemoveMenu'
 *     * 'evtMenuGetBlueprint'
 *     * 'evtMenuAddMenuItem'
 *     * 'evtMenuRemoveMenuItem'
 *     * 'evtMenuItemGetBlueprint'
 *     * 'evtMenuItemAddObserver'
 *     * 'evtMenuItemRemoveObserver'
 * 
 *   required menu by id
 *     * 0
 * 
 *   required texts ('[textListName]:[textName]')
 *     * 'TextList0:addedMenuItem'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */
class DemoApiMenuManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiMenuManager();
        });
    }

    constructor() {
        this._registerEvents();

        this._addedMenus = []; // { {number} menuIndex }
        this._addedMenuItems = []; // { {number} menuIndex, {number} menuItemIndex }
        this._menuItemObservers = []; // { {number} menuIndex, {number} menuItemIndex, {number} observerId }
    }

    /**
     * @private
     * Subscribe to user defined events.
     * There is no need to use the sigUtils API to register event listeners because
     * global code modules such as this one are never destroyed during runtime. 
     */
    _registerEvents() {
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtAddMenu'),
            () => {
                this._onEvtAddMenu();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtRemoveMenu'),
            () => {
                this._onEvtRemoveMenu();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMenuGetBlueprint'),
            () => {
                this._onEvtMenuGetBlueprint();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMenuAddMenuItem'),
            () => {
                this._onEvtMenuAddMenuItem();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMenuRemoveMenuItem'),
            () => {
                this._onEvtMenuRemoveMenuItem();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMenuItemGetBlueprint'),
            () => {
                this._onEvtMenuItemGetBlueprint();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMenuItemAddObserver'),
            () => {
                this._onEvtMenuItemAddObserver();
            }
        );
        sigApi.eventMediator.subscribe(
            sigApi.events.getUserDefinedInternalEvent('evtMenuItemRemoveObserver'),
            () => {
                this._onEvtMenuItemRemoveObserver();
            }
        );
    }

    /**
     * @private
     * log the result of sigApi.menuManager.addMenu
     */
    _onEvtAddMenu() {
        console.log('[DemoApiMenuManager] _onEvtAddMenu()');
        const menuBlueprint = {
            name: `addedMenu${this._addedMenus.length}`,
            menuItems: [
                {
                    name: `addedMenu${this._addedMenus.length}AddedMenuItem0`,
                    text: {
                        name: 'text',
                        value: 'TextList0:addedMenuItem',
                        src: sigApi.SIG_CONST.PROP_SRC_TEXT,
                        dest: sigApi.SIG_CONST.PROP_DEST_VARIABLE
                    },
                    value: {
                        name: 'value',
                        value: 0,
                        src: sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                        dest: sigApi.SIG_CONST.PROP_DEST_VARIABLE
                    }
                }
            ]
        };
        const menu = sigApi.menuManager.addMenu(menuBlueprint);
        this._addedMenus.push({
            menuIndex: menu.getIndex()
        });
        console.log(`[DemoApiMenuManager] sigApi.menuManager.addMenu(${menuBlueprint})`, menu);
    }

    /**
     * @private
     * log the result of sigApi.menuManager.removeMenu
     */
    _onEvtRemoveMenu() {
        console.log('[DemoApiMenuManager] _onEvtRemoveMenu()');
        const addedMenu = this._addedMenus.pop();
        if (!addedMenu) return;
        const result = sigApi.menuManager.removeMenu(addedMenu.menuIndex);
        console.log(`[DemoApiMenuManager] sigApi.menuManager.removeMenu(${addedMenu.menuIndex})`, result);
    }

    /**
     * @returns {number}
     */
    _getMenuIndex() {
        // no addedMenu return menuId 0
        if (this._addedMenus.length === 0) return 0;
        // else return menuId of the last addedMenu
        const addedMenu = this._addedMenus[this._addedMenus.length - 1];
        return addedMenu.menuIndex;
    }

    /**
     * @private
     * log the result of {Menu} getBlueprint
     */
    _onEvtMenuGetBlueprint() {
        console.log('[DemoApiMenuManager] _onEvtMenuGetBlueprint()');
        const menuIndex = this._getMenuIndex();
        const menuBlueprint = sigApi.menuManager.getMenu(menuIndex).getBlueprint();
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenu(${menuIndex}).getBlueprint()`, menuBlueprint);
    }

    /**
     * @private
     * log the result of {Menu} addMenuItem
     */
    _onEvtMenuAddMenuItem() {
        console.log('[DemoApiMenuManager] _onEvtMenuAddMenuItem()');
        const menuIndex = this._getMenuIndex();
        const menuItemBlueprint = {
            name: `addedMenuItem${this._addedMenuItems.length}`,
            props: {
                text: {
                    name: 'text',
                    value: 'TextList0:addedMenuItem',
                    src: sigApi.SIG_CONST.PROP_SRC_TEXT,
                    dest: sigApi.SIG_CONST.PROP_DEST_VARIABLE
                },
                value: {
                    name: 'value',
                    value: this._addedMenuItems.length,
                    src: sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    dest: sigApi.SIG_CONST.PROP_DEST_VARIABLE
                }
            }
        };
        const menuItem = sigApi.menuManager.getMenu(menuIndex).addMenuItem(menuItemBlueprint);
        this._addedMenuItems.push({
            menuIndex: menuIndex,
            menuItemIndex: menuItem.getIndex()
        });
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenu(${menuIndex}).addMenuItem(${menuItemBlueprint})`, menuItem);
    }

    /**
     * @private
     * log the result of {Menu} removeMenuItem
     */
    _onEvtMenuRemoveMenuItem() {
        console.log('[DemoApiMenuManager] _onEvtMenuRemoveMenuItem()');
        const addedMenuItem = this._addedMenuItems.pop();
        if (!addedMenuItem) return;
        const result = sigApi.menuManager.getMenu(addedMenuItem.menuIndex).removeMenuItem(addedMenuItem.menuItemIndex);
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenu(${addedMenuItem.menuIndex}).removeMenuItem(${addedMenuItem.menuItemIndex})`, result);
    }

    /**
     * @private
     * log the result of {MenuItem} getBlueprint
     */
    _onEvtMenuItemGetBlueprint() {
        console.log('[DemoApiMenuManager] _onEvtMenuItemGetBlueprint()');
        if (this._addedMenuItems.length === 0) return;
        const addedMenuItem = this._addedMenuItems[this._addedMenuItems.length - 1];
        const menuItemBlueprint = sigApi.menuManager.getMenuItemFromMenuItemIndex(addedMenuItem.menuItemIndex).getBlueprint();
        // CAUTION: addedMenuItem.menuItemIndex returned by {MenuItem} getIndex()
        //          is not the index of {Menu} getItems() array
        // const menuItemBlueprint = sigApi.menuManager.getMenu(addedMenuItem.menuIndex).getItems()[addedMenuItem.menuItemIndex]; <- ERROR
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenuItemFromMenuItemIndex(${addedMenuItem.menuItemIndex}).getBlueprint()`, menuItemBlueprint);
    }

    /**
     * @private
     * log the result of {MenuItem} addObserver
     */
    _onEvtMenuItemAddObserver() {
        console.log('[DemoApiMenuManager] _onEvtMenuItemAddObserver()');
        if (this._addedMenuItems.length === 0) return;
        const addedMenuItem = this._addedMenuItems[this._addedMenuItems.length - 1];
        const observerId = sigApi.menuManager.getMenuItemFromMenuItemIndex(addedMenuItem.menuItemIndex).addObserver('value', () => {
            console.log(`[DemoApiMenuManager] value observer of menuItem (menuItemIndex: ${addedMenuItem.menuItemIndex})`);
        });
        if (observerId === null) return;
        this._menuItemObservers.push({
            menuIndex: addedMenuItem.menuIndex,
            menuItemIndex: addedMenuItem.menuItemIndex,
            observerId: observerId
        });
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenuItemFromMenuItemIndex(${addedMenuItem.menuItemIndex}).addObserver(...)`, observerId);
    }

    /**
     * @private
     * log the result of {MenuItem} removeObserver
     */
    _onEvtMenuItemRemoveObserver() {
        console.log('[DemoApiMenuManager] _onEvtMenuItemRemoveObserver');
        if (this._menuItemObservers.length === 0) return;
        const observer = this._menuItemObservers.pop();
        sigApi.menuManager.getMenuItemFromMenuItemIndex(observer.menuItemIndex).removeObserver(observer.observerId);
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenuItemFromMenuItemIndex(${observer.menuItemIndex}).removeObserver(${observer.observerId})`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiMenuManager.init();
