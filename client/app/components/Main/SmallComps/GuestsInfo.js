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
            <div>
              {guests.map((guest) => (
                <div>
                  <p>{guest.firstName}</p>
                </div>
              ))}
            </div>
        )
    }
}

export default GuestsInfo;