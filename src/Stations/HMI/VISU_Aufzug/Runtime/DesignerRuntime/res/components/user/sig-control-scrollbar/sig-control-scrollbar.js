import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import './sig-control-scrollbar-css.js';

export class LasalRuntimeSigScrollbarElement extends LasalRuntimeSigElement {

    static get is() {
        return 'sig-control-scrollbar';
    }

    constructor() {
        super();
    }

    static get properties() {
        const props = {
            simulationmode: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
        return props;
    }

    static get importMeta() {
        return import.meta;
    }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css sig-control-scrollbar-css">
        
        :host {
          position: absolute;
         }

    

    :host([isdesignmode][simulationmode]) ::-webkit-scrollbar-thumb {
        background: var(--theme-sig-control-scrollbar-thumb-active-background-color, rgba(200, 200, 200, 1));
        border-color: var(--theme-sig-control-scrollbar-thumb-active-border-color, rgba(64, 66, 72, 1));
    }

    :host([isdesignmode][simulationmode]) ::-webkit-scrollbar-button {
        border-color: var(--theme-sig-control-scrollbar-button-active-border-color, rgba(255, 255, 255, 0));
    }

    :host([isdesignmode][simulationmode]) ::-webkit-scrollbar-track {
        background: var(--theme-sig-control-scrollbar-track-active-background-color, rgba(221, 221, 221, 1));
        border-color: var(--theme-sig-control-scrollbar-track-active-border-color,rgba(64, 66, 72, 1));
    }

    #outer {
        background:gray;
        position:absolute; 
        top: 0px;
        bottom: 0px;
        left:0px;
        right:0px;
        overflow: auto; 
        padding:5px;
    }

    #inner {
        font-size:12px;
        height:350px; 
        background: transparent; 
        width:340px; 
    }
    </style>

     
    <template is="dom-if" if="[[_showActiveState(isdesignmode,simulationmode)]]">
    <style>
    ::-webkit-scrollbar-button:vertical:start:decrement {
        background-image: var(--theme-sig-control-scrollbar-active-up-image, var(--theme-sig-control-scrollbar-up-image,  linear-gradient(120deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(240deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(0deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--button-size-dec12), rgba(0, 0, 0, 0) var(--button-size-dec12))));
        background-size: contain;
        background-color: var(--theme-sig-control-scrollbar-button-active-color, rgba(221, 221, 221, 1));
        background-repeat: no-repeat;
        background-position: center;
    }

    ::-webkit-scrollbar-button:vertical:end:increment {
        background-color: var(--theme-sig-control-scrollbar-button-active-color, rgba(221, 221, 221, 1)) !important;
        background-image: var(--theme-sig-control-scrollbar-active-down-image, var(--theme-sig-control-scrollbar-down-image, linear-gradient(300deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(60deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(180deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--button-size-dec10), rgba(0, 0, 0, 0) var(--button-size-dec9))));
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    ::-webkit-scrollbar-button:horizontal:end:increment {
        background-color: var(--theme-sig-control-scrollbar-button-active-color, rgba(221, 221, 221, 1)) !important;
        background-image:var(--theme-sig-control-scrollbar-active-right-image, var(--theme-sig-control-scrollbar-right-image, linear-gradient(210deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(330deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(90deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--button-size-dec10), rgba(0, 0, 0, 0) var(--button-size-dec9))));
    }

     ::-webkit-scrollbar-button:horizontal:start:decrement {
        background-color: var(--theme-sig-control-scrollbar-button-active-color, rgba(221, 221, 221, 1)) !important;
        background-image: var(--theme-sig-control-scrollbar-active-left-image, var(--theme-sig-control-scrollbar-left-image, linear-gradient(30deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(150deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
        linear-gradient(270deg, var(--theme-sig-control-scrollbar-button-active-background-color,rgba(64, 66, 72, 1)) var(--button-size-dec10), rgba(0, 0, 0, 0) var(--button-size-dec9))));
    }
    </style>
    </template>

    <div id="outer">
        <div id="inner" class="activ">Scrollbar styling</div>
    </div >`;
    }

    _showActiveState(isdesignmode, simulationmode) {
        return (isdesignmode && simulationmode) ? true : false;
    }
}
customElements.define(LasalRuntimeSigScrollbarElement.is, LasalRuntimeSigScrollbarElement);