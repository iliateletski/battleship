import React from "react"
import styles from "./ShipComponent.module.scss"
import { observer } from "mobx-react-lite" 
import { useAppContext } from "../../hook/useAppContext"

const ShipComponent = observer(({ship, animation}) => {
    
    const{application} = useAppContext()
    const{preparation} = application
    const cssStyles =[styles.ship, styles[`ship_${ship.size}`], styles[`ship_${ship.size}_${ship.direction}`]];
    (animation || ship.animation) && cssStyles.push(styles.animation)

    return (
        <div 
            draggable={false}
            className={cssStyles.join(' ')}
            style={{left: ship.left, top: ship.top}}
            onPointerDown={(e) => {
                preparation.setDragetShip(e.target, e.target.parentNode, ship)
            }}
            onDragStart={() => false}
        >
        </div>    
    )
})

export default ShipComponent