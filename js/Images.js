class Images{
    ressourcePath;
    /**
     * 
     * @param {string} ressourcePath chemin dans le REST des images
     */
    constructor(ressourcePath) {
        this.ressourcePath = ressourcePath;
    }
}
/**
 * instance principale de toutes les images de l'app
 */
const images = new Images();
