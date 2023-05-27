import React, { useContext, useEffect, useRef } from "react"
import { Context } from "../.."
import styles from "./CellCmponent.module.scss"

const CellComponent = ({children, x, y}) => {

    const{application} = useContext(Context)
    const ref = useRef(null)

    useEffect(() => {
        application.player.setCells(ref.current)
        
    })


    return (
        <div 
            className={styles.cell}
        >
            <div
                className={styles.cell_content}
                data-x={x}
                data-y={y}
                ref={ref}
            >
                {children}
            </div>
        </div>
    )
}

export default CellComponent