class Images{
    ressourcePath;
    /**
     * 
     * @param {string} ressourcePath chemin dans le REST des images
     */
    constructor(ressourcePath) {
        this.ressourcePath = ressourcePath;
    }
    replaceImage(origineImage,newImage) {
        return origineImage;
    }
   
    /**
     * remplacer d'image
     * @param {ojbect} origineImage image a remplace
     * @param {ojbect} newImage image de substitution 
     * @return {object} image remplacé
     */
    
    replaceImage(origineImage, newImage) {
        return origineImage;
    }

}
/**
 * instance principale de toutes les images de l'app
 */
const images = new Images();
