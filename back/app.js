// Mise en place de l'application Express
const express = require('express');
const app = express();

// Mise en place de CORS 
const cors = require('cors');

/* - - - - - CONTROLLERS - - - - - */
// Récupération de la fonction de création utilisateur
const {creationUser} = require('./controllers/user')

/* - - - - - BASSE DE DONNEES - - - - - */
require('./mongo')

/* - - - - - MIDDLEWARES - - - - - */
app.use(cors());
// Sert à récupérer les informations dans la requete de signup
app.use(express.json());

/* - - - - - ROUTES - - - - - */
// Post pour la création d'un utilisateur au Signup
app.post('/api/auth/signup', creationUser)

// Export du fichier app
module.exports = app;