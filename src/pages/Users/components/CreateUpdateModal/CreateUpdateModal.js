import React from 'react';
import styles from './CreateUpdateModal.module.css';
import Modal from "../../../../shared/components/Modal/Modal";
import Input from "../../../../shared/components/Input/Input";
import Button, { variantTypes } from "../../../../shared/components/Button/Button";

export default class CreateUpdateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userForm: {
                id: null,
                firstName: '',
                firstNameError: '',
                lastName: '',
                lastNameError: '',
                email: '',
                emailError: '',
            }
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.fieldValidator = this.fieldValidator.bind(this);
        this.onFieldChange = this.onFieldChange.bind(this);
    }

    componentDidMount() {
        if (this.props.user) {
            const { id, firstName, lastName, email } = this.props.user;
            this.setState({ userForm: {
                ...this.state.userForm,
                id, firstName, lastName, email
            }});

        }
    }

    fieldValidator({ value, name }) {
        switch (name) {
            case 'firstName':
                if(value.length > 0) {
                    return { valid: true, error: '' };
                }
                return { valid: false, error: 'First name is required' };
            case 'lastName':
                if(value.length > 0) {
                    return { valid: true, error: '' };
                }
                return { valid: false, error: 'Last name is required' };
            case 'email':
                /* eslint-disable */
                const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const isEmailValid = emailRegex.test(value);
                if(value.length > 0 && isEmailValid) {
                    return { valid: true, error: '' };
                }
                if(!isEmailValid) {
                    return { valid: false, error: 'Invalid email entered' };
                }
                return { valid: false, error: 'Email is required' };
            default:
                return { valid: true, error: '' };
        }
    }

    onFieldChange(event) {
        const { name, value } = event.target;
        const validation = this.fieldValidator({ value, name });
        if(validation.valid) {
            this.setState({ userForm: {
                    ...this.state.userForm,
                    [name]: value,
                    [`${name}Error`]: ""
                }});
        } else {
            this.setState({ userForm: {
                    ...this.state.userForm,
                    [name]: value,
                    [`${name}Error`]: validation.error
                }});
        }
    }

    onSubmit(event) {
        event.preventDefault();
        const {id, firstName, firstNameError, lastName, lastNameError, email, emailError } = this.state.userForm;
        const mode = id ? 'UPDATE' : 'CREATE';
        if(!firstNameError && !lastNameError && !emailError && firstName && lastName && email) {
            this.props.onSubmit({ mode, user: { id, firstName, lastName, email } });
        }
    }

    render() {
        const { id, firstName, firstNameError, lastName, lastNameError, email, emailError } = this.state.userForm;
        return(
            <Modal title={`${id ? 'Update' : 'Create'} User`}>
                <form noValidate onSubmit={this.onSubmit}>
                    <Input
                        label="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={this.onFieldChange}
                        error={firstNameError}
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        value={lastName}
                        onChange={this.onFieldChange}
                        error={lastNameError}
                    />
                    <Input
                        label="Email"
                        name="email"
                        value={email}
                        onChange={this.onFieldChange}
                        error={emailError}
                    />
                    <div className={styles.footer}>
                        <Button
                            title="Cancel"
                            onClick={this.props.onCancel}
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
}
