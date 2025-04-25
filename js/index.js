// import { loadEditor } from "../vues/editor/editor.js";
// import { loadList } from "../vues/list/list.js";

import { routes } from "./config.js";
import { router } from "./router.js";

function loadJs(evt) {
  console.log(evt);
  const jsLoaded = document.querySelector("#js-loaded");
  jsLoaded.innerHTML = "JS OK";
  jsLoaded.style.backgroundColor = "skyblue";
  jsLoaded.style.color = "tomato";
  jsLoaded.remove();
  router.instanciateLinks(document.body);
  router.initRoute(routes,location.pathname, document.querySelector("main"));
}

document.addEventListener("DOMContentLoaded", loadJs);
