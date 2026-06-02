# Changelog for sig-keyboard

## [01.04.021] - 2025-06-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Fixed return value of _getDesignmodeData().

## [01.04.020] - 2025-05-19
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- Optimized the CSS Definitions of the #phrasemarker DIV to avoid antialiasing artifacts, while the inputfield is marked as invalid.
- Make sure to finish the phrase if the keyboard is placed on the dashboard and gets opened via a sig-control-input version >= 2.x and a language switch occurs while the phrase is active.

## [01.04.019] - 2025-05-15
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Added a fix to prevent antialiasing artifacts while the phrase is active but has no content.
- Removed double background attribute in #phrasemarker .value

## [01.04.018] - 2025-05-12
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- Optimized handling of input via the physical keyboard on HMI Devices.

## [01.04.017] - 2025-04-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added
- Propper handling of phrases without the need of a separator.
- Support of the physical keyboard for phrases and suggestion.
- Support for suggestions which do not finish the active phrase.

### Fixed
- Added missing Dakuten replacements in ja-ime layout.
- Minor Bugfixes

### Changed
- Changed the long vowel symbol to \u30FC in ja-ime layout.

## [01.04.016] - 2025-04-02
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The IME toggle key now shows it's state correctly.

## [01.04.015] - 2025-03-26
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The suggestions are no longer updated while the key repeat is active.
- The disabled opacity of the suggestions bar is no longer applied to it's children.
- After stop moving the suggestions bar, the dragged suggestion is no longer accidentally inserted. 

## [01.04.014] - 2025-03-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The caret stays in view while the user navigates using the virtual cursor keys.
- The keys {shift}, {alt}, {more}, {replace}, {imetoggle} and {switchlayer} no longer clear the value while activating the input field.
- The caret is now correctly positioned at the end of the value, if input field has an overflow.

## [01.04.013] - 2025-03-20
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The keyboard no longer throws an exceptions, if the runtime does not support IME extensions.
- The width of the suggestion bar is now calculated correct if a border width is set.
- If the keyboard is placed on a dashboard the suggestions bar stays active when switching languages and the IME Extension is active.
- The suggestions are cleared/updated if the keyboard input gets toggled between type password and text. 
- The suggestions are no longer updated while the input is not active.
- The last suggestion can now be scrolled into view until it is fully visible.
- The suggestion hover state is now reapplied in design mode, after changing the suggestions page size.

## [01.04.012] - 2025-03-19
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The backspace key icon of the ja-ime layout is now displayed correctly in Chrome 80 on the HMI.

## [01.04.011] - 2025-03-17
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- The last character is no longer truncated if the keybaord value is larger then the width of the input field.

### Changed
- Rearranged the keys of the ALT layer of the ja-ime layout.

## [01.04.010] - 2025-03-17
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Added missing small version mappings for あ, い, う, え, お in ja-ime layout.

## [01.04.009] - 2025-03-14
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed 
- Updated the ja-ime layout:
  - Added {bksp} and {clear} buttons with custom text.
  - Rearranged the layout of the keys on normal and alt layers.
  - Updated the text of the {switchlayer} buttons.
- Added new CSS class "symbolregular" to the keyboard.

## [01.04.008] - 2025-03-12
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

## Added
- New option how the size of a suggestion item is adjusted. If set to 'Fill' (default), each item is sized to equally fill the available space of the suggestions bar. In the case of the value 'Content', each item is adjusted to the size of the suggestion text.
- New preview settings to show the suggestions navigation hover state and scrollbar in design mode.

### Changed 
- The defaut suggestions page size has been adjusted from 10 to 5.

## [01.04.007] - 2025-03-05
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed 
- Better handling of rejects in _updateSuggestions().
- The active phrase can now be replaced, if the caret position is within the phrase.
- The hover state of the suggestion bar elements is now applied only on non touch devices.

### Fixed
- The suggestions bar no longer appears on alphanumeric keyboards if 'previewalwaysshowsuggestions' has been set to 'always'.
- A key font size larger than 20px no longer disrupts the grid layout.
- The characters of the {replace} key of the ja-ime layout now renders correctly on HMI devices.
- Fixed wrong caret position, after a suggestion has been inserted.
- Minor bugfixes.

## [01.04.006] - 2024-02-28
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Changed
- The suggestions are now fetched asynchron from the IME Extension.

## [01.04.005] - 2024-02-28
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- Implemented default styling for suggestions and grid.
- Implemented getImeExtension* API functions in DRT.

### Changed
- Refactored template styles.
- The grid gap can now be overridden by the default styling.
- Added config defaults to the Grid renderer.
- Split "gap" property into "rowGap" and "colGap".
- Added property "style" to the grid config.
- Added missing jsDoc for new properties.

## Fixed
- Fixed exeption in LVD ressource preview when the user clicked on the preview of the keyboard.
- The Track gesture is no longer handled if the suggestions bar has no overflow.
- The grid renderer now ignores the margins settings of a key.

## [01.04.004] - 2024-02-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- Implemented suggestions bar.
- The {imetoggle} button now toggles the input of suggestions.

### Changed
- Removed obsolete ALT & More layers from zh-ime.json.
- Moved fallback layout to /render/fallback.js

### Fixed
- Addes mising space bar to the normal layout of ja-ime.json.

## [01.04.003] - 2024-02-18
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added
- Implemented replacement function for the {replace} special key.
- Added new function replaceMapping() to the IME Extension base class.
- Added mapping config for the replacement key in ja-ime.json

### Fixed
- The generated Grid-Styles are no longer overwritten by the last opened keyboard.
- The generated CSS selectors are now unique for each keyboard type and language.

## [01.04.002] - 2024-02-13
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- Added base, block and grid renderer.
- Moved key definitions to an external file.
- Basic implementation of key bindings (POC).
- Extended styles to support multiple render layout formats.
- New private polymer properties "layoutDisplay" and "keyBindings".
- New special keys {replace}, {empty}, {imetoggle} and {switchlayer}.

### Changed
- Finalized layout map format of ja-ime.json amd zh-ime.json

## [01.04.001] - 2025-02-10
by _Rainer Brodinger_ of _SIGMATEK GmbH & Co KG_

### Added
- Added parmaeter imeExtension to function show.

## [01.04.000] - 2024-12-10
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added
- Added sig-ime-extension base class dependency.

### Fixed
- Fixed all linter errors.

### Changed
- Removed all legacy properties from the component json file.
- Removed obsolete import of sig-control-input.

## [01.03.000] - 2023-07-20
by _Andreas Ramböck_ of _SIGMATEK GmbH & Co KG_

### Added
- Added LVD properties view tab assignment for all properties.

## [01.02.019] - 2022-08-17
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
## Changed
- The component now uses asynchronous text API functions.

## Added
- Added text lists to components.

## [01.02.018] - 2022-07-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Fixed
- The input active text color is now inherited and applied.

## [01.02.017] - 2022-06-08
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Fixed
- Force preventDefault for touchend events to fix the input lag on Apple mobile devices.

## [01.02.016] - 2022-01-25
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Changed
- Added property "blindinput" to disable the keypressed state on password input fields.

## [01.02.015] - 2021-12-13
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Added a check whether this.context exists in 'jspaneldragstart' and 'jspaneldragstop' event listeners of keyboard.

## [01.02.014] - 2021-12-03
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Changed
- Input format validation is only performed when the keyboard API method validateInputFormat() is available.

## [01.02.013] - 2021-10-29
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Fixed
- Allow leading zeros in numeric input RegEx validation.

## [01.02.012] - 2021-10-07
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Fixed
- Numeric keyboard does not accept non-numeric characters from the physical keyboard anymore.

## [01.02.011] - 2021-09-13
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_
### Added
- Check input format (number of decimals) using the validateInputFormat() method of Keyboard API.

## [01.02.010] - 2021-08-31
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_
### Added
- css min-height property to the inputholder div.
- css properties to style the padding around the value and unit text.
### Changed
- converted inputholder div from grid to flexbox.
- removed unused styles.
### Fixed
- the value no longer slides under the unit text if present.
- the applied main font size no longer affects the height of the row div.

## [01.02.009] - 2021-07-27
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- input value sanitization is now optional and is per default false to preserve the old behavior.

## [01.02.008] - 2021-06-21
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- replaced replaceAll() function with replace() and a global regex expression because replaceAll() is only available in Chrome version 85 and higher.
- changed unicode characters so that they are also visible in Gecko

## [01.02.007] - 2021-06-14
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Added
- Added support for inserting allowed html tags in the keyboard input.
- Currently, only a new line tag < br/ > is allowed.

## [01.02.006] - 2021-05-03
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Fixed
- Fixed buggy animation of keyboard window by delaying the input.focus() which caused the bug.
- See more here: https://stackoverflow.com/questions/24742930/using-css-animations-on-element-containing-a-focused-input-box
## [01.02.005] - 2021-04-12
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Replaced native setTimeout() with the wrapper sigSetTimeout() to prevent memory leaks.

## [01.02.004] - 2021-03-30
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Hex values sent by Runtime have the constant prefix 0x. This prefix caused jMask to not work correctly. Therefore, the prefix was removed.
- Removed placeholder for hex format, as it not needed.
## [01.02.003] - 2020-10-1
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Added new JSON properties layout, layout scheme and cache layout. 
  The user is now able to set their own keyboard layout and layout schemes.   
  Using the property cache layout, it is possible to cache the layouts so that they are only loaded once.
- Removed switching layouts on language change event. Layout scheme is to be used instead.
- Changed the structure of layout files, see documentation.
- Added config object to the layout files, containing regex validation rules.
- Cleaned up and removed obsolete code. 
- Added jsDoc comments.

## [01.02.002] - 2020-09-18
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Fixed
- under iOS 13 the first double click on the shift key does not lock it. 

## [01.02.001] - 2020-06-05
by _Vesna Vojinovic_ of _SIGMATEK GmbH & Co KG_

### Changed
- the function _connectedCallback()_; added event Listeners for 'jspaneldragstart' and 'jspaneldragstop' to save the caret position while dragging the window.

### Deprecated
- Virtual caret feature is deactivated and will be removed with the next version of the keyboard component.

### Fixed
- fix for iOS: vertical alignment of asterisks when input type is password 
- saved caret position on keyboard dragging  
- fix for Mobile Devices: horizontal position and vertical alignment of caret; virtual caret is deactivated  
- maxcallstack error by cleaning up after closed datetime keyboard (infinite loop)
- exception from the jsMask Plugin on setting date/time  

## [01.02.000] - 2019-09-20
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to default styling

## [01.01.001] - 2019-07-19
by _Oliver Tomondy_ of _SIGMATEK GmbH & Co KG_

### Changed
- Converted element to polymer 3

## [01.01.000] - 2019-03-22
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- initial release