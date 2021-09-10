const db = require('../db_connect');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = (req,res,next) =>
{
    const email = req.body.email;
    const nickname = req.body.nickname;
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const password=hash;
        var sql = `INSERT INTO users (nickname, email, password, admin) VALUES ('${nickname}','${email}','${password}', '0')`;
        db.query(sql, function (err, result) {
             if (err){
                res.status(403).json({error : err});
             };
             res.status(200).json({ message: 'Compte crée avec succès'});
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
