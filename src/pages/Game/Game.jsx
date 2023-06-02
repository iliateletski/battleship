import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import BoardComponent from "../../components/BoardComponent/BoardComponent";
import Button from "../../components/Buttons/Button";
import { HOME_ROUTE } from "../../utils/consts";
import styles from "./Game.module.scss"

const Game = observer(() => {

    const{application} = useContext(Context)
    const navigate = useNavigate()
    console.log(application)

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
                <div onClick={(e) => application.game.addShot(e.target.dataset.y, e.target.dataset.x)}>
                    <BoardComponent/>
                </div>
            </div>
        </div>    
    )
})

export default Game