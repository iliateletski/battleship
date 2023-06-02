import React, { useContext, useEffect, useRef } from "react"
import { Context } from "../.."
import styles from "./CellCmponent.module.scss"

const CellComponent = ({children, x, y}) => {

    const{application} = useContext(Context)
    const ref = useRef(null)

    useEffect(() => {
        application.player.setCells(ref.current)
    }, [])


    return (
        <div 
            className={styles.cell}
        >
            <div
                className={styles.cell_content}
                data-x={x}
                data-y={y}
                data-cell={true}
                ref={ref}
                // onClick={(e) => application.socket.sendMessage({type: 'Shot', y: e.target.dataset.y, x: e.target.dataset.x})}
            >
                {children}
            </div>
        </div>
    )
}

export default CellComponent