const db = require('../db_connect');

exports.createPost = (req, res , next) => {
    const userId = req.body.userId;
    const imageUrl= 'bb'
    const post_text = req.body.post_text;
    db.query(`SELECT nickname FROM users WHERE id = '${userId}'`, function (err, result) {
      if (err) throw err;
      const nickname = result[0].nickname;
       var sql = `INSERT INTO posts (nickname, imageUrl, post_text) VALUES ('${nickname}','${imageUrl}','${post_text}')`;
        db.query(sql, function (err, result) {
             if (err) throw err;
            console.log("1 record inserted");
        })
 })
}

exports.getAllPosts = (req, res , next) => {
  var sql = `SELECT * FROM posts`;
  db.query(sql, function (err, result,fields) {
    if (err){
      res.status(403).json({error : err});
    };
    res.json(result);
    
  })
}
