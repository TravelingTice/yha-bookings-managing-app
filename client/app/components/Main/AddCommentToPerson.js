import React, { Component } from 'react';
import SearchGuest from './SmallComps/SearchGuest';

class AddCommentToPerson extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGuest: {},
      msg: '',
      comments: '',
      commentIsImportant: false,
      roomType: ''
    }

    this.onSelect = this.onSelect.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.toggleCommentIsImportant = this.toggleCommentIsImportant.bind(this);
    this.updateRoomType = this.updateRoomType.bind(this);
  }
  
  updateComment(comments) {
    this.setState({
      comments
    });
  }

  toggleCommentIsImportant() {
    this.setState(prevState => ({
      commentIsImportant: !prevState.commentIsImportant
    }));
  }

  updateRoomType(roomType) {
    this.setState({
      roomType
    });
  }

  onSelect(selectedGuest) {
    this.setState({
      selectedGuest,
      comments: selectedGuest.comments,
      roomType: selectedGuest.roomType,
      commentIsImportant: selectedGuest.commentIsImportant ? selectedGuest.commentIsImportant : false
    });
  }

  onSubmitComment(e) {
    e.preventDefault();

    const { selectedGuest, comments, commentIsImportant } = this.state;

    fetch('api/manage/updateComment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: selectedGuest.firstName,
        lastName: selectedGuest.lastName,
        comments,
        commentIsImportant
      })
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        msg: json.message
      });
    });
  }

  onSubmitRoomType(e) {
    e.preventDefault();

    const { selectedGuest, roomType } = this.state;

    fetch('api/manage/updateRoomType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: selectedGuest.firstName,
        lastName: selectedGuest.lastName,
        roomType
      })
    })
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        msg: json.message
      });
    });
  }

  render() {
    const { selectedGuest, comments, commentIsImportant, msg, roomType } = this.state;
    return (
      <>
      <SearchGuest
      onSelect={this.onSelect}
      selectedGuest={selectedGuest}/>
      <textarea
      value={comments}
      onChange={e => this.updateComment(e.target.value)}
      placeholder="Type comment here"></textarea>
      <div className="checkbox">
      <input
      checked={commentIsImportant}
      onChange={this.toggleCommentIsImportant}
      type="checkbox"
      id="toggle2"/>
      <label htmlFor="toggle2">Comment is important</label>
      </div>
      <button
      onClick={e => this.onSubmitComment(e)}>Update comment</button>
      <input type="text" value={roomType} placeholder="Change room type" onChange={e => this.updateRoomType(e.target.value)}/>
      <button onClick={e => this.onSubmitRoomType(e)}>Update room type</button>
      {msg && (
        <p>{msg}</p>
      )}
      </>
    )
  }
}

export default AddCommentToPerson;