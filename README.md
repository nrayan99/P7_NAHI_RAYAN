//P7_NAHI_RAYAN

**INSTALLATION DU PROJET**

- Cloner le dépôt
- Dans la console faire "npm install" dans le dossier "backend" et dans le dossier "frontend/groupomania"
- Créer un fichier ".env" à la base du dossier "backend"
- Remplir le fichier ".env" des champs suivants : 

MYSQL_HOST= *Votre nom d'hôte par exemple 'localhost'*

MYSQL_USER= *Votre nom d'utilisateur MYSQL*

MYSQL_PASSWORD= *Votre mot de passe d'utilisateur MYSQL*

MYSQL_DB= *Votre nom de base de donnée MYSQL*

TOKEN_KEY=*Choisir une clé de dechiffrement complexe pour les tokens de JSONWEBTOKEN la clé ne doit pas être vide !*

adminUser= *Choisir le nom d'utilisateur pour le compte admin*

adminEmail= *Choisir l'email pour le compte admin*

adminPassword = *Choisir le mot de passe pour le compte admin*

**Lancement du projet**
- Dans la console sur le dossier backend saisir : à la première utilisation  "node createDb.js & node server" ou "node createDb.js nodemon serve" si vous avez nodemon afin de créer la base de donnée puis aux utilisations suivantes seulement "node server" ou 'nodemon serve'
- 
- Dans la console sur le dossier frontend/groupomania saisir : "npm run serve"



 
