// Imports fichier et, dépendances
const jwt = require('jsonwebtoken');

// Fonction d'autorisation d'accés utilisateur, après Login
function authentUser(req, res, next){
    console.log("Authentification de l'utilisateur")
    const headerAutorisation = req.header('Authorization')
    if (headerAutorisation == null)return res.status(403).send({message: "Non valide"})
    // Split pour séparer les éléments, enlever les espaces et, selectionner que l'ID token
    const token = headerAutorisation.split(" ")[1]
    if (token == null)return res.status(403).send({message: "Le token ne peut être nul"})
 
    jwt.verify(token, process.env.JWT_PASSWORD, (err, decodage) => {
        if(err) return res.status(403).send({message: "Token non valide " + err})
        console.log("Le token est valide on passe la suite")
        next()
    })
};

// Export de la fonction d'authentification de l'utilisateur
module.exports = {authentUser};