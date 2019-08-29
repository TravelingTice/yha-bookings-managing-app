import React from 'react';

// text
// class
// guests

class PostItNote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: ''
    }
  }
  onToggleComment(firstName, e) {
    e.preventDefault();
    if (this.state.firstName === firstName) {
      this.setState({
        firstName: ''
      });
    } else {
      this.setState({
        firstName: firstName
      });
    }
  }
  render() {
    const { guests, className, text } = this.props;
    const { firstName } = this.state;
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
                       {firstName === guest.firstName && (
                        <p className="sub-comment">{guest.comments}</p>
                       )}
                     </td>
                     <td>{guest.rentDue === 0 ? 'TODAY!' : guest.rentDue === 1 ? 'Tomorrow!' : 'In ' + guest.rentDue + ' days'}</td>
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