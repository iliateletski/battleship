import React from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.scss"

const Modal = ({children, onHide, collback, isFooter}) => {

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_inner}>
                    <div className={styles.modal_content}>
                        {children}
                    </div>
                    {
                        isFooter &&
                        <div className={styles.modal_footer}>
                            <Button 
                                className={'general_btn'}
                                onClick={() => collback()}
                            >
                                Да
                            </Button>
                            <Button 
                                className={'general_btn'}
                                onClick={() => onHide()}
                            >
                                Нет
                            </Button>
                        </div>
                    }
                </div>
                
            </div>
        </div>
    )
} 

export default Modal