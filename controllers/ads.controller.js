const Ad = require('../models/ad.model');
const User = require('../models/user.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const isString = require('../utils/validators/isString');
const isNumber = require('../utils/validators/isNumber');

exports.getAll = async (req, res) => {
  try {
    return res.json(await Ad.find().populate('sellerInfo'));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id).populate('sellerInfo');
    if (ad) {
      return res.json(ad);
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  try {
    const pattern = req.params.searchPhrase;
    const ad = await Ad.find({
      title: { $regex: pattern, $options: 'i' },
    }).populate('sellerInfo');
    if (ad.length > 0) return res.json(ad);
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  const { title, content, publicationDate, price, localization } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
  try {
    const user = await User.findOne({ login: req.session.user.login });
    console.log(user._id);
    if (!user) {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      return res.status(400).send({ message: 'Bad request' });
    }
    if (
      isString(title) &&
      isString(content) &&
      isString(publicationDate) &&
      isNumber(price) &&
      isString(localization) &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
      user
    ) {
      const newAd = await Ad.create({
        title,
        content,
        publicationDate,
        photo: req.file.filename,
        price,
        localization,
        sellerInfo: user._id,
      });
      return res.status(201).send({ message: 'New Ad added' + newAd });
    }

    fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  console.log(req.body);
  const { title, content, publicationDate, price, localization } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
  try {
    const ad = await Ad.findOne({ _id: req.params.id });
    const user = await User.findOne({ login: req.session.user.login });
    console.log(ad.sellerInfo, user._id);
    if (ad.sellerInfo != user._id && !req.file) {
      console.log('tu');
      return res.status(400).send({ message: 'Bad request' });
    }
    if (ad.sellerInfo != user._id && req.file) {
      console.log('ze zdjęciem');
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      console.log('atu?');
      return res.status(400).send({ message: 'Bad request' });
    }
    if (
      isString(title) &&
      isString(content) &&
      isString(publicationDate) &&
      isNumber(price) &&
      isString(localization)
    ) {
      let newAd = {};
      if (
        req.file &&
        ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
      ) {
        newAd = await Ad.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              title,
              content,
              publicationDate,
              photo: req.file.filename,
              price,
              localization,
            },
          },
          { new: true }
        );
        console.log(ad.photo);
        fs.unlinkSync(`./public/uploads/${ad.photo}`);
      }
      if (!req.file) {
        newAd = await Ad.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              title,
              content,
              publicationDate,
              price,
              localization,
            },
          },
          { new: true }
        );
      }
      if (newAd !== undefined) {
        return res
          .status(201)
          .send({ message: 'Ad updated', modifiedAd: newAd });
      }
      return res.status(404).send({ message: 'Not found' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params.id });
    const user = await User.findOne({ login: req.session.user.login });
    if (ad.sellerInfo != user._id) {
      return res.status(400).send({ message: 'Bad request' });
    }
    if (ad) {
      await Ad.deleteOne({ _id: req.params.id });
      console.log(ad.photo);
      fs.unlinkSync(`./public/uploads/${ad.photo}`);
      console.log('tam');
      return res.json({ message: 'Ad deleted', deletedAd: ad });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
