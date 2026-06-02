import { LasalRuntimeSigElement, SigPolymer } from '../sig-element/sig-element.js';
import { NodeBuffer } from './sig-designer-toolbox-nodebuffer.js';
import '../sig-utils-jquery/sig-utils-jquery.js';
import '../sig-utils-jquery-jstree/sig-utils-jquery-jstree.js';

class LasalRuntimeSigDesignerToolbox extends LasalRuntimeSigElement {

    constructor() {
        super();
        this.focusedNode = null;
        this.focusedSelection = null;
        this.defaultViewSize = 'minimal';
        this.firstRenderDone = false;
        this.treeIsInitalized = false;
        this.multiple = false;
        this.jsTree = null;
        this.searchTimeout = null;
        this.suppressCloseNodeEvent = false;
        this.suppressOpenNodeEvent = false;
        this.useEventWhitelist = true;
        this.useLegacyEventNames = false;
    }

    static get is() { return "sig-designer-toolbox"; }

    static get importMeta() { return import.meta; }

    static get template() {
        return SigPolymer.html`
            <link rel="stylesheet" href="[[importPath]]theme/style.css">
            <style include="sig-element-css">
                :host {
                    
                    color: var(--theme-sig-designer-toolbox-color, inherit);
                    background-color: var(--theme-sig-designer-toolbox-background-color, transparent);
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                :host * {
                    
                    @apply --notextselect;
                    margin: 0;
                    padding: 0;
                }

                .clearfix:after {
                    
                    @apply --clearfix
                }

                #wrapper {
                    font-size: 12px;
                    position: relative;
                    height: 100%;
                    width: 100%;
                    overflow:auto;
                }

                #controls {
                    color: inherit;
                    overflow: hidden;
                    content-visibility:auto;
                }

                #wrapper::-webkit-scrollbar {
                    width: 9px;
                    height: 9px;
                }

                #wrapper::-webkit-scrollbar-button {
                    width: 0px;
                    height: 0px;
                }

                #wrapper::-webkit-scrollbar-thumb {
                    background: var(--theme-sig-designer-toolbox-scrollbar-thumb-background-color, #ffffff);
                    border: 1px solid var(--theme-sig-designer-toolbox-scrollbar-thumb-border-color, #d2d2d2);
                    border-radius: 50px;
                }

                #wrapper::-webkit-scrollbar-thumb:hover {
                    background: var(--theme-sig-designer-toolbox-scrollbar-thumb-hover-background-color, #b3b9bd);
                }

                #wrapper::-webkit-scrollbar-thumb:active {
                    background: var(--theme-sig-designer-toolbox-scrollbar-thumb-active-background-color, #b3b9bd);
                }

                #wrapper::-webkit-scrollbar-track {
                    background: var(--theme-sig-designer-toolbox-scrollbar-track-background-color, #d2d2d2);
                    border: 0px none transparent;
                    border-radius: 50px;
                }

                #wrapper::-webkit-scrollbar-track:hover {
                    background: var(--theme-sig-designer-toolbox-scrollbar-track-hover-background-color, #d2d2d2);
                }

                #wrapper::-webkit-scrollbar-track:active {
                    background: var(--theme-sig-designer-toolbox-scrollbar-track-active-background-color, #d2d2d2);
                }

                #wrapper::-webkit-scrollbar-corner {
                    background: transparent;
                }
             
                #search {
                    display: inline-block;
                    width: calc(100% - 35px);
                }

               #toolbar {
                   position: sticky;
                    top:0;
                    background-color:black;
                    padding:5px;
                    white-space: nowrap;
                    z-index:1;
                    display:none;
                }

                :host([showtoolbar]) #toolbar {
                    display:block;
                }

                #searchbar {
                    width:100%;
                    margin-top:3px;
                }

                #tree {
                    zoom: var(--zoomlevel, 100%);
                    height:100%;
                    background-color: transparent;
                }

                .button {
                    padding:4px 8px;
                    cursor: pointer;
                    color: white;
                    background: #222;
                    display: inline-block;
                }
                .button:hover{
                    background-color: #0A5CA1;
                }
                #expand:before {
                    @apply --symbol;
                    content: "\\f103";
                }
                #collapse:before {
                    @apply --symbol;
                    content: "\\f102";
                }
                #create:before {
                    @apply --symbol;
                    content: "\\f055";
                }
                #rename:before {
                    @apply --symbol;
                    content: "\\f246";
                }
                #delete:before {
                    @apply --symbol;
                    content: "\\f2ed";
                }
                #resetsearch:before {
                    @apply --symbol;
                    content: "\\f55a";
                }
                 #zoomin:before {
                    @apply --symbol;
                    content: "\\f00e";
                }
                #zoomout:before {
                    @apply --symbol;
                    content: "\\f010";
                }
                #resetzoom:before {
                    @apply --symbol;
                    content: "\\f065";
                }
            </style>
            <div id="wrapper">
                <div id="toolbar">
                        <div id="expand" class="button" title="Expand all" on-click="_openAllNodes"></div>
                        <div id="collapse" class="button" title="Collapse all" on-click="_closeAllNodes"></div>
                        <div id="create" class="button" title="Create node" on-click="_createNode"></div>
                        <div id="rename" class="button" title="Rename node" on-click="_renameNode"></div>
                        <div id="delete" class="button" title="Delete node" on-click="_deleteNode"></div>  
                        <div id="zoomin" class="button" title="Zoom in" on-click="_zoomIn"></div>  
                        <div id="resetzoom" class="button" title="Reset zoom" on-click="_resetZoom"></div>  
                        <div id="zoomout" class="button" title="Zoom out" on-click="_zoomOut"></div> 
                        <div id="searchbar">
                            <input id="search" type="text" placeholder="Search" on-keydown="_search" ><div id="resetsearch" title="Reset search" class="button"  on-click="_resetSearch"></div>  
                        </div>
                </div>
                <div id="view"></div>
            </div>
        `;
    }

    static get properties() {
        let props = {
            json: {
                type: Object,
                value: () => { return {} },
                observer: '_updateJson'
            },
            viewtype: {
                type: String,
                value: 'tree',
                observer: '_toggleClass',
            },
            viewSize: {
                type: String,
                value: this.defaultViewSize,
                observer: '_toggleClass'
            },
            viewTheme: {
                type: String,
                value: undefined,
                observer: '_toggleTheme'
            },
            showtoolbar: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            },
            zoomlevel: {
                type: Number,
                value: 100,
                observer: '_updateZoomlevel'
            }
        }
        return props;
    }

    connectedCallback() {
        super.connectedCallback();
        document.body.classList.add('toolbox');

        this._sendDesignerEvent({
            type: 'readyToolboxEvent'
        });
    }

    disconnectedCallback() {
        $(this.$.tree).off();
        $(document).off();
        this.jsTree.destroy();
        this.jstree = null;
        clearTimeout(this.searchTimeout);
        this.focusedNode = null;
        this.focusedSelection = null;
        NodeBuffer.destroy();
    }

    _renderView(json) {
        this._appendRootNode('controls', this.$.view, ['clearfix']);
        this.viewTheme = this._getThemeName();
        if (json.viewSize) {
            switch (json.viewSize) {
                case 'normal':
                    this.viewSize = 'normal';
                    break;
                case 'compact':
                    this.viewSize = 'compact';
                    break;
                case 'minimal':
                    this.viewSize = 'minimal';
                    break;
                default:
                    this.viewSize = this.defaultViewSize;
                    break;
            }
        } else {
            this.viewSize = this.defaultViewSize;
        }
        if (json.viewType) {
            switch (json.viewType) {
                case 'tree':
                    this.viewtype = 'tree';
                    this.showtoolbar = false;
                    this._buildTree();
                    break;
                default:
                    this.viewtype = '';
                    this._log('Unsupported view type!', 'ERROR');
                    break;
            }
            this.firstRenderDone = true;
            this._log(`[_renderView] Rendering view "${this.viewtype}" in size "${this.viewSize}" using theme "${this.viewTheme}"`);

        } else {
            this._log(`[_renderView] No view type defined!`, 'ERROR');
        }
    }

    _buildTree() {
        if (this.treeIsInitalized && this.jsTree) {
            this.jsTree.destroy();
            this.treeIsInitalized = false;
        }

        this._appendRootNode('tree', this.$.controls);

        $(this.$.tree).jstree({
            core: {
                animation: false,
                multiple: this.multiple,
                check_callback: true,
                data: (this.json.treeItems) ? this.json.treeItems : [],
                themes: {
                    dots: true,
                    stripes: false,
                    name: 'designer',
                    variant: this.viewSize
                },
            },
            search: {
                show_only_matches: true,
                show_only_matches_children: true,
                search_leaves_only: false
            },
            dnd: {
                use_html5: false,
            },
            plugins: [(this.showtoolbar) ? 'search' : undefined]
        });
        this._addTreeEventListeners();
    }

    _addTreeEventListeners() {
        $(this.$.tree).on('ready.jstree', (evt) => {
            this.jsTree = $(this.$.tree).jstree(true);
            this.treeIsInitalized = true;
        });

        $(this.$.tree).on('select_node.jstree', (evt, data) => {
            if (evt && data) {
                const buffer = this._bufferTreeEvent('selectNode', data.node.id, () => {
                    const unselected = this._getUnselectedNodes(data.selected);
                    if (unselected && unselected.length) {
                        this._sendDesignerEvent({
                            type: (this.useLegacyEventNames) ? 'unselectToolboxComponentEvent' : 'unselectedToolboxEvent',
                            ids: unselected
                        });
                    }
                    this._sendDesignerEvent({
                        type: (this.useLegacyEventNames) ? 'selectToolboxComponentEvent' : 'selectedToolboxEvent',
                        ids: buffer.getNodes()
                    });
                });
            }
        });

        $(this.$.tree).on('deselect_node.jstree', (evt, data) => {
            if (evt && data) {
                const buffer = this._bufferTreeEvent('deselectNode', data.node.id, () => {
                    this._sendDesignerEvent({
                        type: (this.useLegacyEventNames) ? 'unselectToolboxComponentEvent' : 'unselectedToolboxEvent',
                        ids: buffer.getNodes()
                    });
                });
                if (data.node === this.focusedNode) this.focusedNode = null;
            }
        });

        $(document).on('dragstart.jstree', (evt) => {
            if (evt && this.focusedNode && this.focusedNode.data && this.focusedNode.data.type === "toolboxControl" && this.focusedNode.data.controlId) {
                const id = this.focusedNode.id;
                const controlId = this.focusedNode.data.controlId;
                const path = this.jsTree.get_path(id, false, true);
                let library;
                if (path.length) {
                    const rootId = path[0];
                    const node = this.jsTree.get_node(rootId);
                    library = (node && node.data && node.data.nodeType === 'ToolboxLibrary') ? node.text : undefined;
                }
                const data = `{ "type": "toolboxImportData", ${(library) ? `"library": "${library}", ` : ''}"id": "${id}", "controlId": "${controlId}" }`;
                this._log('Added ' + data + ' to the dragstart event.');
                evt.originalEvent.dataTransfer.setData('text', data);
            }
        });

        $(document).on('mousedown.jstree', (evt, data) => {

            const path = (evt && evt.originalEvent) ? evt.originalEvent.path || evt.originalEvent.composedPath() : null;
            if (path && path[0]) {
                const target = path[0].closest('a');
                const node = (target) ? this.jsTree.get_node(target.id) : null;
                if (node) {
                    let selection = this.jsTree.get_selected();
                    if (evt.which === 3) {
                        this._sendDesignerEvent({
                            type: 'selectedRightClickToolboxEvent',
                            id: node.id
                        });
                        const isSelected = this.jsTree.get_node(node).state.selected;
                        if (!isSelected) this.jsTree.deselect_node(selection);
                        this.jsTree.select_node(node.id);
                        selection = this.jsTree.get_selected();
                    }
                    this.focusedNode = node;
                    this.focusedSelection = selection;
                }
            }
        });

        $(this.$.tree).on('open_node.jstree', (evt, data) => {
            if (this.suppressOpenNodeEvent) return;
            const buffer = this._bufferTreeEvent('openNode', data.node.id, () => {
                this._sendDesignerEvent({
                    type: 'openedNodeToolboxEvent',
                    ids: buffer.getNodes()
                });
            });
        });

        $(this.$.tree).on('close_node.jstree', (evt, data) => {
            if (this.suppressCloseNodeEvent) return;
            const buffer = this._bufferTreeEvent('closeNode', data.node.id, () => {
                this._sendDesignerEvent({
                    type: 'closedNodeToolboxEvent',
                    ids: buffer.getNodes()
                });
            });
        });

        $(this.$.tree).on('open_all.jstree', (evt, data) => {
            const buffer = this._bufferTreeEvent('openAll', (data.node) ? data.node.id : '#', () => {
                this._sendDesignerEvent({
                    type: 'openedAllToolboxEvent',
                });
                this.suppressOpenNodeEvent = false;
            });
        });

        $(this.$.tree).on('close_all.jstree', (evt, data) => {
            const buffer = this._bufferTreeEvent('closeAll', (data.node) ? data.node.id : '#', () => {
                this._sendDesignerEvent({
                    type: 'closedAllToolboxEvent',
                });
                this.suppressCloseNodeEvent = false;
            });
        });
    }

    _appendRootNode(id, parent = this.shadowRoot, classes = []) {
        if (typeof id === 'string' && parent && !(this.shadowRoot.getElementById(id) instanceof HTMLElement)) {
            const node = document.createElement('div');
            node.id = id;
            if (Array.isArray(classes)) {
                classes.forEach(className => {
                    node.classList.add(className);
                });
            }
            parent.appendChild(node);
            this.$[id] = node;
        }
    }

    _openAllNodes(id, openParents = false) {
        this.suppressOpenNodeEvent = true;
        if (openParents && typeof id === "string") this.jsTree._open_to(id);
        this.jsTree.open_all((typeof id === "string") ? id : undefined);
    }

    _openNodes(ids, openParents = false) {
        if (ids) {
            this.jsTree.open_node(ids);
            if (openParents) {
                if (typeof ids === 'string') {
                    this.jsTree._open_to(ids);
                } else if (Array.isArray(ids)) {
                    ids.forEach(id => {
                        this.jsTree._open_to(id);
                    });
                }
            }
        }
    }

    _closeAllNodes(id) {
        this.suppressCloseNodeEvent = true;
        this.jsTree.close_all((typeof id === "string") ? id : undefined);
    }

    _closeNodes(ids) {
        if (ids) this.jsTree.close_node(ids);
    }

    _selectAllNodes() {
        this.jsTree.select_all();
    }

    _selectNodes(ids) {
        this.jsTree.select_node(ids);
    }

    _deselectAllNodes() {
        this.jsTree.deselect_all();
    }

    _deselectNodes(ids) {
        this.jsTree.deselect_node(ids);
    }

    _getSelectionModel() {
        const selection = this.jsTree.get_selected();
        const model = {
            ids: (selection.length) ? selection : [],
            focused: (this.focusedNode) ? this.focusedNode.id : null
        };
        return model;
    }

    _createNode() {
        const ref = this.jsTree;
        let sel = ref.get_selected();
        if (!sel.length) { return false; }
        sel = sel[0];
        sel = ref.create_node(sel);
        if (sel) ref.edit(sel);
    }

    _renameNode() {
        const ref = this.jsTree;
        let sel = ref.get_selected();
        if (!sel.length || sel.length > 1) return false;
        sel = sel[0];
        ref.edit(sel);
    }

    _deleteNode() {
        let hasChilds = false;
        const ref = this.jsTree;
        let sel = ref.get_selected();
        if (!sel.length) return false;
        sel.forEach(id => {
            const node = ref.get_json(id);
            if (node.children.length) hasChilds = true;
        });
        if (hasChilds) {
            alert('Cannot delete nodes with children!');
            return false;
        }
        if (confirm('Delete nodes?')) ref.delete_node(sel);
    }

    _search() {
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            if (!this.disconnected) $(this.$.tree).jstree('search', $(this.$.search).val());
        }, 300);
    }

    _resetSearch() {
        $(this.$.search).val(null);
        $(this.$.tree).jstree('search', $(this.$.search).val())
    }

    _zoomIn() {
        this.zoomlevel += 10;
    }

    _zoomOut() {
        this.zoomlevel -= 10;
    }

    _resetZoom() {
        this.zoomlevel = 100;
    }

    _setZoom(zoomlevel) {
        if (zoomlevel) this.zoomlevel = zoomlevel;
    }

    _updateJson(newJson, oldJson) {
        if (oldJson !== undefined && newJson !== undefined && newJson.treeItems !== undefined) {
            this._log('[_updateJson] Rendering json:');
            this._renderView(newJson);
        }
    }

    _updateZoomlevel(newZoomlevel, oldZoomlevel) {
        if (newZoomlevel) this.style.setProperty('--zoomlevel', newZoomlevel + '%');
    }

    _toggleClass(newClass, oldClass) {
        if (newClass !== undefined && oldClass !== undefined) {
            if (oldClass.length) this.$.controls.classList.remove(oldClass);
            if (newClass.length) {
                this._log(`Apply class "${newClass}"`);
                this.$.controls.classList.add(newClass);
            }
        }
    }

    _toggleTheme(newTheme, oldTheme) {
        if (newTheme && !oldTheme) this.$.view.classList.add(newTheme);
        if (newTheme && oldTheme) this.$.view.classList.replace(oldTheme, newTheme);
    }

    _getThemeName() {
        let theme = '';
        document.body.classList.forEach(className => {
            if (className.startsWith('theme-')) theme = className;
        });
        return theme;
    }

    _sendDesignerEvent(payload) {
        if (payload) {
            const allowedEvents = [
                'unselectToolboxComponentEvent',
                'unselectedToolboxEvent',
                'selectToolboxComponentEvent',
                'selectedToolboxEvent',
                'selectedRightClickToolboxEvent',
                'openedNodeToolboxEvent',
                'closedNodeToolboxEvent',
                'openedAllToolboxEvent',
                'closedAllToolboxEvent'
            ];
            if (allowedEvents.includes(payload.type) || !this.useEventWhitelist) {
                this._log('[_sendDesignerEvent]' + JSON.stringify(payload));
                window.designerEvent.onEvent(payload);
            } else {
                this._log('[_sendDesignerEvent] Simulated: ' + JSON.stringify(payload));
            }
        } else {
            this._log('[_sendDesignerEvent] Cannot send designer event. Payload is missing!', 'ERROR');
        }
    }

    _bufferTreeEvent(id, node, fnc) {
        if (id && node && fnc) {
            const buffer = NodeBuffer.getInstance(id);
            buffer.addNode(node);
            buffer.clearTimeout();
            buffer.setTimeout(() => {
                if (!this.disconnected) {
                    if (buffer.hasNodes()) fnc();
                    buffer.empty();
                }
            });
            return buffer;
        }
    }

    _getUnselectedNodes(currentSelection) {
        if (currentSelection && this.focusedSelection) {
            const selected = new Set(currentSelection);
            const unselected = [...this.focusedSelection].filter(node => !selected.has(node));
            return (unselected) ? unselected : [];
        }
    }
}
customElements.define(LasalRuntimeSigDesignerToolbox.is, LasalRuntimeSigDesignerToolbox);