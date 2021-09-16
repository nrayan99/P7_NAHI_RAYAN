const mysql = require('mysql'); // On importe mysql pour utiliser les fonctions permettant d'interagir avec la base de donnée
require('dotenv').config(); // Importation de dotenv nous permettant d'utilliser les variables d'environnement
const bcrypt = require('bcrypt');  // Importation de bcrypt nous permettant de hasher le mot de passe dans la base de donnée
const db = mysql.createConnection({ // Permet de se connecter à la base de donnée 

    host: process.env.MYSQL_HOST,
 
    user: process.env.MYSQL_USER,
 
    password: process.env.MYSQL_PASSWORD,

    database: process.env.MYSQL_DB,
  });

db.connect(function(err) { // Crée les tables users et posts
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    var usersTable = "CREATE TABLE IF NOT EXISTS users (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,nickname  VARCHAR(110) UNIQUE , email  VARCHAR(110) UNIQUE, password VARCHAR(255), admin SMALLINT, profileimg VARCHAR(255) )";
    db.query(usersTable, function (err, result) {
        if (err) throw err;
        console.log("Table users available");
    });
    var postsTable = "CREATE TABLE IF NOT EXISTS posts (id SMALLINT NOT NULL AUTO_INCREMENT PRIMARY KEY ,nickname  VARCHAR(255), imageUrl  VARCHAR(255), post_text TEXT , masked SMALLINT, date VARCHAR(100) )";
    db.query(postsTable, function (err, result) {
        if (err) throw err;
        console.log("Table posts available");
    });
    bcrypt.hash(process.env.adminPassword,10)
    .then(hash=>
    {   
        var admin = `INSERT INTO users (nickname, email, password, admin, profileimg) VALUES ('${process.env.adminUser}','${process.env.adminEmail}','${hash}', '1' ,'admin')`;
        db.query(admin, function (err, result) {
            if (err) {
                console.log('compte admin déjà crée')
            }
            else {
            console.log("Admin available")
            };
        });
    })
    .catch( error => res.status(500).json({error}));
   
});

module.exports = db; // On exporte le module db afin de pouvoir l'utiliser dans les autres fichiers