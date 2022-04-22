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
    const fileName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-")
    file.fileName = fileName
    return fileName
};

const upload = multer({ storage });

module.exports = {upload}