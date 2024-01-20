const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isDistributor: { type: Boolean, required: true },
  distributorId: { type: String },
  password: { type: String, required: true },
  agreeTerms: { type: Boolean, required: true },
});

const UserModel = mongoose.model('UserData', userSchema);

module.exports = UserModel;
