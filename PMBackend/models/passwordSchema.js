const mongoose = require('mongoose');

const passwordSchema = new mongoose.Schema({
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }
});

const Password = mongoose.model('Password', passwordSchema, 'passwords');

module.exports = Password;
