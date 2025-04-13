import React from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';

function TrackList({list, button, handleClick, playHandle}) {
    return (
        <ol>
            {
                list.map((track, index) => <li key={index}><Track object={track} /><Button identifier={track.id} handleClick={handleClick}>{button}</Button><Button identifier={track.id} handleClick={playHandle}>PLAY</Button></li>)
            }
        </ol>
    );
}

export default TrackList;