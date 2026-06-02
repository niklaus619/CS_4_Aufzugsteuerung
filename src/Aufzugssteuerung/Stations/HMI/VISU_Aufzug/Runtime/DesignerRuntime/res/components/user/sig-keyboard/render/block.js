import { RenderBase } from './base.js';

export class RenderBlock extends RenderBase {

    constructor() {
        super();
    }

    get display() {
        return 'block';
    }

    build(type, lang, layout, config) {
        let styles;
        const keyboard = document.createDocumentFragment();
        if (!type || !lang || !layout) return { keyboard, styles };
        keyboard.appendChild(document.createElement('div'));
        keyboard.lastChild.className = type;
        const currentLayer = keyboard.lastChild;
        const layernames = Object.getOwnPropertyNames(layout);
        let i = 0;
        for (const layer of Object.values(layout)) {
            currentLayer.appendChild(document.createElement('div'));
            currentLayer.lastChild.className = `layer ${layernames[i]}`;
            const currentRow = currentLayer.lastChild;
            i += 1;
            for (const row of layer) {
                const keys = row.split(' ');
                currentRow.appendChild(document.createElement('div'));
                currentRow.lastChild.classList.add('row', 'clearfix');
                const currentKey = currentRow.lastChild;
                for (const key of keys) {
                    const _key = this._getKey(key);
                    this._renderKey(currentKey, _key);
                }
            }
        }
        return { keyboard, styles };
    }
}