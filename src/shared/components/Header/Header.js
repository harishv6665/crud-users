import React from 'react';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.header__title}>User details</h1>
        </header>
    )
}
