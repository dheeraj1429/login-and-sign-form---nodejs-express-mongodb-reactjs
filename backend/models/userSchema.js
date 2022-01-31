const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = process.env.SECRET_KEY;

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
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

// Genrate the user token
User.methods.genrateUserToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id.toString(), name: this.name }, JWT_TOKEN);
    this.tokens = this.tokens.concat({ token });
    this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

User.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      // hashing password
      const hashPassword = await bcrypt.hash(this.password, 10);
      this.password = hashPassword;
    }
    next();
  } catch (err) {
    console.log(err);
  }
});

const userModel = new mongoose.model('user', User);

module.exports = userModel;
