import React from 'react';
import styles from './Input.module.css';

const Input = ({
      label,
      value,
      error,
      name = "",
      onChange,
      type = "text",
      customStyles = {},
      placeholder = ""
}) => (
    <div className={styles.wrapper}>
        {label && <label className={styles.label}>{label}</label>}
        <input
            placeholder={placeholder}
            value={value}
            name={name}
            type={type}
            className={`${styles.input} ${error ? styles.inputError : ''} ${customStyles.input}`}
            onChange={onChange}
        />
        {error && <span className={styles.error}>{error}</span>}
    </div>
)

export default Input;
