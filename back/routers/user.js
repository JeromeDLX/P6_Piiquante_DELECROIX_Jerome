// Imports 
const express = require('express');

// Appel de la fonction de routeur d'express
const routerUser = express.Router();

// Récupération de la fonction de création utilisateur et, login
const {creationUser, loginUser} = require('../controllers/user');

/* - - - - - ROUTES - - - - - */
// Post pour la création d'un utilisateur au Signup
routerUser.post('/signup', creationUser);

// Post pour le login de l'utilisateur
routerUser.post('/login', loginUser);
/* - - - - - ROUTES - - - - - */


// Export du router
module.exports = {routerUser};