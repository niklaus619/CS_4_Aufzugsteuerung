# Changelog for sig-control-state-led
## [03.00.000] - 2024-01-31
by _Stefanie_ Hager_ of _SIGMATEK GmbH & Co. KG_

### Changed
- Replaced JavaScript with TypeScript

## [02.02.000] - 2023-06-13
by _Marcus Fiala_ and _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Preview property for the designer.
- CSS definition to the default styling, for use of the component in shadowDOM.
- Added LVD properties view tab assignment for all properties.

### Changed
- Index and description of properties.
- Changed default border width from 3px to 1px.
- The border width can now also be set as shorthand property.
- Image for the active state is now inherited from the normal image, if not defined.
- Removed repeat property for background image
- Change default stretch mode from cover to contain

### Bugfix
- Fixed that the uninitialized led state could have lead to a wrong representation (active instead of inactive)

## [02.01.000] - 2022-10-25
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- Added design project link

## [02.00.005] - 2021-12-03
by _Marcus Fiala_ of _SIGMATEK GmbH & Co KG_

### Changed
- Changed function calls like addEventListener, setTimeout and setInterval to ones with sig-prefix to avoid memory leaks.

## [02.00.004] - 2021-01-19
by _Jürgen Haring_ of _SIGMATEK GmbH & Co KG_

### Changed
- standardized image 'strechmode' property

## [02.00.003] - 2020-12-01
by _Jürgen Haring_ of _SIGMATEK GmbH & Co KG_

### Changed
- adjusted properties to match new property standard (sortIndex, userLevels)

## [02.00.002] - 2020-05-19
by _Mariella Galneder_ of _SIGMATEK GmbH & Co KG_

### Changed
- shortNames and group of all properties are now in english
- adjusted placementTemplate text
- changed Min. and Max.
- group Data source is now called Data
- default styling
- default colors

## [02.00.001] - 2020-03-11
by _Zeilberger Philipp_ of _SIGMATEK GmbH & Co. KG_

### Added
- the possibility to use the default styling.

## [02.00.000]
by _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed
- Switch to Poylmer 3
- Design Standard Template

## [01.00.000] - 2019-06-14
by _Dieter Spritzendorfer_ of _SIGMATEK GmbH & Co KG_

### Added
- inital release