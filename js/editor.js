/**
 *
 * @param {Images} mesImages
 */
function loadComboImage(mesImages) {
  const select = document.forms["editor-form"]["imageId"];
  const noImageOption = select.querySelector('option[value="-1"]');
  // const cloned = noImageOption.cloneNode(true);
  mesImages.forEach((img) => {
    const cloned = document.createElement("option");
    cloned.value = img.id;
    cloned.innerHTML = img.name;
    select.appendChild(cloned);
  });
}



function loadFormEvent() {
  function ontextinput(evt) {
    currentMeme[evt.target.name] = evt.target.value;
    console.log(currentMeme);

  }
function onnumberinput(evt) {
    currentMeme[evt.target.name] = parseInt(evt.target.value);
    console.log(currentMeme);
}
  const form = document.forms["editor-form"];
  form["text"].addEventListener("input", ontextinput);
  form["fontWeight"].addEventListener("input", ontextinput);
  form["x"].addEventListener("input", onnumberinput);
  form["y"].addEventListener("input", onnumberinput);
  form["fonSize"].addEventListener("input", onnumberinput);
  form["imageId"].addEventListener("input", onnumberinput);
}

document.addEventListener("DOMContentLoaded", () => {
  loadFormEvent();
  images.promiseImages.then((loadedImages) => {
    loadComboImage(loadedImages);
  });
});

let currentMeme = new Meme();
