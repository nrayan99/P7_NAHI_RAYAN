const db = require('../db_connect');


exports.signup = (req,res,next) =>
{
    const email = req.body.email;
    const nickname = req.body.nickname;
    const password = req.body.password;
    var sql = `INSERT INTO users (nickname, email, password) VALUES ('${nickname}','${email}','${password}')`;
    db.query(sql, function (err, result) {
      if (err){
        res.status(403).json({error : err});
      };
      console.log("1 record inserted");
    })
    
}