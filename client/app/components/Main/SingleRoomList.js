import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';

class SingleRoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      msg: '',
      selectedGuest: {}
    }

    this.onSelect = this.onSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeGuest = this.removeGuest.bind(this);
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


    fetch('/api/manage/addToSingleRoomList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.success) {
        this.setState({
          msg: json.message
        });
      } else {
        const { list } = this.state;
        list.push(json.guest);
        this.setState({
        msg: json.message,
        list
      });
      }
    })
  }

  removeGuest(firstName, lastName, e) {
    e.preventDefault();
    fetch('/api/manage/removeFromSingleRoomList?firstName=' + firstName + '&lastName=' + lastName)
    .then(resp => resp.json())
    .then(json => {
      if (!json.success) {
        this.setState({
          msg: json.message
        });
      } else {
        const { list } = this.state;
        const newList = list.filter(person => person.firstName !== json.firstName);
        this.setState({
          msg: json.message,
          list: newList
        });
      }
    });
  }
  
  componentDidMount() {
    fetch('/api/manage/singleRoomList')
    .then(resp => resp.json())
    .then(json => {
      if (!json.success) {
        this.setState({
          msg: json.message
        });
      }
      this.setState({
        list: json.guests
      });
    })
  }

  render() {
    const { selectedGuest, msg, list } = this.state;
    return (
      <>
      <ol>
        {list && (
          <>
          {list.map(guest => (
            <li>{`${guest.firstName} ${guest.lastName}`}
              <span style={{ float: 'right' }}
              onClick={e => this.removeGuest(guest.firstName, guest.lastName, e)}>
                remove
              </span>
            </li>
          ))}
          </>
        )}
      </ol>
      <p>Add person to list: </p>
      <SearchGuest
      onSelect={this.onSelect}
      selectedGuest={selectedGuest}/>
      <button onClick={e => this.onSubmit(e)}>Add</button>
      {msg && (
        <p>{msg}</p>
      )}
      </>
    )
  }
}

export default SingleRoomList;