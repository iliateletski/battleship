import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./PlaceShips.module.scss"
import BoardComponent from "../../components/BoardComponent/BoardComponent"
import PortComponent from "../../components/PortComponent/PortComponent"
import Button from "../../components/Button/Button"
import { SHIPS_ROUTE, GAME_ROUTE } from "../../utils/consts"
import { observer } from "mobx-react-lite"
import Container from "../../components/Container/Container"
import CopyLink from "../../components/CopyLink/CopuLink"
import InfoModal from "../../components/Modals/InfoModal"
import { useAppContext } from "../../hook/useAppContext"

const PlaceShips = observer(() => {
    
    const{application} = useAppContext()
    const[showModal, setShowModal] = useState(false)
    const{game} = application
    const isFirstPlayer = game.gameStatus === 'WaitForSecondPlayer'
    const navigate = useNavigate()
    const {roomId} = useParams()
    const[animation, setAnimation] = useState(false)

    const sendShipPoints = () => {
        const shipPoints = application.player.shipPoints()
        if(!shipPoints) {
            setAnimation(true)
            setTimeout(() => setAnimation(false), 1000)
            return false
        }
        application.MouseStop()
        application.socket.sendMessage(shipPoints)
        navigate(`${GAME_ROUTE}/${roomId}`, {replace: true})
    }
    
    useEffect(() => {
        if(game.gameStatus === 'close') {
            setShowModal(true)
        }
    }, [game.gameStatus])

    return (
        <Container>
            <div className={styles.box}>
                <div className={styles.place_ships}>
                    <BoardComponent isPlayerboard/>
                    <div className={styles.port_box}>
                        <PortComponent animation={animation}/>
                        <div className={styles.btn_box}>
                            <Button 
                                className={'rotate_btn'}
                                onClick={() => application.preparation.rotateShip()}
                            >
                            </Button>
                            <Button 
                                className={'general_btn'}
                            >
                                Авто
                            </Button>
                            <Button 
                                className={'general_btn'}
                                onClick={() => sendShipPoints()}
                            >
                                Далее
                            </Button>
                        </div>
                    </div>
                </div>
                {
                    isFirstPlayer &&
                    <CopyLink url={`${process.env.REACT_APP_URL}${SHIPS_ROUTE}/${roomId}`}/>
                }
            </div>  
            {
                showModal && <InfoModal onHide={() => setShowModal(false)}/>
            }
        </Container>
    )
})

export default PlaceShips