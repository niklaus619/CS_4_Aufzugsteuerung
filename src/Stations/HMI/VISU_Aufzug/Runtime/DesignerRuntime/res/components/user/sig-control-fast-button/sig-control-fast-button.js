// Import the Lasal Runtime base element into your component
// Import SigPolymer to use Polymer methods: html, afterNextRender, beforeNextRender, debouncer, timeOut
// or if your component's getter template() returns a HTML literal
import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
/*****************************************************************************************************
 *
 * @class LasalRuntimeSigFastButtonElement
 * @classdesc Implements sig-control-fast-button.
 * @version 01.00.000
 * @extends {LasalRuntimeSigElement}
 *
****************************************************************************************************/
export class LasalRuntimeSigFastButtonElement extends LasalRuntimeSigElement {
    /****************************************************************************************************
     * When the element is loaded, importMeta() assigns reference to the path from
     * which an element was imported to its importPath property.
     * Relative URLs in styles are automatically re-written to be relative to the importPath property.
     * You can use [[importPath]] in your component to load url resources
     ****************************************************************************************************/
    static get importMeta() {
        return import.meta;
    }
    /****************************************************************************************************
    * define the custom tag name
    *
    * @readonly
    * @static
    * @type {string}
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    static get is() {
        return "sig-control-fast-button";
    }
    /****************************************************************************************************
    * Return the component style and template as a template literal
    *
    * @readonly
    * @static
    * @property {number} onvalueuc - unconverted on value
    * @property {number} offvalueuc - unconverted off value
    * @property {null | number} interval - interval id
    * @property {null | number} timeout - timeout id
    * @property {string} btnimagepressed - pressed button image
    * @property {string} btntextpressed - pressed button text
    * @property {string} previewtext - preview button text
    * @property {number} startdelay - delay before starting the interval
    * @property {number} intervaltime - time the interval is executed in
    * @property {number} btnid - unique button id
    * @property {number | null} dpId - id of the configured value data point
    * @property {string} ipAddress - own ip address
    * @property {number} classClient - client id of the class client
    * @property {SigApi.ApiDatapointManager} dpApi - shortcut for data manager api
    * @property {SigApi.ApiProperties} propApi - shortcut for the properties api
    * @property {SigApi.ApiEventMediator} evtMedApi - shortcut for the properties api
    * @property {SigApi.ApiSigConst} constApi - shortcut for the constants api
    * @property {SigApi.ApiClientIdentification} clientApi - shortcut for the client identification api
    * @property {SigApi.ApiAccessSequence} accessApi - shortcut for the access sequence api
    * @property {SigApi.ApiWebsocketState} wsApi - shortcut for the web socket api
    * @property {HTMLElement | null} textForeground - computed text displayed in pressed state
    * @property {HTMLElement | null} textBackground - computed text displayed in released state
    * @property {object} evtIds - define for event ids
    * @property {object} evtVersions - define for event versions
    * @property {object} evtSubscriptions - define for event subscriptions
    *
    * @type {HTMLTemplateElement}
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    static get template() {
        return SigPolymer.html `
        <style include="sig-element-css">
            :host {
                /* Basic styling of the component */
                color: var(--theme-sig-control-fast-button-color, inherit);

                /* Basic box model settings */
                display: block;
                position: absolute;
                overflow: hidden;
            }

            :host * {
                /* Reset margins and paddings for child elements and turn of text selection */
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix
            }

            .sig-control-fast-button-base {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                text-decoration: inherit;
                cursor: pointer;
                box-sizing: border-box;
                border-radius: var(--theme-sig-control-fast-button-border-radius, 3px);
            }

            :host([btnstate="0"][bordergradient]) .sig-control-fast-button-base {
                background-image: linear-gradient(var(--theme-sig-control-fast-button-border-color-direction, to bottom), var(--theme-sig-control-fast-button-border-color, inherit), var(--theme-sig-control-fast-button-border-color-stop, var(--theme-sig-control-fast-button-border-color)));
            }

            :host(:not([btnstate="0"])[bordergradientpressed]) .sig-control-fast-button-base {
                background-image: linear-gradient(var(--theme-sig-control-fast-button-pressed-border-color-direction, to bottom), var(--theme-sig-control-fast-button-pressed-border-color, var(--theme-sig-control-fast-button-border-color)), var(--theme-sig-control-fast-button-pressed-border-color-stop, var(--theme-sig-control-fast-button-border-color-stop)));
            }

            #sig-control-fast-button-foreground {
                display: flex;
                height: 100%;
                width: 100%;
                flex-direction: var(--theme-sig-control-fast-button-flex-direction, row);
                justify-content: var(--theme-sig-control-fast-button-justify-content, space-evenly);
                align-items: var(--theme-sig-control-fast-button-align-items, center);

                background-image: linear-gradient(var(--theme-sig-control-fast-button-background-color-direction, to bottom),
                        var(--theme-sig-control-fast-button-background-color, inherit),
                        var(--theme-sig-control-fast-button-background-color-stop, var(--theme-sig-control-fast-button-background-color, inherit)));


                background-position-x: var(--theme-sig-control-fast-button-background-position-x, center);
                background-position-y: var(--theme-sig-control-fast-button-background-position-y, center);
                background-size: var(--theme-sig-control-fast-button-background-size, contain);
                background-repeat: no-repeat;

                border-width: var(--theme-sig-control-fast-button-border-width, 0px);
                border-color: var(--theme-sig-control-fast-button-border-color, inherit);
                border-style: var(--theme-sig-control-fast-button-border-style, solid);
                border-radius: var(--theme-sig-control-fast-button-border-radius, 3px);
            
                box-sizing: border-box;
            }

            #sig-control-fast-button-background {
                display: flex;
                height: 100%;
                width: 100%;
                flex-direction: var(--theme-sig-control-fast-button-flex-direction, row);
                justify-content: var(--theme-sig-control-fast-button-justify-content, space-evenly);
                align-items: var(--theme-sig-control-fast-button-align-items, center);

                background-image: linear-gradient(var(--theme-sig-control-fast-button-pressed-background-color-direction, to bottom),
                        var(--theme-sig-control-fast-button-pressed-background-color, inherit),
                        var(--theme-sig-control-fast-button-pressed-background-color-stop, var(--theme-sig-control-fast-button-pressed-background-color)));

                background-position-x: var(--theme-sig-control-fast-button-background-position-x, center);
                background-position-y: var(--theme-sig-control-fast-button-background-position-y, center);
                background-size: var(--theme-sig-control-fast-button-background-size, contain);
                background-repeat: no-repeat;

                color: var(--theme-sig-control-fast-button-pressed-color, inherit);

                border-width: var(--theme-sig-control-fast-button-border-width, 0px);
                border-color: var(--theme-sig-control-fast-button-pressed-border-color, var(--theme-sig-control-fast-button-border-color));
                border-style: var(--theme-sig-control-fast-button-border-style, solid);
                border-radius: var(--theme-sig-control-fast-button-border-radius, 3px);
            
                box-sizing: border-box;
            }

            :host([bordergradient]) #sig-control-fast-button-foreground,
            :host([bordergradientpressed]) #sig-control-fast-button-background {
                border-style: solid;
                border-color: transparent;
                background-clip: padding-box;
            }

            :host([shadowactive]) #sig-control-fast-button-foreground {
                box-shadow: inset 0 0 var(--theme-sig-control-fast-button-shadow-size, 5px) var(--theme-sig-control-fast-button-shadow-color, inherit);
            }

            :host([shadowpressedactive]) #sig-control-fast-button-background {
                box-shadow: inset 0 0 var(--theme-sig-control-fast-button-pressed-shadow-size, 0px) var(--theme-sig-control-fast-button-pressed-shadow-color, inherit);
            }

            :host(:not([btnstate="0"])) #sig-control-fast-button-foreground {
                display: none;
            }

            :host([btnstate="0"]) #sig-control-fast-button-background {
                display: none;
            }

            .textlabel {
                display: table-cell;
                cursor: inherit;
                width: auto;
                height: auto;
                text-decoration: inherit;
                align-self: var(--theme-sig-control-fast-button-text-align-self, inherit);
                padding: var(--theme-sig-control-fast-button-text-padding, 0px);
                margin: var(--theme-sig-control-fast-button-text-margin, 0px);
                text-align: var(--theme-sig-control-fast-button-text-align-horizontal, center);
            }

            .image {
                display: flex;
                pointer-events: none;
                align-self: var(--theme-sig-control-fast-button-image-align-self, inherit);
                padding: var(--theme-sig-control-fast-button-image-padding, 0px);
                margin: var(--theme-sig-control-fast-button-image-margin, 0px);
                align-items: center;
            }

            .image img {
                height: var(--theme-sig-control-fast-button-image-height, auto);
                width: var(--theme-sig-control-fast-button-image-width, auto);
            }

            #boxshadowcontainer {
                position: absolute;
                display: none;
                background-color: transparent;
                width: 100%;
                height: var(--child-height);
            }
    
            :host([shadowactive]:not([listvisible])) #boxshadowcontainer {
                display: block;
                box-shadow: inset 0 0 var(--theme-sig-control-fast-button-shadow-size, 0px) var(--theme-sig-control-fast-button-shadow-color, inherit);
            }
    
            :host([shadowpressedactive][listvisible]) #boxshadowcontainer {
                display: block;
                box-shadow: inset 0 0 var(--theme-sig-control-fast-button-pressed-shadow-size, 0px) var(--theme-sig-control-fast-button-pressed-shadow-color, inherit);
            }

            .bgcontainer {
                position: absolute;
                height:100%;
                width:100%;
                top:0;
                left: 0;
                box-sizing: border-box;
                padding: var(--theme-sig-control-fast-button-background-padding);
            }

            .backgroundimage {
                position: relative;
                height: 100%;
                width: 100%;
                
                background-position-x: var(--theme-sig-control-fast-button-background-position-x, center);
                background-position-y: var(--theme-sig-control-fast-button-background-position-y, center);
                background-size: var(--theme-sig-control-fast-button-background-size, contain);
                background-repeat: no-repeat;
                background-origin: content-box;
                box-sizing: border-box;
            }

            #sig-control-fast-button-foreground .backgroundimage {
                background-image: var(--theme-sig-control-fast-button-background-image, none);
            }

            #sig-control-fast-button-background .backgroundimage {
                background-image: var(--theme-sig-control-fast-button-pressed-background-image, var(--theme-sig-control-fast-button-background-image, none));
            }

            /* hide items which aren't set */
            :host([btntextc=""]) #sig-control-fast-button-foreground .textlabel,
            :host([btntextpressedc=""]) #sig-control-fast-button-background .textlabel,
            :host([btnimage=""]) #sig-control-fast-button-foreground .image,
            :host([btnimagepressedc=""]) #sig-control-fast-button-background .image {
                display: none;
            }
        </style>

        <div class="sig-control-fast-button-base clearfix" on-down="_handleDown" on-up="_handleUp">
            <div id="sig-control-fast-button-background">
                <div class="bgcontainer">
                    <div class="backgroundimage"></div>
                </div>
                <div class="textlabel"></div>
                <div class="image">
                    <img src="[[btnimagepressedc]]">
                </div>
            </div>
            <div id="sig-control-fast-button-foreground">
                <div class="bgcontainer">
                    <div class="backgroundimage"></div>
                </div>
                <div class="textlabel"></div>
                <div class="image">
                    <img src="[[btnimage]]">
                </div>
            </div>
        </div>
        `;
    }
    /****************************************************************************************************
     * define the main porperties of the component
     * reflected property names should always be lower case so it can be used directly on the element as an attribute
     *
     * @readonly
     * @static
     * @type {object}
     * @memberof LasalRuntimeSigFastButtonElement
     *
     * @property {String} opmode                    - Operating mode of button.
     * @property {String} btntext                   - The text source of the button.
     * @property {String} btntextc                  - Computed btntext.
     * @property {String} btnimage                  - The Image Source of the Button. Some svg images cannot be displayed if Height and Width are set to auto. In this case, the desired height and width has to be set manually.
     * @property {String} btnimagepressedc          - Button image pressed computed.
     * @property {String} btntextpressedc           - Button text pressed computed.
     * @property {Number} btnstate                  - Button state 0 .. released; 1 .. pressed
     * @property {Boolean} shadowactive             - Activates the border shadow of the component.
     * @property {Boolean} shadowpressedactive      - Activates the border shadow of the component in the pressed state.
     * @property {Boolean} bordergradient           - Activates the border gradient of the component. Note: If active, shorthand values for the border width are invalid.
     * @property {Boolean} bordergradientpressed    - Activates the border gradient of the component in pressed state. Note: If active, shorthand values for the border width are invalid.
     * @property {Boolean} previewpressedstate      - If true the button is previewed in pressed state.
    ****************************************************************************************************/
    static get properties() {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            opmode: {
                type: Number,
                value: 0,
                observer: '_opModeChanged',
                notify: true
            },
            btntextc: {
                type: String,
                computed: '_computeText(btntext,previewtext,isstylepreview)',
                reflectToAttribute: true
            },
            btnimage: {
                type: String,
                value: '',
                reflectToAttribute: true
            },
            btnimagepressedc: {
                type: String,
                computed: '_computePressedImage(btnimage, btnimagepressed)',
                reflectToAttribute: true
            },
            btntextpressedc: {
                type: String,
                computed: '_computePressedText(btntext,btntextpressed,previewtext,isstylepreview)',
                reflectToAttribute: true
            },
            btnstate: {
                type: Number,
                value: 0,
                reflectToAttribute: true
            },
            shadowactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            shadowpressedactive: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bordergradient: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            bordergradientpressed: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            previewpressedstate: {
                type: Boolean,
                value: false,
                observer: '_previewStateChanged'
            }
        };
        return props;
    }
    /****************************************************************************************************
    * Creates an instance of LasalRuntimeSigFastButtonElement.
    * called when the element has been created, but before property values are set and local DOM is initialized
    *
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    constructor() {
        super();
        this.onvalueuc = 1;
        this.offvalueuc = 0;
        this.btntext = '';
        this.btntextpressed = '';
        this.previewtext = '-- Fast Button --';
        this.startdelay = 0;
        this.intervaltime = 100;
        this.interval = null;
        this.timeout = null;
        this.dpId = null;
        //init button id to signal invalid value
        this.btnid = 0xFFFFFFFF;
        //define event infos
        this.evtIds = {
            major: 0x8009,
            getClassClient: 0x0,
            setClassClient: 0x1,
            buttonStart: 0x2
        };
        this.evtVersions = {
            getClassClient: 0x1,
            setClassClient: 0x1,
            buttonStart: 0x1
        };
        this.evtSubscriptions = {
            setClassClient: null
        };
        //create shortcuts for apis
        this.dpApi = window.sigApi.datapointManager;
        this.propApi = window.sigApi.properties;
        this.evtMedApi = window.sigApi.eventMediator;
        this.constApi = window.sigApi.SIG_CONST;
        this.clientApi = window.sigApi.clientIdentification;
        this.accessApi = window.sigApi.accessSequence;
        this.wsApi = window.sigApi.websocketState;
        //work with unconverted values
        this.addPredefProps([
            {
                src: 'onvalue',
                dest: 'onvalueuc',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_UNCONVERTED_VALUE
            },
            {
                src: 'offvalue',
                dest: 'offvalueuc',
                type: this.constApi.PROP_PREDEF_PROPS_TYPE_UNCONVERTED_VALUE
            }
        ]);
    }
    /****************************************************************************************************
    * called after property default values are set and local DOM is initialized
    *
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    ready() {
        super.ready();
        // get reference to text elements and update the button texts
        this.textForeground = this.$['sig-control-fast-button-foreground']?.querySelector('.textlabel');
        this.textBackground = this.$['sig-control-fast-button-background']?.querySelector('.textlabel');
        this._updateButtonText(this.textForeground, this.btntextc);
        this._updateButtonText(this.textBackground, this.btntextpressedc);
        if (!this.isdesignmode) {
            this._registerEventListeners();
            //wait till access sequence ready
            Promise.all([
                window.eventReadyPromises.get(this.constApi.EVENT_READY_PROMISE_WS_READY),
                window.eventReadyPromises.get(this.constApi.EVENT_READY_PROMISE_ACCESS_SEQUENCE_READY)
            ]).then(() => {
                this._getClassClient();
            }).catch((error) => {
                this._log('ready(): error at event ready promises -> ' + error, 'ERROR');
            });
        }
        else {
            //set button state depending on preview selection
            if (this.previewpressedstate) {
                this.btnstate = 1;
            }
            else {
                this.btnstate = 0;
            }
        }
    }
    /****************************************************************************************************
     * method is used to get the own ip and send a get class client request
     *
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _getClassClient() {
        //get connection info and send get class client event to clients
        this.clientApi.getClientConnectionInfo().then((info) => {
            //save own ip
            this.ipAddress = info.ip;
            //send get class client event
            this._sendGetClassClient();
        }).catch((error) => {
            this._log('ready(): error getting client info -> ' + error, 'ERROR');
        });
    }
    /****************************************************************************************************
     * Method is used to register all needed event listeners
     *
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _registerEventListeners() {
        //event listener for dashboard change event
        this.sigAddEventListener('APPROUTE_CHG', (maID, miID, message) => {
            //check if interval or timeout active
            if ((this.interval !== null) || (this.timeout !== null)) {
                //reset button state
                this.btnstate = 0;
                //stop writing on datapoint and set it to the off value
                if (this.opmode === 0) {
                    this._stopAutorepeat();
                }
            }
        }, 'runtimeEvent');
        //event listener for websocket state changed
        this.sigAddEventListener('WS_STATE_CHG', (maID, miID, message) => {
            //check if connection open
            if (message.state === this.constApi.STAT_WS_OPEN) {
                //check if access sequence ready
                if (this.accessApi.isReady()) {
                    this._getClassClient();
                }
            }
        }, 'runtimeEvent');
        //event listener for access sequence ready state changed
        this.sigAddEventListener('ACCESS_SEQUENCE_READY_STATE_CHANGED', (maID, miID, ready) => {
            //check if ready
            if (ready) {
                //check if websocket open
                if (this.wsApi.getState() === this.constApi.STAT_WS_OPEN) {
                    this._getClassClient();
                }
            }
        }, 'runtimeEvent');
        //event listener for class client event
        this.evtSubscriptions.setClassClient = this.evtMedApi.subscribeWithId(this.evtIds.major, this.evtIds.setClassClient, (maId, miID, msg) => {
            this._handleSetClassClient(msg);
        });
    }
    /****************************************************************************************************
     * Method is used to send get class client event to all clients
     *
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _sendGetClassClient() {
        //calc buffer size for data view
        //4 byte version + 4 byte payload data offset
        let len = 8;
        //4 byte ip address
        len += 4;
        const buffer = new ArrayBuffer(len);
        let dv = new DataView(buffer);
        //set version and data offset
        dv.setUint32(0, this.evtVersions.getClassClient, true);
        dv.setUint32(4, 8, true);
        //set ip address
        const addressParts = this.ipAddress.split('.');
        let offset = 8;
        for (let i = 0; i < addressParts.length; i++) {
            dv.setUint8(offset, parseInt(addressParts[i]));
            offset += 1;
        }
        //send event to all clients
        this.evtMedApi.publishToStationWithId(this.evtIds.major, this.evtIds.getClassClient, this.constApi.TID_CLIENTS_ALL, dv);
    }
    /****************************************************************************************************
     * Method gets called if set class client event was received
     *
     * @param {DataView} dv - data of the event
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _handleSetClassClient(dv) {
        //get the source client id of the event
        const clientID = dv.getUint16(8, true);
        //check for version of event (after sig header)
        const version = dv.getUint32(16, true);
        if (version === this.evtVersions.setClassClient) {
            let dataOffset = dv.getUint32(20, true);
            //get number of ip addresses
            const noOfIPs = dv.getUint8(dataOffset + 16);
            dataOffset += 1;
            if (noOfIPs > 0) {
                for (let i = 0; i < noOfIPs; i++) {
                    //get ip adresse
                    let addressParts = [];
                    for (let j = 0; j < 4; j++) {
                        addressParts.push(dv.getUint8(dataOffset + 16));
                        dataOffset += 1;
                    }
                    //join to ip address
                    const ipAddress = addressParts.join('.');
                    //check if ip address corresponds with own ip
                    if (this.ipAddress === ipAddress) {
                        //save client and set operating state
                        this.classClient = clientID;
                        this.opmode = 1;
                        break;
                    }
                }
            }
        }
        else {
            this._log('_handleSetClassClient(): wrong version of set class client event received', 'ERROR');
        }
    }
    /****************************************************************************************************
     * Method is used to send the button start event to the corresponding class client
     *
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    async _sendButtonStart() {
        // get position
        const rect = this.getBoundingClientRect();
        //calc buffer size for data view
        //4 byte version + 4 byte payload data offset
        let len = 8;
        //4 byte button id
        len += 4;
        //4 byte for each left, top, width and height
        len += 16;
        //4 byte var id, 4 byte lasal id
        len += 8;
        //1 byte data type
        len += 1;
        //4 byte onvalue, 4 byte offvalue
        len += 8;
        //4 byte start delay
        len += 4;
        //4 byte interval time
        len += 4;
        const buffer = new ArrayBuffer(len);
        let dv = new DataView(buffer);
        //set version and data offset
        dv.setUint32(0, this.evtVersions.buttonStart, true);
        dv.setUint32(4, 8, true);
        let offset = 8;
        //set button id
        dv.setUint32(offset, this.btnid, true);
        offset += 4;
        //set dimensions (left, top, width, height)
        dv.setUint32(offset, rect.left, true);
        offset += 4;
        dv.setUint32(offset, rect.top, true);
        offset += 4;
        dv.setUint32(offset, rect.width, true);
        offset += 4;
        dv.setUint32(offset, rect.height, true);
        offset += 4;
        //set var id
        dv.setUint32(offset, (this.dpId !== null) ? this.dpId : 0xFFFFFFFF, true);
        offset += 4;
        let dataType = -1;
        if (this.dpId !== null) {
            //get dp infos
            try {
                const dpInfos = (await this.dpApi.getDpInfo(this.dpId))[0];
                const lasalID = dpInfos.getLasalId();
                //set lasal id
                dv.setUint32(offset, lasalID, true);
                //get datatype
                switch (dpInfos.getTypeRefId()) {
                    //------------------------------------------------------------------------------------------
                    //-- Signed double integer
                    //------------------------------------------------------------------------------------------
                    case this.constApi.STD_TYPE_DINT:
                        dataType = 0;
                        break;
                    //------------------------------------------------------------------------------------------
                    //-- Unsigned double integer
                    //------------------------------------------------------------------------------------------
                    case this.constApi.STD_TYPE_UDINT:
                    case this.constApi.STD_TYPE_HDINT:
                    case this.constApi.STD_TYPE_BDINT:
                        dataType = 1;
                        break;
                    //------------------------------------------------------------------------------------------
                    //-- Float 32
                    //------------------------------------------------------------------------------------------
                    case this.constApi.STD_TYPE_REAL:
                        dataType = 2;
                        break;
                    default:
                        this._log('_sendButtonStart(): unsupported data type', 'ERROR');
                }
            }
            catch (error) {
                this._log('_sendButtonStart(): error getting dp infos -> ' + error.errortxt, 'ERROR');
            }
        }
        offset += 4;
        //check if data type was set -> otherwise evaluate on/offvalue
        dataType = this._evalDataType(this.onvalueuc, this.offvalueuc);
        //set data type
        dv.setUint8(offset, dataType);
        offset += 1;
        switch (dataType) {
            //DINT
            case 0:
                //set on value
                dv.setInt32(offset, this.onvalueuc, true);
                offset += 4;
                //set off value
                dv.setInt32(offset, this.offvalueuc, true);
                offset += 4;
                break;
            //UDINT
            case 1:
                //set on value
                dv.setUint32(offset, this.onvalueuc, true);
                offset += 4;
                //set off value
                dv.setUint32(offset, this.offvalueuc, true);
                offset += 4;
                break;
            //REAL
            case 2:
                //set on value
                dv.setFloat32(offset, this.onvalueuc, true);
                offset += 4;
                //set off value
                dv.setFloat32(offset, this.offvalueuc, true);
                offset += 4;
                break;
            default:
                this._log('_sendButtonStart(): unknown data type', 'ERROR');
                return;
        }
        //set start delay
        dv.setUint32(offset, this.startdelay, true);
        offset += 4;
        //set interval time
        dv.setUint32(offset, this.intervaltime, true);
        offset += 4;
        //send button start
        this.evtMedApi.publishToStationWithId(this.evtIds.major, this.evtIds.buttonStart, this.classClient, dv);
    }
    /****************************************************************************************************
     * Method is used to get the data type evaluating given values
     *
     * @param {number} onValue - on value
     * @param {number} offValue - off value
     * @return {*}  {number} - 0 .. DINT, 1 .. UDINT, 2 .. REAL
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _evalDataType(onValue, offValue) {
        //check if on or off value is a real
        if (((onValue % 1) !== 0) || ((offValue % 1) !== 0)) {
            //2 means float value
            return 2;
        }
        //check for unsigned only possible if number is bigger maximum signed double integer value
        else if ((onValue > 2147483647) || (offValue > 2147483647)) {
            return 1;
        }
        return 0;
    }
    /****************************************************************************************************
    * A method that handles the on-down event on button.
    *
    * @param {Event} event on-down event.
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _handleDown(event) {
        if (!this.isdesignmode) {
            //display button pressed
            this.btnstate = 1;
            // get datapoint from property
            this.dpId = this._getDatapoint();
            //check for operating mode
            if (this.opmode === 0) {
                //check if dp configured
                if (this.dpId === null)
                    return;
                //set timeout and write datapoint in interval
                this._setInterval();
            }
            else {
                //send event to class
                this._sendButtonStart();
            }
        }
    }
    /****************************************************************************************************
    * A method that handles the on-up event on button
    *
    * @param {Event} event on-up event.
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _handleUp(event) {
        if (!this.isdesignmode) {
            this.btnstate = 0;
            //stop writing on datapoint and set it to the off value
            if (this.opmode === 0) {
                this._stopAutorepeat();
            }
        }
    }
    /*****************************************************************************************************
    * Sets the interval that dispatches defined events.
    *
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _setInterval() {
        this.timeout = this.sigSetTimeout(() => {
            this.dpApi.writeDataPoint(this.dpId, this.onvalueuc);
            this.interval = this.sigSetInterval(() => {
                // write on datapoint in interval
                this.dpApi.writeDataPoint(this.dpId, this.onvalueuc);
            }, this.intervaltime);
        }, this.startdelay);
    }
    /****************************************************************************************************
     * Method is used to get the datapoint configured at the value property
     *
     * @return {*}  {(SigApi.Datapoint | null)} - datapoint or null if not found
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _getDatapoint() {
        if (this.propApi !== null) {
            const prop = this.propApi.getProperty(this.id, 'value');
            if (prop !== null) {
                //check if datapoint could be resolved in prop by checking if getDatapoint is available
                //if e.g., only a scheme is set and no scheme branch is active this is the case
                if (prop.getDatapoint === undefined)
                    return null;
                //get datapoint
                const dp = prop.getDatapoint();
                if (dp !== null) {
                    return dp.getId();
                }
            }
            else {
                this._log('_getDatapoint(): prop not set', 'INFO');
            }
        }
        else {
            this._log('_getDatapoint(): invalid api', 'ERROR');
        }
        return null;
    }
    /****************************************************************************************************
    * Clears the interval that dispatches events.
    *
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _clearInterval() {
        if (this.timeout !== null) {
            this.sigClearTimeout(this.timeout);
            this.timeout = null;
        }
        if (this.interval !== null) {
            this.sigClearInterval(this.interval);
            this.interval = null;
        }
    }
    /****************************************************************************************************
    * Autorepeat interval is cleared if a new route is set.
    *
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _stopAutorepeat() {
        this._clearInterval();
        //set to off value
        if (this.dpId !== null)
            this.dpApi.writeDataPoint(this.dpId, this.offvalueuc);
    }
    /****************************************************************************************************
    * Computed property method that computes the button text.
    *
    * @param {string} normal Button text from the text list.
    * @param {string} _previewtext Preview button text.
    * @param {boolean} _isstylepreview True, if buton is in previewmode.
    * @returns {String} The computed property.
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _computeText(normal, _previewtext, _isstylepreview) {
        const newText = (normal === '' && this.isdesignmode && _isstylepreview) ? _previewtext : normal;
        // show the new text as multiline if it contains <br>
        this._updateButtonText(this.textForeground, newText);
        return newText;
    }
    /****************************************************************************************************
    * Computes the pressed text
    * If there is an text for the pressed state that is used,
    * otherwise the normal text is used
    *
    * @param {string} normal Pressed normal text.
    * @param {string} pressed Pressed button text.
    * @param {string} _previewtext The preview text.
    * @param {boolean} _isstylepreview Indicator if style is in preview.
    * @return {string} The computed pressed text.
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _computePressedText(normal, pressed, _previewtext, _isstylepreview) {
        const newText = (pressed === '') ? ((normal === '' && this.isdesignmode && _isstylepreview) ? _previewtext : normal) : pressed;
        // show the new text as multiline if it contains <br>
        this._updateButtonText(this.textBackground, newText);
        return newText;
    }
    /****************************************************************************************************
    * Computes the pressed text
    * If there is an image for the pressed state that is used,
    * otherwise the normal image is used
    *
    * @param {string} [normal=''] Normal button image src.
    * @param {string} [pressed=''] Pressed button image src.
    * @return {string} Computed pressed image.
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _computePressedImage(normal = '', pressed = '') {
        return (pressed === '') ? normal : pressed;
    }
    /****************************************************************************************************
     * Method gets called if the operating mode changes
     *
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _opModeChanged() {
        //stop auto repeat and reset value
        this._stopAutorepeat();
    }
    /****************************************************************************************************
    * Called when changing the preview value in the designer
    *
    * @memberof LasalRuntimeSigFastButtonElement
    ****************************************************************************************************/
    _previewStateChanged() {
        if (this.isdesignmode) {
            if (this.previewpressedstate) {
                this.btnstate = 1;
            }
            else {
                this.btnstate = 0;
            }
        }
    }
    /****************************************************************************************************
     * Updates the texts of the button foreground or background depending on the parameters and
     * if multiple lines are needed
     *
     * @param {(HTMLElement | null)} textElement
     * @param {string} newText
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    _updateButtonText(textElement, newText) {
        if (textElement) {
            // use empty string instead of undefined or null
            if (!newText)
                newText = '';
            // check for multiline text
            if (newText.includes('<br>')) {
                textElement.innerText = '';
                textElement.innerHTML = newText;
            }
            else {
                textElement.innerHTML = '';
                textElement.innerText = newText;
            }
        }
    }
    /****************************************************************************************************
     * Method gets called when control is disconnected from dom -> use it to clean up eventlisteners & co
     *
     * @memberof LasalRuntimeSigFastButtonElement
     ****************************************************************************************************/
    disconnectedCallback() {
        super.disconnectedCallback();
        //remove event listener
        if (this.evtSubscriptions.setClassClient !== null) {
            this.evtMedApi.unsubscribeWithId(this.evtIds.major, this.evtIds.setClassClient, this.evtSubscriptions.setClassClient);
        }
    }
}
customElements.define(LasalRuntimeSigFastButtonElement.is, LasalRuntimeSigFastButtonElement);
//# sourceMappingURL=sig-control-fast-button.js.map