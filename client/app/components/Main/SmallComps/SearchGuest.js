import React, { Component } from 'react';

class SearchGuest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            guests: [],
            showingGuests: [],
            errMsg: ''
        }
        this.updateQuery = this.updateQuery.bind(this);
    }

    updateQuery(query) {
        const { showingGuests, guests } = this.state;
        if (showingGuests && query == '') {
            this.setState({
                query,
                showingGuests: []
            });
        }
        if (query) {
            this.setState({
                query,
                showingGuests: guests
            });
        }
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
        const { query, errMsg, showingGuests } = this.state;
        return (
            <>
                <input 
                type="text" 
                value={query} 
                onChange={e =>this.updateQuery(e.target.value)}/>
                {errMsg && (
                    <p>{errMsg}</p>
                )}
                {showingGuests && (
                    <ul>
                        {showingGuests.map(guest => (
                            <li>{guest.firstName}</li>
                        ))}
                    </ul>
                )}
                
            </>
        )
    }
}

export default SearchGuest;