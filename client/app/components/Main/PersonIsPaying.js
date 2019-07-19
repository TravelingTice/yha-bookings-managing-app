import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';
import Select from './SmallComps/Select';

class PersonIsPaying extends Component {
    constructor(props) {
        super(props);

        this.state = {
          selectedGuest: {},
          daysPaidFor: 1
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
      // add the amnt of days to the person's day balance
    }

    render() {
        return (
            <>
            <SearchGuest 
            onSelect={this.onSelect}
            selectedGuest={this.state.selectedGuest}/>
            <div>
              <span>Is paying for </span>
              <Select 
              n={30}
              value={this.state.daysPaidFor}
              onChange={this.onSelectDays}/>
              <span> days</span>
            </div>
            <div>
              <button onClick={e => this.onSubmit(e)}>Submit</button>
            </div>
            </>
        )
    }
}

export default PersonIsPaying;