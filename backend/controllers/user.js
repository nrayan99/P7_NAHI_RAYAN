const db = require('../db_connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signup = (req,res,next) =>
{
    const email = req.body.email;
    const nickname = req.body.nickname;
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const password=hash;
        const profileimg = `${req.protocol}://${req.get('host')}/images/no-picture.jpg`
        var sql = `INSERT INTO users (nickname, email, password, admin, profileimg) VALUES ('${nickname}','${email}','${password}', '0' , '${profileimg}')`;
        db.query(sql, function (err, result) {
             if (err){
                return res.status(403).json({error : err});
             };
             return res.status(200).json({ message: 'Compte crée avec succès'});
        })
    })
    .catch( error => res.status(500).json({error}));
    
    
}

exports.login = (req,res,next) =>
{
    const email = req.body.email;
    var sql = `SELECT * FROM users WHERE email = '${email}'`;
    db.query(sql, function (err, result,fields) {
      if (err) throw err;
      if (result.length>0)
      {
        const password = result[0].password;
        bcrypt.compare(req.body.password, password)
        .then(valid => {
            if (!valid){
                return res.status(401).json({error:'Mot de passe incorrect !'});
            }
            res.status(200).json({
              admin : result[0].admin,
              userId: result[0].id,
              nickname: result[0].nickname,
              token: jwt.sign(
                  {userId : result[0].id},
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn : '24h'}
              )
          });
        })
        .catch(error => res.status(500).json({error}));
      }
      else
      {
        return res.status(401).json({error:'Utilisateur non trouvé !'});
      }
    })  
}

exports.getProfileImageByNickname = (req,res,next) => {
  var sql = `SELECT profileimg FROM users  WHERE nickname ='${req.params.nickname}'`;
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    return res.json(result[0].profileimg);
    
  })
}

exports.UpdateProfilePicture = (req,res,next) => {
  var ProfilePictureUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
  var sql = `UPDATE users SET profileimg = '${ProfilePictureUrl}' WHERE nickname = '${req.params.nickname}'`
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
    var sql = `SELECT profileimg FROM users  WHERE nickname ='${req.params.nickname}'`;
    db.query(sql, function (err, result,fields) {
      if (err){
        return res.status(403).json({error : err});
      };
      return res.json(result[0].profileimg);
    })
  })
}

exports.UpdatePassword = (req,res,next) => {
  db.query(`SELECT password FROM users WHERE nickname = '${req.params.nickname}'`, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
    bcrypt.compare(req.body.currentPassword, result[0].password)
    .then(valid => {
        if (!valid){
            return res.status(401).json({error:'Mot de passe actuel incorrect !'});
        }
        bcrypt.hash(req.body.newPassword,10)
        .then(hash => {
          var sql = `UPDATE users SET password = '${hash}' WHERE nickname = '${req.params.nickname}'`
          db.query(sql, function (err, result,fields) {
            if (err){
              return res.status(403).json({error : err});
            };
            return res.status(200).json({message : 'Votre mot de passe a bien été modifié'})
          })
        })
    })
    .catch(error => res.status(500).json({error}));
  })
}

exports.deleteAccount = (req,res,next) => {
  db.query(`SELECT imageUrl FROM posts WHERE nickname=('${req.params.nickname}')`, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    result.forEach(post=> {
      const filename = post.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{

      });
    })
  })
  db.query(`SELECT profileimg FROM users WHERE nickname=('${req.params.nickname}')`, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    const filename = result[0].profileimg.split('/images/')[1];
    if(filename!=='no-picture.jpg')
    {
      fs.unlink(`images/${filename}`, () =>{

    });
    }
  })
  var sql = `DELETE FROM posts WHERE nickname=('${req.params.nickname}')`;
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
  })
  var sql = `DELETE FROM users WHERE nickname=('${req.params.nickname}')`;
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
  })
  var sql = `SELECT * FROM posts `;
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
    return res.status(200).json({message:'Votre compte a bien été supprimé',posts : result})
  })
  
}