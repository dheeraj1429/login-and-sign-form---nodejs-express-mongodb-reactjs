const userModel = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_TOKEN = 'abcdefghijklmnopqrstuvwxyzo#(*&!(*&$(H!)*UNIfjboisub#%@!%%!ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

// Sign In -> store user into database
const userSignIn = async (req, res) => {
  const { name, email, password } = req.body.data;

  // hashing password
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    // Create a new user
    const UserStore = new userModel({
      name,
      email,
      password: hashPassword,
    });

    // store user data into database
    const userRef = await UserStore.save(UserStore);

    if (userRef) {
      return res.status(201).json({
        success: true,
        massage: 'sign up successful',
        userData: {
          name,
          email,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        massage: 'somthing worng',
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// Login User -> find users from the databse
const userLogin = async function (req, res) {
  try {
    const { email, password } = req.body.data;

    // Find the user from the datbase
    const userFindRef = await userModel.find({ email });

    if (userFindRef.length == 0) {
      return res.status(400).json({
        success: false,
        massage: 'no user fount',
      });
    }

    // Match hashpassword
    const userHashPasswordMatch = await bcrypt.compare(password, userFindRef[0].password);

    if (userHashPasswordMatch === true) {
      // Genrate a JWT token
      const token = await jwt.sign(
        {
          id: userFindRef[0]._id,
          name: userFindRef[0].name,
        },
        JWT_TOKEN
      );

      // send back the response with token
      return res.status(200).json({
        success: true,
        massage: 'successful login',
        data: {
          name: userFindRef[0].name,
          email: userFindRef[0].email,
          token,
        },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  userSignIn,
  userLogin,
};
