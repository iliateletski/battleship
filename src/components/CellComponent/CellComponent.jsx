import React from "react"
import styles from "./CellCmponent.module.scss"

const CellComponent = ({children, x, y}) => {

    return (
        <div 
            className={styles.cell}
            data-x={x}
            data-y={y}
        >
            <div className={styles.cell_content}>
                {children}
            </div>
        </div>
    )
}

export default CellComponent