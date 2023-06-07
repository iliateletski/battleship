import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../..";
import { HOME_ROUTE } from "../../utils/consts";
import Modal from "./Modal";

const InfoModal = ({onHide}) => {

    const navigate = useNavigate()
    const{application} = useContext(Context)
    const{game} = application
        
        if(game.gameStatus === 'EndGame' || game.gameStatus === 'Disconnected' ) {
            setTimeout(() => {
                onHide()
                navigate(HOME_ROUTE)
            }, 4000)
        }



    return (
        <Modal>
            {
                game.gameStatus === 'Disconnected' &&
                <p>
                    Противник сдался.
                </p>
            }
            {
                (game.gameStatus === 'SetShips' || game.gameStatus === 'WaitForSecondPlayer') && 
                <p>
                    Ожидание соперника ...
                </p>   
            }
            {
                (game.gameStatus === 'EndGame' && game.win) &&  
                <p>
                    Вы победили!!!
                </p>
            }
            {
                (game.gameStatus === 'EndGame' && !game.win) &&
                <p>
                    Вы проиграли.
                </p>
            }
            
        </Modal>
    )
}

export default InfoModal