// Imports 
const express = require('express');

// Appel de la fonction de routeur d'express
const routerSauces = express.Router();

// Récupération des fonctions relatives à la gestion des sauces
const {
    recupSauces, 
    creationSauces, 
    recupSauceDepuisId, 
    supressionSauce, 
    modificationSauces,
    likeSauce
} = require('../controllers/sauces');

// Récupération du middleware d'authentification de l'utilisateur
const {authentUser} = require('../middlewares/auth');

// Mise en place du multer.js pour récupérer le upload
const {upload} = require('../middlewares/multer');

/* - - - - - ROUTES - - - - - */
// GET pour la récupération des sauces (Authentification User requis)
routerSauces.get('/', authentUser, recupSauces);

// POST pour l'ajout, la création de sauces et l'upload de l'image (Authentification User requis)
routerSauces.post('/', authentUser, upload.single("image"), creationSauces);

// GET lors du clic sur une sauce (Authentification User requis)
routerSauces.get('/:id', authentUser, recupSauceDepuisId);

// DELETE pour la supression d'une sauce (Authentification User requis)
routerSauces.delete('/:id', authentUser, supressionSauce);

// PUT pour la modification des informations d'une sauce (Authentification User requis)
routerSauces.put('/:id', authentUser, upload.single("image"), modificationSauces);

// POST pour la fonctionnalité de like (Authentification User requis)
routerSauces.post('/:id/like', authentUser, likeSauce);
/* - - - - - ROUTES - - - - - */


// Export du router
module.exports = {routerSauces};