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

    fieldValidator({ value, field }) {
        switch (field) {
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

    onFieldChange({ value, field }) {
        const validation = this.fieldValidator({ value, field });
        if(validation.valid) {
            this.setState({ userForm: {
                    ...this.state.userForm,
                    [field]: value
                }});
        } else {
            this.setState({ userForm: {
                    ...this.state.userForm,
                    [field]: value,
                    [`${field}Error`]: validation.error
                }});
        }
    }

    onSubmit() {
        const {id, firstName, firstNameError, lastName, lastNameError, email, emailError } = this.state.userForm;
        const mode = id ? 'UPDATE' : 'CREATE';
        if(!firstNameError && !lastNameError && !emailError && firstName && lastName && email) {
            this.props.onSubmit({ mode, user: { id, firstName, lastName, email } });
        }
    }

    componentWillUnmount() {
        console.log('error')
    }

    render() {
        const { id, firstName, firstNameError, lastName, lastNameError, email, emailError } = this.state.userForm;
        return(
            <Modal title={`${id ? 'Update' : 'Create'} User`}>
                <div>
                    <Input
                        label="First Name"
                        value={firstName}
                        onChange={(e) => this.onFieldChange({value: e.target.value, field: 'firstName'})}
                        error={firstNameError}
                    />
                    <Input
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => this.onFieldChange({ value: e.target.value, field: 'lastName' })}
                        error={lastNameError}
                    />
                    <Input
                        label="Email"
                        value={email}
                        onChange={(e) => this.onFieldChange({ value: e.target.value, field: 'email' })}
                        error={emailError}
                    />
                    <div className={styles.footer}>
                        <Button
                            title="Cancel"
                            onClick={this.props.onCancel}
                            variant={variantTypes.invert}
                        />
                        <Button
                            title={`${id ? 'Save' : 'Add'}`}
                            onClick={this.onSubmit}
                        />
                    </div>
                </div>
            </Modal>
        )
    }
}
