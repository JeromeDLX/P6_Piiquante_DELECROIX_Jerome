// Imports 
const express = require('express');

// Appel de la fonction de routeur d'express
const routerAuth = express.Router();

// Récupération de la fonction de création utilisateur et, login
const {creationUser, loginUser} = require('../controllers/user');

/* - - - - - ROUTES - - - - - */
// Post pour la création d'un utilisateur au Signup
routerAuth.post('/signup', creationUser);

// Post pour le login de l'utilisateur
routerAuth.post('/login', loginUser);
/* - - - - - ROUTES - - - - - */


// Export du router
module.exports = {routerAuth};