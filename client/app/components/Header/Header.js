import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: '/'
    }
  }
    componentDidMount() {
      this.setState({
        active: window.location.pathname
      });
    }

    updatePage(url) {
      this.setState({
        active: url
      });
    }

    render() {
      const { active } = this.state;
      return (
        <header>
        <nav>
          <Link 
          onClick={e => this.updatePage('/')}
          className={active === '/' ? 'active' : ''} 
          to="/">Home</Link>
          <Link 
          onClick={e => this.updatePage('/person-is-paying')}
          className={active === '/person-is-paying' ? 'active' : ''} 
          to="/person-is-paying">Person is paying</Link>
          <Link 
          onClick={e => this.updatePage('/new-check-in')}
          className={active === '/new-check-in' ? 'active' : ''} 
          to="/new-check-in">New Check In</Link>
          <Link 
          onClick={e => this.updatePage('/check-out')}
          className={active === '/check-out' ? 'active' : ''} 
          to="/check-out">Check Out</Link>
          <Link 
          onClick={e => this.updatePage('/look-up')}
          className={active === '/look-up' ? 'active' : ''} 
          to="/look-up">Look Up</Link>
          <Link 
          onClick={e => this.updatePage('/add-comment')}
          className={active === '/add-comment' ? 'active' : ''} 
          to="/add-comment">Add/Update comment</Link>
          <Link 
          onClick={e => this.updatePage('/the-bush')}
          className={active === '/the-bush' ? 'active' : ''} 
          to="/the-bush">The Bush</Link>
          <Link 
          onClick={e => this.updatePage('/single-room-list')}
          className={active === '/single-room-list' ? 'active' : ''} 
          to="/single-room-list">Single Room List</Link>
        </nav>
      </header>
      )
    }
}

export default Header;
