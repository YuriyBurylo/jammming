import React from 'react';
import Button from '../Button/Button';
import styles from './MyPlayLists.module.css';

function MyPlayLists(props) {
    return (
        <ul>
            {props.data.map((playlist, index) => <li key={index}>{playlist[0]}<Button identifier={index}  handleClick={props.rename} sign="RENAME"/></li>)}
        </ul>
    )
}

export default MyPlayLists;