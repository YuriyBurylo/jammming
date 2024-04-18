import React from 'react';

function Button(props) {

    return <button value={props.identifier} onClick={props.handleClick}>{props.sign}</button>;
}

export default Button;