import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import PlayList from './PlayList/PlayList'; 
import MyPlayLists from './MyPlayLists/MyPlayLists';
// import requestAccessToken from './AccessTokenRequest';


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
  const [accessToken, setAccessToken] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState(mockArray);
  const [selected, setSelected] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("Enter playlist title");
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [playListArray, setPlayListArray] = useState([]);
  const [newPlayListTitle, setNewPlayListTitle] = useState("");
  

  const makeUrl = () => {
      const client_id = 'b950eca9da224897ab584ad2416b3172';
      const redirect_uri = 'http://localhost:3000';
      const scope = 'user-read-private user-read-email';
  
      let url = 'https://accounts.spotify.com/authorize';
      url += '?response_type=token';
      url += '&client_id=' + client_id;
      url += '&scope=' + scope;
      url += '&redirect_uri=' + redirect_uri;
      return url;
  };


  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem('token');
    console.log(token);
    if(!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      localStorage.setItem('token', token);
      setAccessToken(token);
    };
    console.log(accessToken);
  });

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

  const changePlayListTitle = (event) => {
    setNewPlayListTitle(event.target.value);
  };

  const renamePlayList = (event) => {
       const playlistIndex = event.target.value;
       const newPlayListArray = [...playListArray];
       newPlayListArray[playlistIndex][0] = newPlayListTitle;
       setPlayListArray(newPlayListArray);
  };

  const deletePlayList = (event) => {
      const playListIndex = event.target.value;
      const newPlayListArray = [...playListArray];
      newPlayListArray.splice(playListIndex, 1);
      setPlayListArray(newPlayListArray);
  };

  return (
    <div className="App">
      <header>
        <h1>JAMMMING</h1>
      </header>
      <main>
        <a href={makeUrl()}>CONNECT TO SPOTIFY</a>
        <SearchBar handleInput={handleInput} value={input}/>
        <SearchResults data={results} addToPlayList={addToPlayListFunc} />
        <PlayList data={selected} removeFromPlayList={removeFromPlayListFunc} changeHandler={handleChange} clickHandler={handleClick} plInput={playlistTitle}/>
        <MyPlayLists data={playListArray} changePlayListTitle={changePlayListTitle} value={newPlayListTitle} rename={renamePlayList} delete={deletePlayList}/>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
