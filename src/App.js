import React, { useState } from 'react';
import './App.css';
import SearchBar from './SearchBar/SearchBar';
import SearchResults from './SearchResults/SearchResults';
import PlayList from './PlayList/PlayList'; 


const mockArray = [
  {
    id: 1,
    name: "Bohemian Rapsody",
    artist: "Freddy",
    album: "It'a miracle"
  },
  {
    id: 2,
    name: "I'll always love you",
    artist: "Witney Hewston",
    album: "My darling you"
  },
  {
    id: 3,
    name: "It must have been love",
    artist: "Roxette",
    album: "The best of Roxette"
  }
];

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(mockArray);
  const [selected, setSelected] = useState([]);
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
    console.log(trackId);
    const newSelected = selected.filter(track => track.id != trackId);
    setSelected(newSelected);
  };

  return (
    <div className="App">
      <header>
        <h1>JAMMMING</h1>
      </header>
      <main>
        <SearchBar handleInput={handleInput} value={input}/>
        <SearchResults data={results} addToPlayList={addToPlayListFunc} />
        <PlayList data={selected} removeFromPlayList={removeFromPlayListFunc} />
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
