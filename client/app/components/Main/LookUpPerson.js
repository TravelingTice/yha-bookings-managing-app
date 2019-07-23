import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';

class LookUpPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGuest: {},
      msg: ''
    }

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(selectedGuest) {
    this.setState({
      selectedGuest
    });
  }

  render() {
    const { selectedGuest } = this.state;
    const { firstName, lastName, email, phone, rentDue, roomType, checkInDate, comments, isInBush, checkOutDate } = selectedGuest;

    console.log(selectedGuest);
    return (
      <>
      <SearchGuest
      onSelect={this.onSelect}
      selectedGuest={selectedGuest}
      includeAll={true}/>
      {selectedGuest !== {} && (
        <>
        <table>
          <tbody>
            <tr>
              <td>First Name: </td>
              <td>{firstName}</td>
            </tr>
            <tr>
              <td>Last Name: </td>
              <td>{lastName}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>Phone nr: </td>
              <td>{phone}</td>
            </tr>
            <tr>
              <td>Rent due: </td>
              <td>{`in ${rentDue} days`}</td>
            </tr>
            <tr>
              <td>Room type: </td>
              <td>{roomType}</td>
            </tr>
            <tr>
              <td>Checked In On: </td>
              <td>{checkInDate && (
                `${checkInDate.day}/${checkInDate.month}/${checkInDate.year}`
              )}</td>
            </tr>
            <tr>
              <td>Comments: </td>
              <td>{comments}</td>
            </tr>
            <tr>
              <td>Is in the bush: </td>
              <td>{isInBush ? 'yes' : 'no'}</td>
            </tr>
            <tr>
              <td>Checked Out On: </td>
              <td>{checkOutDate && (
                `${checkOutDate.day}/${checkOutDate.month}/${checkOutDate.year}`
              )}</td>
            </tr>
          </tbody>
        </table>
        </>
      )}
      </>
    )
  }
}

export default LookUpPerson;