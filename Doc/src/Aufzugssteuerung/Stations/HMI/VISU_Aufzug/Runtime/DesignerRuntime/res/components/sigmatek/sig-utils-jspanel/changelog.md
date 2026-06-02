# Changelog for sig-utils-jspanel

## [01.02.017] - 2024-12-17
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Fixed wrong height of a window without animations apllied, after it was samlified/unsmalified.

## [01.02.016] - 2024-11-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Fixed wrong top/left/height/width if animation animates one of these properties.

## [01.02.015] - 2023-10-19
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- Added TypeScript definitions.

## [01.02.014] - 2022-12-13
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Updated jsPanel to 4.16.1
- Closing animation of the window backdrop is now simultaneous with the closing animation of the panel.
- When prerender=TRUE, the animation of window backdrop is not visible after app reload.

## [01.02.013] - 2022-09-20
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added property header height behavior property.
- Changed style display of jsPanel-content to flex in the hideonclose extension to prevent unwanted behavior with panel height.
## [01.02.012] - 2022-08-31
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Updated jsPanel version to 4.16
- Patched jsPanel version in app/patches/jspanel4 to prevent double binding of mousemove event handler. This solves bugs related to zoom gesture on title bar (should be fixed by jsPanel developer some time)
- Disabled pointer events in jspanel.sigelement.js because they are still not working propertly on iPad and iPhone devices
- Fixed wrong styling of a minimized header bar caused by jspanel.css refactoring by the jspanel developer. (should be fixed by jsPanel developer some time)

## [01.02.011] - 2021-11-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
* In the design mode the Window Title Text is now truncated,
  if it gets larger than the window width.
## [01.02.010] - 2021-07-07
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Changed
* Updated jsPanel to v4.12.0.
* Replaced temporary closeOnEscape handling with standard callback.

## [01.02.009] - 2021-07-02
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Windows now get their z-index based on the layer (slot) they are rendered in.
- jsPanel.getPanels() method was overridden to fix the closeOnEscape bug caused by hideOnClose plugin.

## [01.02.008] - 2021-06-30
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Changed the way z-index of modal panels is assigned, now z-index is not incrementing unnecessarily anymore.

## [01.02.007] - 2021-06-28
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Fixed stacking order of windows with hideonclose=true so that an opened window is always shown in front.

## [01.02.006] - 2021-06-25
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Added styling of separator border between header and content of the panel.

## [01.02.005] - 2021-06-17
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added title margin horizontal styling property.

## [01.02.004] - 2021-04-15
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- Updated paths

## [01.02.003] - 2021-02-08
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- header separator is no longer shown, if window header title is set to invisible.

## [01.02.002] - 2021-01-18
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Added cross origin attribute to links and scripts appended by loadjs library.

## [01.02.001] - 2020-08-03
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Updated jsPanel version to 4.10.2
- Fixed modal windows not being closed, as close() method is in the new version not global anymore.
- Changed the way backdrops are removed. 
  Instead of listening to jspanelclosed event, onclosed callback is used.

## [01.02.000] - 2019-09-20
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to default styling

## [01.01.001] - 2019-07-24
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to polymer 3

## [01.01.000] - 2019-03-12
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added
- inital release