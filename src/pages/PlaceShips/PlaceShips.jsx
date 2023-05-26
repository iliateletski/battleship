import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./PlaceShips.module.scss"
import BoardComponent from "../../components/BoardComponent/BoardComponent"
import PortComponent from "../../components/PortComponent/PortComponent"
import Button from "../../components/Buttons/Button"
import { HOME_ROUTE } from "../../utils/consts"
import { Application } from "../../models/Application"

const PlaceShips = () => {

    const[isGame, setIsGame] = useState(false)
    const navigate = useNavigate()
 

    return (
        <div className={styles.box}>
            <div className={styles.header}>
                <Button 
                    onClick={() => navigate(HOME_ROUTE)}
                    cssStyles={{
                        position: 'absolute',
                        left: '40px',
                        top: '24px'
                    }}
                >
                    cottage
                </Button>
            </div>
            <div className={styles.place_ships}>
                <BoardComponent/>
                {
                    isGame
                    ? <BoardComponent/>
                    : <PortComponent setIsGame={setIsGame}/>
                }
            </div>
        </div>    
    )
}

export default PlaceShips