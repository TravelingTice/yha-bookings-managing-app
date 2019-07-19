const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  rentDue: {
    type: Number,
    default: 0
  },
  roomType: {
    type: String,
    default: ''
  },
  checkInDate: {
    type: String,
    default: ''
  },
  comments: {
    type: String,
    default: ''
  },
  isInBush: {
    type: Boolean,
    default: false
  },
  checkedOut: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Guest', GuestSchema);
