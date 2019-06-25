import React, { Component } from 'react';
import PeopleInfo from './smallComps/PeopleInfo'

function ManageHome(props) {
    // get hour of the day
    const today = new Date();
    const curHr = today.getHours();
    console.log(curHr);
    return (
        <>
        {curHr < 12 && (
            <h2>Good morning Jenn!</h2>
        )}
        {curHr < 18 && curHr > 12 && (
            <h2>Good afternoon Jenn!</h2>
        )}
        {curHr > 18 && (
            <h2>Good evening Jenn!</h2>
        )}
        <PeopleInfo/>
        </>
    )
}

export default ManageHome;