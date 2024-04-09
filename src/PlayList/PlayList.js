import React from 'react';
import TrackList from '../TrackList/TrackList';
function PlayList(props) {
    return (
        <div>
            <h2>Playlist</h2>
            <TrackList list={props.data} button="-" handleClick={props.removeFromPlayList}/>
        </div>
    );
}
export default PlayList;