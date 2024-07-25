import React from 'react';
import Button from '../Button/Button';
import styles from './MyPlayLists.module.css';

function MyPlayLists({ data, changePlayListTitle, value, rename, del }) {
    return (
        <ul>
            {data.map((playlist, index) => <li key={index}><form><input onChange={changePlayListTitle} value={value || playlist[0]}/><Button identifier={index}  handleClick={rename}>RENAME</Button><Button identifier={index} handleClick={del}>DELETE</Button></form></li>)}
        </ul>
    )
}

export default MyPlayLists;