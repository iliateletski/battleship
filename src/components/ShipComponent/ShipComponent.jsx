import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../.."
import "./ShipComponent.scss"
import { observer } from "mobx-react-lite"

const ShipComponent = ({ship}) => {

    const{application} = useContext(Context)
    // console.log(application)
    // console.log(ship)
    
    
    
    return (
        <div 
            className={`ship ship_${ship.size}`}
            style={{top: ship.top, left: ship.left}}
            onMouseDown={(e) => {
                application.setDragetShip(e.target, e.target.parentNode, ship)
            }}
        >
        </div>    
    )
}

export default ShipComponent