const db = require('../db_connect');
exports.createPost = (req, res , next) => {
    const userId = req.body.userId;
    let imageUrl='';
    if (req.file)
    {
      imageUrl =`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    }
    
    const post_text = req.body.post_text;
    db.query(`SELECT nickname FROM users WHERE id = '${userId}'`, function (err, result) {
      if (err) throw err;
      const nickname = result[0].nickname;
       var sql = `INSERT INTO posts (nickname, imageUrl, post_text) VALUES ('${nickname}','${imageUrl}','${post_text}')`;
        db.query(sql, function (err, result) {
             if (err) throw err;
             db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) {
              if (err){
                res.status(403).json({error : err});
              };
              res.json(result);
              
            })
            console.log("1 record inserted");
        })
  })
}

exports.getAllPosts = (req, res , next) => {
  var sql = `SELECT * FROM posts ORDER BY id DESC`;
  db.query(sql, function (err, result,fields) {
    if (err){
      res.status(403).json({error : err});
    };
    res.json(result);
    
  })
}
exports.deletePost = (req, res , next) => {
  console.log(req.params); 
  var sql = `DELETE FROM posts WHERE id=('${req.params.id}')`;
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };
    db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) {
      if (err){
         return res.status(403).json({error : err});
      };
      res.json(result);
      
    })
    
  })
}
