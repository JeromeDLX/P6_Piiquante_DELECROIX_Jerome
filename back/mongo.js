// Connexion à la base de données MongoDB, utilisation fichier .env
const mongoose = require('mongoose');
const password = process.env.DB_PASSWORD;
const username = process.env.DB_USER
const database = process.env.DB_DATABASE
const uri = `mongodb+srv://${username}:${password}@cluster-piiquante.rsq6v.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose
.connect(uri)
.then(() => console.log("Connecté à Mongo"))
.catch ((err) => console.log("Echec de la connexion à Mongo", err));

// Construction d'un schéma typique d'un utilisateur (Informations recueillis)
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {mongoose, User};