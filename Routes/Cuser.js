const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "mynameisurvishprajapatu25463tefggdy";

// POST route for creating a new user
router.post('/cuser', [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const salt = await bcrypt.genSalt(10); // Increased number of rounds for security
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error: "Failed to create user." });
  }
});

// POST route for user login
router.post('/loginuser', [
  body('email').isEmail(),
  body('password', 'Invalid password').isLength({ min: 5 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };
    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    return res.json({ success: true, authToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to log in." });
  }
});

module.exports = router;
