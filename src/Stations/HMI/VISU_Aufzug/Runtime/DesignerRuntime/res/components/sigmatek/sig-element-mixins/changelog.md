# Changelog for sig-element-mixins

## [01.01.025] - 2025-06-02
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG

### Changed
- Base Mixin 01.01.012:
    - getControlBounds() now attempts to determine the box dimensions via the API if these cannot be determined via the CSS variables.  

## [01.01.024] - 2024-09-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG

### Added
- Base Mixin 01.01.011: 
    - Added findFirstTopLevelHostElement()
    - Added getContext()
    - Fixed small linter errors.

## [01.01.023] - 2024-05-28
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG

### Added
- Base Mixin 01.01.010: Added support for Inactive Interaction.

### Fixed
- Drag & Drop Support Mixin 01.02.007: 
    - _findDropTargets() no longer returns duplicate drop targets from shadow dom.
    - Renamed deprecated pageXOffset, pageYOffset to scrollX and scrollY.

## [01.01.022] - 2023-11-03
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG

### Added
- Added TypeScript definitions for:
    - Base Mixin 01.01.009
    - Browser Detection Mixin 01.00.001
    - Drag & Drop Support Mixin 01.02.006
    - Gesture Support Mixin 01.00.002
    - Mixin Manager 01.00.002
    - Polymer Element Mixin 01.00.003
    - Shadow Dom Styling Mixin 01.00.001
    - Unit Conversion Mixin 01.00.004
    - Utils Mixin 01.00.002
    - Designer Support Mixin 01.01.002

### Fixed
- Fixed some minor linter errors, jsDoc parameter types and typos.

## [01.01.021] - 2023-02-08
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG

### Changed
- Drag & Drop Support Mixin 01.02.005: _createClone() now checks the drag clone for presence of the Base Mixin instead of checking the prototype.

### Fixed
- Drag & Drop Support Mixin 01.02.005: Fixed wrong initial position of the drag clone.
 
## [01.02.020] - 2023-01-20
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Added
- Added getControlTextListName() to base-mixin.js

## [01.02.019] - 2022-08-17
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Changed
- The component now uses asynchronous text API functions.

## [01.01.018] - 2022-06-08
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG

### Changed
- Base Mixin 01.01.007: Added a second parameter "forceTouchEndPrevent" to sigPreventDefault() to force touchend events to prevent the default action.
- Base Mixin 01.01.007: Added a second parameter "disablePrefix" to _dispatchEvent() to suppress the automatic prefixing of the event name.

## [01.01.017] - 2022-04-14
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG

### Changed
- Changed default parameters of sigSetTimeout and sigSetInterval to conform with default implementations of setTimeout and setInterval.

## [01.01.016] - 2022-02-16
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG

### Fixed
- Only disable `notify` events for properties currently updated by the Runtime.
- The fix was needed because Runtime was not notified of the changes when a data point property was set in an observer of other data point property.

## [01.01.015] - 2022-01-18
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG

### Changed
- Added missing check for unitProperty.

## [01.01.014] - 2022-01-14
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG

### Changed
- Fixed unit conversion mixin ignoring isFloatingPoint() when calling convertValueBackWithUnit() properties API method.

## [01.01.013] - 2022-01-13
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG
### Fixed
- Delay of touch inputs on iOS/iPadOS in sigPreventDefault() of base-mixin.

## [01.01.012] - 2021-01-12
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG

### Added
- Added the getUnitConversion(dpPropName) method to the Unit Conversion Mixin.
- Added the conversion of limit low and limit high values. The converted values are written on the component itself.

## [01.01.011] - 2021-11-11
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG
### Changed
* Remove event listeners, promises, timeouts and intervals in disconnectedCallback using sigUtils.clearAll() method to also clear it when Runtime does not know the component (ShadowDom or dynamically created)

## [01.01.010] - 2021-11-11
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added unit conversion mixin.
## [01.01.009] - 2021-11-04
by _Rainer Brodinger_ of _SIGMATEK GmbH & Co KG
### Added
* sigOnStatePropertyDetailChange()

## [01.01.008] - 2021-10-01
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG
### Changed
- isdragClone is now reflected to attribute.

## [01.01.007] - 2021-06-22
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Fixed sigOnRequiredPropertiesReady() callback called twice.
- Now the callback is called only once, and always after connectedCallback, even if required properties are set before connectedCallback.

## [01.01.006] - 2021-05-27
by _Maximilian Leschanowsky_ of _SIGMATEK GmbH & Co KG_
### Added
* sigSetForceUpdateForProperty(property)
* sigShouldPropertyUpdate(property, originalResult, value, old)
* _shouldPropertyChange(property, value, old) 

## [01.01.005] - 2021-05-05
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Renamed
Renamed the following methods:
* _addRequiredProperty --> sigAddRequiredProperty
* _onRequiredPropertiesReady --> sigOnRequiredPropertiesReady 
* _onPropertyStateChange --> sigOnPropertyStateChange
* _designerOnAppliedCSSValue --> designerOnAppliedCSSValue
* _designerOnControlUpdate --> designerOnControlUpdate
* _designerGenerateStylePreview – >designerGenerateStylePreview
* _designerOnResize --> Use designerOnBoundsChanged() changed instead.

Backwards compatibility is still ensured, but expect a warning when using the old methods directly.

### Added
- Added the designerOnBoundsChanged() callback.

## [01.01.004] - 2021-05-05
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Added
- BrowserDetectionMixin
- ShadowDomStylingMixin

## [01.01.003] - 2021-04-12
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Changed
- Replaced native setTimeout() with the wrapper sigSetTimeout() to prevent memory leaks in drag-and-drop-support-mixin.
## [01.01.002] - 2021-04-08
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- utils-mixin with wrapper functions for the SigUtils API.

## [01.01.001] - 2021-03-30
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- deduped all available mixins.
- classes which mix at least base-mixin have now a property getter "mixins". It returns a object with a state property for each applied mixin.
- moved all functions and properties needed to extend polymerElement out of base-mixin to polymer-element-mixin. 

### Added
- polymer-element-mixin
- gestures-support-mixin

## [01.01.000] - 2021-03-18
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- renamed sig-element-drag-drop-support-mixin to drag-drop-support-mixin.
- moved d&d mixin to /sig-element-mixins/.
- Moved all drag and drop properties and functions in sig-element to drag and drop support mixin.
    - Moved properties: dragonlongpress, longpressdelay, isdraggable, isdroppable, isdragged, isdragmode
    - static observer calling _initDragDrop()
    - _publishRuntimeEvent()
    - Parts of connectedCallback() and _onRequiredPropertiesReady() callback
### Added
- initial release of sig-element-mixins
