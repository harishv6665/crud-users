import React from 'react';
import styles from './CreateUpdateModal.module.css';
import Modal from "../../../../shared/components/Modal/Modal";
import Input from "../../../../shared/components/Input/Input";
import Button, { variantTypes } from "../../../../shared/components/Button/Button";
import useForm from "./useForm";

const CreateUpdateModal = ({ user, onSubmit, onCancel}) => {
    const { formValues, onFieldChange } = useForm(user);

    const onFormSubmit = (event) => {
        event.preventDefault();
        const {id, firstName, firstNameError, lastName, lastNameError, email, emailError } = formValues;
        if(!firstNameError && !lastNameError && !emailError && firstName && lastName && email) {
            onSubmit({ user: { id, firstName, lastName, email } });
        }
    }

    const { id, firstName, firstNameError, lastName, lastNameError, email, emailError } = formValues;
    return(
        <Modal title={`${id ? 'Update' : 'Create'} User`}>
            <form noValidate onSubmit={onFormSubmit}>
                <Input
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={onFieldChange}
                    error={firstNameError}
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={onFieldChange}
                    error={lastNameError}
                />
                <Input
                    label="Email"
                    name="email"
                    value={email}
                    onChange={onFieldChange}
                    error={emailError}
                />
                <div className={styles.footer}>
                    <Button
                        title="Cancel"
                        onClick={onCancel}
                        variant={variantTypes.invert}
                    />
                    <Button
                        type="submit"
                        title={`${id ? 'Save' : 'Add'}`}
                    />
                </div>
            </form>
        </Modal>
    )
}

export default CreateUpdateModal;
