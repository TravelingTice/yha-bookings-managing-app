import React, { Component } from 'react';

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
          // TODO: sort the list on date of rent due
            this.setState({
                guests: json.guests
            });
        });
    }
    render() {
      const { guests } = this.state;
        return (
            <table>
              {guests.map((guest) => (
                <tr>
                  <td>{guest.firstName + ' ' + guest.lastName}</td>
                  <td>{guest.rentDue === 0 ? 'TODAY!' : guest.rentDue === 1 ? 'Tomorrow!' : 'In ' + guest.rentDue + ' days'}</td>
                </tr>
              ))}
            </table>
        )
    }
}

export default GuestsInfo;