const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
  date: {
    type: Object,
    default: {}
  },
  timestamp: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Login', LoginSchema);
