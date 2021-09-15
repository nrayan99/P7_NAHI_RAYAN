const mysql = require('mysql'); // On importe mysql pour utiliser les fonctions permettant d'interagir avec la base de donnée
require('dotenv').config(); // Importation de dotenv nous permettant d'utilliser les variables d'environnement
const db = mysql.createConnection({ // Permet de se connecter à la base de donnée 

    host: process.env.MYSQL_HOST,
 
    user: process.env.MYSQL_USER,
 
    password: process.env.MYSQL_PASSWORD,

    database: process.env.MYSQL_DB,
  });

db.connect(function(err) { // Crée les tables users et posts
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    var usersTable = "CREATE TABLE IF NOT EXISTS users (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,nickname  VARCHAR(110), email  VARCHAR(110), password VARCHAR(255), admin SMALLINT, profileimg VARCHAR(255), UNIQUE(nickname,email) )";
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

module.exports = db; // On exporte le module db afin de pouvoir l'utiliser dans les autres fichiers