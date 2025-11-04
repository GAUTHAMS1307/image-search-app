const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  oauthId: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'github']
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({ oauthId: 1, provider: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
