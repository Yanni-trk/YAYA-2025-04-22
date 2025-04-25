const REST_ADR = 'http://localhost:5679'
/**
 * class pour la manipulation du REST
 */
class Images extends Array {
    //ici je met l'url des ressources sur le srveur REST pour y acceder
    #ressourcePath;
    /**
     * promise de chargement
     * @type Promise<Images>
     */
    #loadPromise = undefined;

    get promiseImages(){
        if(undefined===this.#loadPromise)this.loadRessources();
        return this.#loadPromise;
    }
    set promiseImages(value){
         this.#loadPromise=value;
    }
    /**
     * constructeur d'images
     * @param {string} ressourcePath chemin dans le REST des images
     */
    constructor(ressourcePath = '/images') {
        super();
        this.#ressourcePath = ressourcePath;

    }/**
     * chargement rest des datas d'images
     */
    loadRessources() {
        if (undefined === this.#loadPromise) {
            this.#loadPromise = fetch(REST_ADR + this.#ressourcePath)
                .then(r => r.json())
                .then((arr) => {
                    this.splice(0);
                    this.push(...arr);
                    console.table(this);
                    return this;
                })
        }
        return this.#loadPromise;
    }

}
/**
 * instance principales de toutes les images de l'app
 */
export  const images = new Images();
images.loadRessources();