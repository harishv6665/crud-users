const firstNameValidator = (value) => {
    if(value.length > 2) {
        return { valid: true, error: '' };
    }
    return { valid: false, error: 'First name is required' };
}

const lastNameValidator = (value) => {
    if(value.length > 2) {
        return { valid: true, error: '' };
    }
    return { valid: false, error: 'First name is required' };
}

const emailValidator = (value) => {
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
}

const fieldValidator = {
    firstName: firstNameValidator,
    lastName: lastNameValidator,
    email: emailValidator,
};

export default fieldValidator;
