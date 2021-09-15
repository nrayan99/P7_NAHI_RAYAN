const db = require('../db_connect'); // Importation du fichier contenant les paramètre de connexion de la base de données, nous permettant ainsi d'interagir avec la base de donnée
const fs = require('fs'); // Importation de fs nous permettant d'interagir avec les fichiers du dossier images

// Fonction permettant de creer un article 
exports.createPost = (req, res , next) => {
    const userId = req.body.userId; // Recuperation de l'userId
    let imageUrl=''; 
    if (req.file) // Si une image est envoyée lors de la création de l'article : changement de imageUrl avec l'URL de l'image envoyée
    {
      imageUrl =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    const post_text = req.body.post_text;
    db.query(`SELECT nickname FROM users WHERE id = '${userId}'`, function (err, result) { // selection du nickname de l'utilisateur ayant effectué l'article
      if (err) throw err;
      const nickname = result[0].nickname;
      var sql = `INSERT INTO posts (nickname, imageUrl, post_text) VALUES ('${nickname}','${imageUrl}','${post_text}')`; // configuration de l'article
      db.query(sql, function (err, result) {
            if (err) throw err;
            db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) { // Renvoi de la liste des articles pour l'affichage dans le front-end
              if (err){
                return res.status(403).json({error : err});
              };
            return res.json(result);
            })
      })
  })
}

//Fonction permettant de recuperer tous les articles présents dans la base de donnée
exports.getAllPosts = (req, res , next) => {
  var sql = `SELECT * FROM posts ORDER BY id DESC`;
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    return res.json(result);
  })
}

//Fonction permettant de supprimer un article dans la base de donnée 
exports.deletePost = (req, res , next) => {
  db.query(`SELECT imageUrl FROM posts WHERE id=('${req.params.id}')`, function (err, result,fields) { // Recupération de l'imageUrl de l'article avec l'id de l'article en paramètre
    if (err){
      return res.status(403).json({error : err});
    };
    const filename = result[0].imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () =>{ // Suppression de l'image de l'article dans le dossier image

    });
  })
  var sql = `DELETE FROM posts WHERE id=('${req.params.id}')`; // Suppression de l'article à l'aide de l'id de l'article en paramètre
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
  })
  db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) { // Renvoi de la liste des articles pour l'affichage dans le front-end
    if (err){
      return res.status(403).json({error : err});
    };
    return res.json(result);
  })
}

//Fonction permettant de mettre à jour un article
exports.updatePost = (req,res,next) => { 
  db.query(`SELECT * FROM posts WHERE id=('${req.params.id}')`, function (err, result,fields) {  // Recupération de l'imageUrl de l'article avec l'id de l'article en paramètre
    if (err){
      return res.status(403).json({error : err});
    };
    if (req.file) // Si l'utilisateur a modifié l'image nous récuperons l'URL de la nouvelle image et nous supprimons l'ancienne image du dossier images
    {
      const imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const filename = result[0].imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
    
      });
      db.query(`UPDATE posts SET imageUrl = '${imageUrl}' WHERE id = '${req.params.id}'`, function (err, result,fields) { // Mise à jour de l'imageUrl de l'article avec l'URL de la nouvelle image
        if (err){
           return res.status(403).json({error : err});
        };
      })
    }
    else
    {
      if (req.body.imagedeleted==1) // Si la personne a supprimé l'image de l'article nous supprimons l'image de base de l'article du dossier images
      {
        const filename = result[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
      
        });
        db.query(`UPDATE posts SET imageUrl = '' WHERE id = '${req.params.id}'`, function (err, result,fields) { // Mise à jour de l'imageUrl de l'article avec un URL vide 
          if (err){
            return res.status(403).json({error : err});
          };
        })
      }
    }
    db.query(`UPDATE posts SET post_text = '${req.body.post_text}' WHERE id = '${req.params.id}'`, function (err, result,fields) { // Mise à jour du texte de l'article
      if (err){
         return res.status(403).json({error : err});
      };
    })
    db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) { // Renvoi de la liste des articles pour l'affichage dans le front-end
      if (err){
         return res.status(403).json({error : err});
      };
      return res.json(result);
    })
  });

}

//Fonction permettant de recuperer les articles selon le nickname de l'utilisateur les ayant crée 
exports.getPostsByNickname = (req, res , next) => {
  var sql = `SELECT * FROM posts  WHERE nickname ='${req.params.nickname}' ORDER BY id DESC`; // Récuperation des articles à l'aide du nickname de l'utilisateur les ayant crée en paramètre
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    return res.json(result);
  })
}
