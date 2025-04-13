import React from 'react';
import TrackList from '../TrackList/TrackList';
function PlayList(props) {
      
    return (
        <div>
            <form>
                <label htmlFor="title">Playlist Title : </label>
                <input id="title" type="text" onChange={props.changeHandler} value={props.plInput}/>
                <button type="submit" onClick={props.clickHandler}>SAVE HERE</button>
                <button type="submit" onClick={props.clickSaveSpotify}>SAVE TO SPOTIFY</button>
            </form>
            <TrackList list={props.data} button="-" handleClick={props.removeFromPlayList} playHandle={props.play}/>
        </div>
    );
}
export default PlayList;