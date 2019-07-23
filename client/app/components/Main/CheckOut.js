import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';
import { getDate } from '../../utils/date';

class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGuest: {},
      msg: ''
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(selectedGuest) {
    this.setState({
      selectedGuest
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const { selectedGuest } = this.state;
    const { firstName, lastName } = selectedGuest;
    const checkOutDate = getDate();

    // change checkout to true of person in fetch
    fetch('/api/manage/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        checkOutDate
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.success) {
        this.setState({
          msg: json.message
        });
      } else {
        this.setState({
          selectedGuest: {},
          msg: json.message
         });
      }
    });
  }
  render() {
    return (
      <>
      <SearchGuest
      onSelect={this.onSelect}
      selectedGuest={this.state.selectedGuest}/>
      <button onClick={e => this.onSubmit(e)}>Check out</button>
      {this.state.msg && (
        <p>{this.state.msg}</p>
      )}
      </>
    )
  }
}
export default CheckOut;