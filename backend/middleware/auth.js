const jwt = require('jsonwebtoken');

const auth = async function (req, res, next) {
  const userPresent = req.cookies.jwt;
  const varifyUser = await jwt.verify(userPresent, process.env.SECRET_KEY);
  console.log(varifyUser);
};

module.exports = auth;
