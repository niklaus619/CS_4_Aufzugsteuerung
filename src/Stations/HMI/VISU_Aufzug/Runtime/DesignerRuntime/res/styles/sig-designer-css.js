const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
    <style>
        html {
            overflow: auto !important;
            position: unset !important;
            --theme-sig-designer-handle-zoom: 1;
        }

        body {
            -webkit-user-select: none;
            
            -moz-user-select: none;
            
            -ms-user-select: none;
            
            user-select: none;
            
            
            overflow: auto !important;
        }

        

        .develop-info-box {
            z-index: 100000;
            position: absolute;
            top: 0px;
            right: 50px;
            border: 1px solid grey;
            background: #eee;
        }

        #_development_info_box_handle {
            height: 20px;
            width: 100%;
            background: #dcd;
            font-size: 14px;
            line-height: 20px;
        }

        

        .mulitselected {
            opacity: 0.8;
            filter: grayscale(80%);
        }

        

        sig-designer-rulers {
            --theme-sig-designer-rulers-background-color: rgba(245, 245, 245, .6);
            --theme-sig-designer-rulers-carret-color: var(--theme-sig-app-gridcolor);
            --theme-sig-designer-rulers-hcarret-color: var(--theme-sig-app-gridcolor);
            --theme-sig-designer-rulers-vcarret-color: var(--theme-sig-app-gridcolor);
        }

        sig-app {
            --theme-sig-app-gridsize: 10px;
            --theme-sig-app-gridsizex: 0px;
            --theme-sig-app-gridsizey: 0px;
            --theme-sig-app-gridcolor: #f00;
            
            
            
            
        }

        

        sig-designer-lasso {
            --theme-sig-designer-lasso-background-color: rgba(32, 160, 229, 0.3);
            --theme-sig-designer-lasso-border-color: #209DE5;
        }

        body.toolbox,
        body.preview {
            background-color: rgb(255, 255, 255);
            color: #333;
        }

        

        body.toolbox.theme-dark {
            background-color: #1B1B1F;
            color: #d4d4d4;
            --theme-sig-designer-toolbox-control-background-color: #383838;
            --theme-sig-designer-toolbox-control-border-color: #535353;
            --theme-sig-designer-toolbox-control-selected-background-color: #424242;
            --theme-sig-designer-toolbox-control-selected-border-color: #1C82B9;
            --theme-sig-designer-toolbox-badge-background-color: #14537A;
            --theme-sig-designer-toolbox-badge-color: #ffffff;
            --theme-sig-designer-toolbox-icon-brightness: 90%;
            --theme-sig-designer-toolbox-preview-background-color: #2a2a2a;
            --theme-sig-designer-toolbox-preview-close-color: #ffffff;
            --theme-sig-designer-toolbox-preview-close-hover-background-color: #14537A;
            --toolbox-tooltip-background-color: #14537A;
            --toolbox-tooltip-border-color: #209DE5;
            --theme-sig-designer-toolbox-table-row-odd-color: #252525;
            --theme-sig-designer-toolbox-table-row-selected-border-color: #14537A;
            --theme-sig-designer-toolbox-table-row-selected-background-color: #424242;
        }

        body.theme-dark {
            --theme-sig-designer-toolbox-scrollbar-thumb-background-color: #3c3c3c;
            --theme-sig-designer-toolbox-scrollbar-thumb-hover-background-color: #646464;
            --theme-sig-designer-toolbox-scrollbar-thumb-active-background-color: #6e6e6e;
            --theme-sig-designer-toolbox-scrollbar-thumb-border-color: #3c3c3c;
            --theme-sig-designer-toolbox-scrollbar-track-background-color: #1e1e1e;
            --theme-sig-designer-toolbox-scrollbar-track-hover-background-color: #1e1e1e;
            --theme-sig-designer-toolbox-scrollbar-track-active-background-color: #1e1e1e;
        }

        body.theme-dark.preview {
            background-color: rgba(27,27,31,1);
            color: rgba(255,255,255,1);
            --theme-sig-designer-resource-preview-background-color:rgba(27,27,31,1);
            --theme-sig-designer-resource-preview-color: #fff;
            --theme-sig-designer-resource-detail-color: #fff;
            --theme-sig-designer-resource-detail-background-url: url('res/components/sigmatek/sig-designer-resource-detail/backgroundDark.png');
            --theme-sig-designer-resource-detail-background-color: #1B1B1F;
            --theme-sig-designer-resource-detail-border-color: #88C3FF;
        }

        #tooltip {
            cursor: default;
            background-color: var(--toolbox-tooltip-background-color, #0B68B6);
            border-radius: 2px;
            color: #fff;
            display: none;
            padding: 2px 5px;
            position: absolute;
            white-space: wrap;
            font-size: 9px;
            font-weight: normal;
            border: 1px solid var(--toolbox-tooltip-border-color, #209DE5);
            z-index: 100000;
        }

        #tooltip:before {
            content: "";
            position: absolute;
        }

        #tooltip.n:before,
        #tooltip.s:before {
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            left: 50%;
            margin-left: -5px;
        }

        #tooltip.e:before,
        #tooltip.w:before {
            border-bottom: 5px solid transparent;
            border-top: 5px solid transparent;
            margin-top: -5px;
            top: 50%;
        }

        #tooltip.n:before {
            border-top: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            bottom: -10px;
        }

        #tooltip.e:before {
            border-right: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            left: -10px;
        }

        #tooltip.s:before {
            border-bottom: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            top: -10px;
        }

        #tooltip.w:before {
            border-left: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            right: -10px;
        }

        #tooltip.ne:before,
        #tooltip.se:before {
            border-right: 10px solid transparent;
            border-left: 0;
            left: 10px;
        }

        #tooltip.nw:before,
        #tooltip.sw:before {
            border-left: 10px solid transparent;
            border-right: 0;
            right: 10px;
        }

        #tooltip.ne:before,
        #tooltip.nw:before {
            border-top: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            bottom: -10px;
        }

        #tooltip.se:before,
        #tooltip.sw:before {
            border-bottom: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            top: -10px;
        }

        #tooltip.nw-alt:before,
        #tooltip.ne-alt:before,
        #tooltip.sw-alt:before,
        #tooltip.se-alt:before {
            border-top: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            bottom: -10px;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            left: 10px;
        }

        #tooltip.ne-alt:before {
            left: auto;
            right: 10px;
        }

        #tooltip.sw-alt:before,
        #tooltip.se-alt:before {
            border-top: none;
            border-bottom: 10px solid var(--toolbox-tooltip-background-color, #0B68B6);
            bottom: auto;
            top: -10px;
        }

        #tooltip.se-alt:before {
            left: auto;
            right: 10px;
        }

        .cursor-none * {
            cursor: none !important;
        }

        .cursor-context-menu * {
            cursor: context-menu !important;
        }

        .cursor-help * {
            cursor: help !important;
        }

        .cursor-pointer * {
            cursor: pointer !important;
        }

        .cursor-wait * {
            cursor: wait !important;
        }

        .cursor-progress * {
            cursor: progress !important;
        }

        .cursor-cell * {
            cursor: cell !important;
        }

        .cursor-text * {
            cursor: text !important;
        }

        .cursor-alias * {
            cursor: alias !important;
        }

        .cursor-vertical-text * {
            cursor: vertical-text !important;
        }

        .cursor-copy * {
            cursor: copy !important;
        }

        .cursor-move * {
            cursor: move !important;
        }

        .cursor-no-drop * {
            cursor: no-drop !important;
        }

        .cursor-not-allowed * {
            cursor: not-allowed !important;
        }

        .cursor-col-resize * {
            cursor: col-resize !important;
        }

        .cursor-all-scroll * {
            cursor: all-scroll !important;
        }

        .cursor-row-resize * {
            cursor: row-resize !important;
        }

        .cursor-n-resize * {
            cursor: n-resize !important;
        }

        .cursor-e-resize * {
            cursor: e-resize !important;
        }

        .cursor-s-resize * {
            cursor: s-resize !important;
        }

        .cursor-w-resize * {
            cursor: w-resize !important;
        }

        .cursor-ne-resize * {
            cursor: ne-resize !important;
        }

        .cursor-nw-resize * {
            cursor: nw-resize !important;
        }

        .cursor-se-resize * {
            cursor: se-resize !important;
        }

        .cursor-sw-resize * {
            cursor: sw-resize !important;
        }

        .cursor-ew-resize * {
            cursor: ew-resize !important;
        }

        .cursor-ns-resize * {
            cursor: ns-resize !important;
        }

        .cursor-nesw-resize * {
            cursor: nesw-resize !important;
        }

        .cursor-nwse-resize * {
            cursor: nwse-resize !important;
        }

        .cursor-zoom-in * {
            cursor: zoom-in !important;
        }

        .cursor-zoom-out * {
            cursor: zoom-out !important;
        }

        .cursor-grab * {
            cursor: grab !important;
            cursor: -webkit-grab !important;
        }

        .cursor-grabbing * {
            cursor: grabbing !important;
            cursor: -webkit-grabbing !important;
        }

        .cursor-crosshair * {
            cursor: crosshair !important;
        }

        .cursor-rotate * {
            cursor: url(res/images/rotate.png), crosshair !important;
        }

        

        .preview::-webkit-scrollbar {
            width: 9px;
            height: 9px;
        }

        .preview::-webkit-scrollbar-button {
            width: 0px;
            height: 0px;
        }

        .preview::-webkit-scrollbar-thumb {
            background: var(--theme-sig-designer-toolbox-scrollbar-thumb-background-color, #ffffff);
            border: 1px solid var(--theme-sig-designer-toolbox-scrollbar-thumb-border-color, #d2d2d2);
            border-radius: 50px;
        }

        .preview::-webkit-scrollbar-thumb:hover {
            background: var(--theme-sig-designer-toolbox-scrollbar-thumb-hover-background-color, #b3b9bd);
        }

        .preview::-webkit-scrollbar-thumb:active {
            background: var(--theme-sig-designer-toolbox-scrollbar-thumb-active-background-color, #b3b9bd);
        }

        .preview::-webkit-scrollbar-track {
            background: var(--theme-sig-designer-toolbox-scrollbar-track-background-color, #d2d2d2);
            border: 0px none transparent;
            border-radius: 50px;
        }

        .preview::-webkit-scrollbar-track:hover {
            background: var(--theme-sig-designer-toolbox-scrollbar-track-hover-background-color, #d2d2d2);
        }

        .preview::-webkit-scrollbar-track:active {
            background: var(--theme-sig-designer-toolbox-scrollbar-track-active-background-color, #d2d2d2);
        }

        .preview::-webkit-scrollbar-corner {
            background: transparent;
        }
    </style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);