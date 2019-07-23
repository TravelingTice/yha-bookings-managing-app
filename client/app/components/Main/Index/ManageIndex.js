import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ManageHome from '../ManageHome';
import PersonIsPaying from '../PersonIsPaying';
import NewCheckIn from '../NewCheckIn';
import CheckOut from '../CheckOut';
import LookUpPerson from '../LookUpPerson';
import SingleRoomList from '../SingleRoomList';
import TheBush from '../TheBush';
import AddCommentToPerson from '../AddCommentToPerson';

class ManageIndex extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={ManageHome}/>
        <Route exact path='/person-is-paying' component={PersonIsPaying}/>
        <Route exact path='/new-check-in' component={NewCheckIn}/>
        <Route exact path='/check-out' component={CheckOut}/>
        <Route exact path='/the-bush' component={TheBush}/>
        <Route exact path='/look-up' component={LookUpPerson}/>
        <Route exact path='/add-comment' component={AddCommentToPerson}/>
        <Route exact path='/single-room-list' component={SingleRoomList}/>
    </Switch>
    )
  }
}

export default ManageIndex;