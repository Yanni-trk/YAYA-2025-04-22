import { loadEditor } from "../vues/editor/editor.js";
import { loadList } from "../vues/list/list.js";

export const REST_ADR="http://localhost:5679"
export const routes = [
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
    {
      name: "editor",
      path: /^\/((list)|(thumbnail))\/?/,
      templateUrl: "/vues/list/List.html",
      onContentLoaded: loadList,
    },
  ];