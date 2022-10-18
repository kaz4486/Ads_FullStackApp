const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');
const isString = require('../utils/validators/isString');

exports.registration = async (req, res) => {
  const { login, password, phone } = req.body;
  console.log(login, password, phone);
  console.log(req.file);
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

  try {
    if (
      isString(login) &&
      isString(password) &&
      isString(phone) &&
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
        return res
          .status(409)
          .send({ message: 'User with login is already exist' });
      }
      const user = await User.create({
        login,
        password: await bcrypt.hash(password, 10),
        phoneNumber: phone,
        avatar: req.file.filename,
      });
      return res
        .status(201)
        .send({ message: 'User created' + ' ' + user.login });
    }
    fs.unlinkSync(`./public/uploads/${req.file.filename}`);
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    if (isString(login) && isString(password)) {
      const user = await User.findOne({ login });
      if (!user) {
        return res
          .status(400)
          .send({ message: 'Login or password are incorrect' });
      }
      if (bcrypt.compareSync(password, user.password)) {
        const userData = { login: user.login, id: user._id };
        req.session.user = userData;
        return res.status(200).send({ message: 'Login succesful' });
      }
      return res
        .status(400)
        .send({ message: 'Login or password are incorrect' });
    }
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  return res.send("Yeah! I'm logged");
};

exports.deleteSession = async (req, res) => {
  try {
    req.session.destroy();
    return res.status(200).send({ message: 'Session destroyed' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
