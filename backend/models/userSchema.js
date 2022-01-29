const mongoose = require('mongoose');

// user schema
const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter the name'],
  },
  email: {
    type: String,
    required: [true, 'please enter the email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'please enter the password'],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const userModel = new mongoose.model('user', User);

module.exports = userModel;
