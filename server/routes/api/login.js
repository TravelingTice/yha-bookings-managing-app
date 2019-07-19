const Login = require('../../models/Login');

module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    const { body } = req;
    const { date } = body;

      // save user
      const newLogin = new Login();
      newLogin.date = date
      newLogin.save((err, login) => {
        if (err) return res.send({
          success: false,
          message: 'Error: ' + err
        });
        if (login) return res.send({
          success: true,
          message: 'Successful login'
        });
      });
    });

  app.get('/api/lastlogin', (req, res) => {

    Login.find({}, (err, logins) => {
      if (err) return res.send({
        success: false,
        message: 'Server error: ' + err
      });
      return res.send({
        success: true,
        message: 'logins',
        login: logins[logins.length - 1]
      });
    });
  });
};
