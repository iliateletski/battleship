import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef } from "react"
import { Context } from "../.."
import styles from "./CellCmponent.module.scss"

const CellComponent = observer(({cell, children, x, y}) => {

    const{application} = useContext(Context)
    const ref = useRef(null)
    const cssStyles = [styles.cell_content]
    if(cell.placedMarker === 'red') {
        cssStyles.push(styles.red)
    }
    if(cell.placedMarker === "green") {
        cssStyles.push(styles.green)
    }

    useEffect(() => {
        application.player.setCells(ref.current)
    }, [])


    return (
        <div 
            className={styles.cell}
        >
            <div
                className={cssStyles.join(' ')}
                data-x={x}
                data-y={y}
                data-cell={true}
                ref={ref}
            >
                {children}
            </div>
        </div>
    )
})

export default CellComponent