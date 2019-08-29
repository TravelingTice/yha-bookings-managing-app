import React from 'react';

// text
// class
// guests

const PostItNote = props => (
  <div className={`col-sm ${props.class}`}>
    <p>{props.text}</p>
            <table>
              <tbody>
              {props.guests.map(guest => (
                <>
                {!guest.isInBush && (
                  <tr>
                  <td>{guest.firstName + ' ' + guest.lastName}</td>
                  <td>{guest.rentDue === 0 ? 'TODAY!' : guest.rentDue === 1 ? 'Tomorrow!' : 'In ' + guest.rentDue + ' days'}</td>
                </tr>
                )}
                </>
              ))}
              </tbody>
            </table>
  </div>
)

export default PostItNote;