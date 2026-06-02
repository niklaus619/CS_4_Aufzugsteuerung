// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

/**
 * Demo how to use sigApi.functionBlockManager
 *
 * demo setup:
 *   required user defined internal events
 *     * 'evtExecuteFcnBlock'
 *   required functionblock
 *     * 'Functionblock0'
 * 
 * copyright by Sigmatek GmbH & CoKG
 */

class DemoApiFunctionBlockManager {
    readonly FUNCTIONBLOCK_NAME = 'Functionblock0';
    static init() {
        window.sigApiReadyPromise.then(() => {
            const codemodule = new DemoApiFunctionBlockManager();
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
        const evtExecuteFcnBlock = window.sigApi.events.getUserDefinedInternalEvent('evtExecuteFcnBlock');
        if (evtExecuteFcnBlock) {
            window.sigApi.eventMediator.subscribe(
                evtExecuteFcnBlock,
                () => {
                    this._onExecuteFunctionBlock();
                }
            );
        }
    }

    /**
     * @private
     * execute a functionBlock
     */
    _onExecuteFunctionBlock() {
        console.log('[DemoApiFunctionBlockManager] _onExecuteFunctionBlock()');
        window.sigApi.functionBlockManager.executeFunctionBlock(this.FUNCTIONBLOCK_NAME).then(() => {
            console.log(`[DemoApiFunctionBlockManager] sigApi.functionBlockManager.executeFunctionBlock(${this.FUNCTIONBLOCK_NAME})`);
        }).catch((error) => {
            console.log(`[DemoApiFunctionBlockManager] error in sigApi.functionBlockManager.executeFunctionBlock(${this.FUNCTIONBLOCK_NAME}) error: ${error}`);
        });
    }

}

/**
 * Create the codemodule instance
 */
DemoApiFunctionBlockManager.init();
