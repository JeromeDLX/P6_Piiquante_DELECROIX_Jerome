// Import package HTTP de base pour, créer un serveur
const http = require('http');

// Mise en place du fichier ENV
require('dotenv').config();

// Import de l'app express depuis le fichier app
const app = require('./app');

// Précision du port sur lequel doit tourner l'app express
app.set('port', process.env.PORT || 3000);

// Ajout de l'app au serveur
const server = http.createServer(app);

// Le serveur écoute sur ce port et, si port non disponible process execute sur le port disponible
server.listen(process.env.PORT || 3000);