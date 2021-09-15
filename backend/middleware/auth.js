const jwt = require('jsonwebtoken'); //Importation de jsonwebtoken afin de decrypter le token
require('dotenv').config(); // Importation de dotenv nous permettant d'utilliser les variables d'environnement
module.exports = (req, res, next) => { // Vérifie si l'UserId de la requete est le même que celui dans le token
    try {
        const token = req.headers.authorization.split(' ')[1]; // Récupère le token dans le header authorization
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY); // Decode le token a l'aide de la fonction jwt.veryfy et de la clé de chiffrement 
        const userId = decodedToken.userId; // récupération de l'userId du token
        if (req.body.userId && req.body.userId !== userId) { 
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error){
        res.status(401).json({error:'Requête non authentifiée'})
    }
}