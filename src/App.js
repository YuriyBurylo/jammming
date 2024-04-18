import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import PlayList from './PlayList/PlayList'; 
import MyPlayLists from './MyPlayLists/MyPlayLists';


const mockArray = [
  {
    id: 1,
    name: "Bohemian Rapsody",
    artist: "Freddy",
    album: "It'a miracle", 
    uri: "https://open.spotify.com/track/3z8h0TU7ReDPLIbEnYhWZb"
  },
  {
    id: 2,
    name: "I'll always love you",
    artist: "Witney Hewston",
    album: "My darling you",
    uri: "https://open.spotify.com/track/4eHbdreAnSOrDDsFfc4Fpm"
  },
  {
    id: 3,
    name: "It must have been love",
    artist: "Roxette",
    album: "The best of Roxette",
    uri: "https://open.spotify.com/track/6kvoHl80mfCVTv7XnZkjQn"
  }
];

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(mockArray);
  const [selected, setSelected] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("Enter playlist title");
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [playListArray, setPlayListArray] = useState([]);
  
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  
  function addToPlayListFunc(event) {
    const trackId = event.target.value;
      const newTrack = results.find(result => result.id == trackId);
      if(!selected.includes(newTrack)) {
        setSelected(prev => [...prev, newTrack]);
      };
  };

  const removeFromPlayListFunc = (event) => {
    const trackId = event.target.value;
    const newSelected = selected.filter(track => track.id != trackId);
    setSelected(newSelected);
  };

  const handleChange = (event) => {
    let title = event.target.value;
    setPlaylistTitle(title);
    const newArray = [title, ...selected];
    setNewPlaylist(newArray);
  };


  const handleClick = (event) => {
    event.preventDefault();
    setPlayListArray(prev => [newPlaylist, ...prev]);
    console.log("Saved");
  };

  const renamePlayList = (event) => {
       const newTitle = prompt("Enter new playlist title");
       const playlistIndex = event.target.value;
       const newPlayListArray = [...playListArray];
       newPlayListArray[playlistIndex][0] = newTitle;
       setPlayListArray(newPlayListArray);
  };

  return (
    <div className="App">
      <header>
        <h1>JAMMMING</h1>
      </header>
      <main>
        <SearchBar handleInput={handleInput} value={input}/>
        <SearchResults data={results} addToPlayList={addToPlayListFunc} />
        <PlayList data={selected} removeFromPlayList={removeFromPlayListFunc} changeHandler={handleChange} clickHandler={handleClick} plInput={playlistTitle}/>
        <MyPlayLists data={playListArray} rename={renamePlayList} />
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
