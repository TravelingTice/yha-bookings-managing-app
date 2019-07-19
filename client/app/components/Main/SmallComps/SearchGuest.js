import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchGuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            guests: [],
            errMsg: ''
        }
        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(query) {
        this.setState({
            query
        });
    }    

    componentDidMount() {
        fetch('api/manage/getguestlist')
        .then(res => res.json())
        .then(json => {
            if (!json.success) {
                this.setState({
                    errMsg: json.message
                });
            } else {
                this.setState({
                    guests: json.guests
                });
            }
        });
    }

    render() {
        const { query, errMsg, guests } = this.state;
        let showingGuests;
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingGuests = guests.filter(guest => match.test(guest.firstName))
        } else {
            showingGuests = [];
        }

        showingGuests.sort(sortBy('firstName'));

        return (
            <>
                <input 
                type="text" 
                value={query} 
                onChange={e =>this.updateQuery(e.target.value)}
                placeholder="Search guests"/>
                {errMsg && (
                    <p>{errMsg}</p>
                )}
                {showingGuests && (
                    <ul className="search-guest-list">
                        {showingGuests.map(guest => (
                            <li
                            className={guest.firstName === this.props.selectedGuest.firstName ? 'active' : ''}
                            onClick={() => this.props.onSelect(guest)}>{`${guest.firstName} ${guest.lastName}`}</li>
                        ))}
                    </ul>
                )}
            </>
        )
    }
}

export default SearchGuest;