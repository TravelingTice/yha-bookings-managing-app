const mongoose = require('mongoose');

const SingleRoomGuestSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('SingleRoomGuest', SingleRoomGuestSchema);
