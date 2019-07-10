import React, { Component } from 'react';

const Select = props => {
    let arr = [];
    for (let i = 0; i < props.n; i++) {
        arr.push(i);
    }
    return (
    <select 
    onChange={e => props.onChange(e)}
    value={props.value}>
        {arr.map(n => (
            <option value={n+1}>{n+1}</option>
        ))}
    </select>

    )
}


export default Select;