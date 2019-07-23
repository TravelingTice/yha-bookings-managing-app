import React, { Component } from 'react';
import sortBy from 'sort-by';
import { getDate, daysBetween } from '../../../utils/date';

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

        return (
          <>
            <p>These people have their rent due: </p>
            <table>
              <tbody>
              {guests.map(guest => (
                <>
                {!guest.isInBush && (
                  <tr>
                  <td>{guest.firstName + ' ' + guest.lastName}</td>
                  <td>{guest.rentDue === 0 ? 'TODAY!' : guest.rentDue === 1 ? 'Tomorrow!' : 'In ' + guest.rentDue + ' days'}</td>
                </tr>
                )}
                </>
              ))}
              </tbody>
            </table>
            <br/>
            <p>These are in the bush:</p>
            {guests.map((guest, i) => (
              <>
              {guest.isInBush && (
                <>
                <>
                {i !== guests.length - 1 && (
                  <span>{guest.firstName + ' ' + guest.lastName + ', '}</span>
                )}
                </>
                {i === guests.length -1 && (
                  <span>{guest.firstName + ' ' + guest.lastName}.</span>
                )}
                </>
              )}
              </>
            ))}
            </>
        )
    }
}

export default GuestsInfo;