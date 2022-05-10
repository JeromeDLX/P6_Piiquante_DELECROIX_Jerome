// Mise en place de l'application Express
const express = require('express');
const app = express();

// Mise en place de CORS 
const cors = require('cors');

// Mise en place du path pour gérer l'url d'accès à l'image avec le dirname pour MAJ auto
const path = require('path');

// Mise en place du bodyparser
const bodyParser = require('body-parser');

// Mise en place du routeur des sauces
const {routerSauces} = require('./routers/sauces');

// Mise en place du routeur d'authentification
const {routerUser} = require('./routers/user');

/* - - - - - BASSE DE DONNEES - - - - - */
// Import du fichier JS mongo
require('./mongo');

/* - - - - - MIDDLEWARES - - - - - */
// Sert à parser les requetes
app.use(bodyParser.json())

// Sert à se connecter avec Express, pour faire des requetes au serveur et, recevoir des réponses
app.use(cors());

// Sert à récupérer les informations dans le corp des requêtes entrantes
app.use(express.json());

// Sert à renvoyer vers le fichier routeur des sauces
app.use('/api/sauces', routerSauces);

// Sert à renvoyer vers le fichier routeur d'authentification
app.use('/api/auth', routerUser);

/* - - - - - ROUTES - - - - - */
// Requete pour vérifier le bon accés au port 3000
app.get("/", (req, res) => res.send("Port 3000"));

// MIDDLEWARE - Sert à rendre accesible l'image uploadée depuis l'url
app.use("/images", express.static(path.join(__dirname, "images")));

// Export du fichier app
module.exports = app;