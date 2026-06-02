export class SigImeExtension {

    static get id() {
        return 0;
    }

    static get languages() {
        return [];
    }

    getSuggestions(phrase, options) {
        return Promise.resolve([]);
    }

    selectedSuggestion(suggestion, options) {
    }

    replaceMapping(original) {
        return null;
    }
}

export function registerImeExtension(imeExtension) {
    const protoType = Object.getPrototypeOf(imeExtension);
    if (protoType === null) return false;
    if (protoType.name !== SigImeExtension.name) return false;
    if ('__imeExtensions' in window === false) {
        window.__imeExtensions = [];
    }
    const existingExtension = window.__imeExtensions.find(extension => extension.id === imeExtension.id);
    if (existingExtension !== undefined) {
        log.error(`Ime Extension Id "${imeExtension.id}" is already registered by "${existingExtension.name}"`);
        return false;
    }
    window.__imeExtensions.push(imeExtension);
    return true;
}
