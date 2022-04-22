// Mise en place de l'application Express
const express = require('express');
const app = express();

// Mise en place de CORS 
const cors = require('cors');

// Mise en place de body-parser
//const bodyParser = require('body-parser');

// Mise en place du path pour gérer l'url d'accès à l'image avec le dirname pour MAJ auto
const path = require('path');

// Mise en place de multer pour l'upload des images
const multer = require('multer');
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

const upload = multer({ storage: storage});

/* - - - - - BASSE DE DONNEES - - - - - */
// Import du fichier JS mongo
require('./mongo');

/* - - - - - CONTROLLERS - - - - - */
// Récupération de la fonction de création utilisateur et, login
const {creationUser, loginUser} = require('./controllers/user');

// Récupération de la fonction de recup et, de création des sauces
const {recupSauces, creationSauces} = require('./controllers/sauces');

/* - - - - - MIDDLEWARES - - - - - */
// Sert à se connecter avec Express, pour faire des requetes au serveur et, recevoir des réponses
app.use(cors());

// Sert à récupérer les informations dans la requete de signup
app.use(express.json());

// Récupération du middleware d'authentification de l'utilisateur
const {authentUser} = require('./middlewares/auth');

/* - - - - - ROUTES - - - - - */
// Post pour la création d'un utilisateur au Signup
app.post('/api/auth/signup', creationUser);

// Post pour le login de l'utilisateur
app.post('/api/auth/login', loginUser);

// Get pour la récupération des sauces (Authentification User requis)
app.get('/api/sauces', authentUser, recupSauces);

// Post pour l'ajout, la création de sauces et l'upload de l'image (Authentification User requis)
app.post('/api/sauces', authentUser, upload.single("image"), creationSauces);

// Test pour vérifier le bon accés au port 3000
app.get("/", (req, res) => res.send("Test d'affichage"));


// MIDDLEWARE - Sert à rendre accesible l'image uploadée depuis l'url
app.use("/images", express.static(path.join(__dirname, "images")));

// Export du fichier app
module.exports = app;