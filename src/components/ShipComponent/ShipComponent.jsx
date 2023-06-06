import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../.."
import "./ShipComponent.scss"
import { observer } from "mobx-react-lite" 
import ship_4 from "../../images/ship_4.svg"
import { set } from "mobx"

const ShipComponent = observer(({ship}) => {

    const{application} = useContext(Context)
    const{preparation} = application
    const styles =['ship',`ship_${ship.size}`, `ship_${ship.size}_${ship.direction}`]

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