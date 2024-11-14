import React from 'react'

type ButtonProps = {
    onClick: () => void,
    name:string,
    backgroundColor?:React.CSSProperties
}

function Button({onClick,name,backgroundColor}:ButtonProps ) {
    return <button className="btn btn-primary mt-2" onClick={() => onClick()} style={backgroundColor}>{ name}</button>
}

export default Button