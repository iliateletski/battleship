import React from "react";
import styles from "./Modal.module.scss"

const Modal = ({children, onHide, collback, isFooter}) => {

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modal_inner}>
                    <div className={styles.modal_body}>
                        <div className={styles.modal_content}>
                            {children}
                        </div>
                    </div>
                    {
                        isFooter &&
                        <div className={styles.modal_footer}>
                            <button 
                                className={styles.modal_btn}
                                onClick={() => collback()}
                            >
                                Да
                            </button>
                            <button 
                                className={styles.modal_btn}
                                onClick={() => onHide(false)}
                            >
                                Нет
                            </button>
                        </div>
                    }
                </div>
                
            </div>
        </div>
    )
} 

export default Modal