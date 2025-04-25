import { loadEditor } from "./editor.js";

function loadJs(evt) {
  console.log(evt);
  const jsLoaded = document.querySelector("#js-loaded");
  jsLoaded.innerHTML = "JS OK";
  jsLoaded.style.backgroundColor = "skyblue";
  jsLoaded.style.color = "tomato";
  jsLoaded.remove();
  document.querySelector("#contentA1").addEventListener("click", (evt) => {
    evt.stopPropagation();
    console.log("click-A1", evt.target);
  });
  document.querySelector("#container").addEventListener("click", (evt) => {
    console.log("clickContainer", evt.target, evt.currentTarget);
  });

  document
    .querySelector("#navbarNav > ul > li:nth-child(2) > a")
    .addEventListener("click", (evt) => {
        evt.preventDefault();
      loadEditorView();
    });

  // loadHome();
  //loadEditorView();
}
function loadHomeView() {
  fetch("/vues/home.html")
    .then((r) => r.text())
    .then((h) => {
      document.querySelector("main").innerHTML = h;
    });
}
function loadEditorView() {
  fetch("/vues/Editor.html")
    .then((r) => r.text())
    .then((h) => {
      document.querySelector("main").innerHTML = h;
      loadEditor();
    });
}
document.addEventListener("DOMContentLoaded", loadJs);
