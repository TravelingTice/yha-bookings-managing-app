// All actions considered managing guests are in here

const Guest = require('../../models/Guest');
const SingleRoomGuest = require('../../models/SingleRoomGuest');

module.exports = (app) => {
  app.post('/api/manage/checkinguest', (req, res) => {
    const {
      body
    } = req;
    const {
      firstName,
      lastName,
      email,
      phone,
      rentDue,
      roomType,
      checkInDate,
      comments
    } = body;

    // check if required fields are empty
    if (!firstName) return res.send({
      success: false,
      message: 'First name cannot be blank'
    });
    if (!lastName) return res.send({
      success: false,
      message: 'Last name cannot be blank'
    });
    if (!rentDue) return res.send({
      success: false,
      message: 'Rent due cannot be blank'
    });
    if (!roomType) return res.send({
      success: false,
      message: 'Room type cannot be blank'
    });
    // if (!email) return res.send({
    //     success: false,
    //     message: 'Email cannot be blank'
    // });
    // if (!phone) return res.send({
    //     success: false,
    //     message: 'Phone number cannot be blank'
    // });

    // check if person already exists
    Guest.find({
      firstName,
      lastName
    }, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      if (guests && guests.length > 0) return res.send({
        success: false,
        message: 'Guest already exists'
      });

      const today = new Date();

      // Save guest in database
      const newGuest = new Guest();
      newGuest.firstName = firstName; // required
      newGuest.lastName = lastName; // required
      newGuest.email = email ? email : ''; // optional
      newGuest.phone = phone ? phone : ''; // optional
      newGuest.roomType = roomType; // required
      newGuest.rentDue = rentDue; // required
      newGuest.checkInDate = checkInDate ? checkInDate : today; // optional (default is today)
      newGuest.comments = comments ? comments : '';
      newGuest.save((err, guest) => {
        if (err) return res.send({
          success: false,
          message: 'Server error' + err
        });
        return res.send({
          success: true,
          message: firstName + ' is checked in!'
        });
      });
    });
  });

  app.get('/api/manage/getguestlist', (req, res) => {
    const { query } = req;
    const { includeAll } = query;
    if (includeAll === 'true') {
      Guest.find({}, (err, guests) => {
        if (err) return res.send({
          success: false,
          message: 'Server error' + err
        })
        return res.send({
          success: true,
          message: 'Guests found',
          guests
        })
      });
    } else {
      Guest.find({
        checkedOut: false
      }, (err, guests) => {
        if (err) return res.send({
          success: false,
          message: 'Server error' + err
        })
        return res.send({
          success: true,
          message: 'Guests found',
          guests
        })
      });
    }
  });

  app.post('/api/manage/updateRent', (req, res) => {
    const { body } = req;
    const { daysPassed } = body;
    Guest.find({
      isInBush: false,
      checkedOut: false
    }, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error' + err
      });
      // iterate through array, subtract the daysPassed number, and save the new guest
      guests.forEach(guest => {
        guest.rentDue = guest.rentDue - daysPassed;
        // update in Database
        Guest.updateOne({
          firstName: guest.firstName
        }, { $set: { rentDue: guest.rentDue } }, (err, guest) => {
          if (err) return res.send({
            success: false,
            message: 'Something went wrong' + err
          });
        });
      });
      return res.send({
        success: true,
        message: 'rent updated'
      });
    });
  });

  app.post('/api/manage/updateRentOfPerson', (req, res) => {
    const { body } = req;
    const { firstName, lastName, days } = body;
    Guest.find({
      firstName,
      lastName
    }, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error' + err
      });
      if (guests.length > 1) res.send({
        success: false,
        message: 'Invalid'
      });
      // iterate through array, subtract the daysPassed number, and save the new guest
      guests.forEach(guest => {
        guest.rentDue = guest.rentDue + days;
        // update in Database
        Guest.updateOne({
          firstName: guest.firstName,
          lastName: guest.lastName
        }, { $set: { rentDue: guest.rentDue } }, (err, n) => {
          if (err) return res.send({
            success: false,
            message: 'Something went wrong' + err
          });
          return res.send({
            success: true,
            message: 'Woohoo! ' + guest.firstName + ' has paid for ' + days + ' days!'
          });
        });
      });
    });
  });

  app.post('/api/manage/updateComment', (req, res) => {
    const { body } = req;
    const { firstName, lastName, comments } = body;

    Guest.updateOne({
      firstName,
      lastName
    }, {
      $set: { comments }
    }, (err, doc) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      return res.send({
        success: true,
        message: 'Comment of ' + firstName + ' updated!'
      });
    });
  });

  app.post('/api/manage/updateRoomType', (req, res) => {
    const { body } = req;
    const { firstName, lastName, roomType } = body;

    Guest.updateOne({
      firstName,
      lastName
    }, {
      $set: { roomType }
    }, (err, doc) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      return res.send({
        success: true,
        message: 'Room type of ' + firstName + ' updated!'
      });
    });
  });

  app.get('/api/manage/goesToBush', (req, res) => {
    const { query } = req;
    const { firstName, lastName } = query;
    Guest.updateOne({
      firstName,
      lastName
    }, { $set: { isInBush: true }}, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error' + err
      })
      return res.send({
        success: true,
        message: firstName + ' is in the bush!'
      })
    });
  });

  app.get('/api/manage/comesFromBush', (req, res) => {
    const { query } = req;
    const { firstName, lastName } = query;
    Guest.updateOne({
      firstName,
      lastName
    }, { $set: { isInBush: false }}, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error' + err
      })
      return res.send({
        success: true,
        message: firstName + ' is back from the bush!'
      })
    });
  });

  app.post('/api/manage/checkout', (req, res) => {
    const { body } = req;
    const { firstName, lastName, checkOutDate } = body;

    Guest.updateOne({
      firstName,
      lastName
    }, { $set: { checkedOut: true, checkOutDate }}, (err, guest) => {
      if (err) return res.send({
        success: false,
        message: 'Server error' + err
      });
      return res.send({
        success: true,
        message: firstName + ' is checked out!'
      });
    });
  });

  app.get('/api/manage/singleRoomList', (req, res) => {
    SingleRoomGuest.find({
      isDeleted: false
    }, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      return res.send({
        success: true,
        message: 'List received',
        guests
      });
    });
  });

  app.post('/api/manage/addToSingleRoomList', (req, res) => {
    const { body } = req;
    const { firstName, lastName } = body;

    // find if guest is already in list
    SingleRoomGuest.find({
      firstName,
      lastName,
      isDeleted: false
    }, (err, guests) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      if (guests.length !== 0) return res.send({
        success: false,
        message: firstName + ' is already on the single room list'
      });

      // save name on list
      const newGuest = new SingleRoomGuest();
      newGuest.firstName = firstName;
      newGuest.lastName = lastName;

      newGuest.save((err, guest) => {
        if (err) return res.send({
          success: false,
          message: 'Server error: ' + err
        });
        return res.send({
          success: true,
          message: firstName + ' is put on the list!',
          guest: newGuest
        });
      });
    });
  });

  app.get('/api/manage/removeFromSingleRoomList', (req, res) =>{
    const { query } = req;
    const { firstName, lastName } = query;
    SingleRoomGuest.updateOne({
      firstName,
      lastName,
      isDeleted: false
    }, {
      $set: { isDeleted: true }
    }, (err, doc) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      return res.send({
        success: true,
        message: firstName + ' is removed from the list',
        firstName
      });
    });
  });
};
