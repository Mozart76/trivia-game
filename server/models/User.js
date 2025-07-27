const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  freeGames: {
    type: Number,
    default: 1
  },
  paidCredits: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check if entered password is correct
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to update credits
userSchema.methods.updateCredits = function(freeGames, paidCredits) {
  this.freeGames = freeGames;
  this.paidCredits = paidCredits;
  return this.save();
};

// Instance method to use a credit
userSchema.methods.useCredit = function() {
  if (this.freeGames > 0) {
    this.freeGames -= 1;
  } else if (this.paidCredits > 0) {
    this.paidCredits -= 1;
  } else {
    throw new Error('No credits available');
  }
  return this.save();
};

// Instance method to add paid credits
userSchema.methods.addPaidCredits = function(amount) {
  this.paidCredits += amount;
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User; 