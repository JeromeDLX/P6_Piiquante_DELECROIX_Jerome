// Mise en place de l'application Express
const express = require('express');
const app = express();

// Mise en place de CORS 
const cors = require('cors');

/* - - - - - CONTROLLERS - - - - - */
// Récupération de la fonction de création utilisateur
const {creationUser, loginUser} = require('./controllers/user');

/* - - - - - BASSE DE DONNEES - - - - - */
// Import du fichier JS mongo
require('./mongo');

/* - - - - - MIDDLEWARES - - - - - */
app.use(cors());
// Sert à récupérer les informations dans la requete de signup
app.use(express.json());

/* - - - - - ROUTES - - - - - */
// Post pour la création d'un utilisateur au Signup
app.post('/api/auth/signup', creationUser);

// Post pour le login de l'utilisateur
app.post('/api/auth/login', loginUser);

// Export du fichier app
module.exports = app;