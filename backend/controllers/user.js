const db = require('../db_connect'); // Importation du fichier contenant les paramètre de connexion de la base de données, nous permettant ainsi d'interagir avec la base de donnée
const bcrypt = require('bcrypt');  // Importation de bcrypt nous permettant de hasher le mot de passe dans la base de donnée
const jwt = require('jsonwebtoken'); // Importation de jsonwebtoken nous permettant de rajouter une sécurité sur des routes à l'aide des tokens 
const fs = require('fs'); // Importation de fs nous permettant d'interagir avec les fichiers du dossier images
require('dotenv').config(); // Importation de dotenv nous permettant d'utilliser les variables d'environnement


//Fonction permettant la création d'un compte
exports.signup = (req,res,next) =>
{
    const email = req.body.email; // Récupération de l'email de la requête
    const nickname = req.body.nickname; // Récupération du nickname de la requête
    bcrypt.hash(req.body.password,10) // Récupération du mot de passe de la requête et hashage à l'aide de bcrypt
    .then(hash=>{
        const password=hash;
        const profileimg = `${req.protocol}://${req.get('host')}/images/no-picture.jpg` // Initialisation de l'image de base des utilisateurs 
        var sql = `INSERT INTO users (nickname, email, password, admin, profileimg) VALUES ('${nickname}','${email}','${password}', '0' , '${profileimg}')`; // Ajout de l'utilisateur dans la base de donnée
        db.query(sql, function (err, result) {
             if (err){
                return res.status(403).json({error : "Les informations entrées sont déjà utilisées"}); // Si le nickname et/ou l'email est déjà utilisé : renvoi d'un message d'erreur pour avertir l'utilisateur
             };
             return res.status(200).json({ message: 'Compte crée avec succès'}); // Sinon envoi d'une confirmation que le compte a bien été crée 
        })
    })
    .catch( error => res.status(500).json({error}));
}

//Fonction permettant la connexion d'un utilisateur 
exports.login = (req,res,next) =>
{
    const email = req.body.email; // Recupération de l'email de la requête
    var sql = `SELECT * FROM users WHERE email = '${email}'`; // Récuperation de l'utilisateur ayant l'email de la requête 
    db.query(sql, function (err, result,fields) {
      if (err) throw err;
      if (result.length>0) // Si un utilisateur ayant cet email existe nous testons la concordance du mot de passe par rapport à l'email
      {
        const password = result[0].password; // Récupération du mot de passe de l'utilisateur trouvé 
        bcrypt.compare(req.body.password, password) // Nous comparons le mot de passe entré à celui de l'utilisateur trouvé grâce à bcrypt.compare
        .then(valid => {
            if (!valid){
                return res.status(401).json({error:'Mot de passe incorrect !'}); // Si le mot de passe ne correspond pas alors un message d'erreur est renvoyé afin d'avertir l'utilisateur 
            }
            const token = jwt.sign( //nous generons le token avec la fonction jwt.sign contenant l'userId, la clé de déchiffrage ainsi qu'un temps de vie du token de 24h
              {nickname : result[0].nickname},
              process.env.TOKEN_KEY,
              { expiresIn : '24h'}
            )
            res.status(200).json({ // Si le mot de passe est valide nous renvoyons les differentes données à mettre dans le localstorage
              admin : result[0].admin,
              userId: result[0].id,
              nickname: result[0].nickname,
              token : token,

          });
        })
        .catch(error => res.status(500).json({error}));
      }
      else
      {
        return res.status(401).json({error:'Utilisateur non trouvé !'}); //Si aucun utilisateur correspond à l'email entré lors de la connexion nous renvoyons un message d'erreur pour avertir l'utilisateur
      }
    })  
}

//Fonction permettant de recuperer l'image de profil d'un utilisateur
exports.getProfileImageByNickname = (req,res,next) => {
  var sql = `SELECT profileimg FROM users  WHERE nickname ='${req.params.nickname}'`; // Selection de l'URL de la photo de profil de l'utilisateur selon un nickname en paramètre
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    if (result.length>0) // Permet d'empecher l'arrivée sur une page de profil d'un utilisateur inexistant en verifiant si il y'a un resultat à la requête (sinon l'utilisateur n'existe pas)
    {
      return res.json(result[0].profileimg); // Renvoi de l'url de la photo de profil au frontend
    }
    else
    {
      return res.status(404).json({error:"Utilisateur inexistant"}) // Renvoi d'un message d'erreur si l'utilisateur n'existe pas 
    }
  })
}


exports.getCurrentUser = (req,res,next) => {
  const token = req.headers.authorization.split(' ')[1]; 
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const nickname = decodedToken.nickname
  var sql = `SELECT * FROM users  WHERE nickname ='${nickname}'`; // Selection de l'URL de la photo de profil de l'utilisateur selon un nickname en paramètre
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    res.json(result)
  })
}

//Fonction permettant de mettre à jour la photo de profil d'un utilisateur 
exports.UpdateProfilePicture = (req,res,next) => {
  db.query(`SELECT profileimg FROM users WHERE nickname=('${req.params.nickname}')`, function (err, result,fields) { // recuperation de la photo de profil de l'utilisateur ayant son nickname en paramètre
    if (err){
      return res.status(403).json({error : err});
    };
    const filename = result[0].profileimg.split('/images/')[1]; // Recupération du nom de l'image dans le dossier images
    if(filename!=='no-picture.jpg') // SI l'image n'est pas l'image de base des utilisateurs n'ayant pas de photo de profil nous supprimons l'ancienne photo de profil avant le changement
    {
      fs.unlink(`images/${filename}`, () =>{

    });
    }
  })
  var ProfilePictureUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; // Récupération de l'URL de la nouvelle photo de profil 
  var sql = `UPDATE users SET profileimg = '${ProfilePictureUrl}' WHERE nickname = '${req.params.nickname}'` // Mise à jour de l'URL de la photo de profil de l'utilsateur dans la base de donnée
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
    var sql = `SELECT profileimg FROM users  WHERE nickname ='${req.params.nickname}'`; // Récupération de la nouvelle photo de profil de l'utilisateur
    db.query(sql, function (err, result,fields) {
      if (err){
        return res.status(403).json({error : err});
      };
      return res.json(result[0].profileimg); // Renvoi au front end de l'URL de la nouvelle photo de profil de l'utilisateur
    })
  })
}

//Fonction permettant de mettre à jour le mot de passe d'un utilisateur
exports.UpdatePassword = (req,res,next) => {
  db.query(`SELECT password FROM users WHERE nickname = '${req.params.nickname}'`, function (err, result,fields) { // Selection du mot de passe de l'utilisateur ayant son nickname en paramètre
    if (err){
       return res.status(403).json({error : err});
    };
    bcrypt.compare(req.body.currentPassword, result[0].password) // Vérification du mot de passe actuel saisi avec le mot de passe dans la base de donnée à l'aide de bcrypt.compare
    .then(valid => {
        if (!valid){
            return res.status(401).json({error:'Mot de passe actuel incorrect !'}); // Si le mot de passe actuel est incorrect envoi d'un message d'erreur pour l'utilisateur
        }
        bcrypt.hash(req.body.newPassword,10) //Si le mot de passe actuel est correct nous hashons le nouveau mot de passe à l'aide de bcrypt.hash
        .then(hash => {
          var sql = `UPDATE users SET password = '${hash}' WHERE nickname = '${req.params.nickname}'` // Nous mettons à jour le mot de passe de l'utilisateur 
          db.query(sql, function (err, result,fields) {
            if (err){
              return res.status(403).json({error : err});
            };
            return res.status(200).json({message : 'Votre mot de passe a bien été modifié'}) // Envoi d'un message de confirmation à l'utilisateur
          })
        })
    })
    .catch(error => res.status(500).json({error}));
  })
}

//Fonction permettant de supprimer son compte 
exports.deleteAccount = (req,res,next) => {
  db.query(`SELECT imageUrl FROM posts WHERE nickname=('${req.params.nickname}')`, function (err, result,fields) { // Selection des urls des images des articles de l'utilisateur ayant son nickname en paramètre
    if (err){
      return res.status(403).json({error : err});
    };
    result.forEach(post=> { // Boucle sur les articles
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{ //Suppression de l'image de chaque article dans le dossier images

      });
    })
  })
  db.query(`SELECT profileimg FROM users WHERE nickname=('${req.params.nickname}')`, function (err, result,fields) { // Selection de l'URL de la photo de profi de l'utilisateur
    if (err){
      return res.status(403).json({error : err});
    };
    const filename = result[0].profileimg.split('/images/')[1];
    if(filename!=='no-picture.jpg') // Si la photo de profil de l'utilisateur n'est pas la photo de base des utilisateurs n'ayant pas de photo de profil nous la supprimons du dossier images 
    {
      fs.unlink(`images/${filename}`, () =>{

    });
    }
  })
  var sql = `DELETE FROM posts WHERE nickname=('${req.params.nickname}')`; // Suppression des articles de l'utilisateur 
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
  })
  var sql = `DELETE FROM users WHERE nickname=('${req.params.nickname}')`; // Suppression de l'utilisateur 
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
  })
  var sql = `SELECT * FROM posts `; // Selection des tous les articles pour l'affichage
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
    return res.status(200).json({message:'Votre compte a bien été supprimé',posts : result}) //Envoi d'un message de confirmation que le compte a bien été créer et renvoi des articles pour affichage
  })
  
}