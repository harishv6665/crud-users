import React from 'react';
import styles from './Modal.module.css';

const Modal = ({title, children}) => (
    <div className={styles.overlay}>
        <div className={styles.modal}>
            {title && <h4 className={styles.modal__title}>{title}</h4>}
            <div className={styles.modal__content}>
                {children}
            </div>
        </div>
    </div>
)

export default Modal;
