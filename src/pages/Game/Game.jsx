import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import BoardComponent from "../../components/BoardComponent/BoardComponent";
import Button from "../../components/Buttons/Button";
import Container from "../../components/Container/Container";
import InfoModal from "../../components/Modals/InfoModal";
import { HOME_ROUTE } from "../../utils/consts";
import styles from "./Game.module.scss"

const Game = observer(() => {

    const[showModal, setShowModal] = useState(false)
    const{application} = useContext(Context)
    const{game} = application
    const navigate = useNavigate()

    useEffect(() => {
        if(game.gameStatus !== 'StartGame') {
            setShowModal(true)
        } else{ 
            setShowModal(false)
        }
    }, [game.gameStatus])

    return (
        <Container>
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
            {
                showModal && <InfoModal onHide={() => setShowModal(false)}/>
            }
        </Container>
            
    )
})

export default Game