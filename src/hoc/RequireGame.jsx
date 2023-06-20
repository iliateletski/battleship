import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container/Container";
import Modal from "../components/Modals/Modal";
import { useAppContext } from "../hook/useAppContext";
import { fetchRoomId } from "../http";
import { HOME_ROUTE, SHIPS_ROUTE } from "../utils/consts";

const RequireGame = ({children}) => {

    const{application} = useAppContext()
    const {roomId} = useParams()
    const navigate = useNavigate()
    const[loading, setLoading] = useState(true)
    const[url, setUrl] = useState('')
    const[error, setError] = useState('')
    
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
            .catch(err => {
                setError(err.message)
                setTimeout(() => {
                    navigate(HOME_ROUTE)
                }, 3000)
            })
        }
        setLoading(false)
    }, [])

    if(loading || error) {
        return (
            <Container>
                <Modal>
                    {loading && 'Загрузка ...'}
                    {error && error}
                </Modal>
            </Container>
        )
    }

    return children ? children : <Navigate to={url} replace/>
}

export default RequireGame