const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.post('/signup', userCtrl.signup); 
router.post('/login', userCtrl.login);
router.get('/getProfileImageByNickname/:nickname',auth,userCtrl.getProfileImageByNickname);
router.put('/UpdateProfilePicture/:nickname',auth,multer,userCtrl.UpdateProfilePicture);
router.put('/UpdatePassword/:nickname',auth,userCtrl.UpdatePassword);
router.delete('/deleteAccount/:nickname',auth,userCtrl.deleteAccount)
module.exports=router;