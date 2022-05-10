// Imports fichier et, dépendances
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction servant à la création d'un utilisateur, et au haschage du password
async function creationUser(req, res){
    try{
    const {email, password} = req.body
    const cryptagePassword = await hashPassword(password)
    const user = new User({email, password: cryptagePassword})
    
    await user.save()
    res.status(201).send({message: "Utilisateur enregistré"})
    }catch (err) {
        res.status(409).send({message: "Echec lors de l'enregistrement utilisateur" + err})
    }
};

// Fonction qui sert au cryptage des MDP utilisateurs avec cryptage *10
function hashPassword(password){
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
};

// Fonction servant à loguer l'utilisateur
async function loginUser(req, res){
    try{
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({email: email})

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid){
        res.status(403).send({message: "Mot de passe non valide"})
    }
    const token = creationToken(email)
    res.status(200).send({userId: user._id ,token: token})
    }catch (err){
        console.error(err)
        res.status(500).send({message: "Erreur interne"})
    }
};

function creationToken(email){
    const jwtPassword = process.env.JWT_PASSWORD
    return jwt.sign({email: email}, jwtPassword, {expiresIn: '24h'})
};

// Export des fonctions de création et, de login user
module.exports = {creationUser, loginUser};