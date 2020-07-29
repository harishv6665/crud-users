import React from 'react';
import styles from './Button.module.css';

export const variantTypes = {
    invert: 'invert',
    danger: 'danger',
}

export default function Button({ title, onClick, variant, customStyles = {} }) {
    return(
        <button
            className={`
                ${styles.button} 
                ${customStyles.button} 
                ${variantTypes[variant] ? [styles[variantTypes[variant]]] : ''}
            `}
            onClick={onClick}
        >{title}</button>
    )
}
