const Students = require('../models/Students');
const Admin = require('../models/Admin');
const Staff = require('../models/Staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required',
    });
  }

  try {
    let user = null;
    let role = '';

    user = await Admin.findOne({ username });
    if (user) role = 'admin';

    if (!user) {
      user = await Staff.findOne({ username });
      if (user) role = 'teacher';
    }

    if (!user) {
      user = await Students.findOne({ username });
      if (user) role = 'student';
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No user found with this username',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('Generated JWT Token:', token);

    const userData = user.toObject();
    delete userData.password;

    res.json({
      success: true,
      token,
      user: {
        ...userData,
        role,
      },
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during authentication',
    });
  }
};

module.exports = { login };
