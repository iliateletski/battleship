import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Context } from "../.."
import { SHIPS_ROUTE } from "../../utils/consts"
import styles from "./HomePage.module.scss"
import { observer } from "mobx-react-lite"
import Container from "../../components/Container/Container"


const HomePage = observer(() => {

    const navigate = useNavigate()
    const{application} = useContext(Context)

    return (
        <Container>
            <div >
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        Морской бой
                    </h1>
                </div>
                <div className={styles.button_box}>
                    <button
                        className={styles.btn}
                        onClick={() => {
                            application.game.setIsOlineGame(false)
                            navigate(SHIPS_ROUTE)
                        }}
                    >
                        С ботом
                    </button>
                    <button 
                        className={styles.btn}
                        onClick={() => {
                            application.game.setIsOlineGame(true)
                            navigate(SHIPS_ROUTE)
                        }}                    
                    >
                        С другом
                    </button>

                </div>
            </div>
        </Container>
        
    )
})

export default HomePage