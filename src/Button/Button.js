import React from 'react';

function Button(props) {

    return <button value={props.object.id} onClick={props.handleClick}>{props.sign}</button>;
}

export default Button;