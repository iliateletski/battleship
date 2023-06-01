import React from "react";
import { useNavigate } from "react-router-dom";
import BoardComponent from "../../components/BoardComponent/BoardComponent";
import Button from "../../components/Buttons/Button";
import { HOME_ROUTE } from "../../utils/consts";
import styles from "./Game.module.scss"

const Game = () => {

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
            <div className={styles.battlefield}>
                <BoardComponent isPlayerboard/>
                <BoardComponent/>
            </div>
        </div>    
    )
}

export default Game