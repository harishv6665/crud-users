import { useState, useEffect } from "react";
import fieldValidator from "./formValidator";

const useForm = (user) => {
    const [formValues, setFormValues] = useState({
        id: null,
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: '',
    });

    useEffect(() => {
        setFormValues({
            ...user
        })
    }, [setFormValues, user]);

    const onFieldChange = (event) => {
        const { name, value } = event.target;
        const validation = fieldValidator[name](value);
        setFormValues({
            ...formValues,
            [name]: value,
            [`${name}Error`]: validation && validation.valid ? "" : validation.error
        })
    }

    return {
        formValues,
        onFieldChange,
    }
}

export default useForm;
