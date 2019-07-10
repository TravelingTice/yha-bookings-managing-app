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
    type: String,
    default: ''
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
  checkedOut: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Guest', GuestSchema);
