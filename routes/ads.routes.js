const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/authMiddleware');
const imageUpload = require('../utils/imageUploads');

const AdsController = require('../controllers/ads.controller');

router.get('/ads', AdsController.getAll);

router.get('/ads/:id', AdsController.getById);

router.post(
  '/ads',
  imageUpload.single('photo'),
  authMiddleware,
  AdsController.post
);

router.delete('/ads/:id', authMiddleware, AdsController.delete);

router.put(
  '/ads/:id',
  imageUpload.single('photo'),
  authMiddleware,
  AdsController.put
);

router.get('/ads/search/:searchPhrase', AdsController.getBySearchPhrase);

module.exports = router;
