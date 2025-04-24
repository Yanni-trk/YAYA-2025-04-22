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
function loadFormData(meme) {
  const form = document.forms["editor-form"];
  form["text"].value.meme.text;
  form["fontWeight"].value = meme.fontWeight;
  form["color"].value = meme.color;
  form["x"].value = meme.x;
  form["y"].value = meme.y;
  form["fontSize"].value = meme.fontSize;
  form["imageId"].value = meme.imageID;
  form["italic"].checked = meme.italic;
  form["underline"].checked = meme.underline;
}

function loadFormEvent() {
  function ontextinput(evt) {
    currentMeme[evt.target.name] = evt.target.value;
    console.log(currentMeme);
    redrawSvg(currentMeme, editorSVGNode);
  }
  function onnumberinput(evt) {
    currentMeme[evt.target.name] = parseInt(evt.target.value);
    console.log(currentMeme);
    redrawSvg(currentMeme, editorSVGNode);
  }

  function oncheckChange(evt) {
    currentMeme[evt.target.name] = parseInt(evt.target.checked);
    console.log(currentMeme);
    redrawSvg(currentMeme, editorSVGNode);
  }

  const form = document.forms["editor-form"];
  form["text"].addEventListener("input", ontextinput);
  form["fontWeight"].addEventListener("input", ontextinput);
  form["x"].addEventListener("input", onnumberinput);
  form["y"].addEventListener("input", onnumberinput);
  form["fontSize"].addEventListener("input", onnumberinput);
  form["imageId"].addEventListener("input", onnumberinput);
  form["italic"].addEventListener("change", oncheckChange);
  form["underline"].addEventListener("change", oncheckChange);
}

/**
 *
 * @param {Meme} meme
 * @param {SVGSVGElement} node
 */

function redrawSvg(meme, node) {
  console.log("redraw svg", node, meme);
  const text = node.querySelector("text");
  text.setAttribute("fill", meme.color);
  text.setAttribute("font-weight", meme.fontWeight);
  text.setAttribute("text-decoration", meme.underline ? "underline" : "none");
  text.setAttribute("font-style", meme.italic ? "italic" : "normal");
  text.setAttribute("text", meme.color);
  text.setAttribute("x", meme.x);
  text.setAttribute("y", meme.y);
  text.setAttribute("fontSize", meme.fontSize);
  text.innerHTML = meme.text;

  const img = images.find((image) => image.id === meme.imageId);
  let imageSvg = node.querySelector("image");
  if (imageSvg) {
    imageSvg.remove();
  }

  if (img) {
    imageSvgREFNode.setAttribute("xlink:href", img.url);
    node.insertBefore(imageSvgREFNode, text);
    node.setAttribute("viewBox", `0 0 ${img.w} ${img.h}`);
  } else {
    node.setAttribute("viewBox", `0 0 500 500`);
  }

  console.log(img);
}

document.addEventListener("DOMContentLoaded", () => {
  editorSVGNode = document.querySelector("#editor svg");
  imageSvgREFNode = editorSVGNode.querySelector("image");
  loadFormEvent();
  images.promiseImages.then((loadedImages) => {
    loadComboImage(loadedImages);
  });
});

let currentMeme = new Meme();
let editorSVGNode = undefined;
let imageSvgREFNode = undefined;
