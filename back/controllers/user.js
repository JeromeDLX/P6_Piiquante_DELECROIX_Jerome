const {User} = require('../mongo');

// Fonction servant à la création d'un utilisateur
function creationUser(req, res){
    const {email, password} = req.body
    const user = new User({email, password})
        
    user
    .save()
    .then(() => res.send({message: "Utilisateur enregistré !"}))
    .catch ((err) => console.log("Echec lors de l'enregistrement utilisateur", err))
};

module.exports = {creationUser};