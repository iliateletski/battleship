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
import ExitGameModal from "../../components/Modals/ExitGameModal"

const PlaceShips = observer(() => {

    const navigate = useNavigate()
    const {roomId} = useParams()
    const{application} = useContext(Context)
    const{game}= application
    const[showModal, setShowModal] = useState(false)
    const cssStyles = {
        border: '2px solid',
        fontSize: '28px',
        height: '38px',
        lineHeight: '33px'
    }
console.log(application)

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
                <div className={styles.header}>
                    <Button 
                        onClick={() => setShowModal(true)}
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
            </div>  
            {
                showModal && <ExitGameModal onHide={() => setShowModal(false)}/>
            }
        </Container>
    
    )
})

export default PlaceShips