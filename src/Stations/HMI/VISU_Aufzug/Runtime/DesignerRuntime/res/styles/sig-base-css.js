const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
    <style>
        @font-face {
            
            font-family: 'u2000';
            src: url('rt/fonts/unicode/u2000.ttf');
            src: url('rt/fonts/unicode/u2000.eot') format('embedded-opentype'), url('rt/fonts/unicode/u2000.woff2') format('woff2'), url('rt/fonts/unicode/u2000.woff') format('woff'), url('rt/fonts/unicode/u2000.ttf') format('truetype'), url('rt/fonts/unicode/u2000.svg') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            
            font-family: 'u2800';
            src: url('rt/fonts/unicode/u2800.ttf');
            src: url('rt/fonts/unicode/u2800.eot') format('embedded-opentype'), url('rt/fonts/unicode/u2800.woff2') format('woff2'), url('rt/fonts/unicode/u2800.woff') format('woff'), url('rt/fonts/unicode/u2800.ttf') format('truetype'), url('rt/fonts/unicode/u2800.svg') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            
            font-family: 'FontAwesomeSolid';
            src: url('rt/fonts/fontawesome/fa-solid-900.woff');
            src: url('rt/fonts/fontawesome/fa-solid-900.eot') format('embedded-opentype'), url('rt/fonts/fontawesome/fa-solid-900.woff2') format('woff2'), url('rt/fonts/fontawesome/fa-solid-900.woff') format('woff'), url('rt/fonts/fontawesome/fa-solid-900.ttf') format('truetype'), url('rt/fonts/fontawesome/fa-solid-900.svg') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            
            font-family: 'FontAwesomeRegular';
            src: url('rt/fonts/fontawesome/fa-regular-400.woff');
            src: url('rt/fonts/fontawesome/fa-regular-400.eot') format('embedded-opentype'), url('rt/fonts/fontawesome/fa-regular-400.woff2') format('woff2'), url('rt/fonts/fontawesome/fa-regular-400.woff') format('woff'), url('rt/fonts/fontawesome/fa-regular-400.ttf') format('truetype'), url('rt/fonts/fontawesome/fa-regular-400.svg') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        @font-face {
            
            font-family: 'FontAwesomeBrands';
            src: url('rt/fonts/fontawesome/fa-brands-400.woff');
            src: url('rt/fonts/fontawesome/fa-brands-400.eot') format('embedded-opentype'), url('rt/fonts/fontawesome/fa-brands-400.woff2') format('woff2'), url('rt/fonts/fontawesome/fa-brands-400.woff') format('woff'), url('rt/fonts/fontawesome/fa-brands-400.ttf') format('truetype'), url('rt/fonts/fontawesome/fa-brands-400.svg') format('svg');
            font-weight: normal;
            font-style: normal;
        }

        html {
            height: 100%;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 16px;
            overflow: hidden;
            
            position: fixed;
            
            overscroll-behavior-x: none;

            --clearfix: {
                
                content: "";
                display: block;
                clear: both;
            }

            --notextselect: {
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: -moz-none;
                -o-user-select: none;
                -ms-user-select: none;
                user-select: none;
                
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
            }

            --symbol: {
                font-family: FontAwesomeSolid;
                font-style: normal;
                font-weight: normal;
                font-size: inherit;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            --symbolRegular: {
                font-family: FontAwesomeRegular;
                font-style: normal;
                font-weight: normal;
                font-size: inherit;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            --symbolBrands: {
                font-family: FontAwesomeBrands;
                font-style: normal;
                font-weight: normal;
                font-size: inherit;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            --u2000: {
                font-family: u2000;
                font-style: normal;
                font-weight: normal;
                font-size: inherit;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }

            --u2800: {
                font-family: u2800;
                font-style: normal;
                font-weight: normal;
                font-size: inherit;
                display: inline-block;
                text-rendering: auto;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
        }

        body {
            height: 100%;
            margin: 0;
            padding: 0;
            background-color: #333;
            overflow: auto !important;
            -webkit-touch-callout: none !important; 
        }

        .sig-element-not-ready {
            display: none !important;
        }

        .sig-element-invisible {
            display: none !important;
        }

        .sig-element-invisible[isdesignmode] {
            
            display: block !important;
            opacity: .3 !important;
        }

        .sig-element-checkbit {
            display: none !important;
        }

        .sig-element-no-render {
            display: none !important;
        }

        .sig-element-inactive {
            pointer-events: none !important;
            opacity: var(--theme-sig-element-inactive-opacity, 1);
        }
        
        body.sig-allow-inactive-interaction .sig-element-inactive {
            pointer-events: all !important;
        }
        
        
        .sig-element-isdraggable {
            cursor: grab !important;
            cursor: -webkit-grab !important;
        }

        
        .sig-element-isdraggable *,
        .sig-element-isdragclone * {
            pointer-events: none !important;
        }

        
        .sig-element-isdragclone {
            pointer-events: none !important;
            opacity: var(--theme-sig-element-dragged-opacity, 0.8);
            cursor: grabbing !important;
            cursor: -webkit-grabbing !important;
        }

        .cursor-grabbing,
        .cursor-grabbing * {
            cursor: grabbing !important;
            cursor: -webkit-grabbing !important;
        }
    </style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);