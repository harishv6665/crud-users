import { Machine, assign } from 'xstate';

const userFormMachine = (user) => Machine({
    id: 'user-form',
    initial: 'idle',
    context: {
        ...user,
        firstNameError: '',
        lastNameError: '',
        emailError: '',
    },
    states: {
        idle: {
            on: {
                CHANGE_VALUE: {
                    actions: assign((_, values) => ({
                        ...values
                    }))
                }
            }
        }
    }
});

export default userFormMachine;