# Lasal Visual Designer TypeScript Development

## Requirements

*  NodeJS Version 16.x

## Installation
To setup the node project execute the following steps:

* Change your working directory to: `<LVD-Project-Root>/Runtime/TypeScript`
* Run `npm install`

This will install the TypeScript compiler and its dependencies.

## Available NPM scripts

This Node project provides the following scripts:

* `npm run build`
   - Builds the project with debug information.
   - uses tsconfig.local or tsconfig.local.json.
* `npm run watch`
   - Builds the project with debug information.
   - uses tsconfig.local or tsconfig.local.json.
   - watches the TypeScript [Source Folders](#source-folders)

> Note: You need to run these scripts while you reside within the TypeScript Project folder located at `<LVD-Project-Root>/Runtime/TypeScript`

## Source Folders
Currently, there are two locations to place your TypeScript source files:

Place **Codemodules** in: <br>
`<LVD-Project-Root>/CodeModules`

Place **Components** in:<br>
`<LVD-Project-Root>/Runtime/DesignerRuntime/res/components/user`

> NOTE: Only files with the .ts extension in those folders and their sub-folders are compiled and watched by the TypeScript compiler.

## Custom TypeScript configurations
* Do not modify the default TypeScript configuration file `tsconfig.json` bundled with the project.
* You may have your custom local TypeScript configuration.
* Each NPM task checks whether a local configuration exists and prefers to use it.

### Location and naming
* Place your custom config in the project root folder.
* Name it like the task's default configuration, but with the extension `.local.json`.

**Example Structure**
```
-TypeScript
    |- tsconfig.json (default configuration)
    |- tsconfig.local.json (local override of tsconfig.json in the project root folder)
  ```

### Configuration Options

See all the available configuration options at the [TSConfig Reference Website](https://www.typescriptlang.org/tsconfig)

**Example**

In this example, the custom local configuration `tsconfig.local.json` extends the existing default `tsconfig.json` in the project root folder to output extended diagnostics information.

```json
{
  // This extends the default configuration
  "extends": "./tsconfig",
  "compilerOptions": {
    "extendedDiagnostics": true
  }
}
```

## Include Type Definitions

### Codemodules
Since Codemodules reside outside the TypeScript project folder you need to reference the TypeScript definitions of the libraries you want to use to get syntax checking and code auto-completion. 

To do so, insert a `<reference />` tag at the top of your codemodule.  

**Example**

```typeScript
// @ts-ignore
/// <reference path="../Runtime/TypeScript/types/sig-api.d.ts" />

window.sigApi.debug.setLogLevel(window.sigApi.debug.DEBUG);
```
The Type Definitions files are located at:<br>
`<LVD-Project-Root>/Runtime/TypeScript/types`

Currently, you may include the following typings:

* **Sigmatek API:** => sig-api.d.ts
* **jsPanel4** =>jspanel4.d.ts (mocked as `T<any>`)
* **jQuery** => jquery.d.ts (includes the jquery-mask-plugin)
* **loadJs** => loadjs.d.ts
* **c3** => c3.d.ts
* **d3** => d3.d.ts (including all plugins)
* **agGrid Community** => ag-grid.d.ts
* **Bowser** => bowser.d.ts

### Components
Simply import one of the Sigmatek Base Elements, Mixins or components to auto import the relevant typings.

### Namespaces
After referencing or importing the needed Typings you can access the type information via two top-level namespaces:

* **SigApi** => Sigmatek API namespace.
* **SigUtils** => SigUtils Namespace encapsulates all Utility libraries namespaces. 
  * .JsPanel
  * .JQuery
  * .Loadjs
  * .C3
  * .D3
  * .AgGrid
  * .Bowser

> Note: Namespace names are case sensitive.

### Properties
The global properties of the Sigmatek API and all the Utility libraries can be accessed via the Window Interface using the following property names:

* window.sigApi.*
* window.jsPanel.*
* window.jQuery.*
* window.loadjs.*
* window.c3.*
* window.d3.*
* window.agGrid.*
* window.bowser.*

> Note: Property names are case-sensitive. The `window.` prefix is mandatory.

## Additional Information
You can find more information about the Typescript integration in the Chapter "**Component Development > TypeScript Development**" of the LVD documentation.
