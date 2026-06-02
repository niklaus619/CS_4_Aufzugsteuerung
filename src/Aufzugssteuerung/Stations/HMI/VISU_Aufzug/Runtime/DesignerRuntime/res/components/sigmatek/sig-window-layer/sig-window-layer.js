import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';

class LasalRuntimeSigWindowLayer extends LasalRuntimeSigElement {
    static get is() {
        return "sig-window-layer";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <style include="sig-element-css">
                :host {
                    
                    background: none;
                    display: block;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
    
                .clearfix:after {
                    
                    @apply --clearfix
                }
    
                .sig-window-layer {
                    
                    position: relative;
                    width: 100%;
                    height: 100%;
                }
    
                .slot {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }
    
                #keyboard {
                    z-index: 400200;
                    display: none;
                    background-color: var(--theme-sig-window-layer-system-slot-background-color, transparent);
                }
    
                :host([showsystemlayer]) #system {
                    display: block;
                }
    
                #system {
                    z-index: 400100;
                    display: none;
                    background-color: var(--theme-sig-window-layer-system-slot-background-color, transparent);
                }
    
                :host([showkeyboardlayer]) #keyboard {
                    display: block;
                }
    
                #user {
                    display: block;
                }
            </style>
            <div id="layer" class="sig-window-layer clearfix">
                <div id="keyboard" class="slot">
                    <slot name="keyboard"></slot>
                </div>
                <div id="system" class="slot">
                    <slot name="system" class="slot"></slot>
                </div>
                <div id="user" class="slot">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    static get properties() {
        let props = {
            showkeyboardlayer: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            showsystemlayer: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
        return props;
    }
}
customElements.define(LasalRuntimeSigWindowLayer.is, LasalRuntimeSigWindowLayer);
