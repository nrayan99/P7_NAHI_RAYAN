const express = require('express');
const router = express.Router();
const postsCtrl = require('../controllers/posts')

router.post('/createPost', postsCtrl.createPost); 
module.exports=router;