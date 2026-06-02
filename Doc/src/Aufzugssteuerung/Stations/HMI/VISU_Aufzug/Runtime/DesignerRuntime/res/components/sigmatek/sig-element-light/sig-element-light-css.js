const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
  <template>
    <style id="lvddefault"></style>
    <style id="lvdtemplate">
      /*! @@lvdstyles */
      :host {
        
        top: var(--theme-sig-element-top, auto);
        left: var(--theme-sig-element-left, auto);
        
        
        width: var(--theme-sig-element-width, 100px);
        height: var(--theme-sig-element-height, 100px);
        z-index: var(--theme-sig-element-zindex, auto);
        box-sizing: border-box;
        opacity: var(--theme-sig-element-active-opacity, 1);
      }

             
      .sig-element-invisible {
        display: none !important;
      }

      .sig-element-checkbit {
        display: none !important;
      }

      .sig-element-no-render {
        display: none !important;
      }

      
           
      :host(.sig-element-inactive) :not(sig-designer-handles)  * {
        pointer-events: none !important;
        opacity: var(--theme-sig-element-inactive-opacity, 1);
      }
     
      
      :host(.sig-element-isdraggable) *,
      :host(.sig-element-isdragclone) * {
        pointer-events: none !important;
      }
    </style>
    <style id="development"></style>
  </template>`;
styleElement.register('sig-element-light-css');