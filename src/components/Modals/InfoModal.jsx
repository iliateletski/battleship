import React from "react";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../../utils/consts";
import Modal from "./Modal";
import { MESSAGE } from "../../utils/consts";
import { useAppContext } from "../../hook/useAppContext";

const InfoModal = ({onHide}) => {

    const navigate = useNavigate()
    const{application} = useAppContext()
    const{game} = application
        
    if(game.gameStatus === 'EndGame' || game.gameStatus === 'close') {
        setTimeout(() => {
            onHide()
            navigate(HOME_ROUTE, {replace: true})
        }, 3000)
    }

    return (
        <Modal>
            {
                <p>
                    {MESSAGE[game.gameStatus]}
                    {game.gameStatus === 'EndGame' && MESSAGE[`win_${game.win}`]}
                </p>
            }
        </Modal>
    )
}

export default InfoModal