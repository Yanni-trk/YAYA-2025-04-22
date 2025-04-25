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
  
  class Router {
    viewContextNode;
    currentPath;
    currentRoute;
    #getCurrentRouteFromPath(path) {
      this.currentRoute = this.routes.find((route) => {
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
    initRoute(routes,path, viewContextNode) {
      this.routes=routes
      this.viewContextNode = viewContextNode;
      this.#instanciateRoute(path);
      console.log(this.currentRoute);
      window.addEventListener("popstate", (evt) => {
        evt.preventDefault();
        this.#instanciateRoute(location.pathname);
      });
    }
    instanciateLinks(context) {
      context.querySelectorAll("a").forEach((a) => {
        if (!a.href.startsWith(location.origin)) return;
        a.addEventListener("click", (evt) => {
          evt.preventDefault();
          this.navigate(a.href.replace(location.origin, ""));
        });
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
          try {
            if (this.currentRoute.onContentLoaded) {
              this.currentRoute.callback = () => {
                this.instanciateLinks(this.viewContextNode);
              };
              this.currentRoute.contextNode = this.viewContextNode;
              this.currentRoute.onContentLoaded(this.currentRoute);
            } else {
              this.instanciateLinks(this.viewContextNode);
              // throw new Error() ;
            }
          } catch {
            this.currentRoute = errorRoutes[500];
            this.#instanciateRoute();
          }
        });
    }
  }
  export const router = new Router();
  window.navigate = (path) => router.navigate(path);
  