import React from 'react';
import styles from './DeleteModal.module.css';
import Modal from "../../../../shared/components/Modal/Modal";
import Button, { variantTypes } from "../../../../shared/components/Button/Button";

export default function DeleteModal({ user: { id, firstName = '', lastName = ''}, onSubmit, onCancel }) {
    return (
        <Modal title="Confirm deletion">
            <h5 className={styles.title}>{`Are you sure you want to delete ${firstName} ${lastName}?`}</h5>
            <footer className={styles.footer}>
                <Button
                    title="Cancel"
                    variant={variantTypes.invert}
                    onClick={onCancel}
                />
                <Button
                    title="Delete"
                    variant={variantTypes.danger}
                    onClick={() => onSubmit(id)}
                />
            </footer>
        </Modal>
    )
}
