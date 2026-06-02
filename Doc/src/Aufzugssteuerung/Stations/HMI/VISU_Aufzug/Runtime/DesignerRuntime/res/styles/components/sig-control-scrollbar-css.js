const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">

        :host  {
   --theme-sig-control-scrollbar-width: 25px;
   --theme-sig-control-scrollbar-background-color: #404247;
   --theme-sig-control-scrollbar-track-background-color: #D7D7D7;
   --theme-sig-control-scrollbar-track-border-width: 0px;
   --theme-sig-control-scrollbar-track-border-top-width: 1px;
   --theme-sig-control-scrollbar-track-border-bottom-width: 1px;
   --theme-sig-control-scrollbar-track-border-left-width: 8px;
   --theme-sig-control-scrollbar-track-border-right-width: 8px;
   --theme-sig-control-scrollbar-track-border-style: solid;
   --theme-sig-control-scrollbar-track-border-color: #404247;
   --theme-sig-control-scrollbar-track-border-radius: 0px;
   --theme-sig-control-scrollbar-track-active-background-color: #D7D7D7;
   --theme-sig-control-scrollbar-track-active-border-color: #404247;
   --theme-sig-control-scrollbar-thumb-background-color: #AEC81A;
   --theme-sig-control-scrollbar-thumb-border-width: 0px;
   --theme-sig-control-scrollbar-thumb-border-top-width: 1px;
   --theme-sig-control-scrollbar-thumb-border-bottom-width: 1px;
   --theme-sig-control-scrollbar-thumb-border-left-width: 8px;
   --theme-sig-control-scrollbar-thumb-border-right-width: 8px;
   --theme-sig-control-scrollbar-thumb-border-style: solid;
   --theme-sig-control-scrollbar-thumb-border-color: #404247;
   --theme-sig-control-scrollbar-thumb-border-radius: 0px;
   --theme-sig-control-scrollbar-thumb-active-background-color: #AEC81A;
   --theme-sig-control-scrollbar-thumb-active-border-color: #404247;
   --theme-sig-control-scrollbar-button-color: #D7D7D7;
   --theme-sig-control-scrollbar-button-background-color: #404247;
   --theme-sig-control-scrollbar-button-border-width: 0px;
   --theme-sig-control-scrollbar-button-height: 20px;
   --theme-sig-control-scrollbar-button-border-style: none;
   --theme-sig-control-scrollbar-button-border-radius: 0px;
   --theme-sig-control-scrollbar-button-active-color: #D7D7D7;
   --theme-sig-control-scrollbar-button-active-background-color: #404247;
}

        
        @media (min-resolution:.001dpcm) { 
         :host {
            
            --button-size-inc1: calc(var(--theme-sig-control-scrollbar-button-size, 43%) + 1%);
            --button-size-dec12: calc(var(--theme-sig-control-scrollbar-button-size, 43%) - 12%);
            --button-size-dec10: calc(var(--theme-sig-control-scrollbar-button-size, 43%) - 10%);
            --button-size-dec9: calc(var(--theme-sig-control-scrollbar-button-size, 43%) - 9%);
        }
        ::-webkit-scrollbar {
            width: var(--theme-sig-control-scrollbar-width,25px);
            font-size: inherit;
            background-color: var(--theme-sig-control-scrollbar-background-color, var(--palette-default-color251));
        }

        ::-webkit-scrollbar:horizontal {
            height: var(--theme-sig-control-scrollbar-width,25px);
        }

        
        ::-webkit-scrollbar-corner {
            background: var(--theme-sig-control-scrollbar-background-color,var(--palette-default-color251));
        }

        
        ::-webkit-scrollbar-track:vertical {
            
            border-top-width: var(--theme-sig-control-scrollbar-track-border-top-width, var(--theme-sig-control-scrollbar-track-border-width, 1px));
            border-bottom-width: var(--theme-sig-control-scrollbar-track-border-bottom-width, var(--theme-sig-control-scrollbar-track-border-width, 1px));
            border-left-width: var(--theme-sig-control-scrollbar-track-border-left-width, var(--theme-sig-control-scrollbar-track-border-width, 8px));
            border-right-width: var(--theme-sig-control-scrollbar-track-border-right-width, var(--theme-sig-control-scrollbar-track-border-width, 8px));        
            border-style: var(--theme-sig-control-scrollbar-track-border-style, solid);
            border-color: var(--theme-sig-control-scrollbar-track-border-color, var(--palette-default-color251));
            border-radius: var(--theme-sig-control-scrollbar-track-border-radius, 0px);
            background-color: var(--theme-sig-control-scrollbar-track-background-color, var(--palette-default-color246));
        }

        ::-webkit-scrollbar-track:horizontal {
            overflow:hidden;          
            
            border-top-width: var(--theme-sig-control-scrollbar-track-border-left-width, var(--theme-sig-control-scrollbar-track-border-width, 8px));
            border-bottom-width: var(--theme-sig-control-scrollbar-track-border-right-width, var(--theme-sig-control-scrollbar-track-border-width, 8px));
            border-left-width: var(--theme-sig-control-scrollbar-track-border-bottom-width, var(--theme-sig-control-scrollbar-track-border-width, 1px));
            border-right-width: var(--theme-sig-control-scrollbar-track-border-top-width, var(--theme-sig-control-scrollbar-track-border-width, 1px));        
            border-style: var(--theme-sig-control-scrollbar-track-border-style, solid);
            border-color: var(--theme-sig-control-scrollbar-track-border-color, var(--palette-default-color251));
            border-radius: var(--theme-sig-control-scrollbar-track-border-radius, 0px);
            background-color: var(--theme-sig-control-scrollbar-track-background-color, var(--palette-default-color246));
        }

        

        ::-webkit-scrollbar-thumb:vertical {     
            
            border-top-width: var(--theme-sig-control-scrollbar-thumb-border-top-width, var(--theme-sig-control-scrollbar-thumb-border-width, 1px));
            border-bottom-width: var(--theme-sig-control-scrollbar-thumb-border-bottom-width, var(--theme-sig-control-scrollbar-thumb-border-width, 1px));
            border-left-width: var(--theme-sig-control-scrollbar-thumb-border-left-width, var(--theme-sig-control-scrollbar-thumb-border-width, 8px));
            border-right-width: var(--theme-sig-control-scrollbar-thumb-border-right-width, var(--theme-sig-control-scrollbar-thumb-border-width, 8px));
            border-style: var(--theme-sig-control-scrollbar-thumb-border-style, solid);
            border-color: var(--theme-sig-control-scrollbar-thumb-border-color,var(--palette-default-color251));
            border-radius: var(--theme-sig-control-scrollbar-thumb-border-radius, 0px);
            background: var(--theme-sig-control-scrollbar-thumb-background-color, var(--palette-default-color240));
            height: var(--theme-sig-control-scrollbar-height, 20px);
        }

        ::-webkit-scrollbar-thumb:horizontal {
            
            border-top-width: var(--theme-sig-control-scrollbar-thumb-border-left-width, var(--theme-sig-control-scrollbar-thumb-border-width, 8px));
            border-bottom-width: var(--theme-sig-control-scrollbar-thumb-border-right-width, var(--theme-sig-control-scrollbar-thumb-border-width, 8px));
            border-left-width: var(--theme-sig-control-scrollbar-thumb-border-bottom-width, var(--theme-sig-control-scrollbar-thumb-border-width, 1px));
            border-right-width: var(--theme-sig-control-scrollbar-thumb-border-top-width, var(--theme-sig-control-scrollbar-thumb-border-width, 1px));
            border-style: var(--theme-sig-control-scrollbar-thumb-border-style, solid);
                
            border-color: var(--theme-sig-control-scrollbar-thumb-border-color, var(--palette-default-color251));
            border-radius: var(--theme-sig-control-scrollbar-thumb-border-radius, 0px);
            background: var(--theme-sig-control-scrollbar-thumb-background-color, var(--palette-default-color240));
            height: var(--theme-sig-control-scrollbar-height, 20px);
        }

        
        ::-webkit-scrollbar-thumb:active {
            background: var(--theme-sig-control-scrollbar-thumb-active-background-color, var(--palette-default-color240));
            border-color: var(--theme-sig-control-scrollbar-thumb-active-border-color, var(--palette-default-color251));
        }

        ::-webkit-scrollbar-track:active {
            background: var(--theme-sig-control-scrollbar-track-active-background-color,var(--palette-default-color246));
            border-color: var(--theme-sig-control-scrollbar-track-active-border-color,var(--palette-default-color251));
        }

        
    ::-webkit-scrollbar-button {
            display: block;
            background-size: 100%;
            background-repeat: no-repeat;
            transform: unset !important;

            background-position: center;
            border-width: var(--theme-sig-control-scrollbar-button-border-width, 0px);
            border-style: var(--theme-sig-control-scrollbar-button-border-style, none);
            border-color: var(--theme-sig-control-scrollbar-button-border-color, transparent);
            border-radius: var(--theme-sig-control-scrollbar-button-border-radius, 0px);
        }

        ::-webkit-scrollbar-button:vertical {
            height: var(--theme-sig-control-scrollbar-button-height, 24px);
        }

        ::-webkit-scrollbar-button:horizontal {
            width: var(--theme-sig-control-scrollbar-button-height, 24px);
        }

        ::-webkit-scrollbar-button:end:increment,
        ::-webkit-scrollbar-button:start:decrement {
            display: block;
        }

        ::-webkit-scrollbar-button:end:decrement,
        ::-webkit-scrollbar-button:start:increment {
            display: none;
        }

        ::-webkit-scrollbar-button:vertical:start:decrement {
            background-image: var(--theme-sig-control-scrollbar-up-image,  linear-gradient(120deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(240deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(0deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--button-size-dec12), rgba(0,0,0,0) var(--button-size-dec12)));
            background-size: contain;
            background-color: var(--theme-sig-control-scrollbar-button-color, var(--palette-default-color246));
            background-repeat: no-repeat;
            background-position: center;
        }

        ::-webkit-scrollbar-button:vertical:end:increment {
            background-color: var(--theme-sig-control-scrollbar-button-color, var(--palette-default-color246));
            background-image: var(--theme-sig-control-scrollbar-down-image, linear-gradient(300deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(60deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(180deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--button-size-dec10), rgba(0,0,0,0) var(--button-size-dec9)));
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        ::-webkit-scrollbar-button:horizontal:end:increment {
            background-color: var(--theme-sig-control-scrollbar-button-color, var(--palette-default-color246));
            background-image:var(--theme-sig-control-scrollbar-right-image, linear-gradient(210deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(330deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(90deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--button-size-dec10), rgba(0,0,0,0) var(--button-size-dec9)));
        }

        ::-webkit-scrollbar-button:horizontal:start:decrement {
            background-color: var(--theme-sig-control-scrollbar-button-color, var(--palette-default-color246));
            background-image: var(--theme-sig-control-scrollbar-left-image, linear-gradient(30deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
            linear-gradient(150deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0, 0, 0, 0) var(--button-size-inc1)),
            linear-gradient(270deg, var(--theme-sig-control-scrollbar-button-background-color,var(--palette-default-color251)) var(--button-size-dec10), rgba(0, 0, 0, 0) var(--button-size-dec9)));
        }

        

        

        ::-webkit-scrollbar-button:active {
            border-color: var(--theme-sig-control-scrollbar-button-active-border-color, rgba(0,0,0,0));
        }

        ::-webkit-scrollbar-button:active:vertical:start:decrement {
            background-image: var(--theme-sig-control-scrollbar-active-up-image, var(--theme-sig-control-scrollbar-up-image,  linear-gradient(120deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(240deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(0deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--button-size-dec12), rgba(0,0,0,0) var(--button-size-dec12))));
            background-size: contain;
            background-color: var(--theme-sig-control-scrollbar-button-active-color, var(--palette-default-color246));
            background-repeat: no-repeat;
            background-position: center;
        }

        ::-webkit-scrollbar-button:active:vertical:end:increment {
            background-color: var(--theme-sig-control-scrollbar-button-active-color, var(--palette-default-color246)) !important;
            background-image: var(--theme-sig-control-scrollbar-active-down-image, var(--theme-sig-control-scrollbar-down-image, linear-gradient(300deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(60deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(180deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--button-size-dec10), rgba(0,0,0,0) var(--button-size-dec9))));
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        ::-webkit-scrollbar-button:active:horizontal:end:increment {
            background-color: var(--theme-sig-control-scrollbar-button-active-color, var(--palette-default-color246)) !important;
            background-image:var(--theme-sig-control-scrollbar-active-right-image, var(--theme-sig-control-scrollbar-right-image, linear-gradient(210deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(330deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(90deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--button-size-dec10), rgba(0,0,0,0) var(--button-size-dec9))));
        }

        ::-webkit-scrollbar-button:active:horizontal:start:decrement {
            background-color: var(--theme-sig-control-scrollbar-button-active-color, var(--palette-default-color246)) !important;
            background-image: var(--theme-sig-control-scrollbar-active-left-image, var(--theme-sig-control-scrollbar-left-image, linear-gradient(30deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(150deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--theme-sig-control-scrollbar-button-size, 43%), rgba(0,0,0,0) var(--button-size-inc1)),
            linear-gradient(270deg, var(--theme-sig-control-scrollbar-button-active-background-color,var(--palette-default-color251)) var(--button-size-dec10), rgba(0,0,0,0) var(--button-size-dec9))));
        }
    }
    </style>
</template>
`;
styleElement.register('sig-control-scrollbar-css');