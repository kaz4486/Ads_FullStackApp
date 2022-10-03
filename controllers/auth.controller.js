const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.registration = async (req, res) => {
  const { login, password, phoneNumber } = req.body;
  const fileType = req.file ? await getImageFileType(req.file) : 'unknown';

  try {
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string' &&
      phoneNumber &&
      !isNaN(phoneNumber) && // typeof nie działa ??
      req.file &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const userWithLogin = await User.findOne({ login });
      if (userWithLogin) {
        fs.unlinkSync(`./public/uploads/${req.file.filename}`);
        console.log('deleted');
        return res
          .status(409)
          .send({ message: 'User with login is already exist' });
      }
      const user = await User.create({
        //dlaczego create?
        login,
        password: await bcrypt.hash(password, 10),
        phoneNumber,
        avatar: req.file.filename,
      });
      res.status(201).send({ message: 'User created' + ' ' + user.login });
    } else {
      fs.unlinkSync(`./public/uploads/${req.file.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { login, password } = req.body;
  try {
    if (
      login &&
      typeof login === 'string' &&
      password &&
      typeof password === 'string'
    ) {
      const user = await User.findOne({ login });
      if (!user) {
        res.status(400).send({ message: 'Login or password are incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          const userData = { login: user.login, id: user._id };
          req.session.user = userData;
          console.log(req.session);
          res.status(200).send({ message: 'Login succesful' });
        } else {
          res.status(400).send({ message: 'Login or password are incorrect' });
        }
      }
    } else {
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getUser = async (req, res) => {
  res.send("Yeah! I'm logged");
};

exports.deleteSession = async (req, res) => {
  try {
    req.session.destroy();
    res.status(200).send({ message: 'Session destroyed' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
