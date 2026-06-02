# Changelog for sig-control-button

## [02.01.001] - 2025-04-16
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Bugfix
- Texts are not shown if button was implemented within other component. Setting button texts in ready callback now.

## [02.01.000] - 2025-03-18
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added properties to ignore the OFF or ON value when a datapoint is selected.
- Added the possibility to show multiline texts by adding \<br> in the text where the line break should occur

## [02.00.000] - 2024-02-5
by _Stefanie Hager_ of _SIGMATEK GmbH & Co KG_

### Changed
- Replace JavaScript with TypeScript 

## [01.04.000] - 2023-06-23
by _Andreas Ramböck_ and _Marcus Fiala_ and _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- Added preview and preview led to see all possible states in the designer
- Added properties to set the width and the height of the led
- Added diagonal gradient options to the active background and border gradient direction properties
- Added LVD properties view tab assignment for all properties.

### Changed
- The border width can now also be set as shorthand property
- Renamed and reorganized properties and categories
- Removed dragged opacity
- Removed the property to stop auto repeat on route change. Auto repeat is now always stopped on route change.
- Removed datapoint scheme option for ON and OFF value
- Removed on state changed event
- Removed the repeat property of the background image
- Removed the property inherit image from normal state. It is now inherited by default if no active state image is selected.
- Removed writing of value on up-gesture in case of toggle button as it lead to multiple writing of datapoint

### Bugfix
- If a datapoint was used as OFF and/or ON value, the button was not updated accordingly if the datapoint changed

## [01.03.001] - 2023-04-12
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Changed
- Removed carriage returns and white-spaces at binding of texts to avoid white spaces in output
- The polymer property showundefinedason had a different default value than specified in the json

## [01.03.000] - 2022-10-06
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- Added a functionblock property for tap event
- Added design project link

### Changed
- Changed handling of autorepeat so datapoint gets written in the interval too
- Changed setting the interval to down event
- Removed unnecessary code and logs

## [01.02.010] - 2022-06-14
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- Added the possibility to use the color gradient diagonal.

## [01.02.009] - 2021-12-03
by _Marcus Fiala_ of _SIGMATEK GmbH & Co KG_

### Changed
- Changed function calls like addEventListener, setTimeout and setInterval to ones with sig-prefix to avoid memory leaks.

## [01.02.008] - 2021-09-01
by _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed 
- add a property to set a delay until the autorepeat starts.

## [01.02.007] - 2021-06-08
by _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed
- fix a bug where the button could stay in the pressed state after it was released.

## [01.02.006] - 2021-05-10
by _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed
- fixed transparent space between border and content.

## [01.02.005] - 2021-03-15
by _Jürgen Haring_ and _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Added
- property 'Show undefined as ON/OFF' and its function
- remove obsolete code, that caused a mouse up event on some displays

### Changed
- standardized image 'strechmode' property

## [01.02.004] - 2020-11-16
by _Oliver Tomondy_ and _Jürgen Haring_ of _SIGMATEK GmbH & Co KG_

### Added
- Optimized code for performance
- adjusted properties to match new property standard (sortIndex, userLevels)

## [01.02.003] - 2020-10-05
by _Marcus Fiala_ of _SIGMATEK GmbH & Co KG_

### Added
- property valueset and valuereset

## [01.02.002] - 2020-10-05
by _Marcus Fiala_ of _SIGMATEK GmbH & Co KG_

### Changed
- valueSourceType of property accessNumber

## [01.02.001] - 2020-17-06
by _Mariella Galneder_ of _SIGMATEK GmbH & Co KG_

### Changed
- Default settings from the Led adapted from Enum
- Default styling of Border shadow (so a change is visible with only one click)
- German descriptions translated 
- default styling
- default colors

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

## [01.01.000] - 2019-03-05
by _Thomas Kroh_ of _SIGMATEK GmbH & Co KG_

### Added
- Initial release