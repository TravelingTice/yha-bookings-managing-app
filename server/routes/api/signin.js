const User = require('../../models/User');
const UserSession = require('../../models/UserSession');
const { userEmail } = require('../../../config/email');

module.exports = (app) => {
  app.post('/api/account/signup', (req, res) => {
    const { body } = req;
    const { email, password } = body
    
    if (!email) return res.send({
      success: false,
      message: 'Email cannot be blank'
    });
    if (!password) return res.send({
      success: false,
      message: 'Password cannot be blank'
    });

    // check if email already exists
    User.find({
      email: email.toLowerCase()
    }, (err, users) => {
      if (err) return res.send({
        success: false,
        message: 'There was an error: ' + err
      });
      if (users.length > 0) return res.send({
        success: false,
        message: 'User already exists'
      });

      // save user
      const newUser = new User();
      newUser.email = email.toLowerCase();
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) return res.send({
          success: false,
          message: 'Error: ' + err
        });
        if (user) return res.send({
          success: true,
          message: 'User is signed up, email: ' + email
        });
      });
    });
  });

  app.post('/api/account/signin', (req, res) => {
    const { body } = req;
    const { password } = body;
    // find user
    User.find({
      email: userEmail,
    }, (err, users) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      if (users.length != 1) return res.send({
        success: false,
        message: 'Invalid'
      });

      // check password
      const user = users[0];
      if (!user.validPassword(password)) return res.send({
        success: false,
        message: 'Invalid password'
      });
      // create UserSession
      const userSession = new UserSession();
      userSession.userId = user._id;
      // save session
      userSession.save((err, session) => {
        if (err) return res.send({
          success: false,
          message: 'Server error: ' + err
        });
        return res.send({
          success: true,
          message: 'User is signed in',
          token: session._id
        });
      });
    });
  });

  app.get('/api/account/verify', (req, res) => {
    const { query } = req;
    const { token } = query;

    // Verify token is one of a kind and not deleted

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      if (sessions.length != 1) return res.send({
        success: false,
        message: 'Invalid'
      });
      return res.send({
        success: true,
        message: 'Verified'
      });
    });
  });

  app.get('/api/account/signout', (req, res) => {
    const { query } = req;
    const { token } = query;

    UserSession.updateOne({
      _id: token,
      isDeleted: false
    }, {
      $set: { isDeleted: true }
    }, { new: true }, (err, sessions) => {
      if (err) return res.send({
        success: false,
        message: 'Something went wrong: ' + err
      });
      return res.send({
        success: true,
        message: 'Logged out'
      });
    });
  });
};
