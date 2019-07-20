import React, { Component } from 'react';
import GuestsInfo from './SmallComps/GuestsInfo';
import { getHr } from '../../utils/date';

function ManageHome(props) {
    // get hour of the day
    const curHr = getHr();
    // update the rent due if it is not done already
    return (
        <>
        {curHr < 12 && (
            <h2>Good morning Jenn!</h2>
        )}
        {curHr < 18 && curHr >= 12 && (
            <h2>Good afternoon Jenn!</h2>
        )}
        {curHr >= 18 && (
            <h2>Good evening Jenn!</h2>
        )}
        <GuestsInfo/>
        </>
    )
}

export default ManageHome;