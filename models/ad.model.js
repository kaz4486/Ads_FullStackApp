const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 10, maxlength: 50 },
  content: { type: String, required: true, minlength: 20, maxlength: 100 },
  publicationDate: { type: String, required: true },
  photo: { type: String, required: true },
  price: { type: Number, required: true },
  localization: { type: String, required: true },
  sellerInfo: { type: String, required: false, ref: 'User' },
});

module.exports = mongoose.model('Ad', adSchema);
