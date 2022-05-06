// Imports fichier et, dépendances
const mongoose = require('mongoose');

// Création du shema des informations à avoir pour chaque sauces
const produitSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    name : {type: String, required: true},
    manufacturer: {type: String, required: true},
    description : {type: String, required: true},
    mainPepper : {type: String, required: true},
    imageUrl : {type: String, required: true},
    heat : {type: Number, required: true, min: 1, max: 10},
    likes : {type: Number, default: 0},
    dislikes : {type: Number, default: 0},
    usersLiked : {type: [String], required : true},
    usersDisliked : {type: [String], required : true}
});

// Export du schema
module.exports = mongoose.model('Sauce', produitSchema);