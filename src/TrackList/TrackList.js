import React from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';

function TrackList(props) {
    const tracksArray = props.list;
    return (
        <ol>
            {
                tracksArray.map((track, index) => <li key={index}><Track object={track} /><Button identifier={track.id} sign={props.button} handleClick={props.handleClick} /></li>)
            }
        </ol>
    );
}

export default TrackList;