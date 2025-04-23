//const REST_ADR ='http://localhost:5679' 
class Meme {
    static #ressourcePath='/memes'
    id = undefined;
    titre = '';
    text = '';
    x = 100;
    y = 20;
    fontWeight = '500';
    fontSize = 100;
    underline = false; 
    italic = false; 
    imageId = -1;
    color = '#00000';

    save() {
        const adr = `${RES_ADR}${Meme.#ressourcePath}${undefined !== this.id ? `/`+ this.id : ''}`;
        fetch(adr,{
            method: this.id !== undefined ? 'PUT' : 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(this)

        })
       

    }
}