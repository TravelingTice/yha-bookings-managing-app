import React, { Component } from 'react';
import sortBy from 'sort-by';
import { getFromStorage } from '../../../utils/storage';
import { updateRentDue } from '../../../utils/updateRentDue';

class GuestsInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: []
        }
    }
    componentDidMount() {
        // fetch the guests from the db
        fetch('api/manage/getguestlist')
        .then(res => res.json())
        .then(json => {
            this.setState({
                guests: json.guests
            });
        });
    }
    render() {
      const { guests } = this.state;
      const daysSinceLastLogin = getFromStorage('the_second_app').daysSinceLastLogin;
      if (daysSinceLastLogin !== 0) {
        updateRentDue();
      }
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
            {guests.map(guest => (
              <>
              {guest.isInBush && (
                <span>{guest.firstName + ' ' + guest.lastName + ', '}</span>
              )}
              </>
            ))}
            </>
        )
    }
}

export default GuestsInfo;