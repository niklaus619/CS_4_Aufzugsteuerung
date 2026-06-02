import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import '../../sigmatek/sig-utils-jquery/sig-utils-jquery.js';
import '../../sigmatek/sig-utils-jquery-mask/sig-utils-jquery-mask.js';
import { RenderBlock } from './render/block.js';
import { RenderGrid } from './render/grid.js';
import { fallbackLayout } from './render/fallback.js';
import * as keys from './render/keys.js';

const KEYPRESS_VIRTUAL = 'virtual';
const KEYPRESS_PHYSICAL = 'physical';
const KEYPRESS_PHYSICAL_IME = 'physical_ime';
const BREAK_CHAR = '<br/>';
const TAB_CHAR = '    ';
const PHRASE_END_CHARS = [keys.SPACE, BREAK_CHAR, TAB_CHAR];

export class LasalRuntimeSigKeyboard extends LasalRuntimeSigElement {

    static get is() {
        return 'sig-keyboard';
    }

    static get importMeta() {
        return import.meta;
    }

    static get observers() {
        return [
            '_updatePhraseMarker(phraseStart, phraseEnd, keyboardvalue)'
        ];
    }

    get hasImeSupport() {
        if (this.keyboardtype !== 'alpha') return false;
        return (this._getImeExtension() === null) ? false : true;
    }

    get hasSuggestions() {
        return (this.suggestions.length > 0) ? true : false;
    }

    get hasActiveSuggestion() {
        return (this._getActiveSuggestionsBtn() instanceof HTMLElement) ? true : false;
    }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                
                --layout-display-layer: block;
                --layout-display-row: block;
                --layout-display-key: inline-block;
                --layout-display-label: inline-block;

                
                --keyshell-padding-horizontal: 7px;
                --keyshell-padding-vertical: 0px;
                --layers-marging-bottom: 7px;
                --input-margin-top: 12px;
                --input-margin-bottom: 8px;
                
                

                
                --sb-height: 44px;
                --sb-background-color: rgba(47, 47, 47, 1);
                --sb-border-color: rgba(255, 255, 255, 0);
                --sb-border-style: none;
                --sb-border-width: 0px;
                --sb-border-radius: 0px;
                --sb-margin-bottom: 7px;
                --sb-opacity-disabled: 0.8;
                --sb-layer-marging-bottom: 7px;

                
                --sb-scrollbar-background-color: rgba(174, 200, 26, 1);
                --sb-scrollbar-height: 3px;    
     
                
                --sb-suggestion-color: rgba(160, 160, 160, 1);
                --sb-suggestion-background-color: rgba(64, 66, 71, 1);
                --sb-suggestion-border-color: rgba(95, 95, 100, 1);
                --sb-suggestion-border-width: 1px;
                --sb-suggestion-border-style: solid;
                --sb-suggestion-border-radius: 4px;
                --sb-suggestion-margin-horizontal: 8px;
                --sb-suggestion-margin-vertical: 6px;
                --sb-suggestion-padding-horizontal: 4px;
                --sb-suggestion-padding-vertical: 2px;
                --sb-suggestion-font-size: 14px;

                 
                --sb-suggestion-color-hover: rgba(160, 160, 160, 1);
                --sb-suggestion-background-color-hover: rgba(64, 66, 71, 1);
                --sb-suggestion-border-color-hover: rgba(174, 200, 26, 1);

                
                --sb-suggestion-color-selected: rgba(47, 47, 47, 1);
                --sb-suggestion-background-color-selected: rgba(174, 200, 26, 1);
                --sb-suggestion-border-color-selected: rgba(174, 200, 26, 1);

                
                --sb-button-width: 40px;
                --sb-button-color: rgba(160, 160, 160, 1);
                --sb-button-background-color: rgba(42, 42, 42, 0.8);
                --sb-button-border-color: rgba(95, 95, 100, 1);
                --sb-button-border-width: 1px;
                --sb-button-border-style: solid;
                --sb-button-border-radius: 6px;
                --sb-button-font-size: 14px;

                
                --sb-button-color-hover: rgba(174, 200, 26, 1);
                --sb-button-background-color-hover: rgba(42, 42, 42, 0.8);
                --sb-button-border-color-hover: rgba(95, 95, 100, 1);

                 
                --sb-button-color-disabled: rgba(95, 95, 100, 1);
                --sb-button-background-color-disabled: rgba(42, 42, 42, 0.8);
                --sb-button-border-color-disabled   : rgba(95, 95, 100, 1);

                 
                --info-tag-color: rgba(160, 160, 160, 1);
                --info-tag-background-color: rgba(0, 0, 0, 1);
                --info-tag-span-color : rgba(174, 200, 26, 1);
            }

            :host {
                
                background-color: var(--theme-sig-keyboard-background-color, rgba(37, 137, 202, .7));
                border-width: var(--theme-sig-keyboard-border-width, 0px);
                border-color: var(--theme-sig-keyboard-border-color, transparent);
                border-style: var(--theme-sig-keyboard-border-style, none);
                border-radius: var(--theme-sig-keyboard-border-radius, 0px);

                
                display: block;
                margin: 0px;
                padding: 0px;
                overflow: hidden;
                width: var(--theme-sig-element-width, 100%);
                height: var(--theme-sig-element-height, 100%);
                position: absolute;
            }
        
             :host * {
                
                margin: 0;
                padding: 0;
            }

            :host([isdesignmode]) #keyshell * {
                 
                pointer-events: none !important;
                cursor: default !important; 
            }
            
            .clearfix:after {
                
                @apply --clearfix   
            }
            
            .notextselect {
                @apply --notextselect
            }
            
            .sig-keyboard {
                text-align: center;
                position: relative;
                height: 100%;
                
                background-image: var(--theme-sig-keyboard-background-image, none);
                background-repeat: var(--theme-sig-keyboard-background-repeat, repeat);

                
            }
            
            #sigkeyboard .keyshell {
                padding:  var(--theme-sig-keyboard-keyshell-padding-vertical, var(--keyshell-padding-vertical)) 
                          var(--theme-sig-keyboard-keyshell-padding-horizontal, var(--keyshell-padding-horizontal));
            }

            :host([layout-display="grid"]) #keyshell,
            :host([layout-display="grid"]) #layout,
            :host([layout-display="grid"]) .grid,
            :host([layout-display="grid"]) .layer {
                height: 100%;
            }

            :host([layout-display="grid"]) #keyboard {
                flex: 1; 
                margin-bottom: var(--theme-sig-keyboard-layers-marging-bottom, var(--layers-marging-bottom));
                overflow: hidden; 
            }
            
            :host .inputholder {
                display: flex;
                cursor: text;
                align-items: center;
                min-height: var(--theme-sig-keyboard-input-min-height, 25px);
                border-bottom: 2px solid var(--theme-sig-keyboard-input-border-bottom-color, rgba(119, 119, 119, 1));
                background-color: var(--theme-sig-keyboard-input-background-color, transparent);
                color: var(--theme-sig-keyboard-input-color, rgba(51,51,51,1));
                font-size: initial;
                margin-top: var(--theme-sig-keyboard-input-margin-top, var(--input-margin-top));
                margin-bottom: var(--theme-sig-keyboard-input-margin-bottom, var(--input-margin-bottom));
            }

            :host .inputfield {
                flex: 0 1 100%;
                padding-top: var(--theme-sig-keyboard-input-padding-top, var(--theme-sig-keyboard-input-padding-default, 0px));
                padding-bottom: var(--theme-sig-keyboard-input-padding-bottom, var(--theme-sig-keyboard-input-padding-default, 0px));
                padding-left: var(--theme-sig-keyboard-input-padding-left, var(--theme-sig-keyboard-input-padding-default, 0px));
                padding-right: var(--theme-sig-keyboard-input-padding-right, var(--theme-sig-keyboard-input-padding-default, 0px));
            }

            
            :host([layout-display="grid"]) .inputfield {
                position: relative;
                overflow: hidden;
            }

            :host .unittext {
                flex: 0 1 auto;
                display: none;
                font-size: var(--theme-sig-keyboard-input-unit-font-size, 25px);
                padding-top: var(--theme-sig-keyboard-input-unit-padding-top, var(--theme-sig-keyboard-input-unit-padding-default, 0px));
                padding-bottom: var(--theme-sig-keyboard-input-unit-padding-bottom, var(--theme-sig-keyboard-input-unit-padding-default, 0px));
                padding-left: var(--theme-sig-keyboard-input-unit-padding-left, var(--theme-sig-keyboard-input-unit-padding-default, 0px));
                padding-right: var(--theme-sig-keyboard-input-unit-padding-right, var(--theme-sig-keyboard-input-unit-padding-default, 0px));
            }

            .keyboardinput {
                width: 100%;
                font-size: var(--theme-sig-keyboard-input-font-size, 25px);
                border: none;
                background:none;
                outline: none;
                font-family: inherit;
                font-style:inherit;
                font-weight:inherit;
                color: inherit;
            }
               
            .keyboardinput::-ms-clear {
                display: none;
            }
            
            #info {
                color: var(--theme-sig-keyboard-info-color, rgba(102,102,102,1));
                border-top: 12px solid transparent;
                font-size: var(--theme-sig-keyboard-info-font-size, 10px);
                text-align: left;
                display: none;
            }
            
            #min {
                float: left;
            }
            
            #max {
                float: right;
            }
            
            .layout {
                text-align: left;
                display: flex;
                flex-direction: column;
            }
            
            .layer {
                text-align: center;
                display: none;
            }
            
            .layer[selected] {
                display: var(--layout-display-layer) !important;
            }

            .row {
                font-size: initial;
                display: var(--layout-display-row) !important;
            }
             
            .key {
                color: var(--theme-sig-keyboard-key-color, rgba(0,0,0,1));
                background-color: var(--theme-sig-keyboard-key-background-color,rgba(255,255,255,1));
                display: var(--layout-display-key) !important;
                font-size: var(--theme-sig-keyboard-key-font-size, 18px);
                border-top-width: var(--theme-sig-keyboard-key-border-top-width, 1px);
                border-top-style: var(--theme-sig-keyboard-key-border-top-style, solid);
                border-top-color: var(--theme-sig-keyboard-key-border-top-color, rgba(255,255,255,1));
                border-left-width: var(--theme-sig-keyboard-key-border-left-width, 1px);
                border-left-style: var(--theme-sig-keyboard-key-border-left-style, solid);
                border-left-color: var(--theme-sig-keyboard-key-border-left-color, rgba(255,255,255,1));
                border-right-width: var(--theme-sig-keyboard-key-border-right-width, 1px);
                border-right-style: var(--theme-sig-keyboard-key-border-right-style, solid);
                border-right-color: var(--theme-sig-keyboard-key-border-right-color, rgba(255,255,255,1));
                border-bottom-width: var(--theme-sig-keyboard-key-border-bottom-width, 1px);
                border-bottom-style: var(--theme-sig-keyboard-key-border-bottom-style, solid);
                border-bottom-color: var(--theme-sig-keyboard-key-border-bottom-color, rgba(153,153,153,1));
                margin: 0 var(--theme-sig-keyboard-key-margin-right, 1px) var(--theme-sig-keyboard-key-margin-bottom, 1px) 0 !important;
                text-align: center;
                min-width: var(--theme-sig-keyboard-key-min-width, 50px);
                min-height: var(--theme-sig-keyboard-key-min-height, 50px);
                line-height: var(--theme-sig-keyboard-key-line-height, 50px);
                border-radius: var(--theme-sig-keyboard-key-border-radius, 5px);
                cursor: pointer;
                vertical-align: middle;
                pointer-events: all;
            }

            .key * {
                
                pointer-events: none;
            }

            :host([keyshadowactive]) .key {
                box-shadow: inset 1px 1px 0px 0px rgba(255, 255, 255, .4), inset -1px -1px 0px 0px rgba(0, 0, 0, .2);
            }
            
            .key.off {
                color: var(--theme-sig-keyboard-key-off-color, rgba(0,0,0,1));
                font-size: var(--theme-sig-keyboard-key-font-size, 18px);
                background-color: var(--theme-sig-keyboard-key-off-background-color, rgba(205,213,220,1));
                border-top-width: var(--theme-sig-keyboard-key-off-border-top-width, 1px);
                border-top-style: var(--theme-sig-keyboard-key-off-border-top-style, solid);
                border-top-color: var(--theme-sig-keyboard-key-off-border-top-color, rgba(155,179,195,1));
                border-left-width: var(--theme-sig-keyboard-key-off-border-left-width, 1px);
                border-left-style: var(--theme-sig-keyboard-key-off-border-left-style, solid);
                border-left-color: var(--theme-sig-keyboard-key-off-border-left-color, rgba(155,179,195,1));
                border-right-width: var(--theme-sig-keyboard-key-off-border-right-width, 1px);
                border-right-style: var(--theme-sig-keyboard-key-off-border-right-style, solid);
                border-right-color: var(--theme-sig-keyboard-key-off-border-right-color, rgba(155,179,195,1));
                border-bottom-width: var(--theme-sig-keyboard-key-off-border-bottom-width, 1px);
                border-bottom-style: var(--theme-sig-keyboard-key-off-border-bottom-style, solid);
                border-bottom-color: var(--theme-sig-keyboard-key-off-border-bottom-color, rgba(155,179,195,1));
                cursor: not-allowed;
                pointer-events: none;
            }
            
            .key.special {
                color: var(--theme-sig-keyboard-key-special-color, rgba(0,0,0,1));
                font-size: var(--theme-sig-keyboard-key-font-size, 18px);
                background-color: var(--theme-sig-keyboard-key-special-background-color, rgba(155,179,195,1));
                border-top-width: var(--theme-sig-keyboard-key-special-border-top-width, 1px);
                border-top-style: var(--theme-sig-keyboard-key-special-border-top-style, solid);
                border-top-color: var(--theme-sig-keyboard-key-special-border-top-color, rgba(155,179,195,1));
                border-left-width: var(--theme-sig-keyboard-key-special-border-left-width, 1px);
                border-left-style: var(--theme-sig-keyboard-key-special-border-left-style, solid);
                border-left-color: var(--theme-sig-keyboard-key-special-border-left-color, rgba(155,179,195,1));
                border-right-width: var(--theme-sig-keyboard-key-special-border-right-width, 1px);
                border-right-style: var(--theme-sig-keyboard-key-special-border-right-style, solid);
                border-right-color: var(--theme-sig-keyboard-key-special-border-right-color, rgba(155,179,195,1));
                border-bottom-width: var(--theme-sig-keyboard-key-special-border-bottom-width, 1px);
                border-bottom-style: var(--theme-sig-keyboard-key-special-border-bottom-style, solid);
                border-bottom-color: var(--theme-sig-keyboard-key-special-border-bottom-color, rgba(155,179,195,1));
            }

            .alpha .key.special,
            .full .key.special {
                 width: var(--theme-sig-keyboard-key-special-alpha-min-width, 50px);
            }

            .key.keypressed {
                color: var(--theme-sig-keyboard-key-pressed-color, rgba(0,0,0,1));
                font-size: var(--theme-sig-keyboard-key-font-size, 18px);
                background-color: var(--theme-sig-keyboard-key-pressed-background-color, rgba(239,239,239,1));
                border-top-width: var(--theme-sig-keyboard-key-pressed-border-top-width, 1px);
                border-top-style: var(--theme-sig-keyboard-key-pressed-border-top-style, solid);
                border-top-color: var(--theme-sig-keyboard-key-pressed-border-top-color, rgba(153,153,153,1));
                border-left-width: var(--theme-sig-keyboard-key-pressed-border-left-width, 1px);
                border-left-style: var(--theme-sig-keyboard-key-pressed-border-left-style, solid);
                border-left-color: var(--theme-sig-keyboard-key-pressed-border-left-color, rgba(255,255,255,1));
                border-right-width: var(--theme-sig-keyboard-key-pressed-border-right-width, 1px);
                border-right-style: var(--theme-sig-keyboard-key-pressed-border-right-style, solid);
                border-right-color: var(--theme-sig-keyboard-key-pressed-border-right-color, rgba(255,255,255,1));
                border-bottom-width: var(--theme-sig-keyboard-key-pressed-border-bottom-width, 1px);
                border-bottom-style: var(--theme-sig-keyboard-key-pressed-border-bottom-style, solid);
                border-bottom-color: var(--theme-sig-keyboard-key-pressed-border-bottom-color, rgba(255,255,255,1));
            }

            :host([keypressedshadowactive]) .key.keypressed {
                box-shadow: inset 1px 1px 0px 0px rgba(0, 0, 0, .4), inset -1px -1px 0px 0px rgba(255, 255, 255, .2);
            }
            
            .key.space {
                min-width: var(--theme-sig-keyboard-key-space-alpha-min-width, 280px);
            }
            
            .key.accept {
                color: var(--theme-sig-keyboard-key-accept-color, rgba(255,255,255,1));
                background-color: var(--theme-sig-keyboard-key-accept-background-color, rgba(0,153,0,1));
            }

            :host([phrase-active]) .key.accept {
                color: var(--theme-sig-keyboard-key-accept-phrase-active-color, rgba(255,255,255,1));
                background-color: var(--theme-sig-keyboard-key-accept-phrase-active-background-color, rgba(0,112,112,1));
            }
            
            .key.cancel {
                color: var(--theme-sig-keyboard-key-cancel-color, rgba(255,255,255,1));
                background-color: var(--theme-sig-keyboard-key-cancel-background-color, rgba(136,0,0,1));
            }

            .key.empty {
                background-color: transparent !important;
                box-shadow: none !important;
                pointer-events: none !important;
                border:none !important;
            }

            .key.imetoggle:not(.keypressed) { 
                color: var(--theme-sig-keyboard-key-special-selected-background-color, rgba(102,143,170,1));
            }
            :host([ime-input-disabled]) .key.imetoggle:not(.keypressed)  { 
                color: var(--theme-sig-keyboard-key-color, rgba(0,0,0,1));
            }

            
            .key .label {
                display: var(--layout-display-label);
                line-height: 90%;
            }
            
            .layer.alt[selected] .key.alt,
            .layer.shift[selected] .key.shift,
            .layer.more[selected] .key.more {
                color: var(--theme-sig-keyboard-key-special-selected-color, rgba(255,255,255,1));
                background-color: var(--theme-sig-keyboard-key-special-selected-background-color, rgba(102,143,170,1));
                border-top-width: var(--theme-sig-keyboard-key-special-selected-border-top-width, 1px);
                border-top-style: var(--theme-sig-keyboard-key-special-selected-border-top-style, solid);
                border-top-color: var(--theme-sig-keyboard-key-special-selected-border-top-color, rgba(74,105,124,1));
                border-left-width: var(--theme-sig-keyboard-key-special-selected-border-left-width, 1px);
                border-left-style: var(--theme-sig-keyboard-key-special-selected-border-left-style, solid);
                border-left-color: var(--theme-sig-keyboard-key-special-selected-border-left-color, rgba(102,143,170,1));
                border-right-width: var(--theme-sig-keyboard-key-special-selected-border-right-width, 1px);
                border-right-style: var(--theme-sig-keyboard-key-special-selected-border-right-style, solid);
                border-right-color: var(--theme-sig-keyboard-key-special-selected-border-right-color, rgba(102,143,170,1));
                border-bottom-width: var(--theme-sig-keyboard-key-special-selected-border-bottom-width, 1px);
                border-bottom-style: var(--theme-sig-keyboard-key-special-selected-border-bottom-style, solid);
                border-bottom-color: var(--theme-sig-keyboard-key-special-selected-border-bottom-color, rgba(102,143,170,1));
            }
 
            :host([keyboardtype="numeric"]) #info {
                display: block;
            }
            
            :host(:not([isactive])) .inputholder {
                color: var(--theme-sig-keyboard-input-inactive-color, rgba(255,255,255,1));
                background-color: var(--theme-sig-keyboard-input-inactive-background-color, rgba(42, 42, 42, .5));
                border-bottom-color: var(--theme-sig-keyboard-input-inactive-bottom-color, rgba(0, 0, 0, 1));
            }
            
            :host([isinvalid]) .inputholder {
                color: var(--theme-sig-keyboard-input-invalid-color, rgba(255,255,255,1));
                background-color: var(--theme-sig-keyboard-input-invalid-background-color, rgba(255, 0, 0, .5));
                border-bottom-color: var(--theme-sig-keyboard-input-invalid-bottom-color, rgba(255, 0, 0, 1));
            }
            
            :host([isinvalid]) .key.enter,
            :host([isinvalid]) .key.key.accept,
            :host(:not([isactive])) .key.enter,
            :host(:not([isactive])) .key.key.accept {
                opacity: var(--theme-sig-keyboard-invalid-opacity, .3);
                pointer-events: none;
            }
            
            .symbol {
                @apply --symbol;
            }

            .symbolregular {
                @apply --symbolRegular;
            }
            
            .u2000 {
                @apply --u2000;
                font-weight: bold;
            }
            
            .u2800 {
                @apply --u2800;
                font-weight: bold;
            }

            :host([ispassword]) #keyboardinput {
                font-family: caption !important;
            }
            
            :host([ignoremin]) #min {
                display: none;
            }
            
            :host([ignoremax]) #max {
                display: none;
            }
            
            #keyboard {
                pointer-events: none;
            }

            #disableOverlay {
                width:100%;
                height:100%;
                display:none;
                position:absolute;
                top:0px;
                background: var(--theme-sig-keyboard-disabled-overlay-background-color, rgba(42, 42, 42, 0.3));
            }

            :host([isdesignmode][showoverlay]) #disableOverlay {
                display:block;
            }

            :host(.sig-element-inactive) .key {
                pointer-events:none;
            }

            :host([layout-display="flex"]) {
                --layout-display-layer: flex;
                --layout-display-row: flex;
                --layout-display-key: flex;
                --layout-display-key: block;
            }
            :host([layout-display="grid"]) {
                --layout-display-layer: grid;
                --layout-display-row: initial;
                --layout-display-key: flex;
                --layout-display-label: block;
            }
            :host([layout-display="block"]) {
                --layout-display-layer: block;  
                --layout-display-row: block;
                --layout-display-key: inline-block;
                --layout-display-label: inline-block;
            }  

            #suggestions {
                position: relative;
                
                width: calc( 100% - var(--theme-sig-keyboard-sb-border-width) * 2 * var(--theme-sig-keyboard-sb-border-style));
                height: var(--theme-sig-keyboard-sb-height, var(--sb-height));
                background-color: var(--theme-sig-keyboard-sb-background-color, var(--sb-background-color));
                border-color: var(--theme-sig-keyboard-sb-border-color, var(--sb-border-color));
                border-width: var(--theme-sig-keyboard-sb-border-width, var(--sb-border-width));
                border-style: var(--theme-sig-keyboard-sb-border-style, var(--sb-border-style));
                border-radius: var(--theme-sig-keyboard-sb-border-radius, var(--sb-border-radius));
                margin-bottom: var(--theme-sig-keyboard-sb-margin-bottom, var(--sb-margin-bottom));
                display:none;
                overflow: hidden;
            }
            #suggestions .scroll {
                position: relative;
                width: 100%;
                height: 100%;
                overflow-x: auto;
                overflow-y: hidden;
                white-space: nowrap;
            }
            #suggestions .scroll::-webkit-scrollbar {
                height: var(--theme-sig-keyboard-sb-scrollbar-height, var(--sb-scrollbar-height));
            }
            #suggestions .scroll::-webkit-scrollbar-thumb {
                background-color:var(--theme-sig-keyboard-sb-scrollbar-background-color, var(--sb-scrollbar-background-color));
            }
            #suggestions ul {
                display: inline-flex;
                padding: 0 var(--theme-sig-keyboard-sb-button-width, var(--sb-button-width));
                height: 100%;
                width: calc(100% - 2 * var(--theme-sig-keyboard-sb-button-width, var(--sb-button-width)));
            }
            :host([suggestionsitemsizeadjustment="content"])  #suggestions ul {
                width: unset;
            }
            :host([previewscrollbar][isdesignmode]) #suggestions ul {
               margin-right: 100%;
            }
            #suggestions li {
                display:inline-flex;
                height: 100%;
                flex: 1;      
            }
            :host([suggestionsitemsizeadjustment="content"])  #suggestions li {
                flex: unset;
            }
            #suggestions a { 
                display: inline-flex;
                flex: 1;
                flex-direction:column;
                justify-content:space-around;
                text-align: center;
                color: var(--theme-sig-keyboard-sb-suggestion-color, var(--sb-suggestion-color));
                background-color:var(--theme-sig-keyboard-sb-suggestion-background-color, var(--sb-suggestion-background-color));
                border-color: var(--theme-sig-keyboard-sb-suggestion-border-color, var(--sb-suggestion-border-color));
                border-width: var(--theme-sig-keyboard-sb-suggestion-border-width, var(--sb-suggestion-border-width));
                border-style: var(--theme-sig-keyboard-sb-suggestion-border-style, var(--sb-suggestion-border-style));
                border-radius: var(--theme-sig-keyboard-sb-suggestion-border-radius, var(--sb-suggestion-border-radius));
                margin-top: var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical));
                margin-bottom: var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical)); 
                margin-right: var(--theme-sig-keyboard-sb-suggestion-margin-horizontal, var(--sb-suggestion-margin-horizontal));
                margin-left: 0;
                padding-top: var(--theme-sig-keyboard-sb-suggestion-padding-vertical, var(--sb-suggestion-padding-vertical));
                padding-bottom: var(--theme-sig-keyboard-sb-suggestion-padding-vertical, var(--sb-suggestion-padding-vertical)); 
                padding-left: var(--theme-sig-keyboard-sb-suggestion-padding-horizontal, var(--sb-suggestion-padding-horizontal));
                padding-right: var(--theme-sig-keyboard-sb-suggestion-padding-horizontal, var(--sb-suggestion-padding-horizontal));
                font-size: var(--theme-sig-keyboard-sb-suggestion-font-size, var(--sb-suggestion-font-size));
                text-decoration:none;
                cursor: pointer;
                white-space: nowrap;
            }
            :host([suggestionsitemsizeadjustment="content"])  #suggestions a {
                flex: unset;
            }
            #suggestions li:first-child{
                margin-left: var(--theme-sig-keyboard-sb-suggestion-margin-horizontal, var(--sb-suggestion-margin-horizontal));
            }
            @media not (hover: none) {
                #suggestions a:hover,
                #suggestions a.hover {
                    color: var(--theme-sig-keyboard-sb-suggestion-color-hover, var(--sb-suggestion-color-hover));
                    background-color:var(--theme-sig-keyboard-sb-suggestion-background-color-hover, var(--sb-suggestion-background-color-hover));
                    border-color: var(--theme-sig-keyboard-sb-suggestion-border-color-hover, var(--sb-suggestion-border-color-hover));
                }
            }
            #suggestions a.active {
                color: var(--theme-sig-keyboard-sb-suggestion-color-selected, var(--sb-suggestion-color-selected));
                background-color:var(--theme-sig-keyboard-sb-suggestion-background-color-selected, var(--sb-suggestion-background-color-selected));
                border-color: var(--theme-sig-keyboard-sb-suggestion-border-color-selected, var(--sb-suggestion-border-color-selected));
            }
            #suggestions .more {
                position: absolute;
                display: flex;
                justify-content: space-around;
                align-content: space-around;
                flex-wrap: wrap; 
                width:  var(--theme-sig-keyboard-sb-button-width, var(--sb-button-width));
                height: var(--theme-sig-keyboard-sb-height, var(--sb-height));
                color:  var(--theme-sig-keyboard-sb-button-color, var(--sb-button-color));
                background-color: var(--theme-sig-keyboard-sb-button-background-color, var(--sb-button-background-color));
                border-color: var(--theme-sig-keyboard-sb-button-border-color, var(--sb-button-border-color));
                border-width: var(--theme-sig-keyboard-sb-button-border-width, var(--sb-button-border-width));
                border-style: var(--theme-sig-keyboard-sb-button-border-style, var(--sb-button-border-style));
                font-size: var(--theme-sig-keyboard-sb-button-font-size, var(--sb-button-font-size));
                text-decoration: none;
                cursor: pointer;
                overflow: hidden;
            }
            @media not (hover: none) {
                #suggestions .more:hover,
                :host([previewnavigationhoverstate][isdesignmode]) #suggestions .more {
                    color:  var(--theme-sig-keyboard-sb-button-color-hover, var(--sb-button-color-hover));
                    background-color: var(--theme-sig-keyboard-sb-button-background-color-hover, var(--sb-button-background-color-hover));
                    border-color: var(--theme-sig-keyboard-sb-button-border-color-hover, var(--sb-button-border-color-hover));
                }
            }
            #suggestions button.more[disabled] {
                color:  var(--theme-sig-keyboard-sb-button-color-disabled, var(--sb-button-color-disabled));
                background-color: var(--theme-sig-keyboard-sb-button-background-color-disabled, var(--sb-button-background-color-disabled));
                border-color: var(--theme-sig-keyboard-sb-button-border-color-disabled, var(--sb-button-border-color-disabled));
                cursor: default;
            }
            #suggestions.showall button {
               display: none;
            }
            #suggestions .more.left {
                top:0;
                left:0;
                border-top-right-radius: var(--theme-sig-keyboard-sb-button-border-radius, var(--sb-button-border-radius));
                border-bottom-right-radius: var(--theme-sig-keyboard-sb-button-border-radius, var(--sb-button-border-radius));
            }
            #suggestions .more.right {
                top:0;
                right:0;
                border-top-left-radius: var(--theme-sig-keyboard-sb-button-border-radius, var(--sb-button-border-radius));
                border-bottom-left-radius: var(--theme-sig-keyboard-sb-button-border-radius, var(--sb-button-border-radius));
            }
            #suggestions.showall ul {
                padding-left: var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical));
                padding-right: var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical)); 
                width: calc(100% - 2 * var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical)));
            }
            :host([suggestionsitemsizeadjustment="content"])  #suggestions.showall ul {
                width: unset;
            }
            #suggestions.showall ul li:first-child {
                margin-left: 0px;
            }
            
            #suggestions.showall ul li:last-of-type a { 
                margin-right: 0px;
            }
            
            :host([suggestionsoverflow]) #suggestions.showall li:last-of-type a {
                margin-right: var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical));
            }
            
            :host([suggestionsoverflow]) #suggestions:not(.showall) li:last-of-type a {
                --ul-padding: var(--theme-sig-keyboard-sb-suggestion-margin-vertical, var(--sb-suggestion-margin-vertical)); 
                margin-right: calc( var(--theme-sig-keyboard-sb-button-width, var(--sb-button-width)) + var(--ul-padding));
            }
            #suggestions.tracking * {
                cursor:ew-resize;
            }
            #suggestions.tracking a:hover {
                color: var(--theme-sig-keyboard-sb-suggestion-color, var(--sb-suggestion-color));
                background-color:var(--theme-sig-keyboard-sb-suggestion-background-color, var(--sb-suggestion-background-color));
                border-color: var(--theme-sig-keyboard-sb-suggestion-border-color, var(--sb-suggestion-border-color));
            }
            :host([show-suggestions]) #suggestions {
                display: block;
            }
            :host([disable-suggestions]) #suggestions { 
                pointer-events:none !important;
                opacity:var(--theme-sig-keyboard-sb-opacity-disabled, var(--sb-opacity-disabled));
            }
            :host([disable-suggestions]) #suggestions * { 
                pointer-events:none !important;
            }

            #layoutInfo.info {
                position: absolute;
                width: 100%;
                height: 18px;
                bottom: 10px;
                display: none;
                justify-content: center;
                pointer-events: none;
                z-index: 100;
            }
            #layoutInfo .tag {
                color:  var(--theme-sig-keyboard-info-tag-color, var(--info-tag-color));
                background: var(--theme-sig-keyboard-info-tag-background-color, var(--info-tag-background-color));
                border-radius: 4px;
                padding: 2px 6px;
                margin: 0px 6px;
                font-size:11px;
            }
            #layoutInfo .tag:first-child {
                margin-left: 0;
            }
            #layoutInfo .tag:last-child {
                margin-right: 0;
            }
            #layoutInfo .tag span {
                color:  var(--theme-sig-keyboard-info-tag-span-color, var(--info-tag-span-color));
                text-transform: uppercase;
            }
            :host([isdesignmode][previewshowlayoutinfo]) #layoutInfo.info {
                display: flex;
            }
            
            #phrasemarker {
                position: relative;
                overflow: hidden;
                visibility: hidden;
                background-color: transparent;
                color: transparent;
                
                height: 2px;
                bottom: 0px;
                padding-bottom: 2px;
                
                line-height: var(--theme-sig-keyboard-input-font-size, 25px);
                font-size: var(--theme-sig-keyboard-input-font-size, 25px);
                font-family: inherit;
                font-style:inherit;
                font-weight:inherit;
                
                white-space: nowrap;
            }
            #phrasemarker * {
                pointer-events: none;
            }
            #phrasemarker .part {
                display: inline-block;
                color: transparent;
                height: 100%;
                font-weight: inherit;
                
                white-space: pre;
            }
            #phrasemarker .value {
                background: var(--theme-sig-keyboard-input-color, rgba(51,51,51,1));
            }
            :host([isinvalid]) #phrasemarker .value {
                background: var(--theme-sig-keyboard-input-invalid-color, rgba(255,255,255,1));
            }
            :host([keyboardtype="alpha"]:not([ime-input-disabled]):not([ispassword])[show-suggestions]) #phrasemarker {
                visibility:visible;
            }
        </style>
        <div id="sigkeyboard" class="sig-keyboard clearfix">
            <div id="keyshell" class="keyshell">
                <div id="layout" class="layout">
                    <div id="info" class="clearfix">
                        <span id="min">[[stringMin]][[keyboardmin]] &nbsp;&nbsp;&nbsp;&nbsp; </span>
                        <span id="max">[[stringMax]][[keyboardmax]]</span>
                    </div>
                    <div id="inputholder" class="inputholder">
                        <div id="inputfield" class="inputfield">
                            <input type="text" size="1" id="keyboardinput" class="keyboardinput notextselect"
                                value="{{keyboardvalue::input}}" on-blur="_setFocus" on-tap="_inputTap"
                                autocomplete="off" spellcheck="false" inputmode="none" readonly>
                            <div id="phrasemarker">
                               <span class="part before">[[phraseBefore]]</span><span id="activePhrase" class="part value">[[phraseValue]]</span><span class="part after">[[phraseAfter]]</span>
                            </div>
                        </div>
                        <div id="unittext" class="unittext" on-tap="_inputTap">
                           [[keyboardunittext]] 
                        </div>
                    </div>
                    <div id="suggestions" on-track="_handleSuggestionsTrack">
                        <div id="scroll" class="scroll">
                            <ul>
                                <dom-repeat items="[[csuggestions]]" as="suggestion" index-as="index">
                                    <template>
                                        <li><a class="suggestion" data-index$="[[_getSuggestionsIndex(index, suggestionsStart)]]" data-suggestion$="[[suggestion]]" id="s[[_getSuggestionsIndex(index, suggestionsStart)]]" on-tap="_insertSuggestion">[[suggestion]]</a></li>
                                    </template>
                                </dom-repeat>
                            </ul>
                        </div>  
                        <button class="more left symbol" disabled="[[_isFirstSuggestionsBlock(suggestionsStart)]]" on-tap="_handleSuggestionsTapPrevBlock">
                            &#xf137;
                        </button>
                        <button class="more right symbol"disabled$="[[_isLastSuggestionsBlock(suggestionsEnd)]]" on-tap="_handleSuggestionsTapNextBlock">
                            &#xf138;
                        </button>
                    </div>
                    <div id="keyboard"></div>
                    </div>
                </div>
            </div>
            <div id="disableOverlay"></div>
            <div id="layoutInfo" class="info">
                <div class="tag">Layout: <span>[[keyboardlang]]</span></div>
                <div class="tag">Render: <span>[[layoutDisplay]]</span></div>
                <div class="tag">Ime: <span>[[_isImeExtensionActive(imeExtensionActive)]]</span></div>
            </div>
        `;
    }

    static get properties() {
        return {
            keyboardtype: {
                type: String,
                value: 'alpha',
                reflectToAttribute: true,
                observer: '_updateKeyboard'
            },
            keyboardvalue: {
                type: String,
                value: '',
                observer: '_change'
            },
            keyboardcurrentvalue: {
                type: String,
                value: '',
                observer: '_changeCurrValue'
            },
            keyboardmax: {
                type: Number,
                value: 0
            },
            keyboardmin: {
                type: Number,
                value: 0
            },
            keyboardmask: {
                type: String,
                value: '',
                observer: '_maskInput'
            },
            keyboardplaceholder: {
                type: String,
                value: '',
                observer: '_maskInput'
            },
            keyboardmaxlength: {
                type: Number,
                value: 0,
                observer: '_maskInput'
            },
            ispassword: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_makePassword'
            },
            isinvalid: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            isactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_toggleInput'
            },
            ignoremin: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            ignoremax: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            keyboardunittext: {
                type: String,
                value: '',
                observer: '_updateUnittext'
            },
            keyshadowactive: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            keypressedshadowactive: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            layoutmap: {
                type: String,
                value: '',
                observer: '_loadLayout'
            },
            showoverlay: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            stringMin: {
                type: String,
                value: '',
            },
            stringMax: {
                type: String,
                value: '',
            },
            layoutDisplay: {
                type: String,
                value: 'block',
                reflectToAttribute: true
            },
            suggestions: {
                type: Array,
                value: () => [],
                observer: '_suggestionsChanged'
            },
            csuggestions: {
                type: Array,
                computed: '_computeCurrentSuggestions(suggestions, suggestionsStart, suggestionsEnd)'
            },
            suggestionsblocksize: {
                type: Number,
                value: 5,
                observer: '_suggestionsBlockSizeChanged'
            },
            suggestionsStart: {
                type: Number,
                value: 0,
            },
            suggestionsEnd: {
                type: Number,
                value: 0,
            },
            showSuggestions: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            suggestionsitemsizeadjustment: {
                type: String,
                value: 'fill', 
                reflectToAttribute: true
            },
            disableSuggestions: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            imeInputDisabled: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            previewshowlayoutinfo: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            previewalwaysshowsuggestions: {
                type: String,
                value: 'auto',
                observer: '_previewToggleSuggestions'
            },
            previewdisabledsuggestions: {
                type: Boolean,
                value: false,
                observer: '_previewToggleImeInput'
            },
            previewnavigationhoverstate: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            previewscrollbar: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            suggestionsoverflow: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            phraseStart: {
                type: Number,
                value: 0
            },
            phraseEnd: {
                type: Number,
                value: 0
            },
            phraseActive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
    }

    constructor() {
        super();
        this.firstinput = true;
        this.keyboardcache = new Map();
        this.undoValue = '';
        this.keyboardRepeatInterval = 100; 
        this.keyboardRepeatDelay = 350; 
        this.currentCaretPosition = 0;
        this.keyboardlayout = {};
        this.interval = null;
        this.delay = null;
        this.keyIsDown = false;
        this.activeKey = null;
        this.keepLayout = false;
        this.layoutscache = new Map();
        this.disabled = false;
        this.dblClickTimeout = null;
        this.firstJSInputDone = false;
        this.keypressJSMousedownHandler = null;
        this.keypressJSMouseupHandler = null;
        this.keypressPolymerDownHandler = null;
        this.keypressPolymerUpHandler = null;
        this.titletext = '';
        this.datapointBound = false;
        this.datapointType = '';
        this.keyboardlang = 'en_fallback';
        this.activelayout = '';
        this.writeonincrement = false;
        this.keepLayoutOnDblClick = true;
        this.layoutcachetoggle = true;
        this.textApi = (window.sigApi && window.sigApi.textManager) ? window.sigApi.textManager : null;
        this.eventMediatorApi = (window.sigApi && window.sigApi.eventMediator) ? window.sigApi.eventMediator : null;
        this.eventsApi = (window.sigApi && window.sigApi.events) ? window.sigApi.events : null;
        this.keyboardApi = (window.sigApi && window.sigApi.keyboard) ? window.sigApi.keyboard : null;
        this.sanitizeInput = false;
        this.blindinput = false;
        this.OPENING_TAG_PLACEHOLDER = '\u2039'; 
        this.CLOSING_TAG_PLACEHOLDER = '\u203A'; 
        this.controlTextList = this.getControlTextListName();
        this.allowedTags = [
            {
                tag: 'br',
                paired: false
            }
        ];

        this.HEX_PREFIX = '0x';
        this.DEFAULT_REGEX_VALIDATION = {
            numeric: '^-?([0-9]\\d*)(\\.\\d*)?$',
            ipv4: '^(?!.*\\.$)((?!0\\d)(1?\\d?\\d|25[0-5]|2[0-4]\\d)(\\.|$)){4}$',
            hex: '^(0x)?[0-9a-fA-F]+$',
            time: '^[0-9:]+$',
            date: '^[0-9.|-]+$'
        };

        if (this.textApi) {
            this.updateTexts = async () => {
                this.stringMin = await this.textApi.getTextAsync(this.controlTextList, 'min');
                this.stringMax = await this.textApi.getTextAsync(this.controlTextList, 'max');
            };

            if (!this.isdesignmode) this.sigAddEventListener('LANGUAGE_CHG', this.updateTexts, 'runtimeEvent');
            this.updateTexts();

        } else {
            this.stringMin = 'min: ';
            this.stringMax = 'max: ';
        }

        this.imeExtension = null;
        this.imeExtensionActive = false;
        this.currentLayer = 'normal';
        this.suggestionIndex = -1;
        this.lastPhrase = '';
        this.autoFocus = true;
        this.isKeyRepeat = false;
        this.suggestionsTracking = false;
        this.phraseBefore = '';
        this.phraseValue = '';
        this.phraseAfter = '';
        this.autoFinishPhraseTimeout = null;
        this.autoFinishPhraseDelay = 0;
        this.useStrictNonPrintableCheck = false;
        this.deadKeyPressed = false;
        this.deadKey = {
            code: null,
            secondKey: null
        };
        this.unidentifiedKeyPressedCount = 0;
        this.unidentifiedKey = {
            keyboardvalue: null,
            pos: null
        };
    }

    designerOnLanguageChanged() {
        this.updateTexts();
    }

    async designerOnObjectStoreUpdate(data) {
        const textListChanged = await window.sigApi.textManager.isTextListUpdate(data, this.controlTextList);
        if (textListChanged) this.updateTexts();
    }


    connectedCallback() {
        super.connectedCallback();
        if (!this.isdesignmode) {

            if (this.context) {
                this.parentInstance = document.getElementById(this.context.instanceId);

                if (this.parentInstance instanceof HTMLElement && this.context.type === 'dashboard' ||
                    (this.context.type === 'window' && this.parentInstance.slot !== 'keyboard'))
                    this.disableKeyboard();
            }

            this._addKeypressEvents();
            this._addKeyEvents();
            this._addOtherEvents();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.dblClickTimeout !== null) this.sigClearTimeout(this.dblClickTimeout);
        this.parentInstance = null;
        this.cleanup();
        this.textApi = null;
        this.eventMediatorApi = null;
        this.eventsApi = null;
        this.keyboardApi = null;
    }

    _updateUnittext(newval, oldval) {
        if (newval) {
            if (newval.length > 0) this.$.unittext.style.display = 'block';
        } else {
            this.$.unittext.style.display = 'none';
        }
    }

    _updateKeyboard() {
        if (this.isdesignmode && Object.keys(this.keyboardlayout).length !== 0) {
            this._build(this.$.keyboard);
            this._toggleLayer('normal');
        }
    }

    show(
        mask = '',
        placeholder = '',
        min = null,
        max = null,
        maxlength = 0,
        lang = this._getActiveLang(),
        password = false,
        ignoremin = false,
        ignoremax = false,
        titletext = '',
        unittext = '',
        writeonincrement = false,
        datapointBound = false,
        datapointtype = '',
        datetimeformat = '',
        sanitizeInput = false,
        imeExtension = null
    ) {
        this.cleanup();
        this.datapointBound = datapointBound;

        let _ignoremin = ignoremin;
        let _ignoremax = ignoremax;
        let _placeholder = placeholder;
        let _maxlength = maxlength;
        let _mask = mask;

        SigPolymer.afterNextRender(this, () => {
            if (!datapointBound) {
                switch (this.keyboardtype) {
                    case 'numeric':
                        if (min === undefined || min === null) _ignoremin = true;
                        if (max === undefined || max === null) _ignoremax = true;
                        break;
                    case 'ipv4':
                        _mask = '099.099.099.099';
                        _placeholder = '0.0.0.0';
                        _maxlength = 15;
                        break;
                    case 'hex':
                        _mask = 'FFFFFFFF';
                        _maxlength = 8;
                        break;
                    case 'date':
                        switch (datetimeformat) {
                            case 'MM-DD':
                                _mask = '00-00';
                                _placeholder = 'MM-DD';
                                break;
                            case 'YY-MM-DD':
                                _mask = '00-00-00';
                                _placeholder = 'YY-MM-DD';
                                break;
                            case 'YYYY-MM-DD':
                                _mask = '0000-00-00';
                                _placeholder = 'YYYY-MM-DD';
                                break;
                            case 'YY-MM':
                                _mask = '00-00';
                                _placeholder = 'YY-MM';
                                break;
                            case 'MM.YY':
                                _mask = '00.00';
                                _placeholder = 'MM.YY';
                                break;
                            case 'DD.MM':
                                _mask = '00.00';
                                _placeholder = 'DD.MM';
                                break;
                            case 'DD.MM.YY':
                                _mask = '00.00.00';
                                _placeholder = 'DD.MM.YY';
                                break;
                            default:
                                _mask = '00.00.0000';
                                _placeholder = 'DD.MM.YYYY';
                                break;
                        }
                        _maxlength = _placeholder.length;
                        break;
                    case 'time':
                        switch (datetimeformat) {
                            case 'hh:mm':
                                _mask = '00:00';
                                _placeholder = 'HH:MM';
                                break;
                            case 'mm:ss':
                                _mask = '00:00';
                                _placeholder = 'MM:SS';
                                break;
                            default:
                                _mask = '00:00:00';
                                _placeholder = 'HH:MM:SS';
                                break;
                        }
                        _maxlength = _placeholder.length;
                        break;
                    default:
                        break;
                }
            }

            this.keyboardvalue = this.desanitizeInputValue(this.keyboardvalue);

            this.keyboardlang = lang;
            this.keyboardmask = _mask;
            this.keyboardplaceholder = _placeholder;
            this.keyboardmin = min;
            this.keyboardmax = max;
            this.keyboardmaxlength = _maxlength;
            this.ispassword = password;
            this.ignoremin = _ignoremin;
            this.ignoremax = _ignoremax;
            this.isinvalid = false;
            this.undoValue = this.keyboardvalue;
            this.keyboardunittext = unittext;
            this.writeonincrement = writeonincrement;
            this.datapointtype = datapointtype;
            this.sanitizeInput = sanitizeInput;
            this.imeExtension = imeExtension;

            if (titletext === '') this.titletext = this.keyboardtype;
            else this.titletext = titletext;

            this._clearSuggestions();
            this._toggleSuggestions();
            this._dispatchEvent('show');
        });
    }

    _activateInput() {
        this._log('Activate keyboard input after mouse is up');
        this.$.keyboardinput.removeAttribute('readonly');
        this.$.keyboardinput.classList.remove('notextselect');
        this._setFocusAndCursorAtTheEnd();
    }

    _deactivateInput() {
        this._log('Deactivate keyboard input to save caret position');
        this.isactive = false;
        this.$.keyboardinput.setAttribute('readonly', '');
        this.$.keyboardinput.classList.add('notextselect');
    }

    _simulateEvent(el, etype) {
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            const evObj = document.createEvent('Events');
            evObj.initEvent(etype, true, false);
            el.dispatchEvent(evObj);
        }
    }

    _close(resolve = false) {
        this.cleanup();
        this._log('Close the keyboard without updating any value.');
        this._dispatchEvent('close');
        if (this.eventMediatorApi)
            this.eventMediatorApi.publish(this.eventsApi.getInternalEvent('SYSWIN_KEYBOARD_EXIT'), resolve);
    }

    _submit(finishPhrase = true) {
        if (this.phraseActive === true && this.ispassword === false) {
            if (finishPhrase === true) this._finishPhrase();
            this._clearSuggestions();
            return;
        }
        if (!this.isinvalid && this.isactive) {
            this._updateInput();
            this._dispatchEvent('submit');
            this._close(true);
        }
    }

    cleanup() {
        this.isactive = false;
        this.keyboardvalue = '';
        this.isinvalid = false;
        this.firstinput = true;
        this.undoValue = '';
        this.ispassword = false;
        this.keyboardmask = '';
        this.keyboardplaceholder = '';
        this.keyboardmaxlength = 0;
        this.keyboardmin = 0;
        this.keyboardmax = 0;
        this.currentCaretPosition = 0;
        this.ignoremin = false;
        this.ignoremax = false;
        this.formatedValue = undefined;
        this.writeonincrement = false;
        this.keyboardcurrentvalue = '';
        this.datapointBound = false;
        this.datapointtype = '';
        $(this.$.keyboardinput).unmask();

        if (this.delay !== null) SigPolymer.timeOut.cancel(this.delay);
        if (this.interval !== null) SigPolymer.timeOut.cancel(this.interval);
        this.interval = null;
        this.delay = null;
        this.keyIsDown = false;
        this.activeKey = null;
        this.keyboardunittext = '';
        this.imeExtension = null;
        this.suggestions = [];
        this.disableSuggestions = false;
        if (this.context.type === 'window') this.showSuggestions = false;
        else this.showSuggestions = this.imeExtensionActive && this.hasImeSupport;
        this.imeInputDisabled = false;
        this.suggestionIndex = 0;
        this.lastSuggestion = '';
        this.autoFinishPhraseTimeout = null;
        this.deadKeyPressed = false;
        this.deadKey = {
            code: null,
            secondKey: null
        };
        this.unidentifiedKeyPressedCount = 0;
        this.unidentifiedKey = {
            keyboardvalue: null,
            pos: null
        };
        this._finishPhrase();

        this._toggleLayer('normal');

        if (this.parentInstance && (!this.parentInstance.options || !this.parentInstance.options.animateIn))
            this._setFocusAndCursorAtTheEnd();
    }

    _keydown(e) {
        this.isKeyRepeat = e.repeat;
        if (this.hasImeSupport) {
            this._keyDownIme(e);
            return;
        }
        const key = e.keyCode;
        const char = e.key;
        switch (key) {
            case 13:
                if (e.shiftKey === true && this.isactive) this._insertNewLine();
                else this._submit();
                break;
            case 27:
                break;
            case 109:
            case 189:
                if (!this.firstinput && this.keyboardtype === 'numeric') {
                    e.preventDefault();
                    this._makeNegative();
                } else this._checkFirstInput(KEYPRESS_PHYSICAL, key, char);
                break;
            default:
                if (this.firstinput) this._checkFirstInput(KEYPRESS_PHYSICAL, key, char);
                break;
        }
    }

    _keyDownIme(evt) {
        if (evt instanceof KeyboardEvent === false) return;

        const key = evt.key;
        const code = evt.code;
        const charCode = (key.length > 0) ? key.charCodeAt(0) : -1;
        const keyCode = evt.keyCode; 
        const isPrintable = this._isPrintableKey(key);
        const pos = this._getCaretPosition();

        if (keys.NON_PREVENTED_KEYS.includes(key)) return;

        if (this.firstinput) {
            this._checkFirstInput(KEYPRESS_PHYSICAL_IME, keyCode, key, isPrintable);
        }

        if (key === keys.DEAD) {
            this.deadKeyPressed = true;
            this.deadKey.code = code;
            return;
        };

        if (this.deadKeyPressed === true && isPrintable === true) {
            this.deadKey.secondKey = key;
            return;
        }

        if (key === keys.UNIDENTIFIED && code === '') {
            const agent = window.sigApi.browser.getCurrentBrowser();
            const os = agent.os.name;
            const name = agent.browser.name;
            const version = Number(agent.browser.version.split('.')[0]);
            if (os.startsWith('Linux') && name.startsWith('Chrome') && version <= 103) {
                if (this.unidentifiedKeyPressedCount === 0) {
                    this.unidentifiedKey.keyboardvalue = this.keyboardvalue;
                    this.unidentifiedKey.pos = this._getCaretPosition();
                }
                this.unidentifiedKey.isComposing = evt.isComposing;
                this.unidentifiedKeyPressedCount += 1;
                return;
            }
        };

        if (this.phraseActive === false) {
            if (key === 'a' && evt.ctrlKey) return;
            if (key === 'x' && evt.ctrlKey) return;
            if (key === 'c' && evt.ctrlKey) return;
            if (key === 'v' && evt.ctrlKey) return;
            if (key === keys.ARROW_LEFT && evt.shiftKey) return;
            if (key === keys.ARROW_RIGHT && evt.shiftKey) return;
            if (key === keys.DELETE) return;
        }

        evt.preventDefault();

        this._finishPhraseAuto();

        if (key === keys.BACKSPACE && !evt.shiftKey) {
            this._deleteChar();
            return;
        }
        if (key === keys.BACKSPACE && evt.shiftKey) {
            this._clearInput();
            return;
        }
        if (key === keys.ENTER) {
            if (evt.shiftKey === true && this.isactive) this._insertNewLine();
            else {
                let finishPhrase = true;
                if (this.hasActiveSuggestion) {
                    const suggestion = this.suggestions[this.suggestionIndex];
                    if (suggestion) {
                        this._replaceActivePhrase(suggestion.suggestion, suggestion.lengthOfReplacement);
                        this._selectedSuggestion(suggestion);
                        finishPhrase = suggestion.finishPhrase;
                    }
                }
                this._submit(finishPhrase);
            }
            return;
        }
        if (key === keys.ARROW_LEFT) {
            this._moveCursor('left');
            return;
        }
        if (key === keys.ARROW_RIGHT) {
            this._moveCursor('right');
            return;
        }
        if (key === keys.DELETE || (code === keys.NUMPAD_DECIMAL && charCode === 0)) {
            if (pos.start < this.keyboardvalue.length) {
                this._moveCursor('right');
                this._deleteChar();
            }
            return;
        }
        if (key === keys.HOME) {
            if (this.phraseActive) this._setCaretPosition(this.phraseStart);
            else this._setCaretPosition(0);
            return;
        }
        if (key === keys.END) {
            if (this.phraseActive) this._setCaretPosition(this.phraseEnd);
            else this._setCaretPosition(this.keyboardvalue.length);
            return;
        }
        if (key === keys.TAB) {
            this._insertTab();
            return;
        }

        if (key === keys.PAGE_DOWN) {
            this._handleSuggestionsTapNextBlock();
            return;
        }
        if (key === keys.PAGE_UP) {
            this._handleSuggestionsTapPrevBlock();
            return;
        }
        if (key === keys.SPACE && this.phraseActive === true && this.hasSuggestions) {
            this._insertSuggestion(evt, KEYPRESS_PHYSICAL_IME);
            return;
        }

        if (isPrintable === true) {
            this._insertChar(key);
            return;
        }
    }

    _keyPressIme(evt) {
        if (!evt) return;
        if (this.hasImeSupport === false) return;
        const deadKey = evt.key;
        evt.preventDefault();
        if (this.deadKeyPressed === false) return;
        const secondKey = this.deadKey.secondKey;
        const secondKeyNormalized = this._normalizeKey(secondKey);
        const modified = (secondKey !== secondKeyNormalized);
        const deadKeyIsPrintAble = this._isPrintableKey(deadKey);
        const secondKeyIsPrintAble = this._isPrintableKey(secondKey);
        if (modified === true) {
            if (secondKeyIsPrintAble) this._insertChar(secondKey);
        } else if (secondKey) {
            if (deadKeyIsPrintAble && secondKeyIsPrintAble) this._insertChar(deadKey + secondKey);
        } else {
            if (deadKeyIsPrintAble) this._insertChar(deadKey.repeat(2));
        }
        this.deadKeyPressed = false;
        this.deadKey.code = null;
        this.deadKey.secondKey = null;
    }

    _inputIme(evt) {
        if (!evt) return;
        if (this.hasImeSupport === false) return;
        if (this.unidentifiedKeyPressedCount < 2) return;
        const secondKey = (evt.data && this._isPrintableKey(evt.data)) ? evt.data : '';
        const pos = this.unidentifiedKey.pos.start;
        const value = this.unidentifiedKey.keyboardvalue;
        const start = value.substring(0, pos);
        const end = value.substring(pos, value.length);
        const newValue = start + secondKey + end;
        this._updateValue(newValue, pos + secondKey.length);
        if (this.phraseActive === false) {
            this._startPhrase();
            this.phraseStart = pos;
            this.phraseEnd = pos + secondKey.length;
        } else this.phraseEnd += secondKey.length;
        this.unidentifiedKeyPressedCount = 0;
        this.unidentifiedKey.keyboardvalue = null;
        this.unidentifiedKey.pos = null;
    }

    _keyUp(evt) {
        this.isKeyRepeat = false;
        this._updateSuggestions(KEYPRESS_PHYSICAL);
    }

    _changeCurrValue(newval, oldval) {
        if (!this.isactive) this.keyboardvalue = newval;
    }

    _change(newval, oldval) {
        if (typeof newval === 'number') {
            this.keyboardvalue = newval.toString(10);
            return;
        } else if (this.keyboardtype === 'hex' && newval.startsWith(this.HEX_PREFIX)) {
            this.keyboardvalue = newval.replace(this.HEX_PREFIX, '');
            return;
        }

        let _newval = newval;

        if (oldval !== undefined && this.isactive) {
            let regexValidation = new RegExp();
            if (this.keyboardlayout.layouts &&
                this.keyboardlayout.layouts[this.keyboardtype].config &&
                this.keyboardlayout.layouts[this.keyboardtype].config.regexValidation) {
                const regexRule = this.keyboardlayout.layouts[this.keyboardtype].config.regexValidation;

                try {
                    if (regexRule.startsWith('^')) {
                        regexValidation = new RegExp(regexRule);
                    } else {
                        if (this.DEFAULT_REGEX_VALIDATION[regexRule]) {
                            regexValidation = new RegExp(this.DEFAULT_REGEX_VALIDATION[regexRule]);
                        } else {
                            this._log(`"regexValidation" parameter in layout type ${this.keyboardtype} is invalid, using empty regex rule.`, 'WARN');
                        }
                    }
                } catch (error) {
                    this._log(error.message, 'ERROR');
                }
            }

            this._log('Validating based on regex: ' + regexValidation);
            if (regexValidation.test(_newval)) {
                this.isinvalid = false;
                this._log('Regex Valid');
            } else {
                this.isinvalid = true;

                if (this.keyboardtype === 'numeric' && _newval !== '' && _newval !== '-')
                    this.keyboardvalue = oldval;
                this._log('Regex Invalid');
                return;
            }

            if (this.keyboardApi && typeof this.keyboardApi.validateInputFormat === 'function') {
                const formatResult = this.keyboardApi.validateInputFormat(_newval, oldval);

                this.isinvalid = !formatResult.isvalid;

                if (this.isinvalid && formatResult && formatResult.revertChange && this.oldvalbackup !== _newval) {
                    this.oldvalbackup = oldval;
                    this.keyboardvalue = oldval;
                    return;
                }
            } else {
                this._log('Input format validation skipped because the API method is not avaiable.', 'WARN');
            }

            let performChecks = true;
            if (this.keyboardlayout.layouts &&
                this.keyboardlayout.layouts[this.keyboardtype] &&
                this.keyboardlayout.layouts[this.keyboardtype].config &&
                this.keyboardlayout.layouts[this.keyboardtype].config.checkLimits === false)
                performChecks = false;

            if (!this.isinvalid && performChecks) {
                this._log('Checking Limits');

                const checkLimitTypes = ['numeric', 'time-rt', 'date-rt'];
                if (this.datapointBound && checkLimitTypes.includes(this.datapointtype)) {
                    if (this.datapointtype === 'numeric') _newval = Number(_newval);

                    if (this.keyboardApi) {
                        const [valid, formVal] = this.keyboardApi.checkLimits(_newval);
                        if ((valid === 0 || (valid === 1 && this.ignoremax) || (valid === -1 && this.ignoremin))) {
                            this.isinvalid = false;
                            this.formatedValue = formVal;
                        } else {
                            this.isinvalid = true;
                        }
                    } else {
                        this._log('Keyboard API not found. Limits will not be validated', 'ERROR');
                    }
                } else {
                    switch (this.keyboardtype) {
                        case 'numeric':
                            this._log('Validating numeric input');
                            if (((this.keyboardmin !== null && this.keyboardmin !== undefined && Number(_newval) >= this.keyboardmin) || this.ignoremin) &&
                                ((this.keyboardmax !== null && this.keyboardmax !== undefined && Number(_newval) <= this.keyboardmax) || this.ignoremax)) {
                                this.isinvalid = false;
                            } else {
                                this.isinvalid = true;
                            }
                            break;
                        case 'date':
                            this._log('Validating date input');
                            if (this._isValidDate(_newval) && _newval.length === this.keyboardmaxlength) this.isinvalid = false;
                            else this.isinvalid = true;
                            break;
                        case 'time':
                            this._log('Validating time input');
                            if (this._isValidTime(_newval) && _newval.length === this.keyboardmaxlength) this.isinvalid = false;
                            else this.isinvalid = true;
                            break;
                        default:
                            this._log('No Validation');
                            break;
                    }
                }
            }
            if (this.keyboardmax !== '') {
                $(this.$.keyboardinput).trigger('keyup');
            }
        }
    }

    _keyPress(element) {
        const key = element.getAttribute('data-key');
        const cfg = this._getKeyConfig(element);
        if (element.classList.contains('key')) {
            if (this.firstinput) this._checkFirstInput(KEYPRESS_VIRTUAL, key);
            switch (key) {
                case '{bksp}':
                    this._deleteChar();
                    break;
                case '{tab}':
                    this._insertTab();
                    break;
                case '{enter}':
                    this._submit();
                    break;
                case '{newline}':
                    this._insertNewLine();
                    break;
                case '{shift}':
                    this._keyDoubleClick(element,
                        (keepLayout) => this._toggleLayer('shift', keepLayout),
                        () => this._toggleLayer('shift'));
                    break;
                case '{accept}':
                    this._submit();
                    break;
                case '{alt}':
                    this._toggleLayer('alt');
                    break;
                case '{space}':
                    this._insertChar(' ');
                    break;
                case '{cancel}':
                    this._close();
                    break;
                case '{off}':
                    break;
                case '{more}':
                    this._toggleLayer('more');
                    break;
                case '{curup}':
                    this._moveCursor('up');
                    break;
                case '{curdow}':
                    this._moveCursor('down');
                    break;
                case '{curleft}':
                    this._moveCursor('left');
                    break;
                case '{curright}':
                    this._moveCursor('right');
                    break;
                case '{clear}':
                    this._clearInput();
                    break;
                case '{increase}':
                    this._increaseValue();
                    break;
                case '{decrease}':
                    this._decreaseValue();
                    break;
                case '{minus}':
                    this._makeNegative();
                    break;
                case '{undo}':
                    this._undo();
                    break;
                case '{replace}':
                    this._replaceMapping(cfg ? cfg.replacementId : undefined);
                    break;
                case '{imetoggle}':
                    this._toggleImeInput();
                    break;
                case '{switchlayer}':
                    if (cfg && cfg.switchLayer) this._toggleLayer(cfg.switchLayer);
                    break;
                default:
                    this._insertChar(key);
                    if (!this.keepLayout) this._toggleLayer('normal');
                    break;
            }
            this._updateSuggestions(KEYPRESS_VIRTUAL);
            this._finishPhraseAuto();
        }
    }

    _keyPressDown(e) {
        this.sigPreventDefault(e);
        if (this.keyboardmask !== '') this._simulateEvent(this.$.keyboardinput, 'keydown');
        this._log('inside _keyPressDown');

        this.keyIsDown = true;
        const element = e.composedPath()[0];
        if (element.classList.contains('key')) {
            this._keyPress(element);
            if (!element.classList.contains('shift') && !(this.ispassword && this.blindinput)) element.classList.add('keypressed');
            if (this.interval === null && this.delay === null) {
                this.activeKey = element;
                const keyConfig = (element.dataset.keyConfig) ? JSON.parse(element.dataset.keyConfig) : null;
                const repeat = (keyConfig !== null && keyConfig.noRepeat !== undefined) ? !keyConfig.noRepeat : true;
                if (repeat) {
                    this.delay = SigPolymer.timeOut.run(() => {
                        this._log('Start Keyboard Delay');
                        this._doKeypressInterval(element);
                    }, this.keyboardRepeatDelay);
                }
            }
        }
    }

    _doKeypressInterval(element) {
        this._keyPress(element);
        SigPolymer.timeOut.cancel(this.interval);
        this.interval = SigPolymer.timeOut.run(() =>
            this._doKeypressInterval(element), this.keyboardRepeatInterval);
        this.isKeyRepeat = true;
    }

    _keyPressUp(e) {
        this.sigPreventDefault(e, true);
        this._log('inside _keyPressUP');

        const element = e.composedPath()[0];
        if (element.classList.contains('key')) {
            if (!element.classList.contains('shift')) element.classList.remove('keypressed');
        }
        if (this.activeKey !== null) {
            if (!element.classList.contains('shift')) element.classList.remove('keypressed');
            this.activeKey = null;
            this.keyIsDown = false;
        }
        if (this.delay !== null) {
            SigPolymer.timeOut.cancel(this.delay);
            this.delay = null;
        }
        if (this.interval !== null) {
            SigPolymer.timeOut.cancel(this.interval);
            this.interval = null;
        }
        if (this.isKeyRepeat === true) {
            this.isKeyRepeat = false;
            this._updateSuggestions('keyPressUp');
        }
    }

    _toggleLayer(switchlayer, keepLayout = true) {
        this.layoutDisplay = this._getLayoutDisplay();
        let _switchlayer = switchlayer;
        this.keepLayout = keepLayout;
        this._log(`Toggle layer "${_switchlayer}"`);
        const layers = this.$.keyboard.querySelectorAll('div.layer');
        const currentlayer = this.$.keyboard.querySelector('div.layer[selected]');

        if (currentlayer !== null && currentlayer.classList.contains(_switchlayer))
            _switchlayer = 'normal';

        for (const layer of layers) {
            if (layer instanceof HTMLElement && layer.classList.contains(_switchlayer)) layer.setAttribute('selected', '');
            else layer.removeAttribute('selected');
        }
        this.currentLayer = _switchlayer;
    }

    _makePassword(newval, oldval) {
        if (newval !== undefined) {
            if (newval) {
                if (this.isChromeAndroid()) this.$.keyboardinput.style.webkitTextSecurity = 'disc';
                else this.$.keyboardinput.setAttribute('type', 'password');
                this.disableSuggestions = true;
                this._clearSuggestions();
            } else {
                if (this.isChromeAndroid()) this.$.keyboardinput.style.webkitTextSecurity = 'none';
                else this.$.keyboardinput.setAttribute('type', 'text');
                this.disableSuggestions = false;
                this._updateSuggestions('makepassword');
            }
        }
    }

    _insertChar(char) {
        const pos = this._getCaretPosition();
        if (this.keyboardvalue.length + char.length - (pos.end - pos.start) <= this.keyboardmaxlength || this.keyboardmaxlength === 0) {
            const endPhrase = PHRASE_END_CHARS.includes(char);
            if (endPhrase === true) this._finishPhrase();
            else this._startPhrase();
            if ((pos.end - pos.start) > 0) {
                this._updateValue(this._deleteString(this.keyboardvalue, pos.end, pos.end - pos.start), pos.start);
            }
            this._updateValue(this._insertString(this.keyboardvalue, pos.start, char), pos.start + char.length);
            if (endPhrase === false) this.phraseEnd += char.length;
            this._log(`Inserted character "${char}" at position "${pos.start}"`);
        }
    }

    _deleteChar() {
        const pos = this._getCaretPosition();
        if (pos.start > 0 || pos.end > 0) {
            if (this.phraseActive === true && pos.start <= this.phraseStart) return;
            const length = pos.end - pos.start;
            if (length > 0) {
                this._updateValue(this._deleteString(this.keyboardvalue, pos.end, pos.end - pos.start), pos.start);
                this.phraseEnd -= length;
            } else {
                this._updateValue(this._deleteString(this.keyboardvalue, pos.start, 1), pos.start - 1);
                this.phraseEnd -= 1;
            }
            if (this.phraseActive === false) this.phraseStart = this.phraseEnd;
            this._log(`Delete character at position "${pos.start}"`);
        }
    }

    _insertTab() {
        this._insertChar(TAB_CHAR);
    }

    _insertNewLine() {
        this._insertChar(BREAK_CHAR);
    }

    _moveCursor(move) {
        const pos = this._getCaretPosition();
        switch (move) {
            case 'left':
                if (pos.start > 0) {
                    if (this.phraseActive === true && pos.start === this.phraseStart) return;
                    this._setCaretPosition(pos.start - 1);
                    this._log(`Moved cursor left from position ${pos.start} to ${pos.start - 1}`);
                }
                break;
            case 'right':
                if (pos.start < this.keyboardvalue.length) {
                    if (this.phraseActive === true && pos.end === this.phraseEnd) return;
                    this._setCaretPosition(pos.start + 1);
                    this._log(`Moved cursor right from position ${pos.start} to ${pos.start + 1}`);
                }
                break;
            case 'up':
                this._log('Moved cursor up (not implemented for now)');
                break;
            case 'down':
                this._log('Moved cursor down (not implemented for now)');
                break;
            default:
                break;
        }
    }

    _increaseValue() {
        switch (this.keyboardtype) {
            case 'numeric':
                const newVal = (this.keyboardApi) ? this.keyboardApi.incDataPoint(this.writeonincrement, this.keyboardvalue) : undefined;
                if (newVal !== undefined) {
                    this.keyboardvalue = newVal.toString();
                    if (this.writeonincrement) this._updateInput();
                }
                break;
        }
    }

    _decreaseValue() {
        switch (this.keyboardtype) {
            case 'numeric':
                const newVal = (this.keyboardApi) ? this.keyboardApi.decDataPoint(this.writeonincrement, this.keyboardvalue) : undefined;
                if (newVal !== undefined) {
                    this.keyboardvalue = newVal.toString();
                    if (this.writeonincrement) this._updateInput();
                }
                break;
        }
    }

    _makeNegative() {
        let value = this.keyboardvalue;
        if (isNaN(value) || value === '') {
            value = '-';
        } else {
            value = parseFloat(value) * -1;
            this._log(` Value multiplied with -1 new value is "${value}"`);
        }
        this.keyboardvalue = value.toString();
    }

    _insertString(str = '', pos = 0, value = '') {
        return str.substring(0, pos) + value + str.substring(pos);
    }

    _deleteString(str = '', pos = 0, chars = 1) {
        return str.substring(0, pos - chars) + str.substring(pos);
    }

    _undo() {
        this.keyboardvalue = this.undoValue;
        this._finishPhrase();
    }

    _getCaretPosition(ctrl = this.$.keyboardinput) {
        if (document.selection) {
            ctrl.focus();
            const range = document.selection.createRange();
            const rangelen = range.text.length;
            range.moveStart('character', -ctrl.value.length);
            const start = range.text.length - rangelen;
            return {
                start: start,
                end: start + rangelen
            };
        } else if (Number.isInteger(ctrl.selectionStart) && Number.isInteger(ctrl.selectionEnd)) {
            return {
                start: ctrl.selectionStart,
                end: ctrl.selectionEnd
            };
        } else {
            return {
                start: 0,
                end: 0
            };
        }
    }

    _setCaretPosition(start, end = start, ctrl = this.$.keyboardinput) {
        this.autoFocus = false;
        if (ctrl.setSelectionRange) {
            ctrl.setSelectionRange(start, end);
            ctrl.blur();
            ctrl.focus();
        } else if (ctrl.createTextRange) { 
            const range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
        this.autoFocus = true;
    }

    _updateInput() {
        if (!this.isinvalid && this.eventMediatorApi && this.eventsApi) {
            if (this.formatedValue === undefined) {
                const sanitizedValue = this.sanitizeInputValue(this.keyboardvalue);
                this.eventMediatorApi.publish(this.eventsApi.getInternalEvent('SYSWIN_KEYBOARD_VALUE'), sanitizedValue);
            } else {
                this.eventMediatorApi.publish(this.eventsApi.getInternalEvent('SYSWIN_KEYBOARD_VALUE'), this.formatedValue);
            }
        }
    }

    sanitizeInputValue(value = '') {
        return (this.sanitizeInput) ? this._parseValue(value, 0) : value;
    }

    desanitizeInputValue(value = '') {
        return (this.sanitizeInput) ? this._parseValue(value, 1) : value;
    }

    _parseValue(value, direction) {
        let parsedValue = value;

        if (direction === 0) {
            let temp = document.createElement('span');
            temp.textContent = value;
            parsedValue = temp.innerHTML;
            temp = null;

            this.allowedTags.forEach(tag => {
                if (!tag.paired) {
                    parsedValue = parsedValue.replace(new RegExp(`&lt;${tag.tag}/&gt;`, 'g'), `<${tag.tag}/>`);
                } else {
                    const openingTag = `&lt;${tag.tag}&gt;`;
                    const closingTag = `&lt;/${tag.tag}&gt;`;
                    if (parsedValue.split(openingTag).length === parsedValue.split(closingTag).length) {
                        parsedValue = parsedValue.replace(new RegExp(openingTag, 'g'), `<${tag.tag}>`);
                        parsedValue = parsedValue.replace(new RegExp(closingTag, 'g'), `</${tag.tag}>`);
                    }
                }
            });

            parsedValue = this._replaceWithFakeTags(parsedValue, 0);
        } else {
            parsedValue = this._replaceWithFakeTags(value, 1);
        }

        return parsedValue;
    }

    _replaceWithFakeTags(value, direction) {
        if (direction === 0) {
            return value.replace(new RegExp('&lt;', 'g'), this.OPENING_TAG_PLACEHOLDER)
                .replace(new RegExp('&gt;', 'g'), this.CLOSING_TAG_PLACEHOLDER);
        } else {
            return value.replace(new RegExp(this.OPENING_TAG_PLACEHOLDER, 'g'), '<')
                .replace(new RegExp(this.CLOSING_TAG_PLACEHOLDER, 'g'), '>');
        }
    }

    _updateValue(value, pos = -1) {
        this.keyboardvalue = value.toString();
        if (this.keyboardmask === '' && pos >= 0)
            this._setCaretPosition(pos);
        this._setFocus();
    }

    _setFocus() {
        if (!this.disabled && this.autoFocus === true) this.$.keyboardinput.focus();
    }

    _setFocusAndCursorAtTheEnd() {
        const input = this.$.keyboardinput;
        const tmp = input.value;
        input.focus();
        input.value = '';
        input.blur();
        input.focus();
        input.value = tmp;
        input.scrollLeft = input.scrollWidth;
    }

    _isValidTime(time) {
        let isValid = false;
        switch (this.keyboardplaceholder) {
            case 'HH:MM':
                if (/^([0-1][0-9]|2[0-3]):([0-5][0-9])?$/.test(time)) isValid = true;
                break;
            case 'MM:SS':
                if (/^([0-5][0-9])(:[0-5][0-9])?$/.test(time)) isValid = true;
                break;
            default:
                if (/^([0-1][0-9]|2[0-3]):([0-5][0-9])(:[0-5][0-9])?$/.test(time)) isValid = true;
        }
        return isValid;
    }

    _isValidDate(s) {
        let bits, y, m, d;
        switch (this.keyboardplaceholder) {
            case 'YYYY-MM-DD':
                bits = s.split('-');
                y = bits[0];
                m = bits[1];
                d = bits[2];
                break;
            case 'YY-MM-DD':
                bits = s.split('-');
                y = bits[0];
                m = bits[1];
                d = bits[2];
                break;
            case 'YY-MM':
                bits = s.split('-');
                y = bits[0];
                m = bits[1];
                d = 1;
                break;
            case 'MM-DD':
                bits = s.split('-');
                y = 0;
                m = bits[0];
                d = bits[1];
                break;
            case 'DD.MM':
                bits = s.split('.');
                y = 0;
                m = bits[1];
                d = bits[0];
                break;
            case 'MM.YY':
                bits = s.split('.');
                y = bits[1];
                m = bits[0];
                d = 1;
                break;
            default:
                bits = s.split('.');
                y = bits[2];
                m = bits[1];
                d = bits[0];
                break;
        }


        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if ((!(y % 4) && y % 100) || !(y % 400)) {
            daysInMonth[1] = 29;
        }
        return !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[m - 1];
    }

    _checkFirstInput(type, key, char, isPrintable = false) {
        if (this.firstinput && !this.isactive) {
            this.isactive = true;
            this.firstinput = false;

            switch (type) {
                case KEYPRESS_PHYSICAL:
                    this.keyboardvalue = '';
                    if (char === undefined) { 
                        if (key >= 96 && key <= 108) { 
                            this.keyboardvalue = String.fromCharCode(key - 48);
                        } else if (key === 109 || key === 189) { 
                            this.keyboardvalue = '-';
                        } else {
                            this.keyboardvalue = String.fromCharCode(key);
                        }
                    } else {
                        if (char.length <= 1) this.keyboardvalue = char;
                        else this.keyboardvalue = '';
                    }
                    break;
                case KEYPRESS_PHYSICAL_IME:
                    if (isPrintable === true) {
                        this.keyboardvalue = '';
                    }
                    break;
                case KEYPRESS_VIRTUAL:
                    const invalidKeys = [
                        '{clear}',
                        '{bksp}',
                        '{enter}',
                        '{accept}',
                        '{decrease}',
                        '{increase}',
                        '{curleft}',
                        '{curright}',
                        '{switchlayer}',
                        '{alt}',
                        '{shift}',
                        '{more}',
                        '{replace}',
                        '{imetoggle}'
                    ];
                    if (invalidKeys.indexOf(key) < 0) this.keyboardvalue = '';
                    break;
                default:
                    this.keyboardvalue = '';
                    break;
            }
        }
    }

    _clearInput() {
        if (this.phraseActive === true) this._replaceActivePhrase('');
        else this._updateValue('', 0);
    }

    _inputTap(evt) {
        if (!this.isactive) {
            this.isactive = true;
            return;
        }
        if (this.phraseActive === true) {
            if (this.caretIsOutsideOfPhrase === true) {
                const { start } = this._getCaretPosition();
                this._finishPhrase(start);
            }
        }
    }

    _maskInput() {
        this.$.keyboardinput.setAttribute('placeholder', this.keyboardplaceholder);

        if (this.keyboardmaxlength > 0) {
            this.$.keyboardinput.setAttribute('maxlength', this.keyboardmaxlength);
        } else {
            this.$.keyboardinput.removeAttribute('maxlength');
        }

        if (this.keyboardmask !== '') {
            $.jMaskGlobals = {
                dataMask: false,
                watchInputs: false,
                translation: {
                    '0': { pattern: /\d/ },
                    '9': { pattern: /\d/, optional: true },
                    '#': { pattern: /\d/, recursive: true },
                    'A': { pattern: /[a-zA-Z0-9]/ },
                    'S': { pattern: /[a-zA-Z]/ },
                    '0x': { pattern: /[0x]/ },
                    'F': { pattern: /[A-Fa-f0-9]/ }
                }
            };

            const options = {
                onChange: (val) => this._updateValue(val)
            };
            $(this.$.keyboardinput).mask(this.keyboardmask, options);
        }
    }

    _toggleInput(newval, oldval) {
        this.undoValue = this.keyboardvalue;
        if (newval) this._activateInput();
        else this._deactivateInput();
    }

    _build(node, preCache = false) {
        this._log(`Building keyboard of type "${this.keyboardtype}" for language "${this.keyboardlang}" with layout "${this.activelayout}"`);
        const keyboardlayout = this.keyboardtype + '_' + this.keyboardlang;
        this._toggleSuggestions();
        if (this.keyboardcache.has(keyboardlayout)) {
            this._log('Loading the keyboard from cache');
            node.innerHTML = this.keyboardcache.get(keyboardlayout);
            return;
        }
        node.innerHTML = '';
        const layout = this._getKeyboardLayout();
        const display = this._getLayoutDisplay();
        const config = this._getLayoutRenderConfig();
        const type = this.keyboardtype;
        const lang = this.keyboardlang;
        let render;
        switch (display) {
            case 'grid':
                render = new RenderGrid();
                break;
            case 'block':
            default:
                render = new RenderBlock();
                break;
        }
        const { keyboard, styles } = render.build(type, lang, layout, config);
        if (styles) {
            const styleId = `${display}Styles`;
            let styleElm = this.shadowRoot.getElementById(styleId);
            if (styleElm === null) {
                const polymerStyles = this.shadowRoot.querySelector('style');
                styleElm = document.createElement('style');
                styleElm.id = styleId;
                if (polymerStyles instanceof HTMLElement) polymerStyles.after(styleElm);
                else this.shadowRoot.appendChild(styleElm);
            };
            styleElm.innerHTML += styles;
        }
        if (keyboard) {
            const keyboardraw = document.createElement('div');
            keyboardraw.appendChild(keyboard);
            this.keyboardcache.set(keyboardlayout, keyboardraw.innerHTML);
            if (!preCache) node.innerHTML = keyboardraw.innerHTML;
        }
    }

    _getKeyboardLayout() {
        if (this.keyboardlayout &&
            this.keyboardlayout.hasOwnProperty('layouts') &&
            this.keyboardlayout.layouts.hasOwnProperty(this.keyboardtype) &&
            this.keyboardlayout.layouts[this.keyboardtype].layers) {
            return this.keyboardlayout.layouts[this.keyboardtype].layers;
        } else {
            this._log('Keyboard layout invalid', 'WARN');
            return {};
        }
    }

    _keyDoubleClick(el, onsingle, ondouble) {
        if (this.keepLayoutOnDblClick) {
            if (el.getAttribute('data-dblclick') === null) {
                el.setAttribute('data-dblclick', 1);
                if (this.dblClickTimeout === null) {
                    this.dblClickTimeout = this.sigSetTimeout(() => {
                        if (parseInt(el.getAttribute('data-dblclick'), 10) === 1) {
                            onsingle(false);
                        }
                        el.removeAttribute('data-dblclick');
                        this.dblClickTimeout = null;
                    }, 250);
                }
            } else {
                el.removeAttribute('data-dblclick');
                ondouble();
            }
        } else {
            onsingle(true);
        }
    }

    _loadLayout(newVal, oldVal) {
        SigPolymer.afterNextRender(this, async () => {
            let layoutToBuild = undefined;
            let render = true;
            if (newVal === null || newVal === undefined || (this.isdesignmode && newVal === '')) {
                this._log('No layoutmap selected, using internal fallback instead!', 'INFO');
            } else if (newVal !== '' && newVal !== null) {
                if (this.layoutscache.has(newVal) && !this.isdesignmode && this.layoutcachetoggle) {
                    layoutToBuild = this.layoutscache.get(newVal);
                } else {
                    try {
                        const layout = await (await fetch(newVal)).json();
                        if (this._isValidLayout(layout)) {
                            layoutToBuild = layout;
                            this.layoutscache.set(newVal, layout);
                            this._log(`Layout ${layout.name} loaded and built successfully.`, 'INFO');
                        } else {
                            this._log('Invalid layout format. See documentation for valid layout structure. Using internal fallback layout!', 'ERROR');
                        }
                    } catch (error) {
                        this._log(`Parsing of the JSON failed: ${error.message}. Using internal layout fallback instead.`, 'ERROR');
                    }
                }
            } else {
                render = false;
                this._log('Invalid layoutmap value. Building of layout skipped.', 'INFO');
            }

            if (render) this._buildLayout(layoutToBuild);

            if (this.phraseActive === true && this.context.type === 'dashboard') this._finishPhrase();
        });
    }


    _buildLayout(layout) {
        const _layout = (layout) ? layout : fallbackLayout;
        this.keyboardlayout = _layout;
        this.keyboardlang = _layout.lang;
        this.activelayout = _layout.name;
        this._build(this.$.keyboard);
        if (this.isdesignmode) this._updateSuggestions('designmode');
        this._toggleLayer('normal');
    }

    _isValidLayout(layout) {
        if (layout &&
            layout.layouts &&
            layout.lang &&
            layout.name &&
            layout.layouts.alpha && layout.layouts.alpha.layers &&
            layout.layouts.numeric && layout.layouts.numeric.layers &&
            layout.layouts.ipv4 && layout.layouts.ipv4.layers &&
            layout.layouts.hex && layout.layouts.hex.layers &&
            layout.layouts.date && layout.layouts.date.layers &&
            layout.layouts.time && layout.layouts.time.layers &&
            layout.layouts.alpha.layers.normal &&
            layout.layouts.numeric.layers.normal &&
            layout.layouts.ipv4.layers.normal &&
            layout.layouts.hex.layers.normal &&
            layout.layouts.date.layers.normal &&
            layout.layouts.time.layers.normal)
            return true;
        return false;
    }

    enableKeyboard() {
        this._log('enableKeyboard:', this.id);

        if (this.disabled) {
            this.$.disableOverlay.style.display = 'none';
            this.disabled = false;
        }
    }

    disableKeyboard() {
        this._log('disableKeyboard:', this.id);

        if (!this.disabled) {
            this.$.disableOverlay.style.display = 'block';
            this.disabled = true;
            this.cleanup();
            this.$.keyboardinput.blur();
        }
    }


    _addKeypressEvents(node = this.$.keyboard) {
        if (node instanceof HTMLElement) {
            if (this.isiPhone()) {
                if (this.keypressJSMousedownHandler === null) {
                    this.keypressJSMousedownHandler = evt => {
                        if (evt.target === this && this.isiPhone() && !this.firstJSInputDone) {
                            this._keyPressDown(evt);
                        }
                    };
                    this.sigAddEventListener('mousedown', this.keypressJSMousedownHandler);
                }
                if (this.keypressJSMouseupHandler === null) {
                    this.keypressJSMouseupHandler = evt => {
                        if (evt.target === this && this.isiPhone() && !this.firstJSInputDone) {
                            this._keyPressUp(evt);
                            this.firstJSInputDone = true;
                        }
                    };
                    this.sigAddEventListener('mouseup', this.keypressJSMouseupHandler);
                }
            }

            if (this.keypressPolymerDownHandler === null) {
                this.keypressPolymerDownHandler = evt => {
                    if (!this.isiPhone() || this.firstJSInputDone) {
                        this._keyPressDown(evt);
                        if (this.keypressJSMousedownHandler !== null) {
                            this.sigRemoveEventListener('mousedown', this.keypressJSMousedownHandler);
                            this.keypressJSMousedownHandler = null;
                        }
                    }
                };
                this.sigAddEventListener('down', this.keypressPolymerDownHandler, 'polymerEvent', node);
            }

            if (this.keypressPolymerUpHandler === null) {
                this.keypressPolymerUpHandler = evt => {
                    if (!this.isiPhone() || this.firstJSInputDone) {
                        this._keyPressUp(evt);
                        if (this.keypressJSMouseupHandler !== null) {
                            this.sigRemoveEventListener('mouseup', this.keypressJSMouseupHandler);
                            this.keypressJSMouseupHandler = null;
                        }
                    }
                };
                this.sigAddEventListener('up', this.keypressPolymerUpHandler, 'polymerEvent', node);
            }
        } else {
            this._log('The given node to bind the keypress event handlers to is no valid HTML element!', 'ERROR');
        }
    }

    _addKeyEvents() {
        this.sigAddEventListener('keydown', evt => {
            if (!this.disabled && this.isactive) this._keydown(evt);
        }, 'jsEvent', this.$.keyboardinput);

        this.sigAddEventListener('keyup', evt => {
            if (!this.disabled && this.isactive) this._keyUp(evt);
        }, 'jsEvent', this.$.keyboardinput);

        this.sigAddEventListener('keypress', evt => {
            if (!this.disabled && this.isactive) this._keyPressIme(evt);
        }, 'jsEvent', this.$.keyboardinput);

        this.sigAddEventListener('input', evt => {
            if (!this.disabled && this.isactive) this._inputIme(evt);
        }, 'jsEvent', this.$.keyboardinput);

        this.sigAddEventListener('scroll', evt => {
            if (!this.disabled && this.isactive) this._updatePhraseMarkerScrollPosition('scroll');
        }, 'jsEvent', this.$.keyboardinput);

        this.sigAddEventListener('pointerdown', evt => {
            this.pointerIsDown = true;
            this.pointerIsMoving = false;
            if (this.disabled === true) return;
            if (this.isactive === false) return;
            if (this.hasImeSupport === false) return;
            if (this.phraseActive === false) return;
            this.caretIsOutsideOfPhrase = this._isCaretOutsideOfPhrase(evt);
            if (evt.composedPath()[0] !== this.$.keyboardinput) return;
            if (this.caretIsOutsideOfPhrase === false) {
                evt.preventDefault();
                const pos = this._getApproximateCaretPosition(evt);
                this._setCaretPosition(pos);
            }
        }, 'jsEvent', document);

        this.sigAddEventListener('pointermove', evt => {
            this.pointerIsMoving = true;
            if (this.disabled === true) return;
            if (this.isactive === false) return;
            if (this.hasImeSupport === false) return;
            if (this.phraseActive === false) return;
            if (evt.composedPath()[0] !== this.$.keyboardinput) return;
            this.caretIsOutsideOfPhrase = this._isCaretOutsideOfPhrase(evt);
        }, 'jsEvent', document);

        this.sigAddEventListener('pointerup', evt => {
            this.pointerIsDown = false;
            this.pointerIsMoving = false;
            if (this.disabled === true) return;
            if (this.hasImeSupport === false) return;
            if (this.isactive === false) return;
            if (this.phraseActive === false) return;
        }, 'jsEvent', document);

        this.sigAddEventListener('selectionchange', evt => {
            if (this.disabled === true) return;
            if (this.isactive === false) return;
            if (this.hasImeSupport === false) return;
            if (this.isChrome()) {
                let version = window.sigApi.browser.getCurrentBrowserInfo().getBrowserVersion();
                version = parseInt(version.split('.')[0], 10);
                if (version < 103) {
                    this._updatePhraseMarkerScrollPosition('chrome');
                    return false;
                }
            } else if (this.isAppleMobile() === true) {
                this._updatePhraseMarkerScrollPosition('appleMobile');
            }
            if (this.phraseActive === false) return;
            this._clearSelection();
            if (this.isAppleMobile() === true) {
                this._limitSelection();
                return;
            }
            if (this.pointerIsMoving === true) this._limitSelection();
        }, 'jsEvent', document);

        this.sigAddEventListener('dragstart', evt => {
            evt.preventDefault();
            return false;
        }, 'jsEvent', this.$.keyboardinput);

        this.sigAddEventListener('keyup', e => {
            if (!this.disabled && !this.isactive && this.parentInstance && !this.parentInstance.hidden) {
                this._keydown(e);
                if (this.keyboardmask !== '') this._simulateEvent(this.$.keyboardinput, 'keydown');
            }
        }, 'jsEvent', window);
    }

    _addOtherEvents() {
        this.sigAddEventListener('SYSWIN_KEYBOARD_CLOSE', () => this.cleanup(), 'runtimeEvent');

        this.sigAddEventListener('jspaneldragstart', (e) => {
            if (this.context && e.detail === this.context.instanceId)
                this.currentCaretPosition = this._getCaretPosition().end;
        }, 'jsEvent', document);

        this.sigAddEventListener('jspaneldragstop', (e) => {
            if (this.context && e.detail === this.context.instanceId)
                this._setCaretPosition(this.currentCaretPosition);
        }, 'jsEvent', document);

        if (this.parentInstance && this.parentInstance.options && this.parentInstance.options.animateIn !== undefined) {
            this.sigAddEventListener('animationend', () => {
                SigPolymer.afterNextRender(this, () => {
                    if (!this.parentInstance.hidden)
                        this._setFocusAndCursorAtTheEnd();
                });
            }, 'jsEvent', this.parentInstance);
        }
    }

    _getLayoutDisplay() {
        const path = `layouts.${this.keyboardtype}.config.display`;
        const display = this._getPropertyValueByPath(path, this.keyboardlayout);
        return display ? display : 'block';
    }

    _getLayoutRenderConfig() {
        const path = `layouts.${this.keyboardtype}.config.render`;
        const config = this._getPropertyValueByPath(path, this.keyboardlayout);
        return config ? config : {};
    }

    _getPropertyValueByPath(path, obj) {
        if (typeof path !== 'string') return undefined;
        if (typeof obj !== 'object' || obj === null) return undefined;
        const property = path.split('.').reduce((obj, level) => obj && obj[level], obj);
        return property;
    }



    _getKeyConfig(element) {
        if (element instanceof HTMLElement === false) return null;
        const config = (element.dataset && element.dataset.keyConfig) ? JSON.parse(element.dataset.keyConfig) : null;
        return config;
    }

    _replaceMapping(id) {
        if (this.keyboardvalue.length <= 0) return;
        if (this.ispassword === true) return;
        const pos = this._getCaretPosition().start - 1;
        const original = this.keyboardvalue.charAt(pos);
        let replacement;
        const imeExtension = this._getImeExtension();
        if (imeExtension && typeof imeExtension.replaceMapping === 'function') {
            replacement = this._getReplacementByImeExtension(original);
        }
        if (!replacement) {
            replacement = this._getReplacementByMappingTable(id, original);
        }
        if (!replacement) return;
        this._deleteChar();
        this._insertChar(replacement);
    }

    _getReplacementByMappingTable(id, original) {
        if (Array.isArray(this.keyboardlayout.replacements) === false
            || this.keyboardlayout.replacements.length === 0) return null;
        let replacements;
        if (id) {
            replacements = this.keyboardlayout.replacements.find(replacement => replacement.id === id);
        } else {
            replacements = this.keyboardlayout.replacements[0];
        }
        if (!replacements) return null;
        const mappings = replacements.mappings;
        if (typeof mappings !== 'object' || Object.keys(mappings).length === 0) return null;
        return mappings[original];
    }

    _getReplacementByImeExtension(original) {
        const imeExtension = this._getImeExtension();
        if (imeExtension === null || typeof imeExtension.replaceMapping !== 'function') return null;
        return imeExtension.replaceMapping(original);
    }

    _toggleImeInput() {
        this.imeInputDisabled = !this.imeInputDisabled;
        if (this.ispassword) return;
        if (this.imeInputDisabled === true) {
            this.disableSuggestions = true;
            this._finishPhrase();
        } else {
            this._startPhrase();
            this.disableSuggestions = false;
        }
    }

    _getImeExtension() {
        let imeExtension = null;
        if (this.imeExtension !== null) {
            imeExtension = this.imeExtension;
        } else if (this._rtHasImeSupport()) {
            const langCode = (this.isdesignmode) ? this.keyboardlang.split('-')[0] : undefined;
            imeExtension = window.sigApi.keyboard.getImeExtension(langCode);
        }
        this.imeExtensionActive = (imeExtension) ? true : false;
        return imeExtension;
    }

    _updateSuggestions(source) {
        if (this.isdesignmode === false && this.disableSuggestions === true) return;
        if (this.showSuggestions === false) return;
        if (this.isdesignmode) {
            const count = (this.suggestionsblocksize === 0) ? 15 : this.suggestionsblocksize * 2;
            this.suggestions = this._getDesignmodeData(count);
            return;
        }
        if (this.isactive === false) return;
        if (this.isKeyRepeat === true) return;
        const currentLength = this.keyboardvalue.length;
        if (currentLength === 0 || currentLength === this.keyboardmaxlength) {
            this._clearSuggestions();
            return;
        }
        const imeExtension = this._getImeExtension();
        if (imeExtension === null || typeof imeExtension.getSuggestions !== 'function') return;
        const { phrase } = this._getActivePhrase();
        if (phrase === null || phrase.length === 0) {
            this._clearSuggestions();
            return;
        }
        if (this.lastPhrase === phrase) return;
        this.lastPhrase = phrase;
        if (this.suggestionsAbortController) this.suggestionsAbortController.abort();
        const abortController = new AbortController();
        const abortSignal = abortController.signal;
        const options = { activeLanguage: this.keyboardlang, activeLayer: this.currentLayer, abortSignal };
        const getSuggestionPromises = imeExtension.getSuggestions(phrase, options);
        getSuggestionPromises.then(suggestions => {
            if (this.phraseActive === false) return;
            if (Array.isArray(suggestions) && this.ispassword === false) this.suggestions = suggestions;
            else this._clearSuggestions();
            this.suggestionsAbortController = null;
        }).catch(error => {
            if (error instanceof Error) this._log(error.message, 'ERROR');
            this._clearSuggestions();
            this.suggestionsAbortController = null;
        });
        this.suggestionsAbortController = abortController;
    }

    _insertSuggestion(evt, source) {
        if (!evt) return;
        if (this.hasImeSupport === false) return;
        if (this.phraseActive === false) return;
        if (this.suggestionsTracking === true) return;
        if (this.hasSuggestions === false) return;
        let shouldFinishPhrase = false;
        let btn;
        switch (source) {
            case KEYPRESS_PHYSICAL_IME:
                btn = this._getNextSuggestionBtn(true);
                if (btn instanceof HTMLElement) {
                    const alignment = (this.suggestionsoverflow === true) ? 'center' : 'end';
                    btn.scrollIntoView({ block: 'center', inline: alignment, smooth: true });
                }
                shouldFinishPhrase = false;
                break;
            case KEYPRESS_VIRTUAL:
            default:
                btn = evt.composedPath()[0];
                shouldFinishPhrase = true;
                break;
        }
        if (btn instanceof HTMLElement === false) return;
        const index = btn.dataset.index;
        const suggestion = this.suggestions[index];
        if (!suggestion) return;
        this.suggestionIndex = index;
        if (shouldFinishPhrase === false) return;
        this._replaceActivePhrase(suggestion.suggestion, suggestion.lengthOfReplacement);
        this._selectedSuggestion(suggestion);
        if (suggestion.finishPhrase === true) {
            this._clearSuggestions();
            this._finishPhrase();
        } else {
            this._updateSuggestions('insertSuggestion');
        }
    }

    _replaceActivePhrase(phrase, lengthOfReplacement = 0) {
        if (typeof phrase !== 'string') return;
        let _phrase;
        if (lengthOfReplacement <= 0 || lengthOfReplacement > this.phraseValue.length) {
            _phrase = phrase;
        } else {
            _phrase = phrase + this.phraseValue.substring(lengthOfReplacement, this.phraseValue.length);
        }
        const newValue = this.phraseBefore + _phrase + this.phraseAfter;
        const newStart = this.phraseStart + phrase.length;
        const newEnd = this.phraseStart + _phrase.length;
        this.phraseStart = newStart;
        this.phraseEnd = newEnd;
        this._updateValue(newValue, newEnd);
    }

    _clearSuggestions() {
        if (this.suggestions.length) this.suggestions = [];
        this.lastPhrase = '';
        this.suggestionIndex = 0;
        this.suggestionsoverflow = false;
        this._clearActiveSuggestionBtn();
    }

    _getActivePhrase() {
        const value = this.keyboardvalue;
        const start = this.phraseStart;
        const end = this.phraseEnd;
        const phrase = value.substring(start, end);
        return { phrase, start, end };
    }

    _toggleSuggestions() {
        const imeExtension = this._getImeExtension();
        if (((this.previewalwaysshowsuggestions === 'always' && this.isdesignmode) || imeExtension !== null) && this.keyboardtype === 'alpha') {
            this.showSuggestions = true;
        } else {
            this.showSuggestions = false;
        }
    }

    _handleSuggestionsTrack(evt) {
        if (!evt) return;
        if (!evt.detail) return;
        if (this.$.scroll.scrollWidth === this.$.scroll.clientWidth) return;
        const { state, ddx } = evt.detail;
        switch (state) {
            case 'start':
                this.$.suggestions.classList.add('tracking');
                this.suggestionsTracking = true;
                break;
            case 'track':
                if (!ddx) break;
                this.$.scroll.scrollLeft -= ddx;
                break;
            case 'end':
                this.$.suggestions.classList.remove('tracking');
                this.sigSetTimeout(() => {
                    this.suggestionsTracking = false;
                }, 100);
                break;
        }
    }

    _handleSuggestionsTapPrevBlock(evt) {
        if (this._isFirstSuggestionsBlock()) return;
        const isLastBlock = this._isLastSuggestionsBlock();
        const itemsCount = this.csuggestions.length;
        const newStart = this.suggestionsStart - this.suggestionsblocksize;
        const endBlockSize = (isLastBlock) ? itemsCount : this.suggestionsblocksize;
        const newEnd = this.suggestionsEnd - endBlockSize;
        const reachedStart = newStart < 0;
        this.suggestionsStart = (reachedStart) ? 0 : newStart;
        this.suggestionsEnd = (reachedStart) ? endBlockSize : newEnd;
    }

    _handleSuggestionsTapNextBlock(evt) {
        if (this._isLastSuggestionsBlock()) return;
        const maxItems = this.suggestions.length;
        const newStart = this.suggestionsStart + this.suggestionsblocksize;
        const newEnd = this.suggestionsEnd + this.suggestionsblocksize;
        const reacheEnd = newEnd > maxItems;
        this.suggestionsStart = newStart;
        this.suggestionsEnd = (reacheEnd) ? maxItems : newEnd;
    }

    _suggestionsChanged(newvalue) {
        if (Array.isArray(newvalue) === false) {
            this.suggestions = [];
            return;
        }
        this.suggestionsStart = 0;
        if (this.suggestionsblocksize === 0 || this.suggestionsblocksize >= newvalue.length) {
            this.suggestionsEnd = newvalue.length;
            this.$.suggestions.classList.add('showall');
        } else {
            this.suggestionsEnd = Math.min(this.suggestionsblocksize, this.suggestions.length);
            this.$.suggestions.classList.remove('showall');
        }
    }

    _computeCurrentSuggestions(suggestions, suggestionsStart, suggestionsEnd) {
        if (this.hasActiveSuggestion === true) this._clearActiveSuggestionBtn();
        if (!suggestions) return [];
        const currentSuggestions = suggestions.slice(suggestionsStart, suggestionsEnd);
        const displaySuggestions = [];
        currentSuggestions.forEach(item => {
            displaySuggestions.push(item.suggestion);
        });
        if (this.isdesignmode) this._setDesignmodeState();
        this._checkSuggestionsOverflow();
        return displaySuggestions;
    }

    _suggestionsBlockSizeChanged(newvalue) {
        if (!newvalue || newvalue < 1) {
            this.suggestionsblocksize = this.suggestions.length;
            return;
        }
        this.suggestionsStart = 0;
        this.suggestionsEnd = Math.min(newvalue, this.suggestions.length);
        if (this.suggestionsblocksize >= this.suggestions.length) {
            this.$.suggestions.classList.add('showall');
        } else {
            this.$.suggestions.classList.remove('showall');
        }
    }

    _isFirstSuggestionsBlock() {
        return this.suggestionsStart === 0;
    }

    _isLastSuggestionsBlock() {
        return this.suggestionsEnd >= this.suggestions.length;
    }

    _getSuggestionsIndex(index = 0, suggestionsStart = 0) {
        return index + suggestionsStart;
    }

    _getDesignmodeData(count = 2) {
        const suggestions = [];
        if (count < 2) return suggestions;
        for (let index = 0; index < count - 1; index += 1) {
            let suggestion;
            if (index === 0) {
                suggestion = 'Selected';
            } else if (index === 1) {
                suggestion = 'Hover';
            } else {
                suggestion = 'Suggestion';
            }
            suggestions.push(
                { suggestion: suggestion, finishPhrase: true, lengthOfReplacement: 0 }
            );
        }
        return suggestions;
    }

    _setDesignmodeState() {
        if (this.isdesignmode === false) return;
        SigPolymer.afterNextRender(this, () => {
            let btn;
            btn = this.shadowRoot.querySelector('#suggestions li a');
            if (btn instanceof HTMLElement) btn.classList.add('active');
            btn = this.shadowRoot.querySelector('#suggestions li:nth-child(2) a');
            if (btn instanceof HTMLElement) btn.classList.add('hover');
        });
    }

    _selectedSuggestion(suggestion) {
        if (!suggestion) return;
        const imeExtension = this._getImeExtension();
        if (imeExtension && typeof imeExtension.selectedSuggestion === 'function') {
            const options = { activeLanguage: this.keyboardlang, activeLayer: this.currentLayer };
            imeExtension.selectedSuggestion(suggestion, options);
        }
    }

    _isImeExtensionActive(active) {
        return (active) ? 'Yes' : 'No';
    }

    _previewToggleSuggestions(mode = 'auto') {
        if (this.isdesignmode === false) return;
        this._toggleSuggestions();
        if (this.suggestions.length === 0) this._updateSuggestions();
    }

    _previewToggleImeInput(disableSuggestions = false) {
        if (this.isdesignmode === false) return;
        this.disableSuggestions = disableSuggestions;
    }

    _rtHasImeSupport() {
        return this._getPropertyValueByPath('sigApi.keyboard.getImeExtension', window) ? true : false;
    }

    _checkSuggestionsOverflow() {
        const elm = this.$.scroll;
        if (elm instanceof HTMLElement === false) return;
        this.sigSetTimeout(() => {
            this.suggestionsoverflow = elm.scrollWidth > elm.clientWidth;
        }, 50);
    }

    _updatePhraseMarker(phraseStart, phraseEnd, keyboardValue) {
        if (this.hasImeSupport === false) return;
        this.phraseBefore = keyboardValue.substring(0, phraseStart);
        this.phraseValue = keyboardValue.substring(phraseStart, phraseEnd);
        this.phraseAfter = keyboardValue.substring(phraseEnd, keyboardValue.length);
    }

    _updatePhraseMarkerScrollPosition(source) {
        if (this.hasImeSupport === false) return;
        this.$.phrasemarker.scrollLeft = this.$.keyboardinput.scrollLeft;
    }

    _startPhrase() {
        if (this.hasImeSupport === false) return;
        if (this.imeInputDisabled === true) return;
        if (this.ispassword === true) return;
        if (this.phraseActive === true) return;
        this.phraseActive = true;
        const { start } = this._getCaretPosition();
        this.phraseStart = start;
        this.phraseEnd = start;
    }

    _finishPhrase(start) {
        if (this.hasImeSupport === false) return;
        if (this.phraseActive === false && this.phraseStart === this.phraseEnd) return;
        this._clearSelection();
        this.phraseActive = false;
        this.phraseStart = this.phraseEnd;
        this._setCaretPosition(start ? start : this.phraseStart);
    }

    _finishPhraseAuto() {
        if (this.hasImeSupport === false) return;
        this.sigClearTimeout(this.autoFinishPhraseTimeout);
        this.autoFinishPhraseTimeout = this.sigSetTimeout(() => {
            if (this.isKeyRepeat === true) return;
            if (this.phraseActive === false) return;
            const { phrase } = this._getActivePhrase();
            if (phrase.length > 0) return;
            this._finishPhrase();
        }, this.autoFinishPhraseDelay);
    }

    _clearSelection() {
        if (this._hasSelection() === false) return;
        const { start } = this._getCaretPosition();
        if (this.phraseActive === true) this._setCaretPosition(this.phraseEnd);
        else this._setCaretPosition(start);
    }

    _hasSelection() {
        const { start, end } = this._getCaretPosition();
        return end - start > 0;
    }

    _limitSelection() {
        if (this.phraseActive === false) return -1;
        const { start, end } = this._getCaretPosition();
        if (start >= this.phraseStart && end <= this.phraseEnd) {
            return 0;
        }
        if (start < this.phraseStart && end >= this.phraseStart && end <= this.phraseEnd) {
            this._setCaretPosition(this.phraseStart, end);
            return 1;
        }
        if (start >= this.phraseStart && start <= this.phraseEnd && end > this.phraseEnd) {
            this._setCaretPosition(start, this.phraseEnd);
            return 2;
        }
        if (start < this.phraseStart && end < this.phraseStart) {
            this._setCaretPosition(this.phraseStart);
            return 3;
        }
        if (start > this.phraseEnd && end > this.phraseEnd) {
            this._setCaretPosition(this.phraseEnd);
            return 4;
        }
        if (start < this.phraseStart && end > this.phraseEnd) {
            this._setCaretPosition(this.phraseStart, this.phraseEnd);
            return 5;
        }
        return -1;
    }

    _isCaretOutsideOfPhrase(evt) {
        if (evt instanceof Event === false) return false;
        const bounds = this.$.activePhrase.getBoundingClientRect();
        const sourceEvent = this._getSourceEvent(evt);;
        if (sourceEvent === null) return false;
        const posX = (sourceEvent.constructor.name === 'TouchEvent') ? sourceEvent.touches[0].pageX : sourceEvent.pageX;
        const left = Math.round(bounds.left);
        const right = Math.round(bounds.right);
        const outside = posX < left || posX > right;
        return outside;
    }

    _getApproximateCaretPosition(evt) {
        const { phrase, start, end } = this._getActivePhrase();
        if (evt instanceof Event === false) return start;
        const sourceEvent = this._getSourceEvent(evt);
        if (sourceEvent === null) return start;
        const posX = (sourceEvent.constructor.name === 'TouchEvent') ? sourceEvent.touches[0].pageX : sourceEvent.pageX;
        const bounds = this.$.activePhrase.getBoundingClientRect();
        if (phrase.length === 0) return start;
        const approximateCharacterWidth = bounds.width / phrase.length;
        const delta = posX - bounds.left;
        let cursorPosition = Math.round(delta / approximateCharacterWidth);
        cursorPosition += start;
        cursorPosition = Math.max(0, Math.min(cursorPosition, end));
        return cursorPosition;
    }

    _getSourceEvent(evt) {
        if (evt instanceof Event === false) return null;
        const sourceEvent = (['tap', 'track', 'down', 'up'].includes(evt.type)) ? evt.detail.sourceEvent : evt;
        return sourceEvent;
    }

    _isPrintableKey(key) {
        if (typeof key !== 'string') return false;
        const nonPrintableKeys = (this.useStrictNonPrintableCheck === true) ? keys.NON_PRINTABLE_KEYS_STRICT : keys.NON_PRINTABLE_KEYS;
        if (nonPrintableKeys.includes(key)) {
            return false;
        }
        return true;
    }

    _clearActiveSuggestionBtn() {
        if (!this.shadowRoot) return;
        this.shadowRoot.querySelectorAll('#suggestions a.suggestion.active').forEach(el => el.classList.remove('active'));
    }

    _getActiveSuggestionsBtn() {
        if (!this.shadowRoot) return null;
        return this.shadowRoot.querySelector('#suggestions a.suggestion.active');
    }

    _getNextSuggestionBtn(toggle = false) {
        if (!this.shadowRoot) return null;
        const activeBtn = this._getActiveSuggestionsBtn();
        let nextBtn = null;
        if (activeBtn instanceof HTMLElement) {
            nextBtn = this._getPropertyValueByPath('parentElement.nextElementSibling.firstChild', activeBtn);
        }
        if (nextBtn instanceof HTMLElement === false) {
            nextBtn = this.shadowRoot.querySelector('#suggestions a.suggestion');
        }
        if (toggle) {
            if (activeBtn === nextBtn) {
                activeBtn.classList.toggle('active');
            } else {
                if (activeBtn) activeBtn.classList.remove('active');
                if (nextBtn) nextBtn.classList.add('active');
            }
        }
        return nextBtn;
    }

    _normalizeKey(key) {
        if (typeof key !== 'string') return null;
        if (key.length === 0) return key;
        const _key = (key.length > 1) ? key[0] : key;
        return _key.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }
}
customElements.define(LasalRuntimeSigKeyboard.is, LasalRuntimeSigKeyboard);
