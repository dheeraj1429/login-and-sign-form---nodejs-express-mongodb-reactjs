const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/loginform')
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });
