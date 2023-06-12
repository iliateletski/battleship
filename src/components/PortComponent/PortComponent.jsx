import { observer } from "mobx-react-lite"
import React from "react"
import { useAppContext } from "../../hook/useAppContext"
import ShipComponent from "../ShipComponent/ShipComponent"
import styles from "./PortComponent.module.scss"

const PortComponent = observer(({animation}) => {

    const{application} = useAppContext()
    const ships = application.player.ships.filter(s => !s.placed)

    return (
        <div className={styles.port}>
                {
                    ships.map(ship =>
                        <ShipComponent ship={ship} key={ship.id} animation={animation}/>
                    )
                }
        </div>
    )
})

export default PortComponent