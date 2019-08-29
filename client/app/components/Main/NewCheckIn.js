import React, { Component } from 'react';
import { getDate } from '../../utils/date';

import Select from './SmallComps/Select';

class NewCheckIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errMsg: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            roomType: '',
            rentDue: '1',
            comments: '',
            commentIsImportant: false
        }

        this.updateFirstName = this.updateFirstName.bind(this);
        this.updateLastName = this.updateLastName.bind(this);
        this.updateEmail = this.updateEmail.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.updateRoomType = this.updateRoomType.bind(this);
        this.updateRentDue = this.updateRentDue.bind(this);
        this.updateComments = this.updateComments.bind(this);
        this.toggleCommentIsImportant = this.toggleCommentIsImportant.bind(this);
    }

    updateFirstName(firstName) {
        this.setState({
            firstName
        });
    }
    updateLastName(lastName) {
        this.setState({
            lastName
        });
    }
    updateEmail(email) {
        this.setState({
            email
        });
    }
    updatePhone(phone) {
        this.setState({
            phone
        });
    }
    updateRoomType(roomType) {
        this.setState({
            roomType
        });
    }
    updateRentDue(rentDue) {
        this.setState({
            rentDue
        });
    }
    updateComments(comments) {
        this.setState({
            comments
        });
    }
    toggleCommentIsImportant() {
      this.setState(prevState => ({
        commentIsImportant: !prevState.commentIsImportant
      }));
    }
    submit(e) {
        e.preventDefault();
        const {
            firstName,
            lastName,
            email,
            phone,
            roomType,
            rentDue,
            comments,
            commentIsImportant
        } = this.state;

        // get todays date object
        const checkInDate = getDate();
        fetch('api/manage/checkinguest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                phone,
                roomType,
                checkInDate,
                rentDue: parseInt(rentDue),
                comments,
                commentIsImportant
            })
        })
        .then(res => res.json())
        .then(json => {
            if (!json.success) {
                this.setState({
                    errMsg: json.message
                });
            } else {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    roomType: '',
                    rentDue: '',
                    comments: '',
                    commentIsImportant: false,
                    errMsg: json.message
                });
            }
        });
    }
    render() {
        const {
            firstName,
            lastName,
            email,
            phone,
            roomType,
            rentDue,
            comments,
            commentIsImportant,
            errMsg
        } = this.state;
        return (
            <>
            <form>
                <input 
                type="text" 
                value={firstName} 
                placeholder="First name" 
                onChange={e => this.updateFirstName(e.target.value)}
                required/>
                <br/>
                <input 
                type="text" 
                value={lastName} 
                placeholder="Last name"
                onChange={e => this.updateLastName(e.target.value)}
                required/>
                <br/>
                <input 
                type="text" 
                value={email} 
                placeholder="Email"
                onChange={e => this.updateEmail(e.target.value)}/>
                <br/>
                <input 
                type="text"
                value={phone} 
                placeholder="Phone nr"
                onChange={e => this.updatePhone(e.target.value)}/>
                <br/>
                <input 
                type="text" 
                value={roomType} 
                placeholder="Room type"
                onChange={e => this.updateRoomType(e.target.value)}/>
                <br/>
                <span>Rent is due in </span>
                <Select
                n={31} 
                onChange={e => this.updateRentDue(e)}
                value={rentDue}/>
                <span> days</span>
                <br/>
                <textarea 
                value={comments} placeholder="Comments"
                onChange={e => this.updateComments(e.target.value)}></textarea>
                <br/>
                <div className="checkbox checkbox-warning">
                <label>
                <input
                type="checkbox"
                onChange={this.toggleCommentIsImportant}
                defaultChecked={commentIsImportant}/>
                Comment is important
                </label>
                </div> 
                <br/>
                <button onClick={e => this.submit(e)}>Submit</button>
            </form>
            {errMsg && (
                <p>{errMsg}</p>
            )}
            </>
        )
    }
}

export default NewCheckIn;