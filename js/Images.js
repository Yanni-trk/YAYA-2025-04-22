const REST_ADR = 'http://localhost:5679'
class Images extends Array {
    #ressourcePath;
    /**
     * constructeur d'image
     * @param {string} ressourcePath chemin dans le REST des images
     */
    constructor(ressourcePath = '/images') {
        super();
        this.#ressourcePath = ressourcePath;
    }

    loadRessources() {
        fetch(REST_ADR + this.#ressourcePath)
            .then(r => r.json())
            .then((arr) => {
                this.splice(0);
                this.push(...ar);
                console.table(this)
            })

    }

}

/**
 * remplacer d'image
 * @param {ojbect} origineImage image a remplace
 * @param {ojbect} newImage image de substitution 
 * @return {object} image remplacé
 */


/**
 * instance principale de toutes les images de l'app
 */
const images = new Images();

images.loadRessources();


