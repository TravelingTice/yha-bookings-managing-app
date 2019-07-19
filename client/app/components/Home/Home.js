import React, { Component } from 'react';
import 'whatwg-fetch';
import Header from '../Header/Header';
import ManageIndex from '../Main/Index/ManageIndex';
import { getFromStorage, setInStorage } from '../../utils/storage';
import { getDate, daysBetween } from '../../utils/date';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      isLoading: true,
      token: '',
      errorMsg: '',
      page: ''
    };

    this.updatePassword = this.updatePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    // if token is set, verify
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const token = obj.token;
      // verify token
      fetch(`api/account/verify?token=${token}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(json => {
        // if token verified successfully 
        if (json.success) {
          this.setState({
            token,
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      });
    } else {
      this.setState({
        isLoading: false
      });
    }

    /* RENTDUE UPDATE
    */
    // get date of last login
    fetch('/api/lastLogin')
    .then(resp => resp.json())
    .then(json => {
      if (!json.success) {
        console.log(json.message);
      } else {
      const lastLogin = json.login.date;
      // get current date
      const now = getDate();
      // calculate how many days were in between last login and today
      const daysInBetween = daysBetween(lastLogin, now);
      // subtract this number from everybody's rentDue property, except for people in the bush
      if (daysInBetween !== 0) {
        fetch('/api/manage/updateRent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            daysPassed: daysInBetween
          })
        })
        .then(resp => resp.json())
        .then(json => {
          if (!json.succes) {
            console.log(json.message)
          }
        })
      }
      // put in the current date as the most recent login date
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: now
        })
      })
      .then(resp => resp.json())
      .then(json => {
        if (!json.success) {
          console.log(json.message);
        } else {
          console.log(json.message);
        }
      });
      }
    });
  }

  updatePassword(password) {
    this.setState({ password });
  }

  submit(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      fetch('/api/account/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password: this.state.password
        })
      }).then(res => res.json())
      .then(json => {
        if (json.success) {
          // save token in local storage
          setInStorage('the_main_app', {
            token: json.token
          });
          this.setState({
            token: json.token,
            password: ''
          });
        } else {
          this.setState({
            errorMsg: json.message
          })
        }
      })
    }
  }

  signOut(e) {
    e.preventDefault();
    fetch('/api/account/signout', {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(json => {
      if (json.success) {
        setInStorage('the_main_app', {
          token: ''
        });
        this.setState({
          token: '',
          password: '',
          errorMsg: '',
        });
      }
    })
  }

  render() {
    const { isLoading, token, password, errorMsg } = this.state;
    if (isLoading) {
      return (
        <p>Loading...</p>
      )
    }

    if (token) {
      return (
        <>
        <Header/>
        <ManageIndex/>
        <button className="sign-out-btn" onClick={e => this.signOut(e)}>Sign Out</button>
        </>
      )
    }
    return (
      <div>
         <input 
          className="password-input"
          autoFocus="autofocus"
          onFocus="this.select()"
          type="password"
          value={password}
          onChange={e => this.updatePassword(e.target.value)}
          placeholder="password"
          onKeyUp={e => this.submit(e)}/>
        {errorMsg && (
          <div><p className="error">{errorMsg}</p></div>
        )}
      </div>
    );
  }
}

export default Home;
