import React from 'react';

function Button({identifier, handleClick, children}) {

    return <button value={identifier} onClick={handleClick}>{children}</button>;
}

export default Button;