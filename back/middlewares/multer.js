// Mise en place de multer pour l'upload des images
const multer = require('multer');

// Mise en place du dossier images ou seront stockées les images
const storage = multer.diskStorage({
    destination: "images/", 
    filename: function (req, file, cb){
    cb(null, creationFilename(req, file))
    }
});

// Fonction de création du nom d'image unique
function creationFilename(req, file){
    const filename_original = file.originalname.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    const fileName = `${Date.now()}_${filename_original}`.replace(/\s/g, "_")
    file.fileName = fileName
    return fileName
};

const upload = multer({ storage });

// Export de la constante d'upload
module.exports = {upload}