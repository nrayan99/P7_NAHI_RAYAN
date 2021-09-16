const mysql = require('mysql'); // On importe mysql pour utiliser les fonctions permettant d'interagir avec la base de donnée
require('dotenv').config(); // Importation de dotenv nous permettant d'utilliser les variables d'environnement
const db = mysql.createConnection({ // Permet de se connecter à la base de donnée 

    host: process.env.MYSQL_HOST,
 
    user: process.env.MYSQL_USER,
 
    password: process.env.MYSQL_PASSWORD,
  });

  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    db.query(`CREATE DATABASE ${process.env.MYSQL_DB}`, function (err, result) {
      if (err) {
          console.log('Database already exist')
      }
      else {
        console.log("Database created");
      }
     
    });
  });