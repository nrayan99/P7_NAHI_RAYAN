const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); // on importe le middleware de configuration de multer afin de l'utiliser pour les routes necessitant le multer

router.post('/createPost',auth,multer, postsCtrl.createPost); 
router.get('/getAllPosts', auth, postsCtrl.getAllPosts);
router.delete('/deletePost/:id', auth, postsCtrl.deletePost);
router.put('/updatePost/:id',auth , multer, postsCtrl.updatePost);
router.get('/getPostsByNickname/:nickname', auth, postsCtrl.getPostsByNickname);
router.put('/maskPost/:id',auth, postsCtrl.maskPost)
router.put('/unmaskPost/:id',auth, postsCtrl.unmaskPost)
router.get('/PostsLength',auth,postsCtrl.PostsLength)

module.exports=router;