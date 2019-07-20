// All actions considered managing guests are in here

const Guest = require('../../models/Guest');

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
          message: 'Guest is checked in!'
        });
      });
    });
  });

  app.get('/api/manage/getguestlist', (req, res) => {
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

  app.get('/api/manage/checkout', (req, res) => {
    const { query } = req;
    const { firstName, lastName } = query;

    Guest.updateOne({
      firstName,
      lastName
    }, { $set: { checkedOut: true }}, (err, guest) => {
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
};
