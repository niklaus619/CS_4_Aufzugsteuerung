# Changelog for sig-control-menu

## [01.02.002] - 2024-09-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The menu no longer opens behind a window, if the Menu Input resides in the Shadow Dom of a other component, which is placed in a window.

## [01.02.001] - 2023-09-29
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Added `flex-shrink:0;` to .item-icon and .item-arrow class, to keep the size of the icons intact.

## [01.02.000] - 2023-07-20
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added LVD properties view tab assignment for all properties.

## [01.01.006] - 2022-06-09
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The menu closes now correctly on touch devices. 

## [01.01.005] - 2021-12-10
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Fixed
- When rendering the menu, the selected item can be marked as selected and scrolled to if necessary.
- Added styling of active submenu items.

## [01.01.004] - 2021-01-27
by _Jürgen Haring_ of _SIGMATEK GmbH & Co KG_

### Added
- property 'Double tap to select' to enable/disable the necessity to double tap in order to select an item

### Changed 
- when rendering the menu the selected item is shown as selected and scrolled to if necessary

## [01.01.003] - 2020-09-21
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- The menu API cancel() call in the component is now called only when the menu API submit() call was resolved (or rejected).  

## [01.01.002] - 2020-09-14
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added a css property for setting icon height in menu item.

## [01.01.001] - 2020-09-03
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Refactored and cleaned up the _positionMainMenu() method.

## [01.01.000] - 2020-06-01
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Initial Release