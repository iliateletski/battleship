import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./PlaceShips.module.scss"
import BoardComponent from "../../components/BoardComponent/BoardComponent"
import PortComponent from "../../components/PortComponent/PortComponent"
import Button from "../../components/Buttons/Button"
import { HOME_ROUTE, SHIPS_ROUTE } from "../../utils/consts"
import { fetchRoomId } from "../../http/gameAPI"
import { observer } from "mobx-react-lite"
import { Context } from "../.."

const PlaceShips = observer(() => {

    const navigate = useNavigate()
    const {roomId} = useParams()
    const{application} = useContext(Context)
    const cssStyles = {
        border: '2px solid',
        fontSize: '28px',
        height: '38px',
        lineHeight: '33px'
    }

    useEffect(() => {
        console.log('vasya')
        if(roomId) {
            application.player.createSocket(roomId)
        } else if(!roomId) {
            fetchRoomId()
            .then(({data}) => {
                navigate(`${SHIPS_ROUTE}/${data.roomId}`)
                application.player.createSocket(data.roomId)
            })
        }
    }, [])

    // console.log(socket)

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
                <div className={styles.port_box}>
                    <PortComponent />
                    <div className={styles.btn_box}>
                        <Button 
                            // onClick={() => }
                            cssStyles={cssStyles}
                        >
                            cycle
                        </Button>
                        <Button 
                            onClick={() => navigate()}
                            cssStyles={{...cssStyles, fontFamily: '"Caveat", cursive'}}
                        >
                            Авто
                        </Button>
                        <Button 
                            onClick={() => {
                                const shipPoints = application.player.shipPoints()
                                application.player.socket.sendMessage(shipPoints)
                            }}
                            cssStyles={{...cssStyles, fontFamily: '"Caveat", cursive'}}
                        >
                            Далее
                        </Button>
                    </div>
                </div>
            </div>
        </div>    
    )
})

export default PlaceShips