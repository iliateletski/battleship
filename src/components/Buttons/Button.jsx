import React from "react"
import "./Button.scss"

const Button = ({onClick, children, cssStyles}) => {

    return (
        <button 
            className="btn material-symbols-outlined"
            style={cssStyles && cssStyles}
            onClick={onClick}
        >
            {children}
        </button> 
    )
}

export default Button