import { getDate, daysBetween } from './date';
import { setInStorage } from '../utils/storage';

export function updateRentDue() {
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
      // set days since last login as global variable in local storage
      setInStorage('the_second_app', { daysSinceLastLogin: daysInBetween});
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