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
    var usersTable = "CREATE TABLE IF NOT EXISTS users (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,nickname  VARCHAR(255), email  VARCHAR(255), password VARCHAR(255), admin SMALLINT, UNIQUE(nickname) )";
    db.query(usersTable, function (err, result) {
        if (err) throw err;
        console.log("Table users available");
    });
    var postsTable = "CREATE TABLE IF NOT EXISTS posts (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,nickname  VARCHAR(255), imageUrl  VARCHAR(255), post_text TEXT)";
    db.query(postsTable, function (err, result) {
        if (err) throw err;
        console.log("Table posts available");
    });

});

module.exports = db;