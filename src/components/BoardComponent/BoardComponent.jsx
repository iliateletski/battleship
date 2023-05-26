import React from "react"
import CellComponent from "../CellComponent/CellComponent"
import styles from "./BoardComponent.module.scss"
import { Board } from "../../models/Board"



const BoardComponent = () => {

    const board = new Board()
    
    return (
        <div className={styles.board_box}>
            <div className={styles.board}>
                {
                    board.board.map((row, y) => 
                        <div className={styles.row} key={y}>
                            {
                                row.map((cell, x) => 
                                    <CellComponent 
                                        key={x}
                                        x={cell.x}
                                        y={cell.y}
                                    > 
                                        {
                                            cell.colMarker  && <div className={[styles.marker_col, styles.marker].join(' ')}>{cell.colMarker}</div>
                                        }
                                        {
                                            cell.rowMarker && <div className={[styles.marker_row, styles.marker].join(' ')}>{cell.rowMarker}</div>
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
}

export default BoardComponent