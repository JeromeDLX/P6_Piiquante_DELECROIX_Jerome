// Import pour la connexion à la base de données MongoDB
const mongoose = require('mongoose');
// Import du package pour la validation d'identifiants unique
const uniqueValidator = require('mongoose-unique-validator')

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

// Construction d'un schéma typique d'un utilisateur (Informations recueillis), adresse email unique
const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, required: true},
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = {mongoose, User};