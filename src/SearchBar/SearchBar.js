import React from 'react';
function SearchBar(props) {
    return (
        <form>
            <label htmlFor="input"></label>
            <input id="input" type="text" onChange={props.handleInput} value={props.value}/>
        </form>
    )
}

export default SearchBar;