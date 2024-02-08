// routes/auth.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');
console.log("Reg")
router.post('/register', async (req, res) => {
    console.log("register")
  const { username, password } = req.body;
  try {
    // Check if user already exists
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({ username, password });

    // Save user to database
    await user.save();

    res.json({ msg: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
