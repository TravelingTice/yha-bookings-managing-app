import React from 'react';

import Select from '../SmallComps/Select';

// text
// class
// guests

class PostItNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editingName: '',
      showingCommentName: '',
      daysPaidFor: 1,
      isEditing: false
    }
    this.onToggleComment = this.onToggleComment.bind(this);
    this.onEditDueTime = this.onEditDueTime.bind(this);
    this.onSelectDays = this.onSelectDays.bind(this);
  }
  onToggleComment(firstName, e) {
    e.preventDefault();
    if (this.state.showingCommentName === firstName) {
      this.setState({
        showingCommentName: ''
      });
    } else {
      this.setState({
        showingCommentName: firstName
      });
    }
  }

  onEditDueTime(firstName, e) {
    e.preventDefault();
    const { isEditing, editingName } = this.state;
    if (!isEditing) {
      if (editingName === firstName) {
        this.setState({
          editingName: ''
        });
      } else {
        this.setState({
          editingName: firstName,
          isEditing: true
        });
      }
    } else {
      if (editingName !== firstName) {
        this.setState({
          editingName: firstName
        })
      }
    }
  }

  onSelectDays(daysPaidFor) {
    this.setState({
      daysPaidFor
    });
  }

  onUpdateDays(firstName, lastName, e) {
    e.preventDefault();
    const { daysPaidFor } = this.state;
    console.log(firstName, lastName, daysPaidFor);
    fetch('/api/manage/updateRentOfPerson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        days: parseInt(daysPaidFor)
      })
    })
    .then(resp => resp.json())
    .then(json => {
      if (!json.success) {
        this.setState({
          msg: json.message
        })
      } else {
        // reload page
        document.location.reload();
      }
    });
  }

  render() {
    const { guests, className, text } = this.props;
    const { showingCommentName, editingName } = this.state;
    return (
      <div className={`col-sm ${className}`}>
      <p>{text}</p>
              <table>
                <tbody>
                {guests.map(guest => (
                  <>
                  {!guest.isInBush && (
                      <tr>
                      <td
                      className={guest.commentIsImportant ? 'comment-person important-comment' : 'comment-person'}
                      onClick={e => this.onToggleComment(guest.firstName, e)}>
                      {guest.firstName + ' ' + guest.lastName}
                       {showingCommentName === guest.firstName && (
                        <p className="sub-comment">{guest.comments}</p>
                       )}
                     </td>
                     <td
                     className="due-time"
                     onClick={e => this.onEditDueTime(guest.firstName, e)}>{guest.rentDue === 0 ? 'TODAY!' : guest.rentDue === 1 ? 'Tomorrow!' : 'In ' + guest.rentDue + ' days'}
                     {editingName === guest.firstName && (
                       <div className="edit-days">
                         <span>+</span>
                         <Select 
                          n={30}
                          value={this.state.daysPaidFor}
                          onChange={this.onSelectDays}/>
                          <br/>
                          <button 
                          className="btn btn-danger btn-add"
                          onClick={e => this.onUpdateDays(guest.firstName, guest.lastName, e)}>Add</button>
                       </div>
                     )}</td>
                   </tr>
                  )}
                  </>
                ))}
                </tbody>
              </table>
    </div>
    )
  }
}

export default PostItNote;