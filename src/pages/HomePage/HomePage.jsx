import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Buttons/Button"
import { SHIPS_ROUTE } from "../../utils/consts"
import styles from "./HomePage.module.scss"

const HomePage = () => {

    // const[isOnlineGame, setIsOnlineGame] = useState(false)
    const navigate = useNavigate()

    return (
        <div >
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Морской бой
                    </h1>
                </div>
                <div className={styles.button_box}>
                    <button
                        className={styles.btn}
                        onClick={() => navigate(SHIPS_ROUTE)}
                    >
                        Старт
                    </button>

                    <button 
                        className={styles.btn}
                        onClick={() => navigate(SHIPS_ROUTE)}                    
                    >
                        Против игрока
                    </button>

                </div>
        </div>
    )
}

export default HomePage