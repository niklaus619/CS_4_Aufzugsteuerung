const MIXED = '__mixed';
const BASE_ELEMENT = '__baseElement';
class MixinManager {
    mix(mixins, superClass) {
        if (mixins && superClass) {
            const baseElement = (superClass[BASE_ELEMENT]) ? superClass[BASE_ELEMENT] : superClass.name;
            const mixed = (superClass[MIXED]) ? superClass[MIXED] : {};
            let extendedClass = superClass;
            extendedClass[BASE_ELEMENT] = baseElement;
            if (Array.isArray(mixins) && mixins.length > 0) {
                mixins.forEach(mixin => {
                    let shouldLoad = false;
                    if (typeof mixin === 'function') {
                        extendedClass = this._extendClass(mixin, extendedClass, mixed);
                    } else {
                        if (mixin.rule !== undefined) shouldLoad = this._evaluateRule(mixin.rule);
                        if (shouldLoad) {
                            switch (typeof mixin.mixin) {
                                case 'function':
                                    extendedClass = this._extendClass(mixin.mixin, extendedClass, mixed);
                                    break;
                                case 'string':
                                    const _mixin = this._getMixinFunction(mixin.mixin);
                                    if (_mixin) extendedClass = this._extendClass(_mixin, extendedClass, mixed);
                                    break;
                            }
                        }
                    }
                });
            }
            extendedClass[MIXED] = mixed;
            return extendedClass;
        }
        log.warn('[MixinManager.load] Mixins or superClass is missing!');
    }

    _extendClass(mixin, extendedClass, mixed) {
        if (mixin && extendedClass) {
            const mixinName = (mixin.mixinName) ? mixin.mixinName : mixin.name;
            mixed[mixinName] = true;
            return class extends mixin(extendedClass) { };
        }
        log.error('[MixinManager.extendClass] No mixin to apply or class to extend is missing!');
    }

    _getMixinFunction(mixin, obj = window) {
        const mixinFnc = (mixin && obj) ? mixin.split('.').reduce((obj, level) => obj && obj[level], obj) : undefined;
        return (typeof mixinFnc === 'function') ? mixinFnc : undefined;
    }

    _evaluateRule(rule) {
        switch (typeof rule) {
            case 'function':
                return rule();
            case 'boolean':
                return rule;
            case 'string':
                return this._evaluateInternalRule(rule);
            default:
                return false;
        }
    }

    _evaluateInternalRule(rule) {
        if (rule) {
            const not = (rule.startsWith('!')) ? true : false;
            const _rule = (not) ? rule.substring(1, rule.length) : rule;
            switch (_rule) {
                case 'isdesignmode':
                    return (not) ? !this._isDesignmode() : this._isDesignmode();
                default:
                    return false;
            }

        }
        return false;
    }

    _isDesignmode() {
        if (window.____sigIsDesignMode !== undefined) {
            return (window.____sigIsDesignMode);
        } else {
            return false;
        }
    }
}
export const mixinManager = new MixinManager();
