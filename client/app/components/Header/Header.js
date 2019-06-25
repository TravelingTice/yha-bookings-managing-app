import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 'Home'
    }
  }
    updatePage(page) {
      this.setState({
        active: page
      });
    }

    render() {
      const { active } = this.state;
      return (
        <header>
        <nav>
          <Link 
          onClick={e => this.updatePage('Home')}
          className={active === 'Home' ? 'active' : ''} 
          to="/">Home</Link>
          <Link 
          onClick={e => this.updatePage('PersonIsPaying')}
          className={active === 'PersonIsPaying' ? 'active' : ''} 
          to="/person-is-paying">Person is paying</Link>
          <Link 
          onClick={e => this.updatePage('NewCheckIn')}
          className={active === 'NewCheckIn' ? 'active' : ''} 
          to="/new-check-in">New Check In</Link>
          <Link 
          onClick={e => this.updatePage('CheckOut')}
          className={active === 'CheckOut' ? 'active' : ''} 
          to="/check-out">Check Out</Link>
          <Link 
          onClick={e => this.updatePage('LookUpPerson')}
          className={active === 'LookUpPerson' ? 'active' : ''} 
          to="/look-up">Look Up</Link>
          <Link 
          onClick={e => this.updatePage('SingleRoomList')}
          className={active === 'SingleRoomList' ? 'active' : ''} 
          to="/single-room-list">Single Room List</Link>
        </nav>
    
        <hr />
      </header>
      )
    }
}

export default Header;
