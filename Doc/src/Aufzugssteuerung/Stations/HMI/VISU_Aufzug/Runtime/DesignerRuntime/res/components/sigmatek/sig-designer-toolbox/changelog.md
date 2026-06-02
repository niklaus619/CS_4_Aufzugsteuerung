# Changelog for sig-designer-toolbox

## [01.02.006] - 2024-12-12
by _Alexander KNett_ of _SIGMATEK GmbH & Co KG_

### Changed
- If a leave nodes has draggable=false it is now rendered with opacity.

## [01.02.005] - 2023-01-03
by _Alexander KNett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- If the event.path property is missing, event.composedPath() is used as a fallback.

## [01.02.004] - 2022-01-18
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Added missing break statement.

## [01.02.003] - 2021-12-01
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Only render the tree if the there are any items to render. This is a workaround for a LVD bug: it sends buildToolboxCommand twice, first time without any items.

## [01.02.002] - 2021-05-20
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added readyToolboxEvent to inform the designer when the toolbox is ready to receive data.
### Removed
- Removed obsolete commented code.

## [01.02.001] - 2021-02-24
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Added
- tree view based on jsTree
### Removed
- table view
- plain view

## [01.02.000] - 2019-09-20
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to default styling

## [01.01.001] - 2019-07-19
by _RSC_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to polymer 3

## [01.01.000] - 2019-03-11
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added
- inital release