import {memes} from '../../js/metier/Memes.js'
import {images} from '../../js/metier/Images.js'


function drawSVG(meme, node) {
    console.log("redraw svg", node, meme);
    const text = node.querySelector("text");
    text.setAttribute("fill", meme.color);
    text.setAttribute("font-size", meme.fontSize);
    text.setAttribute("font-weight", meme.fontWeight);
    text.setAttribute("x", meme.x);
    text.setAttribute("y", meme.y);
    text.setAttribute("text-decoration", meme.underline ? "underline" : "none");
    text.setAttribute("font-style", meme.italic ? "italic" : "normal");
    text.innerHTML = meme.text;
  
    const img = images.find((image) => image.id === meme.imageId);
    let imageSvg = node.querySelector("image");
    if (img) {
      imageSvg.setAttribute("xlink:href", img.url);
      node.setAttribute("viewBox", `0 0 ${img.w} ${img.h}`);
    } else {
      node.setAttribute("viewBox", `0 0 500 500`);
      imageSvg.remove();
    }
}

export function loadList(domNodeId) {
    const contextNode=document.querySelector(domNodeId); 
    const aNode = contextNode.querySelector("a"); 
    Promise.all([memes.promiseMemes, images.promiseImages]).then((r) => {

      // const memesArray=r[0];
      // const imagesArray=r[1];

        r[0].forEach((element) => {
        /**
         *  @type HTMLElement
         */
            const cloned = aNode.cloneNode(true);
            cloned.id+=element.id;
            cloned.href+=element.id;
            cloned.querySelector("div").innerHTML =
                element.text.length > 0 ? element.text : "(pas de text)"; 
            drawSVG(element, cloned.querySelector("svg"));
            contextNode.appendChild(cloned);
        });
        aNode.style.display = "none"; 
    });
      
    }
