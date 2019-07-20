import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';
import Select from './SmallComps/Select';

class PersonIsPaying extends Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedGuest: {},
          daysPaidFor: 1,
          msg: ''
        }
        this.onSelect = this.onSelect.bind(this);
        this.onSelectDays = this.onSelectDays.bind(this);
    }

    onSelect(selectedGuest) {
      this.setState({
        selectedGuest
      });
    }

    onSelectDays(daysPaidFor) {
      this.setState({
        daysPaidFor
      });
    }

    onSubmit(e) {
      e.preventDefault();
      const { selectedGuest, daysPaidFor } = this.state;
      // add the amnt of days to the person's day balance
      fetch('/api/manage/updateRentOfPerson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: selectedGuest.firstName,
          lastName: selectedGuest.lastName,
          days: parseInt(daysPaidFor)
        })
      })
      .then(resp => resp.json())
      .then(json => {
        if (!json.success) {
          console.log(json.message);
        } else {
          this.setState({
            selectedGuest: {},
            daysPaidFor: 1,
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
            <div style={{margin: '10px 0'}}>
              <span>is paying for </span>
              <Select 
              n={30}
              value={this.state.daysPaidFor}
              onChange={this.onSelectDays}/>
              <span> days</span>
            </div>
            <div>
              {this.state.msg && (
                <p>{this.state.msg}</p>
              )}
              <button onClick={e => this.onSubmit(e)}>Submit</button>
            </div>
            </>
        )
    }
}

export default PersonIsPaying;