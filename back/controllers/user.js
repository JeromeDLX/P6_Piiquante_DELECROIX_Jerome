const {User} = require('../mongo');
const bcrypt = require('bcrypt');

// Fonction servant à la création d'un utilisateur, et au haschage du password
async function creationUser(req, res){
    const {email, password} = req.body
    const cryptagePassword = await hashPassword(password)
    
    console.log("password", password)
    console.log("cryptagePassword", cryptagePassword)

    const user = new User({email, password: cryptagePassword})
    
    user
    .save()
    .then(() => res.status(201).send({message: "Utilisateur enregistré"}))
    .catch ((err) => res.status(409).send({message: "Echec lors de l'enregistrement utilisateur" + err}))
};

// Fonction qui sert au cryptage des MDP utilisateurs
function hashPassword(password){
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
};

// Fonction servant à loguer l'utilisateur
function loginUser(req, res){
    const email = req.body.email
    const password = req.body.password
};

module.exports = {creationUser, loginUser};