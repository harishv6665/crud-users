import React from 'react';
import styles from './Modal.module.css';

export default function Modal({title, children}) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {title && <h4 className={styles.modal__title}>{title}</h4>}
                <div className={styles.modal__content}>
                    {children}
                </div>
            </div>
        </div>
    )
}
