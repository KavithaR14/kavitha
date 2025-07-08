// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Students'); // or User model if used

exports.protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);
    throw new Error('Not authorized, token missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await Student.findById(decoded.id).select('-password');


    next();
  } catch (err) {
    res.status(401);
    throw new Error('Token invalid');
  }
});
