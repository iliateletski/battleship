import React from "react"
import styles from "./Button.module.scss"

const Button = ({onClick, children, className, style}) => {

    const cssStyles =[styles.btn, styles[className]]

    return (
        <button 
            className={cssStyles.join(' ')}
            style={style}
            onClick={onClick}
        >
            {children}
        </button> 
    )
}

export default Button