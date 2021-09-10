const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config'); // on importe le middleware de configuration de multer afin de l'utiliser pour les routes necessitant le multer

router.post('/createPost',multer, postsCtrl.createPost); 
router.get('/getAllPosts', auth, postsCtrl.getAllPosts);
router.delete('/deletePost/:id',postsCtrl.deletePost);
router.put('/updatePost/:id',multer, postsCtrl.updatePost)
module.exports=router;