import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../hook/useAppContext";
import { HOME_ROUTE } from "../../utils/consts";
import Modal from "./Modal";


const ExitGameModal = ({onHide}) => {

    const navigate = useNavigate()
    const{application} = useAppContext()

    const exitGame = () => {
        const{socket} = application
        socket.closeConnection()
        navigate(HOME_ROUTE, {replace: true})
        onHide()
    }

    return (
        <Modal 
            onHide={onHide}
            collback={exitGame} 
            isFooter   
        >
            <>
                <p>
                    Завершить игру?
                </p>
                <p>
                    Соеденение будет разорвано.
                </p>
            </>
        </Modal>
    )
}

export default ExitGameModal