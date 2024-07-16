import React from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';

function TrackList({list, button, handleClick}) {
    const tracksArray = list;
    return (
        <ol>
            {
                tracksArray.map((track, index) => <li key={index}><Track object={track} /><Button identifier={track.id} handleClick={handleClick}>{button}</Button></li>)
            }
        </ol>
    );
}

export default TrackList;