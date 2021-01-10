import React, { useCallback } from 'react';
import Button from "../../shared/components/Button/Button";
import UserList from "./components/UserList/UserList";
import CreateUpdateModal from "./components/CreateUpdateModal/CreateUpdateModal";
import styles from './Users.module.css';
import DeleteModal from "./components/DeleteModal/DeleteModal";
import { useMachine } from '@xstate/react';
import usersMachine from './Users.machine';

const Users = () => {
    const [state, send] = useMachine(usersMachine);

    const onAdd = useCallback(() => send('ADD'), [send]);
    const onEdit = useCallback((user) => {
        send('EDIT', {user})
    }, [send]);

    const handleCreateUpdate = useCallback(({user}) => {
        if (state.matches('editing')) {
            send('COMMIT_EDIT', {user});
        } else {
            send('COMMIT_ADD', {user});
        }
    }, [send, state]);

    const onDelete = useCallback((user) => {
        send('DELETE', {user})
    }, [send]);
    const onCommitDelete = useCallback(() => send('COMMIT_DELETE'), [send]);

    const onCancel = useCallback(() => send('CANCEL'), [send]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.actionBar}>
                <Button
                    title="Add"
                    customStyles={{ button: styles.addButton }}
                    onClick={onAdd}
                />
            </div>
            <div className={styles.content}>
                <UserList
                    users={state.context.users}
                    onDelete={onDelete}
                    onUpdate={onEdit}
                />
                {(state.matches('creating') || state.matches('editing')) && <CreateUpdateModal
                    user={state.context.activatedUser}
                    onSubmit={handleCreateUpdate}
                    onCancel={onCancel}
                />}
                {state.matches('deleting') && <DeleteModal
                    user={state.context.activatedUser}
                    onSubmit={onCommitDelete}
                    onCancel={onCancel}
                />}
            </div>
        </div>
    );
}

export default Users;
