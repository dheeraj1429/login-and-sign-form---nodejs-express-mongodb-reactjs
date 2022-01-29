const express = require('express');
const router = express.Router();
const userControlles = require('../controllers/userControlles');

router.post('/new', userControlles.userSignIn);
router.post('/find', userControlles.userLogin);

module.exports = router;
