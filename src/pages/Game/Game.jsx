import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import BoardComponent from "../../components/BoardComponent/BoardComponent"
import Container from "../../components/Container/Container"
import InfoModal from "../../components/Modals/InfoModal"
import { useAppContext } from "../../hook/useAppContext"
import styles from "./Game.module.scss"

const Game = observer(() => {

    const[showModal, setShowModal] = useState(false)
    const{application} = useAppContext()
    const{game} = application

    useEffect(() => {
        if(game.gameStatus !== 'StartGame' || !game.gameStatus) {
            setShowModal(true)
        } else{ 
            setShowModal(false)
        }
    }, [game.gameStatus])

    return (
        <Container>
            <div className={styles.box}>
                <div className={styles.battlefield}>
                    <BoardComponent isPlayerboard/>
                    <div onClick={(e) => {
                        if(!e.target.dataset.cell) return
                        application.game.addShot(e.target.dataset.y, e.target.dataset.x)
                    }}>
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