import React from 'react';
import TrackList from '../TrackList/TrackList';
function PlayList(props) {
      
    return (
        <div>
            <h2>My current playlist</h2>
            <form>
                <label htmlFor="title">Playlist Title : </label>
                <input id="title" type="text" onChange={props.changeHandler} value={props.plInput}/>
                <button type="submit" onClick={props.clickSaveSpotify}>SAVE TO SPOTIFY</button>
            </form>
            <TrackList list={props.data} button="REMOVE FROM PLAYLIST" handleClick={props.removeFromPlayList} playHandle={props.play}/>
        </div>
    );
}
export default PlayList;