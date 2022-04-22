// Imports fichier et, dépendances
const mongoose = require('mongoose');

// Création du shema des informations à avoir pour chaque sauces
const produitSchema = new mongoose.Schema({
    userId: String,
    name : String,
    manufacturer: String,
    description : String,
    mainPepper : String,
    imageUrl : String,
    heat : Number,
    likes : Number,
    dislikes : Number,
    usersLiked : ["String"],
    usersDisliked : ["String"]
});

// Création d'un modele pour les sauces
const produitModele = mongoose.model("produitModele", produitSchema);

//Fonction de vérification du token utilisateur avec, autorisation ou non d'accès aux sauces
function recupSauces(req, res){
    console.log("Le token semble bon, nous avons récupérés les sauces")
    produitModele.find({}).then(produitsAjoutes => res.send(produitsAjoutes))
};

// Fonction de création d'une sauces avec les champs à lui attribuer
function creationSauces(req, res){
    const {body, file} = req
    const {fileName} = file
    // Parse sert à mettre chaine de caracteres sous forme d'objet
    const sauce = JSON.parse(body.sauce)
    const {name, manufacturer, description, mainPepper, heat, userId} = sauce

    const produit = new produitModele({
        userId,
        name,
        manufacturer,
        description,
        mainPepper,
        imageUrl: creationImageUrl(req, fileName),
        heat,
        likes : 0,
        dislikes : 0,
        usersLiked : [],
        usersDisliked : []
    })
    produit
    .save()
    .then((res) => console.log("Produit enregistré", produit))
    .catch(console.error)
};

// Fonction servant à créer le bon cheminement vers l'image (Chemin absolu pour chercher sur le serveur)
function creationImageUrl(req, fileName){
    return req.protocol + "://" + req.get("host") + "/images/" + fileName
};

// Export des fonctions de recuperation des sauces
module.exports = {recupSauces, creationSauces};