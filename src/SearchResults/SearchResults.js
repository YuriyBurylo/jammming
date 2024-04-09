import React from 'react';
import TrackList from '../TrackList/TrackList';
function SearchResults(props) {
    return (
        <div>
            <h2>Results</h2>
            <TrackList list={props.data} button="+" handleClick={props.addToPlayList}/>
        </div>
    );
}
export default SearchResults;  