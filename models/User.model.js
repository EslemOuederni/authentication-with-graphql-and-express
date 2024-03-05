const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Last Name is Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    trim: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;