import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import PlayList from './PlayList/PlayList'; 
import MyPlayLists from './MyPlayLists/MyPlayLists';


function App() {
  const [accessToken, setAccessToken] = useState("");
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("Enter playlist title");
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [playListArray, setPlayListArray] = useState([]);
 
  

  const makeUrl = () => {
      const client_id = '526c2e259cad436489e35e5edd73fa59';
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
    console.log("HASH : ", hash);
    let token = localStorage.getItem('token');
    console.log("Token from LocalStorage : ", token);

    let newToken = hash ? hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]: undefined;
    let expiration = hash ? hash.substring(1).split('&').find(elem => elem.startsWith('expires_in')).split('=')[1]: undefined;
    console.log('Expires in: ', expiration);
    if (newToken !== undefined) {
      let tokenTime = Date.now();
      console.log("TokenDate: ", tokenTime);
      const d = new Date(tokenTime);
      console.log(d);
      let tokenExpirationTime = Date.now() + expiration * 1000;
      localStorage.setItem('tokenExpirationTime', tokenExpirationTime);
      console.log("TokenExpirationTime", tokenExpirationTime);
      const d1 = new Date(tokenExpirationTime);
      console.log(d1);
    };

    if (!token && newToken) {
      localStorage.setItem('token', newToken);
    };
    if (token !== newToken && newToken !== undefined) {
      localStorage.removeItem('token');
      localStorage.setItem('token', newToken);
    };
    setAccessToken(localStorage.getItem('token'));
    console.log("Access Token : ", accessToken);
  });
  
  setInterval(() => {
    let currentTime = Date.now();
    let tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    if(currentTime > tokenExpirationTime) {
      console.log("Your Access Token has expired ! Please, click on the Button 'CONNECT TO SPOTIFY' to restore connection !");
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpirationTime');
    };
  }, 10000);


  const handleInput = (event) => {
    setInput(event.target.value);
    console.log(input);
  };
  function makeRequestUrl() {
    const endpoint = 'https://api.spotify.com/v1/search?';
    let url = endpoint;
    url += `q=${input}`;
    url += '&type=track';
    return url;
  }
  async function makeRequest() {
    const url = makeRequestUrl();
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        }
      });
      if(!response.ok) {
        throw new Error(`Response status : ${response.status}`);
      };
      console.log(response);
      const data = await response.json();
      console.log(data);
      console.log(data.tracks.items);
      setResults(data.tracks.items);
    } catch (error) {
      console.log(error.message);
    };
  }
  
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

  const changePlayListArray = (newPlayListArray) => {
    setPlayListArray(newPlayListArray);
  };

  return (
    <div className="App">
      <header>
        <h1>JAMMMING</h1>
      </header>
      <main>
        <a href={makeUrl()}>CONNECT TO SPOTIFY</a>
        <SearchBar handleInput={handleInput} value={input} makeRequest={makeRequest}/>
        <SearchResults data={results} addToPlayList={addToPlayListFunc} />
        <PlayList data={selected} removeFromPlayList={removeFromPlayListFunc} changeHandler={handleChange} clickHandler={handleClick} plInput={playlistTitle}/>
        <MyPlayLists data={playListArray} changeHandler={changePlayListArray}/>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
