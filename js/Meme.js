//const REST_ADR = 'http://localhost:5679'
export class Meme {
    static #ressourcePath = "/memes";
    id = undefined;
    titre = "";
    text = "";
    x = 100;
    y = 20;
    fontWeight = "500";
    fontSize = 100;
    underline = false;
    italic = false;
    imageId = -1;
    color = "#000000";
  
    save() {
      const adr = `${REST_ADR}${Meme.#ressourcePath}${
        undefined !== this.id ? "/" + this.id : ""
      }`;
      fetch(adr, {
        method: this.id !== undefined ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this),
      })
        .then((r) => r.json())
        .then((m) => {
          Object.assign(this, m);
          return this;
        });
    }
    /**
     * constructeur d'instance
     * @param {string} jsonStr chat string json d'un meme de REST
     * @returns {Meme}  instance loadé avec valeurs de la chaine JSON
     */
    static getInstanceFromJSON(jsonStr) {
      const meme = new Meme();
      Object.assign(meme, JSON.parse(jsonStr));
      return meme;
    }
  }
