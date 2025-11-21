const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  password_hash: { type: String, required: true },
  full_name: { type: String },
  profile_pic: { type: String },
  bio: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
