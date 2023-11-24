const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const JWT_SECRET = 'Rakshitshrivastava2698@gmail.com';

// Route: /api/auth/createUser
router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 2 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Entre a valid password').isLength({ min: 4 })
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  };
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(404).json({ success, error: "A user with this email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user._id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route: /api/auth/login
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password can not be empty').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  };
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const cPasswordd = await bcrypt.compare(password, user.password);
    if (!cPasswordd) {
      let success = false;
      return res.status(400).json({ success, error: "Invalid credentials" });
    }
    const data = {
      user: {
        id: user._id
      }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    let success = true;
    res.json({ success, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

// Route: /api/auth/fetchUser
router.post('/fetchUser', fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;