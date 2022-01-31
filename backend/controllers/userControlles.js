const userModel = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Sign In -> store user into database
const userSignIn = async (req, res) => {
  const { name, email, password } = req.body.data;

  try {
    // Create a new user
    const UserStore = new userModel({
      name,
      email,
      password,
    });

    // store user data into database
    const userRef = await UserStore.save(UserStore);

    // Genrate the token
    const token = await UserStore.genrateUserToken();
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true,
    });

    // Send back response
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
    const userFindRef = await userModel.findOne({ email });

    // genrate the token for the login user
    const token = await userFindRef.genrateUserToken();

    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 1000000),
      httpOnly: true,
    });

    // varify the token
    const userPresent = req.cookies.jwt;
    const varifyUser = await jwt.verify(userPresent, process.env.SECRET_KEY);
    console.log(varifyUser);

    // Match hashpassword
    const userHashPasswordMatch = await bcrypt.compare(password, userFindRef.password);

    if (userHashPasswordMatch) {
      // send back the response with token
      return res.status(200).json({
        success: true,
        massage: 'successful login',
        data: {
          name: userFindRef.name,
          email: userFindRef.email,
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
