import React from "react";
import styles from "./ShotComponent.module.scss"
import rectangle from "../../images/rectangle.svg"


const ShotComponent = ({hit}) => {

    const cssClasses = [styles.shot_box]
    // if(!hit) cssClasses.push(styles.miss)

    return (
        <div className={cssClasses.join(' ')}>
            {
                hit 
                ? 'X'
                : <img className={styles.miss} src={rectangle}/>

            }
        </div>
    )
}

export default ShotComponent