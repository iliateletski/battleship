import React from "react"
import "./ShipComponent.scss"
import { observer } from "mobx-react-lite" 
import { useAppContext } from "../../hook/useAppContext"

const ShipComponent = observer(({ship, animation}) => {

    const{application} = useAppContext()
    const{preparation} = application
    const styles =['ship',`ship_${ship.size}`, `ship_${ship.size}_${ship.direction}`]
    animation && styles.push('animation')

    return (
        <div 
            className={styles.join(' ')}
            style={{left: ship.left, top: ship.top}}
            onMouseDown={(e) => {
                preparation.setDragetShip(e.target, e.target.parentNode, ship)
            }}
        >
        </div>    
    )
})

export default ShipComponent