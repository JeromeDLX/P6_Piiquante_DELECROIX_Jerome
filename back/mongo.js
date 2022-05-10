// Import pour la connexion à la base de données MongoDB
const mongoose = require('mongoose');

// Utilisation fichier .env pour l'uri vers la base de données
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER;
const database = process.env.DB_DATABASE;
const uri = `mongodb+srv://${username}:${password}@cluster-piiquante.rsq6v.mongodb.net/${database}?retryWrites=true&w=majority`;

// Connexion à mongoDB avec l'URI fournie
mongoose
.connect(uri)
.then(() => console.log("Connecté à Mongo"))
.catch ((err) => console.log("Echec de la connexion à Mongo", err));

module.exports = {mongoose};