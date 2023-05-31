import { observer } from "mobx-react-lite"
import React, { useContext, useRef } from "react"
import { Context } from "../.."
import ShipComponent from "../ShipComponent/ShipComponent"
import styles from "./PortComponent.module.scss"

const PortComponent = observer(() => {

    const{application} = useContext(Context)
    const ships = application.player.ships.filter(s => !s.placed)


    return (
        <div className={styles.port}>
                {
                    ships.map((ship, i) =>
                        <ShipComponent ship={ship} key={ship.id}/>
                    )
                    
                }
        </div>
    )
})

export default PortComponent