import React from 'react'

type ButtonProps = {
    onClick: () => void,
    name:string,
}

function Button({onClick,name}:ButtonProps ) {
    return <button className="btn btn-primary mt-2" onClick={() => onClick()}>{ name}</button>
}

export default Button