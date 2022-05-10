// Import de mongoose pour la création du schéma user
const mongoose = require('mongoose');

// Import du package pour la validation d'identifiants unique
const uniqueValidator = require('mongoose-unique-validator')

// Construction d'un schéma typique d'un utilisateur (Informations recueillis), adresse email unique
const userSchema = new mongoose.Schema({
    email: {type: String, require: true, unique: true},
    password: {type: String, required: true},
});
userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

// Export du schema
module.exports = {User};