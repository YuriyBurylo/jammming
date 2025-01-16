import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./MyPlayLists.module.css";

function MyPlayLists({ data, changeHandler }) {
  const [newPlayListTitle, setNewPlayListTitle] = useState("");
  const changePlayListTitle = (event) => {
    setNewPlayListTitle(event.target.value);
  };

  const renamePlayList = (event) => {
    const playListIndex = event.target.value;
    console.log("Index:", playListIndex);
    const newPlayListArray = [...data];
    console.log('DATA:', newPlayListArray);
    const playlist = data[playListIndex];
    console.log("playlist:", playlist);
    playlist[0] = newPlayListTitle;
    console.log(playlist);
    newPlayListArray.splice(playListIndex, 1, playlist);
    console.log(newPlayListArray)
    changeHandler(newPlayListArray);
    event.preventDefault();
  };

  const deletePlayList = (event) => {
    const playListIndex = event.target.value;
    console.log("EventTarget", playListIndex);
    const newPlayListArray = [...data];
    newPlayListArray.splice(playListIndex, 1);
    changeHandler(newPlayListArray);
    console.log("newArr", newPlayListArray);
    event.preventDefault();
  };

  return (
    <ul>
      {data.map((playlist, index) => (
        <li key={index}>
          <form>
            <input onChange={changePlayListTitle} placeholder={playlist[0]} />
            <Button identifier={index} handleClick={renamePlayList}>
              RENAME
            </Button>
            <Button identifier={index} handleClick={deletePlayList}>
              DELETE
            </Button>
          </form>
        </li>
      ))}
    </ul>
  );
}

export default MyPlayLists;
