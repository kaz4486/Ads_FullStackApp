const Ad = require('../models/ad.model');
const User = require('../models/user.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

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
    if (ad) return res.json(ad);
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBySearchPhrase = async (req, res) => {
  try {
    const pattern = req.params.searchPhrase;
    const ad = await Ad.find({ title: { $regex: pattern } }).populate(
      'sellerInfo'
    );
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
    // const userId = await User.findOne({ _id: req.session.id });
    console.log(user);
    if (
      title &&
      typeof title === 'string' &&
      content &&
      typeof content === 'string' &&
      publicationDate &&
      typeof publicationDate === 'string' &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
      price &&
      !isNaN(price) &&
      localization &&
      typeof localization === 'string' &&
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
      // await newAd.save();
      res.status(201).send({ message: 'New Ad added' + newAd });
    } else {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.put = async (req, res) => {
  const { title, content, publicationDate, price, localization } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
  try {
    const user = await User.findOne({ login: req.session.user.login });
    const adWithUser = await Ad.findOne({ sellerInfo: user._id });
    // czy należy do niego?
    if (
      title &&
      typeof title === 'string' &&
      content &&
      typeof content === 'string' &&
      publicationDate &&
      typeof publicationDate === 'string' &&
      price &&
      !isNaN(price) &&
      localization &&
      typeof localization === 'string' &&
      adWithUser
    ) {
      let newAd = {};
      if (
        req.file &&
        ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
      ) {
        const ad = await Ad.findOne({ _id: req.params.id });
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

      if (newAd) {
        return res
          .status(201)
          .send({ message: 'Ad updated', modifiedAd: newAd });
      }
      res.status(404).send({ message: 'Not found' });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  // sprawdzić, czy należy do niego
  try {
    const ad = await Ad.findOneAndDelete({ _id: req.params.id });
    if (ad) {
      fs.unlinkSync(`./public/uploads/${ad.photo}`);
      return res.json({ message: 'Ad deleted', deletedAd: ad });
    }
    res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
