// // routes/authRoutes.js
// const express = require('express');
// const { login } = require('../controllers/loginController');
// const router = express.Router();

// router.post('/login', login);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/loginController');

router.post('/login', login);

module.exports = router;

