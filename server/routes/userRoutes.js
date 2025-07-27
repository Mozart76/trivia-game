const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ 
        message: userExists.email === email ? 'Email already registered' : 'Username already taken' 
      });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      freeGames: 1,
      paidCredits: 0
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        freeGames: user.freeGames,
        paidCredits: user.paidCredits,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check for user
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.correctPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Update last login
    user.lastLogin = Date.now();
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      freeGames: user.freeGames,
      paidCredits: user.paidCredits,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        freeGames: user.freeGames,
        paidCredits: user.paidCredits,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user credits
// @route   PUT /api/users/credits
// @access  Private
const updateCredits = async (req, res) => {
  try {
    const { freeGames, paidCredits } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.freeGames = freeGames;
    user.paidCredits = paidCredits;
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      freeGames: user.freeGames,
      paidCredits: user.paidCredits,
    });
  } catch (error) {
    console.error('Update credits error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Use a credit
// @route   POST /api/users/use-credit
// @access  Private
const useCredit = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.useCredit();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      freeGames: user.freeGames,
      paidCredits: user.paidCredits,
    });
  } catch (error) {
    console.error('Use credit error:', error);
    if (error.message === 'No credits available') {
      return res.status(400).json({ message: 'No credits available' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add paid credits
// @route   POST /api/users/add-credits
// @access  Private
const addPaidCredits = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.addPaidCredits(amount);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      freeGames: user.freeGames,
      paidCredits: user.paidCredits,
    });
  } catch (error) {
    console.error('Add credits error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/credits', protect, updateCredits);
router.post('/use-credit', protect, useCredit);
router.post('/add-credits', protect, addPaidCredits);

module.exports = router; 