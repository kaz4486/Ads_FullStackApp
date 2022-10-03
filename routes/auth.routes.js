const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const AuthController = require('../controllers/auth.controller');
const imageUpload = require('../utils/imageUploads');

router.post(
  '/register',
  imageUpload.single('avatar'),
  AuthController.registration
);
router.post('/login', AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.delete('/logout', authMiddleware, AuthController.deleteSession);

module.exports = router;
