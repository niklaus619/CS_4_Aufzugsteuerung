const styleElement = document.createElement('dom-module');
styleElement.innerHTML = `
    <template>
<style id="lvdtemplate">
            :host sig-control-datapoint-text {
   --theme-sig-control-datapoint-text-value-padding: 3px;
   --theme-sig-control-datapoint-text-color: #FFFFFF;
   --theme-sig-control-datapoint-text-background-color: #A5ABB0;
   --theme-sig-control-datapoint-text-border-color: rgba(255,255,255,0);
   --theme-sig-control-datapoint-text-font-size: 11px;
   --theme-sig-control-datapoint-text-neon-color-1: #FFFFFF;
   --theme-sig-control-datapoint-text-neon-color-2: #FFFFFF;
}

        </style>
</template>
`;
styleElement.register('sig-control-datapoint-text-css');