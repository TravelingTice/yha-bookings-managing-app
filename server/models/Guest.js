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
    type: Object,
    default: { day: 0, month: 0, year: 0 }
  },
  comments: {
    type: String,
    default: ''
  },
  commentIsImportant: {
    type: Boolean,
    default: false
  },
  isInBush: {
    type: Boolean,
    default: false
  },
  checkOutDate: {
    type: Object,
    default: { day: 0, month: 0, year: 0 }
  },
  checkedOut: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Guest', GuestSchema);
