import React from "react";
import styles from "./CopuLink.module.scss"

const CopyLink = ({url}) => {

    const copy = async (value) => {
        try {
            await navigator.clipboard.writeText(value)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div className={styles.box}>
                <input 
                    className={styles.url}
                    value={url}
                    disabled
                />
                <button
                    className={styles.copy_btn}
                    onClick={() => copy(url)}
                >
                    <span className={styles.icon_box}>
                        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm0 0v-480 480Z"/>
                        </svg>
                    </span>
                </button>
        </div>
    )
}

export default CopyLink