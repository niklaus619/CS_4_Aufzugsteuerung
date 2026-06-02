// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

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

class AddedMenus {
    menuIndex: number
}
class AddedMenuItems {
    menuIndex: number
    menuItemIndex: number
}
class MenuItemObservers {
    menuIndex: number
    menuItemIndex: number
    observerId: number
}

class DemoApiMenuManager {
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiMenuManager();
        });
    }

    _addedMenus: AddedMenus[] = []; // { {number} menuIndex }
    _addedMenuItems: AddedMenuItems[] = []; // { {number} menuIndex, {number} menuItemIndex }
    _menuItemObservers: MenuItemObservers[] = []; // { {number} menuIndex, {number} menuItemIndex, {number} observerId }
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
        const evtAddMenu = window.sigApi.events.getUserDefinedInternalEvent('evtAddMenu');
        if (evtAddMenu) {
            window.sigApi.eventMediator.subscribe(
                evtAddMenu,
                () => {
                    this._onEvtAddMenu();
                }
            );
        }
        const evtRemoveMenu = window.sigApi.events.getUserDefinedInternalEvent('evtRemoveMenu');
        if (evtRemoveMenu) {
            window.sigApi.eventMediator.subscribe(
                evtRemoveMenu,
                () => {
                    this._onEvtRemoveMenu();
                }
            );
        }
        const evtMenuGetBlueprint = window.sigApi.events.getUserDefinedInternalEvent('evtMenuGetBlueprint');
        if (evtMenuGetBlueprint) {
            window.sigApi.eventMediator.subscribe(
                evtMenuGetBlueprint,
                () => {
                    this._onEvtMenuGetBlueprint();
                }
            );
        }
        const evtMenuAddMenuItem = window.sigApi.events.getUserDefinedInternalEvent('evtMenuAddMenuItem');
        if (evtMenuAddMenuItem) {
            window.sigApi.eventMediator.subscribe(
                evtMenuAddMenuItem,
                () => {
                    this._onEvtMenuAddMenuItem();
                }
            );
        }
        const evtMenuRemoveMenuItem = window.sigApi.events.getUserDefinedInternalEvent('evtMenuRemoveMenuItem');
        if (evtMenuRemoveMenuItem) {
            window.sigApi.eventMediator.subscribe(
                evtMenuRemoveMenuItem,
                () => {
                    this._onEvtMenuRemoveMenuItem();
                }
            );
        }
        const evtMenuItemGetBlueprint = window.sigApi.events.getUserDefinedInternalEvent('evtMenuItemGetBlueprint');
        if (evtMenuItemGetBlueprint) {
            window.sigApi.eventMediator.subscribe(
                evtMenuItemGetBlueprint,
                () => {
                    this._onEvtMenuItemGetBlueprint();
                }
            );
        }
        const evtMenuItemAddObserver = window.sigApi.events.getUserDefinedInternalEvent('evtMenuItemAddObserver');
        if (evtMenuItemAddObserver) {
            window.sigApi.eventMediator.subscribe(
                evtMenuItemAddObserver,
                () => {
                    this._onEvtMenuItemAddObserver();
                }
            );
        }
        const evtMenuItemRemoveObserver = window.sigApi.events.getUserDefinedInternalEvent('evtMenuItemRemoveObserver');
        if (evtMenuItemRemoveObserver) {
            window.sigApi.eventMediator.subscribe(
                evtMenuItemRemoveObserver,
                () => {
                    this._onEvtMenuItemRemoveObserver();
                }
            );
        }
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
                        src: window.sigApi.SIG_CONST.PROP_SRC_TEXT,
                        dest: window.sigApi.SIG_CONST.PROP_DEST_VARIABLE
                    },
                    value: {
                        name: 'value',
                        value: 0,
                        src: window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                        dest: window.sigApi.SIG_CONST.PROP_DEST_VARIABLE
                    }
                }
            ]
        };
        const menu = window.sigApi.menuManager.addMenu(menuBlueprint);
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
        const result = window.sigApi.menuManager.removeMenu(addedMenu.menuIndex);
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
        const menuBlueprint = window.sigApi.menuManager.getMenu(menuIndex)?.getBlueprint();
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
                    src: window.sigApi.SIG_CONST.PROP_SRC_TEXT,
                    dest: window.sigApi.SIG_CONST.PROP_DEST_VARIABLE
                },
                value: {
                    name: 'value',
                    value: this._addedMenuItems.length,
                    src: window.sigApi.SIG_CONST.PROP_SRC_CONSTANT,
                    dest: window.sigApi.SIG_CONST.PROP_DEST_VARIABLE
                }
            }
        };
        const menuItem = window.sigApi.menuManager.getMenu(menuIndex)?.addMenuItem(menuItemBlueprint);
        menuItem && this._addedMenuItems.push({
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
        const result = window.sigApi.menuManager.getMenu(addedMenuItem.menuIndex)?.removeMenuItem(addedMenuItem.menuItemIndex);
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
        const menuItemBlueprint = window.sigApi.menuManager.getMenuItemFromMenuItemIndex(addedMenuItem.menuItemIndex)?.getBlueprint();
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
        const observerId = window.sigApi.menuManager.getMenuItemFromMenuItemIndex(addedMenuItem.menuItemIndex)?.addObserver('value', () => {
            console.log(`[DemoApiMenuManager] value observer of menuItem (menuItemIndex: ${addedMenuItem.menuItemIndex})`);
        });
        if (observerId === undefined) return;
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
        if (observer === undefined) return;
        window.sigApi.menuManager.getMenuItemFromMenuItemIndex(observer.menuItemIndex)?.removeObserver(observer.observerId);
        console.log(`[DemoApiMenuManager] sigApi.menuManager.getMenuItemFromMenuItemIndex(${observer.menuItemIndex}).removeObserver(${observer.observerId})`);
    }

}

/**
 * Create the codemodule instance
 */
DemoApiMenuManager.init();
