import React, { Component } from 'react';
import sortBy from 'sort-by';
import { getDate, daysBetween } from '../../../utils/date';
import PostItNote from './PostItNote';

class GuestsInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: []
        }
    }
    componentDidMount() {
      fetch('/api/manage/getguestlist')
      .then(resp => resp.json())
      .then(json => {
        if (!json.success) {
          this.setState({
            msg: json.message
          })
        } else {
          this.setState({
            guests: json.guests
          });
        }
      });
      /* RENTDUE UPDATE
      */
      // get date of last login
      fetch('/api/lastLogin')
     .then(resp => resp.json())
     .then(json => {
        if (!json.success) {
          this.setState({
            msg: json.message
          });
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
              if (!json.success) {
                this.setState({
                  msg: json.message
                })
              } else {
                const { guests } = this.state;
                const newList = guests.map(guest => {
                  const newGuest = guest;
                  newGuest.rentDue = newGuest.rentDue - daysInBetween;
                  return newGuest;
                });
                this.setState({
                  guests: newList
                });
              }
            });
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
            this.setState({
              msg: json.message
            });
          }
        });
      }
    });
    }
    render() {
      const { guests } = this.state;
      // sort guest array on rent due for display
      guests.sort(sortBy('rentDue'));
      // split guests up in not due yet, due, and overdue.
      const overDueGuests = guests.filter(guest => guest.rentDue < 0);
      const dueTodayGuests = guests.filter(guest => guest.rentDue === 0);
      const otherGuests = guests.filter(guest => guest.rentDue > 0);
      const bushGuests = guests.filter(guest => guest.isInBush === true);
        return (
          <div className="container">

          <div className="row align-items-center">
          <PostItNote
          class="due-today"
          guests={dueTodayGuests}
          text="These people are due today: "/>
          <PostItNote
          class="overdue"
          guests={overDueGuests}
          text="These people are overdue: "/>
          <div className="col-sm in-the-bush">
          <p>These are in the bush:</p>
            <ul>
            {bushGuests.map((guest) => (
              <li>{guest.firstName} {guest.lastName}</li>
            ))}
            </ul>
          </div>
          <PostItNote
          class="not-due-yet"
          guests={otherGuests}
          text="These aren't due yet: "/>
            </div>
          </div>
        )
    }
}

export default GuestsInfo;