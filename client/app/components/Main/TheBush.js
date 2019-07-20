import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';

class TheBush extends Component {
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
    })
  }

  onSubmit(e, boolean) {
    e.preventDefault();
    if (this.selectedGuest !== {}) {
      // true = going to the bush
      // false = coming back from bush
      if (boolean) {
        fetch('/api/manage/goesToBush?firstName=' + this.state.selectedGuest.firstName + '&lastName=' + this.state.selectedGuest.lastName)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          selectedGuest: {},
          msg: json.message
        });
      });
      } else {
        fetch('/api/manage/comesFromBush?firstName=' + this.state.selectedGuest.firstName + '&lastName=' + this.state.selectedGuest.lastName)
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          selectedGuest: {},
          msg: json.message
        });
      });
      }
    }
  }

  render() {
    const { selectedGuest, msg } = this.state;
    return (
      <>
      <SearchGuest
      selectedGuest={selectedGuest}
      onSelect={this.onSelect}/>
      {msg && (
        <p>{msg}</p>
      )}
      <button onClick={e => this.onSubmit(e, true)}>Is going to the bush</button>
      <button onClick={e => this.onSubmit(e, false)}>Is coming back from the bush</button>
      </>
    )
  }
}

export default TheBush;