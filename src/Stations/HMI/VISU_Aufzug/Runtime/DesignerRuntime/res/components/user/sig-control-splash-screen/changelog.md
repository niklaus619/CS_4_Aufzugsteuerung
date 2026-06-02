# Changelog for sig-control-splash-screen

## [01.03.003] - 2025-05-22
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- Exported "CSS Animation duration" property in component JSON.

### Fixed 
- Fixed all linter errors.

## [01.03.002] - 2025-03-03
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed 
- Reverted last change in _toggleAnimationName(), so the animation can be disabled again.

## [01.03.001] - 2024-03-05
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The Splash Screen now shows and hides correctly if the component is placed on an dashboard.
- The _toggleAnimationName() method now applies 'none', if the newvalue value of the property animationname is not a string.
- The Resize Handler is only bound, if the component is not placed within the app.

## [01.03.000] - 2023-07-20
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added LVD properties view tab assignment for all properties.

## [01.02.003] - 2022-07-20
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- disabled the browser context menu.

## [01.02.002] - 2021-05-12
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- set temporarily toolbox=true in components json.

## [01.02.001] - 2021-04-06
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- define this.utilsAPI in sigApiReadyEvent event.
- changed sigAddEventListener() to window.addEventListener() on resize and SigApiReady events, as the sigUtils API is not yet ready.

### Changed
- Converted element to default styling

## [01.02.000] - 2019-03-09
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to default styling

## [01.01.001] - 2020-02-27
by _Vesna Vojinovic_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to polymer 3

## [01.01.000] - 2017-07-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added
- initial release