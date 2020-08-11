import React from 'react';
import styles from './Button.module.css';

export const variantTypes = {
    invert: 'invert',
    danger: 'danger',
}

const Button = ({ title, onClick, variant, customStyles = {}, type = "button" }) => (
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

export default Button;
