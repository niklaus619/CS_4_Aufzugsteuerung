# Changelog for sig-control-input

## [02.00.000] - 2024-02-08
by _Stefanie Hager_ and _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Changed
- Replace JavaScript with TypeScript
- Improved description of "Update on same value" property

## [01.04.001] - 2024-01-18
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added a property to activate writing of the data point, configured at the value property, even if the value doesn't change.

## [01.04.000] - 2023-06-07
by _Marcus Fiala_ and _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added LVD properties view tab assignment for all properties.

### Changed
- Showing the selected unit directly in the designer instead of the placeholder
- The border width in group general styling can now be set as shorthand property.
- Changed shortNames, descriptions and order of properties and groups.
- Removed property dragged opacity.
- Removed led functionality.
- Changed default preview text from text to -- Input --

## [01.03.001] - 2023-01-02
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Changed
- Changed displaying of preview text so it is only shown in default styling again.

## [01.03.000] - 2022-12-01
by _Mario Schmid_ and _Christoph Obernosterer_ of _SIGMATEK GmbH & Co KG_

### Info
- Attention default of property for aligning text vertical is center. Updating component may result in slightly different presentation of instances.

### Added
- Added a property for aligning the text in vertical direction
- Added design project link

### Changed
- Cleaned up code and styling
- Changed geasture to tap, otherwise scrolling content with input will lead to open the keyboard
- Removed unnecessary code
- Removed disabled property as disabling input should be dony by state
- Simulated values for ipv4 and hex are shown in the designer
- In designer no text was shown

## [01.02.008] - 2022-06-03
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added IPv4 to the format options.
- Added properties type, ignoremax, ignoremin, limitlow and limithigh as polymer property

## [01.02.007] - 2021-11-30
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- added the unit conversion mixin

### Changed
- date/time format is now shown correctly in design mode

## [01.02.006] - 2021-05-10
by _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed
- space division between unit and content can be set
- if no datapoint was given, the opened keyboard whould show \[unit\] as  the unit, instead of an empty string. Now the empty string is shown. 

## [01.02.005] - 2021-03-23
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Changed
- performance improvement

## [01.02.004] - 2021-01-20
by _Jürgen Haring_ of _SIGMATEK GmbH & Co KG_

### Added
- property 'Align vertical' for Unit

### Changed
- removed an unnecessary default box shadow

## [01.02.003] - 2020-12-09
by _Oliver Tomondy_ and _Jürgen Haring_ of _SIGMATEK GmbH & Co KG_

### Changed
- Optimized code for performance.
- Refactored code for new keyboard implementation.
- adjusted properties to match new property standard (sortIndex, userLevels)

## [01.02.002] - 2020-10-05
by _Marcus Fiala_ of _SIGMATEK GmbH & Co KG_

### Changed
- valueSourceType of property accessNumber

## [01.02.001] - 2020-06-18
by _Mariella Galneder_ of _SIGMATEK GmbH & Co KG_

### Added
- placementTemplate 

### Changed
- German descriptions translated 
- default styling

## [01.02.001] - 2020-06-04
by _Vesna Vojinovic_ of _SIGMATEK GmbH & Co KG_

### Fixed
- fix for iOS: _!important_ added to _padding_ and/or _margin_ properties in selectors which have lower specificity than _:host *_

## [01.02.000] - 2019-09-20
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to default styling

## [01.01.001] - 2019-07-19
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to polymer 3

## [01.01.000] - 2019-03-01
by _Thomas Kroh_ of _SIGMATEK GmbH & Co KG_

### Added
- inital release