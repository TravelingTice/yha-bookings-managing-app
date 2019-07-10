import React, { Component } from 'react';

// prop: n (how many numbers)

const Select = props => {
    let arr = [];
    for (let i = 0; i < props.n; i++) {
        arr.push(i);
    }
    return (
    <select 
    onChange={e => props.onChange(e.target.value)}
    value={props.value}>
        {arr.map(n => (
            <option value={n+1}>{n+1}</option>
        ))}
    </select>

    )
}


export default Select;