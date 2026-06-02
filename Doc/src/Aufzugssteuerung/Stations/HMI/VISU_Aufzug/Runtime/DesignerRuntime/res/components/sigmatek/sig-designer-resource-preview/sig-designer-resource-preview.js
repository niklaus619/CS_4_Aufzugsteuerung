import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import '../sig-designer-resource-detail/sig-designer-resource-detail.js';

export class LasalRuntimeSigResourcePreview extends LasalRuntimeSigElement {

    static get is() {
        return "sig-designer-resource-preview";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                
                display: block;
                position: absolute;
                
                width:100%;
                height:100%;
            }

            :host * {
                
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .wrapper {
                width: 100%;
                height: 100%;
                background: var(--theme-sig-designer-resource-preview-background-color, white);
                color: var(--theme-sig-designer-resource-preview-color, black);
            }
        </style>
        <div class="wrapper clearfix">
        
        <sig-designer-resource-detail id="resourceDetail"></sig-designer-resource-detail>
        </div>`;
    }

    static get properties() {
        let props = {
            resourceDetail: {
                type: Object,
                value: () => { return {} },
                observer: '_resourceDetailChanged'
            },
            resourceDetailConfig: {
                type: Object,
                value: () => { return {} },
                observer: '_resourceDetailConfigChanged'
            }
        };
        return props;
    }

    _resourceDetailChanged(newDetail, oldDetail) {
        if (this.$.resourceDetail)
            this.$.resourceDetail.detail = newDetail;
    }

    _resourceDetailConfigChanged(newConfig, oldConfig) {
        if (this.$.resourceDetail)
            this.$.resourceDetail.config = newConfig;
    }

}
customElements.define(LasalRuntimeSigResourcePreview.is, LasalRuntimeSigResourcePreview);
