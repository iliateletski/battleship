import React from "react"
import { useNavigate } from "react-router-dom"
import { SHIPS_ROUTE } from "../../utils/consts"
import styles from "./HomePage.module.scss"
import { observer } from "mobx-react-lite"
import Container from "../../components/Container/Container"
import { useAppContext } from "../../hook/useAppContext"


const HomePage = observer(() => {

    const navigate = useNavigate()
    const{application} = useAppContext()

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
                            navigate(SHIPS_ROUTE, {replace: true})
                        }}
                    >
                        С ботом
                    </button>
                    <button 
                        className={styles.btn}
                        onClick={() => {
                            navigate(SHIPS_ROUTE, {replace: true})
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