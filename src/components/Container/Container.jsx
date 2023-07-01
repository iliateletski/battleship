import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { HOME_ROUTE } from "../../utils/consts"
import Button from "../Button/Button"
import ExitGameModal from "../Modals/ExitGameModal"
import styles from "./Container.module.scss"

const Container = ({children}) => {

    const[showModal, setShowModal] = useState(false)
    const location = useLocation()
    const isHomePage = location.pathname === HOME_ROUTE

    return (
        <div className={styles.container} >
            {
                !isHomePage &&
                <div className={styles.header}>
                    <Button 
                        className='goHome_btn'
                        onClick={() => setShowModal(true)}
                    />
                </div>
            }
            {children}
            {
                showModal && <ExitGameModal onHide={() => setShowModal(false)}/>
            }
        </div>
    )
}

export default Container