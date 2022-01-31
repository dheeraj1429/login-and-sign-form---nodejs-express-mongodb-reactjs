// Moudle
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Database Conntect
require('./models/db');
const userRouter = require('./routes/userRouter');

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Router
app.use('/user', userRouter);

// Server
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
