# Changelog for sig-ime-extension

## [01.00.002] - 2025-03-05
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- Minor bugfixes.

## [01.00.001] - 2025-02-28
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- Added replaceMapping() function. 

### Changed 
- getSuggestions() now returns a promise which resolves suggestions based on the language.
- The options object passed to getSuggestions() now includes a "abortSignal" property.

## [01.00.000] - 2024-12-12
by _Alexander Knett_ of _SIGMATEK GmbH & Co KG_

### Added 
- initial release