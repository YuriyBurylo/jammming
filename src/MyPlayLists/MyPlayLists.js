import React from "react";
import Button from "../Button/Button";
import styles from "./MyPlayLists.module.css";

function MyPlayLists({ data, changePlaylistTitle, rename, play, downloadMyPlaylists }) {

  return (
    <div>
      <h2>My playlists at Spotify</h2>
      <Button handleClick={downloadMyPlaylists}>Download</Button>
      <ul style={{listStyle: 'none'}}>
        {data? data.map((playlist, index) => (
          <li key={index}>
            <form>
              <img src={playlist.images[0].url} height="100px" width="100px" alt="playlist cover image" />
              <input onChange={changePlaylistTitle} placeholder={playlist.name} />
              <div>{playlist.tracks.total} tracks</div>
              <Button identifier={playlist.id} handleClick={rename}>
                RENAME
              </Button>
              <Button identifier={playlist.id} handleClick={play}>
                PLAY
              </Button>
            </form>
          </li>
        )):"No playlists found"}
      </ul>
    </div>
  );
}

export default MyPlayLists;
