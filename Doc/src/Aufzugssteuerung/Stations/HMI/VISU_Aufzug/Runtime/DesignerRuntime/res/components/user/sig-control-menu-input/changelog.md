# Changelog for sig-control-menu-input

## [03.00.002] - 2024-09-18
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- Added property callbackFctShow to be able to define a function which is called if the menu should be shown (needed in superior controls)

## [03.00.001] - 2024-04-04
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Bugfix
- Corrected ts compiler error in computed method

## [03.00.000] - 2024-02-14
by _Stefanie Hager_ of _SIGMATEK GmbH & Co KG_

### Changed
- Replaced JavaScript with TypeScript.

## [02.00.000] - 2023-06-26
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Incompatible changes
- If a different image than the default for the dropdown symbol should be used, it previously needed to be done with a style class of the sig-control-image component.
  Due to performance and usability reasons, this was changed to be directly handled via an image tag. Therefore the Symbol image styling properties were removed.
  The images can now be set directly at the corresponding properties in group Symbol styling. If the component is updated the symbol images need to be configured at
  those properties or at the default styling of the menu input control to work for all instances. This only needs to be done if a different symbol than the default should be used.

- The caret image has previously been an unicode sign. A size property was used to define the font size for it. Now the default image is set as an svg. The size property 
  is not needed anymore and was therefore removed. The size of the symbol can now be defined via the width property of the Symbol styling group as the aspect ratio is kept.
  After updating the component it should be checked if the size of the symbol is still displayed as required. If not the width property or the size of the image source can
  be changed so the symbol is displayed properly again.

- Coloring the caret symbol was removed as it isn't displayed as an unicode sign anymore. If the color of the symbol needs to be changed it now has to be done directly at 
  the image source.

- Replaced the Text indent property with a Text padding shorthand property to fine position the text in all directions independent of the alignment. Check the alignment of 
  the text after updating and reconfigure the text padding if needed. To avoid setting the properties at all instances you can configure them in the default styling to work
  for all.

### Added
- Added vertical text align property
- Added LVD properties view tab assignment for all properties.
- Added property to set a preview text to be shown in the designer

### Changed
- Removed led
- Removed background image
- Removed dragged opacity and scale menu property
- The border width can now also be set as shorthand property
- Default images are now used for the caret
- Offset x and Offset y properties are now configured as Strings with unit px

## [01.02.002] - 2023-04-17
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Changed
- Calling _UpdateValue only once at start
- Removed updating of actual selection on language change as it is already done by the observer of the menu item

## [01.02.001] - 2022-12-16
by _Christoph Obernosterer_ of _SIGMATEK GmbH & Co KG_

### Changed
- If the text of the menu element is depending on a data point, the text is not updated when changed.
- Removed not necessary logmessage
- Added comments

## [01.02.000] - 2022-10-25
by _Mario Schmid_ of _SIGMATEK GmbH & Co KG_

### Added
- Added design project link

### Changed
- renamed the css property for the max-width of the caret image to --theme-sig-control-menu-input-caretdown-width as there was a copy paste bug
  therefore setting the image width should now work

## [01.01.003] - 2021-06-08
by _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed
- changed function addRequiredProperty to sigAddRequiredProperty
- renamed callback _onRequiredPropertiesReady to sigOnRequiredPropertiesReady
- if a placeholder is uses for the selected value, the the displayed text updates if the placeholder changes

## [01.01.002] - 2021-03-23
by _Jürgen Haring_ and _Fabian Frauscher_ of _SIGMATEK GmbH & Co KG_

### Changed
- standardized image 'strechmode' property
- Added a new placement template 'place-menu-default'.

## [01.01.001] - 2020-09-14
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added item icon to the menu-input.
- Added properties for styling the item icon.

## [01.01.000] - 2020-06-01
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Initial release