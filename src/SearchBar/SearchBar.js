import React from 'react';
import Button from '../Button/Button';
function SearchBar(props) {
    return (
        <form>
            <label htmlFor="input">Enter your search request</label>
            <input id="input" type="text" onChange={props.handleInput} value={props.value}/>
            <Button  handleClick={props.makeRequest}>Search</Button>
        </form>
    )
}

export default SearchBar;