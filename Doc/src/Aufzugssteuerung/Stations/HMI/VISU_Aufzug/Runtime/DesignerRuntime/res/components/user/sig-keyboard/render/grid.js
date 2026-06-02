import { RenderBase } from './base.js';

export class RenderGrid extends RenderBase {

    constructor() {
        super();
    }

    get display() {
        return 'grid';
    }

    build(type, lang, layout, config) {
        let styles;
        const keyboard = document.createDocumentFragment();
        if (!type || !lang || !layout || !config) return { keyboard, styles };
        const defaults = { cols: 15, rows: 5, colSpan: 1, rowSpan: 1, colGap: '0px', rowGap: '0px', styles: null };
        const cfg = this._deepMerge(defaults, config);
        styles = `.${type}.${lang}.grid .layer {
                grid-template-columns: repeat(${cfg.cols}, 1fr);
                grid-template-rows: repeat(${cfg.rows}, 1fr);
                grid-row-gap: var(--theme-sig-keyboard-grid-row-gap, ${cfg.rowGap});
                grid-column-gap: var(--theme-sig-keyboard-grid-column-gap, ${cfg.colGap});
            }
            .${type}.${lang}.grid .key {
                grid-column: span ${cfg.colSpan} / span ${cfg.colSpan};
                grid-row: span ${cfg.rowSpan} / span ${cfg.rowSpan};
                min-width: initial !important;
                min-height: initial !important;
                margin: initial !important;
                width: initial !important;
                height: initial !important;
                max-width: initial !important;
                max-height: initial !important;
                line-height: initial !important;
                white-space: nowrap;
                overflow: hidden; 
                flex-direction: column;
                justify-content: center;
                align-items: center;
            } \n`;
        keyboard.appendChild(document.createElement('div'));
        keyboard.lastChild.classList.add(type, lang, this.display);
        const currentLayer = keyboard.lastChild;
        const layernames = Object.getOwnPropertyNames(layout);
        let layerIndex = 0;
        for (const layer of Object.values(layout)) {
            if (this._isArrayOfType(layer, 'object') === false) return;
            const currentLayerName = layernames[layerIndex];
            currentLayer.appendChild(document.createElement('div'));
            currentLayer.lastChild.className = `layer ${currentLayerName}`;
            layerIndex += 1;
            let keyIndex = 1;
            for (const key of layer) {
                const currentKey = currentLayer.lastChild;
                const _key = this._getKey(key);
                if (_key) {
                    const id = `${type}_${lang}_${this.display}_${currentLayerName}_${keyIndex}`;
                    _key.id = id;
                    this._renderKey(currentKey, _key);
                    if (_key.grid && Object.keys(_key.grid).length) {
                        const grid = _key.grid;
                        styles += `#${id} {\n`;
                        if (grid.colSpan) styles += `  grid-column: span ${grid.colSpan} / span ${grid.colSpan};\n`;
                        if (grid.rowSpan) styles += `  grid-row: span ${grid.rowSpan} / span ${grid.rowSpan};\n`;
                        if (grid.colStart) styles += `  grid-column-start: ${grid.colStart};\n`;
                        if (grid.rowStart) styles += `  grid-row-start: ${grid.rowStart};\n`;
                        styles += '}\n';
                    }
                }
                keyIndex += 1;
            }
        }
        if (typeof cfg.style === 'string' && cfg.style.length > 0) styles += cfg.style;
        return { keyboard, styles };
    }
}