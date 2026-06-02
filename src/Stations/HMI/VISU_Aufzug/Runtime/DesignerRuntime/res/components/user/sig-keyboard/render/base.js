import { standardKey, specialKeys } from './keys.js';

export class RenderBase {
    constructor() {
        this._created = Date.now();
    }

    get created() {
        return this._created;
    }

    get display() {
        return '';
    }

    build(type, lang, layout, config) {
    }

    _getStandardKey() {
        return standardKey;
    }

    _getSpecialKey(key) {
        if (typeof key !== 'string') return undefined;
        return specialKeys.find(obj => obj.key === key);
    }

    _getKey(key) {
        if (key === undefined) return null;
        let _key = {};
        switch (typeof key) {
            case 'string':
                _key.key = key;
                break;
            case 'object':
                _key = key;
                break;
            default:
                _key = {};
                break;
        }
        const _standardKey = this._getStandardKey();
        const _specialKey = this._getSpecialKey(_key.key);
        if (_specialKey !== undefined) return this._deepMerge(_specialKey, _key);
        if (_key.text === undefined) _key.text = _key.key;
        return this._deepMerge(_standardKey, _key);
    }

    _renderKey(key, data) {
        if ((key instanceof HTMLElement) === false) return;
        if (typeof data !== 'object') return;
        key.appendChild(document.createElement('div'));
        if (data.id) key.lastChild.id = data.id;
        if (data.class) key.lastChild.className = data.class;
        if (data.text || data.content) {
            switch (typeof data.content) {
                case 'function':
                    key.lastChild.innerHTML = data.content(data);
                    break;
                case 'string':
                    key.lastChild.innerHTML = data.content;
                    break;
                default:
                    key.lastChild.textContent = data.text;
                    break;
            }
        }
        if (data.style) key.lastChild.style = data.style;
        if (data.key) key.lastChild.setAttribute('data-key', data.key);
        if (data.config instanceof Object) key.lastChild.setAttribute('data-key-config', JSON.stringify(data.config));
    }

    _isArrayOfType(arr, type) {
        if (!Array.isArray(arr)) return false;
        return arr.every(element => typeof element === type);
    }

    _deepMerge(target, source) {
        const newTarget = deepClone(target);
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                const targetValue = newTarget[key];
                const sourceValue = source[key];
                if (typeof targetValue === 'object' && targetValue !== null &&
                    typeof sourceValue === 'object' && sourceValue !== null) {
                    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                        newTarget[key] = targetValue.concat(sourceValue); 
                    } else {
                        newTarget[key] = this._deepMerge(targetValue, sourceValue);
                    }
                } else {
                    newTarget[key] = sourceValue;
                }
            }
        }

        return newTarget;

        function deepClone(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return obj; 
            }
            if (Array.isArray(obj)) {
                return obj.map(deepClone); 
            }
            const newObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    newObj[key] = deepClone(obj[key]); 
                }
            }
            return newObj;
        }
    }
}