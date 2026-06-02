import { LasalRuntimeSigElement, SigPolymer } from '../../sigmatek/sig-element/sig-element.js';
import '../sig-control-scrollbar/sig-control-scrollbar-css.js'
import './sig-control-menu-css.js'


export class LasalRuntimeSigMenuElement extends LasalRuntimeSigElement {

    static get is() {
        return "sig-control-menu";
    }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
        <style include="sig-element-css sig-control-scrollbar-css sig-control-menu-css">
        :host {
        
        
        display: block;
        position: absolute;
        }

        
        :host(:not([isdesignmode])) {
        width:0px;
        height:0px
        }

        :host * {
        
        margin: 0;
        padding: 0;
        }
        .clearfix:after {
        @apply --clearfix 
        }
        
        :host .__menuWrapper {
            position:absolute;
            pointer-events:none;
            z-index:1;
            top: var(--theme-sig-element-top, auto);
            left: var(--theme-sig-element-left, auto);
        }

        
        :host .__menuWrapper .__menuWrapper {
        left:auto;
        top: auto;
        }

        
        :host .__menuWrapper .__menuWrapper.wrapper-right {
            left:100%;
        }

        :host  .__menuWrapper .__menuWrapper.wrapper-left {
            right:100%;
        }

        
         .__resetProperties {
            --theme-sig-control-menu-ul-background-color: initial;
            --theme-sig-control-menu-ul-border-width: initial;
            --theme-sig-control-menu-ul-border-style: initial;
            --theme-sig-control-menu-ul-border-radius: initial;
            --theme-sig-control-menu-ul-border-color: initial;
            --theme-sig-control-menu-ul-box-shadow-size: initial;
            --theme-sig-control-menu-ul-shadow-color: initial;

            --theme-sig-control-menu-min-width: initial;
            --theme-sig-control-menu-max-width: initial;
            --theme-sig-control-menu-min-height: initial;
            --theme-sig-control-menu-max-height: initial;

            --theme-sig-control-menu-li-background-color: initial;
            --theme-sig-control-menu-li-color: initial;
            --theme-sig-control-menu-li-padding: initial;
            --theme-sig-control-menu-li-text-align: initial;
            --theme-sig-control-menu-li-line-height: initial;
            --theme-sig-control-menu-li-text-align-vertical: initial;
            --theme-sig-control-menu-li-icon-width: initial;
            --theme-sig-control-menu-li-icon-height: initial;
            --theme-sig-control-menu-li-icon-padding-right: initial;
            --theme-sig-control-menu-li-inactive-background-color: initial;
            --theme-sig-control-menu-li-inactive-color: initial;
            --theme-sig-control-menu-li-submenu-icon-width: initial;
            --theme-sig-control-menu-li-submenu-icon-left-padding: initial;
            --theme-sig-control-menu-li-selected-background-color: initial;
            --theme-sig-control-menu-li-selected-color: initial;
            --theme-sig-control-menu-text-overflow: initial;
        }
        
        :host .__menu {
            visibility:hidden;
            width: max-content;
            list-style-type: none;
            overflow-x: hidden;
            overflow-y: auto;
            background-color: var(--theme-sig-control-menu-ul-background-color, rgba(215,215,215,1));
            border-width: var(--theme-sig-control-menu-ul-border-width, 0px);
            border-style: var(--theme-sig-control-menu-ul-border-style, solid);
            border-radius: var(--theme-sig-control-menu-ul-border-radius,0px);
            border-color: var(--theme-sig-control-menu-ul-border-color, transparent);
            box-sizing: border-box;

            min-width:var(--theme-sig-control-menu-min-width, 150px);
            max-width: var(--theme-sig-control-menu-max-width, 300px);
            min-height:var(--theme-sig-control-menu-min-height, 0px);
            max-height: var(--theme-sig-control-menu-max-height, 500px);
       }

        
       :host(:not([isdesignmode])) .__menu {
            font-style:initial;
            font-weight:initial;
            font-size:initial;
       }

       :host .__menu.menuShadow {
        box-shadow: 0 0 var(--theme-sig-control-menu-ul-box-shadow-size, 7px)  var(--theme-sig-control-menu-ul-shadow-color, rgba(47,47,47,1));
       }

       :host .__menu.visible {
           visibility:visible;
       }

       
        :host .menu-item {
            background-color: var(--theme-sig-control-menu-li-background-color, rgba(215,215,215,1));
            color: var(--theme-sig-control-menu-li-color, rgba(0,0,0,1));
            padding: var(--theme-sig-control-menu-li-padding, 5px);
            text-align: var(--theme-sig-control-menu-li-text-align, left);
            height: var(--theme-sig-control-menu-li-line-height, 20px);
        }

        :host .menu-separator .separator {
            height:1px;
            background-color: var(--theme-sig-control-menu-li-color, rgba(0,0,0,1));
        }

        :host .menu-separator {
            height:1px;
        }

        :host .menu-item:hover {
            cursor:pointer;
        }
        
        :host .menu-item .itemWrapper {
            display:flex;
            height:100%;
            align-items:var(--theme-sig-control-menu-li-text-align-vertical, center);
        }

        :host .menu-item .item-icon {
            width:var(--theme-sig-control-menu-li-icon-width, 25px);
            max-height: var(--theme-sig-control-menu-li-line-height, 20px);
            display:inline-block;
            margin-right: var(--theme-sig-control-menu-li-icon-padding-right, 5px);
            overflow:hidden;
            flex-shrink:0;
        }
        :host .menu-item .item-text {
            white-space: var(--theme-sig-control-menu-text-overflow, nowrap);
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            width:100%;
        }


        :host .__menu .menu-item.item-inactive {
            background-color: var(--theme-sig-control-menu-li-inactive-background-color, rgba(160,160,160,1));
            color: var(--theme-sig-control-menu-li-inactive-color, rgba(0,0,0,1));
        }

        
        :host .menu-item .item-arrow {
            width:var(--theme-sig-control-menu-li-submenu-icon-width, 20px);
            max-height: var(--theme-sig-control-menu-li-line-height, 20px);
            float: right;
            margin-left:var(--theme-sig-control-menu-li-submenu-icon-left-padding, 1px);
            text-align:center;
            overflow:hidden;
            flex-shrink:0;
        }

        :host .menu-item .item-icon img, .item-arrow img {
            width:100%;
            height: var(--theme-sig-control-menu-li-icon-height, auto);
            max-height: var(--theme-sig-control-menu-li-line-height, 20px);
        }

        :host .menu-item .right-arrow:before {
            @apply --symbol;
            content: "\\f0da";
            font-size: inherit;
        }

        :host .menu-item .right-arrow img {
            display:none;
        }

        :host .menu-item-selected {
            background-color: var(--theme-sig-control-menu-li-selected-background-color, rgba(174,200,26,1));
            color: var(--theme-sig-control-menu-li-selected-color, rgba(0,0,0,1));
        }

        :host .submenu-item.menu-item-selected {
            background-color: var(--theme-sig-control-submenu-li-selected-background-color, var(--theme-sig-control-menu-li-selected-background-color, rgba(174,200,26,1)));
            color: var(--theme-sig-control-submenu-li-selected-color, var(--theme-sig-control-submenu-li-selected-color, rgba(0,0,0,1)));
        }

        :host([showshadow][isdesignmode]) .__menu {
            box-shadow: 0 0 var(--theme-sig-control-menu-ul-box-shadow-size, 7px)  var(--theme-sig-control-menu-ul-shadow-color, rgba(47,47,47,1));
       }

       
       :host([isdesignmode]) .__menu {
            --theme-sig-element-height: initial !important;
            --theme-sig-element-width: initial !important;
            pointer-events:none;
        }

        :host([isdesignmode]) .__menuWrapper, :host([isdesignmode]) .__menu {
            width: var(--theme-sig-element-width, 100%);
            height : var(--theme-sig-element-height, 100%);
            max-height: initial;
            max-width: initial;
            min-height: initial;
            min-width: initial;
            position:initial;
        }
        :host(:not([showicons])[isdesignmode]) .item-icon {
            display:none;
        }

         
        </style>
        <template is="dom-if" if="[[isdesignmode]]">
        <div class="menuContainer">
            <div class="__menuWrapper">
            <ul id="menu" class="__menu visible">
                <li class="menu-item">
                <span class="itemWrapper">
                    <span class="item-icon"><img src="[[importPath]]image.svg"/></span>
                    <span class="item-text">Item</span>
                    <span class="item-arrow"></span>
                </span>
                </li>
                <li class="menu-item menu-item-selected">
                <span class="itemWrapper">
                    <span class="item-icon"><img src="[[importPath]]image.svg"/></span>
                    <span class="item-text">Active item</span>
                    <span class="item-arrow"></span>
                </span>
                </li>
                <li class="menu-item item-inactive">
                <span class="itemWrapper">
                    <span class="item-icon"><img src="[[importPath]]image.svg"/></span>
                    <span class="item-text">Inactive item</span>
                    <span class="item-arrow"></span>
                </span>                
                </li>        
                <li class="menu-item">
                <span class="itemWrapper">
                    <span class="item-icon"><img src="[[importPath]]image.svg"/></span>
                    <span class="item-text">Submenu item</span>
                    <span class="item-arrow right-arrow" id="rightArrow">
                        <img src="[[menuicon]]" id="previewImage"/>
                    </span>
                </span>
                </li>
                <li class="menu-item menu-item-selected">
                <span class="itemWrapper">
                    <span class="item-icon"><img src="[[importPath]]image.svg"/></span>
                    <span class="item-text">Active submenu</span>
                    <span class="item-arrow right-arrow" id="rightArrowActive">
                        <img src="[[menuiconactive]]" id="previewImageActive"/>
                    </span>
                </span>
                </li>
                <li class="menu-item">
                <span class="itemWrapper">
                    <span class="item-icon"><img src="[[importPath]]image.svg"/></span>
                    <span class="item-text">Item</span>
                    <span class="item-arrow"></span>
                </span>
                </li>
            </ul>
        </div>  
        </div> 
        </template>
        `;
    }

    constructor() {
        super();
        this.config = {};
        this.menuApi = (sigApi.menuManager) ? sigApi.menuManager : null;
        this.browserApi = (sigApi.browser) ? sigApi.browser : null;
        this.currentBrowser = (this.browserApi) ? this.browserApi.getCurrentBrowserInfo() : null;
        this.positionMenuCallback = null;
        this.handleClickCallback = null;
        this.appHeight = null;
        this.appWidth = null;
        this.disableScrollEvent = false;
        this.submenusHidden = true;
        this.windowEventListenersBound = false;
        this.debugmode = false;
        this.submittingItem = false;
        this.openSubmenusToSelectedItem = false;
        this.selectedItemId = null;
    }

    static get properties() {
        let props = {
            value: {
                type: Number,
                value: undefined,
            },
            showicons: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            showshadow: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            menuicon: {
                type: String,
                value: "",
                observer: "_updateMenuIcon"
            },
            menuiconactive: {
                type: String,
                value: "",
                observer: "_updateMenuIconActive"
            }
        }
        return props;
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.isdesignmode)
            this.sigAddEventListener('tap', (event) => {
                if (this.config.parent &&
                    event.target !== this.config.parent &&
                    event.target !== this &&
                    event.composedPath().filter(el => el === this.config.parent).length === 0 &&
                    this.isVisible && this.menuApi && !this.submittingItem) {
                    this.menuApi.cancel();
                }
            }, 'polymerEvent', window);
    }


    ready() {
        super.ready();

        SigPolymer.afterNextRender(this, function () {
            if (this.isdesignmode) {
                if (this.className) this.shadowRoot.querySelector('#menu').classList.add(this.className);
            } else {
                this._updateAppSize();
                this.sigAddEventListener('resize', () =>
                    this._updateAppSize(), 'jsEvent', window, { passive: true });

                if (this.isiPad() || this.isiPhone()) {
                    this.sigAddEventListener('orientationchange', () => {
                        this.sigSetTimeout(() => this._updateAppSize(), 50);
                    }, 'jsEvent', window);
                }

            }
        });
    }

    async hide() {
        this.shadowRoot.querySelectorAll('.__menu').forEach(node => this._makeInvisible(node));
        this.isVisible = false;
        if (this.config.parent) this.config.parent.menuvisible = false;
    }

    async show(
        menuDefinition, menuId = null,
        parent, propName,
        posX, posY,
        scaleX, scaleY,
        rotation,
        minWidth, minHeight,
        maxWidth, maxHeight,
        direction,
        renderContainer, renderMenu, renderItem) {
        if (arguments.length > 0) {
            this.positionMenuCallback = null;
            this.handleClickCallback = null;
            this.selectedItemId = null;

            if (!menuDefinition instanceof Object ||
                !menuDefinition.items ||
                !menuDefinition.items instanceof Array ||
                !menuDefinition.properties ||
                !menuDefinition.properties instanceof Object ||
                !parent || !parent instanceof HTMLElement ||
                menuId === null) {
                throw new Error("Parameters not valid! If you wish to show the already rendered menu, do not pass any arguments.");
            }

            this.config = {
                menuDefinition: menuDefinition,
                parent: parent,
                propName: propName,
                scaleX: scaleX, scaleY: scaleY,
                posX: posX, posY: posY,
                minWidth: minWidth, minHeight: minHeight,
                maxWidth: maxWidth, maxHeight: maxHeight,
                rotation: rotation,
                direction: direction,
                renderItem: renderItem,
                renderMenu: renderMenu,
                renderContainer: renderContainer
            };

            if (this.config.rotation)
                this.config.rotation = this.getRealRotation(this.config.rotation);

            const menu = this._renderContainer(menuDefinition);

            if (this.shadowRoot.lastChild) this.shadowRoot.lastChild.remove();

            this.shadowRoot.appendChild(menu);

            if (!this.config.renderMenu)
                this._setDimensions(menu.querySelectorAll(".__menu"));

            if (this.debugmode) {
                this._makeVisible(this.shadowRoot.querySelector('.__menu'));
                this.isVisible = true;
            }

            if (this.positionMenuCallback) this.positionMenuCallback(menu, this.config);
            else this._positionMainMenu(menu.querySelector('.__menuWrapper'));

            if (!this.windowEventListenersBound) this._addWindowEventListeners();
        }

        this._makeVisible(this.shadowRoot.querySelector('.__menu'));
        this.isVisible = true;

        if (this.selectedItemId !== null) {
            if (this.openSubmenusToSelectedItem) {
                const menuWrappers = this.shadowRoot.querySelectorAll('.__menuWrapper');
                menuWrappers.forEach(wrapper => {
                    if (wrapper.parentElement && wrapper.parentElement.selected === true) {
                        this._positionSubmenu(wrapper);
                        this._makeVisible(wrapper.querySelector('.__menu'));
                    }
                });
            }

            const currentSelectedItem = this.shadowRoot.querySelector('#' + this.selectedItemId);
            if (currentSelectedItem instanceof HTMLElement) {
                const parentMenu = currentSelectedItem.closest('.__menu');
                const itemOffsetTop = currentSelectedItem.offsetTop;
                const itemOffsetHeight = currentSelectedItem.offsetHeight;
                if (parentMenu && itemOffsetTop + itemOffsetHeight > parentMenu.offsetHeight) {
                    parentMenu.scrollTop = itemOffsetTop;
                }
            }
        }
    }

    _addWindowEventListeners() {
        this.sigAddEventListener('jspaneldragstart', () => {
            if (this.isVisible && this.menuApi && !this.submittingItem) this.menuApi.cancel();
        }, 'jsEvent', document);

        this.sigAddEventListener('jspanelclosed', () => {
            if (this.isVisible && this.menuApi && !this.submittingItem) this.menuApi.cancel();
        }, 'jsEvent', document);

        this.sigAddEventListener('jspanelminimized', () => {
            if (this.isVisible && this.menuApi && !this.submittingItem) this.menuApi.cancel();
        }, 'jsEvent', document);

        this.sigAddEventListener('jspanelresizestart', () => {
            if (this.isVisible && this.menuApi && !this.submittingItem) this.menuApi.cancel();
        }, 'jsEvent', document);

        this.windowEventListenersBound = true;
    }

    _setDimensions(uls = []) {
        uls.forEach((ul) => {

            const computedStyle = getComputedStyle(ul);
            const linesPerPage = parseInt(ul.dataset.linesperpage, 10);

            let lineHeight = (ul.firstChild) ? parseInt(getComputedStyle(ul.firstChild).getPropertyValue('height'), 10) : 0;
            let styleMaxHeight = parseInt(computedStyle.getPropertyValue('max-height'), 10);
            let styleMinHeight = parseInt(computedStyle.getPropertyValue('min-height'), 10);
            let menuBorder = parseInt(computedStyle.getPropertyValue('border-width'), 10);

            if (isNaN(lineHeight)) lineHeight = 20;
            if (isNaN(styleMaxHeight)) styleMaxHeight = 500;
            if (isNaN(styleMinHeight)) styleMinHeight = 0;
            if (isNaN(menuBorder)) menuBorder = 0;

            let maxHeight = this.config.maxHeight;
            let minHeight = this.config.minHeight;

            let numOfSeparators = 0;
            let linesPerPageWithSeparator = linesPerPage;
            ul.querySelectorAll(":scope > .menu-separator").forEach(separator => {
                const separatorPosition = separator.dataset.itemposition;
                if (separatorPosition && linesPerPageWithSeparator >= parseInt(separatorPosition, 10)) {
                    numOfSeparators += 1;
                    linesPerPageWithSeparator += 1;
                }
            });

            const padding = (ul.firstChild) ? parseInt(getComputedStyle(ul.firstChild).getPropertyValue('padding'), 10) : 0;

            if (!maxHeight) maxHeight = styleMaxHeight;
            if (!minHeight) minHeight = styleMinHeight;

            let calcMaxHeight = Math.min((linesPerPage - numOfSeparators) * (lineHeight + padding * 2) + menuBorder * 2 + (numOfSeparators * (padding * 2)), maxHeight);
            let calcMinHeight = Math.max((linesPerPage - numOfSeparators) * (lineHeight + padding * 2) + menuBorder * 2 + (numOfSeparators * (padding * 2)), minHeight);

            if (this.config.rotation === 0 || this.config.rotation === 180) {
                if (this.config.minWidth) ul.style.minWidth = this.config.minWidth + "px";
                if (this.config.maxWidth) ul.style.maxWidth = this.config.maxWidth + "px";
                ul.style.minHeight = calcMinHeight + "px";
                ul.style.maxHeight = calcMaxHeight + "px";
            } else if (this.config.rotation === 90 || this.config.rotation === 270) {
                if (this.config.minWidth) ul.style.minWidth = this.config.minWidth + "px";
                if (this.config.maxWidth) ul.style.maxWidth = this.config.maxWidth + "px";
                ul.style.maxHeight = calcMaxHeight + "px";
                ul.style.minHeight = calcMinHeight + "px";
            }
        });
    }

    _renderContainer(menu) {
        if (menu.items) {
            this.menuLevel = -1;
            let container = document.createElement("div");

            if (typeof this.config.renderContainer === 'function') {
                try {
                    const data = { parameters: this.config, properties: menu.properties, items: menu.items };
                    const returnObj = this.config.renderContainer(this.id, data);
                    if (!returnObj || !returnObj.node instanceof HTMLElement)
                        throw new Error('Mandatory properties missing, rendering from renderContainerCallback stopped.');
                    container = returnObj.node;

                    const cssObject = (returnObj.cssObject) ? returnObj.cssObject : null;
                    if (cssObject) this._applyCssObject(container, cssObject);
                } catch (err) {
                    this._log(err, 'ERROR');
                }
            }

            const renderedMenus = this._renderMenu(menu.instanceId, menu.items, menu.properties.menu, false);
            container.appendChild(renderedMenus);

            return container;
        }
    }

    _renderMenu(menuid, items = [], properties = [], resetProperties = false) {
        this.menuLevel += 1;
        let wrapper, ul, cssObject;

        if (typeof this.config.renderMenu === 'function') {
            try {
                const data = { parameters: this.config, properties: properties, items: items };
                const returnObj = this.config.renderMenu(menuid, data);
                if (!returnObj || !returnObj.node instanceof HTMLElement)
                    throw new Error('Mandatory properties missing, rendering from renderMenuCallback stopped.');
                wrapper = returnObj.node;
                cssObject = (returnObj.cssObject) ? returnObj.cssObject : null;

                this.positionMenuCallback = (typeof returnObj.positionMenuCallback === 'function') ? returnObj.positionMenuCallback : null;
                this.handleClickCallback = (typeof returnObj.handleClickCallback === 'function') ? returnObj.handleClickCallback : null;
            } catch (err) {
                this._log(err, 'ERROR');
            }
        } else {
            wrapper = document.createElement("div");
            ul = document.createElement("ul");
            ul.id = menuid;
            if (resetProperties) ul.classList.add('__resetProperties');

            if (this.currentBrowser && this.currentBrowser.getBrowserName() === 'Chrome' &&
                (this.currentBrowser.getOSName() === 'Linux' || this.isChromeAndroid()) &&
                this.config.rotation % 180 !== 0) {
                this.disableScrollEvent = true;
                this.sigAddEventListener('track', (event) => {
                    event.stopPropagation();
                    ul.scrollTop = ul.scrollTop + event.detail.dx / 2; 
                    if (!this.submenusHidden) this._hideAllSubmenus(ul);
                }, 'polymerEvent', ul);
            }

            if (!this.disableScrollEvent) {
                this.sigAddEventListener('scroll', () => {
                    if (!this.submenusHidden) this._hideAllSubmenus(ul);
                }, 'jsEvent', ul, { passive: true });
            }


            properties.forEach(prop => {
                switch (prop.dest) {
                    case 1:
                        ul.setAttribute('data-' + prop.name, prop.value);
                        break;
                    case 2:
                        if (prop.name === '--theme-sig-element-left' ||
                            prop.name === '--theme-sig-element-top')
                            wrapper.style.setProperty(prop.name, prop.value);
                        else
                            ul.style.setProperty(prop.name, prop.value);
                        break;
                    case 6:
                        this._applyFontObjectToNode(ul, prop.value);
                        break;
                    case 12:
                        if (this.config.rotation == null)
                            this.config.rotation = this.getRealRotation(this.config.rotation);
                        break;
                    case 14:
                        ul.classList.add(prop.value);
                        break;
                }
            });
            if (ul.dataset.showshadow && ul.dataset.showshadow !== 'false')
                ul.classList.add('menuShadow');

            wrapper.appendChild(ul);
        }

        wrapper.classList.add('__menuWrapper');

        const uls = wrapper.childNodes;
        ul = uls[uls.length - 1];

        ul.classList.add('__menu');

        if (this.config.renderMenu && cssObject && ul)
            this._applyCssObject(ul, cssObject);

        if (this.menuLevel === 0 && (this.config.direction === '' || this.config.direction == null)) {
            if (ul.dataset.direction) this.config.direction = ul.dataset.direction;
            else this.config.direction = 'down';
        }

        const _context = this.getContext(this.config.parent);
        if (_context && _context.type === 'window') {
            const _elm = document.getElementById(_context.instanceId);
            if (_elm) wrapper.style.zIndex = _elm.style.zIndex;
        }

        if (items) {
            let itemPosition = 0;
            items.forEach((itemDef) => {
                itemPosition++;
                const first = (itemPosition === 1) ? true : false;
                const last = (itemPosition === items.length) ? true : false;

                const item = this._renderItem(itemDef, ul, itemPosition, itemDef.items, first, last);
                let submenu;

                if (itemDef.items) {
                    const usechildstyling = ul.dataset.usechildstyling;
                    const menuProps = (usechildstyling && usechildstyling !== 'false') ? itemDef.properties.menu : properties;
                    const submenuid = itemDef.instanceId + '_submenu';
                    submenu = this._renderMenu(submenuid, itemDef.items, menuProps, usechildstyling);
                    item.appendChild(submenu);
                }

                this.sigAddEventListener('click', (event) => {
                    this._handleClick(event, item, ul, submenu);
                }, 'jsEvent', item);

                ul.appendChild(item);
            });
        }
        return wrapper;
    }

    _renderItem(item, ul, position, items = [], firstItem, lastItem) {
        if (typeof this.config.renderItem === 'function') {
            try {
                const data = {
                    parameters: this.config,
                    properties: item.properties,
                    items: items,
                    level: this.menuLevel,
                    position: position,
                    firstItem: firstItem, lastItem: lastItem
                }
                const returnObj = this.config.renderItem(item.instanceId, data);
                if (!returnObj || !returnObj.node instanceof HTMLElement)
                    throw new Error('Mandatory properties missing, rendering with renderItemCallback stopped.');

                const cssObject = (returnObj.cssObject) ? returnObj.cssObject : null;
                if (cssObject) this._applyCssObject(returnObj.node, cssObject);
                return returnObj.node;
            } catch (err) {
                this._log(err, 'ERROR');
            }
        }

        let li = document.createElement("li"),
            textSpan = document.createElement("span"),
            iconSpan = document.createElement("span"),
            arrowSpan = document.createElement("span"),
            menuIcon, isseparator;
        li.classList.add('menu-item');
        textSpan.classList.add('item-text');
        iconSpan.classList.add('item-icon');
        arrowSpan.classList.add('item-arrow', 'right-arrow');

        if (ul.dataset.donotselectitemonreopen !== 'true' && (item.selected || item.containsSelected)) {
            li.classList.add('menu-item-selected');
            li.selected = true;
            if (item.selected) this.selectedItemId = item.instanceId;
        }

        li.id = item.instanceId;
        item.properties.item.forEach(prop => {
            switch (prop.name) {
                case 'text':
                    if (!li.classList.contains('menu-separator'))
                        textSpan.innerText = prop.value;
                    break;
                case 'icon':
                    let img = document.createElement('img');
                    img.src = prop.value;
                    iconSpan.appendChild(img);
                    break;
                case 'isseparator':
                    isseparator = true;
                    textSpan.innerText = '';
                    li.classList.add('menu-separator');
                    li.setAttribute('data-itemposition', position);
                    const separator = document.createElement('div');
                    separator.classList.add('separator');
                    textSpan.appendChild(separator);
                    break;
                case 'state':
                    if (prop.value === 2) li.classList.add('item-inactive');
                    break;
                default:
                    this._log('Unknown property passed: ' + prop, 'INFO')
            }
        });

        let wrapperSpan = document.createElement('span');
        wrapperSpan.classList.add('itemWrapper');

        if (ul.dataset.showicons && ul.dataset.showicons !== 'false' && !isseparator)
            wrapperSpan.appendChild(iconSpan);

        if (ul.dataset.state === '2') li.classList.add('item-inactive');

        wrapperSpan.appendChild(textSpan);
        if (item.items) {
            li.classList.add('submenu-item');

            if (ul.dataset.menuicon || ul.dataset.menuiconactive) {
                menuIcon = document.createElement('img');
                arrowSpan.appendChild(menuIcon);
                if (ul.dataset.menuicon) {
                    menuIcon.src = ul.dataset.menuicon;
                    arrowSpan.classList.remove('right-arrow');
                }
            }
        } else {
            arrowSpan.classList.remove('right-arrow');
        }
        if (!isseparator) wrapperSpan.appendChild(arrowSpan);

        li.appendChild(wrapperSpan);
        return li;
    }

    _handleClick(event, item, ul, submenu) {
        event.stopPropagation();

        if (typeof this.handleClickCallback === 'function')
            return this.handleClickCallback(event, item, ul, submenu);

        const parentMenu = ul.parentElement.closest('.__menu');
        this._hideAllSubmenus(ul);

        if (!item.classList.contains('submenu-item') || !item.classList.contains('menu-item-selected'))
            this.shadowRoot.querySelectorAll(".menu-item-selected").forEach((node) => {
                if (node != item) {
                    if (node.classList.contains('submenu-opened')) {
                        if (parentMenu == null || parentMenu.dataset.keepitemactive !== 'true') {
                            node.classList.remove('menu-item-selected');
                            node.selected = false;
                        }
                        return;
                    }

                    node.classList.remove('menu-item-selected');
                    node.selected = false;

                }
            });

        if (!item.selected && !item.classList.contains('menu-separator')) {
            item.selected = true;
            item.classList.add('menu-item-selected');
            if (ul.dataset.selectondoubletap !== "false") return;
        }

        this.submittingItem = true;
        sigApi.menuManager.submit(item.id).then(() => {
            this.submittingItem = false;

            if (submenu && submenu.classList &&
                !submenu.classList.contains('visible') &&
                ul.classList.contains('visible')) {

                this._positionSubmenu(submenu);
                this._makeVisible(submenu.querySelector(".__menu"));
                this.submenusHidden = false;
                if (ul.dataset.menuiconactive && !item.classList.contains('menu-separator')) {
                    item.querySelector('.item-arrow').classList.remove('right-arrow');
                    item.querySelector('.item-arrow img').src = ul.dataset.menuiconactive;
                }

                item.classList.add('submenu-opened');
            }
        }).catch((error) => {
            this._log(error, 'ERROR');
            this.submittingItem = false;
        });

    }

    _hideAllSubmenus(ul) {
        let activeItemImage = ul.querySelector(':scope > .submenu-opened .item-arrow img');
        if (activeItemImage) {
            const menuIconUrl = ul.dataset.menuicon;

            if (menuIconUrl) activeItemImage.src = menuIconUrl;
            else activeItemImage.parentElement.classList.add('right-arrow');
        }

        ul.querySelectorAll(".__menu").forEach((submenu) => {
            if (submenu.classList.contains('visible')) {
                this._makeInvisible(submenu);

                if (submenu.dataset.menuicon) {
                    submenu.querySelectorAll('.submenu-opened .item-arrow img').forEach(image =>
                        image.src = submenu.dataset.menuicon);
                }
                submenu.closest('.menu-item').classList.remove('submenu-opened');
            }
        });
        this.submenusHidden = true;
    }

    _positionMainMenu(menu) {
        if (this.config.rotation !== 0) {
            menu.style.transform = 'rotate(' + this.config.rotation + 'deg)';
        }

        if (this.config.posX !== null && this.config.posY !== null) {
            const scaleFactors = this.getScaleFactor(menu, this.config.rotation);
            const appScale = this.getScaleFactor(this.app, 0);

            const scaleMenu = this.config.parent.scalemenu;

            let newScaleX = (scaleMenu) ? this.config.scaleX / appScale.x : 1;
            let newScaleY = (scaleMenu) ? this.config.scaleY / appScale.y : 1;

            const posX = this.config.posX / scaleFactors.x + window.pageXOffset / appScale.x;
            const posY = this.config.posY / scaleFactors.y + window.pageYOffset / appScale.y;

            let menuWidth = menu.clientWidth * newScaleX;
            let menuHeight = menu.clientHeight * newScaleY;
            let parentWidth = this.config.parent.clientWidth * (this.config.scaleX / appScale.x);
            let parentHeight = this.config.parent.clientHeight * (this.config.scaleY / appScale.y);
            const appWidth = this.app.clientWidth; 
            const appHeight = this.app.clientHeight; 
            const ul = menu.querySelector('.__menu');

            let offsetx = this.config.parent.offsetx * newScaleX;
            let offsety = this.config.parent.offsety * newScaleY;

            if (this.config.rotation === 90 || this.config.rotation === 270) {
                newScaleX = (scaleMenu) ? this.config.scaleY / appScale.x : 1;
                newScaleY = (scaleMenu) ? this.config.scaleX / appScale.y : 1;
                menuWidth = menu.clientHeight * newScaleY;
                menuHeight = menu.clientWidth * newScaleX;
                parentHeight = this.config.parent.clientWidth * (this.config.scaleY / appScale.y);
                parentWidth = this.config.parent.clientHeight * (this.config.scaleX / appScale.x);
                offsetx = this.config.parent.offsety * newScaleY;
                offsety = this.config.parent.offsetx * newScaleX;
            }


            let menuPositionLeft, menuPositionTop;

            switch (this.getRealRotation(this.config.rotation)) {
                case 90:
                    menuPositionTop = posY - parentHeight + offsety;
                    if (this.config.direction === "down") {
                        menuPositionLeft = posX - offsetx;
                    } else {
                        menuPositionLeft = posX + parentWidth + menuWidth + offsetx;
                    }
                    break;
                case 180:
                    menuPositionLeft = posX + parentWidth - offsetx;
                    if (this.config.direction === "down") {
                        menuPositionTop = posY - parentHeight - offsety;
                    } else {
                        menuPositionTop = posY + menuHeight + offsety;
                    }
                    break;
                case 270:
                    menuPositionTop = posY - offsety;
                    if (this.config.direction === "down") {
                        menuPositionLeft = posX + parentWidth + offsetx;
                    } else {
                        menuPositionLeft = posX - menuWidth - offsetx;
                    }
                    break;
                default:
                    menuPositionLeft = posX + offsetx;
                    if (this.config.direction === 'down') {
                        menuPositionTop = posY + offsety;
                    } else {
                        menuPositionTop = posY - parentHeight - menuHeight - offsety;
                    }
            }

            this._setBox(menu, menuPositionLeft, menuPositionTop);

            menu.style.transformOrigin = `0 0`;
            if (scaleMenu) menu.style.transform += `scale( ${newScaleX}, ${newScaleY})`;


            const menuBoundsReal = menu.getBoundingClientRect();
            const appBounds = this.app.getBoundingClientRect();

            const menuBounds = {
                top: menuBoundsReal.top + window.pageYOffset,
                left: menuBoundsReal.left + window.pageXOffset,
                right: menuBoundsReal.right + window.pageXOffset,
                bottom: menuBoundsReal.bottom + window.pageYOffset,
            }

            const data = {
                posY: posY, posX: posX,
                parentHeight: parentHeight, parentWidth: parentWidth,
                menuHeight: menuHeight, menuWidth: menuWidth,
                offsety: offsety, offsetx: offsetx,
                appHeight: appHeight, appWidth: appWidth,
                scaleMenu: scaleMenu,
                appScale: appScale
            };

            if (menuBounds.left < 0) {
                if (offsetx < 0) data.offsetx = 0;
                menuPositionLeft = this._correctHorizontally(ul, menuPositionLeft, this.config.rotation, 'leftBound', data);
            }
            if (menuBounds.right > appBounds.width) {
                if (offsetx < 0) data.offsetx = 0;
                menuPositionLeft = this._correctHorizontally(ul, menuPositionLeft, this.config.rotation, 'rightBound', data);
            }
            if (menuBounds.top < 0) {
                if (offsety < 0) data.offsety = 0;
                menuPositionTop = this._correctVertically(ul, menuPositionTop, this.config.rotation, 'topBound', data);
            }

            if (menuBounds.bottom > appBounds.height) {
                if (offsety < 0) data.offsety = 0;
                menuPositionTop = this._correctVertically(ul, menuPositionTop, this.config.rotation, 'bottomBound', data);
            }

            this._setBox(menu, menuPositionLeft, menuPositionTop);
        }
    }

    _correctVertically(ul, originalTopPosition, rotation, overflow, data) {
        let menuPositionTop = originalTopPosition;
        const spaceUnder = data.appHeight - data.posY - data.offsety;
        const spaceOver = data.posY - data.parentHeight - data.offsety;
        const scale = (data.scaleMenu) ? this.config.scaleY / data.appScale.y : 1;

        switch (rotation) {
            case 90:
                if (overflow === 'bottomBound') menuPositionTop = data.appHeight - data.menuHeight;
                else menuPositionTop = 0;
                break;
            case 180:
                if (overflow === 'bottomBound') {
                    const newPositionTop = data.posY - data.parentHeight - data.offsety;
                    if (newPositionTop - data.menuHeight >= 0) {
                        menuPositionTop = newPositionTop;
                    } else {
                        menuPositionTop = this._getPositionAndLimitHeight(ul, spaceUnder, spaceOver, data.appHeight, spaceOver, scale);
                    }
                } else {
                    const newPositionTop = data.posY + data.menuHeight + data.offsety;
                    if (newPositionTop <= data.appHeight) {
                        menuPositionTop = newPositionTop;
                    } else {
                        menuPositionTop = this._getPositionAndLimitHeight(ul, spaceUnder, spaceOver, data.appHeight, spaceOver, scale);
                    }
                }
                break;
            case 270:
                if (overflow === 'bottomBound') menuPositionTop = data.appHeight;
                else menuPositionTop = data.menuHeight;
                break;
            default:
                if (overflow === 'bottomBound') {
                    const newPositionTop = data.posY - data.parentHeight - data.menuHeight - data.offsety;
                    if (newPositionTop >= 0) {
                        menuPositionTop = newPositionTop;
                    } else {
                        menuPositionTop = this._getPositionAndLimitHeight(ul, spaceUnder, spaceOver, data.posY + data.offsety, 0, scale);
                    }
                } else {
                    const newPositionTop = data.posY + data.offsety;
                    if (newPositionTop + data.menuHeight <= data.appHeight) {
                        menuPositionTop = newPositionTop;
                    } else {
                        menuPositionTop = this._getPositionAndLimitHeight(ul, spaceUnder, spaceOver, data.posY + data.offsety, 0, scale);
                    }
                }
        }
        return menuPositionTop;
    }

    _correctHorizontally(ul, originalLeftPosition, rotation, overflow, data) {
        let menuPositionLeft = originalLeftPosition;
        const spaceRight = data.appWidth - data.posX - data.offsetx - data.parentWidth;
        const spaceLeft = data.posX - data.offsetx;
        const scale = (data.scaleMenu) ? this.config.scaleX / data.appScale.y : 1;

        switch (rotation) {
            case 90:
                if (overflow === 'leftBound') {
                    const newPositionLeft = data.posX + data.parentWidth + data.menuWidth + data.offsetx;
                    if (newPositionLeft <= data.appWidth) {
                        menuPositionLeft = newPositionLeft;
                    } else {
                        menuPositionLeft = this._getPositionAndLimitHeight(ul, spaceRight, spaceLeft, data.appWidth, data.posX - data.offsetx, scale);
                    }
                } else {
                    const newPositionLeft = data.posX - data.offsetx;
                    if (newPositionLeft - data.menuWidth >= 0) {
                        menuPositionLeft = newPositionLeft;
                    } else {
                        menuPositionLeft = this._getPositionAndLimitHeight(ul, spaceRight, spaceLeft, data.appWidth, data.posX - data.offsetx, scale);
                    }
                }
                break;
            case 180:
                if (overflow === 'leftBound') menuPositionLeft = data.menuWidth;
                else menuPositionLeft = data.appWidth;
                break;
            case 270:
                if (overflow === 'leftBound') {
                    const newPositionLeft = data.posX + data.parentWidth + data.offsetx;
                    if (newPositionLeft + data.menuWidth <= data.appWidth) {
                        menuPositionLeft = newPositionLeft;
                    } else {
                        menuPositionLeft = this._getPositionAndLimitHeight(ul, spaceRight, spaceLeft, data.posX + data.offsetx + data.parentWidth, 0, scale);
                    }
                } else {
                    const newPositionLeft = data.posX - data.offsetx - data.menuWidth;
                    if (newPositionLeft >= 0) {
                        menuPositionLeft = newPositionLeft;
                    } else {
                        menuPositionLeft = this._getPositionAndLimitHeight(ul, spaceRight, spaceLeft, data.posX + data.offsetx + data.parentWidth, 0, scale);
                    }
                }
                break;
            default:
                if (overflow === 'leftBound') menuPositionLeft = 0;
                else menuPositionLeft = data.appWidth - data.menuWidth;
        }
        return menuPositionLeft;
    }

    _setBox(menu, left, top) {
        menu.style.left = left + 'px';
        menu.style.top = top + 'px';
    }

    _getPositionAndLimitHeight(ul, space1, space2, position1, position2, scale) {
        let newMaxHeight, finalPosition;

        if (space1 < space2) {
            newMaxHeight = space2 / scale;
            finalPosition = position2;
        }
        else {
            newMaxHeight = space1 / scale;
            finalPosition = position1;
        }

        ul.style.maxHeight = newMaxHeight + 'px';
        if (parseInt(getComputedStyle(ul).getPropertyValue('min-height'), 10) > newMaxHeight)
            ul.style.minHeight = newMaxHeight + 'px';

        return finalPosition;
    }

    _positionSubmenu(menu) {
        menu.classList.remove('wrapper-right');
        menu.classList.remove('wrapper-left');
        menu.style.bottom = "auto";

        menu.classList.add('wrapper-right');
        const posY = menu.parentElement.offsetTop - menu.parentElement.parentElement.scrollTop;
        menu.style.top = (posY < 0) ? 0 : posY + "px";

        const menuBounds = menu.getBoundingClientRect();
        const menuWidth = menuBounds.width;
        const menuHeight = menuBounds.height;
        const menuX = menuBounds.x + window.pageXOffset;
        const menuY = menuBounds.y + window.pageYOffset;
        const ul = menu.querySelector('.__menu');

        switch (this.config.rotation) {
            case 0:
                if (menuX + menuWidth > this.appWidth) {
                    menu.classList.replace('wrapper-right', 'wrapper-left');
                }

                if (menuY + menuHeight > this.appHeight) {
                    menu.style.bottom = "0px";
                    menu.style.top = "auto";

                    const newPosY = menu.getBoundingClientRect().y;
                    if (newPosY < 0) {
                        menu.style.top = (- menuY / this.config.scaleY) + posY + "px";
                        menu.style.bottom = "auto";
                        if (menuHeight > this.appHeight) {
                            ul.style.maxHeight = this.appHeight / this.config.scaleY + "px";
                            if (parseInt(ul.style.minHeight, 10) > parseInt(ul.style.maxHeight, 10))
                                ul.style.minHeight = ul.style.maxHeight;
                        }
                    }
                }
                break;
            case 90:
                if (menuY + menuHeight > this.appHeight) {
                    menu.classList.replace('wrapper-right', 'wrapper-left');
                }
                if ((menuX < 0)) {
                    menu.style.bottom = "0px";
                    menu.style.top = "auto";

                    const newPosX = menu.getBoundingClientRect().x;
                    if (newPosX + menuWidth > this.appWidth) {
                        menu.style.top = "auto";
                        menu.style.bottom = - newPosX / this.config.scaleX + "px";
                        if (menuWidth > this.appHeight) {
                            ul.style.maxHeight = this.appWidth / this.config.scaleX + "px";
                            if (parseInt(ul.style.minHeight, 10) > parseInt(ul.style.maxHeight, 10))
                                ul.style.minHeight = ul.style.maxHeight;
                        }
                    }
                }
                break;
            case 180:
                if (menuX < 0) {
                    menu.classList.replace('wrapper-right', 'wrapper-left');
                }
                if (menuY < 0) {
                    menu.style.bottom = "0px";
                    menu.style.top = "auto";

                    const newPosY = menu.getBoundingClientRect().y / this.config.scaleY;
                    if ((menuHeight + newPosY) > this.appHeight) {
                        menu.style.top = "auto";
                        menu.style.bottom = - newPosY + "px";
                        if (menuHeight > this.appHeight) {
                            ul.style.maxHeight = this.appHeight / this.config.scaleY + "px";
                            if (parseInt(ul.style.minHeight, 10) > parseInt(ul.style.maxHeight, 10))
                                ul.style.minHeight = ul.style.maxHeight;
                        }
                    }
                }
                break;
            case 270:
                if (menuY < 0) {
                    menu.classList.replace('wrapper-right', 'wrapper-left');
                }
                if ((menuX + menuWidth > this.appWidth)) {
                    menu.style.bottom = "0px";
                    menu.style.top = "auto";

                    const newPosX = menu.getBoundingClientRect().x;
                    if (newPosX < 0) {
                        menu.style.top = - menuX / this.config.scaleX + posY + "px";
                        menu.style.bottom = "auto";
                        if (menuWidth > this.appHeight) {
                            ul.style.maxHeight = this.appWidth / this.config.scaleX + "px";
                            if (parseInt(ul.style.minHeight, 10) > parseInt(ul.style.maxHeight, 10))
                                ul.style.minHeight = ul.style.maxHeight;
                        }
                    }
                }
                break;
        }
    }

    _makeVisible(node) {
        node.classList.add('visible');
        node.style.pointerEvents = "auto";
    }

    _makeInvisible(node) {
        node.classList.remove('visible');
        node.style.pointerEvents = "none";
    }

    _applyCssObject(node, cssObj) {
        if (node instanceof HTMLElement && Object.keys(cssObj).length > 0) {
            try {
                for (const property in cssObj)
                    node.style.setProperty(property, cssObj[property]);
            } catch (error) {
                this._log(error, 'DIR');
            }
        }
    }

    _updateAppSize() {
        this.app = document.getElementsByTagName('sig-app')[0];
        const appDimensions = this.app.getBoundingClientRect();
        this.appWidth = appDimensions.width;
        this.appHeight = appDimensions.height;
    }

    _updateMenuIcon(newVal) {
        SigPolymer.afterNextRender(this, function () {
            if (this.isdesignmode && newVal !== undefined && this.shadowRoot) {
                const caret = this.shadowRoot.getElementById("rightArrow");
                if (newVal !== "") caret.classList.remove('right-arrow');
                else caret.classList.add('right-arrow');

            }
        });
    }

    _updateMenuIconActive(newVal) {
        SigPolymer.afterNextRender(this, function () {
            if (this.isdesignmode && newVal !== undefined && this.shadowRoot) {
                const caret = this.shadowRoot.getElementById("rightArrowActive");
                if (newVal !== "") caret.classList.remove('right-arrow');
                else caret.classList.add('right-arrow');

            }
        });
    }
}
customElements.define(LasalRuntimeSigMenuElement.is, LasalRuntimeSigMenuElement);
