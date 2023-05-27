import { observer } from "mobx-react-lite"
import React, { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../.."
import { Board } from "../../models/Board"
import Button from "../Buttons/Button"
import ShipComponent from "../ShipComponent/ShipComponent"
import styles from "./PortComponent.module.scss"

const PortComponent = observer(({setIsGame}) => {

    
    const navigate = useNavigate()
    const cssStyles = {
        border: '2px solid',
        fontSize: '28px',
        height: '38px',
        lineHeight: '33px'
    }

    
    console.log('перерендер')
    const{application} = useContext(Context)
    const ships = application.player.ships.filter(s => !s.placed)
    const{shipPoints} = application.player
    // const {ships} = application.player

    // const ships = [
    //     [{size: 4, direction: 'row'}],
    //     [{size: 3, direction: 'row'}, {size: 3, direction: 'row'}],
    //     [{size: 2, direction: 'row'}, {size: 2, direction: 'row'}, {size: 2, direction: 'row'}],
    //     [{size: 1, direction: 'row'}, {size: 1, direction: 'row'}, {size: 1, direction: 'row'}, {size: 1, direction: 'row'}]
    // ]


    return (
        <div className={styles.port}>
                {
                    ships.map((ship, i) =>
                        <ShipComponent ship={ship} key={ship.id}/>
                    )
                    
                }


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
                    onClick={() => application.player.shipPoints()}
                    cssStyles={{...cssStyles, fontFamily: '"Caveat", cursive'}}
                >
                    Далее
                </Button>
            </div>
        </div>
    )
})

export default PortComponent