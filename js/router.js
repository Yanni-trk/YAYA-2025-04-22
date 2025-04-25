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
  500: {
    name: "500 NOT FOUND",
    templateUrl: "/vues/errors/500.html",
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
    path: /^\/editor(\/(?<id>\d+))?\/?$/,
    templateUrl: "/vues/editor/Editor.html",
    onContentLoaded: loadEditor,
  },
];
class Router {
  viewContextNode;
  currentPath;
  currentRoute;
  #getCurrentRouteFromPath(path) {
    this.currentRoute = routes.find((route) => {
      if (route.path instanceof RegExp) {
        const regexResult = route.path.exec(path);
        if (regexResult === null) return false;
        else {
          route.params = regexResult.groups;
          console.log(regexResult);
          return true;
        }
      } else if (path === route.path) {
        return true;
      } else {
        return false;
      }
    });
    this.currentPath = path;
    if (undefined === this.currentRoute) {
      this.currentRoute = errorRoutes[404];
    }
    return this.currentRoute;
  }
  navigate(path) {
    this.#instanciateRoute(path);
    history.pushState(undefined, undefined, path);
    console.log(this.currentRoute);
  }
  initRoute(path, viewContextNode) {
    this.viewContextNode = viewContextNode;
    this.#instanciateRoute(path);
    console.log(this.currentRoute);
    window.addEventListener("popstate", () => {
      this.#instanciateRoute(location.path);
    });
  }
  #instanciateRoute(path) {
    this.#getCurrentRouteFromPath(path);
    this.#loadTemplateInView();
  }
  #loadTemplateInView() {
    fetch(this.currentRoute.templateUrl)
      .then((htmlResponse) => htmlResponse.text())
      .then((htmlTemplate) => {
        this.viewContextNode.innerHTML = htmlTemplate;
        if (this.currentRoute.onContentLoaded) {
          this.currentRoute.onContentLoaded(this.currentRoute.params);
        }
      });
  }
}
export const router = new Router();
window.forceNav = (path) => router.navigate(path);
