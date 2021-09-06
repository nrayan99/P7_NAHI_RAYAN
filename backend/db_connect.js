const mysql = require('mysql');

const db = mysql.createConnection({

    host: "localhost",
 
    user: "root",
 
    password: "groupo",

    database: "groupomania"
  });

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    var sql = "CREATE TABLE IF NOT EXISTS users (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,nickname  VARCHAR(255), email  VARCHAR(255), password VARCHAR(255), UNIQUE(nickname) )";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});

module.exports = db;