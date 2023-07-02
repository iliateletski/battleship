import { observer } from "mobx-react-lite"
import React from "react"
import { useAppContext } from "../../hook/useAppContext"
import ShipComponent from "../ShipComponent/ShipComponent"
import styles from "./PortComponent.module.scss"

const PortComponent = observer(({animation}) => {

    const{application} = useAppContext()
    const groupShips = (function() {
        const ships = []
        for(let i = 4; i >= 1; i--) {
            const group = application.player.ships.filter(s => !s.placed && s.size === i) 
            ships.push(group)
        }
        return ships
    }())

    return (
        <div className={styles.port}>
            <ul className={styles.port_lines}>    
                {
                    groupShips.map(ships => 
                        <li className={styles.port_line}>
                            {
                                ships.map(ship =>
                                    <div className={[styles.port_dock, styles[`port_dock_${ship.size}`]].join(' ')}
                                    >
                                        <ShipComponent ship={ship} key={ship.id} animation={animation}/>
                                    </div>
                                )
                            }
                        </li>
                    )
                }
            </ul>
        </div>
    )
})

export default PortComponent

