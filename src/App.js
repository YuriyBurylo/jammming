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
  const [playerURL, setPlayerURL] = useState("https://open.spotify.com/embed/playlist/00ivJpMO25qAD29RuQo8Sk?utm_source=generator");
 
  

  const makeUrl = () => {
      const client_id = '526c2e259cad436489e35e5edd73fa59';
      const redirect_uri = 'http://localhost:3000';
      const scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  
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
      window.location.href = makeUrl();
    };
  }, 1000);

  function handleInput (event) {
    setInput(event.target.value);
    console.log("My input: ", input);
  }

  function makeRequestUrl() {
    const endpoint = 'https://api.spotify.com/v1/search?';
    let url = endpoint;
    url += `q=${input}`;
    url += '&type=track';
    return url;
  }
  
  async function makeRequest() {
    const url = makeRequestUrl();
    console.log("My URL: ", url);
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
  }

  function removeFromPlayListFunc (event) {
    const trackId = event.target.value;
    const newSelected = selected.filter(track => track.id != trackId);
    setSelected(newSelected);
  }

  function handleChange (event) {
    let title = event.target.value;
    setPlaylistTitle(title);
    const newArray = [title, ...selected];
    setNewPlaylist(newArray);
  }

  function handleClick (event) {
    event.preventDefault();
    setPlayListArray(prev => [newPlaylist, ...prev]);
    console.log("Saved");
  }

  async function getUserProfile() {
    const url = 'https://api.spotify.com/v1/me';
    try{
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,   
        }
      });
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };
      const userProfile = await response.json();
      return userProfile;
    } catch(error) {
      console.log(error.message);
    };
  }


  async function createPlayList(user_id) {
    const url = `https://api.spotify.com/v1/users/${user_id}/playlists`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + accessToken,
          "Content-Type": "application/json",    
        },
        body: JSON.stringify({
          name: playlistTitle,
          description: "New PlayList Description",
          public: false,
        }),
      });
      if(!response.ok) {
        throw new Error(`Response status : ${response.status}`);
      };
      const playListData = await response.json(); 
      return playListData;
    } catch(error) {
      console.log(error.message);
    };
  }

  async function addTracksToPlayList(playlist_id, uriss) {
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: 'Bearer ' + accessToken,
          "Content-Type": "application/json",    
        },
        body: JSON.stringify({uris: uriss, position: 0}),
      });
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };
      const addedTracksData = await response.json();
      return addedTracksData;
    } catch (error) {
      console.log(error.message);
    };
  }

  async function getUserPlayList(playlist_id) {
    const url = `https://api.spotify.com/v1/playlists/${playlist_id}`;
    try{
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + accessToken,   
        }
      });
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      };
      const userPlayList = await response.json();
      return userPlayList;
    } catch(error) {
      console.log(error.message);
    };
  }

  function addPlayListToLocalStorage (userPlayList) {
    const playListTitle = userPlayList.name;
    localStorage.setItem(playListTitle, JSON.stringify(userPlayList));
    console.log('Playlist added to LocalStorage');
  }

  async function clickSaveSpotify() {
    const uris = selected.map(item => item.uri);
    console.log(uris);
    const userProfile = await getUserProfile();
    console.log(userProfile);
    const user_id = userProfile.id;
    console.log(user_id);
    const playListData = await createPlayList(user_id);
    console.log(playListData);
    const playlist_id = playListData.id;
    console.log(playlist_id);
    const tracksData = await addTracksToPlayList(playlist_id, uris);
    console.log(tracksData);
    const userPlayList = await getUserPlayList(playlist_id);
    console.log(userPlayList);
    addPlayListToLocalStorage (userPlayList);
  }

  function changePlayListArray (newPlayListArray) {
    setPlayListArray(newPlayListArray);
  };

  function updateTrackURL (event) {
    const trackID = event.target.value;
    let url = "https://open.spotify.com/embed/track/";
    url += trackID;
    url += "?utm_source=generator";
    setPlayerURL(url);
  }

  return (
    <div className="App">
      <header>
        <h1>JAMMMING</h1>
      </header>
      <main>
        <a href={makeUrl()}>CONNECT TO SPOTIFY</a>
        <iframe title="spotify-iframe" style={{borderRadius: "1rem"}} src={playerURL} width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <SearchBar handleInput={handleInput} value={input} makeRequest={makeRequest}/>
        <SearchResults data={results} addToPlayList={addToPlayListFunc} play={updateTrackURL}/>
        <PlayList data={selected} removeFromPlayList={removeFromPlayListFunc} play={updateTrackURL} changeHandler={handleChange} clickHandler={handleClick} plInput={playlistTitle} clickSaveSpotify={clickSaveSpotify} />
        <MyPlayLists data={playListArray} changeHandler={changePlayListArray}/>
      </main>
      <footer>Copyright</footer>
    </div>
  );
}

export default App;
