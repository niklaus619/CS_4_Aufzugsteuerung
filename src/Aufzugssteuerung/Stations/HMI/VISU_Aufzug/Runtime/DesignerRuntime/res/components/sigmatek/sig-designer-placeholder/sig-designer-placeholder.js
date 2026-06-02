import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class LasalRuntimeSigDesignerPlaceholder extends LasalRuntimeSigElement {

    static get is() { return "sig-designer-placeholder"; }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
                :host {
                    position:absolute;
                }
                #container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    padding:0;
                    margin: 0;

                    text-align:center;
                    overflow:hidden;
                    display: flex;
                    align-items: center;
                    justify-content:center;
                    flex-direction: column;

                    background:var(--theme-sig-deisgner-placeholder-background-color, rgba(250,0,0,0.5));
                    color:var(--theme-sig-deisgner-placeholder-color, rgba(255,255,255,1));
                    font-size:var(--theme-sig-deisgner-placeholder-font-size,10px);
                    
                }
            </style>
            <div id="container">
            <span>[[missingControlTagName]]</span>
            <span>The component or a sub resource of the component could not be loaded.</span>
            </div>
        `;
    }

    constructor() {
        super();
        this.missingControlTagName = 'unknown';
    }
}
customElements.define(LasalRuntimeSigDesignerPlaceholder.is, LasalRuntimeSigDesignerPlaceholder);