import React from 'react';
import Button from '../Button/Button';
function SearchBar(props) {
    return (
        <form>
            <label htmlFor="input"><h2>Search for music here</h2></label>
            <input id="input" type="text" onChange={props.handleInput} value={props.value} placeholder='Enter your request'/>
            <Button  handleClick={props.makeRequest}>Search</Button>
        </form>
    )
}

export default SearchBar;