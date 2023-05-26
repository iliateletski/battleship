import React, { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Context } from "../.."
import { Board } from "../../models/Board"
import Button from "../Buttons/Button"
import ShipComponent from "../ShipComponent/ShipComponent"
import styles from "./PortComponent.module.scss"

const PortComponent = ({setIsGame}) => {

    const navigate = useNavigate()
    const cssStyles = {
        border: '2px solid',
        fontSize: '28px',
        height: '38px',
        lineHeight: '33px'
    }

    const{application} = useContext(Context)
    const{ships} = application.player
    // console.log(application)

    // const ships = [
    //     [{size: 4, direction: 'row'}],
    //     [{size: 3, direction: 'row'}, {size: 3, direction: 'row'}],
    //     [{size: 2, direction: 'row'}, {size: 2, direction: 'row'}, {size: 2, direction: 'row'}],
    //     [{size: 1, direction: 'row'}, {size: 1, direction: 'row'}, {size: 1, direction: 'row'}, {size: 1, direction: 'row'}]
    // ]


    return (
        <div className={styles.port}>
            <ul className={styles.port_lines}>
                {
                    ships.map((ship, i) =>
                        <li className={styles.port_line} key={i}>
                            {
                                ship.map((s, i) =>
                                    <div 
                                        id={`port-${i}`}
                                        className={styles.port_dock} 
                                        key={i}
                                        style={{width: 25 * s.size}}
                                    >
                                        <ShipComponent ship={s}/>
                                    </div>
                                )
                            }
                        </li>     
                    )
                }
            </ul>
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
                    onClick={() => setIsGame(true)}
                    cssStyles={{...cssStyles, fontFamily: '"Caveat", cursive'}}
                >
                    Далее
                </Button>
            </div>
        </div>
    )
}

export default PortComponent