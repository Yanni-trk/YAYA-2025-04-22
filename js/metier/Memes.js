
import { REST_ADR } from "../config.js";
import { Meme } from "./Meme.js"; 

class Memes extends Array {
    static #ressourcePath = "/memes";
    static get ressourcePath(){return Memes.#ressourcePath;}
    #promiseMemes=undefined;

    get promiseMemes(){
        if(undefined===this.#promiseMemes)this.loadMemes();
        return this.#promiseMemes;
    }

    loadMemes(){
        if (this.#promiseMemes===undefined) {
            this.#promiseMemes = fetch(`${REST_ADR}${Memes.#ressourcePath}`)
            .then((ms) => ms.json())
            .then((ms) => {
                this.splice(0);
                ms.forEach((element) => {
                    const meme = new Meme();
                    Object.assign(meme, element);
                    this.push(meme);
                });
                console.log(this)
                return this;
            });
        }
        return this.#promiseMemes;    
    }   
}

export const memes =new Memes();
//memes.loadMemes();