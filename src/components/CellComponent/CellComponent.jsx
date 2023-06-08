import { observer } from "mobx-react-lite"
import React, { useContext, useEffect, useRef } from "react"
import { Context } from "../.."
import styles from "./CellCmponent.module.scss"

const CellComponent = observer(({cell, children}) => {
    
    const{shot, placedMarker, y, x} = cell
    const{application} = useContext(Context)
    const ref = useRef(null)
    const cssStyles = [styles.cell_content, styles.marker]

    if(placedMarker === 'red') {
        cssStyles.push(styles.marker_red)
    }
    if(placedMarker === 'green') {
        cssStyles.push(styles.marker_green)
    }
    if(shot && !shot.hit) {
        cssStyles.push(styles.marker_blue)
    }
    
    useEffect(() => {
        application.player.setCells(ref.current)
    }, [])

    console.log('render cell')

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
                {
                    (shot && shot.hit) && <span className={styles.miss}>X</span>
                }
                {children}
            </div>
        </div>
    )
})

export default CellComponent