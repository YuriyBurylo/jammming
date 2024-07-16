import React from 'react';
import Button from '../Button/Button';
import styles from './MyPlayLists.module.css';

function MyPlayLists(props) {
    return (
        <ul>
            {props.data.map((playlist, index) => <li key={index}><form><input onChange={props.changePlayListTitle} value={props.value || playlist[0]}/><Button identifier={index}  handleClick={props.rename} sign="RENAME"/><Button identifier={index} handleClick={props.delete} sign="DELETE"/></form></li>)}
        </ul>
    )
}

export default MyPlayLists;