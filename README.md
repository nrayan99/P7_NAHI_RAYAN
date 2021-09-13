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

TOKEN_KEY=*Choisir une clé complexe pour les tokens de JSONWEBTOKEN*

**Lancement du projet**
- Dans la console sur le dossier backend saisir : "node server" ou "nodemon serve" si vous avez nodemon
- Dans la console sur le dossier frontend/groupomania saisir : "npm run serve"


**Creation d'un compte admin sur l'API**
- Creer un compte sur l'API
- Dans la console de MYSQL veuillez entrer cette ligne : UPDATE users SET admin = 1 WHERE nickname = '*Le pseudo de l'utilisateur que vous souhaitez rendre admin*'


 
