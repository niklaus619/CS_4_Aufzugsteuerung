import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';

/****************************************************************************************************
 * @export
 * @class LasalRuntimeSigControlMenuInput
 * @version 03.00.000
 * @extends {LasalRuntimeSigElement}
 * 
 * @property {SigApi.MenuItem} currentMenuItem Current MenuItem of the menu.
 * @property {Number} currentMenuItemObs Observer of the current MenuItem.
 * @property {Boolean} updateActiveOptionToDefaultText True - sets activeOption to defaulttext
 * @property {String} activeoption Text of the active item.
 * @property {String} caretimage The image which is used to display the caret.
 * @property {String} caretimageactive The image which is used to display the caret in active state.
 * @property {SigApi.ApiMenuManager} menuApi The Sigapi MenuManager Api.
 * @property {SigApi.ApiDefaultStyleManager} dsApi The SigApi DefaultStyleMangager Api.
 * @property {Boolean} requiredPropertiesReady True when the propertys are read.
 * @property {String} iconsrc Source url of the icon.
****************************************************************************************************/
export class LasalRuntimeSigControlMenuInput extends LasalRuntimeSigElement {
    
    /****************************************************************************************************
     * Returns the component's registered tag name.
     *
     * @readonly
     * @static
     * @returns {String} The control's tag name.
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    static get is(): string {
        return "sig-control-menu-input";
    }

    /****************************************************************************************************
     * Returns the import path URL used by Polymer.
     *
     * @readonly
     * @static
     * @returns {ImportMeta} The import path URL.
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    static get importMeta(): ImportMeta { return import.meta; }

    /****************************************************************************************************
     * Returns the HTML literal of the component.
     *
     * @readonly
     * @static
     * @returns {HTMLTemplateElement} The template literal of the component.
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    static get template(): HTMLTemplateElement {
        return SigPolymer.html`
        <style include="sig-element-css">
            :host {
                color: var(--theme-sig-control-menu-input-color, rgba(42, 42, 42, 1));
                background-color: var(--theme-sig-control-menu-input-background-color, rgba(215, 215, 215, 1));

                border-width: var(--theme-sig-control-menu-input-border-width, 0px);
                border-color: var(--theme-sig-control-menu-input-border-color, transparent);
                border-style: var(--theme-sig-control-menu-input-border-style, none);

                border-top-left-radius: var(--theme-sig-control-menu-input-border-radius-tl, var(--theme-sig-control-menu-input-border-radius, 0));
                border-top-right-radius: var(--theme-sig-control-menu-input-border-radius-tr, var(--theme-sig-control-menu-input-border-radius, 0));
                border-bottom-right-radius: var(--theme-sig-control-menu-input-border-radius-br, var(--theme-sig-control-menu-input-border-radius, 0));
                border-bottom-left-radius: var(--theme-sig-control-menu-input-border-radius-bl, var(--theme-sig-control-menu-input-border-radius, 0));

                display: var(--theme-sig-control-menu-input-display, block);
                position: var(--theme-sig-control-menu-input-position, absolute);

                padding: var(--theme-sig-control-menu-input-padding, 0);
                overflow: var(--theme-sig-control-menu-input-overflow, hidden);
                margin: 0;
                text-overflow: ellipsis;
            }

            :host * {    
                @apply --notextselect;
                margin: 0;
                padding: 0;
            }

            .clearfix:after {
                @apply --clearfix;
            }

            .sig-control-menu-input-element {    
                position: relative;
                width: 100%;
                height: 100%;
                cursor: pointer;
                overflow: hidden;
                text-decoration: inherit;

                display: flex;
                justify-content: center;
                align-items: center;

                border: none;
                border-top-left-radius: calc((var(--theme-sig-control-menu-input-border-radius-tl, var(--theme-sig-control-menu-input-border-radius, 0)) - var(--theme-sig-control-menu-input-border-width, 0)));
                border-top-right-radius: calc((var(--theme-sig-control-menu-input-border-radius-tr, var(--theme-sig-control-menu-input-border-radius, 0)) - var(--theme-sig-control-menu-input-border-width, 0)));
                border-bottom-right-radius: calc((var(--theme-sig-control-menu-input-border-radius-br, var(--theme-sig-control-menu-input-border-radius, 0)) - var(--theme-sig-control-menu-input-border-width, 0)));
                border-bottom-left-radius: calc((var(--theme-sig-control-menu-input-border-radius-bl, var(--theme-sig-control-menu-input-border-radius, 0)) - var(--theme-sig-control-menu-input-border-width, 0)));

                background-color: var(--theme-sig-control-menu-input-background-color, rgba(255, 255, 255, 1));
                background-image: linear-gradient(var(--theme-sig-control-menu-input-background-color-direction, to bottom),
                var(--theme-sig-control-menu-input-background-color, rgba(255, 255, 255, 1)),
                var(--theme-sig-control-menu-input-background-color-stop, var(--theme-sig-control-menu-input-background-color)));
            }

            #activeoption {
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                background-color: var(--theme-sig-control-menu-input-activeoption-background-color, transparent);
                color: var(--theme-sig-control-menu-input-activeoption-color, inherit);
                text-align: var(--theme-sig-control-menu-input-activeoption-text-align, center);
                align-self: var(--theme-sig-control-menu-input-activeoption-text-align-vertical, center);
                text-decoration: inherit;

                position: relative;
                display:flex;
                align-items: center;
            }

            :host(:not([showicon])) .imageWrapper {
                display:none;
            }

            .imageWrapper {
                display:inline-block;
                width: var(--theme-sig-control-menu-input-icon-width, 25px); 
                margin: 0px var(--theme-sig-control-menu-input-icon-margin-right,5px);
                flex-shrink: 0;
            }

            .imageWrapper img {
                display:inline-block;
                width: 100%;
                height: var(--theme-sig-control-menu-input-icon-height, auto);
                vertical-align: middle;
                max-height: var(--theme-sig-element-height, 100%);
                object-fit: contain;
            }
        
            .textWrapper {
                flex-grow:1;
                height: 100%;
                display:inline-block;
                overflow:hidden;
                text-overflow:ellipsis;
                padding: var(--theme-sig-control-menu-input-activeoption-text-padding, 0px 2px);
            }

            :host([showicon])  .textWrapper  {
                margin-right:var(--theme-sig-control-menu-input-icon-margin-right,5px);
            }

            /* caret container styling */
            #caretcontainer {
                position: relative;
                flex: 0 0 var(--theme-sig-control-menu-input-caretdown-width, 30px);
                height: 100%;
                overflow: hidden;
                background-color: var(--theme-sig-control-menu-input-caretdown-background-color, inherit);
                box-sizing: border-box;
            }
    
            /* caret container active styling */
            :host([menuvisible]) #caretcontainer {
                background-color: var(--theme-sig-control-menu-input-caretdown-pressed-background-color, var(--theme-sig-control-menu-input-caretdown-background-color, inherit));
            }
    
            /* caret images styling (inactive/active) */
            .caret {
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                position: absolute;
                box-sizing: border-box;
                width: var(--theme-sig-control-menu-input-caret-width, 16px);
                height: 100%;
                object-fit: contain;
                visibility: hidden;
                margin: auto;
            }
    
            :host([menuvisible]) #caretimageactive {
                visibility: visible;
            }
    
            :host(:not([menuvisible])) #caretimage {
                visibility: visible;
            }
    
            /* menu-input border color applied in active state, when bordergradient is inactive  */
            :host([menuvisible]) {
                border-color: var(--theme-sig-control-menu-input-pressed-border-color, var(--theme-sig-control-menu-input-border-color));
            }
            
            :host(:not([isdesignmode])[menuvisible]) {
                border-color: var(--theme-sig-control-menu-input-pressed-border-color, var(--theme-sig-control-menu-input-border-color));
            }

            /* remove border when bordergradient is active */
            :host([bordergradient]:not([menuvisible])),
            :host([bordergradientpressed][menuvisible]) {
                border-width: 0px;
            }
    
            .sig-control-menu-input-container {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                text-decoration: inherit;                
            }

            :host([bordergradient][isdesignmode]) .sig-control-menu-input-container,
            :host([bordergradient]:not([menuvisible])) .sig-control-menu-input-container {
                width: 100%;
                background-image: linear-gradient(var(--theme-sig-control-menu-input-border-color-direction, to bottom), var(--theme-sig-control-menu-input-border-color), var(--theme-sig-control-menu-input-border-color-stop, var(--theme-sig-control-menu-input-border-color)));
                padding: var(--theme-sig-control-menu-input-border-width, 1px);
            }

            :host([bordergradientpressed][menuvisible]) .sig-control-menu-input-container {
                width: 100%;
                background-image: linear-gradient(var(--theme-sig-control-menu-input-pressed-border-color-direction, to bottom), var(--theme-sig-control-menu-input-pressed-border-color, var(--theme-sig-control-menu-input-border-color)), var(--theme-sig-control-menu-input-pressed-border-color-stop, var(--theme-sig-control-menu-input-border-color-stop)));
                padding: var(--theme-sig-control-menu-input-border-width, 1px);
            }

            :host([menuvisible]) .sig-control-menu-input-element {
                background-color: var(--theme-sig-control-menu-input-pressed-background-color, var(--theme-sig-control-menu-input-background-color, rgba(215, 215, 215, 1)));
                color: var(--theme-sig-control-menu-input-pressed-color, var(--theme-sig-control-menu-input-color, rgba(42, 42, 42, 1)));
				background-size: contain;
                background-image: linear-gradient(var(--theme-sig-control-menu-input-pressed-background-color-direction, to bottom),
                var(--theme-sig-control-menu-input-pressed-background-color, rgba(215, 215, 215, 1)),
                var(--theme-sig-control-menu-input-pressed-background-color-stop, var(--theme-sig-control-menu-input-pressed-background-color)));
            }

            #boxshadowcontainer {
                position: absolute;
                display: none;
                background-color: transparent;
                width: 100%;
                height: 100%;
            }

            :host([shadowactive]:not([menuvisible])) #boxshadowcontainer {
                display: block;
                box-shadow: inset 0 0 var(--theme-sig-control-menu-input-shadow-size, 0px) var(--theme-sig-control-menu-input-shadow-color, rgba(0, 0, 0, 1));
            }

            :host([shadowpressedactive][menuvisible]) #boxshadowcontainer {
                display: block;
                box-shadow: inset 0 0 var(--theme-sig-control-menu-input-pressed-shadow-size, 0px) var(--theme-sig-control-menu-input-pressed-shadow-color, rgba(0, 0, 0, 1));
            }
        </style> 
        <div class="sig-control-menu-input-container clearfix" on-tap="_toggleMenu">
            <div class="sig-control-menu-input-element clearfix">
                <div id="activeoption">
                <span class="imageWrapper" id="iconwrapper">
                    <img src="[[iconsrc]]" id="activeicon"/>
                </span>
                <span class="textWrapper">[[activeoption]]</span>
                </div>
                <div id="caretcontainer">
                    <!-- we create img for for both images to increase first rendering performance when list is opened -->
                    <img id="caretimage" src=[[caretimage]] class="caret">
                    <img id="caretimageactive" src=[[caretimageactive]] class="caret">
                </div>
                <div id="boxshadowcontainer"></div>
            </div>
        </div>
        `;
    }

    //Polymer properties type definition
    value: number
    defaulttext: string
    direction: string
    offsetx: string | number
    offsety: string | number
    menuvisible: boolean
    shadowactive: boolean
    shadowpressedactive: boolean
    bordergradient: boolean
    bordergradientpressed: boolean
    menuref: string
    ignoreminwidth: boolean
    showicon: boolean
    defaultimageurl: string
    showdefaulticon: boolean
    previewtext: string

    /****************************************************************************************************
     * Method gets called by runtime to fetch polymer properties
     *
     * @readonly
     * @static
     * @memberof LasalRuntimeSigControlMenuInput
     * 
     * @property {number} value                     - The data source of the menu-input component.
     * @property {string} defaulttext               - The text source of the menu-input.
     * @property {string} direction                 - The the direction in which the menu opens.
     * @property {(string|number)} offsetx          - The horizontal offset of the opened menu in pixels relative to component's rotation.
     * @property {(string|number)} offsety          - The vertical offset of the opened menu in pixels relative to the opening direction and component's rotation.
     * @property {boolean} menuvisible              - True - menu is visible.
     * @property {boolean} shadowactive             - Activates the border shadow of the component.
     * @property {boolean} shadowpressedactive      - Activates the border shadow in active state.
     * @property {boolean} bordergradient           - Activates the border gradient.
     * @property {boolean} bordergradientpressed    - Activates the border gradient of the component in active state.
     * @property {string} menuref                   - The menu source of the menu-input component.
     * @property {boolean} ignoreminwidth           - If true, the minimal width of menu that is opened by this component will not be set to the width of this component.
     * @property {boolean} showicon                 - If true, the image of the submitted menu item is shown.
     * @property {string} defaultimageurl           - The default image is shown with default text or if the submitted item does not have an image.
     * @property {boolean} showdefaulticon          - True - shows default icon in item
     * @property {string} previewtext               - Preview text for menu input
     *   
    ****************************************************************************************************/
    static get properties(): object {
        // property names should always be lower case so we
        // can use them directly on the element as an attribute
        let props = {
            value: {
                type: Number,
                value: undefined,
                observer: '_updateValue',
                notify: true
            },
            defaulttext: {
                type: String,
                value: '',
                observer: '_defaultTextChanged'
            },
            direction: {
                type: String,
                value: ''
            },
            //computed needed cause menu is working with numeric values but we want to configure strings like 10px
            offsetx: {
                type: String,
                value: "0px",
                computed: '_computeOffset(offsetx)'
            },
            offsety: {
                type: String,
                value: "0px",
                computed: '_computeOffset(offsety)'          
            },
            menuvisible: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                //needed to get info in superior control (two-way-binding)
                notify: true
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
            menuref: {
                type: String,
                value: ''
            },
            ignoreminwidth: {
                type: Boolean,
                value: false
            },
            showicon: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                observer: '_toggleIcon'
            },
            defaultimageurl: {
                type: String,
                value: '',
                observer: '_toggleDefaultIcon'
            },
            showdefaulticon: {
                type: Boolean,
                value: false
            },
            previewtext: {
                type: String,
                value: '-- Menu Input --',
                observer: '_defaultTextChanged'
            }            
        }
        return props;
    }

    //Member properties type definition
    currentMenuItem: null | SigApi.MenuItem
    currentMenuItemObs: null | number | undefined
    updateActiveOptionToDefaultText: boolean
    activeoption: string
    caretimage: string
    caretimageactive: string
    menuApi: SigApi.ApiMenuManager | null
    dsApi: SigApi.ApiDefaultStyleManager | null
    requiredPropertiesReady: boolean
    iconsrc: string
    callbackFctShow: SigApi.ApiMenuManager["show"]

    /****************************************************************************************************
     * Creates an instance of LasalRuntimeSigControlMenuInput.
     * 
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    constructor() {
        super();

        // initialize variables
        this.currentMenuItem = null;
        this.currentMenuItemObs = null;

        this.updateActiveOptionToDefaultText = true;

        this.activeoption = '';

        this.caretimage = `${this.importPath}caret_down.svg`;
        this.caretimageactive = `${this.importPath}caret_up.svg`;

        this.offsetx = 0;
        this.offsety = 0;

        // get reference to api
        this.menuApi = (window.sigApi.menuManager) ? window.sigApi.menuManager : null;
        this.dsApi = (window.sigApi.defaultStyleManager) ? window.sigApi.defaultStyleManager : null;

        // Needs to be true to dispatch value-changed event, because by default, runtime updates the value, not component itself.
        this.dispatchAllInternalEvents = true;
     
        this.addMandatoryCloneProperty('activeoption');

        // add required property for value
        this.sigAddRequiredProperty('value');

        // add observers which are only used in designmode
        if (this.isdesignmode) {
            // in designer, set the default images to the correct path
            this._createMethodObserver('_designerOnCaretImageChanged(caretimage, caretimageactive)', true);
        }        
    }

    /********************************************************************************************************************************
     * Called in the designer when a caret image is set.
     *
     * @memberof LasalRuntimeSigControlMenuInput
     ********************************************************************************************************************************/
     _designerOnCaretImageChanged(): void {
        if (this.caretimage === 'default') this.caretimage = `${this.importPath}caret_down.svg`;
        if (this.caretimageactive === 'default') this.caretimageactive = `${this.importPath}caret_up.svg`;
    }
    
    
    /****************************************************************************************************
     * Called if required properties are ready
     *
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    sigOnRequiredPropertiesReady(): void {
        super.sigOnRequiredPropertiesReady();

        // run update of selected value
        SigPolymer.afterNextRender(this, function(this: LasalRuntimeSigControlMenuInput){
            this.requiredPropertiesReady = true;
            this._updateValue(this.value);
        });
    }

    /****************************************************************************************************
     * Gets called if element was connected to dom
     *
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    connectedCallback(): void {
        super.connectedCallback();

        // add eventlistener in case menue is used in a window
        if (this.context && this.context.instanceId && this.context.type === 'window') {
            const jsPanelContent = document.getElementById(this.context.instanceId)?.querySelector('.jsPanel-content');
            if (jsPanelContent) {
                this.sigAddEventListener('scroll', () => {
                    if (this.menuvisible && this.menuApi) {
                        this.menuApi.cancel();
                    }
                }, 'jsEvent', jsPanelContent);
            }
        }
    }

    /****************************************************************************************************
     * Method is called if offsets change. Menu is awaiting numeric values for offsets but we want
     * to configure them as e.g. 10px.
     *
     * @param {String} value - String value which needs to be converted to number
     * @return {number} The value as a number. 
     * @memberof LasalRuntimeSigControlMenuInput
     ****************************************************************************************************/
    _computeOffset(value: string): number | undefined {
        return value !== undefined ? parseFloat(value) : undefined;
    }

    /****************************************************************************************************
     * Gets called if control gets disconnected from the DOM
     *
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    disconnectedCallback(): void {
        super.disconnectedCallback();
        this.currentMenuItem = null;
        this.menuApi = null;
        this.dsApi = null;
    }

    /****************************************************************************************************
     * Observer for property showicon
     *
     * @param {boolean} newVal new value of the property
     * @param {boolean} oldVal old value of the property
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _toggleIcon(newVal: boolean, oldVal: boolean): void {
        if (newVal) {
            this._setIcon(this.defaultimageurl);
        }
    }

    /****************************************************************************************************
     * Observer for property defaultimageurl
     *
     * @param {string} newVal new value of the property
     * @param {string} oldVal old value of the property
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _toggleDefaultIcon(newVal: string, oldVal: string): void {
        if (this.showicon) {
            this._setIcon(newVal);
        }
    }

    /****************************************************************************************************
     * Method to set the icon for the actual selected element
     *
     * @param {string} [iconUrl=''] path to the icon
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _setIcon(iconUrl: string = ''): void {

        // for designer a default icon is used
        if (!this.isdesignmode) {

            // show selected icon
            if (iconUrl && iconUrl !== '' && this.showicon) {
                this.iconsrc = iconUrl;
                (this.$.activeicon as HTMLElement).style.display = 'inline-block';

            // show default icon
            } else {
                if (this.showdefaulticon && this.defaultimageurl && this.showicon) {
                    this.iconsrc = this.defaultimageurl;
                    (this.$.activeicon as HTMLElement).style.display = 'inline-block';
                }

                // show no icon
                else {
                    (this.$.activeicon as HTMLElement).style.display = 'none';
                    this.iconsrc = '';
                }
            }

        } else {
            this.iconsrc = (iconUrl !== '') ? iconUrl : '/res/components/user/sig-control-menu-input/image.svg';
        }
    }

    /****************************************************************************************************
     * Eventlistener for on-down  to open / close menue
     *
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _toggleMenu(): void {
        if (!this.isdesignmode) {
            const menuVisible = document.getElementById('lvdsigcontrolmenu');

            // open menue
            //-------------------------------------------------------------------------------------------
            if (!this.menuvisible && menuVisible && !(menuVisible as any).isVisible) {

                // get scaling and bounds
                const scaleFactors = this.getScaleFactor(this, this.realrotation);
                const position = this.getBoundingClientRect();

                const minimalWidth = (this.ignoreminwidth) ? undefined : this.offsetWidth;
                const property = (this.value !== undefined) ? 'value' : undefined;

                let showFct = this.menuApi!.show;
                //check if callback method set for open -> otherwise call it on our own
                //!!!Do not delete, as it is used via superior components!!!
                if (this.callbackFctShow) {
                    showFct = this.callbackFctShow;
                }

                // check if api is available and show menue
                showFct(this.menuref,
                    this, property,
                    position.left, position.top + position.height, 
                    scaleFactors.x, scaleFactors.y, 
                    this.realrotation, 
                    minimalWidth, undefined, 
                    undefined, undefined, 
                    this.direction).then((opened) => {
                        if (opened) this.menuvisible = true;
                    }).catch((error) => {
                        if (error.errortxt) this._log('_toggleMenu(): ' + error.errortxt, 'ERROR');
                        else this._log('_toggleMenu(): ' + error, 'ERROR');
                    });

            // close menue
            //-------------------------------------------------------------------------------------------
            } else {
                if (this.menuApi) {
                    this.menuApi.cancel();
                }
                this.menuvisible = false;
            }
        }
    }
    
    /****************************************************************************************************
     * Method is called by runtime for updating value
     *
     * @param {SigApi.MenuItem} menuItem - selected menu item
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
     updateItem(menuItem: SigApi.MenuItem | null | undefined): void {
        //only update item if not set via datapoint
        if ((!this.isdesignmode) && (this.value === undefined)) {
            //set menu item
            this._setMenuItem(menuItem);
        }
    }


    /****************************************************************************************************
     * method is used to set the given menu item as the current item
     *
     * @param {SigApi.MenuItem} menuItem - menu item which should be set as the current item
     * @memberof LasalRuntimeSigControlMenuInput
     ****************************************************************************************************/
    _setMenuItem(menuItem: SigApi.MenuItem | null | undefined): void {
        //remove the observer of the current item
        if(this.currentMenuItemObs) this.currentMenuItem?.removeObserver(this.currentMenuItemObs);
        //check if menu item valid
        if (menuItem) {
            //it is a valid item so text needs to be updated if it changes
            this.updateActiveOptionToDefaultText = false;
            //get text property of menu item
            menuItem.getPropertyValue('text').then((value) => {
                this.activeoption = value;
                this.currentMenuItem = menuItem;
                this.currentMenuItemObs = this.currentMenuItem?.addObserver('text', (text: any) => {
                    this._menuitemObs(text);
                } )
            }).catch(() => {
                this._log('_setMenuItem(): getPropertyValue failed', 'ERROR');
            });

            //get icon if it needs to be shown
            if (this.showicon) {
                menuItem.getPropertyValue('icon').then((icon) => {
                    if (icon) this._setIcon(icon);
                    else this._setIcon('');
                }).catch(() => this._log('_setMenuItem(): getPropertyValue("icon") failed', 'ERROR'));
            }
        }
        else {
            //not a valid item so display default text
            this.updateActiveOptionToDefaultText = true;
            this.activeoption = this.defaulttext;
        }
    }

    /****************************************************************************************************
     * Observer for property value
     *
     * @param {number} newVal new value of the property
     * @param {number} oldVal old value of the property
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _updateValue(newVal?: number, oldVal?: number): void {
        if (this.requiredPropertiesReady) {
            if(newVal !== undefined){
                this._updateTextFromDatapoint(newVal);
            }
            if (oldVal !== undefined) {
                this._dispatchEvent('value-changed');
            }            
        }
    }

    /****************************************************************************************************
     *  Method to update text of selected item
     *
     * @param {number} value
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _updateTextFromDatapoint(value: number): void {
        if (!this.isdesignmode) {
            // check if menue api is available
            if (this.menuApi) {
                // get menue item for actual selected value
                this.menuApi.getMenuItemFromValue(value, this.menuref).then((item) => {
                    let menuItem: SigApi.MenuItem | null | undefined;
                    if (item) {
                        menuItem = this.menuApi!.getMenuItemFromId(item.instanceId);
                    }
                    else {
                        this._log('_updateTextFromDatapoint(): invalid menu item', 'INFO');
                    }
                    // set menu item
                    this._setMenuItem(menuItem);
                // error handling
                }).catch((error) => {
                    this._log('_updateTextFromDatapoint(): API call getmenuitemFromValue() failed: ' + error, 'ERROR');
                });
            }
        }
    }

    /****************************************************************************************************
     * Method to change text of active element
     *
     * @param {any} text
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _menuitemObs(text: any): void {
        this.activeoption = text;
    }

    /****************************************************************************************************
     * Method is called in case of Drag & Drop to close the menue
     *
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    onComponentDragDropEnabled(maID: number, miID: number, message: object): void {
        super.onComponentDragDropEnabled(maID, miID, message);
        if (this.menuvisible && this.menuApi) {
            this.menuApi.cancel();
        }
    }

    /****************************************************************************************************
     * Observer for property defaulttext
     *
     * @param {string} newVal new value of the property
     * @param {string} oldVal old value of the property
     * @memberof LasalRuntimeSigControlMenuInput
    ****************************************************************************************************/
    _defaultTextChanged(newVal: string, oldVal: string): void {
        if (newVal !== undefined && !this.isdragClone) {
            if (this.updateActiveOptionToDefaultText) {
                this.activeoption = newVal;

                if ((this.isdesignmode) && (this.activeoption === '')) {
                    // run after rendering to get the current preview text
                    SigPolymer.afterNextRender(this, function(this: LasalRuntimeSigControlMenuInput){
                        this.activeoption = this.previewtext; 
                    });
                }        
            }
        }
    }
}
customElements.define(LasalRuntimeSigControlMenuInput.is, LasalRuntimeSigControlMenuInput);
