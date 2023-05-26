import React from "react"
import { Link } from "react-router-dom"
import { SHIPS_ROUTE } from "../../utils/consts"
import styles from "./HomePage.module.scss"

const HomePage = () => {

    return (
        <div >
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Морской бой
                    </h1>
                </div>
                <div className={styles.button_box}>
                    <Link 
                        className={styles.btn}
                        to={SHIPS_ROUTE}                    
                    >
                        Старт
                    </Link>

                    <Link 
                        className={styles.btn}
                        to={SHIPS_ROUTE}                    
                    >
                        Против игрока
                    </Link>

                </div>
        </div>
    )
}

export default HomePage