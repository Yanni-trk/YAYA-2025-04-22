import { loadEditor } from "../vues/editor/editor.js";

import { loadList } from "../vues/list/list.js";
function loadHomeView() {
  fetch("/vues/home/home.html")
    .then((r) => r.text())
    .then((h) => {
      document.querySelector("main").innerHTML = h;
    });
}
function loadEditorView() {
  fetch("/vues/editor/Editor.html")
    .then((r) => r.text())
    .then((h) => {
      document.querySelector("main").innerHTML = h;
      loadEditor();
    });
}
function loadListView() {
  fetch("/vues/list/List.html")
    .then((r) => r.text())
    .then((h) => {
      document.querySelector("main").innerHTML = h;
      loadList("#List");
    });
}
const errorRoutes = {
  404: {
    name: "404 NOT FOUND",
    templateUrl: "/vues/errors/404.html",
  },
};
const routes = [
  {
    name: "home",
    path: "/",
    templateUrl: "/vues/home/home.html",
  },
  {
    name: "editor",
    path: "/editor",
    templateUrl: "/vues/editor/Editor.html",
    onContentLoaded: () => {
      loadEditor();
    },
  },
];
class Router {
  viewContextNode;
  currentPath;
  currentRoute;
  #getCurrentRouteFromPath(path) {
    this.currentRoute = routes.find((route) => {
      return path === route.path;
    });
    this.currentPath = path;
    if (undefined === this.currentRoute) {
      this.currentRoute = errorRoutes[404];
    }
    return this.currentRoute;
  }
  navigate(path) {
    this.#getCurrentRouteFromPath(path);
    this.#loadTemplateInView();
    console.log(this.currentRoute);
  }
  initRoute(path, viewContextNode) {
    this.viewContextNode = viewContextNode;
    this.#getCurrentRouteFromPath(path);
    this.#loadTemplateInView();
    console.log(this.currentRoute);
  }
  #loadTemplateInView() {
    fetch(this.currentRoute.templateUrl)
      .then((htmlResponse) => htmlResponse.text())
      .then((htmlTemplate) => {
        this.viewContextNode.innerHTML = htmlTemplate;
        if (this.currentRoute.onContentLoaded) {
          this.currentRoute.onContentLoaded();
        }
      });
  }
}
export const router = new Router();
