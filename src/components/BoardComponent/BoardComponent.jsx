import React from "react"
import CellComponent from "../CellComponent/CellComponent"
import styles from "./BoardComponent.module.scss"
import ShipComponent from "../ShipComponent/ShipComponent"
import { observer } from "mobx-react-lite"
import { useAppContext } from "../../hook/useAppContext"

const BoardComponent = observer(({isPlayerboard}) => {

    const{application} = useAppContext()
    const{board} = isPlayerboard ? application.player : application.rival

    return (
        <div className={styles.board_box}>
            <div className={styles.board}>
                {
                    board.map((row, y) => 
                        <div className={styles.row} key={y}>
                            {
                                row.map((cell, x) => 
                                    <CellComponent 
                                        key={x}
                                        x={cell.x}
                                        y={cell.y}
                                        cell={cell}
                                    > 
                                        {
                                            cell.colMarker  && 
                                            <div className={[styles.marker_col, styles.marker].join(' ')}>{cell.colMarker}</div>
                                        }
                                        {
                                            cell.rowMarker && 
                                            <div className={[styles.marker_row, styles.marker].join(' ')}>{cell.rowMarker}</div>
                                        }
                                        {
                                            cell.ship && 
                                            <ShipComponent ship={cell.ship}/>
                                        }
                                        
                                    </CellComponent>
                                )
                            }
                        </div>
                        
                    )
                }
            </div>
        </div>
    )
})

export default BoardComponent