import React from 'react';
import TrackList from '../TrackList/TrackList';
function SearchResults(props) {
    return (
        <div>
            <h2>Search results</h2>
            <TrackList list={props.data} button="ADD TO PLAYLIST" handleClick={props.addToPlayList} playHandle={props.play}/>
        </div>
    );
}
export default SearchResults;  