// Moudle
const express = require('express');

// Database Conntect
require('./models/db');
const userRouter = require('./routes/userRouter');

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/user', userRouter);

// Server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
