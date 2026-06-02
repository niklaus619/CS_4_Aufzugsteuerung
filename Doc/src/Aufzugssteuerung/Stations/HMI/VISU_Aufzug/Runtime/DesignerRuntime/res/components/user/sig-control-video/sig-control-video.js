import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
/****************************************************************************************************
* @export
* @class LasalRuntimeSigVideo
* @classdesc Implements and exports sig-control-video component.
* @version 02.01.000
* @extends {LasalRuntimeSigElement}
*
* @property {String} poster The relative path or absolute URL of the poster image.
* @property {Boolean} autoplay If true, the video starts automatically if the browser allows it.
* @property {Boolean} loop If true, the video restarts automatically.
* @property {Number} muted If the value is not 0, the video sound is muted.
* @property {Boolean} controlsState State of the controls of the component.
****************************************************************************************************/
export class LasalRuntimeSigVideo extends LasalRuntimeSigElement {
    /****************************************************************************************************
    * Returns the component's registered tag name.
    *
    * @readonly
    * @static
    * @returns {string} The component's tag name.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    static get is() {
        return "sig-control-video";
    }
    /****************************************************************************************************
    * Returns the import path URL used by Polymer.
    *
    * @readonly
    * @static
    * @returns {ImportMeta} The import path URL.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    static get importMeta() {
        return import.meta;
    }
    /****************************************************************************************************
    * Returns the HTML literal of the component.
    *
    * @readonly
    * @static
    * @returns {HTMLTemplateElement} The template literal of the component.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    static get template() {
        return SigPolymer.html `
        <style include="sig-element-css">
            :host {
                /* Basic styling of the component */
                color: var(--theme-sig-control-video-color, inherit);
                background-color: var(--theme-sig-control-video-background-color, inherit);
                background-image: var(--theme-sig-control-video-background-image, none);
                background-repeat: var(--theme-sig-control-video-background-repeat, repeat);
                border-width: var(--theme-sig-control-video-border-width, 0px);
                border-color: var(--theme-sig-control-video-border-color, inherit);
                border-style: var(--theme-sig-control-video-border-style, none);
                border-radius: var(--theme-sig-control-video-border-radius, 0px);
            
                /* Basic box model settings */
                display: var(--theme-sig-control-video-display, block);
                position: var(--theme-sig-control-video-position, absolute);
                /* top: var(--theme-sig-control-video-top, auto);
                left: var(--theme-sig-control-video-left, auto);
                width: var(--theme-sig-control-video-width, auto);
                height: var(--theme-sig-control-video-height, auto); */
                margin: var(--theme-sig-control-video-margin, 0);
                padding: var(--theme-sig-control-video-padding, 0);
                overflow: var(--theme-sig-control-video-overflow, hidden);
            }
        
            :host * {
                /* Reset margin and padding for child elements and turn off video selection */
                @apply --novideoselect;
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                /* Import the global clearfix css mixin */
                @apply --clearfix
            }

            .sig-control-video {
                /* should be relative for use in designer */
                position: relative;
                width: 100%;
                height: 100%;
            }
        
            .video {
                width: 100%;
                height: auto;
                max-height: 100%;
            }
        
            #disabled {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: none;
            }
            
            #controls {
                cursor: pointer;
            }
            
            /* Fix to hide download button */
            .video::-internal-media-controls-download-button {
                display: none;
            }
            
            .video::-webkit-media-controls-enclosure {
                overflow: hidden;
            }
            
            .video::-webkit-media-controls-panel {
                width: calc(100% + 30px);
            }
            
            :host([isdesignmode]) #disabled {
                display: block;
                cursor: unset;
            }
            
            :host([isdesignmode]) .sig-control-video {
                background: #000 url(preview.svg) no-repeat center center;
                background-size: 50px 50px;
                cursor: unset;
            }
            
            #overlay {
                background: transparent url(play.svg) no-repeat center center;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                cursor: pointer;
            }
            
            :host([isplaying]) #overlay {
                display: none;
            }
            
            :host([controls]) #overlay,
            :host([isdesignmode]) #overlay {
                display: none !important;
                cursor: unset;
            }
        </style>
        <div class="sig-control-video clearfix">
            <video id="video" class="video" controls="[[controls]]" on-tap="_togglePlayback" poster="[[poster]]" autoplay="[[autoplay]]" muted="[[muted]]" loop="[[loop]]">
                    Sorry but your browser does not support embedded videos.
            </video>
            <div id="overlay" on-tap="_togglePlayback"></div>
            <div id="disabled"></div>
        </div>`;
    }
    /****************************************************************************************************
    * Returns the defined Polymer properties of the component.
    *
    * @readonly
    * @static
    * @returns {object} The defined Polymer properties.
    * @memberof LasalRuntimeSigVideo
    *
    * @property {String}   computedsrc     - The relative path or absolute URL of the video.
    * @property {Boolean}  controls        - Defines whether the component should have playback controls.
    * @property {Boolean}  isplaying       - Denotes whether the video is currently being played.
    ****************************************************************************************************/
    static get properties() {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            computedsrc: {
                type: String,
                value: '',
                computed: "_computeSrc(src, externalsrc)"
            },
            controls: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            isplaying: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            }
        };
        return props;
    }
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigVideo.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    constructor() {
        super();
        this.poster = '';
        this.autoplay = false;
        this.loop = false;
        this.muted = 0;
    }
    /****************************************************************************************************
    * This callback is called when the component is connected in the DOM.
    *
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    connectedCallback() {
        super.connectedCallback();
        this.controlsState = this.controls;
        this.sigAddEventListener('pause', (e) => {
            this._dispatchPaused(e);
        }, 'jsEvent', this.$.video);
        this.sigAddEventListener('playing', (e) => {
            this._dispatchPlaying(e);
        }, 'jsEvent', this.$.video);
        this.sigAddEventListener('ended', (e) => {
            this._dispatchEnded(e);
        }, 'jsEvent', this.$.video);
        // prevent default click event on video, so we can implement this functionality with 'tap'
        this.sigAddEventListener('click', (event) => {
            event.preventDefault();
        }, 'jsEvent', this.$.video);
    }
    /****************************************************************************************************
    * Starts the video playing.
    *
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    play() {
        this.$.video.play().catch((error) => {
            // play might not be allowed at the first interaction with the document
            this._log(error, 'ERROR');
        });
    }
    /****************************************************************************************************
    * Pauses the video playing.
    *
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    pause() {
        this.$.video.pause();
    }
    /****************************************************************************************************
    * Stops the video playing.
    *
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    stop() {
        // there's no stop, so we just pause it and reset the time
        this.$.video.pause();
        this.$.video.currentTime = 0;
    }
    /****************************************************************************************************
     * Called when src or external src changed. It is used to compute the final source which should
     * be used.
     *
     * @param {string} source - normal source
     * @param {string} externalSource - external source
     * @return {*}  {string} - computed source
     * @memberof LasalRuntimeSigVideo
     ****************************************************************************************************/
    _computeSrc(source, externalSource) {
        if (this.isdesignmode)
            return '';
        //get final source
        let finalSrc = externalSource ? externalSource : source;
        //set default value to avoid error in console
        if (!finalSrc)
            finalSrc = '//:0';
        //check if source changed
        if (finalSrc !== this.computedsrc) {
            //remove is playing attribute
            this.isplaying = false;
            this.$.video.src = finalSrc;
            this.$.video.load();
        }
        return finalSrc;
    }
    /****************************************************************************************************
    * Dispatches the event 'paused' when the JavaScript event 'pause' is fired.
    *
    * @param {Event} e The fired event when the video is paused either by user action or programmatically.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    _dispatchPaused(e) {
        this.isplaying = false;
        this._dispatchEvent('paused');
    }
    /****************************************************************************************************
    * Dispatches the event 'playing' when the JavaScript event 'playing' is fired.
    *
    * @param {Event} e The fired event when the video starts playing after being paused by user action or stopped for buffering.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    _dispatchPlaying(e) {
        this.isplaying = true;
        this._dispatchEvent('playing');
    }
    /****************************************************************************************************
    * Dispatches the event 'ended' when the JavaScript event 'ended' is fired.
    *
    * @param {Event} e The fired event when the video has reached the end.
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    _dispatchEnded(e) {
        this.isplaying = false;
        this._dispatchEvent('ended');
    }
    /****************************************************************************************************
    * The "on-tap" JavaScript event handler. It toggles the video playing and pausing.
    *
    * @memberof LasalRuntimeSigVideo
    ****************************************************************************************************/
    _togglePlayback() {
        if (this.isplaying) {
            this.pause();
        }
        else {
            this.play();
        }
    }
}
customElements.define(LasalRuntimeSigVideo.is, LasalRuntimeSigVideo);
//# sourceMappingURL=sig-control-video.js.map