import React, { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import styles from "./PlaceShips.module.scss"
import BoardComponent from "../../components/BoardComponent/BoardComponent"
import PortComponent from "../../components/PortComponent/PortComponent"
import Button from "../../components/Buttons/Button"
import { HOME_ROUTE, SHIPS_ROUTE, GAME_ROUTE } from "../../utils/consts"
import { fetchRoomId } from "../../http/gameAPI"
import { observer } from "mobx-react-lite"
import { Context } from "../.."
import Container from "../../components/Container/Container"

import CopyLink from "../../components/CopyLink/CopuLink"

const PlaceShips = observer(() => {

    const navigate = useNavigate()
    const {roomId} = useParams()
    const{application} = useContext(Context)
    const{game}= application
    const isFirstPlayer = game.gameStatus === 'WaitForSecondPlayer'
    const cssStyles = {
        border: '2px solid',
        fontSize: '28px',
        height: '38px',
        lineHeight: '33px'
    }

    useEffect(() => {
        if(roomId && application.game.isOnlineGame) {
            application.initWebSocket(roomId)
        }
        
        if(!roomId && application.game.isOnlineGame) {
            fetchRoomId()
            .then(({data}) => {
                navigate(`${SHIPS_ROUTE}/${data.roomId}`)
                application.initWebSocket(data.roomId)
            })
        }
    }, [])

    return (
        <Container>
            <div className={styles.box}>
                <div className={styles.place_ships}>
                    <BoardComponent isPlayerboard/>
                    <div className={styles.port_box}>
                        <PortComponent />
                        <div className={styles.btn_box}>
                            <Button 
                                cssStyles={cssStyles}
                                onClick={() => application.preparation.rotateShip()}
                            >
                                cycle
                            </Button>
                            <Button 
                                onClick={() => application.initWebSocket(roomId)}
                                cssStyles={{...cssStyles, fontFamily: '"Caveat", cursive'}}
                            >
                                Авто
                            </Button>
                            <Button 
                                onClick={() => {
                                    const shipPoints = application.player.shipPoints()
                                    application.socket.sendMessage(shipPoints)
                                    navigate(GAME_ROUTE)
                                }}
                                cssStyles={{...cssStyles, fontFamily: '"Caveat", cursive'}}
                            >
                                Далее
                            </Button>
                        </div>
                    </div>
                </div>
                {
                    isFirstPlayer &&
                    <CopyLink url={`http://localhost:3000${SHIPS_ROUTE}/${roomId}`}/>
                }
            </div>  
        </Container>
    )
})

export default PlaceShips