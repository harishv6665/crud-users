import React from 'react';
import styles from './Button.module.css';

export const variantTypes = {
    invert: 'invert',
    danger: 'danger',
}

export default function Button({ title, onClick, variant, customStyles = {}, type = "button" }) {
    return(
        <button
            className={`
                ${styles.button} 
                ${customStyles.button} 
                ${variantTypes[variant] ? [styles[variantTypes[variant]]] : ''}
            `}
            type={type}
            onClick={onClick}
        >{title}</button>
    )
}
