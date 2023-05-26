import React, { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../.."
import "./ShipComponent.scss"
import { observer } from "mobx-react-lite"

const ShipComponent = ({ship}) => {

    const{application} = useContext(Context)
    console.log(application)
    console.log(ship)
    
    
    
    return (
        <div 
            className={`ship ship_${ship.size}`}
            style={{top: 0, left: 0}}
            onMouseDown={(e) => {
                application.setDragetShip(e.target, e.target.parentNode)
            }}
            // onMouseUp={() => {
            //     application.setDragetShip(null, null)
            // }}
            // onClick={() => }
        >
        </div>    
    )
}

export default ShipComponent