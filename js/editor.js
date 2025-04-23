/**
 * 
 * @param {Images} mesImages 
 */
function loadComboImage(mesImages) {
    const select = document.forms['editor-form']['imageId'];
    const noImageOption = select.querySelector('option[value="-1"]');
    // const cloned = noImageOption.cloneNode(true);
    mesImages.forEach(img=>{
    const cloned=document.createElement('option');
    cloned.value = img.id;
    cloned.innerHTML = img.name;
    select.appendChild(cloned);
    })
}

