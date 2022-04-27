// Imports fichier et, dépendances
const mongoose = require('mongoose');
// fs : File System
const {unlink} = require('fs/promises');

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
    usersLiked : {type: ["String"], required : true},
    usersDisliked : {type: ["String"], required : true},
});

// Création d'un modele pour les sauces
const produitModele = mongoose.model("produitModele", produitSchema);

//Fonction de vérification du token utilisateur avec, autorisation ou non d'accès aux sauces
function recupSauces(req, res){
    produitModele.find({})
    .then(produitsAjoutes => res.send(produitsAjoutes))
    .catch(error => res.status(500).send(error))
};

// Fonction ayant pour but de récupérer depuis les params les infos relatives à une sauce
function recupInfosSauce(req, res){
    const {id} = req.params
    return produitModele.findById(id)
};

// Fonction servant à récupérer l'id et, les params relatifs au produit cliqué par l'utilisateur
function recupSauceDepuisId(req, res){
    recupInfosSauce(req, res)
        .then((produit) => clientResponse(produit, res))
        .catch((err) => res.status(500).send(err))
};

/* Fonction ayant pour but de supprimer une sauce lors du clic sur le bouton DELETE et,
 renvoit vers la fonction de suppresion de l'image*/
function supressionSauce(req, res){
    const {id} = req.params
    // Ordre de suppression de la sauce est envoyé à MongoDB
    produitModele.findByIdAndDelete(id)
    // Enfin envoyer un message de réussite au site sous forme d'objet du produit supprimé
    .then((produit) => clientResponse(produit, res))
    //
    .then((item) => deleteOldImage(item))
    .then((res) => console.log("Fichier Supprimé", res))
    // Si jamais une erreur se produit, retourne le code 500 avec le message "error"
    .catch((err) => res.status(500).send({message: err}))
};

// Fonction servant à la modification des informations d'une sauce
function modificationSauces(req, res){
    const {params: {id}} = req

    const hasNouvelleImage = req.file != null
    const payload = creationPayload(hasNouvelleImage, req)

    produitModele.findByIdAndUpdate(id, payload)
    .then((databaseResponse) => clientResponse(databaseResponse, res))
    .then((produit) => deleteOldImage(produit))
    .then((res) => console.log("Fichier Supprimé", res))
    .catch((err) => console.error("PB DE MISE A JOUR", err))
};

// Fonction ayant pour objectif de supprimé l'ancienne image lors de la modification de cette dernière
function deleteOldImage(produit){
    if (produit == null) return
    const imageToDelete = produit.imageUrl.split("/").at(-1)
    return unlink("images/" + imageToDelete)
};

// Fonction servant à mettre à jour la nouvelle image lors de la modification
function creationPayload(hasNouvelleImage, req){
    if (!hasNouvelleImage) return req.body
    const payload = JSON.parse(req.body.sauce)
    payload.imageUrl = creationImageUrl(req, req.file.fileName)
    return payload
};

// Fonction permettant la vérification dans la base de données lors de la modification d'une sauce
function clientResponse(produit, res){
    if (produit == null){
        return res.status(404).send({message: "Sauce non trouvée dans la base de données"})
    } 
    return Promise.resolve(res.status(200).send(produit))
    .then(() => produit)
};

// Fonction de création d'une sauce avec les champs à lui attribuer
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
    .then((msg) => res.status(201).send({msg}))
    .catch((err) => res.status(500).send({message: err}))
};

// Fonction servant à créer le bon cheminement vers l'image (Chemin absolu pour chercher sur le serveur)
function creationImageUrl(req, fileName){
    return req.protocol + "://" + req.get("host") + "/images/" + fileName
};

// Fonction servant à gérer lorsque l'utilisateur like une sauce
function likeSauce(req, res){
    recupInfosSauce(req, res)
        .then((produit) => {
            console.log("Le produit liké/disliké est:", produit)
        })
};

// Export des fonctions de recuperation des sauces
module.exports = {
    recupSauces, 
    creationSauces, 
    recupSauceDepuisId, 
    supressionSauce, 
    modificationSauces,
    likeSauce
};