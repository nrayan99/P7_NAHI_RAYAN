const db = require('../db_connect');

exports.createPost = (req, res , next) => {
    const userId = req.body.userId;
    const imageUrl = req.body.imageUrl;
    const post_text = req.body.post_text;

    var sql = `INSERT INTO posts (userId, imageUrl, post_text) VALUES ('${userId}','${imageUrl}','${post_text}')`;
        db.query(sql, function (err, result) {
             if (err) throw err;
             
      console.log("1 record inserted");
        })
}
