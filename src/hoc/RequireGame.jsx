import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Container from "../components/Container/Container";
import Modal from "../components/Modals/Modal";
import { useAppContext } from "../hook/useAppContext";
import { fetchRoomId } from "../http";
import { SHIPS_ROUTE } from "../utils/consts";

const RequireGame = ({children}) => {

    const{application} = useAppContext()
    const {roomId} = useParams()
    const[loading, setLoading] = useState(true)
    const[url, setUrl] = useState('')
    
    useEffect(() => {
        application.start()
        if(roomId && application.game.isOnlineGame) {
            application.initWebSocket(roomId)
        }
        
        if(!roomId && application.game.isOnlineGame) {
            fetchRoomId()
            .then(({data}) => {
                setUrl(`${SHIPS_ROUTE}/${data.roomId}`)
                application.initWebSocket(data.roomId)
            })
        }
        setLoading(false)
    }, [])

    if(loading) {
        return (
            <Container>
                <Modal>
                    Загрузка ...
                </Modal>
            </Container>
        )
    }

    return children ? children : <Navigate to={url} replace/>
}

export default RequireGame