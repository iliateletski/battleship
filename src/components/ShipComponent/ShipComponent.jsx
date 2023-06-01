import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../.."
import "./ShipComponent.scss"
import { observer } from "mobx-react-lite"
import shipIcons from "../../images/ship.png" 

const ShipComponent = ({ship}) => {

    const{application} = useContext(Context)
    const{preparation} = application

    // console.log(shipIcons)

    return (
        <div 
            className={`ship ship_${ship.size}`}
            style={{top: ship.top, left: ship.left}}
            onMouseDown={(e) => {
                preparation.setDragetShip(e.target, e.target.parentNode, ship)
            }}
        >
        </div>    
    )
}

export default ShipComponent