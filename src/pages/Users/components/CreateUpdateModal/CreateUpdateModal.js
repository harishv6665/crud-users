import React from 'react';
import { useMachine } from '@xstate/react';
import styles from './CreateUpdateModal.module.css';
import Modal from "../../../../shared/components/Modal/Modal";
import Input from "../../../../shared/components/Input/Input";
import Button, { variantTypes } from "../../../../shared/components/Button/Button";
// import useForm from "./useForm";
import userFormMachine from './userForm.machine';
import fieldValidator from './formValidator';

const CreateUpdateModal = ({ user, onSubmit, onCancel}) => {
    const [state, send] = useMachine(userFormMachine(user));
    // const { formValues, onFieldChange } = useForm(user);

    const { id, firstName, firstNameError, lastName, lastNameError, email, emailError } = state.context;
    const onFormSubmit = (event) => {
        event.preventDefault();
        if(!firstNameError && !lastNameError && !emailError && firstName && lastName && email) {
            onSubmit({ user: { id, firstName, lastName, email } });
        }
    }

    const onFieldChange = (event) => {
        const { name, value } = event.target;
        const validation = fieldValidator[name](value);
        send('CHANGE_VALUE', {
            [name]: value,
            [`${name}Error`]: validation && validation.valid ? "" : validation.error
        })
    }
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
