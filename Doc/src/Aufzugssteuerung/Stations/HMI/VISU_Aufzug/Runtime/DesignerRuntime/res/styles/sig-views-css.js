const $_documentContainer = document.createElement('template');
$_documentContainer.innerHTML = `<custom-style>
    <style>
sig-app[view='Default'] {
   --theme-sig-app-background-color: #5F5F64;
   font-family: roboto-regular;
   font-size: 16px;
}
</style>
</custom-style>`;
document.head.appendChild($_documentContainer.content);