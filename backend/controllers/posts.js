const db = require('../db_connect');
const fs = require('fs');

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
        })
  })
}

exports.getAllPosts = (req, res , next) => {
  var sql = `SELECT * FROM posts ORDER BY id DESC`;
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    res.json(result);
    
  })
}
exports.deletePost = (req, res , next) => {
  db.query(`SELECT imageUrl FROM posts WHERE id=('${req.params.id}')`, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    const filename = result[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
    
        });
  }) 
  var sql = `DELETE FROM posts WHERE id=('${req.params.id}')`;
  db.query(sql, function (err, result,fields) {
    if (err){
       return res.status(403).json({error : err});
    };

      
    })
    db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) {
      if (err){
         return res.status(403).json({error : err});
      };
      res.json(result);
    
  })
}
exports.updatePost = (req,res,next) => {
  
  db.query(`SELECT * FROM posts WHERE id=('${req.params.id}')`, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    if (req.file)
    {
      console.log("test")
      const imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      const filename = result[0].imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () =>{
    
      });
      
      db.query(`UPDATE posts SET imageUrl = '${imageUrl}' WHERE id = '${req.params.id}'`, function (err, result,fields) {
        if (err){
           return res.status(403).json({error : err});
        };
      })
    }
    else
    {
      if (req.body.imagedeleted==1)
      {
        console.log("mimote")
        const filename = result[0].imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () =>{
      
        });
        
        db.query(`UPDATE posts SET imageUrl = '' WHERE id = '${req.params.id}'`, function (err, result,fields) {
          if (err){
             return res.status(403).json({error : err});
          };
        })
      }
    }
    db.query(`UPDATE posts SET post_text = '${req.body.post_text}' WHERE id = '${req.params.id}'`, function (err, result,fields) {
      if (err){
         return res.status(403).json({error : err});
      };
    })
    db.query(`SELECT * FROM posts ORDER BY id DESC`, function (err, result,fields) {
      if (err){
         return res.status(403).json({error : err});
      };
      res.json(result);
    })

  });

}

exports.getPostsByNickname = (req, res , next) => {
  var sql = `SELECT * FROM posts  WHERE nickname ='${req.params.id}' ORDER BY id DESC`;
  db.query(sql, function (err, result,fields) {
    if (err){
      return res.status(403).json({error : err});
    };
    res.json(result);
    
  })
}
