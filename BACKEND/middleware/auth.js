const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const Student = require('../models/Students');
const Stafff = require('../models/Staff');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Student.findById(decoded.id).select('-password');
      if (!req.user) {
        req.user = await Staff.findById(decoded.id).select('-password');
      }

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized');
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const studentOnly = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied, students only');
  }
};

const teacherOnly = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied, teachers only');
  }
};

module.exports = { protect, studentOnly, teacherOnly };
