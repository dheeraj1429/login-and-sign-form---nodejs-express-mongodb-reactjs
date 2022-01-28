const express = require('express');
const router = express.Router();
const userControlles = require('../controllers/userControlles');

router.get('/new', userControlles.userloginRoute);

module.exports = router;
