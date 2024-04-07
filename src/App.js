import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import PlayList from './PlayList/PlayList'; 
import TrackList from './TrackList/TrackList';

function App() {
  const [input, setInput] = useState([]);
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <SearchBar handleInput={handleInput} value={input}/>
        <SearchResults>
          <TrackList />
        </SearchResults>
        <PlayList>
          <TrackList />
        </PlayList>
      </main>
    </div>
  );
}

export default App;
